---
layout: post
title: iOS 内存管理
category: ios
tags: [ARC, ios, 内存管理]
---

## ARC

### 一些强制规则 

* *retain*，*release*，*autorelease* 和 *retainCount* 这些方法则是不能调用和实现的。而通过使用 *@selector(retain)*， *@selector(release)* 的方式也是不被允许的。
	不能显示调用 *dealloc*，但是可以实现这个方法。实现的时候不需要调用 *[super dealloc]* （编译器会自动调用）。

* 不能通过 *NSAllocateObject* 和 *NSDeallocateObject* 来创建对象。

* 不能使用指向 C 结构体的指针，应该使用一个类来管理结构题的数据。

* *id* 和 *void \** 是不能直接互相转换的。

* Obejctive-C 不允许使用 *NSAutoreleasePool* 对象，但是提供了 *autoreleasepool* 这一更佳高效的方式。

* 不能使用 *NSZone*。

* 不能以 *newXxx* 来给某个访问器命名。 

	```Objective-C
	// Won't work:
	@property NSString *newTitile;

	//Workds:
	@property (getter=theNewTitle) NSString *newTitle;
	```

### 新的生命周期限定

#### @property 属性

*strong* 与 *weak*，默认情况下为 strong。

```Objective-C
@property(strong) MyClass *mo;

@property(weak) MyClass *mo;
```

#### 变量的限定

```
__strong
__weak
__unsafe_unretained
__autoreleasing

// 使用规则
ClassName * qualifier variableName;
```

* *__strong* 是默认的限定方式。变量会一直保持 "生存" 只要还有强引用的指针指向它。

* *__weak* 不会使引用对象保持生存，当没有强引用指向这个对象时，弱引用变量会指向 *nil*

	```Objective-C
	NSString * __weak string = [[NSString alloc] initWithFormat: @"A name"];
	NSLog(@"string: %@", string);
	```

	尽管第一条语句中 *string* 被赋予了一个新的 NSString \* 的 引用，但是由于没有强引用指向它，它将立马被释放，string 也指向了 nil，因此输出结果显示 string 为空。

* *__unsafe_unretained* 与 __weak 很类似，只是不会将变量设置为 nil，而是继续指向那个区域。

* *__autoreleasing* 用来指示通过 *id \** 来传递并且自动 release 的参数。

前三者会被初始化为 nil。

### 避免强引用回路

#### 父子依赖

将 父对子 的依赖关系设置为 strong，将 子对父 的依赖关系设置为 weak。

#### 手动管理 __block id x

在 ARC 模式下， __block id x 默认是会被保存的（strong）。为了手动管理计数，可以通过 __weak id x 来处理，有的时候如果 __weak 无法兼容的话，则可以考虑使用 __unsafe_unretained。

```Objective-C
MyViewController * __block myController = [[MyViewController alloc] init];
//...
myController.completionHandler = ^(NSInteger result) {
	[myController dismissViewControllerAnimated: YES completoin: nil];
	myController = nil;
}

//works too.
MyViewController * myController = [[MyViewController alloc] init];
MyViewController * __weak myWeakController = myController;
//...
myController.completionHandler = ^(NSInteger result) {
	MyViewController * myStrongController = myWeakController;
	if (myStrongController) {
		[myStrongController dismissViewControllerAnimated: YES completoin: nil];
	} else {
		//
	}
}
```

### @autoreleasepool

```Objective-C
@autoreleasepool {
	// Code, such as a loop that creates a large number of temporary obejcts.
}
```

This simple structure allows the compiler to reason about the reference count state. On entry, an autoreleasepool is pushed. On normal exit(break, return, goto, fall-through, and so on) the autoreleasepool is poped.

### Outlets should be weak

[Resource Programming Guide]()

### 配置编译器来支持或者取消 ARC

*-fobjc-arc* 这一编译器标志，*-fno-objc-arc* 来取消。支持 Xcode 4.2 以上， OS X v10.6 以上， iOS 4 以上。

### Toll-Free Bridging

There are a number of data types in the Core Foundation framework and the Foundation framework that can be used interchangeably. This capability, called toll-free bridging , means that you can use the same data type as the parameter to a Core Foundation function call or as the receiver of an Objective-C message. 

Core Foundation type | Foundation class
---------------------|---------------------
CFArrayRef | NSArray
CFAttributedStringRef | NSAttributedString
CFCalendarRef | NSCalendar
CFCharacterSetRef | NSCharacterSet
CFDataRef | NSData
CFDateRef | NSDate
CFDictionaryRef | NSDictionary
CFErrorRef | NSError
CFLocaleRef | NSLocale
CFMutableArrayRef | NSMutableArray
CFMutableAttributedStringRef | NSMutableAttributedString
CFMutableCharacterSetRef | NSMutableCharacterSet
CFMutableDataRef | NSMutableData
CFMutableDictionaryRef | NSMutableDictionary
CFMutableSetRef | NSMutableSet
CFMutableStringRef | NSMutableString
CFNumberRef | NSNumber
CFReadStreamRef | NSInputStream
CFRunLoopTimerRef | NSTimer
CFSetRef | NSSet
CFStringRef | NSString
CFTimeZoneRef | NSTimeZone
CFURLRef | NSURL
CFWriteStreamRef | NSOutputStream

Not all data types are toll-free bridged, even though their names might suggest that they are. For example, NSRunLoop is not toll-free bridged to CFRunLoop, NSBundle is not toll-free bridged to CFBundle, and NSDateFormatter is not toll-free bridged to CFDateFormatter.

编译器不会自动管理 Core Foundation 对象的生命周期，因此你必须手动地调用 *CFRetain* 和 *CFRelease*。当需要将 Core Foundation 对象与 Objective-C 对象相互转换时，你需要通过 cast 或者 Core Foundation 的宏方法来告知编译器对象的语义关系。

* *__bridge* 只转换指针类型，不转换所属关系

* *__bridge_retained* 或者 *CFBridgingRetain* 转换指针类型，并将所属关系转换给你，你需要手动地调用 *CFRelease*

* *__bridge_transfer* 或者 *CFBridgingRelease* 会将非 Objective-C 指针转换为 Objective-C 指针，并且将所属关系交给 ARC。

```Objective-C
- voidlogFirstNameOfPerson: (ABRecordRef)person {
	NSString *name = (NSString *)CFBridgingRelease(ABRecordCopyValue(person, kABPersonFirstNameProperty));
}
```

## [Advanced Memory Management Programming Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/MemoryMgmt/Articles/MemoryMgmt.html#//apple_ref/doc/uid/10000011i)

### Ownership Policy Is Implemented Using Retain Counts

The ownership policy is implemented through reference counting—typically called “retain count” after the retain method. Each object has a retain count.

* When you create an object, it has a retain count of 1.
* When you send an object a retain message, its retain count is incremented by 1.
* When you send an object a release message, its retain count is decremented by 1.
* When you send an object a autorelease message, its retain count is decremented by 1 at the end of the current autorelease pool block.

If an object’s retain count is reduced to zero, it is deallocated.

## [Memory Management Programming Guide for Core Foundation](https://developer.apple.com/library/mac/documentation/CoreFoundation/Conceptual/CFMemoryMgmt/CFMemoryMgmt.html#//apple_ref/doc/uid/10000127i)



