---
layout: post
title: 视图与COMPOSITE
category: OC与设计模式
tags: [COMPOSITE, view, objective-c, 设计模式]
---

### 介绍

COMPOSITE（组合）模式将对象组合成属性结构以表示“部分－整体”的层次结构。COMPOSITE 使得用户对单个对象和组合对象的使用具有一致性。

Composite 对象结构图：

![](/assets/diagrams/diagram-02.png)

### 场景

The views (NSView or UIView objects) in a window are internally structured into a view hierarchy. At the root of the hierarchy is a window (NSWindow or UIWindow object) and its content view, a transparent view that fills the window’s content rectangle. Views that are added to the content view become subviews of it, and they become the superviews of any views added to them. Except for the content view, a view has one (and only one) superview and zero or any number of subviews. You perceive this structure as containment: a superview contains its subviews. Figure 4-2 shows the visual and structural aspects of the view hierarchy.

Figure 4-2  The view hierarchy, visual and structural
![](/assets/view_hierarchy.gif)

The view hierarchy is a structural architecture that plays a part in both drawing and event handling. A view has two bounding rectangles, its frame and its bounds, that affect how graphics operations with the view take place. The frame is the exterior boundary; it locates the view in its superview’s coordinate system, defines its size, and clips drawing to the view’s edges. The bounds, the interior bounding rectangle, defines the internal coordinate system of the surface where the view draws itself.

When a window is asked by the windowing system to prepare itself for display, superviews are asked to render themselves before their subviews. When you send some messages to a view—for example, a message that requests a view to redraw itself—the message is propagated to subviews. You can thus treat a branch of the view hierarchy as a unified view.

The view hierarchy is also used by the responder chain for handling events and action messages. See the summary of the responder chain in Chain of Responsibility.

Uses and Limitations

You create or modify a view hierarchy whenever you add a view to another view, either programmatically or using Interface Builder. The AppKit framework automatically handles all the relationships associated with the view hierarchy.
