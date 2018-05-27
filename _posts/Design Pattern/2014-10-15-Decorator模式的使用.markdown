---
layout: default
comments: true
title: DECORATOR 模式的使用
category: Design Pattern
tags: [DECORATOR, Delegation, Objective-C, 设计模式, Design Pattern]
---

### 介绍

The Decorator（装饰） design pattern attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality. As does subclassing, adaptation of the Decorator pattern allows you to incorporate new behavior without modifying existing code. Decorators wrap an object of the class whose behavior they extend. They implement the same interface as the object they wrap and add their own behavior either before or after delegating a task to the wrapped object. The Decorator pattern expresses the design principle that classes should be open to extension but closed to modification.

### General Comments

Decorator is a pattern for object composition, which is something that you are encouraged to do in your own code (see When to Make a Subclass). Cocoa, however, provides some classes and mechanisms of its own (discussed in the following sections) that are based on the pattern. In these implementations, the extending object does not completely duplicate the interface of the object that it wraps, and the implementations use different techniques for interface sharing.

Cocoa uses the Decorator pattern in the implementation of several of its classes, including NSAttributedString, NSScrollView, and UIDatePicker. The latter two classes are examples of compound views, which group together simple objects of other view classes and coordinate their interaction.

### Delegation

Delegation is a mechanism by which a host object embeds a weak reference (weak in the sense that it’s a simple pointer reference, unretained) to another object—its delegate—and periodically sends messages to the delegate when it requires its input for a task. The host object is generally an “off-the-shelf” framework object (such as an NSWindow or NSXMLParser object) that is seeking to accomplish something, but can only do so in a generic fashion. The delegate, which is almost always an instance of a custom class, acts in coordination with the host object, supplying program-specific behavior at certain points in the task (see Figure 4-3). Thus delegation makes it possible to modify or extend the behavior of another object without the need for subclassing.

<!-- more -->

Figure 4-3  Framework object sending a message to its delegate
![](/assets/delegation.gif)

Delegation, in the simple sense of one object delegating a task to another object, is a common technique in object-oriented programming. However, Cocoa implements delegation in a unique way. A host class uses a formal protocol or an informal protocol to define an interface that the delegate object may choose to implement. All the methods in the informal protocol are optional, and the formal protocol may declare optional methods, allowing the delegate to implement only some of the methods in the protocol. Before it attempts to send a message to its delegate, the host object determines whether it implements the method (via a respondsToSelector: message) to avoid runtime exceptions. For more on formal and informal protocols, see Protocols.

Some classes in the Cocoa frameworks also send messages to their data sources. A data source is identical in all respects to a delegate, except that the intent is to provide the host object with data to populate a browser, a table view, or similar user-interface view. A data source, unlike a delegate, may also be required to implement some methods of the protocol.

Delegation is not a strict implementation of the Decorator pattern. The host (delegating) object does not wrap an instance of the class it wants to extend; indeed, it’s the other way around, in that the delegate is specializing the behavior of the delegating framework class. There is no sharing of interface either, other than the delegation methods declared by the framework class.

Delegation in Cocoa is also part of the Template Method pattern (Template Method).

Uses and Limitations
Delegation is a common design in the Cocoa frameworks. Many classes in the AppKit and UIKit frameworks send messages to delegates, including NSApplication, UIApplication, UITableView, and several subclasses of NSView. Some classes in the Foundation framework, such as NSXMLParser and NSStream, also maintain delegates. You should always use a class’s delegation mechanism instead of subclassing the class, unless the delegation methods do not allow you to accomplish your goal.

Although you can dynamically change the delegate, only one object can be a delegate at a time. Thus if you want multiple objects to be informed of a particular program event at the same time, you cannot use delegation. However, you can use the notification mechanism for this purpose. A delegate automatically receives notifications from its delegating framework object as long as the delegate implements one or more of the notification methods declared by the framework class. See the discussion of notifications in the Observer pattern (Observer).

Delegating objects in AppKit do not retain their delegates or data sources. See Ownership of Delegates, Observers, and Targets for further information.

Further Reading: For further information on delegation, see Delegates and Data Sources“.

### Categories

A category is a feature of the Objective-C language that enables you to add methods (interface and implementation) to a class without having to make a subclass. There is no runtime difference—within the scope of your program—between the original methods of the class and the methods added by the category. The methods in the category become part of the class type and are inherited by all the class’s subclasses.

As with delegation, categories are not a strict adaptation of the Decorator pattern, fulfilling the intent but taking a different path to implementing that intent. The behavior added by categories is a compile-time artifact, and is not something dynamically acquired. Moreover, categories do not encapsulate an instance of the class being extended.

Uses and Limitations
The Cocoa frameworks define numerous categories, most of them informal protocols (which are summarized in Protocols). Often they use categories to group related methods. You may implement categories in your code to extend classes without subclassing or to group related methods. However, you should be aware of these caveats:

You cannot add instance variables to the class.
If you override existing methods of the class, your application may behave unpredictably.
Further Reading: See Defining a Class in The Objective-C Programming Language for more information on categories.
