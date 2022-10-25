function Util() {

    var THIS = this;

    //#region Events:

    //Main:
    THIS.GOTO_LOBBY = "EVT_GOTO_LOBBY";
    THIS.GOTO_ACHIEVEMENTS = "EVT_GOTO_ACHIEVEMENTS";
    THIS.GOTO_INVITE = "EVT_GOTO_INVITE";
    THIS.GOTO_SHOP = "EVT_GOTO_SHOP";
    THIS.GOTO_WORLD = "EVT_GOTO_WORLD";
    THIS.VIEW_POPUPS = "EVT_VIEW_POPUPS";
    THIS.GOTO_GAME = "EVT_GOTO_GAME";
    THIS.GOTO_LOGIN = "EVT_GOTO_LOGIN";
    THIS.GOTO_INVITES = "EVT_GOTO_INVITES";
    THIS.SAVE_INVITES = "EVT_SAVE_INVITES";
    THIS.LOADING_START = "EVT_LOADING_START";
    THIS.LOADING_COMPLETE = "EVT_LOADING_COMPLETE";
    THIS.UPDATE_XP_BAR = "EVT_UPDATE_XP_BAR";
    THIS.PRODUCT_BOUGHT = "EVT_PRODUCT_BOUGHT";
    THIS.CLAIM = "EVT_CLAIM";
    //GameRound:
    THIS.GAME_ROUND = "GAME_ROUND";
    THIS.KILL_SCORE_CLIP = THIS.GAME_ROUND + ".KILL_SCORE_CLIP";
    //Lobby:
    THIS.LOBBY = "LOBBY";
    //WorldScreen:
    THIS.WORLD_SCREEN = "WORLD_SCREEN";

    // worlds:
    THIS.LOOPY_FRUITS = 1;
    THIS.NOT_SO_WILD_WEST = 2;
    THIS.NOAHS_SPEEDBOAT = 3;
    THIS.SHOPPING_TIME = 4;
    THIS.ASIAN_STYLE = 5;
    THIS.LAZY_SUNDAY = 6;
    THIS.EGYPTIAN_OLDIES = 7;

    //#endregion

    //#region States:
    THIS.GAME = "STATE_GAME";
    THIS.LOBBY = "STATE_LOBBY";
    THIS.WORLD = "STATE_WORLD";
    THIS.POPUP = "STATE_POPUP";
    //#endregion

    //MessageCodes:
    THIS.MESSAGE_INVITES = 1;
    THIS.MESSAGE_MEDALS_WON = 2;

    THIS.INVITE_TOKENS_PRIZE = 10;
    THIS.TOKENS_PER_CLAIM = 2;
    THIS.LEVEL_UP_TOKENS_PRIZE = 5;

    THIS.QUEUE_TWEEN_TIME = 0.65;
    THIS.WRONG_TIME = 0.65;

    THIS.actionPagesUrl = "http://cashkinggame.com/matchking/actionPages/";
    THIS.KEYCODE_SPACE = 32; 	//usefull keycode
    THIS.KEYCODE_LEFT = 37; 	//usefull keycode
    THIS.KEYCODE_RIGHT = 39; 	//usefull keycode
    THIS.ICON_WIDTH = 150;
    THIS.SCORE_TO_XP = 0.0065;
    THIS.ASSETS_SMALL = "small_";
    THIS.GENERAL_FONT1 = "18px Bowlby One SC";
    THIS.GENERAL_FONT_FAMILY = 'Bowlby One SC';
    THIS.EXP_BAR_TWEEN_TIME = 1250;
    THIS.WORLD_INIT_ICONS = 4;
    THIS.worldsXml = null;
    THIS.screensXml = null;
    THIS.achievementsXml = null;
    THIS.userData = null;
    THIS.currentWorld = null;
    THIS.curWorldAllTime = null;
    THIS.curWorldWeekly = null;

    THIS.levelsExperience = [0, 500, 750, 1000, 1500, 1750, 2000, 2250, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300, 4400, 4500, 4600, 4700, 4800];

    THIS.lobbyWorldsOrder = [1, 3, 2, 4, 5, 6, 7];

    //#region Sounds:
    THIS.SOUND_PATH = "assets/sounds/";
    THIS.soundFileType = null;
    THIS.getSoundsArray = function () {
        var soundsArray =
        [{ name: "bomb", src: THIS.SOUND_PATH + "Game-Shot" + THIS.getSoundType(), instances: 1 },
		{ name: "clock", src: THIS.SOUND_PATH + "GU-StealDaisy" + THIS.getSoundType(), instances: 1 },
        ];
        return soundsArray;
    }

    THIS.getSoundType = function () {
        if (THIS.soundFileType == null) {
            agent = navigator.userAgent.toLowerCase();
            // adjust for browser
            if (agent.indexOf("chrome") > -1) {
                THIS.soundFileType = ".mp3";
            } else if (agent.indexOf("opera") > -1) {
                THIS.soundFileType = ".ogg";
            } else if (agent.indexOf("firefox") > -1) {
                THIS.soundFileType = ".ogg";
            } else if (agent.indexOf("safari") > -1) {
                THIS.soundFileType = ".mp3";
            } else if (agent.indexOf("msie") > -1) {
                THIS.soundFileType = ".mp3";
            }
        }
        return THIS.soundFileType;
    }


    //#endRegion Sounds


    THIS.getExpLevelData = function (totalExperience) {
        var result = {};
        var expCount = 0;
        for (var i = 0; i < THIS.levelsExperience.length; i++) {

            if (expCount + THIS.levelsExperience[i] > totalExperience) {
                result.level = i;
                result.goal = THIS.levelsExperience[i];
                result.expThisLevel = totalExperience - expCount;
                return result;
            }

            expCount += THIS.levelsExperience[i];

        }
        trace("Util.getExpLevelData Error - level not found");

    }
    THIS.getScreenUrls = function () {
        var urlsArray = [];
        $(THIS.screensXml).find("asset").each(function () {
            urlsArray.push(THIS.getScreensUrlPrefix() + $(this).attr("url"));
        });
        return urlsArray;
    }

    THIS.getInitAssetsUrls = function () {
        var urlsArray = [];
        urlsArray.push(THIS.getScreensUrlPrefix() + "mainLoading_bg.png");
        urlsArray.push(THIS.getScreensUrlPrefix() + "mainLoading_logo.png");
        urlsArray.push(THIS.getWorldUrlPrefix(1) + "w1_icon1.png");
        urlsArray.push(THIS.getWorldUrlPrefix(2) + "w2_icon1.png");
        urlsArray.push(THIS.getWorldUrlPrefix(3) + "w3_icon1.png");
        urlsArray.push(THIS.getWorldUrlPrefix(4) + "w4_icon1.png");
        urlsArray.push(THIS.getWorldUrlPrefix(5) + "w5_icon1.png");
        urlsArray.push(THIS.getWorldUrlPrefix(6) + "w6_icon1.png");
        urlsArray.push(THIS.getWorldUrlPrefix(7) + "w7_icon1.png");
        //login popup
        urlsArray.push(THIS.getScreensUrlPrefix() + "pop_login_top.png");
        urlsArray.push(THIS.getScreensUrlPrefix() + "pop_btn_login.png");
        urlsArray.push(THIS.getScreensUrlPrefix() + "pop_window_base.png");
        return urlsArray;

    }

    THIS.getWorldsLobbyUrls = function () {
        var worldUrls = [];
        var prefix;
        $(THIS.worldsXml).find("world").each(function () {
            worldId = $(this).attr("worldId");
            prefix = THIS.getWorldUrlPrefix(worldId);
            worldUrls.push(prefix + $(this).find("lobbyBg").attr("url"));
            worldUrls.push(prefix + $(this).find("logo").attr("url"));
            // taking first icon - need to change if we use diff image per unlocked.
            worldUrls.push(util.getWorldIconUrls(worldId)[0].replace(".png", "_lobby.png"));
        });
        return worldUrls;

    }

    THIS.getWorldIconUrls = function (worldId) {
        var urlsArray = [];
        $(THIS.worldsXml).find("world").each(function () {
            if (worldId == $(this).attr("worldId")) {
                $(this).find("icon").each(function () {
                    urlsArray.push(THIS.getWorldUrlPrefix(worldId) + $(this).attr("url"));
                });
            }
        });
        return urlsArray;
    }

    THIS.getWorldById = function (worldId) {
        var worldData;
        $(THIS.worldsXml).find("world").each(function () {
            if (worldId == $(this).attr("worldId")) {
                worldData = this;
            }
        });
        return worldData;
    }

    THIS.getWorldUrlPrefix = function (worldId) {
        return ("assets/worlds/world" + worldId + "/" + mgMain.assetsType);
    }

    THIS.getScreensUrlPrefix = function () {
        return "assets/screens/" + mgMain.assetsType;
    }

    THIS.getWorldColors = function (worldId) {
        var colors;
        $(THIS.worldsXml).find("world").each(function () {
            if (worldId == $(this).attr("worldId")) {
                colors = { "frameColor": $(this).attr("frameColor"), "color": $(this).attr("color") };
            }
        });
        return colors;
    }

    THIS.getWorldLogo = function (worldId) {
        var logo;
        $(THIS.worldsXml).find("world").each(function () {
            if (worldId == $(this).attr("worldId")) {
                logo = new Bitmap(THIS.getWorldUrlPrefix(worldId) + $(this).find("logo").attr("url"));
            }
        });
        return logo;
    }

    THIS.getWorldBgUrl = function (worldId) {
        var bgUrl;
        $(THIS.worldsXml).find("world").each(function () {
            if (worldId == $(this).attr("worldId")) {
                bgUrl = THIS.getWorldUrlPrefix(worldId) + $(this).find("worldBg").attr("url");
            }
        });
        return bgUrl;
    }

    THIS.getNumWorlds = function () {
        return $(THIS.worldsXml).find("world").length;
    }

    THIS.getWorldTokensPrice = function (worldId) {
        var price;
        $(THIS.worldsXml).find("world").each(function () {
            if (worldId == $(this).attr("worldId")) {
                price = $(this).find("tokensPrice").attr("price");
            }
        });
        return Number(price);
    }


    THIS.getAchievementUrls = function () {
        var urlsArray = [];
        $(THIS.achievementsXml).find("achievement").each(function () {
            urlsArray.push("assets/achievements/" + mgMain.assetsType + $(this).attr("url"));
        });
        return urlsArray;
    }


    THIS.getAchievementsArray = function () {
        var array = [];
        var item;
        $(THIS.achievementsXml).find("achievement").each(function () {
            item = {};
            $.each(this.attributes, function (i, attrib) {
                item[attrib.name] = attrib.value;
            });
            array.push(item);
        });
        return array;
    }

    THIS.getLevelData = function (worldId, level) {
        var levelData;
        $(THIS.worldsXml).find("world").each(function () {
            if (worldId == $(this).attr("worldId")) {
                levelData = $(this).find("level")[level];
            }
        });
        return levelData;
    }

    THIS.calcUnlockedIcons = function (worldId, saveToUserData) {
        var pairs = -1;
        worldId = Number(worldId);
        for (var i = 0; i < THIS.userData.worlds.length; i++) {
            if (THIS.userData.worlds[i].worldId == worldId) {
                pairs = THIS.userData.worlds[i].pairs;
                break;
            }
        }
        if (pairs == -1)
            return -1;
        var pairsForNext = 0;
        var unlockedNum = 0;
        var totalIcons = THIS.getWorldIconUrls(worldId).length;
        // trace("calcUnlockedIcons " + pairs + "total Icons avail.:" + totalIcons);
        if (pairs >= 150 * (1 + worldId * 0.2))
            unlockedNum++;
        else
            pairsForNext = 150 * (1 + worldId * 0.2) - pairs;
        if (pairs >= 700 * (1 + worldId * 0.2))
            unlockedNum++;
        else
            pairsForNext = 700 * (1 + worldId * 0.2) - pairs;
        if (pairs >= 1700 * (1 + worldId * 0.2))
            unlockedNum++;
        else
            pairsForNext = 1700 * (1 + worldId * 0.2) - pairs;
        if (pairs >= 3500 * (1 + worldId * 0.2))
            unlockedNum++;
        else
            pairsForNext = 3500 * (1 + worldId * 0.2) - pairs;
        var iconsUnlocked = THIS.WORLD_INIT_ICONS + unlockedNum;
        if (iconsUnlocked > totalIcons)
            iconsUnlocked = totalIcons;

        //temp:
        //iconsUnlocked = 4;
        if (saveToUserData)
            THIS.userData.worlds[i].numUnlocked = iconsUnlocked;
        return iconsUnlocked;
    }

    //temp:

    THIS.calcPairsForNext = function (worldId) {
        var pairs = -1;
        worldId = Number(worldId);
        for (var i = 0; i < THIS.userData.worlds.length; i++) {
            if (THIS.userData.worlds[i].worldId == worldId) {
                pairs = THIS.userData.worlds[i].pairs;
                break;
            }
        }
        if (pairs == -1)
            return -1;
        var pairsForNext = 0;
        var unlockedNum = 0;
        var totalIcons = THIS.getWorldIconUrls(worldId).length;
        // trace("calcUnlockedIcons " + pairs + "total Icons avail.:" + totalIcons);
        if (pairs >= 150 * (1 + worldId * 0.2))
            unlockedNum++;
        else {
            pairsForNext = 150 * (1 + worldId * 0.2) - pairs;
            return pairsForNext;
        }
        if (pairs >= 700 * (1 + worldId * 0.2))
            unlockedNum++;
        else {
            pairsForNext = 700 * (1 + worldId * 0.2) - pairs;
            return pairsForNext;
        }
        if (pairs >= 1700 * (1 + worldId * 0.2))
            unlockedNum++;
        else {
            pairsForNext = 1700 * (1 + worldId * 0.2) - pairs;
            return pairsForNext;
        }
        if (pairs >= 3500 * (1 + worldId * 0.2))
            unlockedNum++;
        else {
            pairsForNext = 3500 * (1 + worldId * 0.2) - pairs;
            return pairsForNext;
        }
        var iconsUnlocked = THIS.WORLD_INIT_ICONS + unlockedNum;
        if (iconsUnlocked > totalIcons)
            iconsUnlocked = totalIcons;
        return pairsForNext;
    }

    THIS.getUserWorldById = function (worldId) {
        var val;
        $.each(THIS.userData.worlds, function (index, item) {
            if (item.worldId == worldId) {
                val = item;
                return;
            }
        });

        return val;
    }

    THIS.getAssetW = function (assetType) {
        var assetWidth;
        $(THIS.screensXml).find("asset").each(function () {
            if (assetType == $(this).attr("type")) {
                assetWidth = $(this).attr("width");
            }
        });
        return THIS.calcSize(assetWidth);
    }

    THIS.getAssetH = function (assetType) {
        var assetHeight;
        $(THIS.screensXml).find("asset").each(function () {
            if (assetType == $(this).attr("type")) {
                assetHeight = $(this).attr("height");
            }
        });
        return THIS.calcSize(assetHeight);
    }

    THIS.calcSize = function (n) {
        n = Number(n);
        if (mgMain.assetsType == THIS.ASSETS_SMALL)
            return n / 2;
        else
            return n;
    }

    THIS.getAssetBitmap = function (assetType, centerReg) {
        var assetUrl = ""
        $(THIS.screensXml).find("asset").each(function () {
            if (assetType == $(this).attr("type")) {
                assetUrl = THIS.getScreensUrlPrefix() + $(this).attr("url");
            }
        });
        if (assetUrl == "")
            trace("getAssetBitmap error: could not find asset " + assetType);
        var bitmap = new Bitmap(assetUrl);
        if (centerReg) {
            bitmap.regX = THIS.getAssetW(assetType) / 2;
            bitmap.regY = THIS.getAssetH(assetType) / 2;
        }
        return bitmap;
    }


    THIS.pW = function (percent) {
        //return mgMain.initWidth / 100 * percent;
        return 1024 / 100 * percent;
    }

    THIS.pH = function (percent) {
        //        return mgMain.initHeight / 100 * percent;
        return 768 / 100 * percent;
    }

    THIS.isLandscape = function () {
        if (window.orientation == undefined)
            return true;
        return (Math.abs(window.orientation) % 180 == 90);
    }

    THIS.canvasToBitmap = function (type, colorToChange) {
        //trace("canvasToBitmap " + type);
        var canvas = document.createElement("canvas");
        //var c = new type(canvas);
        new window[type](canvas, colorToChange);
        return new Bitmap(canvas);
    }

    THIS.loadXml = function (url, callback) {
        $.ajax({
            type: "GET",
            url: "data/" + url,
            dataType: "xml",
            success: callback
        });

    }

    THIS.applyGreyScale = function (displayObject, width, height) {
        var greyScaleFilter = new ColorMatrixFilter([
		0.33, 0.33, 0.33, 0, 0, // red
		0.33, 0.33, 0.33, 0, 0, // green
		0.33, 0.33, 0.33, 0, 0, // blue
		0, 0, 0, 1, 0  // alpha
	    ]);

        displayObject.filters = [greyScaleFilter];
        displayObject.cache(0, 0, width, height);
    }

    THIS.applyColor = function (displayObject, width, height, rgba) {
        var colorFilter = new ColorFilter(rgba[0], rgba[1], rgba[2], rgba[3]);

        displayObject.filters = [colorFilter];
        displayObject.cache(0, 0, width, height);
    }

    THIS.getFont = function (size) {
        return size.toString() + 'px ' + THIS.GENERAL_FONT_FAMILY;
    }

    THIS.addChildAtPos = function (container, child, xPos, yPos) {
        child.x = Number(xPos);
        child.y = Number(yPos);
        container.addChild(child);
    }

    THIS.seperateThousands = function (n) {
        var nStr = n.toString() + '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    THIS.makeGeneralButton = function (assetType, hasDisabled) {
        var disabled = null;
        var enabled = THIS.getAssetBitmap(assetType, true);
        var overDown = enabled.clone();
        overDown.scaleX = overDown.scaleY = 1.07;
        if (hasDisabled) {
            disabled = enabled.clone();
            disabled.alpha = 0.5;
        }
        return new MGButton(disabled, enabled, overDown);
    }

    THIS.calcXpToAdd = function (score) {
        return Math.ceil(score * THIS.SCORE_TO_XP);
    }

    THIS.getQueryStringParam = function (key, default_) {
        if (default_ == null) default_ = "";
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var qs = regex.exec(window.location.href);
        if (qs == null)
            return default_;
        else
            return qs[1];
    }

    THIS.getUnixTimeStamp = function () {
        return Math.round((new Date()).getTime() / 1000);
    }
}


// ***********GLOBAL : ***********

Array.prototype.shuffle = function () {
    var len = this.length;
    var i = len;
    while (i--) {
        var p = parseInt(Math.random() * len);
        var t = this[i];
        this[i] = this[p];
        this[p] = t;
    }
};

function trace(msg) {
    if (window.console) {
        console.log("***MG:***   " + msg);
    } else {
        //alert(msg);
    }
}

 