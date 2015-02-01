---
layout: post
title:  "网站开发与HTML"
category: website
permalink: /category/website/
---

怎么说做了一段时间的网站，以下是一些关于网站开发的经历：

<ul class="posts">
{% for post in site.categories.[page.category] reversed %}
      <li>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
      </li>
{% endfor %}
</ul>