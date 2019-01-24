---
layout: default
comments: true
title: JPEG 文件格式及编解码
categories: Media
tags: image media
---

JPEG 是目前最常用的针对影像照片进行压缩的一种有损压缩格式。JPEG 本身只是一种将图像数据编码为字节流的压缩技术, 其并没有定义具体的存储格式。而我们经常提到的 "jpeg 文件" 其实一般是指的  Exif(Exchangeable image file format) 或 JFIF(JPEG File Interchange Format) 标准。

文件扩展名: .jpg, .jpeg

MIME 类型: image/jpeg

魔法数字: ff d8 ff

### 解析

jpeg 文件由一序列以**marker**开头的**段**组成，marker 包含两个字节, 第一个字节固定是 0xFF, 第二个字节则标明了这个marker 的类型。如, `ff d8` 这个图片开头的marker, 这也是上面JEPG 魔法数字的由来。

下面是详细的marker 列表:

| 简称 | 字节 | 内容长度 | 名称 |   描述   |
|------------|-------|---------|------|-------------|
| SOI | 0xFF 0xD8 | 无 | 图片开始 | | 
| SOF0 | 0xFF 0xC0 | 可变长度 | 帧开始 (baseline DCT) | 暗示这是一个基于 baseline DCT 的 JPEG 帧, 并指定宽、高、组成、降采样方式等 |
| SOF2 | 0xFF 0xC2 | 可变长度 | 帧开始 (progressive DCT) | 暗示这是一个基于 progressive DCT 的 JPEG 帧, 并指定宽、高、组成、降采样方式等 |
| DHT | 0xFF 0xC4 | 可变长度 | 霍夫曼表定义 | 定义一个或多个霍夫曼表 |
| DQT | 0xFF 0xDB | 可变长度 | 量化表定义 | 定义一个或多个量化表 |
| DRI | 0xFF 0xDD | 4 bytes | Define Restart Interval | 指定 RSTn 的间隔, 单位为 Minimum Coded Units (MCUs) |
| SOS | 0xFF 0xDA | 可变长度 | 扫描开始 | 开始从上到下的一次扫描, 对于 baseline DCT 的 JPEG 图片, 一般只有一次扫描；而对于 Progressive DCT 的 JPEG 图片, 一般会有多个扫描。这个marker 也表示接下来的真正编码的内容, 注意里面的内容如果与marker 冲突, 需要进行转义 |
| RSTn | 0xFF 0xDn (n=0..7) | 无 | Restart | 每 r 个 macroblocks 会插入一个 RSTn 段, r 由前面的 DRI marker 指定 |
| APPn | 0xFF 0xEn | 可变长度 | 应用定义 | 比如 Exif 的 JPEG file 用 APP1 来存储其元数据 |
| COM | 0xFF 0xFE | 可变长度 | Comment | 包含一段文本注释 |
| EOI | 0xFF 0xD9 | 无 | 图片结束 | |


### 编码过程

#### 颜色空间转换

在进行编码之前，一般会把图像的颜色从 RGB 转为 Y′CBCR, Y′ 表示亮度, CBCR 为色度，由于人眼对色度不如亮度敏感，因此可以将色度进行降采样，得到如 Y′CBCR 4:2:0 的数据格式，从而减少压缩的数据内容。

#### DCT

将图片的像素点拆分为 8x8 的macroblock，然后分别对每个块的Y′, CB, CR 作余散离弦变换(DCT)。

DCT 是一种类似傅立叶变换的变换，可以将数据从时域转为频域。DCT 一般都有对应的逆函数 - IDCT。由于人眼对高频的图片变动不如低频的敏感, 因此在丢弃部分高频数据时, 人眼也不会轻易察觉。

