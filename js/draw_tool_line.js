(function() {

    var parent = null;
    var drawing = false;
    var element = null;
    var startPoint = null;

    function mousedown(event) {
        console.log('line mousedown');
        drawing = true;
        startPoint = svgDoc.transformPoint(event);
        element = parent.line(startPoint.x, startPoint.y, startPoint.x, startPoint.y).style("fill-opacity", '0.0').stroke({
            width: '2',
            color: '#000000'
        });
    }

    function mousemove(event) {
        console.log('line mousemove');
        if (drawing) {
            var svgPoint = svgDoc.transformPoint(event);
            var x = svgPoint.x;
            var y = svgPoint.y;

            element.plot([
                [startPoint.x, startPoint.y],
                [x, y]
            ]);
        };
    }

    function mouseup(event) {
        console.log('line mouseup ' + element);
        drawing = false;
        if (element.attr("x1") != element.attr("x2") && element.attr("y1") != element.attr("y2")) {
            element.pickable();
        }
    }

    var listener = {
        mousedown: mousedown,
        mousemove: mousemove,
        mouseup: mouseup,
    };


    var Line = function(parentEle) {
        parent = parentEle;
        svgDoc = parent.doc();
        DrawTool.init(svgDoc, listener);
        this.stop = function() {
            DrawTool.stop(svgDoc, listener);
        };
    };

    this.DrawTool.Line = Line;

})();