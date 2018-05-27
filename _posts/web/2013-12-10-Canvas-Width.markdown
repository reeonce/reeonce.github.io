---
layout: default
comments: true
title: "从Canvas Width 说起 － width 属性 vs css width"
category: Web
tags: canvas css
---

在网页中，直接设置一个HTML 元素的宽度和高度的方法有两种，一种是设置元素的width、height 属性，如

```html
<div width="400px" height="400px"></div>
```

另一种方法则是通过css来设置，如

```html
<style>
.a-div {
  width: 400px;
  height: 400px;
}
</style>
<div class="a-div"></div>
```

这样达到的效果是一样的，都设置了这个`<div>`的宽高为400px。虽然两种方案都能达到设置宽度的效果，但是很多书籍及网上资料都会说一句 *Width should be set using CSS.*，主要原因是这样能够使*表现与内容分离*。于是，我开始尝试使用canvas，

```html
<style>
#mycanvas {
  width: 400px;
  height: 400px;
  background-color: #eee;
}
</style>
<canvas id="mycanvas"></canvas>
<script type="text/javascript">
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
ctx.fillRect(20, 20, 200, 200);
</script>
```

效果是:

<style>
#mycanvas, #adiv {
  width: 400px;
  height: 400px;
  background-color: #eee;
}
</style>
<canvas id="mycanvas"></canvas>
<script type="text/javascript" src="/js/others/canvas-width-01.js"></script>
<script type="text/javascript">drawRect1();</script>

尺寸不对，明显有被拉伸过的痕迹。回到w3school 中的示例:

```html
<style>
#mycanvas-1 {
  background-color: #eee;
}
</style>
<canvas id="mycanvas-1" width="400px" height="400px"></canvas>
<script type="text/javascript">
var canvas = document.getElementById("mycanvas-1");
var ctx = canvas.getContext("2d");
ctx.fillRect(20, 20, 200, 200);
</script>
```

效果为：

<style>
#mycanvas-1 {
  background-color: #eee;
}
</style>
<canvas id="mycanvas-1" width="400px" height="400px"></canvas>
<script type="text/javascript">
drawRect2();
</script>

这是对的呀。两处唯一的不同只是一处用了css 来设置canvas 的大小， 一处则是用 width 和 height 属性来设置。那么这两种设置有什么区别呢？在前一种情况中，我们尝试打出canvas 的宽度和高度，

```javascript
console.log(ctx.canvas.width);
console.log(ctx.canvas.height);
```

发现分别为300 和 150，通过这个数字，就能够明白原来前面那种情况下，方框的宽和高都被放大了，而且还是不同的倍数。为何css 的 width 与元素的width 效果不一样呢，他们有什么区别？css 的width 又是如何工作的呢？

> The width property in CSS specifies the width of the element's content area. This "content" area is the portion inside the padding, border, and margin of an element ([the box model](http://www.w3.org/TR/CSS2/box.html)).

在一般的css 框架中, 都会设置`box-sizing: border-box`，因此这个`width: 400px;` 实际为border-left + padding-left + width(content area) + padding-right + border-right 所得的值。也就是说，这个400px 是这个元素在网页中显示框的大小。

而width 和 height 属性则不一样，他们是这样定义的:

> width: The width of the coordinate space in CSS pixels. Defaults to 300.
> height: The height of the coordinate space in CSS pixels. Defaults to 150.

这个width 和 height 指的是canvas 的坐标空间（也就是这块画布的绘画空间，也就是说canvas 里面的ppi 与canvas外面的可能是不一致的），默认值分别是300和150。

当css 的width 没有被设置时，canvas 的坐标空间大小就是它的显示区域大小。 但是一旦css 的width 和height 被设置了，并且与坐标大小不一致的话，那么所绘画的内容就会被进行缩放。也就是我遇到的问题了。

由此可以得出，一般的元素中绘画空间和显示框架是1:1 的，而canvas 则是可以通过viewport 来控制的，用于绘画则灵活很多。
