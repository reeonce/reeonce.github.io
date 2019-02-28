---
layout: default
comments: true
---

1. x264 现在采用 frame-based 的多线程策略, 因此在减少线程数时, 可以减少x264 的内存消耗。

x264 的命令参数： `--threads n`

如果使用的是ffmpeg 可以通过 avcodec 中 AVCodecContext 的接口指定, `ctx.thread_count = n;`

2. 为了达到更好的码率控制, x264 会预测之后的很多帧以达到稳定的清晰度, 因此可以通过这个帧数来降低内存的消耗。

x264 的命令参数： `--rc-lookahead 10`, 默认值为40

如果使用的是ffmpeg 可以通过 avcodec 的接口指定, 
`av_opt_set_int(ctx->priv_data, "rc_lookahead", 10, 0);`