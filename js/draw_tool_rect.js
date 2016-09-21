(function() {

    var parent = null;
    var drawing = false;
    var element = null;
    var startPoint = null;

    function mousedown(event) {
        console.log('rect mousedown');
        drawing = true;
        startPoint = svgDoc.transformPoint(event);
        element = parent.rect(0, 0).style("fill-opacity", '0.0').stroke({
            width: '2',
            color: '#000000'
        });
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
    };

    function mouseup(event) {
        console.log('rect mouseup ' + element);
        drawing = false;
    }

    var listener = {
        mousedown: mousedown,
        mousemove: mousemove,
        mouseup: mouseup,
    };


    var Rect = function(parentEle) {
        parent = parentEle;
        svgDoc = parent.doc();
        DrawTool.init(svgDoc, listener);
        this.stop = function () {
            DrawTool.stop(svgDoc, listener);
        };
    };

    this.DrawTool.Rect = Rect;

})();