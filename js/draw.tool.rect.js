(function() {

    var parent = null;
    var drawing = false;
    var element = null;
    var startPoint = null;

    function mousedown(event) {
        console.log('rect mousedown');
        if (!drawing) {
            drawing = true;
            startPoint = svgDoc.transformPoint(event);
            element = parent.rect(0, 0).fill(GlobalStatus.getFillColor()).style("fill-opacity", GlobalStatus.getFillOpacity()).stroke({
                width: GlobalStatus.getLineSize(),
                color: GlobalStatus.getFontColor()
            });
        }
        return false;
    }

    function mousemove(event) {
        console.log('rect mousemove');
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
        console.log('rect mouseup ' + element);
        if (drawing) {
            drawing = false;
            if (element.attr("width") > 0) {
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


    var Rect = function(parentEle) {
        parent = parentEle;
        console.log(parent);
        svgDoc = parent.doc();
        DrawTool.init(svgDoc, listener);
        this.stop = function() {
            DrawTool.stop(svgDoc, listener);
        };
    };

    this.DrawTool.Rect = Rect;

})();