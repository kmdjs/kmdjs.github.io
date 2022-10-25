/// <reference path="res/resource.js" />

var Global = {};

//全局的变量放这里面
function GameMain() {
    var THIS = this;
    THIS.levelUpExp = [400, 1280, 2720, 4800, 7600, 11200, 15680, 21120, 27600, 35200, 44000, 54080, 65520, 78400, 92800, 108800, 126480, 145920, 167200, 190400, 215600, 242880, 272320, 304000, 1000000];
    THIS.canvas = {};
    THIS.stage = {};
    THIS.player = null;
    THIS.playerID = null;
    THIS.transports = [];
    THIS.scene = {};
    //全局的加载器，当需要计算进度的时候，请重新执行THIS.initLoader ，其他情况下直接使用
    THIS.loader = {};
    THIS.manifest = [];
    THIS.fpsLabel = {};
    THIS.assetsXML = {};
    THIS.initSceneCmd = false;
    THIS.initSceneMapID = 0;
    THIS.players = [];
    THIS.resCache = [];
    THIS.enemyArr = [];
    THIS.magicConfig = null;
    //地图之上、菜单之下的容器Playground
    THIS.PGCTT = {};
    THIS.initScenePosition = new Vector2(43, 40);
    THIS.init = function () {
        THIS.canvas = document.getElementById("gameCanvas");
        THIS.stage = new CJ.Stage(THIS.canvas);
        THIS.initLoader();
        Util.loadXml("assets.xml", THIS.configXmlLoaded);

        THIS.messageField = new CJ.Text("加载中", "bold 24px Arial", "#000000");
        THIS.messageField.maxWidth = 1000;
        THIS.messageField.textAlign = "center";
        THIS.messageField.x = THIS.canvas.width / 2;
        THIS.messageField.y = THIS.canvas.height / 2;
        THIS.stage.addChild(THIS.messageField);

        THIS.fpsLabel = new CJ.Text("-- FPS", "bold 24px Arial", "#fff");
        THIS.fpsLabel.x = 940;
        THIS.fpsLabel.y = 20;
        THIS.fpsLabel.alpha = 0.8;
        //性能杀手！
        THIS.stage.enableMouseOver(5);
        THIS.stage.addChild(THIS.fpsLabel);
        CJ.Ticker.setFPS(60);
        CJ.Ticker.useRAF = false;
        CJ.Ticker.addListener(THIS);
    }

    THIS.initLoader = function () {
        THIS.manifest.length = 0;
        THIS.loader = new CJ.PreloadJS();
        //This.loader.onProgress = THIS.handleProgress;
        THIS.loader.onComplete = THIS.handleComplete;
        THIS.loader.onFileLoad = THIS.handleFileLoaded;
        THIS.loader.installPlugin(SoundJS);
    }

    THIS.configXmlLoaded = function (xmlData) {
        THIS.assetsXML = xmlData;
        THIS.addToLoaderQueue("bar", "createCharacter","bg");
    }

    THIS.addToLoaderQueue = function () {

        var l = arguments.length;
        for (var i = 0; i < l; i++) {
            var currentNodeNames = arguments[i];
            $(THIS.assetsXML).find(arguments[i]).find("asset").each(function () {
                THIS.manifest.push({ src: "assets/" + currentNodeNames + "/" + $(this).attr("url"), id: $(this).attr("id") });
                if ($(this).attr("configUrl")) {
                    THIS.manifest.push({ src: "assets/" + currentNodeNames + "/" + $(this).attr("configUrl"), id: $(this).attr("id")+"Config" });
                }
            });
            THIS.loader.loadManifest(THIS.manifest);
            THIS.manifest = [];
        }
    }



    THIS.handleComplete = function () {
        require(["main"]);
        THIS.stage.removeChild(THIS.messageField);
    }

    THIS.handleFileLoaded = function (event) {
        if (event.type !== "sound") {
            Resource.addRes(event.id, event.result);
        }
        THIS.messageField.text = "加载中 " + (THIS.loader.progress * 100 | 0) + "%"
    }

    THIS.getStagePositon = function (obj) {
        return obj.parent.localToGlobal(obj.x, obj.y);
    }

    THIS.stageToWorld = function (stagePosition) {
        return Global.player.position.add(stagePosition.sub(Global.player.getStagePosition()));
    }

    THIS.worldToStage = function (worldPositon) {
        return Global.player.getStagePosition().add(worldPositon.sub(Global.player.position));
    }

    THIS.updataMapData = function () {
        var tempMapData = [];
        for (var i = 0; i < Global.astar.mapBak.length; i++) {
            var tempArr = [];
            for (var j = 0; j < Global.astar.mapBak[i].length; j++) {
                tempArr.push(Global.astar.mapBak[i][j]);
            }
            tempMapData.push(tempArr);
        }
        for (var i = 0; i < Global.enemyArr.length; i++) {
            if (Global.enemyArr[i].HP > 0) {
                tempMapData[Global.enemyArr[i].currentCell.x][Global.enemyArr[i].currentCell.y] = 1;
            }
        }
        //for (var i = 0; i < Global.players.length; i++) {
        //    if (Global.players[i].HP > 0 ) {
        //        tempMapData[Global.players[i].currentCell.x][Global.players[i].currentCell.y] = 1;
        //    }
        //}
        
        Global.astar.map = tempMapData;
    }

    THIS.getPlayerByID = function (id) {
        for (var i = 0; i < Global.players.length; i++) {
            if (Global.players[i].id == id) {
                return Global.players[i];
            }
        }
    }

    THIS.getEnemyByID = function (id) {
        for (var i = 0; i < Global.enemyArr.length; i++) {
            if (Global.enemyArr[i].id == id) {
                return Global.enemyArr[i];
            }
        }
    }

    THIS.tick = function () {

        if (Global.astar) {
            THIS.updataMapData();
        }
        //if (THIS.initSceneCmd) {
        //    THIS.initSceneCmd = false;
        //    THIS.scene.mapID = THIS.initSceneMapID;
        //    THIS.scene.init();
        //     Global.stage.addChild(Global.scene)
        //}
        //计算FPS
        THIS.fpsLabel.text = Math.round(CJ.Ticker.getMeasuredFPS()) + " FPS";
        //设置该对象到最上层
        THIS.stage.addChild(Global.fpsLabel);
        //设置该对象到最上层，和上面代码的效果一样
        //Global.stage.setChildIndex(Global.fpsLabel, Global.stage.getNumChildren() - 1);
        //更新舞台
        THIS.stage.update();


    }
  
}
Global = new GameMain();
Global.init();