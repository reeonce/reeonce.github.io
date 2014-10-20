---
layout: post
title:  "CHAIN OF RESPONSIBILITY 处理事件响应"
date:   2014-10-09 08:51:46
categories: Objective-C与设计模式
---

## CHAIN OF RESPONSIBILITY(职责链)

CHAIN OF RESPONSIBILITY 是一种对象行为型模式，《设计模式》中：

> 行为型模式涉及到算法和对象间的职责分配，不仅描述对象或类的模式，还描述它们之间的通信方式，刻划了运行时难以跟踪的复杂的控制流，它们将你的注意力从控制流转移到对象间的关系上来。

CHAIN OF RESPONSIBILITY 的意图

> 使多个对象都有机会处理请求，从而避免请求的发送者与接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

CHAIN OF RESPONSIBILITY 的试用条件

1. 有多个对象可以处理一个请求，哪个对象处理该请求是在运行时刻自动确定。

2. 在不明确指定接受者的情况下，向多个对象中的一个提交一个请求。

3. 可处理这个请求的对象集合是被动态确定的

CHAIN OF RESPONSIBILITY 的效果

1. 降低藕合度，发送者无需直到是哪一个对象处理其请求

2. 增强了给对象指派 RESPONSIBILITY 的灵活性，可以动态地添加或者修改链中的对象。

3. 不保证被接收，该请求很可能一直到链的末端都得不到处理。

## CHAIN OF RESPONSIBILITY 的做法

1. 

## Objective-C 中的实现