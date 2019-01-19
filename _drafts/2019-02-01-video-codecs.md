---
layout: default
comments: true
title: 常见的视频编码算法
categories: Media
tags: video media
---

### H.261

引入了 **Macroblock** 的概念. 在图像编码过程中，处理的过程一般都不是将整张图片的全部数据一起处理，而是会拆分成 NxM 的小块，每一小块作为一个单元来处理，这个单元成为 Macroblock，大小一半是16x16 个点。

Macroblock 又可以拆分成 **变换块**（transform blocks），或者是 H.264/AVC 之后引入的 **预测块**（prediction blocks）.

transform blocks 一般是作为 "transform" 输入的块，比如常见的DCT. 在 H.261 中，这些块的大小为 8x8，因此在颜色空间为 YCbCr 并以4:2:0 降采样时，一个 Macroblock 就会包含 6 个transform blocks，4个 Y块，1个 Cb块， 1个 Cr块。

prediction blocks 则为在做运动补偿时用到的。在 H.261 和 H.262 中，运动补偿仅由 Macroblock 的内的一个移动向量来指定。

以下是一个可能的 Macroblock 二进制流数据:

```sh
+------+------+-------+--------+-----+----+----+--------+
| ADDR | TYPE | QUANT | VECTOR | CBP | b0 | b1 | ... b5 |
+------+------+-------+--------+-----+----+----+--------+
```

* ADDR — 该block 在图片中的地址
* TYPE — macroblock 类型 (intra frame, inter frame, bi-directional inter frame)
* QUANT — 量化值
* VECTOR - 运动向量
* CBP — Coded Block Pattern, 块参数
* bN — 具体的数据库 (4 Y, 1 Cr, 1 Cb)

H.261 对每个 transform block 定义的编码算法由几个步骤混合而成：
1. 基于帧间预测的运动补偿，可以减少帧间的数据冗余；
2. 数据经空间变换（e.g. DCT）后量化；
3. zig-zag 扫描然后进行熵编码（e.g. 霍夫曼编码）；

### MPEG-1 Part 2

MPEG-1 对视频的编码基本是基于 H.261 的编码方式做的提升。其中包括：

1. 引入了帧类型的概念
    * I帧（Intra-frame）
    * P帧（Predicted-frame）
    * B帧（Bidirectional-frame）
    * D帧，只有在MPEG-1 中出现，是一系列低质量的图片，便于 seek 之后快速加载预览图像。

### MPEG-2 Part 2 / H.262

I-帧的编码技术与 jpeg 编码十分相似。

### H.263

### MPEG-4 Part 10 / H.264 / AVC

### H.265 / HEVC

1. Coding tree unit

2. Parallel processing tools

    2.1 tiles, Tiles can be independently decoded and can even allow for random access to specific regions of a picture in a video stream.

3. Entropy coding, a context-adaptive binary arithmetic coding (CABAC) algorithm that is fundamentally similar to CABAC in H.264/MPEG-4 AVC.

4. Intra prediction, HEVC specifies 33 directional modes for intra prediction compared with the 8 directional modes for intra prediction specified by H.264/MPEG-4 AVC.

