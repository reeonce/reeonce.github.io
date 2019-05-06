---
layout: post
comments: true
title: Receptionist Pattern
category: Design Pattern
tags: ["设计模式", "Design Pattern", "Objective-C", "Receptionist"]
---

The Receptionist design pattern addresses the general problem of redirecting an event occurring in one execution context of an application to another execution context for handling. It is a hybrid pattern. Although it doesn’t appear in the “Gang of Four” book, it combines elements of the Command, Memo, and Proxy design patterns described in that book. It is also a variant of the Trampoline pattern (which also doesn’t appear in the book); in this pattern, an event initially is received by a trampoline object, so-called because it immediately bounces, or redirects, the event to a target object for handling.

You can adopt the Receptionist design pattern whenever you need to bounce off work to another execution context for handling. When you observe a notification, or implement a block handler, or respond to an action message and you want to ensure that your code executes in the appropriate execution context, you can implement the Receptionist pattern to redirect the work that must be done to that execution context. With the Receptionist pattern, you might even perform some filtering or coalescing of the incoming data before you bounce off a task to process the data. For example, you could collect data into batches, and then at intervals dispatch those batches elsewhere for processing.

One common situation where the Receptionist pattern is useful is key-value observing. In key-value observing, changes to the value of an model object’s property are communicated to observers via KVO notifications. However, changes to a model object can occur on a background thread. This results in a thread mismatch, because changes to a model object’s state typically result in updates to the user interface, and these must occur on the main thread. In this case, you want to redirect the KVO notifications to the main thread. where the updates to an application’s user interface can occur.

#### The Receptionist Design Pattern in Practice

A KVO notification invokes the `observeValueForKeyPath:ofObject:change:context:` method implemented by an observer. If the change to the property occurs on a secondary thread, the observeValueForKeyPath:ofObject:change:context: code executes on that same thread. There the central object in this pattern, the receptionist, acts as a thread intermediary. As Figure 4-5 illustrates, a receptionist object is assigned as the observer of a model object’s property. The receptionist implements `observeValueForKeyPath:ofObject:change:context:` to redirect the notification received on a secondary thread to another execution context — the main operation queue, in this case. When the property changes, the receptionist receives a KVO notification. The receptionist immediately adds a block operation to the main operation queue; the block contains code — specified by the client — that updates the user interface appropriately.

<!-- more -->

Figure 4-5  Bouncing KVO updates to the main operation queue
![](/assets/design_patterns/receptionist.jpg)

You define a receptionist class so that it has the elements it needs to add itself as an observer of a property and then convert a KVO notification into an update task. Thus it must know what object it’s observing, the property of the object that it’s observing, what update task to execute, and what queue to execute it on. Listing 4-1 shows the initial declaration of the RCReceptionist class and its instance variables.

Listing 4-1  Declaring the receptionist class

```objc
@interface RCReceptionist : NSObject {
    id observedObject;
    NSString *observedKeyPath;
    RCTaskBlock task;
    NSOperationQueue *queue;
}
```

The RCTaskBlock instance variable is a block object of the following declared type:

```objc
typedef void (^RCTaskBlock)(NSString *keyPath, id object, NSDictionary *change);
```

These parameters are similar to those of the observeValueForKeyPath:ofObject:change:context: method. Next, the parameter class declares a single class factory method in which an RCTaskBlock object is a parameter:

```objc
+ (id)receptionistForKeyPath:(NSString *)path
        object:(id)obj
         queue:(NSOperationQueue *)queue
          task:(RCTaskBlock)task;
```

It implements this method to assign the passed-in value to instance variables of the created receptionist object and to add that object as an observer of the model object’s property, as shown in Listing 4-2.

Listing 4-2  The class factory method for creating a receptionist object

```objc
+ (id)receptionistForKeyPath:(NSString *)path object:(id)obj queue:(NSOperationQueue *)queue task:(RCTaskBlock)task {
    RCReceptionist *receptionist = [RCReceptionist new];
    receptionist->task = [task copy];
    receptionist->observedKeyPath = [path copy];
    receptionist->observedObject = [obj retain];
    receptionist->queue = [queue retain];
    [obj addObserver:receptionist forKeyPath:path
             options:NSKeyValueObservingOptionNew | NSKeyValueObservingOptionOld context:0];
    return [receptionist autorelease];
}
```

> Note that the code copies the block object instead of retaining it. Because the block was probably created on the stack, it must be copied to the heap so it exists in memory when the KVO notification is delivered.

Finally, the parameter class implements the observeValueForKeyPath:ofObject:change:context: method. The implementation (see Listing 4-3) is simple.

Listing 4-3  Handling the KVO notification

```objc
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object
        change:(NSDictionary *)change context:(void *)context {
    [queue addOperationWithBlock:^{
        task(keyPath, object, change);
    }];
}
```

This code simply enqueues the task onto the given operation queue, passing the task block the observed object, the key path for the changed property, and the dictionary containing the new value. The task is encapsulated in an NSBlockOperation object that executes the task on the queue.

The client object supplies the block code that updates the user interface when it creates a receptionist object, as shown in Listing 4-4. Note that when it creates the receptionist object, the client passes in the operation queue on which the block is to be executed, in this case the main operation queue.

Listing 4-4  Creating a receptionist object

```objc
RCReceptionist *receptionist = [RCReceptionist receptionistForKeyPath:@"value" object:model queue:mainQueue task:^(NSString *keyPath, id object, NSDictionary *change) {
    NSView *viewForModel = [modelToViewMap objectForKey:model];
    NSColor *newColor = [change objectForKey:NSKeyValueChangeNewKey];
    [[[viewForModel subviews] objectAtIndex:0] setFillColor:newColor];
}];
```
