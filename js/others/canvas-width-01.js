var drawRect1 = function() {
	var canvas = document.getElementById("mycanvas");
	var ctx = canvas.getContext("2d");
	ctx.canvas.height = canvas.height;
	ctx.fillRect(20, 20, 200, 200);
}

var drawRect2 = function() {
	var canvas = document.getElementById("mycanvas-1");
	var ctx = canvas.getContext("2d");
	ctx.fillRect(20, 20, 200, 200);
}