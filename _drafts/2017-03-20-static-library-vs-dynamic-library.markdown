---
layout: post
title: iOS 库及依赖管理
category: ios
tags: [shared library, ios, static library, framework]
---
### 共享代码

当程序员们所写的代码越来越多时，所有的事情从代码共享开始说起。

### 静态库
不链接，所以在静态库中添加动态库的依赖时，并不会

使用静态库，应用启动速度更快，打包的程序更小。

### 动态库

### 依赖管理

### Cocoapods

### Carthage

Frameworks offer the following advantages over static-linked libraries and other types of dynamic shared libraries:

- Frameworks group related, but separate, resources together. This grouping makes it easier to install, uninstall, and locate those resources.
- Frameworks can include a wider variety of resource types than libraries. For example, a framework can include any relevant header files and documentation.
- Multiple versions of a framework can be included in the same bundle. This makes it possible to be backward compatible with older programs.
- Only one copy of a framework’s read-only resources reside physically in-memory at any given time, regardless of how many processes are using those resources. This sharing of resources reduces the memory footprint of the system and helps improve performance.

Some key frameworks—including Carbon, Cocoa, Application Services, and Core Services—provide convenient groupings of several smaller but related frameworks. These framework groups are called umbrella frameworks and they act as an abstraction layer between a technology and the subframeworks that implement that technology.



https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPFrameworks/Frameworks.html
