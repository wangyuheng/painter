(function() {

	var sbw = 8;
	var bw = {
		width: 1
	};

	var HandleBorder = function(svgDoc) {
		this.init(svgDoc);
	}

	HandleBorder.prototype = {
		constructor: HandleBorder,
		init: function(svgDoc) {
			this.currentSvgDoc = svgDoc;
			this.createShade();
			return this;
		},
	};

	HandleBorder.prototype.createShade = function() {
		var _this = this;

		_this.transformerGroup = _this.currentSvgDoc.group();

		_this.blockGroup = _this.transformerGroup.group();

		_this.rectLeftTop = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_direction': 'left-top'
		});
		_this.rectLeftBottom = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_direction': 'left-bottom'
		});
		_this.rectRightTop = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_direction': 'right-top'
		});
		_this.rectRightBottom = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_direction': 'right-bottom'
		});

		_this.rectLeftCenter = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_direction': 'left-center'
		});
		_this.rectRightCenter = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_direction': 'right-center'
		});
		_this.rectTopCenter = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_direction': 'top-center'
		});
		_this.rectBottomCenter = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_direction': 'bottom-center'
		});

	};

	HandleBorder.prototype.judgeShade = function(bbox, matrix) {
		var x1 = bbox.x;
		var y1 = bbox.y;
		var x2 = bbox.x2;
		var y2 = bbox.y2;

		this.rectLeftTop.move(x1 - sbw, y1 - sbw);
		this.rectLeftBottom.move(x1 - sbw, y2);
		this.rectRightTop.move(x2, y1 - sbw);
		this.rectRightBottom.move(x2, y2);

		this.rectLeftCenter.move(x1 - sbw, (y2 + y1 - sbw) / 2);
		this.rectRightCenter.move(x2, (y2 + y1 - sbw) / 2);
		this.rectTopCenter.move((x2 + x1 - sbw) / 2, y1 - sbw);
		this.rectBottomCenter.move((x2 + x1 - sbw) / 2, y2);

	};

	HandleBorder.prototype.showShade = function(svgEle) {
		if (!svgEle) {
			return;
		}
		this.currentElement = svgEle;
		this.transformerGroup.show();

		this.judgeShade(svgEle.bbox(), new SVG.Matrix(svgEle));
	};

	HandleBorder.prototype.hideShade = function() {
		this.transformerGroup.hide();
	};

	this.HandleBorder = HandleBorder;

})();