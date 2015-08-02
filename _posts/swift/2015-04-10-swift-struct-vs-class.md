---
layout: post
title: Swift 中struct vs class
category: swift
tags: struct class swift
---

### Struct in Swift

Swift 中有太多比Objective-C 更新进的特性，其中最为大家喜欢的之一就是struct 的大幅增强。现在，struct 和class 一样可以拥有属性，方法，协议，扩展和初始化器的功能。下面是一个简单的Toy 结构体：

```swift
protocol Talking {
    func saySomething()
}

struct Toy: Talking {
    let name: String
    var color: UIColor

    init(name: String, color: UIColor = UIColor.whiteColor()) {
        (self.name, self.color) = (name, color)
    }

    func saySomething() {
        print("Good morning, my owner.")
    }
}

extension Toy: Printable {
    var description: String {
        return "my name is \(name), with color: \(color)"
    }
}

var woody = Toy(name: "woody", color: UIColor.greenColor())
woody.saySomething()
```

这个玩具结构体拥有了name 和 color 两个属性，实现了Talking 协议的saySomething 方法，还有一个实现Printable 接口的扩展。

然而这却引发了一个新的问题，struct 这么好用，很多功能我不用class 就能实现，那么我该在什么时候使用struct，什么时候使用class 呢？他们有哪些区别？

### 继承

struct 是没有继承这一特性的，而class 的继承则在代码复用和功能扩展上是非常强大的。

虽然struct 可以通过extension 来进行方法上的扩展，但是却不能够添加属性。而使用protocol 来扩展的话，则可能在每一个实现protocol 的struct 中需要写不少重复的代码。所以如果在一个lib 中使用struct 的话，扩展性将会成为一个比较大的问题。

<!-- more -->
### 值传递与引用传递

> One of the most important differences between structures and classes is that structures are always copied when they are passed around in your code, but classes are passed by reference.

struct 在代码中总是传递它的一份拷贝，也就是所谓的按值传递，而class 则总是传递它的引用。可以通过一个例子来解释：

```swift
struct Toy: {
    // the same as above
}

var woody = Toy(name: "woody", color: UIColor.greenColor())
var newWoody = woody
newWoody.color = UIColor.blueColor()

print(woody.color) // green
print(newWoody.color) // blue
```

在woody 赋值给newWoody 的时候，实际上进行了内存的一次拷贝，因此woody 和newWoody 在内存上毫无关系，无论newWoody 在外面干了啥坏事，都与woody 都是安全的。

而class 则不然：

```swift
class Toy: {
    // the same as above
}

var woody = Toy(name: "woody", color: UIColor.greenColor())
var newWoody = woody
newWoody.color = UIColor.blueColor()

print(woody.color) // blue
print(newWoody.color) // blue
```

在woody 赋值给newWoody 的时候，只是简单地把woody 的指针赋值给了newWoody（即newWoody 只是一个woody 的别名而已），它们还是指向了同一内存块。因此newWoody 染了色，woody 的外形也变成了蓝色。

在作为函数的参数时，struct 能够保证原始数据的安全，由于传的参数只是一份拷贝，因此无论怎么对这个参数进行修改都不影响原来的变量（实际上，swift 函数的参数是一个let 的常量，并不允许修改）。而使用class 则经常要注意这个问题，函数中除非是标明的，尽量不要修改参数对象的属性。

### 性能

我们主要看看两种类型的内存分配速度和访问速度。做个简单测试(这段代码不能在playground 里试验，因为playground 里大部分的时间都会被花在界面更新上，而看不出实际效果)：

```swift
struct A {
    var x: Int
}

class B {
    var x: Int

    init(x: Int) {
        self.x = x
    }
}

let time = NSDate()
for i in 0...1000000 {
    let a = A(x: 0)
}
print(time.timeIntervalSinceNow)


let atime = NSDate()
for i in 0...1000000 {
    let b = B(x: 0)
}
print(atime.timeIntervalSinceNow)

var a = A(x: 0)
let ctime = NSDate()
for i in 0...1000000 {
    a.x = 2
}
print(ctime.timeIntervalSinceNow)


let b = B(x: 0)
var dtime = NSDate()
for i in 0...1000000 {
    b.x = 2
}
print(dtime.timeIntervalSinceNow)

//-0.0288899540901184
//-0.156892001628876
//-0.0288629531860352
//-0.0319580435752869
```

可以看出，两个类型的主要性能区别是在内存分配上，struct 的内存分配速度大约是class 的5倍。其原因主要是struct 是在栈上分配内存，而class 则需要在堆里找到可分配内存的地方，再进行分配。而访问速度则差不多，但是struct 还是稍微快一点（原因暂时还不得而知）。

所以在对性能有要求的时候，还是建议使用struct。
