require(["jquery","iscroll"], function ($,IS) {
   
    //ie6下动态设置content的高度，才能出现滚动条，因为   top: 40px; bottom: 50px;在ie6下不能决定高度

    //这里需要获取viewport然后把高度设置成viewport的高度减去上下header和footer的高度
    
    var myScroll;
    resetContentHeight();
    var lazyLayout = debounce(resetContentHeight, 200);
    $(window).resize(lazyLayout);
    function resetContentHeight() {
        var vp = getViewport();
        $(".content").css("height", vp[3] - $(".header").height() - $(".footer").height());

        var div = document.createElement("div");

        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        if (div.firstChild.nodeType === 3 ){
            if(myScroll){
                myScroll.refresh();
            }else{
                 myScroll = new iScroll('wrapper');
                document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            }
        }
    }
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function getViewport() {
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
})

