(function() {

    var parent = null;
    var drawing = false;
    var element = null;
    var startPoint = null;

    var plot = null;

    function mousedown(event) {
        console.log('pencil mousedown');
        drawing = true;
        startPoint = svgDoc.transformPoint(event);
        plot = 'M' + startPoint.x + ' ' + startPoint.y;
        element = parent.path(plot).fill(GlobalStatus.getFillColor()).style("fill-opacity", GlobalStatus.getFillOpacity()).stroke({
            width: GlobalStatus.getLineSize(),
            color: GlobalStatus.getFontColor()
        });
        return false;
    }

    function mousemove(event) {
        console.log('pencil mousemove');
        if (drawing) {
            var startPoint = svgDoc.transformPoint(event);
            console.log(plot);
            plot += 'L' + startPoint.x + ' ' + startPoint.y;
            element.plot(plot);
        }
        return false;
    };

    function mouseup(event) {
        console.log('pencil mouseup ' + element);
        drawing = false;
        if (element.attr("d").split("L").length > 2) {
            element.pickable();
        }
        return false;
    }

    var listener = {
        mousedown: mousedown,
        mousemove: mousemove,
        mouseup: mouseup,
    };


    var Pencil = function(parentEle) {
        parent = parentEle;
        svgDoc = parent.doc();
        DrawTool.init(svgDoc, listener);
        this.stop = function() {
            DrawTool.stop(svgDoc, listener);
        };
    };

    this.DrawTool.Pencil = Pencil;

})();