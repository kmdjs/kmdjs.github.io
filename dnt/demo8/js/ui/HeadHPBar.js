//未来支持可以显示数字
define(function () {
    var HeadHPBar = function (livingThing, width, height) {

        this.initialize(livingThing, width, height);
    }

    HeadHPBar.prototype = new CJ.Container();

    HeadHPBar.prototype.Container_initialize = HeadHPBar.prototype.initialize;
    HeadHPBar.prototype.initialize = function (livingThing, width, height) {
        this.Container_initialize();
        this.livingThing = livingThing;
        this.width = width;
        this.height = height;
        this.bgShape = new CJ.Shape();
        this.bgShape.graphics.beginFill("black").drawRect(-1, -1, width + 2, height + 2);
        this.bgShape.regX = width / 2;
        this.bgShape.regY = livingThing.height;
        this.addChild(this.bgShape);
        this.HPShape = new CJ.Shape();

        this.setHP(livingThing.HP);
        this.HPShape.regX = width / 2;
        this.HPShape.regY = livingThing.height;
        this.addChild(this.HPShape);
    }

    HeadHPBar.prototype.setHP = function (value) {
        if(value>this.livingThing.totalHP)    {
            return;
        }
        this.HPShape.graphics.clear();
        var pct = value / this.livingThing.totalHP;
        this.HPShape.graphics.beginFill(this.getFillColor(pct)).drawRect(0, 0, this.width * pct, this.height);
    }

    HeadHPBar.prototype.getFillColor = function (percentage) {
        if (percentage >= 0.75) return "green";
        if (percentage >= 0.5) return "#55920D";
        if (percentage >= 0.3) return "#9FA40D";
        if (percentage >= 0) return "#952108";
    }


    return HeadHPBar;
});