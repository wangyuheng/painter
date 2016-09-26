(function() {

    var parent = null;
    var drawing = false;
    var element = null;
    var startPoint = null;

    function mousedown(event) {
        console.log('pick mousedown');
        drawing = true;
        startPoint = svgDoc.transformPoint(event);
        element = parent.rect(0, 0).fill(GlobalStatus.getFillColor()).style({
            "fill-opacity": GlobalStatus.getFillOpacity(),
            "stroke-dasharray": "13 10"
        }).stroke({
            width: "1",
            color: "grey"
        });
        return false;
    }

    function mousemove(event) {
        console.log('pick mousemove');
        if (drawing) {
            var svgPoint = svgDoc.transformPoint(event);
            var x = svgPoint.x;
            var y = svgPoint.y;

            var newWidth = x - startPoint.x;
            var newHeight = y - startPoint.y;
            var startX = startPoint.x;
            var startY = startPoint.y;
            if (newWidth < 0) {
                startX += newWidth;
            }

            if (newHeight < 0) {
                startY += newHeight;
            }
            newWidth = Math.abs(newWidth);
            newHeight = Math.abs(newHeight);
            element.x(startX).y(startY).width(newWidth).height(newHeight);
        }
        return false;
    };

    function mouseup(event) {
        console.log('pick mouseup ' + element);
        drawing = false;
        if (element.attr("width") > 0) {
            var sx = element.x();
            var ex = element.x() + element.width();
            var sy = element.y();
            var ey = element.y() + element.height();
            $(GlobalStatus.getAllElements()).each(function() {
                console.log(this.x(), this.y(), sx < this.x() && this.x() < ex && sy < this.y() && this.y() < ey);
                if (sx < this.x() && this.x() < ex && sy < this.y() && this.y() < ey) {
                    if (!this.attr("picked")) {
                        this.fire("pick");
                    }
                } else if (this.attr("picked")) {
                    this.fire("pick");
                }
            })
        }
        parent.removeElement(element);
        return false;
    }

    var listener = {
        mousedown: mousedown,
        mousemove: mousemove,
        mouseup: mouseup,
    };


    var Pick = function(parentEle) {
        parent = parentEle;
        console.log(parent);
        svgDoc = parent.doc();
        DrawTool.init(svgDoc, listener);
        this.stop = function() {
            DrawTool.stop(svgDoc, listener);
        };
    };

    this.DrawTool.Pick = Pick;

})();