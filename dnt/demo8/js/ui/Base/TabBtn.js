define(function () {


    var TabBtn = function (bg, selectedBg) {


        this.initialize( bg, selectedBg);
    }

    TabBtn.prototype = new CJ.Container();

    TabBtn.prototype.Container_initialize = TabBtn.prototype.initialize;

    TabBtn.prototype.initialize = function (bg, selectedBg) {
        this.Container_initialize();
        this.bg = bg;
        this.selectedBg = selectedBg;
        this.addChild(this.bg, this.selectedBg);

    }

    TabBtn.prototype.select = function () {
        this.bg.visible = false;
        this.selectedBg.visible = true;
    }

    TabBtn.prototype.unSelect = function () {
        this.bg.visible = true;
        this.selectedBg.visible = false;
    }
    return TabBtn;
})