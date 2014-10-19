---
layout: post_page
title:  "Swift"
category: swift
---

好吧，我还是没有经得起诱惑，看了看这门现代化的iOS编程语言。参考书目

看着看着还是发现不少好东西，没什么说的，记录下来：

<ul class="posts">
{% for post in site.categories.[page.category] reversed %}
      <li>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
      </li>
{% endfor %}
</ul>