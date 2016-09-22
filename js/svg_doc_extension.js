(function() {

    var handleBorder = null;
    var pickedElementList = [];

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
        },
        getPickedElementList: function(){
            return pickedElementList;
        }
    });

    SVG.extend(SVG.Element, {
        pickable: function(enabled) {
            var _ele = this;
            elementList.push(_ele);
            var color = _ele._stroke;
            var width = _ele.attr("stroke-width");
            _ele.on("mouseover", function() {
                if (SVG.isPicked() && !_ele.attr("picked")) {
                    _ele.stroke({
                        width: width * 2,
                        color: 'red'
                    });
                }
            });
            _ele.on("mouseout", function() {
                if (SVG.isPicked() && !_ele.attr("picked")) {
                    _ele.stroke({
                        width: width,
                        color: color
                    });
                }
            });
            _ele.on("click", function() {
                if (SVG.isPicked()) {
                    if (!_ele.attr("picked")) {
                        _ele.attr("picked", true);
                        console.log(_ele.handleBorder);
                        _ele.handleBorder = _ele.handleBorder || new HandleBorder(svgDoc);
                        _ele.handleBorder.showShade(_ele);
                        pickedElementList.push(_ele);
                    } else {
                        _ele.attr("picked", null);
                        _ele.handleBorder && _ele.handleBorder.hideShade(_ele);
                        pickedElementList.remove(_ele);
                    }
                }
            });
            return this;
        }

    });
})();