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

		_this.rectLeftCenter = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectRightCenter = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectTopCenter = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectBottomCenter = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();

		_this.rectLeftTop = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectLeftBottom = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectRightTop = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();
		_this.rectRightBottom = this.blockGroup.rect(sideLength, sideLength).stroke(sideWidth).draggable();

		// rectLeftCenter
		_this.rectLeftCenter.on("dragstart", function() {
			_this.currentElement.fire("leftCenterDragStart", {
				currPoint: event.detail.p
			});
		});
		_this.rectLeftCenter.on("dragmove", function() {
			_this.currentElement.fire("leftCenterDragMove", {
				currPoint: event.detail.p
			});
		});
		_this.rectLeftCenter.on("afterdragmove", function() {
			_this.rebound(_this.currentElement.bbox());
		});
		// rectRightCenter
		_this.rectRightCenter.on("dragstart", function() {
			_this.currentElement.fire("rightCenterDragStart", {
				currPoint: event.detail.p
			});
		});
		_this.rectRightCenter.on("dragmove", function() {
			_this.currentElement.fire("rightCenterDragMove", {
				currPoint: event.detail.p
			});
		});
		_this.rectRightCenter.on("afterdragmove", function() {
			_this.rebound(_this.currentElement.bbox());
		});

		// rectTopCenter		
		_this.rectTopCenter.on("dragstart", function() {
			_this.currentElement.fire("topCenterDragStart", {
				currPoint: event.detail.p
			});
		});
		_this.rectTopCenter.on("dragmove", function() {
			_this.currentElement.fire("topCenterDragMove", {
				currPoint: event.detail.p
			});
		});
		_this.rectTopCenter.on("afterdragmove", function() {
			_this.rebound(_this.currentElement.bbox());
		});


		// rectBottomCenter		
		_this.rectBottomCenter.on("dragstart", function() {
			_this.currentElement.fire("bottomCenterDragStart", {
				currPoint: event.detail.p
			});
		});
		_this.rectBottomCenter.on("dragmove", function() {
			_this.currentElement.fire("bottomCenterDragMove", {
				currPoint: event.detail.p
			});
		});
		_this.rectBottomCenter.on("afterdragmove", function() {
			_this.rebound(_this.currentElement.bbox());
		});

		// rectLeftTop	
		_this.rectLeftTop.on("dragstart", function() {
			_this.currentElement.fire("leftTopDragStart", {
				currPoint: event.detail.p
			});
		});
		_this.rectLeftTop.on("dragmove", function() {
			_this.currentElement.fire("leftTopDragMove", {
				currPoint: event.detail.p
			});
		});
		_this.rectLeftTop.on("afterdragmove", function() {
			_this.rebound(_this.currentElement.bbox());
		});

		// rectLeftBottom	
		_this.rectLeftBottom.on("dragstart", function() {
			_this.currentElement.fire("leftBottomDragStart", {
				currPoint: event.detail.p
			});
		});
		_this.rectLeftBottom.on("dragmove", function() {
			_this.currentElement.fire("leftBottomDragMove", {
				currPoint: event.detail.p
			});
		});
		_this.rectLeftBottom.on("afterdragmove", function() {
			_this.rebound(_this.currentElement.bbox());
		});

		// rectRightTop	
		_this.rectRightTop.on("dragstart", function() {
			_this.currentElement.fire("rightTopDragStart", {
				currPoint: event.detail.p
			});
		});
		_this.rectRightTop.on("dragmove", function() {
			_this.currentElement.fire("rightTopDragMove", {
				currPoint: event.detail.p
			});
		});
		_this.rectRightTop.on("afterdragmove", function() {
			_this.rebound(_this.currentElement.bbox());
		});

		// rectRightBottom	
		_this.rectRightBottom.on("dragstart", function() {
			_this.currentElement.fire("rightBottomDragStart", {
				currPoint: event.detail.p
			});
		});
		_this.rectRightBottom.on("dragmove", function() {
			_this.currentElement.fire("rightBottomDragMove", {
				currPoint: event.detail.p
			});
		});
		_this.rectRightBottom.on("afterdragmove", function() {
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
		HandleBorderListener(this.currentElement);
		this.handleBorderGroup.show();
		this.rebound(svgEle.bbox());
	};

	HandleBorder.prototype.hide = function() {
		this.handleBorderGroup.hide();
	};

	this.HandleBorder = HandleBorder;

})();