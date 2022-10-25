//槽（背包、技能、强化等面板中使用）
define(['ui/DragDropMachine'],function (DragDropMachine) {

    var Holes= new Array();

    var Hole = function (bg) {
        this.initialize(bg);
    }


    Hole.prototype = new CJ.Container();

    // constructor:
    Hole.prototype.Container_initialize = Hole.prototype.initialize;

    Hole.prototype.initialize = function (bg) {
        this.Container_initialize();
        this.bg = bg;
        this.width = this.bg.image.width;
        this.height = this.bg.image.height;
        this.bg.regX = this.bg.width / 2;
        this.bg.regY = this.bg.height / 2;
        this.lock=false;
        this.type="baoguo";
        this.attribute="1"
        this.addChild(bg);
        Holes.push(this)
    }

    /**
     * 槽内添加装备
     * @param Equip
     */
    Hole.prototype.addEquip = function (Equip,isNoMove) {
        this.removeChild(this.equip);
        Equip.x= Equip.regX
        Equip.y= Equip.regX
        this.equip= Equip;
        this.addChild(Equip);
        this.bg.visible=false;
        if(!isNoMove){
            DragDropMachine.handleEquip(Equip) ;
        }
    }

    /**
     * true 锁住
     * false 未锁
     * @param islock
     */
    Hole.prototype.setLock = function (islock) {
        this.lock=islock;
    }

    Hole.prototype.getLock = function (islock) {
       return this.lock;
    }

    Hole.prototype.getHoles = function (Equip) {
        return   Holes;
    }

    return Hole;
});