---
layout: default
comments: true
---

include_guard.sublime-snippet
```xml
<snippet>
	<content><![CDATA[
#ifndef ${1:_HPP}
#define ${1:_HPP}

#endif // ${1:_HPP}
]]></content>
	<!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
	<tabTrigger>include guards</tabTrigger>
	<!-- Optional: Set a scope to limit where the snippet will trigger -->
	<scope>source.c++</scope>
</snippet>

```

namespace.sublime-snippet

```xml
<snippet>
	<content><![CDATA[
namespace ${1:this} {
	${2}
} // namespace ${1:this}
]]></content>
	<!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
	<tabTrigger>namespace</tabTrigger>
	<!-- Optional: Set a scope to limit where the snippet will trigger -->
	<scope>source.c++</scope>
</snippet>

```