---
layout: page
title: About
permalink: /about/
---

My name is **Reeonce Zeng**, living in Shenzhen, Guangdong, China

I have received my bachelor degree in software engineer in *Beihang University*.

I have been working with **Node.js** for more than one year. Although it is a efficient and magic programming language, but I'd like to following TJ's step and leaving for new area ☺.

Now I want to work with the exciting kid - **iOS**.


<p id="test-ele">
sdf
</p>

<div class="timeline">
	<svg>
	</svg>
</div>

<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
<script type="text/javascript" src="/js/d3-timeline.js"></script>

<style type="text/css">
 
   svg {
      font-size: 10px;
    }
 
    g {
      overflow: visible;
    }
 
    text {
      z-index: 20;
    }
 
    rect.pane {
      cursor: move;
      fill: none;
      pointer-events: all;
    }
 
</style>
<script type="text/javascript">
	var testData = [
	  {label: "person a", times: [
	    {"starting_time": 1355752800000, "ending_time": 1355759900000},
	    {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
	  {label: "person b", times: [
	    {"starting_time": 1355759910000, "ending_time": 1355761900000}]},
	  {label: "person c", times: [
	    {"starting_time": 1355761910000, "ending_time": 1355763910000}]},
	  ];
    var w = 600,
    h = 500;
 
    var svg = d3.select(".timeline svg").attr("width", w);

	var chart = d3.timeline();

	svg.datum(testData).call(chart);
</script>

<script type="text/javascript">
	var zoom = d3.behavior.zoom();

	svg.datum(testData).call(chart);
</script>

