---
layout:   post_page
title:    "C++"
category: c++
---

**C++** 是我一直想要认真研究的一门语言，从创建到如今，长久不衰。而*C++11*的重大更新，更是添加了不少魅力。

<ul class="posts">
{% for post in site.categories.[page.category] reversed %}
      <li>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
      </li>
{% endfor %}
</ul>