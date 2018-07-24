---
layout: default
comments: true
---



[**Google C++ Style Guide #Multiple Inheritance**](https://google.github.io/styleguide/cppguide.html#Multiple_Inheritance)


Only very rarely is multiple implementation inheritance actually useful. We allow multiple inheritance only when at most one of the base classes has an implementation; all other base classes must be pure interface classes tagged with the Interface suffix.

Definition:
Multiple inheritance allows a sub-class to have more than one base class. We distinguish between base classes that are pure interfaces and those that have an implementation.

Pros:
Multiple implementation inheritance may let you re-use even more code than single inheritance (see Inheritance).

Cons:
Only very rarely is multiple implementation inheritance actually useful. When multiple implementation inheritance seems like the solution, you can usually find a different, more explicit, and cleaner solution.

Decision:
Multiple inheritance is allowed only when all superclasses, with the possible exception of the first one, are pure interfaces. In order to ensure that they remain pure interfaces, they must end with the Interface suffix.

There is an [exception](https://google.github.io/styleguide/cppguide.html#Windows_Code) to this rule on Windows.


[**Why should I avoid multiple inheritance in C++?**](https://stackoverflow.com/questions/406081/why-should-i-avoid-multiple-inheritance-in-c)



From an [interview with Bjarne Stroustrup](http://www.artima.com/intv/modern.html):

> People quite correctly say that you don't need multiple inheritance, because anything you can do with multiple inheritance you can also do with single inheritance. You just use the delegation trick I mentioned. Furthermore, you don't need any inheritance at all, because anything you do with single inheritance you can also do without inheritance by forwarding through a class. Actually, you don't need any classes either, because you can do it all with pointers and data structures. But why would you want to do that? When is it convenient to use the language facilities? When would you prefer a workaround? I've seen cases where multiple inheritance is useful, and I've even seen cases where quite complicated multiple inheritance is useful. Generally, I prefer to use the facilities offered by the language to doing workarounds



Multiple inheritance has received criticism and as such, is not implemented in many languages. Criticisms includes:

* Increased complexity
* Semantic ambiguity often summarized as the diamond problem.
* Not being able to explicitly inherit multiple times from a single class
* Order of inheritance changing class semantics.

Multiple inheritance in languages with C++/Java style constructors exacerbates the inheritance problem of constructors and constructor chaining, thereby creating maintenance and extensibility problems in these languages. Objects in inheritance relationships with greatly varying construction methods are hard to implement under the constructor chaining paradigm.

* Program to an Interface, not an Implementation
* Prefer composition over inheritance

