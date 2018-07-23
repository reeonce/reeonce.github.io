---
layout: default
comments: true
---

triangle meshes are almost universally used in hardware rendering, because:
1. triangles are automatically convex
2. planar
3. there is only one possible way to linearly interpolate values at the three vertices.


triangle strip:

a stream of vertex indices, every group of three adjacent indices describes another triangle in the strip. 