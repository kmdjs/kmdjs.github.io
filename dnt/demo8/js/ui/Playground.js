//地图之上、菜单之下的容器
define(function () {
    function Playground() {
        this.initialize();
    }

    Playground.prototype = new CJ.Container();


    var clocking = 0;
    // constructor:
    Playground.prototype.Container_initialize = Playground.prototype.initialize;

    Playground.prototype.initialize = function () {
        this.Container_initialize();

    };



    Playground.prototype.tick = function () {
        clocking += 1000 / 60;

        //当达到定时时间或者第一次近如过程动画时都执行
        if (clocking >= 100) {
            clocking = 0;
            //飞行技能要做特殊处理
            this.sortChildren(function (a, b) {
                var tempY1 = a.y;
                var tempY2 = b.y;
                if (a.sortRetTag) tempY1 = a.y + Global.player.centerHeight;
                if (b.sortRetTag) tempY2 = b.y + Global.player.centerHeight;
                if (tempY1 === tempY2) return a.y+=0.1;
                return tempY1 - tempY2;
            })
        }
    }






    return Playground;
});