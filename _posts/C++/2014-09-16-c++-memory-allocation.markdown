---
layout: post
categories: C++
---

new 分配的内存块通常与常规变量声明分配的内存块不同。常规变量的值都被存储在被称为“栈(stack)”的内存区域中，而new 从被称为“堆(heap)”或者“自由区域区(free store)”的内存区域中分配。

在编译时给数组分配内存被称为**静态联编**(static blinding)，意味着数组在编译时加入到程序中。但是new 是在运行阶段选择数组的长度，称为**动态联编**(dynamic blinding)。

### Reference:
1. [C++ Primer Plus]
