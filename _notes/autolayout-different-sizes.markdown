---
layout: note
title: auto layout different sizes Programatically
category: iOS
tags: [iOS, "auto layout"]
---

iOS 8 introduces the `active` property on `NSLayoutConstraint`. It allows you to activate or deactivate a constraint. There are also methods to activate/deactivate multiple constraints.

```objective-c
+ (void)activateConstraints:(NSArray *)constraints
+ (void)deactivateConstraints:(NSArray *)constraints
```

* Keep your constraints in arrays when creating them programmatically.

* Create an array for each of the layouts you need.

* Ativate/Deactivate whatever set of constraints you need from within `willTransitionToTraitCollection`
