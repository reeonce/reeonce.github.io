---
layout: default
comments: true
title: "Jekyll 中将categories 以更新时间排序"
category: others
tags: jekyll
---

对我的首页进行了修改，最新排版的内容还是每个category 的总结性文章。但是这些categories 却是按照更新的时间顺序进行排序的。由于liquid 的限制，代码有点复杂，不知道有没有更好的实现办法呢？

{% raw %}
```html
<div>
  {% assign dateCateList = '' %}
  {% for category in site.categories reversed %}
    {% assign latestPost = category | last | sort date | last %}
    {% assign categoryName = category | first %}
    {% assign dateAndCategoryName = latestPost.date | append: '---+' | append: categoryName %}
    {% assign dateCateList = dateCateList | append: '+++_' | append: dateAndCategoryName %}
  {% endfor %}
  {% assign dateCateList = dateCateList | split: '+++_' %}
  {% assign dateCateList = dateCateList | sort %}

  {% for ca in dateCateList reversed %}
  {% assign dateCategory = ca | split: '---+' %}
    {% for page in site.pages %}
      {% assign categoryName = dateCategory | last %}
      {% if categoryName %}
        {% if page.category == categoryName %}
          <h2><a href="/Category-{{ categoryName }}/">{{ page.title }}</a></h2>
          <div class="category-frame">
                {{ page.content }}
          </div>
        {% endif %}
      {% endif %}
    {% endfor %}
  {% endfor %}
</div>
```
{% endraw %}