JPEG 采用的是 [DCT-II](https://en.wikipedia.org/wiki/Discrete_cosine_transform#DCT-II) 变换，即:
![](/assets/media/DCT-II.png)

DCT 和 IDCT 并不会造成任何的数据损失。比如如下数据:

```cpp
int block[8][8] = {
    { 52, 55, 61, 66, 70, 61, 64, 73, },
    { 63, 59, 55, 90, 109, 85, 69, 72, },
    { 62, 59, 68, 113, 144, 104, 66, 73, },
    { 63, 58, 71, 122, 154, 106, 70, 69, },
    { 67, 61, 68, 104, 126, 88, 68, 70, },
    { 79, 65, 60, 70, 77, 68, 58, 75, },
    { 85, 71, 64, 59, 55, 61, 65, 83, },
    { 87, 79, 69, 68, 65, 76, 78, 94, },
};

int g[8][8];


for (int x = 0; x < 8; ++x) {
    for (int y = 0; y < 8; ++y) {
        g[x][y] = block[x][y] - 128;
    }
}

//DCT
float G[8][8];

for (int u = 0; u < 8; ++u) {
    for (int v = 0; v < 8; ++v) {
        float au = u == 0 ? 1 / sqrt(2.0) : 1;
        float av = v == 0 ? 1 / sqrt(2.0) : 1;

        float s = 0.0;
        for (int x = 0; x < 8; ++x) {
            for (int y = 0; y < 8; ++y) {
                s += g[x][y] * cos(((2 * x + 1) * u * M_PI) / 16.0) * cos(((2 * y + 1) * v * M_PI) / 16.0);
            }
        }
        G[u][v] = s / 4 * au * av;
    }
}

// idct
float g1[8][8];

for (int x = 0; x < 8; ++x) {
    for (int y = 0; y < 8; ++y) {
        float s = 0.0;

        for (int u = 0; u < 8; ++u) {
            for (int v = 0; v < 8; ++v) {
                float au = u == 0 ? 1 / sqrt(2.0) : 1;
                float av = v == 0 ? 1 / sqrt(2.0) : 1;
                s += au * av * G[u][v] * cos(((2 * x + 1) * u * M_PI) / 16.0) * cos(((2 * y + 1) * v * M_PI) / 16.0);
            }
        }
        g1[x][y] = s / 4;
    }
}
```

可以发现，g1 的值和 g 中的是一模一样的，只会由于float 的精度问题，使其有稍微差别。

#### 量化

量化是编码过程中造成颜色损失的主要部分，也是控制压缩效果(0 ~ 1.0) 的环节。JPEG 标准中定义的画质为50% 时的量化表为:

```cpp
int Q[8][8] = {
    { 16,11,10,16,24,40,51,61, },
    { 12,12,14,19,26,58,60,55, },
    { 14,13,16,24,40,57,69,56, },
    { 14,17,22,29,51,87,80,62, },
    { 18,22,37,56,68,109,103,77, },
    { 24,35,55,64,81,104,113,92, },
    { 49,64,78,87,103,121,120,101, },
    { 72,92,95,98,112,100,103,99, },
};
```

量化过程即将DCT 得到的值除以量化表中相应的值：

```cpp
for (int x = 0; x < 8; ++x) {
    for (int y = 0; y < 8; ++y) {
        B[x][y] = round(G[x][y] / Q[x][y]);
    }
}
```

得到的结果为:

```
-26 -3  -6  2   2   -1  0   0
0   -2  -4  1   1   0   0   0
-3  1   5   -1  -1  0   0   0
-3  1   2   -1  0   0   0   0
1   0   0   0   0   0   0   0
0   0   0   0   0   0   0   0
0   0   0   0   0   0   0   0
0   0   0   0   0   0   0   0
```

可以发现，经过量化以后，右下角的大部分值都变为了 0。

#### 熵编码

熵编码的过程也是一个无损压缩的过程。JPEG 使用的是游程编码(RLE)混合霍夫曼编码的方式。

在上面量化的结果中可以看出, 大部分的有效数据都是在左上角, JPEG 充分地利用了这一特性, 它使用了所谓的 "zigzag" 扫描方式来读取上述的数据。
![](/assets/media/440px-JPEG_ZigZag.svg.png)

通过RLE 又可以利用 "zigzag" 的特性，对连续出现的值进一步进行压缩。

最后将RLE 的结果以霍夫曼编码的方式进行存储，即得到了 JEPG 字节流。

### 解码

解码过程则与编码过程相反。

### 参考

[Wikipedia JPEG](https://en.wikipedia.org/wiki/JPEG)