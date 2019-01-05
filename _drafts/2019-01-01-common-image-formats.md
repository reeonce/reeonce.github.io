---
layout: default
comments: true
title: 常见的图片格式及其编解码讲解
categories: Media
tags: image media
---

### jpeg

jpeg 是目前最常用的一种有损的图片压缩格式。

文件扩展名: .jpg, .jpeg

MIME 类型: image/jpeg

magic number: ff d8 ff

#### 解析

jpeg 文件由一序列的**段**组成，每一个段以一个**marker**开头，marker 则由 0xFF 0xXX 两个字节组成。

| Short name | Bytes | Payload | Name | Comments |
|------------|-------|---------|------|----------|
| SOI | "0xFF 0xD8" | none | Start Of Image | | 
| SOF0 | "0xFF 0xC0" | variable size | Start Of Frame (baseline DCT) | "Indicates that this is a baseline DCT-based JPEG |  and specifies the width |  height |  number of components |  and component subsampling (e.g. |  4:2:0)." |
| SOF2 | "0xFF 0xC2" | variable size | Start Of Frame (progressive DCT) | "Indicates that this is a progressive DCT-based JPEG |  and specifies the width |  height |  number of components |  and component subsampling (e.g. |  4:2:0)." |
| DHT | "0xFF 0xC4" | variable size | Define Huffman Table(s) | Specifies one or more Huffman tables. |
| DQT | "0xFF 0xDB" | variable size | Define Quantization Table(s) | Specifies one or more quantization tables. |
| DRI | "0xFF 0xDD" | 4 bytes | Define Restart Interval | "Specifies the interval between RSTn markers |  in Minimum Coded Units (MCUs). This marker is followed by two bytes indicating the fixed size so it can be treated like any other variable size segment." |
| SOS | "0xFF 0xDA" | variable size | Start Of Scan | "Begins a top-to-bottom scan of the image. In baseline DCT JPEG images |  there is generally a single scan. Progressive DCT JPEG images usually contain multiple scans. This marker specifies which slice of data it will contain |  and is immediately followed by entropy-coded data." |
| RSTn | "0xFF 0xDn (n=0..7)" | none | Restart | "Inserted every r macroblocks |  where r is the restart interval set by a DRI marker. Not used if there was no DRI marker. The low three bits of the marker code cycle in value from 0 to 7." |
| APPn | "0xFF 0xEn" | variable size | Application-specific | "For example |  an Exif JPEG file uses an APP1 marker to store metadata |  laid out in a structure based closely on TIFF." |
| COM | "0xFF 0xFE" | variable size | Comment | Contains a text comment. |
| EOI | "0xFF 0xD9" | none | End Of Image | |

#### 编解码

JPEG 不仅是一种文件格式，同时JFIF 还定义了 "jpeg" 压缩算法。

### png

#### 解析

#### 编解码

### bmp

#### 解析

#### 编解码

### ppm

#### 解析

#### 编解码

### heif / heic

iOS 11 将图片的存储格式改为了heif 格式，除了达到更高的画质和节省了空间之外，还可以支持存储动态照片。

#### 解析

#### 编解码

### 各种图片格式对比


