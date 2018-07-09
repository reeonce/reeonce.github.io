---
layout: default
comments: true
---


convert rgb8 to bgra8

```objective-c
size_t bufferLength = width * height * 4;
unsigned char *bgraBuffer = (uint8_t *)malloc(bufferLength);
vImage_Buffer b3 = {
    .data = buffer,
    .height = height,
    .width = width,
    .rowBytes = width * 3
};
vImage_Buffer b4 = {
    .data = bgraBuffer,
    .height = height,
    .width = width,
    .rowBytes = width * 4
};
vImageConvert_RGB888toBGRA8888(&b3, NULL, 255, &b4, NO, kvImageNoFlags);
```

render bgra8 to an UIImage

```objective-c
    
CFDataRef data = CFDataCreate(kCFAllocatorDefault, bgraBuffer, bufferLength);
CGDataProviderRef provider = CGDataProviderCreateWithCFData(data);

size_t bitsPerComponent = 8;
size_t bitsPerPixel = 32;
size_t bytesPerRow = 4 * width;

CGColorSpaceRef colorSpaceRef = CGColorSpaceCreateDeviceRGB();

CGBitmapInfo bitmapInfo = kCGBitmapByteOrderDefault | kCGImageAlphaLast;
CGColorRenderingIntent renderingIntent = kCGRenderingIntentDefault;

CGImageRef cgImage = CGImageCreate(width,
                                   height,
                                   bitsPerComponent,
                                   bitsPerPixel,
                                   bytesPerRow,
                                   colorSpaceRef,
                                   bitmapInfo,
                                   provider,    // data provider
                                   NULL,        // decode
                                   YES,            // should interpolate
                                   renderingIntent);

UIImage *image = [UIImage imageWithCGImage:cgImage];

CGColorSpaceRelease(colorSpaceRef);
CGImageRelease(cgImage);
CGDataProviderRelease(provider);
CFRelease(data);
```