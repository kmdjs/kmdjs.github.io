define(['ui/DragDropMachine', 'ui/tips', 'ui/popup/Popup', 'ui/Hole'], function (DragDropMachine, Tips, Popup, Hole) {
    BagBar.prototype = new Popup();
    var This = null;
    var shape = null;
    //以后放物品的items
    var items = [];
    //历史物品的items
    var historyItems = [];

    /**
    *
    */
    function BagBar() {
        this.initialize();
    }

    BagBar.prototype.super_initialize = BagBar.prototype.initialize; //unique to avoid overiding base class

    BagBar.prototype.initialize = function () {
        this.super_initialize();
        this.tips = null;
        This = this;
        //pre记录上次点击的位置
        This.x = This.preX = Global.stage.mouseX;
        This.y = This.preY = Global.stage.mouseY;
        this.show();
    }


    BagBar.prototype.show = function () {
        //背景
        var background = new CJ.Bitmap(Resource.getRes("7"));
        //这里设置旋转点（扩张点），基于最大的容器，这样下面的Util.pW(50) Util.pH(50)才能居中
        this.regX = background.image.width / 2;
        this.regY = background.image.height / 2;
        this.addChild(background);
        var background1 = new CJ.Bitmap(Resource.getRes("8"));
        this.addChild(background1);
        var background2 = new CJ.Bitmap(Resource.getRes("9"));
        background2.y = -10;
        this.addChild(background2);

        var exit = new CJ.Bitmap(Resource.getRes("6"));
        exit.y = 2;
        exit.x = 276;
        exit.onPress = function () {
            This.hide();
        }
        this.addChild(exit);

        for (var j = 0; j < 6; j++) {
            var bagkuang;
            for (var i = 0; i < 6; i++) {
                if (j >= 3) {
                    bagkuang =  new CJ.Bitmap(Resource.getRes("1"));
                } else{
                    bagkuang = new CJ.Bitmap(Resource.getRes("2"));
                    shape = new CJ.Shape();
                }

                bagkuang=new Hole(bagkuang);
                bagkuang.y = 45;
                bagkuang.x = 10;
                bagkuang.y = bagkuang.y + bagkuang.height * j;
                bagkuang.x = bagkuang.x + bagkuang.width * i;

                if(j>=3){
                    bagkuang.lock =  true;
                }
                this.addChild(bagkuang)
            }
        }
  
        //整理背包
        var clearbutton = new CJ.Bitmap(Resource.getRes("4"));
        clearbutton.x = background.x + 20;
        clearbutton.y = background.y + 370;
        this.addChild(clearbutton);
        //仓库
        var storage = new CJ.Bitmap(Resource.getRes("5"));
        storage.x = clearbutton.x + 90;
        storage.y = 370;
        this.addChild(storage);

        //prop
        var prop = new CJ.Bitmap(Resource.getRes("3"));
        prop.x = clearbutton.x + 180;
        prop.y = 370;
        this.addChild(prop);
        //实现拖拽
        DragDropMachine.handleParent(background, This);
    }

    BagBar.prototype.getWidth = function () {
        return this.regX*2;
    }

    BagBar.prototype.getHight = function () {
        return this.regY*2;
    }


    BagBar.prototype.showMe = function (x,y) {
        //Util.pW(50) Util.pH(50)代表居中！
        CJ.Tween.get(this).to({ scaleX: 1, scaleY: 1, x:x||Util.pW(50), y: y||Util.pH(50), alpha: 1 }, 300).wait(150).call(this.showTweenComplete);
    }

    BagBar.prototype.hide = function (x,y) {
        CJ.Tween.get(This).to({ scaleX: 0, scaleY: 0, x: x||this.preX, y: y||this.preY, alpha: 0 }, 300).wait(150).call(this.showTweenComplete);
    }

    return BagBar;
})


