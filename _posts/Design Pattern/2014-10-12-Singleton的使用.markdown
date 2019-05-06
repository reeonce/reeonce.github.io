---
layout: post
comments: true
title: SINGLETON 的使用
category: Design Pattern
tags: [SINGLETON, Objective-C, 设计模式, Design Pattern]
---

### 场景

在一个 iOS 应用中，有许多类的是只需要一个全局的实例。但是在 Objective-C 中，并没有像 C++ 一样提供静态类的接口。虽然这可以通过静态方法与全局变量的组合来实现，但是这还是略显麻烦。

### 解决方案

*Singleton*（单例）模型确保一个类中只有一个实例对象，并且提供一个可以全局访问的接口。这个类会控制实例的生成，当程序想要再次生成一个实例的时候，类的初始化器返回一个共享的实例（即第一次生成的那个），而不会生成第二个实例。

### Objective-C 的应用

在 Cocoa 的框架中有不少的 Singleton 的类子，包括 *NSFileManager, NSWorkspace, NSApplication* 和 UIApplication*。这些 Singleton 类中返回的共享实例和普通的类实例并没有很大的区别，除了不能对它进行 *copy*，*retain* 和 *release* 操作。

```Objective-C
//MyManager.h
#import <foundation/Foundation.h>

@interface MyManager : NSObject {

}

@property (nonatomic, retain) NSString *someProperty;

+ (id)sharedManager;

@end
```


```Objective-C
//MyManager.m
#import "MyManager.h"

@implementation MyManager

@synthesize someProperty;

+ (id)sharedManager {
    static MyManager *sharedMyManager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedMyManager = [[self alloc] init];
    });
    return sharedMyManager;
}

- (id)init {
  if (self = [super init]) {
      someProperty = [[NSString alloc] initWithString:@"Default Property Value"];
  }
  return self;
}

- (void)dealloc {
  // Should never be called, but just here for clarity really.
}

@end
```
