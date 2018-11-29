---
layout: default
title: mac/iOS 通过CoreVideo 加速纹理的上传和读取
comments: false
---

Loader:

```cpp
std::shared_ptr<TextureFrame> TextureLoader::CreateTextureFrame(
    const std::shared_ptr<ins::MediaSample> &sample) {
#if ORYOL_OSX
    auto frame = sample->GetFrame();

    CVImageBufferRef pixelBuffer = reinterpret_cast<CVImageBufferRef>(frame->data[3]);
    int width = CVPixelBufferGetWidth(pixelBuffer);
    int height = CVPixelBufferGetHeight(pixelBuffer);

    std::vector<GLuint> textures(2);
    ::glGenTextures(2, textures.data());
    
    ::glBindTexture(GL_TEXTURE_RECTANGLE, textures[0]);
    ::glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    ::glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    ::glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    ::glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);

    ::glBindTexture(GL_TEXTURE_RECTANGLE, textures[1]);
    ::glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    ::glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    ::glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    ::glTexParameteri(GL_TEXTURE_RECTANGLE, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    ::glBindTexture(GL_TEXTURE_RECTANGLE, 0);

    ColorSpace colorSpace = frame->colorspace == AVCOL_SPC_BT709 ?
            ColorSpace::BT_709 : ColorSpace::BT_601;

    OSType fmt = CVPixelBufferGetPixelFormatType(pixelBuffer);
    bool fullRange = fmt == kCVPixelFormatType_420YpCbCr8BiPlanarFullRange;

    TextureFrame *result = new OpenGLNv12TextureFrame(textures, true, width,
        height, GL_TEXTURE_RECTANGLE, fullRange, colorSpace);
    return std::shared_ptr<TextureFrame>(result);
#else
    return nullptr;
#endif
}

void TextureLoader::DestroyTextureFrame(
    const std::shared_ptr<TextureFrame> &textureFrame) {
}

bool TextureLoader::CanResuseTextureFrame(
    const std::shared_ptr<TextureFrame> &textureFrame,
    const std::shared_ptr<ins::MediaSample> &sample) const {
    auto frame = sample->GetFrame();
    int width = frame->width;
    int height = frame->height;
    ColorSpace colorSpace = frame->colorspace == AVCOL_SPC_BT709 ?
        ColorSpace::BT_709 : ColorSpace::BT_601;
#if ORYOL_OSX
    CVImageBufferRef pixelBuffer = reinterpret_cast<CVImageBufferRef>(frame->data[3]);
    width = CVPixelBufferGetWidth(pixelBuffer);
    height = CVPixelBufferGetHeight(pixelBuffer);
#endif
    return textureFrame->GetWidth() == width && 
        textureFrame->GetHeight() == height &&
        textureFrame->GetColorSpace() == colorSpace;
}

void TextureLoader::LoadFrame(const std::shared_ptr<ins::MediaSample> &sample,
    const std::shared_ptr<TextureFrame> &textureFrame) {
#if ORYOL_OSX
    CGLContextObj ctx = (CGLContextObj)[[NSOpenGLContext currentContext] CGLContextObj];

    auto frame = sample->GetFrame();

    CVImageBufferRef pixelBuffer = reinterpret_cast<CVImageBufferRef>(frame->data[3]);
    int width = CVPixelBufferGetWidth(pixelBuffer);
    int height = CVPixelBufferGetHeight(pixelBuffer);

    CVPixelBufferLockBaseAddress(pixelBuffer, kCVPixelBufferLock_ReadOnly);
    
    IOSurfaceRef surface = CVPixelBufferGetIOSurface(pixelBuffer);
    
    auto nv12TextureFrame = std::static_pointer_cast<OpenGLNv12TextureFrame>(textureFrame);

    std::vector<GLuint> textures = nv12TextureFrame->GetNativeTextures();
    
    ::glBindTexture(GL_TEXTURE_RECTANGLE, textures[0]);
    CGLTexImageIOSurface2D(ctx, GL_TEXTURE_RECTANGLE, GL_R8, width, height, 
        GL_RED, GL_UNSIGNED_BYTE, surface, 0);

    ::glBindTexture(GL_TEXTURE_RECTANGLE, textures[1]);
    CGLTexImageIOSurface2D(ctx, GL_TEXTURE_RECTANGLE, GL_RG8, width / 2, 
        height / 2, GL_RG, GL_UNSIGNED_BYTE, surface, 1);
    ::glBindTexture(GL_TEXTURE_RECTANGLE, 0);

    CVPixelBufferUnlockBaseAddress(pixelBuffer, kCVPixelBufferLock_ReadOnly);
#endif
}
```

Reader:

