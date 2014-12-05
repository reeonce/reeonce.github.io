---
layout: category_page
title:  "Ruby on Rails"
category: rails
permalink: /category/rails/
---

  	
<ul class="posts">
{% for post in site.categories.[page.category] reversed %}
      <li>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
      </li>
{% endfor %}
</ul>