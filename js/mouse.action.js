(function(){
    $('#svgPanel').contextPopup({
    items: [
        {
            label: ' 取消',
            action: function () {
                GlobalStatus.unPickAll();
                return false;
            }
        },
        {
            label: ' 选择',
            action: function () {
                $("#tool_pick").click();
                return false;
            }
        },
        {
            label: ' 清屏',
            action: function () {
                $("#clear_all").click();
                return false;
            }
        }
    ]
});
})();