$("body").addClass("jsenabled");
$("#timeline").addClass("slideshow");
$("#timeline > div").addClass("slideshow-item");
$("#career-timelime").css("height", "auto");

var addLines = function(group, linesData) {
	var lines = group.data(linesData);
	if (group[0].length == 0) {
		lines = lines.enter()
			.append("line");
	}
	lines.attr("x1", function (d) { return d.x1; })
		.attr("y1", function (d) { return d.y1; })
		.attr("x2", function (d) { return d.x2; })
		.attr("y2", function (d) { return d.y2; })
		.attr("class", function (d) { return d.class; })
		.attr("stroke", "#222")
		.attr("stroke-width", 3);
}

var addCircles = function(group, circlesData) {
	var circles = group.data(spaceCircles);
	if (group[0].length == 0) {
		circles = circles.enter()
			.append("circle");
	}

	circles.attr("cx", function (d) { return d; })
		.attr("cy", 120)
		.attr("r", 10 )
		.style("fill", function(d) {
			var returnColor;
			if (d === 30) { returnColor = "green";
			} else if (d === 70) { returnColor = "purple";
			} else if (d === 110) { returnColor = "red"; }
			return returnColor;
		});
}

var addTexts = function(group, textsData) {
	var texts = group.data(textsData);
	if (group[0].length == 0) {
		texts = texts.enter()
			.append("text");
	}
	texts.attr("class", function (d) { return d.class; })
		.attr("x", function (d) { return d.x; })
		.attr("y", function (d) { return d.y; })
		.attr("fill", "#222")
		.attr("font-size", function (d) { return d["font-size"] || "18"; })
		.attr("font-family", function (d) { return d["font-family"]; })
		.text(function(d){ return d.text; });
}

var addLinks = function(group, textsData) {
	var links = group.data(textsData);
	if (group[0].length == 0) {
		links = links.enter()
			.append("a");
	}
	 links.attr("name", function (d) { return d.name; })
	 	.attr("xlink:href", function (d) { return "#" + d.name; })
	 	.attr("class", function (d) { return d.class; });
	 var texts = links.select("text");
	 if (!texts[0] || !texts[0][0]) {
	 	texts = links.append("text");
	}
	texts.attr("x", function (d) { return d.x; })
		.attr("y", function (d) { return d.y; })
		.attr("fill", "#222")
		.attr("font-size", function (d) { return d["font-size"] || "18"; })
		.attr("font-family", function (d) { return d["font-family"]; })
		.text(function(d){ return d.text; });
}

var totalWidth = $("#timeline").width();
var svgWidth = totalWidth - 60;
var svg = d3.select("#timeline svg");

var nowMonth = new Date();
nowMonth.setHours(0,0,0,0);
nowMonth.setDate(0);

var dateFormat = d3.time.format("%Y-%m");
var a_end_time = dateFormat.parse("2016-09");
var totalDuration = {
	start_time: dateFormat.parse("2009-09"),
	end_time: a_end_time
}

var durations = [
	{start_time: dateFormat.parse("2009-09"), end_time: dateFormat.parse("2013-06"), text: "北京航空航天大学 >", name: "buaa"},
	{start_time: dateFormat.parse("2013-06"), end_time: dateFormat.parse("2014-07"), text: "雅虎北京全球研发中心 >", name: "yahoo"},
	{start_time: dateFormat.parse("2014-07"), end_time: dateFormat.parse("2015-08"), text: "极觅数据 >", name: "xjimi"},
	{start_time: dateFormat.parse("2015-08"), end_time: a_end_time, text: "？ >", name: "you"},
];

totalDuration.interval = totalDuration.end_time.getTime() - totalDuration.start_time.getTime();

var linesData = [];
var spaceCircles = [];
var textsData = [];
var dateTextsData = [];
var verticalLinesData = [];

