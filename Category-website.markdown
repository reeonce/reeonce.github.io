---
layout: post_page
title:  "网站开发与HTML"
category: website
---

怎么说做了一段事件的网站，关于一些网站开发的经历：

{{ site.url }}

<ul class="posts">{% for post in site.categories.[page.category] reversed %}
      <li>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
      </li>
{% endfor %}
</ul>