---
layout: post
title: "Css Box Model"
category: Website
tags: [box model, box-sizing, css]
---

### Box dimensions

Each box has a content area (e.g., text, an image, etc.) and optional surrounding padding, border, and margin areas; the size of each area is specified by properties defined below. The following diagram shows how these areas relate and the terminology used to refer to pieces of margin, border, and padding:

![](http://www.w3.org/TR/CSS2/images/boxdim.png)

The margin, border, and padding can be broken down into top, right, bottom, and left segments (e.g., in the diagram, "LM" for left margin, "RP" for right padding, "TB" for top border, etc.).

The perimeter of each of the four areas (content, padding, border, and margin) is called an "edge", so each box has four edges:

content edge or inner edge
The content edge surrounds the rectangle given by the width and height of the box, which often depend on the element's rendered content. The four content edges define the box's content box.
padding edge
The padding edge surrounds the box padding. If the padding has 0 width, the padding edge is the same as the content edge. The four padding edges define the box's padding box.
border edge
The border edge surrounds the box's border. If the border has 0 width, the border edge is the same as the padding edge. The four border edges define the box's border box.
margin edge or outer edge
The margin edge surrounds the box margin. If the margin has 0 width, the margin edge is the same as the border edge. The four margin edges define the box's margin box.
Each edge may be broken down into a top, right, bottom, and left edge.

The dimensions of the content area of a box — the content width and content height — depend on several factors: whether the element generating the box has the 'width' or 'height' property set, whether the box contains text or other boxes, whether the box is a table, etc. Box widths and heights are discussed in the chapter on visual formatting model details.

The background style of the content, padding, and border areas of a box is specified by the 'background' property of the generating element. Margin backgrounds are always transparent.

### box-sizing property

#### Summary

The box-sizing CSS property is used to alter the default CSS box model used to calculate widths and heights of elements. It is possible to use this property to emulate the behavior of browsers that do not correctly support the CSS box model specification.

```
Initial value:  content-box
Applies to:     all elements that accept width or height
Inherited:      no
Media:          visual
Computed value: as specified
Animatable:     no
Canonical order:the unique non-ambiguous order defined by the formal grammar
```

#### Values

content-box
This is the default style as specified by the CSS standard. The width and height properties are measured including only the content, but not the border, margin, or padding.

padding-box
The width and height properties include the padding size, and do not include the border or margin.

border-box
The width and height properties include the padding and border, but not the margin. This is the box model used by Internet Explorer when the document is in Quirks mode.

#### Examples

```css
/* support Firefox, WebKit, Opera and IE8+ */
.example {
  -moz-box-sizing: border-box;
       box-sizing: border-box;
}
```

#### Notes

box-sizing is not respected when the height is calculated from window.getComputedStyle(), in Internet Explorer, in Firefox prior to 23, and in Chrome. 
Note that IE9's proprietary currentStyle property does return the correct value of height.

详见 [http://www.w3.org/TR/CSS2/visudet.html#containing-block-details](http://www.w3.org/TR/CSS2/visudet.html#containing-block-details)