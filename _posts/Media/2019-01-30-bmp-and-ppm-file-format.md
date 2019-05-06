---
layout: post
comments: true
title: BMP 和 PPM 文件格式及编解码
categories: Media
tags: image media
---

## BMP

BMP 格式是使用最为广泛的位图存储格式，它能够支持多种颜色空间, 不同的色彩深度, alpha 通道等。

### 解析

Wikipedia 这张图非常清晰地显示了BMP 的文件结构, [The Structure of the Bitmap Image File](https://upload.wikimedia.org/wikipedia/commons/c/c4/BMPfileFormat.png)。

#### 文件头

BMP 的文件头部总共包含14 个字节, 存储着文件的一些基本信息, 组成由：

1. 2字节的魔法数字: "BM"
2. 4字节的文件大小
3. 4字节的保留位
4. 颜色像素所处的偏移值

#### DIB 头

紧接着文件头数据的是DIB 头, 存储图片的一些具体信息。在不同的版本中, DIB 头的长度和定义是不一样的。DIB 头的前4个字节表示了DIB 头的长度, 因此可以通过这个长度来确定其使用的版本。

| 大小(字节) |     名称     |   系统支持   |    主要特点   |   主要软件  |
|-----------|-------------|-------------|-------------|------------|
| 12 | `BITMAPCOREHEADER`, `OS21XBITMAPHEADER` |  Windows 2.0 或之后版本, OS/2 1.x[2] | | |
| 64 | `OS22XBITMAPHEADER` |  OS/2 BITMAPCOREHEADER2 | 添加 RLE 和一维霍夫曼编码压缩 | |
| 16 | `OS22XBITMAPHEADER` |  为上面版本的缩减版 | | |
| 40 | `BITMAPINFOHEADER` |  Windows NT, 3.1x 或之后版本 | 增加了16 和32 位颜色格式, 增加了 RLE 压缩 | |
| 52 | `BITMAPV2INFOHEADER` | | 增加了 RGB 的位掩码 | Adobe Photoshop |
| 56 | `BITMAPV3INFOHEADER` | | 增加了 alpha 通道 的位掩码 | Adobe Photoshop |
| 108 | `BITMAPV4HEADER` | Windows NT 4.0, 95 或之后版本 | 增加了 颜色空间类型和 gamma 矫正 | |
| 124 | `BITMAPV5HEADER` | Windows NT 5.0, 98 或之后版本 | 增加了 ICC 颜色特性 | |


比如对于使用普遍的 `BITMAPINFOHEADER` 版本, 其DIB 头的长度为40 字节, 组成内容为:

1. 4 字节 DIB 头的长度
2. 4 字节图像宽度, 4 字节图像高度
3. 2 字节平面数, 必须是1
4. 2 字节位数
5. 4 字节压缩方法, 一般都是0, 表示无压缩
6. 4 字节数据大小
7. 4 字节水平的分辨率, 4 字节竖直的分辨率
8. 4 字节色板大小
9. 4 字节颜色有效值

### 色板

色板位于DIB 头之后, 一般是2^n 的长度, 或者是DIB 头部指定的大小。一般情况下, 色板的每一项占用4 个字节, 分别表示蓝、绿、红和0x00。

### 像素存储

BMP 的每一行像素的字节流会被对齐4字节, 因此每一行的大小为 `(bits_per_pixel * width + 31) / 32 * 4;`。对于每一个数据, 根据其值就可以在色板中索引到最终的rgb 值。

## PPM

PPM 格式算是所有图片格式里最简单的格式，基本指存储了图片的大小和RGB 值。由于它是直接存储的RGB 值, 数据冗余严重, 导致其作为数据存储时是非常低效的; 同时其不能存储元数据, 导致其使用也很局限。但是这种格式在平时的平日的开发过程中却很适合作为一种中间格式来使用, 比如在调试的时候存储临时图片。

### 解析

#### 文件头

1. PPM 文件的魔法数字是 `50 36` 即ASCII 字符 "P6", 紧接着一个空白字符，可以是空格、TAB、换行符、回车；
2. 下来是宽度, 为 ASCII 字符的十进制数, 如 "58", 紧接着一个空白字符；
3. 下来是高度, 为 ASCII 字符的十进制数, 如 "50", 紧接着一个空白字符；
4. 再下来是颜色的最大值, 为 ASCII 字符的十进制数, 如 "255", 这个数字必须是 (0, 65536) 之间的值, 紧接着一个空白字符；

#### 图片内容

从上倒下逐行存储的RGB 值, 如果最大值小于256, 则一个值占用一个字节, 否则, 每个值占两个字节。

### 引用

1. [Wikipedia BMP file format](https://en.wikipedia.org/wiki/BMP_file_format)
2. [http://netpbm.sourceforge.net/doc/ppm.html](http://netpbm.sourceforge.net/doc/ppm.html)
