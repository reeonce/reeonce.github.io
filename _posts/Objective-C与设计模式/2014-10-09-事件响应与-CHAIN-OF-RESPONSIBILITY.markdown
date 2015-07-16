---
layout: post
title:  "事件响应 - CHAIN OF RESPONSIBILITY"
categories: OC与设计模式
tags: [CHAIN OF RESPONSIBILITY, 职责链, objective-c, 设计模式]
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

<!-- more -->

## CHAIN OF RESPONSIBILITY 的做法

1.

## Objective-C 中的实现

The Chain of Responsibility design pattern decouples the sender of a request from its receiver by giving more than one object a chance to handle the request. The pattern chains the receiving objects together and passes the request along the chain until an object handles it. Each object in the chain either handles the request or passes it to the next object in the chain.

Responder Chain

The application frameworks include an architecture known as the responder chain. This chain consists of a series of responder objects (that is, objects inheriting from NSResponder or, in UIKit, UIResponder) along which an event (for example, a mouse click) or action message is passed and (usually) eventually handled. If a given responder object doesn’t handle a particular message, it passes the message to the next responder in the chain. The order of responder objects in the chain is generally determined by the view hierarchy, with the progression from lower-level to higher-level responders in the hierarchy, culminating in the window object that manages the view hierarchy, the delegate of the window object, or the global application object. The paths of events and action messages up the responder chain is different. An application can have as many responder chains as it has windows (or even local hierarchies of views); but only one responder chain can be active at a time—the one associated with the currently active window.

The AppKit framework also implements a similar chain of responders for error handling.

iOS Note: UIKit implements the responder chain differently than AppKit does. If a view is managed by a UIViewController object, the view controller becomes the next responder in the chain (and from there the event or action message passes to the view’s superview). In addition, UIKit does not support a document architecture per se; therefore there are no document objects or window-controller objects in the responder chain. There is also no error-handling responder chain in iOS.
The design of the view hierarchy, which is closely related to the responder chain, adapts the Composite pattern (Composite). Action messages—messages originating from control objects—are based on the target-action mechanism, which is an instance of the Command pattern (Command).

Uses and Limitations
When you construct a user interface for a program either by using Interface Builder or programmatically, you get one or more responder chains “for free.” The responder chain goes hand in hand with a view hierarchy, which you get automatically when you make a view object a subview of a window’s content view. If you have a custom view added to a view hierarchy, it becomes part of the responder chain. If you implement the appropriate NSResponder or UIResponder methods, you can receive and handle events and action messages. A custom object that is a delegate of a window object or the global application object (NSApp in AppKit) can also receive and handle those messages.

You can also programmatically inject custom responders into the responder chain and you can programmatically manipulate the order of responders.

Further Reading: The AppKit responder chains for handling events and action messages and for handling errors are described in Cocoa Event Handling Guide and Error Handling Programming Guide. The UIKit responder chain is described in Event Handling Guide for iOS. The view hierarchy is a related design pattern that is summarized in Composite.
