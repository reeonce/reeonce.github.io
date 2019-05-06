---
layout: post
comments: true
title: 常见的图片格式及其编解码
categories: Media
tags: image media
---

图片作为现在网络内容的载体, 与各种格式的图片打交道是程序员在开发过程中绕不开的坎。接下来一段时间，就来好好整理一下几种常见的图片格式及其编解码技术。

总的来说，我们可以将其主要分为有损压缩的编码格式及无损编码格式。

#### 有损压缩(lossy compression)：

[JPEG](/media/2019/01/10/jpeg-file-format/)

[HEIF](/media/2019/02/10/heif-file-format/)

#### 无损压缩(lossness compression):

[PNG](/media/2019/01/24/png-file-format/)

[BMP](/media/2019/01/30/bmp-and-ppm-file-format/)

[PPM](/media/2019/01/30/bmp-and-ppm-file-format/)

#### 对比:

| 格式 | 发布年份 | 魔法数字 | 颜色空间 | 压缩比 |
|------|------|---------|----------|-------|
|JPEG | 1992 | ff d8 ff | GRAY, Y′CBCR, CMYK | 10:1~100:1 |
|PNG | 1996 | 89 50 4e 47 | GRAY, RGB, RGBA, GrayAlpha| 1:1~n:1 |