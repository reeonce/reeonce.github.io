---
layout: post_page
title: Tags
permalink: /tags/
---

{% for tag in site.tags reversed %}
  <h2><a name="{{ tag | first }}" href="#{{ tag | first }}">{{ tag | first }}</a></h2>
  {% assign posts = tag | last %}
  {% for post in posts %}
  <div class="category-frame">
      <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
  </div>
  {% endfor %}
{% endfor %}