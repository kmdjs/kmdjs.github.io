//装备
define(['ui/DragDropMachine'],function (DragDropMachine) {

    var Equip = function (bg) {
        this.initialize(bg);
    }


    Equip.prototype = new CJ.Container();

    // constructor:
    Equip.prototype.Container_initialize = Equip.prototype.initialize;

    Equip.prototype.initialize = function (bg) {
        this.Container_initialize();
        this.bg = bg;
        this.width = this.bg.image.width;
        this.height = this.bg.image.height;
        this.bg.regX = this.bg.width / 2;
        this.bg.regY = this.bg.height / 2;
        this.attribute="1"
        this.addChild(bg);
    }



    return Equip;
});