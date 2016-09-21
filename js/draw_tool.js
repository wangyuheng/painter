(function() {
    var defaultListener = {
        mousedown: function() {
            console.log('mousedown you should implement this function!');
        },
        mousemove: function() {
            console.log('mousemove you should implement this function!');
        },
        mouseup: function() {
            console.log('mouseup   you should implement this function!');
        }
    };
    var DrawTool = {
        init: function(svgDoc, listeners) {
            var l = $.extend({}, defaultListener, listeners);
            svgDoc.on('mousedown', l.mousedown);
            svgDoc.on('mousemove', l.mousemove);
            svgDoc.on('mouseup', l.mouseup);
        },
        stop: function(svgDoc, listeners) {
            var l = $.extend({}, defaultListener, listeners);
            svgDoc.off('mousemove', l.mousemove);
            svgDoc.off('mousedown', l.mousedown);
            svgDoc.off('mouseup', l.mouseup);
        }
    };


    this.DrawTool = DrawTool;
})();