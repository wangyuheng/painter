(function() {

    SVG.extend(SVG.Doc, {
        transformPoint: function(event) {
            event = event || window.event;
            var touches = event.changedTouches && event.changedTouches[0] || event;
            var node = this.node;
            var point = node.createSVGPoint();
            point.x = touches.pageX - window.scrollX;
            point.y = touches.pageY - window.scrollY;
            var matrix = node.getScreenCTM().inverse();
            return point.matrixTransform(matrix);
        }
    });

    SVG.extend(SVG.Element, {
        pickable: function(enabled) {
            var _ele = this;
            GlobalStatus.pushElements(_ele);
            var color = _ele._stroke;
            var width = _ele.attr("stroke-width");
            _ele.dragStartPoint = null;
            _ele.on("mouseover", function() {
                console.log("element mouseover");
                if (GlobalStatus.isPicked()) {
                    _ele.stroke({
                        width: width * 2,
                        color: 'red'
                    });
                    $("#svgPanel").css("cursor", "pointer");
                    _ele.draggable();
                    return false;
                } else if (GlobalStatus.isPreFilled()) {
                    $("#svgPanel").css("cursor", "url(style/img/cur/tool_fill.cur), auto");
                } else if (GlobalStatus.isRecycle()) {
                    $("#svgPanel").css("cursor", "url(style/img/cur/tool_delete.cur), auto");
                }
                _ele.draggable(false);

            });
            _ele.on("mouseout", function() {
                if (GlobalStatus.isPicked()) {
                    _ele.stroke({
                        width: width,
                        color: color
                    });
                    $("#svgPanel").css("cursor", "default");
                } else if (GlobalStatus.isPreFilled()) {
                    $("#svgPanel").css("cursor", "default");
                } else if (GlobalStatus.isRecycle()) {
                    $("#svgPanel").css("cursor", "default");
                }

            });
            _ele.on("click", function() {
                console.log("click");
                if (GlobalStatus.isPreFilled()) {
                    if ($("#fill_color").hasClass("active")) {
                        _ele.fill(GlobalStatus.getFillColor());
                        _ele.style("fill-opacity", GlobalStatus.getFillOpacity());
                    } else {
                        _ele.style("stroke", GlobalStatus.getFontColor());
                    }

                } else if (GlobalStatus.isPicked()) {
                    if (_ele.attr("picked")) {
                        _ele.fire("unPick");
                    } else {
                        _ele.fire("pick");
                    }

                } else if (GlobalStatus.isRecycle()) {
                    _ele.remove();
                }
            });
            _ele.on("mousedown", function(event) {
                console.log("element mousedown");
            });

            _ele.on("dragend", function(event) {
                console.log("element dragend");
                if (_ele.dragStartPoint.x == event.detail.p.x && _ele.dragStartPoint.y == event.detail.p.y) {

                } else {
                    _ele.fire("unPick");
                }
            });
            _ele.on("beforedrag", function(event) {
                console.log("element beforedrag");
            });
            _ele.on("afterdragmove", function(event) {
                console.log("element afterdragmove");
            });
            _ele.on("dragstart", function(event) {
                console.log("element dragstart");
                _ele.dragStartPoint = event.detail.p;
            });
            _ele.on("dragmove", function(event) {
                console.log("element dragmove");
            });
            _ele.on("pick", function() {
                console.log("pick");
                _ele.attr("picked", true);
                _ele.handleBorder = _ele.handleBorder || new HandleBorder(svgDoc);
                _ele.handleBorder.show(_ele);
                GlobalStatus.pushPicked(_ele);
            });
            _ele.on("unPick", function() {
                console.log("unPick");
                _ele.attr("picked", null);
                _ele.handleBorder && _ele.handleBorder.hide(_ele);
                GlobalStatus.removePicked(_ele);

            });
            return this;
        }

    });
})();