(function(){
    $('#svgPanel').contextPopup({
    items: [
        {
            label: ' 取消',
            action: function () {
            }
        },
        {
            label: ' 选择',
            action: function () {
                $("#tool_pick").click();
            }
        },
        {
            label: ' 清屏',
            action: function () {
                $("#clear_all").click();
            }
        }
    ]
});
})();