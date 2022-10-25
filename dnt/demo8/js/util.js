Function.prototype.bind = function (bind) {
    var self = this;
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return self.apply(bind || null, args);
    };
};

var isInt = function(n) {
    return (n % 1) === 0;
};

var TRANSITIONEND = 'transitionend webkitTransitionEnd oTransitionEnd';

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
//初始化requestAnimFrame
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
    })();

        var Util = { }

        Util.loadXml = function (url, callback) {
            $.ajax({
                type: "GET",
                url: "config/" + url,
                dataType: "xml",
                success: callback
            });

        }

        Util.pW = function (percent) {
            return document.getElementById("gameCanvas").width / 100 * percent;
        }

        Util.pH = function (percent) {
            return document.getElementById("gameCanvas").height / 100 * percent;
        }
