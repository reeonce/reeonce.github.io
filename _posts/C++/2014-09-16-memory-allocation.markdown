---
layout: post
comments: true
title: Stack vs Heap
categories: c++
tags: c++ stack heap
js: ["/js/stack-heap-demo.js"]
---

> 常规变量的值都被存储在被称为“栈(stack)”的内存区域中，而new 分配的内存块通常与常规变量声明分配的内存块不同, new 从被称为“堆(heap)”或者“自由区域区(free store)”的内存区域中分配。

> 在编译时给数组分配内存被称为**静态联编**(static blinding)，意味着数组在编译时加入到程序中。但是new 是在运行阶段选择数组的长度，称为**动态联编**(dynamic blinding)。

#### stack 和 heap 是什么？

stack 是为线程的执行而留出的暂存内存空间。当一个函数被调用时，stack 最顶端的一块内存就会被用来存储函数内的本地变量；而当这个函数结束返回时，这一块内存就会被释放，并提供给下一个调用的函数使用。stack 的分配总是按照 FIFO（先进先出）的顺序的，最近被分配的一块内存将是下一个即被释放的。这使得对stack 的跟踪变得非常简单，从stack 中释放一块内存无非就是改变一个指针的地址而已。

heap 则是为动态分配内存而保留的内存空间。heap 中的内存没有像stack 那样的分配和释放的模式，你能够在任何时候分配一块内存，或者回收一块内存。这使得如何去跟踪块中已分配的内存块和释放的内存块变得很复杂。当然，对于如何改善heap 内存管理的性能也有不少相关的探讨。

#### 他们的作用域分别是什么？

stack 是伴着**线程**而产生的，当线程结束时，stack 也就被收回了。

而heap 则是在**进程**开始执行时由运行环境分配的，当进程结束，内存被回收。

#### 他们的大小分别是多少？

由于stack 必须是一块连续的内存，因此它的的大小在线程创建的时候就被确定了。而这一内存块大小的决定因素包括开发语言、编译器、操作系统和处理器的架构，而编译器或者操作系统最终确定它的大小。在一般情况下，这块内存是足够使用的，而如果stack 中的内存溢出，说明你的程序可能有问题了，包括死循环或者其它不正确的编程抉择。

而heap 的大小是在进程启动时设置的，但是如果需要这块内存是可以再次申请的。现在的操作系统中，你并不需要为这些做其它的任务，当内存不足时，内存管理器会自动向操作系统请求更多的内存空间。但是，开发者还是得悠着点用内存，毕竟这关乎程序的流畅度呢。

#### 谁的速度更快？

很显然，stack 的速度是比较快的。stack 的内存是连续的，一方面不需要额外的链表来维护内存块，只需要一个简单的指针指向当前的栈顶即可；另一方面，在stack 中的段操作会集中在一小块内存中，这是非常利于处理器作缓存处理的。再者，heap 中的数据，作为整个进程的全局资源，所有进程保持同步而保证多线程安全的工作也需要一定的处理时间。

#### 示例

```C++
int aFunction() {
	int x = 0;
	if (true) {
		int y = 12;
	}
	ClassA a = new class();
	ClassB b = new class();
	ClassC c = new class();
}
```

<!-- more -->

{% include stack-heap-demo.html %}
