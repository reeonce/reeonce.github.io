---
layout: post
title:  "Objective-C 与设计模式"
category: objective-c与设计模式
permalink: /category/objective-c与设计模式/
---

近期学习iOS开发，虽然*swift* 大火，但是还是决定从Objective-C 入手。一方面 Swift 的资源还不是很多，并多大部分都还是英文资料，看起来着实费力一些；另一方面，大学时期用的主要是C语言，不仅面向过程，写的还都是比较小型的项目，就没有深究，后来写了一年的*JavaScript*，函数式编程更是地道的面向过程了。因此，就想着通过学习 Objective-c 的过程来加深对面向对象的理解。

学习还是从具体项目入手，于是着手了[Trap The Dot](https://github.com/reeonce/Trap-The-Dot---iOS)这个小游戏。

写着写着，还是发现了不少问题，于是结合 iOS 的开发文档以及《设计模式》这本书对项目进行着改进。

从中学到的一点知识都以此专题来进行总结。
  	
<ul class="posts">
{% for post in site.categories.[page.category] reversed %}
      <li>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
      </li>
{% endfor %}
</ul>