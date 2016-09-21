(function() {
    SVG.extend(SVG.Doc, {
        transformPoint: function(event) {
            event = event || window.event;
            var touches = event.changedTouches && event.changedTouches[0] || event;
            var node = this.node;
            var point = node.createSVGPoint();
            point.x = touches.pageX - window.scrollX;
            point.y = touches.pageY - window.scrollY;
            var matrix = node.getScreenCTM().inverse();
            return point.matrixTransform(matrix);
        }
    });
})();