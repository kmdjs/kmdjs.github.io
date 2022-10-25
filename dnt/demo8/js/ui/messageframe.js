/**
 * 聊天
 * User: wangxinbo
 * Date: 12-8-10
 * Time: 上午10:40
 */

define(["ui/scroll","ui/combox"], function (Scroll, ComBox) {
    //存放所有用到的图片
    var imgsets = {

        "group1_shijie":"assets/message/group1_shijie.png",
        "group1_siliao":"assets/message/group1_siliao.png",
        "group1_juntuan":"assets/message/group1_juntuan.png",
        "group1_juntuanzhan":"assets/message/group1_juntuanzhan.png",

        "group2_shijie":"assets/message/group2_shijie.png",
        "group2_siliao":"assets/message/group2_siliao.png",
        "group2_juntuan":"assets/message/group2_juntuan.png",
        "group2_juntuanzhan":"assets/message/group2_juntuanzhan.png",

        "group3_shijie":"assets/message/group3_shijie.png",
        "group3_siliao":"assets/message/group3_siliao.png",
        "group3_juntuan":"assets/message/group3_juntuan.png",
        "group3_tuanzhan":"assets/message/group3_tuanzhan.png",


        "group4_shijie":"assets/message/group4_shijie.png",
        "group4_siliao":"assets/message/group4_siliao.png",
        "group4_juntuan":"assets/message/group4_juntuan.png",
        "group4_tuanzhan":"assets/message/group4_tuanzhan.png",

        "group5_shijie":"assets/message/group5_shijie.png",
        "group5_siliao":"assets/message/group5_siliao.png",
        "group5_juntuan":"assets/message/group5_juntuan.png",
        "group5_tuanzhan":"assets/message/group5_tuanzhan.png",

        "group6_shijie":"assets/message/group6_shijie.png",
        "group6_siliao":"assets/message/group6_siliao.png",
        "group6_juntuan":"assets/message/group6_juntuan.png",
        "group6_tuanzhan":"assets/message/group6_tuanzhan.png",

        "group7_send_press":"assets/message/group7_send.png",
        "group7_send":"assets/message/group7_send_press.png",

        "toggle_press":"assets/message/button_795_1.png",
        "toggle":"assets/message/button_795_2.png",
        "toggle_unable":"assets/message/button_795_3.png",

        //输入框
        "inputarea":"assets/message/xx.png",

        //描边
        "strokeImg":"assets/message/222.jpg",

        //滚动条的图片
        "scroll":"assets/scroll/scroll.png"

    };


    var adjustenable1 = ["group2_shijie", "group2_siliao", "group2_juntuan", "group2_juntuanzhan" ];
    var adjustunable1 = ["group1_shijie", "group1_siliao", "group1_juntuan", "group1_juntuanzhan" ];
    var adjustshowmessage = ["group5_shijie", "group5_siliao", "group5_juntuan", "group5_tuanzhan" ];

    var globlethis = null;                    //存放该类的上下文环境供私有方法使用
    var imgobjectset = [];                    //存放所有bitmap的对象引用,可以通过该索引进行bitmap的操作
    var imgCount = _.size(imgsets);
    var canstart = false;                    //标记是否可以开始进行渲染
    var strokeimg = null;

    var changemessage_h = Global.canvas.height - 45;  //定义“changemessage group”的y坐标
    var inputarea_h = Global.canvas.height - 25;   //定义"inputarea"的y坐标
    var textarea_h = Global.canvas.height - 142;   //定义"inputarea"的y坐标
    var changesend_h = Global.canvas.height - 26;   //定义切换发送范围的按钮的y坐标
    var showbutton_h = Global.canvas.height;       //因为多个按钮垂直排列所以只要用到canvas的高度

    var globashape = null;
    var textsize = 0; //内容的总数

    var selfcolor = "#FFFF33";  //显示自己信息的颜色

    //暂时定义为下面几种颜色，或者可以通过递增值进行更改颜色
    var otherscolor = ["#33FF33", "#FF77FF", "#FF7744", "#00BFFF", "#FF6347"];
    var colorindex = 0; //给其他玩家分配颜色用
    //定义和其联系过的玩家所用的颜色，第一建立连接时是顺序分配的颜色
    var colorrelation = {};
    var scrollbar;     //滚动条
    var scrollbutton;  //增加减少按钮

    var allcontainer = new CJ.Container();    //总的container在滚动条和信息显示联动时候使用
    var maxNum = 13;  //每页可以显示的最大行数
    var _page = 1;


    MessageFrame.prototype = new CJ.Container();

    function MessageFrame() {
        this.initialize();
    }

    MessageFrame.prototype.Container_initialize = MessageFrame.prototype.initialize; //unique to avoid overiding base class

    MessageFrame.prototype.initialize = function () {

        this.Container_initialize();
        globlethis = this;
        initImage();

    }

    //----public methond!----
    MessageFrame.prototype.destory = function () {
        var self = this;
        this.removeAllChildren();
    }


    //----private methond!----
    var initImage = function () {
        log.info("initImage!");
        //遍历数组加载数组中的图片
        _.each(imgsets, function (value, key) {

            loadImage(value, key);

        })

    }

    //图片的加载
    var loadImage = function (filepath, key) {
        var imgObject = new Image();

        imgObject.onload = function () {
            if (key == "strokeImg") {
                strokeimg = imgObject;
            }

            var bitmap = new CJ.Bitmap(imgObject);
            bitmap.visible = false;
            imgobjectset[key] = bitmap;  //添加到索引
            imgCount -= 1;
            //当imgCount===0时说明所有的图片都已经加载完毕
            if (imgCount === 0) {
                //log.info("all image loaded!");
                //改变加载完毕的标记
                canstart = true;

                //点击切换信息显示的工具条
                var Showmessagebtn = initShowMesBtnGroup();
                globlethis.addChild(Showmessagebtn);

                //消息输入的生成
                var inputareabtns = initInputGroup();
                globlethis.addChild(inputareabtns);

                //消息显示的生成
                globashape = initShowMessage()
                globlethis.addChild(globashape);

                //添加button
                /*
                 * 最小值,最大值,当前值,上按钮x，上按钮y，下按钮x，下按钮y
                 */
                scrollbutton = new ComBox(0,0,0,0,336.5,0,491);
                globlethis.addChild(scrollbutton);

                //滚动条(测试)
                scrollbar = initScroll();
                globlethis.addChild(scrollbar);
                allcontainer.y = 3;
                globlethis.addChild(allcontainer);

                //发送范围的切换按钮
                globlethis.addChild(initSendMesBtnGroup());


                /*
                 * targety:     滑块的坐标
                 * shapey:      滚动条框的y坐标
                 * 滑块向上滑动时的联动处理
                 */
                scrollbar.onScroll(function (targety,shapey,maxh) {
                    adjustContainer(targety-shapey);
                    //调整combox的当前值
                    scrollbutton.adjustnum(maxh-(targety-shapey));
                });

                scrollbutton.onUp(function(){
                     scrollbar.updateTargetYUp();
                });

                scrollbutton.onDown(function(){
                    scrollbar.updateTargetYDown();
                });

                /*
                 * entityId:发送消息人的连接id
                 * message :消息内容
                 * fromname:发送消息玩家的用户名
                 */

                Global.client.onChatMessage(function (entityId, message, name) {
                    var playerid = Global.player.id;
                    //var playername = Global.player.name;
                    var color = selfcolor;

                    var tempname = "我";
                    //当是其它玩家发来的消息时
                    if (entityId != playerid) {
                        tempname = name;
                        //判断在colorrelation中是否有对应关系
                        if (_.has(colorrelation, entityId)) {
                            color = colorrelation[entityId];
                        }
                        else {
                            //是其它玩家发送的消息
                            color = otherscolor[colorindex];
                            colorrelation[entityId] = color;             //保存到颜色关系中
                            colorindex += 1;                             //索引加1
                            colorindex = colorindex % (otherscolor.length);
                        }
                    }
                    var newText = createText(tempname, message,color);   //140/11 = 12.7272
                    textsize += 1;    //内容的总行数
                    allcontainer.addChild(newText);
                    scrollbar.adjust(textsize);              //调整滚动条的缩放和位置

                    _page = getPage(textsize,maxNum)

                    if(_page>1)
                    {

                        scrollbutton.adjust(textsize,maxNum);           //调整combox的最大值 //
                    }


                });

            }
        };

        imgObject.src = filepath;
    }

    var x_ = 14;
    var y_ = textarea_h - 66;
    var adjustContainer = function(uprows) {
        var length = allcontainer.getNumChildren();
        var maxrows = uprows + maxNum;
        var index_ = 0;
        for (var i = 0; i < length; i++) {
            if (i < uprows) {
                allcontainer.getChildAt(i).visible = false;
            } else if (i < maxrows) {
                var text = allcontainer.getChildAt(i);
                text.x = x_;
                text.y = y_ + (index_ * 12.7272);
                text.visible = true;
                index_++;
            } else {
                allcontainer.getChildAt(i).visible = false;
            }
        }
    }

    //输入框的背景
    var initackgroud = function () {
        var shape = new CJ.Shape();
        shape.graphics
            .beginBitmapStroke(strokeimg)
            .beginFill("rgba(00,00,00,0.2)")
            .drawRoundRect(0, 0, 280, 300, 5).endFill();
        //globlethis.addChild(shape);
        return shape;
    }


    //点击切换信息显示的工具条
    var initShowMesBtnGroup = function () {
        log.info("initShowMesBtnGroup!");
        //临时的container
        var tempcontainer = new CJ.Container();

        //初始化时先显示世界
        var shijiecontainer = new CJ.Container();
        imgobjectset["group2_shijie"].visible = true;
        shijiecontainer.addChild(imgobjectset["group2_shijie"]);
        imgobjectset["group2_shijie"].x = 0;
        imgobjectset["group2_shijie"].y = changemessage_h;

        imgobjectset["group1_shijie"].visible = false;
        shijiecontainer.addChild(imgobjectset["group1_shijie"]);
        imgobjectset["group1_shijie"].x = 0;
        imgobjectset["group1_shijie"].y = changemessage_h;

        shijiecontainer.onPress = function (event) {
            var e = event || window.event;
            adjustEnableFun("group2_shijie", adjustenable1);         //调整要显示的按钮
            adjustUnEnableFun("group1_shijie", adjustunable1);       //调整要灰显的按钮
        }
        tempcontainer.addChild(shijiecontainer);

        //----私聊----
        var siliaocontainer = new CJ.Container();
        siliaocontainer.addChild(imgobjectset["group1_siliao"]);
        imgobjectset["group1_siliao"].x = 73;
        imgobjectset["group1_siliao"].y = changemessage_h;
        imgobjectset["group1_siliao"].visible = true;               //显示未按下去的按钮
        imgobjectset["group2_siliao"].x = 73;
        imgobjectset["group2_siliao"].y = changemessage_h;
        shijiecontainer.addChild(imgobjectset["group2_siliao"]);  //添加按下去的按钮
        siliaocontainer.onPress = function (event) {
            var e = event || window.event;
            adjustEnableFun("group2_siliao", adjustenable1);         //调整要显示的按钮
            adjustUnEnableFun("group1_siliao", adjustunable1);       //调整要灰显的按钮
        }
        tempcontainer.addChild(siliaocontainer);

        //----军团----
        var juntuancontainer = new CJ.Container();
        juntuancontainer.addChild(imgobjectset["group1_juntuan"]);
        imgobjectset["group1_juntuan"].x = 146;
        imgobjectset["group1_juntuan"].y = changemessage_h;
        imgobjectset["group1_juntuan"].visible = true;               //显示未下去的按钮
        imgobjectset["group2_juntuan"].x = 146;
        imgobjectset["group2_juntuan"].y = changemessage_h;
        juntuancontainer.addChild(imgobjectset["group2_juntuan"]); //添加按下去的按钮
        juntuancontainer.onPress = function (event) {
            var e = event || window.event;
            adjustEnableFun("group2_juntuan", adjustenable1);        //调整要显示的按钮
            adjustUnEnableFun("group1_juntuan", adjustunable1);      //调整要灰显的按钮
        }
        tempcontainer.addChild(juntuancontainer);

        //----军团战----
        var juntuanzhancontainer = new CJ.Container();
        juntuanzhancontainer.addChild(imgobjectset["group1_juntuanzhan"]);
        imgobjectset["group1_juntuanzhan"].x = 219;
        imgobjectset["group1_juntuanzhan"].y = changemessage_h;
        imgobjectset["group1_juntuanzhan"].visible = true;                  //显示未下去的按钮
        imgobjectset["group2_juntuanzhan"].x = 219;
        imgobjectset["group2_juntuanzhan"].y = changemessage_h;
        juntuanzhancontainer.addChild(imgobjectset["group2_juntuanzhan"]);//添加按下去的按钮
        juntuanzhancontainer.onPress = function (event) {
            var e = event || window.event;
            adjustEnableFun("group2_juntuanzhan", adjustenable1);             //调整要显示的按钮
            adjustUnEnableFun("group1_juntuanzhan", adjustunable1);           //调整要灰显的按钮
        }
        tempcontainer.addChild(juntuanzhancontainer);

        return tempcontainer;
    }


    //显示消息的textarea（暂时用）
    var initShowMessage = function () {
        var temp = new CJ.Container();

        var shape = new CJ.Shape();
        shape.graphics.beginFill("rgba(11,11,15,0.6)").drawRoundRect(13, textarea_h - 71, 282, 168, 0.5).endFill();
        temp.addChild(shape);

        return temp;

    }

    //切换信息发送的范围的工具条 （send）
    var initSendMesBtnGroup = function () {
        //临时的container
        var tempcontainer = new CJ.Container();

        //下放的切换按钮
        var butncontainer = new CJ.Container();
        //列表的显示按钮
        var showcontainer = new CJ.Container();
        showcontainer.visible = false;
        //-----世界----

        imgobjectset["show_shijie"] = imgobjectset["group5_shijie"].clone();
        imgobjectset["show_shijie"].visible = true;

        imgobjectset["group5_shijie"].visible = true;
        imgobjectset["group5_shijie"].x = 0;
        imgobjectset["group5_shijie"].y = changesend_h;
        imgobjectset["group5_shijie"].scaleX = 1.5;
        imgobjectset["group5_shijie"].scaleY = 1.2;
        butncontainer.addChild(imgobjectset["group5_shijie"]);

        imgobjectset["show_shijie"].onPress = function (event) {
            var e = event || window.event;
            //显示列表
            //alert("shijie");
            adjustEnableFun("group5_shijie", adjustshowmessage);
        }

        //显示列表的button
        imgobjectset["show_shijie"].x = 0;
        imgobjectset["show_shijie"].y = showbutton_h - 50;
        imgobjectset["show_shijie"].scaleX = 1.5;
        imgobjectset["show_shijie"].scaleY = 1.2;
        showcontainer.addChild(imgobjectset["show_shijie"]);


        //----私聊----
        //克隆一份用做列表展示
        imgobjectset["show_siliao"] = imgobjectset["group5_siliao"].clone();
        imgobjectset["show_siliao"].visible = true;

        imgobjectset["group5_siliao"].visible = true;
        imgobjectset["group5_siliao"].x = 0;
        imgobjectset["group5_siliao"].y = changesend_h;
        imgobjectset["group5_siliao"].scaleX = 1.5;
        imgobjectset["group5_siliao"].scaleY = 1.2;
        butncontainer.addChild(imgobjectset["group5_siliao"]);  //添加按下去的按钮

        //显示列表的button
        imgobjectset["show_siliao"].x = 0;
        imgobjectset["show_siliao"].y = showbutton_h - 75;
        imgobjectset["show_siliao"].scaleX = 1.5;
        imgobjectset["show_siliao"].scaleY = 1.2;
        imgobjectset["show_siliao"].onPress = function (event) {
            var e = event || window.event;
            //alert("siliao");
            adjustEnableFun("group5_siliao", adjustshowmessage);
        }

        showcontainer.addChild(imgobjectset["show_siliao"]);


        //----军团----
        imgobjectset["show_juntuan"] = imgobjectset["group5_juntuan"].clone();
        imgobjectset["show_juntuan"].visible = true;

        imgobjectset["group5_juntuan"].x = 0;
        imgobjectset["group5_juntuan"].y = changesend_h;
        imgobjectset["group5_juntuan"].scaleX = 1.5;
        imgobjectset["group5_juntuan"].scaleY = 1.2;

        butncontainer.addChild(imgobjectset["group5_juntuan"]); //添加按下去的按钮

        //显示列表的button
        imgobjectset["show_juntuan"].x = 0;
        imgobjectset["show_juntuan"].y = showbutton_h - 100;
        imgobjectset["show_juntuan"].scaleX = 1.5;
        imgobjectset["show_juntuan"].scaleY = 1.2;

        imgobjectset["show_juntuan"].onPress = function (event) {
            var e = event || window.event;
            //alert("juntuan");
            adjustEnableFun("group5_juntuan", adjustshowmessage);
        }


        showcontainer.addChild(imgobjectset["show_juntuan"]);

        //----团战----
        imgobjectset["show_tuanzhan"] = imgobjectset["group5_tuanzhan"].clone();
        imgobjectset["show_tuanzhan"].visible = true;
        imgobjectset["group5_tuanzhan"].x = 0;
        imgobjectset["group5_tuanzhan"].y = changesend_h;
        imgobjectset["group5_tuanzhan"].scaleX = 1.5;
        imgobjectset["group5_tuanzhan"].scaleY = 1.2;

        butncontainer.addChild(imgobjectset["group5_tuanzhan"]);//添加按下去的按钮

        //显示列表的button
        imgobjectset["show_tuanzhan"].x = 0;
        imgobjectset["show_tuanzhan"].y = showbutton_h - 125;
        imgobjectset["show_tuanzhan"].scaleX = 1.5;
        imgobjectset["show_tuanzhan"].scaleY = 1.2;

        imgobjectset["show_tuanzhan"].onPress = function (event) {
            var e = event || window.event;
            //alert("tuanzhan");
            adjustEnableFun("group5_tuanzhan", adjustshowmessage);

        }

        showcontainer.addChild(imgobjectset["show_tuanzhan"]);

        //触发显示和隐藏列表
        butncontainer.onPress = function (event) {
            var e = event || window.event;
            if (showcontainer.isVisible() == true) {
                showcontainer.visible = false;
            }
            else if (showcontainer.isVisible() == false) {
                showcontainer.visible = true;
            }

        }

        tempcontainer.addChild(butncontainer);
        tempcontainer.addChild(showcontainer);

        return  tempcontainer;
    }

    //输入框和发送按钮（暂时写死位置）
    var initInputGroup = function () {
        log.info("initInputGroup!");
        var temp = new CJ.Container();
        //输入框后面的背景
        imgobjectset["inputarea"].visible = true;
        imgobjectset["inputarea"].x = 50;
        imgobjectset["inputarea"].y = inputarea_h;
        temp.addChild(imgobjectset["inputarea"]);

        //将页面的dom对象转化为easeljs对象
        var dom_input = new CJ.DOMElement("inputmessage");
        document.getElementById("inputmessage").style.display = ""; //显示输入框

        var input = document.getElementById("inputmessage");
        input.style.height = 18 + "px";
        input.style.width = 170 + "px";

        input.style.left = Math.round(Global.canvas.offsetLeft + 60) + "px";
        input.style.top = Math.round(Global.canvas.offsetTop + (inputarea_h) + 3) + "px";

        var sendcontainer = new CJ.Container();
        //发送按钮按下去前的图片
        imgobjectset["group7_send"].visible = true;
        imgobjectset["group7_send"].x = 245.4;
        imgobjectset["group7_send"].y = inputarea_h;
        imgobjectset["group7_send"].scaleX = 1.5;
        imgobjectset["group7_send"].scaleY = 1.2;
        sendcontainer.addChild(imgobjectset["group7_send"]);

        //发送按钮按下去后的图片
        imgobjectset["group7_send_press"].visible = false;
        imgobjectset["group7_send_press"].x = 245.4;
        imgobjectset["group7_send_press"].y = inputarea_h;
        imgobjectset["group7_send_press"].scaleX = 1.5;
        imgobjectset["group7_send_press"].scaleY = 1.2;
        sendcontainer.addChild(imgobjectset["group7_send_press"]);
        temp.addChild(sendcontainer);


        //发送按钮的按下事件处理
        sendcontainer.onPress = function (event) {
            var e = event || window.event;
            //得到输入的信息
            var message = document.getElementById("inputmessage").value;
            imgobjectset["group7_send_press"].visible = true;    //按下去的图片显示
            imgobjectset["group7_send"].visible = false;         //没按下去前的图片隐藏掉
            e.onMouseUp = function () {
                imgobjectset["group7_send_press"].visible = false;    //按下去的图片显示
                imgobjectset["group7_send"].visible = true;         //没按下去前的图片隐藏掉

                //进行发送聊天
                say_group(message);
                document.getElementById("inputmessage").value = "";
            }

        }

        return temp;
    }


    var initScroll = function () {
        //13为每页显示的最大行数
        return new Scroll(imgobjectset["scroll"], 0, maxNum, 0, textarea_h - 58);
    }


    //将自己设置为按下，其他设置为未按下
    var adjustEnableFun = function (showv, scope) {
        imgobjectset[showv].visible = true;
        _.each(scope, function (value) {
            if (value != showv) {
                imgobjectset[value].visible = false;
            }
        });
    }

    //除了按下去的按钮的未按下图片设置为隐藏，其他的未按下去按钮设置为显示
    var adjustUnEnableFun = function (hidev, scope) {
        imgobjectset[hidev].visible = false;
        _.each(scope, function (value) {
            if (value != hidev) {
                imgobjectset[value].visible = true;
            }
        });
    }

    //组聊（这里的组是地图上定义的组的范围）
    var say_group = function (message) {
        Global.client.sendChat(message);
    }

    //生成文字显示在shape中
    var createText = function (id, content, color) {

        var tempcontent = id + ":" + content;
        var text = new CJ.Text(tempcontent, this.fontSize + "px Arial", color);
        return text;
    }

    var getPage = function (size, persize) {
        var page = 1;
        var temp;
        var mod;
        if (size == 0) {
            temp = 0;
            mod = 0;
        }
        else {
            temp = parseInt(size / persize);
            mod = size % persize
        }

        if (temp == 0) {
            page = 1;
        }

        if (mod > 0) {
            page = temp + 1;
        }
        else if (mod == 0 && size != 0) {
            page = temp;
        }
        return page;
    }

    return MessageFrame;
});