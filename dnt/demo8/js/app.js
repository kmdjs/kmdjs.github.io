define(['jquery', 'storage'], function($, Storage) {
    var App = Class.extend({
        init: function() {

        },

        setGame: function(game) {  //设置game的基本属性
            this.game = game;
        },

        /*
        //尝试开始游戏
        tryStartingGame: function(username, starting_callback) {
            var self = this,
                $play = this.$playButton;
            
            if(username !== '') {
                if(!this.ready || !this.canStartGame()) {
                    if(!this.isMobile) {
                        // on desktop and tablets, add a spinner to the play button
                        $play.addClass('loading');//如果是桌面浏览器添加菊花读取动画
                    }
                    this.$playDiv.unbind('click');//play div解除原来的点击事件。防止登陆时发起多次请求到服务器端
                    var watchCanStart = setInterval(function() {
                        log.debug("waiting...");   //控制台打印waiting
                        if(self.canStartGame()) {
                        	//当非手机平台时延迟1500毫秒也就是1.5秒后去除loading样式。
                            setTimeout(function() {
                                if(!self.isMobile) {
                                    $play.removeClass('loading');
                                }
                            }, 1500);
                            clearInterval(watchCanStart);//清除间隔调用
                            self.startGame(username, starting_callback);//开始游戏
                        }
                    }, 100);
                } else {
                    this.$playDiv.unbind('click');
                    this.startGame(username, starting_callback);
                }      
            }
        },
        */

        /*
        startGame: function(username, starting_callback) {
            var self = this;
            
            if(starting_callback) {
                starting_callback();
            }
            
            //进入时隐藏介绍界面
            this.hideIntro(function() {
                if(!self.isDesktop) {
                    // On mobile and tablet we load the map after the player has clicked
                    // on the PLAY button instead of loading it in a web worker.
                    self.game.loadMap();//加载地图资源。初始化数据及其加载图片
                }
                self.start(username); //游戏开始
            });
        },
        */
        
        start: function(username) {
             var self = this
                //firstTimePlaying = !self.storage.hasAlreadyPlayed();//判断是否是第一次玩本游戏，以前从未玩过,这个后期加入了存放再判断
            
            //如果是刚登陆游戏，玩家名称不为空的话进行如下操作

                var optionsSet = false,
                    config = this.config;

                //>>includeStart("devHost", pragmas.devHost);
                if(config.local) {//如果./config/config_local.json存在以它中的host和port为准
                    log.debug("Starting game with local dev config.");
                    this.game.setServerOptions(config.local.host, config.local.port, username);
                } else {//如果./config/config_local.json不存在以./config/config_dev.json中的配置为准
                    log.debug("Starting game with default dev config.");
                    this.game.setServerOptions(config.dev.host, config.dev.port, username);
                }
                optionsSet = true;
                //>>includeEnd("devHost");
                
                //>>includeStart("prodHost", pragmas.prodHost);
                //
                if(!optionsSet) {//从./config/config_build.json中读取配置
                    log.debug("Starting game with build config.");
                    this.game.setServerOptions(config.build.host, config.build.port, username);
                }
                //>>includeEnd("prodHost");

                this.game.run();

        },
        //当验证通过后进入下面的环节
        welcomeGame: function(callback){
             this.game.onWelcome(callback);

        }


    });

    return App; //让App其他js文件可见
});