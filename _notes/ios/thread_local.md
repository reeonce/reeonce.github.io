---
layout: default
comments: true
---

Compile Error:

thread-local storage is not supported for the current target


thread-local 只能是支持iOS 9.0 及以上的target


cmake -DCMAKE_TOOLCHAIN_FILE=/xx/ios.toolchain.cmake -DIOS_DEPLOYMENT_TARGET="9.0" ..

或者是

在Build Settings 中的Other C++ Flags 中加上

-miphoneos-version-min=9.0