var getSvdData = function() {
	$.each(durations, function(index, value) {
		linesData[index] = {};
		linesData[index].x1 = 44 + (value.start_time.getTime() - totalDuration.start_time.getTime()) / totalDuration.interval * svgWidth;
		linesData[index].y1 = 120;
		linesData[index].x2 = 20 + (value.end_time.getTime() - totalDuration.start_time.getTime()) / totalDuration.interval * svgWidth;
		linesData[index].y2 = 120;
		linesData[index].class = "line1";

		spaceCircles[index] = linesData[index].x1 - 12;

		dateTextsData[index] = {};
		dateTextsData[index].text = value.start_time.getFullYear();
		if (index > 0 && dateTextsData[index].text === dateTextsData[index-1].text) {
			dateTextsData[index].text = "";
		}
		dateTextsData[index].x = spaceCircles[(index)]  - 20;
		dateTextsData[index].y = 100;
		dateTextsData[index].class = "text1";
		dateTextsData[index]["font-size"] = (10 + svgWidth / 60) + "px";

		textsData[index] = {};
		textsData[index].text = value.text;
		textsData[index].x = spaceCircles[index] - 20;
		textsData[index].y = (index * 60 ) % 180 + 220;
		textsData[index].name = value.name;
		textsData[index].class = "career-link";
		textsData[index]["font-size"] = (10 + svgWidth / 60) + "px";

		verticalLinesData[index] = {};
		verticalLinesData[index].x1 =  spaceCircles[index];
		verticalLinesData[index].y1 =  132;
		verticalLinesData[index].x2 =  spaceCircles[index];
		verticalLinesData[index].y2 =  textsData[index].y - 20;
		verticalLinesData[index].class = "line2";
	});

	dateTextsData[durations.length] = {
		x: (a_end_time.getTime() - totalDuration.start_time.getTime()) / totalDuration.interval * svgWidth,
		y: 100,
		"class": "text1",
		text: "21xx",
		"font-size": (10 + svgWidth / 60) + "px"
	};

	console.log()
}
var updateNodes = function() {
	svg.attr("viewBox", "0 0 " + totalWidth + " 400");
	addLines(svg.selectAll(".line1"), linesData);
	addLines(svg.selectAll(".line2"), verticalLinesData);
	addCircles(svg.selectAll("circle"), spaceCircles);
	addTexts(svg.selectAll(".text1"), dateTextsData);
	textsData[1].x = textsData[1].x - 60;
	textsData[2].x = textsData[2].x - 28;
	addLinks(svg.selectAll(".career-link"), textsData);
}

if (Modernizr.svg) {
	getSvdData();
	updateNodes();
}

d3.selectAll(".career-link").on('click', function(event) {
	d3.event.preventDefault();
	$("#career-" + event.name).css("animation-name", "slideInFromRight");
	$("#career-" + event.name).css("-webkit-animation-name", "slideInFromRight");
	$("#career-" + event.name).css("left", "0");
	$("#career-" + event.name).addClass("activate");
	$("#career-timelime").css("animation-name", "slideOutToLeft");
	$("#career-timelime").css("-webkit-animation-name", "slideOutToLeft");
	$("#career-timelime").css("left", "-1000px");


	$(".slideshow-item.activate .back-icon a").on('click', function(event) {
		event.preventDefault();
		$(this).parents(".slideshow-item").css("-webkit-animation-name", "slideOutToRight");
		$(this).parents(".slideshow-item").css("animation-name", "slideOutToRight");
		$(this).parents(".slideshow-item").css("left", "1000px");
		$(this).parents(".slideshow-item").removeClass("activate");
		$("#career-timelime").css("animation-name", "slideOutToRight");
		$("#career-timelime").css("-webkit-animation-name", "slideInFromLeft");
		$("#career-timelime").css("left", "0px");
	})
})

$(window).on('resize', function(event) {
	totalWidth = $("#timeline").width();
	svgWidth = totalWidth - 60;
	if (Modernizr.svg) {
		getSvdData();
		updateNodes();
	}
});

if (!Modernizr.cssanimations || !Modernizr.svg) {
	$(".slideshow").removeClass("slideshow");
	$(".slideshow-item").removeClass("slideshow-item");
} else {
}
