define(['ui/DragDropMachine', 'ui/tips', 'ui/popup/Popup', 'ui/Hole'], function (DragDropMachine, Tips, Popup, Hole) {
    PromptBar.prototype = new Popup();
    var This = null;

    /**
     *
     */
    function PromptBar() {
        this.initialize();
    }

    PromptBar.prototype.super_initialize = PromptBar.prototype.initialize; //unique to avoid overiding base class

    PromptBar.prototype.initialize = function (message, fontSize, color) {
        this.super_initialize();
        This = this;
        this.width = 200;
        this.confirm = false;
        this.height = 130;
        this.color = color || "#000000";
        this.fontSize = fontSize || 12;		//字体大小
        this.message = message || "确认提交么？";
        this.spacing = this.fontSize;		//行间距
        this.textSpacing = 16;	//文本强制换行,行间距
        this.totalWidth = 0; //文字所占宽度
        this.fontHeight = this.fontSize;
        this.rows = 0; //分几行进行显示
        this.show();
    }

    PromptBar.prototype.show = function () {
        var g = new CJ.Graphics();
        //根据字符长度数量判断和高度
        this.checksum(this.message)
        g.beginFill("rgba(0,0,0,0.5)").drawRoundRect(0, 0, this.width, this.height, 3.14);
        var s = new CJ.Shape(g);
        var txt = new CJ.Text(this.message, this.fontSize + "px 宋体", this.color);
        txt.lineHeight = this.fontSize;
        txt.x = s.x + 30;
        txt.y = s.y + 20;
        this.regX = this.width / 2;
        this.regY = this.height / 2;
        this.addChild(s);
        this.addChild(txt);

        var button1 = new CJ.Bitmap(Resource.getRes("button2"));
        button1.x = s.x + 20;
        button1.y = s.y + (this.rows + 1) * this.fontSize;
        button1.onClick = function (e) {
            This.confirm = true;
            This.removeAllChildren();
            This.parent.removeChild(This);
        }
        this.addChild(button1);

        var button1txt = new CJ.Text("确 定", "12px bold 宋体", "#F9F9F9");
        button1txt.x = button1.x + 20;
        button1txt.y = button1.y + 24;
        this.addChild(button1txt);

        var button2 = new CJ.Bitmap(Resource.getRes("button2"));
        button2.x = button1.x + 90;
        button2.y = button1.y;
        button2.onClick = function () {
            This.removeAllChildren();
            This.parent.removeChild(This);
        }
        this.addChild(button2);

        var button2txt = new CJ.Text("取 消", "12px bold 宋体", "#F9F9F9");
        button2txt.x = button2.x + 20;
        button2txt.y = button2.y + 24;

        this.addChild(button2txt);

        DragDropMachine.handleParent(s, This);
        this.showMe();
    }

    PromptBar.prototype.getWidth = function () {
        return this.regX * 2;
    }

    PromptBar.prototype.getHight = function () {
        return this.regY * 2;
    }

    PromptBar.prototype.showMe = function (x, y) {
        //Util.pW(50) Util.pH(50)代表居中！
        Global.stage.addChild(this);
        CJ.Tween.get(this).to({ scaleX:1, scaleY:1, x:x || Util.pW(50), y:y || Util.pH(50), alpha:1 }, 300).wait(150).call(this.showTweenComplete);
    }

    PromptBar.prototype.hide = function (x, y) {
        CJ.Tween.get(This).to({ scaleX:0, scaleY:0, x:x || Util.pW(50), y:x || Util.pW(50), alpha:0 }, 300).wait(150).call(this.showTweenComplete);
    }


    PromptBar.prototype.checksum = function (chars) {
        var sum = chars.length * 2;
        this.totalWidth = this.fontSize / 3 * (sum);
        this.rows = Math.round((this.totalWidth % (this.width - 40) == 0 ? (this.totalWidth / (this.width - 40)) : (this.totalWidth / (this.width - 40)) + 1));
        this.height = this.rows * this.fontHeight + 4 * this.fontHeight;
        this.rowsWord = Math.round((sum / this.rows) + 0.5);
        if (this.rowsWord % 2 != 0) {
            this.rowsWord += 1;
        }
        if (this.rowsWord * this.fontSize / 2 + 50 > 200) {
            this.rowsWord * this.fontSize / 2 + 50
        }

        sum = 0;
        var msg = "";
        var j = 0;
        for (var i = 0; i < chars.length; i++) {
            var c = chars.charCodeAt(i);
            var char = chars.charAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                j += 2;
                char = " " + char;
            }
            else {
                j += 2;
            }
            msg += char;
            if (this.rowsWord == j) {
                j = 0;
                msg += "\r\n";
            }

        }
        this.message = msg;
    }


    return PromptBar;
})


