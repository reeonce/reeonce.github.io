---
layout: default
comments: true
title: IOSurface - 加速图像处理的魔法糖
categories: Media
tags: media
---

### 绑定VideoToolbox 硬解出来视频帧到渲染的texture

在Mac 和 iOS 开发中, 我们经常会使用[VideoToolbox](https://developer.apple.com/documentation/videotoolbox) 的硬件解码来提高解码性能。VideoToolbox 解码出来的图像存在了CVPixelBuffer 的对象里, 要将这个视频帧绑定到渲染的texture 上，一般有以下几种方法：

1. 获取 CVPixelBuffer 在CPU 上的内存地址，然后通过`glTexImage2D()`将其上传到 OpenGL(ES) 或者 通过 Metal 的接口上传到MTLTexture 上。需要注意的是, 在上传的时候需要通过 `CVPixelBufferLockBaseAddress()` 方法 *锁定* 这个CVPixelBuffer, 否则显示的图像很可能是不对的。这种方法很好理解，然而十分耗时。

2. 对于Metal 和 OpenGL(ES) 开发, CoreVideo 框架提供了更加快速的方式。代码也非常简单:
```swift
CVMetalTextureCacheCreate()
CVMetalTextureCacheCreateTextureFromImage()
_metalTexture = CVMetalTextureGetTexture(_CVMTLTexture);
```

3. 如果是在MacOS 平台, 第2种方法只能上传RGBA 格式的CVPixelBuffer, 对于NV12 或者是 I420 的格式则需要使用另一种方法:
```c++
void LoadFrame(CVImageBufferRef pixelBuffer, OpenGLNv12TextureFrame *nv12TextureFrame) {
    CGLContextObj ctx = (CGLContextObj)[[NSOpenGLContext currentContext] CGLContextObj];
    IOSurfaceRef surface = CVPixelBufferGetIOSurface(pixelBuffer);

    std::vector<GLuint> &textures = nv12TextureFrame->GetNativeTextures();
    
    glBindTexture(GL_TEXTURE_RECTANGLE, textures[0]);
    CGLTexImageIOSurface2D(ctx, GL_TEXTURE_RECTANGLE, GL_R8, width, height, 
        GL_RED, GL_UNSIGNED_BYTE, surface, 0);

    glBindTexture(GL_TEXTURE_RECTANGLE, textures[1]);
    CGLTexImageIOSurface2D(ctx, GL_TEXTURE_RECTANGLE, GL_RG8, width / 2, 
        height / 2, GL_RG, GL_UNSIGNED_BYTE, surface, 1);
    glBindTexture(GL_TEXTURE_RECTANGLE, 0);
}
```

通过对比, 对于4K 以上分辨率的视频, 第1种方法基本上无法使用的，第2、3种方式却能保持流畅不卡。

### 编码渲染出来的图像

对于视频剪辑和合成的导出, 或者对美颜过后的图像进行直播, 一般是先将图像进行离屏渲染到framebuffer 上, 然后读取出颜色图像进行编码。对应的实现有以下两种方法:

1. 创建一个普通的framebuffer, 进行滤镜、美颜等渲染, 通过`glReadPixels()` 等函数将framebuffer 的颜色图像读取到cpu 中, 然后对这个图像进行编码。

2. 在前面绑定VideoToolbox 硬解出来视频帧到渲染的texture第2种方式中, 我们将一个 CVPixelBuffer 绑定到了 OpenGL(ES) 或者 Metal 的texture 上, 事实上，这个texture 是可以直接绑定到framebuffer 的 attachment 作为渲染目标的, 渲染完成后，直接将这个CVPixelBuffer 进行编码。示例代码为:

```c++

void Setup() {
    CGLContextObj ctx = (CGLContextObj)[[NSOpenGLContext currentContext] CGLContextObj];
    CGLPixelFormatObj pixelFmt = [NSOpenGLContext currentContext].pixelFormat.CGLPixelFormatObj;
    CVOpenGLTextureCacheCreate(kCFAllocatorDefault, NULL, ctx, pixelFmt, NULL, &resources_->textureCache);
    NSDictionary* cvBufferProperties = @{
        (__bridge NSString*)kCVPixelBufferPixelFormatTypeKey : @(kCVPixelFormatType_32BGRA),
        (__bridge NSString*)kCVPixelBufferWidthKey : @(width),
        (__bridge NSString*)kCVPixelBufferHeightKey : @(height),
        (__bridge NSString*)kCVPixelBufferOpenGLCompatibilityKey : @YES,
        (__bridge NSString*)kCVPixelBufferIOSurfacePropertiesKey : @{},
    };
    CVPixelBufferPoolCreate(kCFAllocatorDefault, NULL, (__bridge CFDictionaryRef)cvBufferProperties, &resources_->pool);
}

CVPixelBufferRef ReadFrame() {
    CVPixelBufferRef pixelBuffer;
    CVReturn ret = CVPixelBufferPoolCreatePixelBuffer(kCFAllocatorDefault, resources_->pool, &pixelBuffer);
    CVOpenGLTextureRef cvTexture;
    CVOpenGLTextureCacheCreateTextureFromImage(kCFAllocatorDefault, resources_->textureCache, pixelBuffer, NULL, &cvTexture);

    GLuint texture = CVOpenGLTextureGetName(cvTexture);
    
    // TODO: bind texture to the target framebuffer

    Render();
    glFlush();
    CVOpenGLTextureRelease(cvTexture);

    return pixelBuffer;
}

```

同样的, 第2种方法的性能比方法1好很多, 对于4K 视频的直播也是没有问题的。

### CVPixelBuffer 背后的IOSurface

对于硬解出来的CVPixelBuffer, 可以通过 `CVPixelBufferGetIOSurface()` 来获取到一个非空的 IOSurface 对象。

什么是IOSurface? 网络上关于IOSurface 具体实现的讨论并不是很多, 还好在WWDC 2010 中, 有一场专门针对IOSurface 的讲解。

先来看看苹果官方文档对其的描述是:

> Share hardware-accelerated buffer data (framebuffers and textures) across multiple processes. Manage image memory more efficiently.

这句话的重点应该是 **Share** 与 "Manage", 也就是 IOSurface 是一套可以跨多进程进行**共享和管理**硬件加速的内存数据的框架。

#### 共享

一个IOSurface 对象管理着一块系统共享的内存, 比如一张YUV 图像的数据。通过IOSurface 的接口, 电脑的各个模块可以同时访问这一块共享的内存, CPU 可以访问它并进行读写操作, GPU 可以通过OpenGL 或者 Metal 访问它, 外置的GPU 也可以通过不同版本的OpenGL 来访问这一块内存。 不仅如此, 不同的进程也可以通过IOSurface 来共享资源。

#### 管理

为了让 IOSurface 能够支持如此多模块的访问, IOSurface 本身提供了各个模块的访问接口, 大大简化各模块之间对这些资源的管理逻辑。

虽然IOSurface 提供了这么强大的服务, 开发者还是要理清各个模块的访问冲突, 做好同步操作。比如, 在CPU 进行操作是, 需要调用`IOSurfaceLock()` 来锁定这一块资源, 当结束读写操作时, 调用`IOSurfaceUnlock()` 来解除锁定, 如果进行了写操作, IOSurface 还负责将CPU 中的内存通过到 IOSurface 中原始的内存。而在进行GPU 操作时, 通过合理地利用 `glFlush()` 和 `glFinish()` 来进行同步也是有必要的。

### 进阶：通过 CVPixelBuffer 来混合Metal 与OpenGL 的渲染

苹果自 iOS 9 和 OSX 10.11 提出Metal 以后, 就非常希望开发者能够将OpenGL(ES) 的代码移植到Metal。然而对于稍大一点的工程而言, 完全移植到新平台并非易事, IOSurface 在这个时候就可以作为桥梁, 连接 OpenGL(ES) 与 Metal 的图像资源。

之前的代码介绍了如何通过CoreVideo 的API 分别将CVPixelBuffer 与Opengl(ES) 的texture 和 MTLTexture 进行关联, 在这里, 我们将一个CVPixelBuffer 同时绑定到 Opengl(ES) 的texture 和 MTLTexture 中。那么, 在 Opengl(ES) 对这个texture 作出写操作之后, Metal 可以读取到修改后的图像; 同样, 在 Metal 对其MTLTexture 写操作之后, Opengl(ES) 可以读取到修改后的图像。

引用:

[Taking Advantage of Multiple GPUs (WWDC 2010 session 422)](https://asciiwwdc.com/2010/sessions/422)

[Mixing Metal and OpenGL Rendering in a View](https://developer.apple.com/documentation/metal/mixing_metal_and_opengl_rendering_in_a_view?language=objc)