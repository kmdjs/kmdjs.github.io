define(function () {
    var HeadTool = function () {

        this.initialize();
    }

    HeadTool.prototype = new CJ.Container();

    HeadTool.prototype.Container_initialize = HeadTool.prototype.initialize;
    HeadTool.prototype.initialize = function () {
        this.Container_initialize();
        var minHead = new CJ.Bitmap(Resource.getRes("minHead1"));
        minHead.x = 10;
        minHead.y = 8;
        var bg = new CJ.Bitmap(Resource.getRes("headToolBg"));


        this.hpShape = new CJ.Shape();
        this.hpShape.graphics.beginLinearGradientFill(["#61090B", "#DE0611"], [0, 1], 0, 0, 0, 15).drawRect(0, 0, 106, 15);
        this.hpShape.x = 47;
        this.hpShape.y = 6;

        this.mpShape = new CJ.Shape();
        this.mpShape.graphics.beginLinearGradientFill(["#04265D", "#2247B1"], [0, 1], 0, 0, 0, 15).drawRect(0, 0, 104, 12);
        this.mpShape.x = 47;
        this.mpShape.y = 25;

        this.levelTxt = new CJ.Text("1", "bold 14px Arial", "#ffffff");
        this.levelTxt.textBaseline = "top";
        this.levelTxt.x = 22;
        this.levelTxt.y = 42;
        this.addChild(bg, minHead, this.hpShape, this.mpShape, this.levelTxt);


    }

    HeadTool.prototype.updateHP = function () {

        this.hpShape.graphics.clear();
        this.hpShape.graphics.beginLinearGradientFill(["#61090B", "#DE0611"], [0, 1], 0, 0, 0, 15).drawRect(0, 0, 106 * Global.player.HP / Global.player.totalHP, 15);
    }

    HeadTool.prototype.setMP = function (value) {
        this.mpShape.graphics.clear();
    }

    HeadTool.prototype.setLevel = function (value) {
        this.levelTxt.text = value;
        if (value >= 10) this.levelTxt.x = 16;
    }

    return HeadTool;
});