//渲染的类
define(function () {
    function Input() {
        this.initialize();
        this.index = 0;
    }
    Input.prototype.initialize = function () {
        var THIS = this;
        //0 1 2 3 4 6 7 8 9 10 11 13 14
        document.onkeydown = function (e) {
            var keycode;
            if (navigator.appName == "Microsoft Internet Explorer") {
                keycode = event.keyCode;
            } else {
                keycode = e.which;
            }

            //6 7 8 9 13
            if (keycode == 49) {	//F1
                Global.player.magicShow("blaze");
            }

            if (keycode == 50) {
                Global.player.magicShow("inferno");
            }

            if (keycode == 51) {
                Global.player.magicShow("iceCone");
            }
            if (keycode == 52) {
                Global.player.addHP(1000);
            }
            if (keycode == 53) {
                Global.player.addMP(1000); 
            }
        }
    }
    Input.prototype.stopDefault = function (e) {
        //如果提供了事件对象，则这是一个非IE浏览器   
        if (e && e.preventDefault) {
            //阻止默认浏览器动作(W3C)  
            e.preventDefault();
        } else {
            //IE中阻止函数器默认动作的方式   
            window.event.returnValue = false;
        }
        return false;
    }
    return Input;
})