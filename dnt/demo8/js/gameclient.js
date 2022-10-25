define(['lib/bison', 'entityfactory', 'ui/playerFactory', 'ui/Enemy', 'ui/Magic/MagicFactory', 'ui/item'], function (BISON, EntityFactory, PlayerFactory, Enemy, MagicFactory, Item) {


    var cango = false;

    var GameClient = Class.extend({
        init:function (host, port) {
            this.connection = null;
            this.host = host;
            this.port = port;

            this.connected_callback = null;
            this.spawn_callback = null;
            this.movement_callback = null;

            //下面是游戏中用到action的相关处理
            this.handlers = [];

            this.handlers[Types.Messages.HELLO] = null;
            this.handlers[Types.Messages.WELCOME] = this.receiveWelcome;
            this.handlers[Types.Messages.SPAWN] = this.receiveSpawn;
            this.handlers[Types.Messages.DESPAWN] = this.receiveDespawn;
            this.handlers[Types.Messages.MOVE] = this.receiveMove;
            this.handlers[Types.Messages.LOOTMOVE] = this.receiveLootMove;
            this.handlers[Types.Messages.AGGRO] = null;
            this.handlers[Types.Messages.ATTACK] = this.receiveAttack;
            this.handlers[Types.Messages.HIT] = null;
            this.handlers[Types.Messages.HURT] = null;
            this.handlers[Types.Messages.HEALTH] = this.receiveHealth;
            this.handlers[Types.Messages.CHAT] = this.receiveChat;     //这里不用区分聊天的范围，范围在服务器端控制
            this.handlers[Types.Messages.LOOT] = null;
            this.handlers[Types.Messages.EQUIP] = this.receiveEquipItem;
            this.handlers[Types.Messages.DROP] = this.receiveDrop;
            this.handlers[Types.Messages.TELEPORT] = this.receiveTeleport;
            this.handlers[Types.Messages.DAMAGE] = this.receiveDamage;
            this.handlers[Types.Messages.POPULATION] = this.receivePopulation;
            this.handlers[Types.Messages.KILL] = this.receiveKill;
            this.handlers[Types.Messages.LIST] = this.receiveList;
            this.handlers[Types.Messages.WHO] = null;
            this.handlers[Types.Messages.ZONE] = null;
            this.handlers[Types.Messages.DESTROY] = this.receiveDestroy;
            this.handlers[Types.Messages.HP] = this.receiveHitPoints;
            this.handlers[Types.Messages.BLINK] = this.receiveBlink;
            this.handlers[Types.Messages.OPEN] = null;
            this.handlers[Types.Messages.CHECK] = null;
            this.handlers[Types.Messages.OTHERPLAYERS] = this.receiveOtherPlayers;
            this.handlers[Types.Messages.EFFECT] = this.receiveEffect;
            this.handlers[Types.Messages.SPAWNENEMY] = this.receiveSPAWNEnemy;
            this.handlers[Types.Messages.EnemyMove] = this.receiveEnemyMove;
            this.handlers[Types.Messages.EnemyTarget] = this.receiveEnemyTarget;
            this.handlers[Types.Messages.MagicShow] = this.receiveMagicShow;
            this.handlers[Types.Messages.SubEnemyHP] = this.receiveSubEnemyHP;
            this.handlers[Types.Messages.ChangeMap] = this.receiveChangeMap;

            this.useBison = false;   //使用BISON把json串进行压缩处理，上线后可以设置为true
            this.enable();


            this.preEnemyTargetPlayerID = -1;
            this.preEnemyTargetEnemyID = -1;
        },

        //开始监听
        enable:function () {
            this.isListening = true;
        },

        //停止监听
        disable:function () {
            this.isListening = false;
        },

        //连接
        connect:function (dispatcherMode) {

            //使用socket协议进行传输
            var url = "http://" + this.host + ":" + this.port + "/", //url = "ws://"+ this.host +":"+ this.port +"/",
                self = this;  //保存当前引用对象

            log.info("Trying to connect to server : " + url);
            //判断是否是否支持MozWebSocket

            /*
             if(window.MozWebSocket) {
             this.connection = new MozWebSocket(url);
             } else {
             this.connection = new WebSocket(url);
             }
             */
            //this.connection = new WebSocket(url);
            //this.connection = io.connect(url); socketio
           // this.connection = io.connect(url, { rememberTransport:false, timeout:1500 });
            //var socket = new io.Socket(null,{port:8082,rememberTransport:true,timeout:1500});
            //socket.connect();

          
        },

        //向服务器发送消息
        sendMessage:function (json) {
            log.info("in sendMessage!");
            var data;

            //const unsigned short CONNECTING = 0;
            //const unsigned short OPEN = 1;
            //const unsigned short CLOSING = 2;
            //const unsigned short CLOSED = 3;
            //if(this.connection.readyState === 1) {
            if (cango == true) {
                if (this.useBison) {
                    /**
                     *BiSON is size optimized binary encoding for JavaScript objects, it was
                     *designed for real time web games and other applications that might be
                     *bandwidth limited.
                     */
                    data = BISON.encode(json);  //把json压缩后传输节省带宽
                } else {
                    data = JSON.stringify(json);   //如果没有使用BISON就简单的把josn字符化，现在用stringify是为了好调试
                }
                log.info("send data=" + data);
                this.connection.send(data);
            }
        },

        //接收服务器端发来的消息
        receiveMessage:function (message) {
            var data, action;
            log.info("wwwwwwwww=======" + message);
            if (this.isListening) {
                //判断是使用BISON
                if (this.useBison) {
                    data = BISON.decode(message); 	//当使用BISON时进行解压
                } else {
                    data = JSON.parse(message); 	//JSON化message
                }
                log.debug("data: " + message);
                if (data instanceof Array) {
                    //判断当前是否接收多个action
                    if (data[0] instanceof Array) {
                        // Multiple actions received
                        this.receiveActionBatch(data);
                    } else {
                        // Only one action received
                        //当只接收一个action时
                        this.receiveAction(data);
                    }
                }
            }
        },

        //接收action
        receiveAction:function (data) {
            var action = data[0];       //判断action的类型
            //当该js中定义了相应的action的处理方法时调用相应的处理方法进行处理
            if (this.handlers[action] && _.isFunction(this.handlers[action])) {
                this.handlers[action].call(this, data);
            }
            else {
                //不存在相应的处理方法时打印错误日志到前台
                log.error("Unknown action : " + action);
            }
        },

        //接收的是action群时
        receiveActionBatch:function (actions) {
            var self = this;
            //遍历actions进行单个action的方法调用
            _.each(actions, function (action) {
                self.receiveAction(action);
            });
        },

        //接受服务器的welcome时
        receiveWelcome:function (data) {
            var id = data[1], //玩家的id
                name = data[2], //玩家的名字
                x = data[3], //玩家的x坐标
                y = data[4], //玩家的y坐标
                hp = data[5]; 	//玩家的hp值

            if (this.welcome_callback) {
                this.welcome_callback(id, name, x, y, hp);
            }
        },

        //接收服务器端的移动消息经行相应的处理
        receiveMove:function (data) {
            var id = data[1], //人物id
                x = data[2], //坐标x
                y = data[3];    //坐标y
            if (this.move_callback) {
                this.move_callback(id, x, y);
            }
        },

        //接收服务器端抢夺宝物移动信息及其相应的处理
        receiveLootMove:function (data) {
            var id = data[1], //人物id
                item = data[2];  //宝物

            if (this.lootmove_callback) {
                this.lootmove_callback(id, item);
            }
        },
        //接收服务器端的攻击消息及其相应的处理
        receiveAttack:function (data) {
            var attacker = data[1], //攻击者
                target = data[2];     	//被攻击的目标

            if (this.attack_callback) {
                this.attack_callback(attacker, target);
            }
        },

        //接受服务器端发送的孵化消息
        receiveSpawn:function (data) {
            var id = data[1], //id
                kind = data[2], //种类，如怪物中的rat，比type精确
                x = data[3], //x坐标
                y = data[4]; 		//y坐标

            //前面的物品孵化先省略,如果是玩家或者怪物的话
            var name, //名字
                orientation; 				//朝向

            //如果种类是玩家的话
            if (Types.isPlayer(kind)) {
                name = data[5]; 		//得到名字
                orientation = data[6]; 	//得到朝向
            }
            log.info("x=" + x);
            log.info("y=" + y);
            var position = new Vector2(x, y)
            //var character = EntityFactory.createEntity(kind, id, name,position);		//创建实体
            //Global.playerFrame.addPlayer(character);
            PlayerFactory.buildPlayer(id, name, position);
        },

        //接收使其消失的消息进行处理
        receiveDespawn:function (data) {
            var id = data[1];   //让其消失的人物id

            if (this.despawn_callback) {
                this.despawn_callback(id);
            }
        },

        //接收血值的消息进行处理
        receiveHealth:function (data) {
            var points = data[1],
                isRegen = false;

            if (data[2]) {
                isRegen = true;
            }

            if (this.health_callback) {
                this.health_callback(points, isRegen);
            }
        },

        //接收聊天信息进行处理,这里使按组进行接收（默认）
        receiveChat:function (data) {
            var id = data[1],
                text = data[2],
                name = data[3]; //用户名,显示在聊天中
            if (this.chat_callback) {
                this.chat_callback(id, text, name);
            }
        },

        //接收装备某个装备的消息进行处理
        receiveEquipItem:function (data) {
            var id = data[1],
                itemKind = data[2];

            if (this.equip_callback) {
                this.equip_callback(id, itemKind);
            }
        },


        //接收瞬间转移的消息进行处理
        receiveTeleport:function (data) {
            var id = data[1],
                x = data[2],
                y = data[3];

            if (this.teleport_callback) {
                this.teleport_callback(id, x, y);
            }
        },

        //接收收到伤害的消息进行处理
        receiveDamage:function (data) {
            var id = data[1],
                dmg = data[2];

            if (this.dmg_callback) {
                this.dmg_callback(id, dmg);
            }
        },

        //接收人口信息
        receivePopulation:function (data) {
            var worldPlayers = data[1],
                totalPlayers = data[2];

            if (this.population_callback) {
                this.population_callback(worldPlayers, totalPlayers);
            }
        },

        //接收杀死怪物的信息
        receiveKill:function (data) {
            var mobKind = data[1];

            if (this.kill_callback) {
                this.kill_callback(mobKind);
            }
        },

        //在游戏开始时服务器端会初始化玩家所在范围内用到的所有的实物，并将所有实物的id以list的形式返回给客户端
        receiveList:function (data) {
            data.shift();

            if (this.list_callback) {
                this.list_callback(data);
            }
        },
        receiveOtherPlayers:function (data) {
            data.shift();

            if (this.otherPlayers_callback) {
                this.otherPlayers_callback(data);
            }
        },
        receiveEffect:function (data) {
            data.shift();

            if (this.onReceiveEffect) {
                this.onReceiveEffect_callback(data);
            }
        },

        //接收销毁的消息
        receiveDestroy:function (data) {
            var id = data[1];

            if (this.destroy_callback) {
                this.destroy_callback(id);
            }
        },


        //接收更改玩家所剩血值的方法
        receiveHitPoints:function (data) {
            var maxHp = data[1];

            if (this.hp_callback) {
                this.hp_callback(maxHp);
            }
        },

        //接收闪烁的消息并进行相应的处理
        receiveBlink:function (data) {
            var id = data[1];

            if (this.blink_callback) {
                this.blink_callback(id);
            }
        },

        //当调度时（暂时无用）
        onDispatched:function (callback) {
            this.dispatched_callback = callback;
        },

        //当连接到服务器时
        onConnected:function (callback) {
            this.connected_callback = callback;
        },
        //当断开服务器时
        onDisconnected:function (callback) {
            this.disconnected_callback = callback;
        },

        //当接收到服务器的welcome时
        onWelcome:function (callback) {
            this.welcome_callback = callback;
        },

        //当孵化角色时
        onSpawnCharacter:function (callback) {
            this.spawn_character_callback = callback;
        },

        //当孵化物体时
        onSpawnItem:function (callback) {
            this.spawn_item_callback = callback;
        },

        //当孵化宝物时
        onSpawnChest:function (callback) {
            this.spawn_chest_callback = callback;
        },

        //当孵化实物时
        onDespawnEntity:function (callback) {
            this.despawn_callback = callback;
        },

        //当实物移动时
        onEntityMove:function (callback) {
            this.move_callback = callback;
        },

        //当实物攻击时
        onEntityAttack:function (callback) {
            this.attack_callback = callback;
        },

        //当玩家改变血血值时
        onPlayerChangeHealth:function (callback) {
            this.health_callback = callback;
        },

        //当玩家装备某件物品时
        onPlayerEquipItem:function (callback) {
            this.equip_callback = callback;
        },

        //单玩家向某个
        onPlayerMoveToItem:function (callback) {
            this.lootmove_callback = callback;
        },

        //当用户瞬间转移时
        onPlayerTeleport:function (callback) {
            this.teleport_callback = callback;
        },

        //接收到消息时，生成气泡和播放气泡声音
        onChatMessage:function (callback) {
            this.chat_callback = callback;
        },

        //当怪物掉落设备时
        onDropItem:function (callback) {
            this.drop_callback = callback;
        },

        //当玩家伤害怪物的时候
        onPlayerDamageMob:function (callback) {
            this.dmg_callback = callback;
        },

        //当玩家杀死怪物的时候
        onPlayerKillMob:function (callback) {
            this.kill_callback = callback;
        },

        //当人口数改变的时候
        onPopulationChange:function (callback) {
            this.population_callback = callback;
        },

        //当接收到实体的list时（服务端发送给客户端要孵化的怪物的列表）
        onEntityList:function (callback) {
            this.list_callback = callback;
        },

        onOtherPlayers:function (callback) {
            this.otherPlayers_callback = callback;
        },

        onReceiveEffect:function (callback) {
            this.onReceiveEffect_callback = callback;
        },

        //当实体销毁的时候
        onEntityDestroy:function (callback) {
            this.destroy_callback = callback;
        },

        //当玩家更改血值的时候
        onPlayerChangeMaxHitPoints:function (callback) {
            this.hp_callback = callback;
        },

        //当实物闪烁的时候
        onItemBlink:function (callback) {
            this.blink_callback = callback;
        },

        //和服务器端的第一次消息通信
        sendHello:function (name) {
            this.sendMessage([Types.Messages.HELLO,
                name
            ]);
        },

        //向服务器端发送移动
        sendMove:function (x, y, direction, anim) {
            this.sendMessage([Types.Messages.MOVE,
                Global.player.id,
                Global.player.endCellPositon.x, Global.player.endCellPositon.y]);
        },


        //向服务器端发送抢夺宝物的移动
        sendLootMove:function (item, x, y) {
            this.sendMessage([Types.Messages.LOOTMOVE,
                x,
                y,
                item.id]);
        },

        sendEffect:function (effect) {
            this.sendMessage([Types.Messages.EFFECT,
                Global.player.id,
                JSON.stringify(effect)]);
        },

        //发送消息到怪物，让怪物对玩家发起攻击（这个是当怪物的定义为侵略性的，并且玩家到达了怪物的攻击范围内发送的消息通知服务器让怪物攻击人类）
        sendAggro:function (mob) {
            this.sendMessage([Types.Messages.AGGRO,
                mob.id]);
        },

        //发送被怪物攻击的消息
        sendAttack:function (mob) {
            this.sendMessage([Types.Messages.ATTACK,
                mob.id]);
        },

        //发送攻击到怪物的消息
        sendHit:function (mob) {
            this.sendMessage([Types.Messages.HIT,
                mob.id]);
        },

        //发送受伤害的消息
        sendHurt:function (mob) {
            this.sendMessage([Types.Messages.HURT,
                mob.id]);
        },

        //发送聊天的消息
        sendChat:function (text) {
            this.sendMessage([Types.Messages.CHAT,
                Global.player.id,
                text]);
        },

        //发送掠夺消息
        sendLoot:function (item) {
            this.sendMessage([Types.Messages.LOOT,
                item.id]);
        },

        //瞬间转移的消息
        sendTeleport:function (x, y) {
            this.sendMessage([Types.Messages.TELEPORT,
                Global.player.id,
                x,
                y]);
        },

        //握手成功后发送给 服务器
        sendWho:function (ids) {
            ids.unshift(Types.Messages.WHO);
            this.sendMessage(ids);
        },

        //检测玩家所在zone的消息
        sendZone:function () {
            this.sendMessage([Types.Messages.ZONE]);
        },

        //打开宝箱的消息
        sendOpen:function (chest) {
            this.sendMessage([Types.Messages.OPEN,
                chest.id]);
        },

        sendSpawnEnemy:function () {
            this.sendMessage([Types.Messages.SPAWNENEMY, Global.player.id, Global.player.currentCell.x, Global.player.currentCell.y, Global.map.id]);
        },
        sendMagicShow:function (magicName, end, targetID) {
            if (targetID) {
                this.sendMessage([Types.Messages.MagicShow, Global.player.id, magicName, end.x, end.y, targetID]);
            } else {
                this.sendMessage([Types.Messages.MagicShow, Global.player.id, magicName, end.x, end.y]);
            }
        },
        receiveMagicShow:function (data) {

            var player = Global.getPlayerByID(data[1]);

            if (data[5]) {
                var enemy = Global.getEnemyByID(data[5]);
                player.target = enemy;
            }

            player.path.length = 0;
            //如果有目标，则身体朝向目标所在位置

            var begin = new Vector2(player.position.x, player.position.y - player.centerHeight);
            player.r = MathHelp.getRotation(begin, new Vector2(data[3], data[4]));
            player.setDirByR();

            if (player.bmpAnim.currentAnimation.indexOf('magicAttack' + player.getFrameName()) === -1) {
                player.bmpAnim.gotoAndPlay('magicAttack' + player.getFrameName());
                player.bmpAnim.onAnimationEnd = function () {
                    SoundJS.play("magic", SoundJS.INTERRUPT_ANY);
                    this.onAnimationEnd = null;
                    if (this.currentAnimation.indexOf('magicAttack') !== -1) {
                        MagicFactory.create(player, data[2], begin, new Vector2(data[3], data[4]));
                    }
                    player.stand();
                };
            }
        },
   
        sendEnemyMove:function (enemyID, x, y) {
            this.sendMessage([Types.Messages.EnemyMove, Global.player.id, Global.map.id, enemyID, x, y]);
        },
        receiveEnemyMove:function (data) {
            for (var i = 0; i < Global.enemyArr.length; i++) {
                if (Global.enemyArr[i].id == data[1]) {
                    Global.enemyArr[i].targetCell = new Vector2(data[2], data[3]);
                    Global.enemyArr[i].setDirection(Global.enemyArr[i].targetCell);
                }
            }
        },
        receiveSPAWNEnemy:function (data) {
            for (var i = 0; i < data[1].length; i++) {
                var kind = data[1][i].kind;
                var mapID = data[1][i].mapID;
                var info = Resource.getEnemyData(mapID, kind);
                var enemy = new Enemy(data[1][i].id, kind, Global.map.getPositionBySmallCellIndex(new Vector2(data[1][i].x, data[1][i].y)), data[1][i].HP, info.HP, info.MP, info.EXP, info.Speed, info.AwakeScope, info.SleepScope);

                //                if (data[1][i].dirFrame) {

                //                    alert(data[1][i].dirFrame)
                //                }
                enemy.targetID = data[1][i].targetID;
                Global.PGCTT.addChild(enemy);
                CJ.Ticker.addListener(enemy);
                //                if (data[1][i].targetID) {

                //                    var palyer = Global.getPlayerByID(data[1][i].targetID)
                //                    alert(palyer)
                //                    enemy.target = palyer;
                //                }
            }
        },
        receiveEnemyTarget:function (data) {
            var player, enemy;
            for (var i = 0; i < Global.players.length; i++) {
                if (Global.players[i].id == data[1]) {
                    player = Global.players[i];

                }
            }
            for (var i = 0; i < Global.enemyArr.length; i++) {
                if (Global.enemyArr[i].id == data[2]) {
                    enemy = Global.enemyArr[i];

                }
            }
            if (player && enemy) enemy.target = player;
        },

        sendEnemyTarget:function (playerID, enemyID) {
            if (this.preEnemyTargetPlayerID != playerID || this.preEnemyTargetEnemyID != enemyID) {
                this.sendMessage([Types.Messages.EnemyTarget, playerID, enemyID]);
                this.preEnemyTargetPlayerID = playerID;
                this.preEnemyTargetEnemyID = enemyID;
            }
        },
        receiveDrop:function (data) {
            var bitmap = "";
            var enemy = "";
            for (var i = 0; i < Global.enemyArr.length; i++) {
                if (Global.enemyArr[i].id == data[2]) {
                    enemy = Global.enemyArr[i];
                    var x = enemy.position.x;
                    var y = enemy.position.y;
                    var bitmap;
                    if (bitmap) {
                        bitmap = bitmap.clone();
                    } else {
                        bitmap = new CJ.Bitmap(Resource.getRes("fazhang"));
                    }
                    bitmap.scaleX = bitmap.scaleY = .1;
                    var item = new Item(data[1].id, "神器啊", "#ffffff", new Vector2(x, y), bitmap);
                    CJ.Ticker.addListener(item);
                    Global.PGCTT.addChild(item);
                }
            }

        }
    });

    return GameClient;
});