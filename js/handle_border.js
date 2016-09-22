(function() {

	var sbw = 6;
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

		_this.rectLT = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_operate-type': 'scale',
			'_direction': 'lt'
		});
		_this.rectLB = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_operate-type': 'scale',
			'_direction': 'lb'
		});
		_this.rectRT = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_operate-type': 'scale',
			'_direction': 'rt'
		});
		_this.rectRB = this.blockGroup.rect(sbw, sbw).stroke(bw).attr({
			'_operate-type': 'scale',
			'_direction': 'rb'
		});

	};

	HandleBorder.prototype.judgeShade = function(bbox, matrix) {
		var x1 = bbox.x;
		var y1 = bbox.y;
		var x2 = bbox.x2;
		var y2 = bbox.y2;


		this.rectLT.move(x1 - sbw, y1 - sbw);
		this.rectLB.move(x1 - sbw, y2);
		this.rectRT.move(x2, y1 - sbw);
		this.rectRB.move(x2, y2);

		this.blockGroup.matrix(matrix);

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