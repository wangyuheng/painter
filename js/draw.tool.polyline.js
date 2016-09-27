(function() {

    var parent = null;
    var drawing = false;
    var element = null;

    var points = [];

    function mousedown(event) {
        console.log('polyline mousedown');
        if (!drawing) {
            drawing = true;
            var currPoint = svgDoc.transformPoint(event);
            points.push([currPoint.x, currPoint.y]);
        }
        return false;
    }

    function mousemove(event) {
        console.log('polyline mousemove');
        if (drawing) {
            var svgPoint = svgDoc.transformPoint(event);
            var x = svgPoint.x;
            var y = svgPoint.y;
            var pointsTmp = points.concat();
            pointsTmp.push([x, y]);

            if (!element) {
                element = parent.polyline(points).fill(GlobalStatus.getFillColor()).style("fill-opacity", GlobalStatus.getFillOpacity()).stroke({
                    width: GlobalStatus.getLineSize(),
                    color: GlobalStatus.getFontColor()
                });
            } else {
                element.plot(pointsTmp);
            }
        }
        return false;
    }

    function mouseup(event) {
        console.log('polyline mouseup ' + element);
        if (event.button == 2) {
            if (element.attr("points").split(",").length > 2) {
                element.pickable();
            } else {
                parent.removeElement(element);
            }
            document.oncontextmenu = function() {
                return false;
            }
            drawing = false;
            points = [];
            element = null;
            return;
        } else if (drawing && element) {
            var svgPoint = svgDoc.transformPoint(event);
            var x = svgPoint.x;
            var y = svgPoint.y;
            points.push([x, y]);
            element.plot(points);

        }
        return false;
    }

    var listener = {
        mousedown: mousedown,
        mousemove: mousemove,
        mouseup: mouseup,
    };


    var Polyline = function(parentEle) {
        parent = parentEle;
        svgDoc = parent.doc();
        DrawTool.init(svgDoc, listener);
        this.stop = function() {
            DrawTool.stop(svgDoc, listener);
            drawing = false;
            points = [];
            element = null;
            document.oncontextmenu = function() {
                return true;
            }
        };
    };

    this.DrawTool.Polyline = Polyline;

})();