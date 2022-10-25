define(['ui/DragDropMachine', 'ui/tips', 'ui/popup/Popup','ui/Equip' ,'ui/Hole','ui/Sprite'], function (DragDropMachine, Tips, Popup,Equip,Hole,Sprite) {
    PropertyBar.prototype = new Popup();
    var This = null;
    var shape = null;
    //以后放物品的items
    var items=[];
    //历史物品的items
    var historyItems=[];

    /**
    *
    */
    function PropertyBar() {
        this.initialize();
    }

    PropertyBar.prototype.super_initialize = PropertyBar.prototype.initialize; //unique to avoid overiding base class

    PropertyBar.prototype.initialize = function () {
        this.super_initialize();
        this.tips = null;
        This = this;
        //pre记录上次点击的位置
        This.x =This.preX= Global.stage.mouseX;
        This.y =This.preY= Global.stage.mouseY;
        this.show();
    }


    PropertyBar.prototype.show = function () {
        //背景
        var title = new CJ.Bitmap(Resource.getRes("title"));
        //这里设置旋转点（扩张点），基于最大的容器，这样下面的Util.pW(50) Util.pH(50)才能居中
        this.addChild(title);

        var titletxt= new CJ.Text("人物属性","18px bold 宋体","#F7E4A9");
        titletxt.x=title.x+115;
        titletxt.y=title.y+27;
        this.addChild(titletxt);


        var background1 = new CJ.Bitmap(Resource.getRes("8"));
        this.background1=background1;
        background1.y=title.y+3;
        background1.x=title.x-1;
        background1.alpha=1;
        background1.scaleY=1.02;
        background1.scaleX=1.01;
        this.addChild(background1);
        this.regX = background1.image.width/2;
        this.regY = background1.image.height / 2;

        var box = new CJ.Bitmap(Resource.getRes("box"));
        box.y=title.y+3;
        this.addChild(box);



        var background2 = new CJ.Bitmap(Resource.getRes("9"));
        background2.alpha=1;
        background2.y=title.y+3;
        this.addChild(background2);

        var txtName= new CJ.Text("妲己(妖化) 99级","14px bold 宋体","#F9F9F9");
        txtName.x=title.x+115;
        txtName.y=title.y+80;
        this.addChild(txtName);

        var txtName2= new CJ.Text("声望165(Lv33)","12px bold 宋体","#D3611A");
        txtName2.x=title.x+120;
        txtName2.y=title.y+100;
        this.addChild(txtName2)

        var exit = new CJ.Bitmap(Resource.getRes("6"));
        exit.y=title.y+4;
        exit.x = 276;
        exit.onPress = function () {
            This.hide();
        }
        this.addChild(exit);
        var person = new Sprite("player_run_3");
        this.person=person;
        person.y =title.y +110;
        person.x =title.x+100;
        this.addChild(person);
        var person2 = new Sprite("player_run_4");
        var bagkuang  =new Hole( new CJ.Bitmap(Resource.getRes("2")));
        bagkuang.y =title.y +100;
        bagkuang.x =title.x+18;
        var equip =new Equip(new CJ.Bitmap(Resource.getRes("b1")));
        bagkuang.addEquip(equip);
        equip.onMouseOver = function (event) {
            This.tips = This.createTips();
            This.tips.contentsplit = false;
            var message = new This.tips.message();
            message.separate = ": ";
            message.title = {name:'林丹', value:"听说现在很火", nameColor:'#B100EB', valueColor:'#B100EB'};
            message.content = ["吃了可以长生，带上可以美容"];
            message.contentColor = '#888888';
            This.tips.popup(message);
        }
        equip.onMouseOut = function (event) {
            This.tips.destroy();
        }
        equip.attribute="yao"
        bagkuang.attribute ="yao"
        bagkuang.type ="zhuangbei"
        this.addChild(bagkuang);
        var bagkuang1 =  new Hole( new CJ.Bitmap(Resource.getRes("2")));
        bagkuang1.y =bagkuang.y+60
        bagkuang1.x =bagkuang.x;
        var equip1 =new Equip(new CJ.Bitmap(Resource.getRes("b2")));
        bagkuang1.addEquip(equip1);
        equip1.attribute="gong"
        bagkuang1.attribute ="gong"
        bagkuang1.type ="zhuangbei"
        equip1.onMouseOver = function (event) {
            This.tips = This.createTips();
            This.tips.contentsplit = false;
            var message = new This.tips.message();
            message.separate = ": ";
            message.title = {name:'后羿弓', value:"听说可以射太阳", nameColor:'#B100EB', valueColor:'#B100EB'};
            message.content = ["拿着他无比帅气"];
            message.contentColor = '#888888';
            This.tips.popup(message);
        }


        equip1.onMouseOut = function (event) {
            This.tips.destroy();
        }

        equip1.bmpAnim=person2.weaponsbmpAnim;
        this.addChild(bagkuang1);


        var bagkuang2 =  new Hole( new CJ.Bitmap(Resource.getRes("2")));
        bagkuang2.y =bagkuang1.y +60;
        bagkuang2.x =bagkuang.x;
        var equip2 =new Equip(new CJ.Bitmap(Resource.getRes("b3")));
        bagkuang2.addEquip(equip2);
        equip2.attribute="wan"
        bagkuang2.attribute ="wan"
        bagkuang2.type ="zhuangbei"
        equip2.onMouseOver = function (event) {
            This.tips = This.createTips();
            This.tips.contentsplit = false;
            var message = new This.tips.message();
            message.separate = ": ";
            message.title = {name:'漂亮的护腕', value:"女生比较喜欢", nameColor:'#B100EB', valueColor:'#B100EB'};
            message.content = ["能防身哦"];
            message.contentColor = '#888888';
            This.tips.popup(message);
        }
        equip2.onMouseOut = function (event) {
            This.tips.destroy();
        }

        this.addChild(bagkuang2);

        var bagkuang3 = new Hole( new CJ.Bitmap(Resource.getRes("2")));
        bagkuang3.addEquip(new Equip( new CJ.Bitmap(Resource.getRes("b4"))));
        bagkuang3.y =bagkuang.y ;
        bagkuang3.x =bagkuang.x +230;

        var equip3 =new Equip(new CJ.Bitmap(Resource.getRes("b4")));

        equip3.attribute="mao"
        bagkuang3.attribute ="mao"
        bagkuang3.type ="zhuangbei"
        bagkuang3.addEquip(equip3);
        this.addChild(bagkuang3);
        equip3.onMouseOver = function (event) {
            This.tips = This.createTips();
            This.tips.contentsplit = false;
            var message = new This.tips.message();
            message.separate = ": ";
            message.title = {name:'帽子', value:"防止暴晒", nameColor:'#B100EB', valueColor:'#B100EB'};
            message.content = ["看起来很时尚"];
            message.contentColor = '#888888';
            This.tips.popup(message);
        }
        equip3.onMouseOut = function (event) {
            This.tips.destroy();
        }
        equip3.bmpAnim=person2.headbmpAnim;
        var bagkuang4 =  new Hole( new CJ.Bitmap(Resource.getRes("2")));
        bagkuang4.y =bagkuang3.y+60 ;
        bagkuang4.x =bagkuang3.x ;
        var equip4 =new Equip(new CJ.Bitmap(Resource.getRes("b5")));
        bagkuang4.addEquip(equip4);
        equip4.attribute="jia"
        bagkuang4.attribute ="jia"
        bagkuang4.type ="zhuangbei"
        equip4.onMouseOver = function (event) {
            This.tips = This.createTips();
            This.tips.contentsplit = false;
            var message = new This.tips.message();
            message.separate = ": ";
            message.title = {name:'玄武甲', value:"很厚实哦", nameColor:'#B100EB', valueColor:'#B100EB'};
            message.content = ["听说打不穿"];
            message.contentColor = '#888888';
            This.tips.popup(message);
        }
        equip4.onMouseOut = function (event) {
            This.tips.destroy();
        }
        equip4.bmpAnim=person2.bodybmpAnim;

        this.addChild(bagkuang4);

        var bagkuang5 =  new Hole( new CJ.Bitmap(Resource.getRes("2")));
        bagkuang5.y =bagkuang4.y+60 ;
        bagkuang5.x =bagkuang4.x ;
        var equip5 =new Equip(new CJ.Bitmap(Resource.getRes("b6")));
        bagkuang5.addEquip(equip5);
        this.addChild(bagkuang5);
        equip5.attribute="xie"
        bagkuang5.attribute ="xie"
        bagkuang5.type ="zhuangbei"
        equip5.onMouseOver = function (event) {
            This.tips = This.createTips();
            This.tips.contentsplit = false;
            var message = new This.tips.message();
            message.separate = ": ";
            message.title = {name:'鞋子', value:"打不过就可以跑哦", nameColor:'#B100EB', valueColor:'#B100EB'};
            message.content = ["穿上它贱步如飞"];
            message.contentColor = '#888888';
            This.tips.popup(message);
        }
        equip5.onMouseOut = function (event) {
            This.tips.destroy();
        }
        equip5.bmpAnim=person2.legbmpAnim;
        shape = new CJ.Shape();
        var img = Resource.getRes("222");


        var shape = new CJ.Shape();
        shape.graphics.beginLinearGradientStroke(["rgba(255,255,255,1)", "rgba(255, 255, 255, 1)"], [0, 0], 0,0, 70, 140).moveTo( title.x +10, title.y+280).lineTo(296, title.y+280).endStroke();
        this.addChild(shape);

        var txtName3= new CJ.Text("生命 9999","15px bold 宋体","#F9F9F9");
        txtName3.x=title.x+15;
        txtName3.y=title.y+300;
        this.addChild(txtName3);

        var txtName4= new CJ.Text("职业 狐狸精","15px bold 宋体","#F9F9F9");
        txtName4.x=title.x+15;
        txtName4.y=title.y+325;
        this.addChild(txtName4);

        var txtName4= new CJ.Text("绝招 魅惑","15px bold 宋体","#F9F9F9");
        txtName4.x=title.x+15;
        txtName4.y=title.y+350;
        this.addChild(txtName4);


        var txtName5= new CJ.Text("武力 9999","15px bold 宋体","#F9F9F9");
        txtName5.x=title.x+220;
        txtName5.y=title.y+300;
        this.addChild(txtName5);

        var txtName6= new CJ.Text("绝技 8888","15px bold 宋体","#F9F9F9");
        txtName6.x=title.x+220;
        txtName6.y=title.y+325;
        this.addChild(txtName6);

        var txtName7= new CJ.Text("法术 7777","15px bold 宋体","#F9F9F9");
        txtName7.x=title.x+220;
        txtName7.y=title.y+350;
        this.addChild(txtName7);

        var button1 = new CJ.Bitmap(Resource.getRes("button2"));
        button1.x = title.x + 30;
        button1.y = title.y + 380;
        this.addChild(button1);

        var button1txt= new CJ.Text("伙 伴","12px bold 宋体","#F9F9F9");
        button1txt.x=button1.x+20;
        button1txt.y=button1.y+24;
        this.addChild(button1txt);

        var button2 = new CJ.Bitmap(Resource.getRes("button2"));
        button2.x = button1.x + 60;
        button2.y =  button1.y;
        this.addChild(button2);

        var button2txt= new CJ.Text("鲜 花","12px bold 宋体","#F9F9F9");
        button2txt.x=button2.x+20;
        button2txt.y=button2.y+24;
        this.addChild(button2txt);

        var button3 = new CJ.Bitmap(Resource.getRes("button2"));
        button3.x = button2.x + 60;
        button3.y =  button1.y;
        this.addChild(button3);

        var button3txt= new CJ.Text("丹 药","12px bold 宋体","#F9F9F9");
        button3txt.x=button3.x+20;
        button3txt.y=button3.y+24;
        this.addChild(button3txt);

        var button4 = new CJ.Bitmap(Resource.getRes("button2"));
        button4.x = button3.x + 60;
        button4.y =  button1.y;
        this.addChild(button4);

        var button4txt= new CJ.Text("培 养","12px bold 宋体","#F9F9F9");
        button4txt.x=button4.x+20;
        button4txt.y=button4.y+24;
        this.addChild(button4txt);

        DragDropMachine.handleParent(title, This);
        this.showMe();
    }

    PropertyBar.prototype.getWidth = function () {
           return this.background1.image.width
    }

    PropertyBar.prototype.getHight = function () {
        return this.background1.image.height
    }

    PropertyBar.prototype.showMe = function (x,y) {
        //Util.pW(50) Util.pH(50)代表居中！
        CJ.Tween.get(this).to({ scaleX: 1, scaleY: 1, x:x||Util.pW(50), y: y||Util.pH(50), alpha: 1 }, 300).wait(150).call(this.showTweenComplete);
    }

    PropertyBar.prototype.hide = function (x,y) {
        CJ.Tween.get(This).to({ scaleX: 0, scaleY: 0, x: x||this.preX, y: y||this.preY, alpha: 0 }, 300).wait(150).call(this.showTweenComplete);
    }

    PropertyBar.prototype.createTips = function () {
        if (This.tips == null) {
            This.tips = new Tips();
        }
        return This.tips;
    }

    return PropertyBar;
})


