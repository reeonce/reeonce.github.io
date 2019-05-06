---
layout: post
comments: true
title: PNG 文件格式及编解码
categories: Media
tags: image media
---

如果说 JPEG 是影像领域图像格式的“一哥”, 那 PNG 绝对可以算是互联网图片的“一姐”, 平日的截图、各种logo 等图像编辑产生的资源, 我们一般都会首选png 格式作为其存储方式。

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

通过zlib 来解码的大致逻辑为：

```cpp
while (true) {
	ctx->strm.zalloc = Z_NULL;
    ctx->strm.zfree = Z_NULL;
    ctx->strm.opaque = Z_NULL;
    ctx->strm.avail_in = 0;
    ctx->strm.next_in = Z_NULL;
    int ret = inflateInit(&ctx->strm);
    assert(ret == 0);

	Chunk c = ReadChunk(ctx->source);
	switch (c.type) {
	case 'IHDT':
		ParseMetadata(c, ctx);
		break;
	case 'IDAT':
		ctx->strm.next_in = const_cast<uint8_t *>(chunk.data);
		ctx->strm.avail_in = size;

		uint8_t outChunk[32768];

		ctx->strm.next_out = outChunk;
		ctx->strm.avail_out = sizeof(outChunk);
		int ret = inflate(&ctx->strm, Z_NO_FLUSH);
		assert(ret != Z_STREAM_ERROR);  /* state not clobbered */
		switch (ret) {
		    case Z_NEED_DICT:
		        ret = Z_DATA_ERROR;     /* and fall through */
		    case Z_DATA_ERROR:
		    case Z_MEM_ERROR:
		        assert(false);
		}

		size_t outSize = sizeof(outChunk) - ctx->strm.avail_out;
		ctx->outData.insert(ctx->color.end(), outChunk, outChunk + outSize); 

		if (ret == Z_STREAM_END) {
		    inflateEnd(&ctx->strm);
		}
		break;
	case 'IEND':
		ctx->done = true;
	}
	if (ctx->error) {
		inflateEnd(&ctx->strm);
	}
}
```

### Filter

为了获取更好的压缩效果, png 还可以通过将图像的原始数据进行过滤处理, 从而得到更利于压缩的数据。

png 实际采用的filter 算法并不是由 `IHDT` chunk 里的filter type 指定的, 在png 的格式定义中, `IHDT` 里的filter type 应该始终为0。 而实际使用的filter 算法则是存储在每行数据的首个字节。比如一张 `width = 58, height = 50, colorspace = RGBA, depth = 8` 的图片，通过上述步骤得到的 ctx->outData.size() 为11650, 11650 / 50 = 233, 而非 58 * 4 = 232，因为每行的首个字节为实际的filter 算法类型。

PNG 中filter 类型可以为

```
0       None
1       Sub
2       Up
3       Average
4       Paeth
```

这五种类型。

以Sub 为例, 将deflate 解码得到的结果转为图像数据的过程为:

```cpp
int components = kComponents[ctx->colorType];
size_t bpp = (components * ctx->depth + 7) / 8;
std::vector<uint8_t> data(ctx->width * ctx->height * components);

size_t stride = (ctx->width * ctx->depth * components + 7) / 8 + 1;
assert(stride * ctx->height == ctx->outData.size());
for (int row = 0; row < ctx->height; ++row) {
    auto bufferBeign = ctx->outData.data() + row * stride;
    ree::io::BigEndianRLSBBuffer buffer(bufferBeign, stride);
    int filter = buffer.ReadBits(8);

    size_t dataBeginIndex = row * ctx->width * components;
    for (int i = 0; i < components; ++i) {
        data[dataBeginIndex + i] = buffer.ReadBits(ctx->depth);
    }
    for (int col = 1; col < ctx->width; ++col) {
        for (int i = 0; i < components; ++i) {
            uint32_t value = buffer.ReadBits(ctx->depth);
            switch (filter) {
            case 0:
                break;
            case 1:
                value += data[dataBeginIndex + col * 4 + i - bpp];
                break;
            }
            data[dataBeginIndex + col * 4 + i] = value;
        }
    }
}
```

### 引用：

1. [PNG (Portable Network Graphics) Specification, Version 1.2](http://www.libpng.org/pub/png/spec/1.2/PNG-Contents.html)
2. [ZLIB Compressed Data Format Specification version 3.3](https://www.ietf.org/rfc/rfc1950.txt)
3. [DEFLATE Compressed Data Format Specification version 1.3](https://www.ietf.org/rfc/rfc1951.txt)