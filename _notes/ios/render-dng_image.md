---
layout: default
comments: true
---

ios 的UIImage 并不支持解析 dng 格式的raw 文件，但是core image 是支持的，通过以下方式即可：

```swift
guard let url = Bundle.main.url(forResource: "47", withExtension: "dng") else {
    return
}
        
let options: [String: Any] = [String(kCGImageSourceTypeIdentifierHint): "com.adobe.raw-image"]
let filter = CIFilter.init(imageURL: url, options: options)
guard let ciImage = filter?.outputImage else {
    return
}

imageView.image = UIImage.init(ciImage: ciImage)
```