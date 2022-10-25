//$(function () {
//    // Load dialog on page load
//    //$('#basic-modal-content').modal();
   
//    // Load dialog on click
//    $('.navbar li').eq(1).click(function (e) {
//        $('#basic-modal-content').modal();
        
//        return false;
//    });
//    //$(document)时,上面的return false不能阻止冒泡导致ie不能弹出
//    //$("#simplemodal-container").click(function () {
//    //    $.modal.close();
//    //})
//    //$("#simplemodal-overlay").click(function () {
//    //    $.modal.close();
//    //})
//    $("a").attr("target", "_blank");
//}());

jQuery(function ($) {
    //if (!jQuery.support.leadingWhitespace) window.location.href = "sorry.html";
    // Load dialog on page load
    //$('#basic-modal-content').modal();

    // Load dialog on click
    
    if ('ontouchstart' in window) {
        var about = $('#about')[0];
        about.addEventListener("touchstart", function (evt) {
            //$("#simplemodal-overlay").toggle();
            $("#simplemodal-container").toggle();

            var vp = _getViewport();

            $dialog = $("#simplemodal-container");
            $dialog.css({ left: vp[0] + (vp[2] / 2) - ($dialog.width() / 2), top: vp[1] + (vp[3] / 2) - ($dialog.height() / 2) });
           // $("#simplemodal-overlay").css({ height: $(document).height() })
            evt.preventDefault();
            evt.stopPropagation();
            return false;
        }, false);

    } else {
        $('#about').click(function (e) {
         
            //$("#simplemodal-overlay").toggle();
            $("#simplemodal-container").toggle();

            var vp = _getViewport();

            $dialog = $("#simplemodal-container");
            $dialog.css({ left: vp[0] + (vp[2] / 2) - ($dialog.width() / 2), top: vp[1] + (vp[3] / 2) - ($dialog.height() / 2) });
            //$("#simplemodal-overlay").css({ height: $(document).height() });
            e.stopPropagation();
            return false;
        });
    
    }
    $(document).click(function () {
       // $("#simplemodal-overlay").hide();
        $("#simplemodal-container").hide();
    });
    function _getViewport() {
        var d = document.documentElement, b = document.body, w = window, div = document.createElement("div");

        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        var lt = !(div.firstChild.nodeType === 3) ?
                { left: b.scrollLeft || d.scrollLeft, top: b.scrollTop || d.scrollTop } :
                { left: w.pageXOffset, top: w.pageYOffset };
        var wh = w.innerWidth ?
                { width: w.innerWidth, height: w.innerHeight } :
                (d && d.clientWidth && d.clientWidth != 0 ?
                    { width: d.clientWidth, height: d.clientHeight } :
                    { width: b.clientWidth, height: b.clientHeight });

        return [lt.left, lt.top, wh.width, wh.height]
    }
    var cttHTML="";
    for (var i = DNTDEMOCOUNT; i > 0; i--)
    {
        cttHTML +=
        '<div class="span3" style="margin-left: 15px;">' +
               '<a href="http://weibo.com/iamleizhang/demo'+i+'/index.html" class="thumbnail">' +
                   '<img  alt="coming" style="width: 260px; height: 180px;" src="img/demo' + i + 'pv.'+(i===41?"gif":"png")+'">' +
               '</a>' +
               '<p style="margin-left: 8px;"><a class="btn" href="http://weibo.com/iamleizhang/demo' + i + '/index.html">View details &raquo;</a></p>' +
           '</div>';
    }
    $("#mainCTT").html(cttHTML);
    $("a").attr("target", "_blank");
});