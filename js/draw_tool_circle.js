(function() {

    var parent = null;
    var drawing = false;
    var element = null;
    var startPoint = null;

    function mousedown(event) {
        console.log('circle mousedown');
        drawing = true;
        startPoint = svgDoc.transformPoint(event);
        element = parent.circle(0).move(startPoint.x, startPoint.y).style("fill-opacity", '0.0').stroke({
            width: '2',
            color: '#000000'
        });
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
        };
    }

    function mouseup(event) {
        console.log('circle mouseup ' + element);
        drawing = false;
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