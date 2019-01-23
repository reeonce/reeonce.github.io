---
layout: default
comments: true
title: 视频编码概况
categories: Media
tags: video media
---

### H.261

引入了 **Macroblock** 的概念. 在图像编码过程中, 处理的过程一般都不是将整张图片的全部数据一起处理, 而是会拆分成 NxM 的小块, 每一小块作为一个单元来处理, 这个单元成为 Macroblock, 大小一半是16x16 个点。

Macroblock 又可以拆分成 **变换块**（transform blocks）, 或者是 H.264/AVC 之后引入的 **预测块**（prediction blocks）.

transform blocks 一般是作为 "transform" 输入的块, 比如常见的DCT. 在 H.261 中, 这些块的大小为 8x8, 因此在颜色空间为 YCbCr 并以4:2:0 降采样时, 一个 Macroblock 就会包含 6 个transform blocks, 4个 Y块, 1个 Cb块,  1个 Cr块。

prediction blocks 则为在做运动补偿时用到的。在 H.261 和 H.262 中, 运动补偿仅由 Macroblock 的内的一个移动向量来指定。

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
1. 基于帧间预测的运动补偿, 可以减少帧间的数据冗余；
2. 数据经空间变换（e.g. DCT）后量化；
3. zig-zag 扫描然后进行熵编码（e.g. 霍夫曼编码）；

### MPEG-1 Part 2

MPEG-1 对视频的编码基本是基于 H.261 的编码方式做的提升。其中包括：

1. 引入了帧类型的概念
    * I帧（Intra-frame）
    * P帧（Predicted-frame）
    * B帧（Bidirectional-frame）
    * D帧, 只有在MPEG-1 中出现, 是一系列低质量的图片, 便于 seek 之后快速加载预览图像。

### MPEG-2 Part 2 / H.262

I-帧的编码技术与 jpeg 编码十分相似。

### H.263

### MPEG-4 Part 10 / H.264 / AVC

#### 简表(Profile)

#### 级别(Level)

level 定义了一个profile 的一些限制参数，最大的图片分辨率, 帧率, 码率等。比如4k 视频, 是在 level 5.1 定义的, 因此必须是支持5.1 的解码器才能解码4k 的视频。一个解码器支持某一个level 时, 它也应该能够支持解码这个level 的所有码流及更小level 的所有码流。

#### 解码过程

nal_unit_type 值为 7 和 8 时 NAL 单元里封装的分别是序列参数集和图像参数集。图像参数集用于由每一个条 带头中图像参数集决定的 NAL 单元的解码过程。序列参数集用于由图像参数集中的序列参数集决定的其它 NAL 单元的解码过程。


### H.265 / HEVC

1. **编码树单元(Coding tree unit)**, 替换之前的 `Macroblock`, CTU 可以是 16x16 到 64x64 的大小, 一般而言CTU 越大，编码的压缩效果越好, 编码的时间越长, 解码的时间越短。CTU 将每个luma/chroma 分为编码树区块(coding tree blocks), CTB 按照四叉树的结构分解为编码单元(CU), 编码单元再次被分解为大小从 4x4 到 64x64 的预测单元。预测单元可以是帧内预测，或者是帧间预测。

2. Parallel processing tools

    2.1 tiles, Tiles can be independently decoded and can even allow for random access to specific regions of a picture in a video stream.

3. Entropy coding, a context-adaptive binary arithmetic coding (CABAC) algorithm that is fundamentally similar to CABAC in H.264/MPEG-4 AVC.

4. Intra prediction, HEVC specifies 33 directional modes for intra prediction compared with the 8 directional modes for intra prediction specified by H.264/MPEG-4 AVC.

