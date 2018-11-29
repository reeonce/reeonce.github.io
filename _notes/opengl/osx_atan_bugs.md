---
layout: default
comments: true
---

### mac 中 atan(y, -x) bug

```glsl
float angle = atan(pos.y, -pos.x);
```

在glsl 中，经常用这个函数来获取到点在xy 平面上与-x 方向的夹角。比如 `pos = vec3(0.5, 0.5, 0.0)` 的时候，得到的angle 应该是 pi / 4，然而在有些mac 上不管pos 是什么值，得到的值永远是 pi / 2。

这个bug 在[chromium bugs](https://bugs.chromium.org/p/chromium/issues/detail?id=308366) 中有被提到。

解决方案是将 -pos.x 改为 -1.0 * pos.x 或者 0.0 - pos.x，


test your mac:
[https://www.shadertoy.com/view/XtSXDd](https://www.shadertoy.com/view/XtSXDd)