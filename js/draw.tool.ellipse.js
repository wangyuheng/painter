(function() {

    var parent = null;
    var drawing = false;
    var element = null;
    var startPoint = null;

    function mousedown(event) {
        console.log('ellipse mousedown');
        if (!drawing) {
            drawing = true;
            startPoint = svgDoc.transformPoint(event);
            element = parent.ellipse(0, 0).move(startPoint.x, startPoint.y).fill(GlobalStatus.getFillColor()).style("fill-opacity", GlobalStatus.getFillOpacity()).stroke({
                width: GlobalStatus.getLineSize(),
                color: GlobalStatus.getFontColor()
            });
        }

        return false;
    }

    function mousemove(event) {
        console.log('ellipse mousemove');
        if (drawing) {
            var svgPoint = svgDoc.transformPoint(event);
            var x = svgPoint.x;
            var y = svgPoint.y;

            var rx = Math.abs(svgPoint.x - startPoint.x);
            var ry = Math.abs(svgPoint.y - startPoint.y);
            element.rx(rx).ry(ry);
        }
        return false;
    };

    function mouseup(event) {
        console.log('ellipse mouseup ' + element);
        if (drawing) {
            drawing = false;
            if (element.attr("rx") > 0 && element.attr("ry") > 0) {
                element.pickable();
            } else {
                parent.removeElement(element);
            }
        }
        return false;
    }

    var listener = {
        mousedown: mousedown,
        mousemove: mousemove,
        mouseup: mouseup,
    };


    var Ellipse = function(parentEle) {
        parent = parentEle;
        svgDoc = parent.doc();
        DrawTool.init(svgDoc, listener);
        this.stop = function() {
            DrawTool.stop(svgDoc, listener);
        };
    };

    this.DrawTool.Ellipse = Ellipse;

})();