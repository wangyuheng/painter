var GlobalStatus = {
	defaultFontColor: "#0073c6",
	defaultFillColor: "#ececec",
	defaultLineSize: "2",
	elementList: [],
	pickedElementList: [],
	isPicked: function() {
		return $("#tool_pick").hasClass("active");
	},
	isPreFilled: function() {
		return $("#tool_fill").hasClass("active");
	},
	isRecycle: function() {
		return $("#tool_delete").hasClass("active");
	},
	getFontColor: function() {
		return $("#font_color").attr("data-color");
	},
	getFillColor: function() {
		return $("#fill_color").attr("data-color");
	},
	getLineSize: function() {
		return $("#lineSize dd.active").attr("data-line-size");
	},
	getFillOpacity: function() {
		var fillOpacity = "0.0";
		if (this.getFillColor() != this.defaultFillColor) {
			fillOpacity = "1.0";
		}
		return fillOpacity;
	},
	pushPicked: function(o) {
		return this.pickedElementList.push(o);
	},
	removePicked: function(o) {
		return this.pickedElementList.remove(o);
	},
	getPickeds: function() {
		return this.pickedElementList;
	},
	pushElements: function(o) {
		return this.elementList.push(o);
	},
	removeElements: function(o) {
		return this.elementList.remove(o);
	},
	getAllElements: function() {
		return this.elementList;
	},
	unPickAll() {
		$(GlobalStatus.getPickeds()).each(function() {
			this.fire("unPick");
		});
		return this;
	}
}