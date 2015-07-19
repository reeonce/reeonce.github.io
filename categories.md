---
layout: post
title: Categories
permalink: /categories/
---

{% for category in site.categories reversed %}
  <h2><a name="{{ category | first }}" href="#{{ category | first }}">{{ category | first | upcase }}</a></h2>
  {% assign posts = category | last %}
  {% for post in posts %}
  <div class="category-frame">
      <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
  </div>
  {% endfor %}
{% endfor %}
