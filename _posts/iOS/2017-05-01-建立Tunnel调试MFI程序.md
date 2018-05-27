---
layout: default
comments: true
title: 建立Tunnel 调试MFI 程序
category: ios
tags: [ios, MFI, TCP, socket, 802.11]
---

### Lightning 接口被占用了，怎么调试？

由于iPhone 不像Android 一样可以通过adb 远程调试，所以当Lightning 接口被占用时，调试应用变得十分困难。[stackoverflow](http://stackoverflow.com/q/3420716/4156845) 提供了以下几种方案：

1. 借助一个[转接头](http://www.cablejive.com/products/dockStubz.html)，可以让iPhone 同时接上MFI 设备和电脑的Xcode。然而这个转接头只能用于30-pin 的设备，对于使用Lightning 接口的设备就无能为力了。
2. 通过[NSLogger](https://github.com/fpillet/NSLogger) 将日志通过网络传输到电脑上。不得不说，NSLogger 在做一些简单逻辑的判断时是个非常有用的工具，但是需要调试一些复杂的逻辑时就会显得异常麻烦。
3. 另一种方案则是需要两台iPhone 设备，一台连接MFI 设备，一台连接电脑进行调试，然后通过Wi-Fi 建立一条Tunnel 让调试中的手机与MFI 设备进行通讯。这个方案实现起来其实是很简单的，而且搭建好后，也可以直接使用iPhone Simulator 进行调试。再者可以通过这个Tunnel 来构建stub ，对于上层逻辑的测试也方便不少。

### Tunnel 协议设计

我们可以简单设计一个基于TCP 的协议：

```
+------+--------+---------+
| type | length | PAYLOAD |
+------+--------+---------+
|  8   |   32   | length  |
+------+--------+---------+
```

其中，type 包括 connect, disconnect 及 data 三种类型。

这样就能有效地模拟出外部设备的连接及数据传输了。如果使用[CocoaAsyncSocket](https://github.com/robbiehanson/CocoaAsyncSocket)，总代码不会超过200 行。不过在进行组包和解包时，应该尽量避免过多的memcpy，否则在数据量很大的时候会造成不少的CPU 压力。

<!-- more -->

### 网速不到2 MBps?

本以为大功告成了，却意味发现这个Tunnel 在传输高码率的实时视频数据时，其网速只能维持在1.x MBps，导致视频的延时越来越高。

我在做这样功能的时候，为了避免受到公司渣Wi-Fi 的影响，我用macbook 搭了一个2.4 GHz 频段的热点，然后让两台手机同时连接这个热点。按理来说怎么样也能达到几十兆的吞吐量吧，怎么实际中的网速却如此低呢？

### 网络传输的瓶颈在哪里

在TCP 传输时，吞吐量主要受三个因素限制，*TCP 的window size*, *RTT* 及*网络能承载的带宽(BW)*。在数据包丢失率不高的情况下，吞吐量的计算公式为 `max(window_size / rtt, bw)`.

**window size**, TCP 为了达到提供可靠传输的目的，引入了滑窗机制，所有需要发送的数据会放入到一个FIFO 的buffer 中，只有收到ack 之后，窗口才会往后滑动，新的数据才能加入到这个buffer 中。当网速不够快的时候，数据就可能滞留在buffer 中，`send()` 方法也会被block。我们可以通过socket 函数来获得这个buffer 的大小。

```c
#include <sys/socket.h>

// create socket ...

int n = 0;
unsigned int m = sizeof(n);
getsockopt(socketFD, SOL_SOCKET, SO_SNDBUF, (void *)&n, &m);
printf("socket send buffer size: %d", n);
```

得到iOS 中TCP 的SO_SNDBUF 大小为131072 = 128 KBytes.

**RTT**，round trip time, 指的是信号被发送到接收端，然后接收端回复ACK 后发送端收到ACK 的这段时间。虽然socket API 中并没有提供直接获取rtt 值的接口，但是我们一般可以使用ping 来确定这个值。于是，在macbook 上ping 两台手机，发现延时都不低，目测平均值达到50+ms。 姑且把两个手机之间传输时的rtt 设为这两个ping 值之和，也就是100+ms，于是可以计算得到得到吞吐量为 128 KB / 0.1 s = 1.25 MBps，好像挺接近于我们的真实速度。如果这个是真正的瓶颈的话，那么解决办法就是将socket 的window size 设置成一个大一点的值。

```c
int n = 1 * 1024 * 1024;
unsigned int m = sizeof(n);
setsockopt(socketFD, SOL_SOCKET, SO_SNDBUF, (void *)&n, m);
```

然而，速度并没有得到预期的提升。

为了获得更佳可靠的rtt 值，这里有一种比较tricky 的方法，是将SO_SNDBUF 设置为2，对于每发送4 bytes 的数据，需要的时间为`rtt + 2 * timeof(send(2))`，由于send 方法本身的计算时间是很短的，可以忽略不计，所以这个值可以当作是实际的rtt 值。结果显示实际的rtt 似乎并没有之前想象那么大，平均只有10ms 左右。于是得到 128 KB / 0.01 s = 12.8 MBps，这个应该是要远超于真实网速的，所以瓶颈并不在这里。

**网络能承载的带宽**。对于有线以太网，这个值由网线和网卡决定，而无线网则会复杂不少。[IEEE 802.11](https://en.wikipedia.org/wiki/IEEE_802.11) 作为无线局域网的标准，定义了现今市场上的主要无线标准与其能够达到的理论网速。在mac 中，通过按着Option + 点击menu 中的无线图标，就会显示当前网络使用的协议(Windows 在命令行中输入`netsh wlan show interfaces`)：

![](/assets/network/wifi_info.jpg)

可以看到Channel 和 PHY Mode 两栏，我这边使用的是2.4 GHz 频段，20 MHz 频宽 的 802.11n 标准。802.11n 这个标准是在802.11g 之上加入了MIMO(multiple-input multiple-output antennas) 机制，即多组输入输出并行，且单个stream 的速度也从54 Mbps 提高到72.2 Mbps。我的Macbook 有两条Wi-Fi 天线，因此能够到达150 Mbps 的速率。但是，iPhone 上只有一条天线，在使用820.11n 最高速率只为72.2 Mbps。

当两个手机同时连接同一个热点进行传输时，由于无线电信号是不具有指向性的，处于同一频率的信号很可能会存在干涉现象，因此实际的最高传输速率也就会减半，只能达到36 Mbps 左右，再加上办公室区域其它无线信号的干扰，速率会更低到20 Mbps 左右。

到此，网速低的根本原因也就找到了，解决方案也就浮出水面，

1. 可以将正在调试的设备通过iPhone USB 来连接网络而非通过Wi-Fi 来连接。
2. 使用一台带有802.11ac 协议的路由器来连接两个设备。

### 总结

Wi-Fi 的传输速度有时候并没有想象中的那么快，特别是需要中间热点进行中转时。所以对于需要传输视频的设备来说，如果不能用以太网或者USB 来传输的话，802.11ac 可能是唯一可靠的选择。
