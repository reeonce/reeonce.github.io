(function() {
	var canvas = document.getElementById("stack-heap-demo");
	if (!canvas) {
		return;
	}
	var canvasContext = canvas.getContext("2d");
	var init = function() {
		canvasContext.clearRect(0, 0, 420, 300);
		canvasContext.fillStyle = "#eee";
		canvasContext.fillRect(0, 0, 420, 300);

		canvasContext.strokeStyle = "#222";
		canvasContext.strokeRect(10, 100, 100, 180);
		canvasContext.strokeRect(200, 60, 190, 200);
		
		canvasContext.fillStyle = "black";
	}
	var drawEllipse = function(ctx, x, y, w, h) {
	  var kappa = .5522848,
	      ox = (w / 2) * kappa, // control point offset horizontal
	      oy = (h / 2) * kappa, // control point offset vertical
	      xe = x + w,           // x-end
	      ye = y + h,           // y-end
	      xm = x + w / 2,       // x-middle
	      ym = y + h / 2;       // y-middle

	  ctx.beginPath();
	  ctx.moveTo(x, ym);
	  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	  //ctx.closePath(); // not used correctly, see comments (use to close off open path)
	  ctx.stroke();
	}
	init();
	var steps = [];

	steps[0] = function() {
		canvasContext.fillText("int x = 0",30 ,270); 
	};
	steps[1] = function() {
		canvasContext.fillText("int y = 0",30 ,230);
	};
	steps[2] = function() {
		canvasContext.fillStyle = "#eee";
		canvasContext.fillRect(20, 200, 85, 40);
		canvasContext.fillStyle = "black";
	};
	steps[3] = function() {
		canvasContext.fillText("ClassA a = 0x__",30 ,230);
		drawEllipse(canvasContext, 220, 80, 80, 30);
		canvasContext.beginPath();
		canvasContext.moveTo(100, 230);
	  	canvasContext.lineTo(220, 95);
	  	canvasContext.stroke();
	};
	steps[4] = function() {
		canvasContext.fillText("ClassB b = 0x__",30 ,190);
		drawEllipse(canvasContext, 300, 130, 80, 30);
		canvasContext.beginPath();
		canvasContext.moveTo(100, 190);
	  	canvasContext.lineTo(300, 145);
	  	canvasContext.stroke();
	};
	steps[5] = function() {
		canvasContext.fillText("ClassC c = 0x__",30 ,150);
		drawEllipse(canvasContext, 220, 200, 80, 30);
		canvasContext.beginPath();
		canvasContext.moveTo(100, 150);
	  	canvasContext.lineTo(220, 215);
	  	canvasContext.stroke();
	};
	steps[6] = function() {
		init();
	}

	var count = 0;
	var nextStep = function() {
		if (count >=0 && count < steps.length) {
			steps[count]();
		};
		count ++;
		if (count >= steps.length || count < 0) {
			count = 0;
		};
	}

	setInterval(function() {
		nextStep();
	}, 2000);
}) ();