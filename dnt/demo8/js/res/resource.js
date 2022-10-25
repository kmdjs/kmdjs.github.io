/* File Created: August 12, 2012 */
(function (window) {
    var Resource = {};

    /**资源列表*/
    Resource.ResList = {};


    //		/**配置文件*/
    //		/**材质xml文件存储*/
    //		/**配置文件（父材质_子材质）*/
    //		/**资源加载器*/
    //		/**总共大小*/

    // 获得资源，resName是存在xml中的
    Resource.getRes = function (resName) {
        //如果没有就直接返回url(利用easeljs自带的加载),然后去加载该资源，加载完成之后添加到reslist中去。
        if (Resource.ResList[resName]) {

            return Resource.ResList[resName];
        } else {

            return Resource.getPath(resName);
            //            Global.manifest.push({ src: url, id: resName });
            //            Global.loader.loadManifest(Global.manifest);
            //            return url;
        }
    }

    Resource.getBitmap = function (resName, smallResName) {
        var bitmap = new CJ.Bitmap(Resource.ResList[resName]);
        if (smallResName) {

            var config = Resource.getRes(resName + "Config");
            $(config).find("sprite").each(function () {
                var node = $(this);
                if (node.attr("n") == smallResName) {
                    bitmap.sourceRect = new CJ.Rectangle(node.attr("x"), node.attr("y"), node.attr("w"), node.attr("h"));
                    bitmap.regX = -node.attr("oX");
                    bitmap.regY = -node.attr("oY");
                }
            })

        }
        return bitmap;
    }

    Resource.getFrames = function (resName) {
        var frames = [];
        var config = Resource.getRes(resName + "Config");
        if ($(config).find("offset").length > 0) {
            var ox = $(config).find("offset").attr("offsetX");
            var oy = $(config).find("offset").attr("offsetY");
            $(config).find("sprite").each(function () {
                var node = $(this);
                var frame = [node.attr("x"), node.attr("y"), node.attr("w"), node.attr("h"), 0, ox, oy];
                frames.push(frame);
            })
        }
        else {
            $(config).find("sprite").each(function () {
                var node = $(this);
                var frame = [node.attr("x"), node.attr("y"), node.attr("w"), node.attr("h"), 0, node.attr("w") / 2, node.attr("h")];
                frames.push(frame);
            })
        }
        return frames;
    }

    Resource.getCenterFrames = function (resName) {
        var frames = [];
        var config = Resource.getRes(resName + "Config");
        $(config).find("sprite").each(function () {
            var node = $(this);
            var frame = [node.attr("x"), node.attr("y"), node.attr("w"), node.attr("h"), 0, node.attr("w") / 2, node.attr("h") / 2];
            frames.push(frame);
        })
        return frames;
    }

    Resource.getFramesNoReg = function (resName, id) {
        var frames = [];
        var tempFrame;
        var config = Resource.getRes(resName + "Config");
        $(config).find("sprite").each(function () {
            var node = $(this);
            var frame = {};
            frame.id = node.attr("n");
            frame.value = [node.attr("x"),
                node.attr("y"),
                node.attr("w"),
                node.attr("h")];
            if (frame.id == id) {
                tempFrame = frame.value;
            }

            frames.push(frame);
        })
        if (frame.id) return tempFrame;
        return frames;
    }



    Resource.getFramesAndId = function (resName, id) {
        var frames = [];
        var tempFrame;
        var config = Resource.getRes(resName + "Config");
        $(config).find("sprite").each(function () {
            var node = $(this);
            var frame = {};
            frame.id = node.attr("n");
            frame.value = [node.attr("x"),
                node.attr("y"),
                node.attr("w"),
                node.attr("h"),
                0,
                -node.attr("oX"),
                -node.attr("oY")];
            if (frame.id == id) {
                tempFrame = frame.value;
            }
            frames.push(frame);
        })
        if (frame.id) return tempFrame;
        return frames;
    }

    // 添加资源
    Resource.addRes = function (resName, value) {
        Resource.ResList[resName] = value;
    }

    Resource.deleteRes = function (resName) {

    }


    Resource.getPath = function (resName) {
        var path = "";
        $(Global.assetsXML).find("asset").each(function () {
            if ($(this).attr("id") === resName) {
                //不要直接在里面return
                path = "assets/" + $(this).parent()[0].nodeName + "/" + $(this).attr("url");
            }
        });

        return path;
    }




    Resource.loadComplete = function (resPathArr) {

    }
    Resource.getEnemyData = function (mapID, name) {
        var enemy = {};
        $(Resource.getRes("mapConfig")).find("Maps").each(function () {
            $(this).find("Map").each(function () {
                if ($(this).attr("ID") == mapID) {
                    $(this).find("Enemy").each(function () {
                        if ($(this).attr("Name") == name) {
                            enemy.HP = $(this).attr("HP");
                            enemy.MP = $(this).attr("MP");
                            enemy.EXP = $(this).attr("EXP");
                            enemy.Speed = $(this).attr("Speed");
                            enemy.AwakeScope = $(this).attr("AwakeScope");
                            enemy.SleepScope = $(this).attr("SleepScope");

                        }
                    })

                }
            });
        });
        return enemy;
    }
    window.Resource = Resource;
} (window));