```cpp
static const size_t kTextureCacheFlushSize = 10;

struct TextureReader::Resources {
#if ORYOL_OSX
    CVOpenGLTextureCacheRef textureCache;
    CVPixelBufferPoolRef pool;
    
    size_t textureCacheUsed;
#endif
};

TextureReader::TextureReader() {

}
TextureReader::~TextureReader() {
    if (resources_) {
#if ORYOL_OSX
        if (resources_->pool) {
            CVPixelBufferPoolRelease(resources_->pool);
        }
        if (resources_->textureCache) {
            CVOpenGLTextureCacheRelease(resources_->textureCache);
        }
#endif
    }
}

int TextureReader::Init(Oryol::AppContext *appContext, int width, 
    int height) {
    appContext_ = appContext;
    width_ = width;
    height_ = height;

    return SetupResources(width, height);
}

int TextureReader::SetupResources(int width, int height) {
#if ORYOL_OSX
    resources_.reset(new TextureReader::Resources());

    CVReturn ret;

    CGLContextObj ctx = 
        (CGLContextObj)[[NSOpenGLContext currentContext] CGLContextObj];
    CGLPixelFormatObj pixelFmt = 
        [NSOpenGLContext currentContext].pixelFormat.CGLPixelFormatObj;
    ret = CVOpenGLTextureCacheCreate(kCFAllocatorDefault, NULL, ctx, pixelFmt, 
        NULL, &resources_->textureCache);
    if (ret != kCVReturnSuccess) {
        LOG(ERROR) << "CVOpenGLTextureCacheCreate failed with err " << ret;
        return -1;
    }
    resources_->textureCacheUsed = 0;
    
    NSDictionary* cvBufferProperties = @{
        (__bridge NSString*)kCVPixelBufferPixelFormatTypeKey : @(kCVPixelFormatType_32BGRA),
        (__bridge NSString*)kCVPixelBufferWidthKey : @(width),
        (__bridge NSString*)kCVPixelBufferHeightKey : @(height),
        (__bridge NSString*)kCVPixelBufferOpenGLCompatibilityKey : @YES,
        (__bridge NSString*)kCVPixelBufferIOSurfacePropertiesKey : @{},
    };
    ret = CVPixelBufferPoolCreate(kCFAllocatorDefault, NULL, 
        (__bridge CFDictionaryRef)cvBufferProperties, &resources_->pool);
    if (ret != kCVReturnSuccess) {
        LOG(ERROR) << "CVPixelBufferPoolCreate failed with err " << ret;
        return -1;
    }
    
    return 0;
#endif
    return -2;
}

bool TextureReader::ReadFrame(
    const std::shared_ptr<ins::MediaSample> &sample,
    const Oryol::RenderPassItem *passItem) {
#if ORYOL_OSX
    if (!resources_->textureCache || !resources_->pool) {
        return false;
    }
    
    CVPixelBufferRef pixelBuffer;
    CVReturn ret = CVPixelBufferPoolCreatePixelBuffer(kCFAllocatorDefault,
        resources_->pool, &pixelBuffer);
    if (ret != kCVReturnSuccess) {
        LOG(ERROR) << "CreatePixelBuffer failed with err " << ret;
        return false;
    }
    
    CVOpenGLTextureRef cvTexture;
    ret =  CVOpenGLTextureCacheCreateTextureFromImage(kCFAllocatorDefault, 
        resources_->textureCache, pixelBuffer, NULL, &cvTexture);
    if (ret != kCVReturnSuccess) {
        LOG(ERROR) << "CreateTextureFromImage failed with err " << ret;
        
        CVPixelBufferRelease(pixelBuffer);
        return false;
    }
    resources_->textureCacheUsed += 1;
    
    Oryol::TextureSetup texSetup = Oryol::TextureSetup::FromNativeTexture(
        width_, height_, 1, Oryol::TextureType::Texture2DRect, 
        Oryol::PixelFormat::RGBA8, Oryol::Usage::Immutable, 
        CVOpenGLTextureGetName(cvTexture));
    texSetup.IsRenderTarget = true;
    texSetup.DepthFormat = Oryol::PixelFormat::None;
    texSetup.Sampler.MinFilter = Oryol::TextureFilterMode::Nearest;
    texSetup.Sampler.MagFilter = Oryol::TextureFilterMode::Nearest;
    texSetup.SampleCount = 1;
    gfx().PushResourceLabel();
    auto texture = gfx().CreateResource(texSetup);
    
    Oryol::PassSetup rpSetup = Oryol::PassSetup::From(texture);
    auto flipRgbaPass = gfx().CreateResource(rpSetup);
    auto label = gfx().PopResourceLabel();

    Oryol::Id srcPassId;
    if (passItem != nullptr) {
        srcPassId = passItem->pass;
    }
    gfx().Blit(0, 0, width_, height_, 0, height_, width_, 0, srcPassId,
        flipRgbaPass);
    glFlush();
    
    gfx().DestroyResources(label);
    CVOpenGLTextureRelease(cvTexture);

    auto frame = ins::RefCVPixelBufferToFrame(pixelBuffer);
    
    if (resources_->textureCacheUsed > kTextureCacheFlushSize) {
        CVOpenGLTextureCacheFlush(resources_->textureCache, 0);
        resources_->textureCacheUsed = 0;
    }
    
    return FillSample(sample, frame);
#else
    return false;
#endif
}
```

引用:

1. [Passing IOSurfaces from one process to another via Mach RPC](https://developer.apple.com/library/archive/samplecode/MultiGPUIOSurface/Listings/Readme_txt.html#//apple_ref/doc/uid/DTS40010132-Readme_txt-DontLinkElementID_9)

2. [Mixing Metal and OpenGL Rendering in a View](https://developer.apple.com/documentation/metal/mixing_metal_and_opengl_rendering_in_a_view?language=objc)

3. [Best Practices for Working with Texture Data](https://developer.apple.com/library/archive/documentation/GraphicsImaging/Conceptual/OpenGL-MacProgGuide/opengl_texturedata/opengl_texturedata.html)