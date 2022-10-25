//用浏览器的cookies保存记录
define(function() {

    var Storage = Class.extend({
        init: function() {
        	//当LocalStorage存在并且有存放的数据时加载数据
            if(this.hasLocalStorage() && localStorage.data) {
                this.data = JSON.parse(localStorage.data);
            } else {
                this.resetData();//没有存放过数据时，重置用到的数据为空
            }
        },
    
    	 //重置数据为空
        resetData: function() {
            this.data = {
                hasAlreadyPlayed: false,
                player: {
                    name: "",
                    weapon: "",
                    armor: "",
                    image: ""
                },
                achievements: {
                    unlocked: [],
                    ratCount: 0,
                    skeletonCount: 0,
                    totalKills: 0,
                    totalDmg: 0,
                    totalRevives: 0
                }
            };
        },
    	
    	 //利用Modernizr判断是浏览器当前是否支持localStorage
        hasLocalStorage: function() {
            return Modernizr.localstorage;
        },
    	 
    	 //保存数据
        save: function() {
            if(this.hasLocalStorage()) {
                localStorage.data = JSON.stringify(this.data);//将json数据字符串化存放到localstorage.data中
            }
        },
    	
    	  //清除保存的数据
        clear: function() {
            if(this.hasLocalStorage()) {
                localStorage.data = "";
                this.resetData();
            }
        },
    
        // Player的一些操作
       
        //判断是否已经开始进行游戏
        hasAlreadyPlayed: function() {
            return this.data.hasAlreadyPlayed;
        },
    
    	  //初始化玩家
        initPlayer: function(name) {
            this.data.hasAlreadyPlayed = true;
            this.setPlayerName(name);
        },
        
        //设置玩家名字
        setPlayerName: function(name) {
            this.data.player.name = name;
            this.save();
        },
    
    	 //设置玩家图片
        setPlayerImage: function(img) {
            this.data.player.image = img;
            this.save();
        },
	 
	 //设置防具
        setPlayerArmor: function(armor) {
            this.data.player.armor = armor;
            this.save();
        },
    	 
    	  //设置武器
        setPlayerWeapon: function(weapon) {
            this.data.player.weapon = weapon;
            this.save();
        },
	 
	  //保存玩家信息，图片、防具、武器
        savePlayer: function(img, armor, weapon) {
            this.setPlayerImage(img);
            this.setPlayerArmor(armor);
            this.setPlayerWeapon(weapon);
        },
    
        // Achievements
        //通过任务id判断该任务是否解锁
        hasUnlockedAchievement: function(id) {
            return _.include(this.data.achievements.unlocked, id);
        },
    
        //解锁完成的任务
        unlockAchievement: function(id) {
            if(!this.hasUnlockedAchievement(id)) {
                this.data.achievements.unlocked.push(id);
                this.save();
                return true;
            }
            return false;
        },
    
       //得到完成任务的数量
        getAchievementCount: function() {
            return _.size(this.data.achievements.unlocked);
        },
    
        // Angry rats
        //得到打死老鼠的数量
        getRatCount: function() {
            return this.data.achievements.ratCount;
        },
    	  
    	  //增加老鼠的数量
        incrementRatCount: function() {
            if(this.data.achievements.ratCount < 10) {
                this.data.achievements.ratCount++;
                this.save();
            }
        },
        
        // Skull Collector
        //得到打死的头盖骨收藏者的数量
        getSkeletonCount: function() {
            return this.data.achievements.skeletonCount;
        },

        incrementSkeletonCount: function() {
            if(this.data.achievements.skeletonCount < 10) {
                this.data.achievements.skeletonCount++;
                this.save();
            }
        },
       
        // Meatshield(肉盾)
        //得到伤害总值
        getTotalDamageTaken: function() {
            return this.data.achievements.totalDmg;
        },
       
        //增加伤害值
        addDamage: function(damage) {
            if(this.data.achievements.totalDmg < 5000) {
                this.data.achievements.totalDmg += damage;
                this.save();
            }
        },
        
        // Hunter
        //得到杀死怪物的总数
        getTotalKills: function() {
            return this.data.achievements.totalKills;
        },
        
        //增加杀死怪物总数
        incrementTotalKills: function() {
            if(this.data.achievements.totalKills < 50) {
                this.data.achievements.totalKills++;
                this.save();
            }
        },
    
        // Still Alive
        //得到总的复活数
        getTotalRevives: function() {
            return this.data.achievements.totalRevives;
        },
    
        //增加复活数
        incrementRevives: function() {
            if(this.data.achievements.totalRevives < 5) {
                this.data.achievements.totalRevives++;
                this.save();
            }
        },
    });
    
    return Storage;
});
