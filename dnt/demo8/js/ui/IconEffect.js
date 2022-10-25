/* File Created: August 24, 2012 */

//渲染的类
define(function () {
    IconEffect.prototype = new CJ.Container();

    function IconEffect(time, width, height) {
        this.initialize(time, width, height);
    }

    IconEffect.prototype.Container_initialize = IconEffect.prototype.initialize; //unique to avoid overiding base class

    IconEffect.prototype.initialize = function (time, width, height) {
        this.Container_initialize();
        var g = new CJ.Graphics();
        var perimeter = 2 * (width + height);
        this.time = time<=0?1:time;
        this.width = width;
        this.height = height;
        this.pre = 0;
        var s = new CJ.Shape(g);
        this.addChild(s);
        CJ.Ticker.addListener(this);
    }

    IconEffect.prototype.tick = function () {
        var pre = this.pre += 1 / 60;
        var time = this.time;
        var width = this.width;
        var height = this.height;
        var g = new CJ.Graphics();
        var perimeter = 2 * (width + height);
        //第一个八分之一
        if (pre <= time) {
            pre= pre<0?0:pre;
            if ((pre / time) <= 1 / 8) {
                g.beginFill("rgba(0,0,0,0.5)").lineTo(width / 2, height / 2).lineTo(width/ 2 + (pre / time) * perimeter, 0 ).lineTo(width,0).lineTo(width, height).lineTo(0, height).lineTo(0, 0).lineTo(width/2, 0);
            } else if ((pre / time) > 1 / 8 && (pre / time) <= 3 / 8) {
                //第八分之一 到八分之3
                g.beginFill("rgba(0,0,0,0.5)").lineTo(width / 2, height / 2).lineTo(width, 0 + ((pre / time) * perimeter - (perimeter / 8))).lineTo(width, height).lineTo(0,height).lineTo(0, 0).lineTo(width/2, 0);
            } else if ((pre / time) > 3 / 8 && (pre / time) <= 5 / 8) {
                //第八分之三 到八分之五
                g.beginFill("rgba(0,0,0,0.5)").lineTo(width / 2, height / 2).lineTo(width- ((pre / time) * perimeter - (3 * perimeter / 8)), height).lineTo(0, height).lineTo(0,0).lineTo(width/2, 0);
            } else if ((pre / time) > 5 / 8 && (pre / time) <= 7 / 8) {
                //第八分之五 到八分之七
                g.beginFill("rgba(0,0,0,0.5)").lineTo(width / 2, height / 2).lineTo(0 , height-((pre / time) * perimeter - (5 * perimeter / 8))).lineTo(0,0).lineTo(width/2, 0);
            } else {
                //最后八分之一
                g.beginFill("rgba(0,0,0,0.5)").lineTo(width / 2, height / 2).lineTo(0+ ((pre / time) * perimeter - (7 * perimeter / 8)), 0).lineTo(width/2, 0);
            }
        }
        this.removeAllChildren();
        var s = new CJ.Shape(g);
        this.addChild(s);
        if (pre >= time) {
            this.destory();
        }
    }


    IconEffect.prototype.destory = function () {
        CJ.Ticker.removeListener(this);
        this.removeAllChildren();
        this.parent.removeChild(this);
    }

    IconEffect.prototype.getBarWidth = function () {
        return this.width;
    }


    IconEffect.prototype.hiden = function () {
        this.visible = false;
    }

    return IconEffect;
});


