define(['jquery', 'app', 'view/charactar', 'game'], function ($, App, Charactar, Game) {
    var app, game;
    var initApp = function () {
        $(document).ready(function () {
            app = new App();
            //通过modernizr.js检测是否IE
            if (Detect.isWindows()) {
                // Workaround for graphical glitches on text
                $('body').addClass('windows');
            }

            //通过modernizr.js检测是否为Oprea
            if (Detect.isOpera()) {
                // Fix for no pointer events
                $('body').addClass('opera');
            }
            initGame();

        });
    }

    /*
    var testTips = function () {
    var clickBtn = new CJ.Bitmap("js/ui/tips/555.jpg");
    clickBtn.x = Global.stage.canvas.width - 50;
    clickBtn.y = Global.stage.canvas.height - 50 - 100;
    clickBtn.onMouseOver = function (event) {
    tips = new Tips();
    var message = new tips.message();
    message.separate = ": ";
    message.title = { name: '八锡斧钺', value: '+1', nameColor: '#8931C3', valueColor: '#FF6D0D' };
    message.properties.push({ name: '装备部位', value: '军队宝物', special: false, nameColor: '#FFFFFF', valueColor: '#FF6D0D' });
    message.properties.push({ name: '待级要求', value: '1', special: false, nameColor: '#FFFFFF', valueColor: '#FF6D0D' });
    message.properties.push({ name: '战法攻击', value: '6', special: true, nameColor: '#FFFFFF', valueColor: '#FF6D0D' });
    message.content = "将领改造时，改造1个属性点所需消耗全免；作为宝物装备时，增加一定战法攻击。";
    message.contentColor = '#F1F235';
    tips.popup(message);
    }
    clickBtn.onMouseOut = function (event) {
    tips.destroy();
    }
    Global.stage.enableMouseOver();
    Global.stage.addChild(clickBtn);
    }
    */
    //初始化游戏
    var initGame = function () {
        require(['game'], function (Game) {   //引入game.js中定义的Game类
            var canvas = document.getElementById("entities"),         //人物、地图中的动态元素在该层渲染
            //background = document.getElementById("background"),   //屏幕可视区域大小地图的渲染在该层
            //foreground = document.getElementById("foreground"),   //点击事件的处理在该层
            //input = document.getElementById("chatinput");         //游戏玩家的对话输入在该层
            game = new Game(app);
            Global.game = game;                                  //地图、精灵等游戏所需资源的加载
            app.setGame(game);
            //game.start();
            //和后台进行用户验证
            var myDate = new Date()
            var time = myDate.getTime() + "";
            app.start(time);    //目前没有登陆界面
            new Charactar();
            game.onGameStart(function (playerid) {
               // Global.playerid_ = playerid;
              //  new Charactar();
            });
            //玩家验证成功,开始进入游戏
            game.onWelcome(function (id, name, x, y, hp) {
                Global.player.id = id;
                Global.player.name = name;
            });
            game.client.onEntityMove(function (playerId, x, y) {
                var tplayer = null;
                for (var i = 0; i < Global.players.length; i++) {
                    if (playerId == Global.players[i].id) {
                        Global.players[i].currentCell = Global.map.getSmallCellIndex(Global.players[i].position);
                        Global.astar.map[Global.players[i].currentCell.x][Global.players[i].currentCell.y] = 0;                  
                        Global.players[i].path = Global.astar.getPath(Global.players[i].currentCell.x, Global.players[i].currentCell.y, x, y);
                        Global.players[i].path.shift();
                        break;
                    }
                }
                //				if (null != tplayer) {
                //					tplayer.move(direction, new Vector2(x, y), animation);
                //				}
            });
            game.onNbPlayersChange(function (worldPlayers, totalPlayers) {
                //这里可以进行玩家该世界人数的显示

            });
        });
    };

    initApp();
});
