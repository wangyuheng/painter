(function() {

	var sideLength = 8;
	var sideWidth = {
		width: 1
	};

	var HandleBorder = function(svgDoc) {
		this.init(svgDoc);
	}

	HandleBorder.prototype = {
		constructor: HandleBorder,
		init: function(svgDoc) {
			this.currentSvgDoc = svgDoc;
			this.create();
			return this;
		},
	};

	HandleBorder.prototype.create = function() {
		var _this = this;

		_this.handleBorderGroup = _this.currentSvgDoc.group();

		_this.blockGroup = _this.handleBorderGroup.group();

		_this.rectLeftTop = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectLeftBottom = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectRightTop = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectRightBottom = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();

		_this.rectLeftCenter = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectRightCenter = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectTopCenter = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectBottomCenter = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();


		var lastPoint = null;
		var xLeft;
		_this.rectLeftCenter.on("dragstart", function(event) {
			lastPoint = event.detail.p;
			xLeft = 1;
		});

		_this.rectLeftCenter.on("dragmove", function() {
			var currPoint = event.detail.p;
			var currPoint = event.detail.p;
			var dx = currPoint.x - lastPoint.x;

			var ele = _this.currentElement;
			var width = ele.width() - xLeft * dx;

			if (width > 0) {
				var newX = ele.x() + xLeft * dx;
				ele.x(newX).width(width);
			} else {
				//invert
				xLeft = -xLeft;
				ele.x(ele.bbox().x2).width(-width).matrix(new SVG.Matrix(ele).flip('x', ele.bbox().cx));
			}

			lastPoint = currPoint;
		});
		_this.rectLeftCenter.on("afterdragmove", function() {
			_this.rebound(_this.currentElement.bbox());
		});

	};


	HandleBorder.prototype.rebound = function(bbox) {
		var _this = this;

		var x1 = bbox.x;
		var y1 = bbox.y;
		var x2 = bbox.x2;
		var y2 = bbox.y2;
		_this.rectLeftTop.move(x1 - sideLength, y1 - sideLength);
		_this.rectLeftBottom.move(x1 - sideLength, y2);
		_this.rectRightTop.move(x2, y1 - sideLength);
		_this.rectRightBottom.move(x2, y2);

		_this.rectLeftCenter.move(x1 - sideLength, (y2 + y1 - sideLength) / 2);
		_this.rectRightCenter.move(x2, (y2 + y1 - sideLength) / 2);
		_this.rectTopCenter.move((x2 + x1 - sideLength) / 2, y1 - sideLength);
		_this.rectBottomCenter.move((x2 + x1 - sideLength) / 2, y2);

		this.blockGroup.matrix(new SVG.Matrix(_this.currentElement));
	};

	HandleBorder.prototype.show = function(svgEle) {
		if (!svgEle) {
			return;
		}
		this.currentElement = svgEle;
		this.handleBorderGroup.show();

		this.rebound(svgEle.bbox());
	};

	HandleBorder.prototype.hide = function() {
		this.handleBorderGroup.hide();
	};

	this.HandleBorder = HandleBorder;

})();