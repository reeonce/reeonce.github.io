---
layout: post
title: 选择类型 - optional type
category: swift
tags: ["optinal type", swift]
---

### 什么是 *optional type*

在Objective-C 中，我们使用一个可以为空(在Objective-C 中为nil )的原始指针来指向一个对象。而在swift 中，不管是结构体还是对象引用，所有的值都被保证是不能为nil 的。相反，你可以给一个值套上选择类型来表现出这个值是可以为空的。

>Swift also introduces optional types, which handle the absence of a value. Optionals say either “there is a value, and it equals x” or “there isn’t a value at all”. Optionals are similar to using nil with pointers in Objective-C, but they work for any type, not just classes.

*optinal type* 有什么好处呢?

>Optionals are safer and more expressive than nil pointers in Objective-C and are at the heart of many of Swift’s most powerful features. Optionals are an example of the fact that Swift is a type safe language. Swift helps you to be clear about the types of values your code can work with. If part of your code expects a String, type safety prevents you from passing it an Int by mistake. This enables you to catch and fix errors as early as possible in the development process.

### 什么时候使用Optionals
#### 与AnyObject 一起使用

#### 可能为nil 的引用应该用


