---
layout: post
title: "iOS 中的 view"
category: ios
tags: [view, window, frame, bound, animation]
---

#### 视图的架构

![](/assets/view-layer-store.jpg)

一般情况，一个应用只有一个窗体(window)。每一个视图都会有相应的 layer 对象，这个对象可以通过视图的 *layer* 属性得到。Behind those layer objects are Core Animation rendering objects and ultimately the hardware buffers used to manage the actual bits on the screen.


#### view 的继承与 subview 的管理

父视图使用一个有序的数组来存储子视图，如果两个子视图互相重叠，后面被添加到子视图数组中的那一个将会在更上层。

事件响应链，当一个触摸事件发生在某个视图里面时，系统会直接发送一个包含触摸信息的事件对象给这个视图进行处理。如果这个视图没有对这个事件进行单独的处理，它可以将这个事件发送给它的父视图。如果它的父视图还是没有处理这个事件，那么它的父视图可以又将这个事件传给这个父视图的父视图，就这样顺着响应链往上。如果一直没有视图对象处理这个事件，这个事件最终将到达 application 对象，通常情况下， application 对象会忽略这个事件。

#### the View Drawing Cycle

*UIView* 类使用 on-demand drawing model 来显示内容。

*setNeedsDisplay* or *setNeedsDisplayInRect*: 方法来告诉系统下一次刷新的时候需要更新这个视图的内容。系统直到此次运行回路结束才会开始绘画操作。这一延时使你能够保证你的所有修改在同一时刻刷新到屏幕上。

For custom UIView subclasses, you typically override the drawRect: method of your view and use that method to draw your view’s content. There are also other ways to provide a view’s content, such as setting the contents of the underlying layer directly, but overriding the drawRect: method is the most common technique.

#### Content Modes

每一个视图都有一个content mode, 当视图的几何体得到改变时，视图通过content mode 来确定如何复用之前的内容。当一个视图第一次被显示的时候，它的内容会像平常一样被映射到一个基本的位图上。之后，并不是所有的对视图几何体的改变都会重新创建这样一个位图，而由 *contentMode* 这个属性来决定这个位图是被放大还是移动到视图的一个角落。

默认情况下，*contentMode* 会被设置为 *UIViewContentModeScaleToFill*。还可以使用 *UIViewContentModeRedraw* 这个值来强制系统响应视图的几何改变时调用 *drawRect*。

![](/assets/scale_aspect.jpg)

#### Stretchable Views

*contentStretch* 属性。Stretchable areas are only used when the content mode would cause the view’s content to be scaled. This means that stretchable views are supported only with the UIViewContentModeScaleToFill, UIViewContentModeScaleAspectFit, and UIViewContentModeScaleAspectFill content modes. 

Stretchable views are handled entirely in the Core Animation layer, which typically offers better performance.

#### Built-In Animation Support
Among the properties you can animate on a UIView object are the following: 
	
* frame—Use this to animate position and size changes for the view. 
* bounds—Use this to animate changes to the size of the view. 
* center—Use this to animate the position of the view.
* transform—Use this to rotate or scale the view.
* alpha—Use this to change the transparency of the view. 
* backgroundColor—Use this to change the background color of the view. 
* contentStretch—Use this to change how the view’s contents stretch.

Typically, you use a view controller to manage the animations associated with major changes between parts of your user interface. In addition to the animations you create using UIKit classes, you can also create animations using Core Animation layers. Dropping down to the layer level gives you much more control over the timing and properties of your animations.

#### 视图的几何结构与坐标系

在 UIKit 中默认的坐标系中，原点在左上角，x轴往右延伸，y轴往下延伸。坐标值为能更精确布局和定位的浮点数字，而不像底层屏幕使用的整数像素点。

![](/assets/native_coordinate_system.jpg)

一些 iOS 技术并没有和UIKit 定义一样的坐标系。比如 *Core Graphics* 和 *OpenGL ES*, 坐标系的原点在左下角。

#### Frame, Bounds, 和 Center 属性的关系

* *frame* 属性包含了一个框架矩形，定义了这个视图在父视图坐标系中的大小和位置。
* *bound* 属性包含了一个范围矩形，定义了这个视图在本身坐标系中的大小。
* *center* 属性表示了这个视图在父视图坐标系中的已知中心点的位置。

在维护视图的几何结构的时候，一般情况下通过修改 *center* 和 *frame* 属性。如果只改变位置的话，表较好的方式是修改 *center* 属性的值，因为 *center* 的值即使在视图经过缩放和旋转的变换后仍然有效，而 *frame* 的值则不一定。

通过改变其中一个属性的值是可能会影响另外两个值的改变的。

默认情况下，视图是可以出现在父视图的框架外面的，但是可以通过设置 *clipsToBounds* 属性的值为 *YES* 来改变这一行为。触摸事件则不然，它只会在父视图的范围内得到响应。

#### 坐标系转换

> If a view’s transform property is not the identity transform,the value of that view’s frame property is undefined and must be ignored. When applying transforms to a view, you must use the view’s bounds and center properties to get the size and position of the view. The frame rectangles of any subviews are still valid because they are relative to the view’s bounds.

#### Points vs Pixes

设备           |  屏幕大小(Point)
:---------| :--------- 
iphone5及以上 &nbsp; &nbsp; &nbsp; &nbsp; | 320 x 568 
其它iPhone    | 320x 480 
ipad         | 768 x 1024

The point-based measuring system used for each type of device defines what is known as the user coordinate space. This is the standard coordinate space you use for nearly all of your code. 

One point does not necessarily correspond to one pixel on the screen.

the mapping of points in the user coordinate space to pixels in the device coordinate space is normally handled by the system. 

#### 视图的运行时交互模型

![](/assets/drawing_model.jpg)

#### 使用视图的一些小建议

* **Views 并不总是需要一个相应的 View Controller**。

* **Minimize Custom Drawing**。The only time you should truly do any custom drawing is when the existing system view classes do not provide the appearance or capabilities that you need. Any time your content can be assembled with a combination of existing views, your best bet is to combine those view objects into a custom view hierarchy.

* **充分利用 Content Modes**。Content modes 能够大量减少重绘视图的消耗。尽量避免使用 *UIViewContentModeRedraw* 模式。不管你使用什么模式，你都能够通过调用 *setNeedsDisplay* 或者 *setNeedsDisplayInRect:* 来强制视图重绘。

* **尽可能地将视图的 *opaque设置为 *YES* **。 Setting the value of this property to YES for a custom view tells UIKit that it does not need to render any content behind your view. Less rendering can lead to increased performance for your drawing code and is generally encouraged. Of course, if you set the opaque property to YES, your view must fill its bounds rectangle completely with fully opaque content.

* **在滚屏时适当调整视图的行为**。滚屏会在很短的时间更新大量的视图内容，如果视图的绘制代码没有得到优化的话，将会很卡顿。有一种更简单的优化方法就是，改变视图的一些行为，比如降低内容的质量或者改变 contentMode，当滚动停止时，你再恢复视图原来的状态。

* **不要通过在控件中嵌入子视图来定制**。虽然可以通过继承 *UIControl* 类来添加子视图到标准系统控件中。这是不被建议的，因为 control 类已经定义了足够明确且详细的接口来实现这些功能。如果添加子视图可能会使控件在将来的版本中出现问题。

#### 参考: 
[View Programming Guide for iOS](https://developer.apple.com/library/ios/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/WindowsandViews/WindowsandViews.html)

