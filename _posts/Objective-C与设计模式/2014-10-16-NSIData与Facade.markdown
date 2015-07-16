---
layout: post
title: NSData 中的 FACADE
category: OC与设计模式
tags: [FACADE, NSImage, objective-c, 设计模式]
---

### 场景

In effect, a persistent store coordinator defines a stack. The coordinator is designed to present a façade to the managed object contexts so that a group of persistent stores appears as a single aggregate store. A managed object context can then create an object graph based on the union of all the data stores the coordinator covers. A coordinator can only be associated with one managed object model. If you want to put different entities into different stores, you must partition your model entities by defining configurations within the managed object models

### 解决方案

The Facade（外观） design pattern provides a unified interface to a set of interfaces in a subsystem. The pattern defines a higher-level interface that makes the subsystem easier to use by reducing complexity and hiding the communication and dependencies between subsystems.

<img src="/assets/advanced_persistence_stack_2x.png" style="max-width: 50%" />

This picture shows an example where employees and departments are stored in one file, and customers and companies in another. When you fetch objects, they are automatically retrieved from the appropriate file, and when you save, they are archived to the appropriate file.
