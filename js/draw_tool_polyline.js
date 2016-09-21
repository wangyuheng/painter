(function() {

    var parent = null;
    var drawing = false;
    var element = null;
    var startPoint = null;

    var points  = [];

    function mousedown(event) {
        if (event.button == 2) {
            document.oncontextmenu=function(){return false;}
            drawing=false;
            points  = [];
            element = null;
            return;
        }
        if (!drawing) {
            drawing = true;
            var currPoint = svgDoc.transformPoint(event);
            points.push([currPoint.x, currPoint.y]);
        }
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
                element = parent.polyline(points).style("fill-opacity", "0.0").stroke({
                    width: '2',
                    color: '#000000'
                });
            } else {
                element.plot(pointsTmp);
            }
        };
    }

    function mouseup(event) {
        console.log('polyline mouseup ' + element);
        if (drawing && element) {
            var svgPoint = svgDoc.transformPoint(event);
            var x = svgPoint.x;
            var y = svgPoint.y;
            points.push([x, y]);
            element.plot(points);
        }
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
            drawing=false;
            points  = [];
            element = null;
            document.oncontextmenu=function(){return true;}
        };
    };

    this.DrawTool.Polyline = Polyline;

})();