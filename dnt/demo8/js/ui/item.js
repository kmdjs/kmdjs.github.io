//玩家的实现类
define( [ './tips','ui/popup/Popup'],function (Tips,Popup) {
    function Item(id, name, nameColor,position, bitmap) {
        this.initialize(id, name,nameColor ,position, bitmap);
    }

    Item.prototype = new CJ.Container();
    // constructor:
    Item.prototype.Container_initialize = Item.prototype.initialize;

    //Get the id from the service, the id is the connection ID.-----wangxinbo
    Item.prototype.initialize = function (id, name,nameColor, position, bitmap) {
        this.Container_initialize();
        this.visible=false;
        this.id = id;             //后台生成的通信id作为玩家的id值
        this.name = name;         //物品名字
        this.nameColor=nameColor;  //物品显示颜色
        this.nameVisible=true; //物品名字是否显示
        this.nameColor=nameColor; //物品显示颜色
        this.bitmap = bitmap;     //物品的显示
        this.position = position;  //物品掉落位置
        this.desc="";//物品描述
        this.displayTime="";//物品显示时间
        this.level=""//物品级别
        this.prePositionX = -1;
        this.prePositionY =-1;
        this.x=position.x;
        this.y=position.y;
        this.preViewPortX = Global.player.viewPort[0];
        this.preViewPortY = Global.player.viewPort[1];
        this.currentCell = Global.map.getSmallCellIndex(this.position);
        this.show();
    };

    Item.prototype.init = function () {

    }


    Item.prototype.tick = function () {
        this.setStagePosition();
    }

    Item.prototype.setStagePosition = function () {
        if (this.preViewPortX !== Global.player.viewPort[0] || this.preViewPortY !== Global.player.viewPort[1]) {
            this.x += this.preViewPortX - Global.player.viewPort[0];
            this.y += this.preViewPortY - Global.player.viewPort[1];
            this.preViewPortX = Global.player.viewPort[0];
            this.preViewPortY = Global.player.viewPort[1];
        }
        if (this.prePositionX !== this.position.x || this.prePositionY !== this.position.y) {
            var currentStagePositon = Global.worldToStage(this.position);
            this.x = parseInt(currentStagePositon.x);
            this.y = parseInt(currentStagePositon.y);
            this.prePositionX = this.position.x;
            this.prePositionY = this.position.y-50;

        }
        this.setAlpha();
        if(!this.visible){
            this.y-=50;
            this.showMe(this.x,this.y);
            this.visible=true;
        }
    }

    Item.prototype.setAlpha = function () {
        if (_.include(Global.map.mask, this.currentCell.x + "_" + this.currentCell.y)) {
            this.alpha = 0.5;
        } else {
            this.alpha = 1;
        }
    }

    Item.prototype.getStagePosition = function () {
        return new Vector2(this.x, this.y);
    }

    Item.prototype.show = function () {
        var txt = new CJ.Text(this.name,"18 px 宋体", this.nameColor);
        txt.textBaseline="middle";
        var g = new CJ.Graphics();
        g.beginFill("rgba(0,0,0,0.5)"). drawRoundRect(0,-txt.getMeasuredHeight()/2,txt.getMeasuredWidth()/2,txt.getMeasuredHeight(),0) ;
        var s = new CJ.Shape(g);
        this.addChild(s);
        this.txtName=txt;
        txt.visible=this.nameVisible;
        this.addChild(txt);
        this.bitmap.y=txt.getMeasuredHeight()/2;
        this.bitmap.x=-txt.getMeasuredWidth()/4;
        this.addChild(this.bitmap);
    }

    Item.prototype.onDoubleClick = function () {
        this.destory();
    }

    Item.prototype.onMouseOver = function () {
            this.tips = this.createTips();
            this.tips.contentsplit = false;
            var message = new this.tips.message();
            message.separate = ": ";
            message.title = {name:this.name};
            message.content = ["蕴含超强法力"];
            message.contentColor = '#888888';
            this.tips.popup(message);
    }

    Item.prototype.destory = function () {
        CJ.Ticker.removeListener(this);
        this.removeAllChildren();
        this.parent.removeChild(this);
    }

    Item.prototype.onMouseOut = function (event) {
        this.tips.destroy();
    }

    Item.prototype.createTips = function () {
        if (this.tips == null) {
            this.tips = new Tips();
        }
        return this.tips;
    }

    Item.prototype.showMe = function (x,y) {
        //Util.pW(50) Util.pH(50)代表居中！
        CJ.Tween.get(this).to({ scaleX: 1, scaleY: 1, x:x||Util.pW(50), y: y+50||Util.pH(50), alpha: 1 }, 300).wait(300).call(this.showTweenComplete);
    }

    Item.prototype.hide = function (x,y) {
        CJ.Tween.get(this).to({ scaleX: 0, scaleY: 0, x: x||this.preX, y: y||this.preY, alpha: 0 }, 300).wait(150).call(this.showTweenComplete);
    }

    return Item;
});