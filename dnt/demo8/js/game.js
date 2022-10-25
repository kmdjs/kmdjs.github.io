/// <reference path="lib/easeljs-NEXT.min.js" />

define(['config','gameclient','ui/playerFactory','ui/player','shared/gametypes'],
    function (config,GameClient,PlayerFactory) {

        var Game = Class.extend({
            init: function (app) {
                this.app = app;
                this.app.config = config;


            },

            run: function () {

                var self = this;
                self.connect();
            },

            tick: function () {

                // this.currentTime = new Date().getTime();
                 /*
                if (this.started) {
                    this.updateCursorLogic();
                    this.updater.update();
                    this.renderer.renderFrame();
                }
                */

              
            },

//            start: function () {
//                CJ.Ticker.addListener(this);
//                log.info("Game loop started.");
//            },

            stop: function () {
                log.info("Game stopped.");
                this.isStopped = true;
            },

            connect: function () {
                var self = this,
                    connecting = false; // always in dispatcher mode in the build version
                this.client = new GameClient(this.host, this.port);

                //>>excludeStart("prodHost", pragmas.prodHost);
                var config = this.app.config.local || this.app.config.dev;
                if (config) {
                    this.client.connect(config.dispatcher); // false if the client connects directly to a game server
                    connecting = true;
                }
                //>>excludeEnd("prodHost");

                //>>includeStart("prodHost", pragmas.prodHost);
                if (!connecting) {
                    this.client.connect(true); // always use the dispatcher in production
                }
                //>>includeEnd("prodHost");

                this.client.onDispatched(function (host, port) {
                    log.debug("Dispatched to game server " + host + ":" + port);

                    self.client.host = host;
                    self.client.port = port;
                    self.client.connect(); // connect to actual game server
                });

                //�����������ֳɹ�����ܡ�go����Ĵ�����������helloworld�����û���֤
                this.client.onConnected(function (playerid) {
                    Global.playerID = playerid;
                    //���ֳɹ�������Ϸ
                    log.info("Starting client/server handshake");
                    self.started = true;
                    self.gamestart_callback(playerid);
                });
                this.client.onDespawnEntity(function (playerid) {
                    for (var i = 0; i < Global.players.length; i++) {
                        if (playerid == Global.players[i].id) {
                            CJ.Ticker.removeListener(Global.players[i]);
                            Global.PGCTT.removeChild(Global.players[i]);
                            Global.players.splice(i, 1);
							break;
						}
					}
                });

                //�û���֤ͨ������߼�����
                this.client.onWelcome(function (id, name, x, y, hp) {
                    log.info("Welcome!");
                    //�������������ʱ����
                    self.client.onPopulationChange(function(worldPlayers, totalPlayers) {
                        if(self.nbplayers_callback) {
                            self.nbplayers_callback(worldPlayers, totalPlayers);  //������ҵ�������ҳ���е���ʾ
                        }
                    });

                    //����֤ͨ������������ʼ����
                    if(self.welcome_callback)
                    {
                        self.welcome_callback(id, name, x, y, hp);
                    }

                });
                
                this.client.onOtherPlayers(function (data) {
                	var players = JSON.parse(data);
                	if (players.length) {
                	    for (var i = 0; i < players.length; i++) {
	                		var py = players[i];
	                		var position = new Vector2(py.x, py.y);
	                		PlayerFactory.buildPlayer(py.id,py.id,position);
	                	}
	                } else {
	                	var py = players;
                		var position = new Vector2(py.x, py.y);
                		PlayerFactory.buildPlayer(py.id,py.id,position);
	                }
                });
                
                this.client.onReceiveEffect(function (data) {
                	var effect = JSON.parse(data[0]);
                	var tplayer = null;
                	if (Global.player.id == effect.pi) {
                		tplayer = Global.player;
              } else {
                  for (var i = 0; i < Global.players.length; i++) {
                      if (effect.pi == Global.players[i].id) {
                          tplayer = Global.players[i];
								break;
							}
						}
					} 
                	EffectFactory.emitterEffect(tplayer, effect);
                });

                //��client��ȫ�ֹ��������
                Global.client =  this.client;

            },

            /**
             * Sends a "hello" message to the server, as a way of initiating the player connection handshake.
             * @see GameClient.sendHello
             */
            sendHello: function () {
                this.client.sendHello(Global.playerid_);
            },

            //���ڵ���Ϣ����
            say_group: function(message) {
                this.client.sendChat(message);
            },


            /**
             *
             */
            makeNpcTalk: function (npc) {
                var msg;

                if (npc) {
                    msg = npc.talk();
                    this.previousClickPosition = {};
                    if (msg) {
                        this.createBubble(npc.id, msg);
                        this.assignBubbleTo(npc);
                        this.audioManager.playSound("npc");
                    } else {
                        this.destroyBubble(npc.id);
                        this.audioManager.playSound("npc-end");
                    }
                    this.tryUnlockingAchievement("SMALL_TALK");

                    if (npc.kind === Types.Entities.RICK) {
                        this.tryUnlockingAchievement("RICKROLLD");
                    }
                }
            },

            /**
             * Finds a path to a grid position for the specified character.
             * The path will pass through any entity present in the ignore list.
             */
            //Ϊ�ض���ʵ��Ѱ�ҵ���ĳ���·����·���ᴩ����ignore list �е�ʵ��
            findPath: function(character, x, y, ignoreList) {
                var self = this,
                    grid = this.pathingGrid;
                path = [],
                    isPlayer = (character === this.player);


                if(this.map.isColliding(x, y)) {//���ǵ�ͼ�ϵĲ��ɵ����ʱֱ�ӷ��أ�������Ѱ·����
                    return path;
                }

                if(this.pathfinder && character) {
                    if(ignoreList) {
                        _.each(ignoreList, function(entity) {
                            self.pathfinder.ignoreEntity(entity); //�ŵ�pathfinder��ignored��
                        });
                    }

                    path = this.pathfinder.findPath(grid, character, x, y, false);

                    if(ignoreList) {
                        this.pathfinder.clearIgnoreList();
                    }
                } else {
                    log.error("Error while finding the path to "+x+", "+y+" for "+character.id);
                }
                return path;
            },
            setServerOptions: function(host, port, username) {
                this.host = host;
                this.port = port;
                this.username = username;
            },

            onGameStart: function (callback) {
                this.gamestart_callback = callback;
            },

            onDisconnect: function (callback) {
                this.disconnect_callback = callback;
            },

            onPlayerDeath: function (callback) {
                this.playerdeath_callback = callback;
            },
            onNbPlayersChange: function(callback) {
                this.nbplayers_callback = callback;
            },
            onWelcome: function(callback)
            {
                this.welcome_callback = callback;
            }

        });

        return Game;
    });
