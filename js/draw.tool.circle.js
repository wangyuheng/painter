(function() {

    var parent = null;
    var drawing = false;
    var element = null;
    var startPoint = null;

    function mousedown(event) {
        console.log('circle mousedown');
        if (!drawing) {
            drawing = true;
            startPoint = svgDoc.transformPoint(event);
            element = parent.circle(0).move(startPoint.x, startPoint.y).fill(GlobalStatus.getFillColor()).style("fill-opacity", GlobalStatus.getFillOpacity()).stroke({
                width: GlobalStatus.getLineSize(),
                color: GlobalStatus.getFontColor()
            });
            return false;
        }
    }

    function mousemove(event) {
        console.log('circle mousemove');
        if (drawing) {
            var svgPoint = svgDoc.transformPoint(event);
            var x = svgPoint.x;
            var y = svgPoint.y;

            var radius = Math.pow((x - startPoint.x), 2) + Math.pow((y - startPoint.y), 2);
            radius = Math.sqrt(radius);
            element.radius(radius);
        }
        return false;
    }

    function mouseup(event) {
        console.log('circle mouseup ' + element);
        if (drawing) {
            drawing = false;
            if (element.attr("r") > 0) {
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


    var Circle = function(parentEle) {
        parent = parentEle;
        svgDoc = parent.doc();
        DrawTool.init(svgDoc, listener);
        this.stop = function() {
            DrawTool.stop(svgDoc, listener);
        };
    };

    this.DrawTool.Circle = Circle;

})();