define(['ui/progressbar', 'view/MainPanel', 'ui/progressframe'], function (ProgressBar, MainPanel, Progressframe) {
    function Charactar() {
        this.initialize();
    }

    //继承自 CJ.Container
    Charactar.prototype = new CJ.Container();
    // constructor:
    Charactar.prototype.Container_initialize = Charactar.prototype.initialize; //unique to avoid overiding base class

    var THIS_ = null;
    Charactar.prototype.initialize = function () {
        this.Container_initialize();
        this.stage = Global.stage;
        this.charactar = "0";
        this.sex = "gril";
        this.inputel = new CJ.DOMElement("name");
        this.charactars = new Array();
        this.icons = new Array();
        this.offsetX = 420;
        this.offsetY = 10;
        this.height = 0;
        this.width = 0;
        this.btnheight = 0;
        this.btnwidth = 0;
        this.btnmap = null;
        this.buildingCharactar();
    }
    Charactar.prototype.buildingCharactar = function () {
        THIS_ = this;
        var THIS = this;
        var bmmap = Resource.getBitmap("create_bg");
        bmmap.x = 80;
        bmmap.y = -77;
        this.addChild(bmmap);
        var cm = new CJ.ColorMatrix();
        cm.adjustColor(-60, -35, 0, 0);
        var colorFilter = new CJ.ColorMatrixFilter(cm);
        var blurFilter = new CJ.BoxBlurFilter(0, 0, 2);
        var redChannelFilter = new CJ.ColorFilter(255 / 255, 1, 1, 1);
        var greenChannelFilter = new CJ.ColorFilter(1, 255 / 255, 1, 1);
        var blueChannelFilter = new CJ.ColorFilter(1, 1, 255 / 255, 1);
        var aft = [colorFilter, blurFilter, redChannelFilter, greenChannelFilter, blueChannelFilter];
        var cm1 = new CJ.ColorMatrix();
        cm1.adjustColor(10, 10, 0, 0);
        var colorFilter1 = new CJ.ColorMatrixFilter(cm1);
        var pre = [colorFilter1, blurFilter, redChannelFilter, greenChannelFilter, blueChannelFilter];
        var headimgs = new Array();
        headimgs.push(Resource.getRes("head_2_1"));
        headimgs.push(Resource.getRes("head_2_0"));
        headimgs.push(Resource.getRes("head_1_1"));
        headimgs.push(Resource.getRes("head_1_0"));
        headimgs.push(Resource.getRes("head_3_1"));
        headimgs.push(Resource.getRes("head_3_0"));
        for (var i = 0; i < headimgs.length; i++) {
            var hi = headimgs[i];
            if (this.height == 0) {
                this.height = hi.height;
                this.width = hi.width;
            }
            var hbm = new CJ.Bitmap(hi);
            hbm.name = parseInt(i / 2) + "" + i % 2 + "1";
            if (i >= 2) {
                hbm.visible = false;
            }
            if (i % 2 == 0) {
                hbm.x = this.offsetX - 125;
                hbm.y = this.offsetY;
            } else {
                hbm.x = this.offsetX;
                hbm.y = this.offsetY;
            }
            var hbml = hbm.clone();
            hbml.name = parseInt(i / 2) + "" + i % 2 + "0";
            if (i % 2 == 0) {
                hbm.filters = aft;
                hbml.filters = pre;
            } else {
                hbm.filters = pre;
                hbml.filters = aft;
            }
            hbml.visible = false;
            hbm.cache(0, 0, hi.width, hi.height);
            hbml.cache(0, 0, hi.width, hi.height);
            hbm.onClick = this.chooseCharactar;
            hbml.onClick = this.chooseCharactar;
            this.charactars.push(hbm);
            this.charactars.push(hbml);
            this.addChild(hbm);
            this.addChild(hbml);
        }
        var ns = Resource.getRes("create_nl");
        var nsover = Resource.getRes("create_nl_d");
        var xd = Resource.getRes("create_xd");
        var xdover = Resource.getRes("create_d");
        var zf = Resource.getRes("create_zf");
        var zfover = Resource.getRes("create_zf_d");
        var sel = Resource.getRes("create_sel");
        var nsmap = new CJ.Bitmap(ns);
        nsmap.x = 420 - 80;
        nsmap.y = this.height + 10;
        var xdmap = new CJ.Bitmap(xd);
        xdmap.x = nsmap.x + ns.width + 45;
        xdmap.y = this.height + 10;
        var zfmap = new CJ.Bitmap(zf);
        zfmap.x = xdmap.x + ns.width + 45;
        zfmap.y = this.height + 10;
        this.btnheight = ns.height;
        this.btnwidth = ns.width;
        this.btnmap = new CJ.Bitmap(sel);
        this.btnmap.x = xdmap.x - (ns.width / 4.5);
        this.btnmap.y = xdmap.y - (ns.height / 2.6);
        var nsshape = new CJ.Shape();
        nsshape.x = nsmap.x;
        nsshape.y = nsmap.y;
        nsshape.graphics.beginFill("rgba(11,11,15,0.1)").drawRoundRect(0, 0, ns.width, ns.height, 0).endFill();
        var xdshape = new CJ.Shape();
        xdshape.x = xdmap.x;
        xdshape.y = xdmap.y;
        xdshape.graphics.beginFill("rgba(11,11,15,0.1)").drawRoundRect(0, 0, ns.width, ns.height, 0).endFill();
        var zfshape = new CJ.Shape();
        zfshape.x = zfmap.x;
        zfshape.y = zfmap.y;
        zfshape.graphics.beginFill("rgba(11,11,15,0.1)").drawRoundRect(0, 0, ns.width, ns.height, 0).endFill();
        var xds = Resource.getRes("xd");
        var zfs = Resource.getRes("zf");
        var nss = Resource.getRes("nl");
        var xdtitle = new CJ.Bitmap(xds);
        xdtitle.x = this.offsetX + this.width + 60;
        xdtitle.y = 80;
        xdtitle.name = "0";
        var zftitle = new CJ.Bitmap(zfs);
        zftitle.x = this.offsetX + this.width + 60;
        zftitle.y = 80;
        zftitle.name = "2";
        zftitle.visible = false;
        var nstitle = new CJ.Bitmap(nss);
        nstitle.x = this.offsetX + this.width + 60;
        nstitle.y = 80;
        nstitle.name = "1";
        nstitle.visible = false;
        var tgtext = new CJ.Text("体格       20", "12px Arial", "#FF9638");
        tgtext.x = xdtitle.x + 2;
        tgtext.y = xdtitle.y + 50;
        var zztext = new CJ.Text("政治       5", "12px Arial", "#FF9638");
        zztext.x = tgtext.x;
        zztext.y = tgtext.y + 30;
        var mltext = new CJ.Text("魅力       20", "12px Arial", "#FF9638");
        mltext.x = tgtext.x;
        mltext.y = zztext.y + 30;
        var desctext = new CJ.Text("魅力超群，幸运之神眷顾着\n\n你，可以带来更多的好运！", "12px Arial", "#FFFFFF");
        desctext.x = tgtext.x;
        desctext.y = mltext.y + 50;
        xdshape.name = "0";
        nsshape.name = "1";
        zfshape.name = "2";
        nsshape.onClick = this.chooseProfession;
        xdshape.onClick = this.chooseProfession;
        zfshape.onClick = this.chooseProfession;
        var join = Resource.getRes("create_join");
        var joind = Resource.getRes("create_join_d");
        var joinmap = new CJ.Bitmap(join);
        joinmap.x = nsmap.x + 30;
        joinmap.y = xdmap.y + 110;
        joinmap.onClick = function (event) {
            THIS.destroy();
            var progressbar = new ProgressBar("loadBar");
            progressbar.show();
            progressbar.x = (THIS.stage.canvas.width - progressbar.getBarWidth()) / 2;
            progressbar.y = THIS.stage.canvas.height - 150;
            var pf = new Progressframe();
            THIS.stage.addChild(pf);
            THIS.stage.addChild(progressbar);

            Util.loadXml("maps.xml", function (xmlData) {

                Resource.addRes("mapConfig", xmlData);
                var mapID = 1;
                Global.initLoader();
                $(xmlData).find("Maps").each(function () {
                    $(this).find("Map").each(function () {
                        if ($(this).attr("ID") == mapID) {
                            $(this).find("Enemy").each(function () {
                                $(Global.assetsXML).find("enemy").find("asset").each(function () {
                                    Global.manifest.push({ src: "assets/enemy/" + $(this).attr("url"), id: $(this).attr("id") });
                                });
                            })


                            $(this).find("NPC").each(function () {

                                $(Global.assetsXML).find("npc").find("asset").each(function () {
                                    Global.manifest.push({ src: "assets/npc/" + $(this).attr("url"), id: $(this).attr("id") });
                                });
                            })

                        }
                    });
                });
                Global.addToLoaderQueue("toobarbutton", "player", "border", "other", "audio", "magic", "enemy", "tips", "magic", "npc");
                Global.manifest.push({ src: "config/setting.xml", id: "settingConfig" });
                $(Global.assetsXML).find("maps").find("asset").each(function (index) {
                    Global.manifest.push({ src: "assets/maps/" + (index + 1) + "/min.jpg", id: "minMap" + (index + 1) });
                });
                Global.loader.loadManifest(Global.manifest);
                Global.loader.onProgress = function (event) {
                    progressbar.setBar(event.loaded * 100);
                }
                Global.loader.onComplete = function () {

                    var config = Resource.getRes("settingConfig");
                    Global.magicConfig = $(config).find("Magic");

                    //SoundJS.play("music0", SoundJS.INTERRUPT_NONE, 0, 0, 1, 1);
                    progressbar.destory();
                    pf.destory();
                    new MainPanel(mapID).buildingMainPanel();
                    Global.game.sendHello();
                }
            });

        }

        var boy = Resource.getRes("boy");
        var gril = Resource.getRes("girl");
        var boymap = new CJ.Bitmap(boy);
        var grilmap = new CJ.Bitmap(gril);


        var random = Resource.getRes("create_random");
        var randoms = Resource.getRes("create_random_d");
        var namerandommap = new CJ.Bitmap(random);
        namerandommap.x = joinmap.x + join.width + 20;
        namerandommap.y = xdmap.y + 63;
        namerandommap.cache(0, 0, random.width, random.height);
        namerandommap.onPress = function (event) {
            var e = event || window.event;
            document.getElementById("name").value = "张三" + parseInt(Math.random() * 100);
            namerandommap.image = randoms;
            namerandommap.updateCache();
            e.onMouseUp = function () {
                namerandommap.image = random;
                namerandommap.updateCache();
            }
        }
        CJ.Ticker.addListener(THIS.inputel);
        document.getElementById("name").style.display = "";
        THIS.inputel.tick = function () {
            var nameinput = document.getElementById("name");
            var pt = xdmap.localToGlobal(0, 0);
            nameinput.style.left = Math.round(pt.x + THIS.stage.canvas.offsetLeft - ns.width / 2) + "px";
            nameinput.style.top = Math.round(pt.y + THIS.stage.canvas.offsetTop + 70) + "px";
        }
        this.icons.push(xdtitle);
        this.icons.push(zftitle);
        this.icons.push(nstitle);
        this.addChild(THIS.inputel);
        this.addChild(nsmap);
        this.addChild(xdmap);
        this.addChild(zfmap);
        this.addChild(nsshape);
        this.addChild(xdshape);
        this.addChild(zfshape);
        this.addChild(this.btnmap);
        this.addChild(xdtitle);
        this.addChild(zftitle);
        this.addChild(nstitle);
        this.addChild(tgtext);
        this.addChild(zztext);
        this.addChild(mltext);
        this.addChild(desctext);
        this.addChild(joinmap);
        this.addChild(namerandommap);
        var y = 100;
        for (var i = 0; i < 5; i++) {
            if (i % 2 == 0) {
                var cboymap = boymap.clone();
                cboymap.x = 150;
                cboymap.y = y;
                var btext = new CJ.Text("老哥 进入了游戏", "12px Arial", "#FF9638");
                btext.x = cboymap.x + boy.width + 5;
                btext.y = cboymap.y + boy.height / 1.5;
                this.addChild(cboymap);
                this.addChild(btext);
            } else {
                var cgrilmap = grilmap.clone();
                cgrilmap.x = 150;
                cgrilmap.y = y;
                var btext1 = new CJ.Text("老哥 进入了游戏", "12px Arial", "#FFFFFF");
                btext1.x = cgrilmap.x + boy.width + 5;
                btext1.y = cgrilmap.y + boy.height / 1.5;
                this.addChild(cgrilmap);
                this.addChild(btext1);
            }
            y += boy.height + 10;
        }
        this.stage.addChild(this);
    }
    Charactar.prototype.chooseProfession = function (event) {
        var e = event || window.event;
        var targetmap = e.target;
        var professionName = e.target.name;
        if (THIS_.charactar != professionName) {
            THIS_.charactar = professionName;
            for (var i = 0; i < THIS_.icons.length; i++) {
                if (professionName == THIS_.icons[i].name) {
                    THIS_.icons[i].visible = true;
                } else {
                    THIS_.icons[i].visible = false;
                }
            }
            var cbm;
            var tbm;
            for (var i = 0; i < THIS_.charactars.length; i++) {
                var bmobj = THIS_.charactars[i];
                if (professionName == bmobj.name.charAt(0)) {
                    if (THIS_.sex == "gril" && bmobj.name.charAt(2) == "1") {
                        if (bmobj.name.charAt(1) == "0") {
                            cbm = bmobj;
                        } else {
                            tbm = bmobj;
                        }
                        bmobj.visible = true;
                    } else if (THIS_.sex == "boy" && bmobj.name.charAt(2) == "0") {
                        if (bmobj.name.charAt(1) == "0") {
                            cbm = bmobj;
                        } else {
                            tbm = bmobj;
                        }
                        bmobj.visible = true;
                    } else {
                        bmobj.visible = false;
                    }
                } else {
                    bmobj.visible = false;
                }
            }
            if (THIS_.sex == "boy") {
                if (THIS_.getChildIndex(cbm) < THIS_.getChildIndex(tbm)) {
                    THIS_.swapChildren(cbm, tbm);
                }
            } else {
                if (THIS_.getChildIndex(cbm) > THIS_.getChildIndex(tbm)) {
                    THIS_.swapChildren(cbm, tbm);
                }
            }
            THIS_.btnmap.x = targetmap.x - (THIS_.btnwidth / 4.5);
            THIS_.btnmap.y = targetmap.y - (THIS_.btnheight / 2.6);
        }
    }
    Charactar.prototype.chooseCharactar = function (event) {
        THIS_.sex = THIS_.sex == "gril" ? "boy" : "gril";
        var e = event || window.event;
        var bmname = e.target.name.charAt(0) + "01"; //001 010 101 
        var bmlname = e.target.name.charAt(0) + "11";
        var isl = e.target.name.charAt(2) == "0";
        var cbm;
        var cbml;
        var tbm;
        var tbml;
        for (var i = 0; i < THIS_.charactars.length; i++) {
            var bmobj = THIS_.charactars[i];
            if (bmname == bmobj.name) {
                cbm = bmobj;
            } else if (bmlname == bmobj.name) {
                tbm = bmobj;
            }
        }
        var bmlname = cbm.name.substring(0, 2) + "0";
        var tblname = tbm.name.substring(0, 2) + "0";
        for (var i = 0; i < THIS_.charactars.length; i++) {
            var bmobj = THIS_.charactars[i];
            if (bmlname == bmobj.name) {
                cbml = bmobj;
            } else if (tblname == bmobj.name) {
                tbml = bmobj;
            }
        }
        if (isl) {
            cbml.visible = false;
            tbml.visible = false;
            cbm.visible = true;
            tbm.visible = true;
            if (THIS_.getChildIndex(cbm) > THIS_.getChildIndex(tbm)) {
                THIS_.swapChildren(cbm, tbm);
            }
        } else {
            cbml.visible = true;
            tbml.visible = true;
            cbm.visible = false;
            tbm.visible = false;
            if (THIS_.getChildIndex(cbml) < THIS_.getChildIndex(tbml)) {
                THIS_.swapChildren(cbml, tbml);
            }
        }
    }
    Charactar.prototype.hiden = function () {
        document.getElementById("name").style.display = 'none';
        this.visible = false;
    }
    Charactar.prototype.show = function () {
        document.getElementById("name").style.display = '';
        this.visible = true;
    }
    Charactar.prototype.destroy = function () {
        document.getElementById("name").style.display = 'none';
        CJ.Ticker.removeListener(this.inputel);
        this.removeAllChildren();
        this.stage.removeChild(this);
        this.charactars = [];
        this.icons = [];
    }
    return Charactar;
})
    
