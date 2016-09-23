var GlobalStatus = {
	defaultFontColor:"#0073c6",
	defaultFillColor:"#ececec",
	defaultLineSize:"2",
	isPicked:function(){
		return $("#tool_pick").hasClass("active");
	},
	isPreFilled:function(){
		return $("#tool_fill").hasClass("active");
	},
	getFontColor:function(){
		return $("#font_color").attr("data-color");
	},
	getFillColor:function(){
		return $("#fill_color").attr("data-color");
	},
	getLineSize:function(){
		return this.defaultLineSize;
	},
	getFillOpacity:function(){
		var fillOpacity = "0.0";
		if (this.getFillColor() != this.defaultFillColor) {
			fillOpacity = "1.0";
		}
		return fillOpacity;
	}
}

