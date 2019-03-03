---
layout: default
comments: true
---

include_guard.sublime-snippet
```xml
<snippet>
	<content><![CDATA[
#ifndef ${1:${TM_FILENAME/(\w+)\.(\w+)/\U\1_\U\2/g}}
#define ${1:${TM_FILENAME/(\w+)\.(\w+)/\U\1_\U\2/g}}

#endif // ${1:${TM_FILENAME/(\w+)\.(\w+)/\U\1_\U\2/g}}
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
namespace ${1:${TM_DIRECTORY/.*\/(\w+)/\1/g}} {
	${2}
} // namespace ${1:${TM_DIRECTORY/.*\/(\w+)/\1/g}}
]]></content>
	<!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
	<tabTrigger>namespace</tabTrigger>
	<!-- Optional: Set a scope to limit where the snippet will trigger -->
	<scope>source.c++</scope>
</snippet>

```

references:

[Snippets](http://docs.sublimetext.info/en/latest/extensibility/snippets.html)