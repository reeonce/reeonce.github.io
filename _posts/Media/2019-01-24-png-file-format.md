---
layout: default
comments: true
title: PNG 文件格式及编解码
categories: Media
tags: image media
---

如果说 JPEG 是影像领域图像格式的一哥, 那 PNG 绝对可以算是互联网图片的一哥。平日的截图, 各种logo 等图像编辑产生的资源, 我们一般都会首选png 格式作为其存储方式。

PNG 是一种高效的无损压缩格式, 在针对有规律的图片时, 压缩率可以非常高, 而对于相机拍摄的无规律的自然场景，压缩率往往是非常低的。

文件扩展名: .png

MIME 类型: image/png

魔法数字: 89 50 4e 47 0d 0a 1a 0a

色彩空间: png 支持RGB, RGBA, Gray, 带 alpha 的gray 及 24 bits 或者 32 bits 的调色板映射。

### 解析

PNG 文件一般包含两个部分，文件头和多个 "Chunk"。

文件头为 `89 50 4e 47 0d 0a 1a 0a`，方便识别。

接下来是部分则由一个个Chunk 组成。Chunk 的字节流格式为:

| Length | Chunk type| Chunk data | CRC. |
|--------|-----------|------------|------|
|4 bytes |  4 bytes  | Length bytes| 4 bytes |

主要的 Chunk 类型有:

* `IHDT`: 必须是第一个Chunk, 其包含图像的宽度(4 bytes)、高度(4 bytes)、位深度(1 byte)、颜色类型(1 byte)、压缩方式(1 byte)、滤镜类型(1 byte)、交叉类型(1 byte)，共13 字节。
* `PLTE`: 包含调色板内容
* `IDAT`: 经过压缩的图像数据，一张图片可能会将数据拆分到多个IDAT chunk，方便进行流式解码。
* `IEND`: 标记图像的结束

### 编解码

PNG 采用的是 DEFLATE，一种混合 LZ77 算法与霍夫曼编码的无损编码算法。也是gzip 等数据压缩格式所使用的算法，这也是为何 png 解码库一般都会依赖 zlib 的原因。

LZ77 是PNG 能够提高压缩率的关键所在。对于有规律重复的数据，它可以像游程编码一样，用非常简单的数据来描述这些原始图像数据。

而通过霍夫曼编码，又进一步提高了压缩率。

### 引用：

1. [PNG (Portable Network Graphics) Specification, Version 1.2](http://www.libpng.org/pub/png/spec/1.2/PNG-Contents.html)
2. [ZLIB Compressed Data Format Specification version 3.3](https://www.ietf.org/rfc/rfc1950.txt)
3. [DEFLATE Compressed Data Format Specification version 1.3](https://www.ietf.org/rfc/rfc1951.txt)