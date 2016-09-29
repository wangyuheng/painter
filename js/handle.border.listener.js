(function() {
	var lastPoint;
	var xLeft;
	var yTop;
	var ele;

	function left(dx) {
		var width = ele.width() - xLeft * dx;
		if (width > 0) {
			var newX = ele.x() + xLeft * dx;
			ele.x(newX).width(width);
		} else {
			//invert
			xLeft = -xLeft;
			ele.x(ele.bbox().x2).width(-width).matrix(new SVG.Matrix(ele).flip('x', ele.bbox().cx));
		}
	}

	function right(dx) {
		var width = ele.width() - xLeft * dx;
		if (width > 0) {
			ele.width(width);
		} else {
			//invert
			xLeft = -xLeft;
			ele.width(-width).matrix(new SVG.Matrix(ele).flip('x', ele.bbox().cx));
		}
	}

	function top(dy) {
		var height = ele.height() - tTop * dy;
		if (height > 0) {
			var newY = ele.y() + tTop * dy;
			ele.y(newY).height(height);
		} else {
			//invert
			tTop = -tTop;
			ele.height(-height).matrix(new SVG.Matrix(ele).flip('y', ele.bbox().cy));
		}
	}

	function bottom(dy) {
		var height = ele.height() - tTop * dy;
		if (height > 0) {
			ele.height(height);
		} else {
			//invert
			tTop = -tTop;
			ele.height(-height).matrix(new SVG.Matrix(ele).flip('y', ele.bbox().cy));
		}
	}

	function leftCenterDragStart(data) {
		lastPoint = data.detail.currPoint;
		xLeft = 1;
	}

	function leftCenterDragMove(data) {
		var currPoint = data.detail.currPoint;
		var dx = currPoint.x - lastPoint.x;
		left(dx);
		lastPoint = currPoint;
	}

	function rightCenterDragStart(data) {
		lastPoint = data.detail.currPoint;
		xLeft = -1;
	}

	function rightCenterDragMove(data) {
		var currPoint = data.detail.currPoint;
		var dx = currPoint.x - lastPoint.x;
		right(dx);
		lastPoint = currPoint;
	}

	function topCenterDragStart(data) {
		lastPoint = data.detail.currPoint;
		tTop = 1;
	}

	function topCenterDragMove(data) {
		var currPoint = data.detail.currPoint;
		var dy = currPoint.y - lastPoint.y;
		top(dy);
		lastPoint = currPoint;
	}

	function bottomCenterDragStart(data) {
		lastPoint = data.detail.currPoint;
		tTop = -1;
	}

	function bottomCenterDragMove(data) {
		var currPoint = data.detail.currPoint;
		var dy = currPoint.y - lastPoint.y;
		bottom(dy);
		lastPoint = currPoint;
	}

	function leftTopDragStart(data) {
		lastPoint = data.detail.currPoint;
		xLeft = 1;
		tTop = 1;
	}

	function leftTopDragMove(data) {
		var currPoint = data.detail.currPoint;
		var dx = currPoint.x - lastPoint.x;
		var dy = currPoint.y - lastPoint.y;
		left(dx);
		top(dy);
		lastPoint = currPoint;
	}

	function leftBottomDragStart(data) {
		lastPoint = data.detail.currPoint;
		xLeft = 1;
		tTop = -1;
	}

	function leftBottomDragMove(data) {
		var currPoint = data.detail.currPoint;
		var dx = currPoint.x - lastPoint.x;
		var dy = currPoint.y - lastPoint.y;
		left(dx);
		bottom(dy);
		lastPoint = currPoint;
	}

	function rightTopDragStart(data) {
		lastPoint = data.detail.currPoint;
		xLeft = -1;
		tTop = 1;
	}

	function rightTopDragMove(data) {
		var currPoint = data.detail.currPoint;
		var dx = currPoint.x - lastPoint.x;
		var dy = currPoint.y - lastPoint.y;
		right(dx);
		top(dy);
		lastPoint = currPoint;
	}

	function rightBottomDragStart(data) {
		lastPoint = data.detail.currPoint;
		xLeft = -1;
		tTop = -1;
	}

	function rightBottomDragMove(data) {
		var currPoint = data.detail.currPoint;
		var dx = currPoint.x - lastPoint.x;
		var dy = currPoint.y - lastPoint.y;
		right(dx);
		bottom(dy);
		lastPoint = currPoint;
	}

	var HandleBorderListener = function(targetElement) {
		ele = targetElement;
		ele.on('leftCenterDragStart', leftCenterDragStart);
		ele.on('leftCenterDragMove', leftCenterDragMove);
		ele.on('rightCenterDragStart', rightCenterDragStart);
		ele.on('rightCenterDragMove', rightCenterDragMove);
		ele.on('topCenterDragStart', topCenterDragStart);
		ele.on('topCenterDragMove', topCenterDragMove);
		ele.on('bottomCenterDragStart', bottomCenterDragStart);
		ele.on('bottomCenterDragMove', bottomCenterDragMove);
		ele.on('leftTopDragStart', leftTopDragStart);
		ele.on('leftTopDragMove', leftTopDragMove);
		ele.on('leftBottomDragStart', leftBottomDragStart);
		ele.on('leftBottomDragMove', leftBottomDragMove);
		ele.on('rightTopDragStart', rightTopDragStart);
		ele.on('rightTopDragMove', rightTopDragMove);
		ele.on('rightBottomDragStart', rightBottomDragStart);
		ele.on('rightBottomDragMove', rightBottomDragMove);
	}

	this.HandleBorderListener = HandleBorderListener;
})();