---
layout: post
comments: true
title: View Controller 与 MEDIATOR 模式
category: Design Pattern
tags: [MEDIATOR, Objective-C, 设计模式, Design Pattern]
---

The Mediator design pattern defines an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently. These objects can thus remain more reusable.

A "mediator object” in this pattern centralizes complex communication and control logic between objects in a system. These objects tell the mediator object when their state changes and, in turn, respond to requests from the mediator object.

Controller Classes in the AppKit Framework

The Model-View-Controller design pattern assigns roles to the objects in an object-oriented system such as an application. They can be model objects, which contain the data of the application and manipulate that data; they can be view objects, which present the data and respond to user actions; or they can be controller objects, which mediate between the model and view objects. Controller objects fit the Mediator pattern.

In Cocoa, controller objects can be of two general types: mediating controllers or coordinating controllers. Mediating controllers mediate the flow of data between view objects and model objects in an application. Mediating controllers are typically NSController objects. Coordinating controllers implement the centralized communication and control logic for an application, acting as delegates for framework objects and as targets for action messages. They are typically NSWindowController objects or instances of custom NSObject subclasses. Because they are so highly specialized for a particular program, coordinating controllers tend not to be reusable.

The abstract class NSController and its concrete subclasses in the AppKit framework are part of the Cocoa technology of bindings, which automatically synchronizes the data contained in model objects and displayed and edited in view objects. For example, if a user edits a string in a text field, the bindings technology communicates that change—through a mediating controller—to the appropriate property of the bound model object. All programmers need to do is properly design their model objects and, using Interface Builder, establish bindings between the view, controller, and model objects of a program.

Instances of the concrete public controller classes are available from the Interface Builder library and hence are highly reusable. They provide services such as the management of selections and placeholder values. These objects perform the following specific functions:

<!-- more -->

NSObjectController manages a single model object.
NSArrayController manages an array of model objects and maintains a selection; it also allows you to add objects to and remove objects from the array.
NSTreeController enables you to add, remove, and manage model objects in a hierarchical tree structure.
NSUserDefaultsController provides a convenient interface to the preferences (user defaults) system.
Uses and Limitations
Generally you use NSController objects as mediating controllers because these objects are designed to communicate data between the view objects and model objects of an application. To use a mediating controller, you typically drag the object from the Interface Builder library, specify the model-object property keys, and establish the bindings between view and model objects using the Bindings pane of the Interface Builder Info window. You can also subclass NSController or one of its subclasses to get more specialized behavior.

You can potentially make bindings between almost any pair of objects as long as those objects comply with the NSKeyValueCoding and NSKeyValueObserving informal protocols. But to get all the benefits NSController and its subclasses give you, it is better to make bindings through mediating controllers.

Coordinating controllers centralize communication and control logic in an application by:

Maintaining outlets to model and view objects (outlets are instance variables that hold connections or references to other objects)
Responding to user manipulations of view objects through target-action (see The Target-Action Mechanism)
Acting as a delegate for messages sent by framework objects (see Delegation)
You usually make all of the above connections—outlets, target-action, and delegates—in Interface Builder, which archives them in the application’s nib file.

Further Reading: See The Model-View-Controller Design Pattern for a discussion of mediating controllers, coordinating controllers, and design decisions related to controllers. Cocoa Bindings Programming Topics describes the mediating controller classes in detail.

View Controllers in UIKit

Applications running in iOS frequently use a modal and navigational user-interface design for presenting screen-size chunks of the application’s data model. An application may have a navigation bar and a toolbar, and between these objects is the current view of application data. Users can tap buttons on the toolbar to select a mode, tap buttons on the navigation bar, and tap controls in the current view to traverse a hierarchy of model (data) objects; at each level the central view presents more detail. At the end of this hierarchy is often an item that the user can inspect or edit. (An application, of course, is free to use just a navigation bar or just a toolbar.)

View controllers—that inherit from UIViewController—are central to this design. UIViewController is an abstract class that you can subclass to manage a particular view. The UIKit framework also provides UIViewController subclasses for managing navigation bar and toolbar objects: UINavigationController and UITabBarController. As depicted in Figure 4-4, a tab-bar controller can manage a number of navigation controllers, which in turn can manage one or more view controllers, each with its associated view object. In addition to managing views (including overlay views), a view controller specifies the buttons and titles that are displayed in the navigation bar.

To learn more about view controllers, see View Controller Programming Guide for iOS.

Figure 4-4  View controllers in UIKit
![](/assets/uictlr_object_diagram.jpg)
