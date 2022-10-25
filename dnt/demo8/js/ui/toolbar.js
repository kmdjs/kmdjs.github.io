//渲染的类
define([ 'ui/progressbar', 'ui/tips', 'ui/bagbar', 'ui/popup/PopupViewer','ui/propertybar','ui/Equip' ,'ui/Hole','ui/IconEffect'], function (ProgressBar, Tips, BagBar, PopupViewer,PropertyBar,Equip,Hole,IconEffect) {
    ToolBar.prototype = new CJ.Container();
    var bagbar = null;
    var propertybar = null;

    /**
     *
     */
    function ToolBar() {
        this.initialize();
    }

    ToolBar.prototype.Container_initialize = ToolBar.prototype.initialize; //unique to avoid overiding base class

    ToolBar.prototype.initialize = function () {
        this.Container_initialize();
        this.tips = null;
        this.show();
    }

    /**
     * 在工具栏添加新的工具栏
     * @param x
     * @param y
     */
    ToolBar.prototype.addToolButton = function (toolButtoBitmap) {
        this.addChild(toolButtoBitmap);
    }


    ToolBar.prototype.show = function () {
        var THIS = this;
        //背景
        var shape = new CJ.Shape();
        shape.graphics.beginLinearGradientStroke(["rgba(255,255,255,1)", "rgba(50, 50, 50, 1)"], [0, .4], 0, 0, 70, 140).moveTo(245, 80).lineTo(664, 80).endStroke();
        this.addChild(shape);
        var shape1 = new CJ.Shape();
        shape1.graphics.beginFill("rgba(173,173,173,0.1)").rect(245, 80, 664, 50).endFill();
        this.addChild(shape1);
        
        var bgimage = new CJ.Bitmap(Resource.getRes("2"));
        this.width = bgimage.width;
        this.height = bgimage.height;
        var magic1 = new Hole(bgimage);
        magic1.x = 0;
        magic1.y = 75;
        var bitmap=new CJ.Bitmap(Resource.getRes("frie"));
        bitmap.scaleX=0.69 ;
        bitmap.scaleY=0.69;
        var equip1 =new Equip(bitmap);
        magic1.addEquip(equip1,true);
        this.addChild(magic1);

        var bitmap2=new CJ.Bitmap(Resource.getRes("attack2"));
        bitmap2.scaleX=0.69 ;
        bitmap2.scaleY=0.69;
        var magic2 = new Hole(new CJ.Bitmap(Resource.getRes("2")));
        magic2.x = magic1.x + 50;
        magic2.y = magic1.y;
        var equip2 =new Equip(bitmap2);
        magic2.addEquip(equip2,true);
        this.addChild(magic2);
        var magic3 = new Hole(new CJ.Bitmap(Resource.getRes("2")));
        magic3.x = magic2.x + 50;
        magic3.y = magic1.y;
        var bitmap3=new CJ.Bitmap(Resource.getRes("attack"));
        bitmap3.scaleX=0.69 ;
        bitmap3.scaleY=0.69;
        var equip3 =new Equip(bitmap3);
        magic3.addEquip(equip3,true);
        this.addChild(magic3);
        var magic4 = new Hole(new CJ.Bitmap(Resource.getRes("2")));
        magic4.x = magic3.x + 50;
        magic4.y = magic1.y;
        var bitmap4=new CJ.Bitmap(Resource.getRes("recover"));
        bitmap4.scaleX=0.69 ;
        bitmap4.scaleY=0.69;
        var equip4 =new Equip(bitmap4);
        magic4.addEquip(equip4,true);
        this.addChild(magic4);
        equip1.onMouseOver = function (event) {
        }
        var magmask;
        equip1.onClick = function (event) {
            if(!this.contains(magmask))  {
                magmask=new IconEffect(1,44,44);
                Global.player.magicShow("blaze");
                this.addChild(magmask) ;
            }  else{
            }
        }
        equip1.onMouseOut = function (event) {
        }
        equip2.onMouseOver = function (event) {
        }
        var magmask2;
        equip2.onClick = function (event) {
            if(!this.contains(magmask2))  {
                magmask2=new IconEffect(2,44,44);
                Global.player.magicShow("inferno");
                this.addChild(magmask2) ;
            }  else{
            }
        }
        equip2.onMouseOut = function (event) {
        }
        equip3.onMouseOver = function (event) {
        }
        equip3.onMouseOut = function (event) {
        }

        var magmask3;
        equip3.onClick = function (event) {
            if(!this.contains(magmask3))  {
                magmask3=new IconEffect(3,44,44);
                Global.player.magicShow("iceCone");
                this.addChild(magmask3) ;
            }  else{
            }
        }
        equip4.onMouseOver = function (event) {
        }
        equip4.onMouseOut = function (event) {
        }

        var magmask4;
        equip4.onClick = function (event) {
            if(!this.contains(magmask4))  {
                magmask4=new IconEffect(4,44,44);
                Global.player.addHP(1000);
                this.addChild(magmask4) ;
            }  else{
            }
        }

//        //经验条
//        var progressbar = new ProgressBar("expBar");
//        this.addChild(progressbar);
//        progressbar.show();
//        progressbar.setPostion(0, 120);
//        progressbar.setBar(50);
//        progressbar.onMouseOver = function (event) {
//            THIS.tips = THIS.createTips();
//            THIS.tips.width = 300;
//            THIS.tips.contentsplit = false;
//            var message = new THIS.tips.message();
//            message.separate = ": ";
//            message.title = {name:'经验', value:999999, nameColor:'#888888', valueColor:'#888888'};
//            message.properties.push({name:'经验容量', value:999999, special:false, nameColor:'#888888', valueColor:'#888888'});
//            message.content = ["经验可以用于提升将领等级，可以通过以下途经获得:◆讨伐世界地图副本，历练模式可以获得大量经验", "◆参加组队副本"];
//            message.contentColor = '#888888';
//            THIS.tips.popup(message);
//        }
//        progressbar.onMouseOut = function (event) {
//            THIS.tips.destroy();
//        }
        //声望
        var reputation = new CJ.Bitmap(Resource.getRes("button_779_1"));
        reputation.x = 250;
        reputation.y = 70;
        reputation.cache(0, 0, reputation.image.width, reputation.image.height);
        reputation.onMouseOut = function (event) {
            var e = event || window.event;
            reputation.image = Resource.getRes("button_779_1");
            reputation.updateCache();
        }
        reputation.onMouseOver = function (event) {
            var e = event || window.event;
            reputation.image = Resource.getRes("button_779_2");
            reputation.updateCache();
        }
        reputation.onPress = function (event) {
            var e = event || window.event;
            reputation.image = Resource.getRes("button_779_3");
            reputation.updateCache();
            e.onMouseUp = function () {
                reputation.image = Resource.getRes("button_779_2");
                reputation.updateCache();
            }
        }
        this.addChild(reputation);

        //排行
        var rank = new CJ.Bitmap(Resource.getRes("button_780_1"));
        rank.x = reputation.x + reputation.image.width;
        rank.y = reputation.y;
        rank.cache(0, 0, rank.image.width, rank.image.height);
        rank.onMouseOut = function (event) {
            var e = event || window.event;
            rank.image = Resource.getRes("button_780_1");
            rank.updateCache();
        }
        rank.onMouseOver = function (event) {
            var e = event || window.event;
            rank.image = Resource.getRes("button_780_2");
            rank.updateCache();
        }
        rank.onPress = function (event) {
            var e = event || window.event;
            rank.image = Resource.getRes("button_780_3");
            rank.updateCache();
            e.onMouseUp = function () {
                rank.image = Resource.getRes("button_780_2");
                rank.updateCache();
            }
        }
        this.addChild(rank);

        //军师
        var strategist = new CJ.Bitmap(Resource.getRes("button_787_1"));
        strategist.x = rank.x + rank.image.width;
        strategist.y = reputation.y;

        strategist.cache(0, 0, strategist.image.width, strategist.image.height);
        strategist.onMouseOut = function (event) {
            var e = event || window.event;
            strategist.image = Resource.getRes("button_787_1");
            strategist.updateCache();
        }
        strategist.onMouseOver = function (event) {
            var e = event || window.event;
            strategist.image = Resource.getRes("button_787_2");
            strategist.updateCache();
        }
        strategist.onPress = function (event) {
            var e = event || window.event;
            strategist.image = Resource.getRes("button_787_3");
            strategist.updateCache();
            e.onMouseUp = function () {
                strategist.image = Resource.getRes("button_787_2");
                strategist.updateCache();
            }
        }

        this.addChild(strategist);

        //军团
        var legio = new CJ.Bitmap(Resource.getRes("button_785_1"));
        legio.x = strategist.x + strategist.image.width;
        legio.y = reputation.y;
        legio.cache(0, 0, legio.image.width, legio.image.height);
        legio.onMouseOut = function (event) {
            var e = event || window.event;
            legio.image = Resource.getRes("button_785_1");
            legio.updateCache();
        }
        legio.onMouseOver = function (event) {
            var e = event || window.event;
            legio.image = Resource.getRes("button_785_2");
            legio.updateCache();
        }
        legio.onPress = function (event) {
            var e = event || window.event;
            legio.image = Resource.getRes("button_785_3");
            legio.updateCache();
            e.onMouseUp = function () {
                legio.image = Resource.getRes("button_785_2");
                legio.updateCache();
            }
        }
        this.addChild(legio);

        //强化
        var strong = new CJ.Bitmap(Resource.getRes("button_784_1"));
        strong.x = legio.x + legio.image.width;
        strong.y = reputation.y;

        strong.cache(0, 0, strong.image.width, strong.image.height);
        strong.onMouseOut = function (event) {
            var e = event || window.event;
            strong.image = Resource.getRes("button_784_1");
            strong.updateCache();
        }
        strong.onMouseOver = function (event) {
            var e = event || window.event;
            strong.image = Resource.getRes("button_784_2");
            strong.updateCache();
        }
        strong.onPress = function (event) {
            var e = event || window.event;
            strong.image = Resource.getRes("button_784_3");
            strong.updateCache();
            e.onMouseUp = function () {
                strong.image = Resource.getRes("button_784_2");
                strong.updateCache();
            }
        }

        this.addChild(strong);

        //背包
        var knapsack = new CJ.Bitmap(Resource.getRes("button_901_1"));
        knapsack.x = strong.x + strong.image.width;
        knapsack.y = reputation.y;

        knapsack.cache(0, 0, strong.image.width, strong.image.height);
        knapsack.onMouseOut = function (event) {
            var e = event || window.event;
            knapsack.image = Resource.getRes("button_901_1");
            knapsack.updateCache();
        }
        knapsack.onMouseOver = function (event) {
            var e = event || window.event;
            knapsack.image = Resource.getRes("button_901_2");
            knapsack.updateCache();
        }
        knapsack.onPress = function (event) {
            var e = event || window.event;
            knapsack.image = Resource.getRes("button_901_3");
            if (bagbar == null) {
                bagbar = new BagBar();
                bagbar.showMe( Util.pW(50)+  bagbar.getWidth());
                Global.stage.addChild(bagbar);
            } else {
                Global.stage.addChild(bagbar);
                if(bagbar.x==bagbar.preX){
                    bagbar.showMe( Util.pW(50)+  bagbar.getWidth());
                } else{
                    bagbar.hide();
                }
            }
            e.onMouseUp = function () {
                knapsack.image = Resource.getRes("button_901_2");
                knapsack.updateCache();
            }
        }
        this.addChild(knapsack);

        //将领
        var general = new CJ.Bitmap(Resource.getRes("button_900_1"));
        general.x = knapsack.x + knapsack.image.width;
        general.y = reputation.y;

        general.cache(0, 0, general.image.width, general.image.height);
        general.onMouseOut = function (event) {
            var e = event || window.event;
            general.image = Resource.getRes("button_900_1");
            general.updateCache();
        }
        general.onMouseOver = function (event) {
            var e = event || window.event;
            general.image = Resource.getRes("button_900_2");
            general.updateCache();
        }
        general.onPress = function (event) {
            var e = event || window.event;
            general.image = Resource.getRes("button_900_3");
            if (propertybar == null) {
                propertybar =new PropertyBar();
                Global.stage.addChild(propertybar);
            } else {
                Global.stage.addChild(propertybar);
                if(propertybar.x==propertybar.preX){
                    propertybar.showMe();
                } else{
                    propertybar.hide();
                }
            }
            general.updateCache();
            e.onMouseUp = function () {
                general.image = Resource.getRes("button_900_2");
                general.updateCache();
            }
        }

        this.addChild(general);

        //军队
        var troops = new CJ.Bitmap(Resource.getRes("button_783_1"));
        troops.x = general.x + general.image.width;
        troops.y = reputation.y;

        troops.cache(0, 0, troops.image.width, troops.image.height);
        troops.onMouseOut = function (event) {
            var e = event || window.event;
            troops.image = Resource.getRes("button_783_1");
            troops.updateCache();
        }
        troops.onMouseOver = function (event) {
            var e = event || window.event;
            troops.image = Resource.getRes("button_783_2");
            troops.updateCache();
        }
        troops.onPress = function (event) {
            var e = event || window.event;
            troops.image = Resource.getRes("button_783_3");
            troops.updateCache();
            e.onMouseUp = function () {
                troops.image = Resource.getRes("button_783_2");
                troops.updateCache();
            }
        }

        this.addChild(troops);

        //场景切换
        //var sceneSwitch = new CJ.Bitmap(Resource.getRes("bg_720"));
        //sceneSwitch.x = troops.x + troops.image.width;
        //this.addChild(sceneSwitch);


    }
    ToolBar.prototype.createTips = function () {
        if (this.tips == null) {
            this.tips = new Tips();
        }
        return this.tips;
    }
    
    ToolBar.prototype.getWidth = function () {
           return this.width;
    }

    ToolBar.prototype.getHight = function () {
        return this.height;
    }
    return ToolBar;
})


