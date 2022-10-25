//渲染的类
define(function () {
    Sprite.prototype = new CJ.Container();
    var THIS = null;

    /**
     *
     */
    function Sprite(imgid) {
        this.initialize(imgid);
    }

    Sprite.prototype.Container_initialize = Sprite.prototype.initialize; //unique to avoid overiding base class

    Sprite.prototype.initialize = function (imgid) {
        this.Container_initialize();
        THIS = this;
        THIS.headFrames = [];
        THIS.bodyFrames = [];
        THIS.legFrames = [];
        THIS.weaponsFrames = [];
        THIS.headbmpAnim = {};
        THIS.bodybmpAnim = {};
        THIS.legbmpAnim = {};
        THIS.weaponsbmpAnim = {};
        this.show(imgid);
    }


    Sprite.prototype.show = function (imgid) {
        var frames = Resource.getFramesAndId(imgid);
        $(frames).each(function (i) {
            if (this.id.indexOf("1-1-") != -1) {
                THIS.headFrames.push({id:this.id.substring(4), value:this.value});
            } else if (this.id.indexOf("2-1-") != -1) {
                THIS.bodyFrames.push({id:this.id.substring(4), value:this.value});
            }
            else if (this.id.indexOf("3-1-") != -1) {
                THIS.legFrames.push({id:this.id.substring(4), value:this.value});
            } else {
                THIS.weaponsFrames.push({id:this.id.substring(4), value:this.value});
            }
        });

        THIS.headFrames.sort(function (a, b) {
            return a.id - b.id;
        });
        $(THIS.headFrames).each(function (i) {
            THIS.headFrames[i] = this.value;
        });
        THIS.bodyFrames.sort(function (a, b) {
            return a.id - b.id;
        });
        $(THIS.bodyFrames).each(function (i) {
            THIS.bodyFrames[i] = this.value
        });

        THIS.legFrames.sort(function (a, b) {
            return a.id - b.id;
        });
        $(THIS.legFrames).each(function (i) {
            THIS.legFrames[i] = this.value
        });

        THIS.weaponsFrames.sort(function (a, b) {
            return a.id - b.id;
        });
        $(THIS.weaponsFrames).each(function (i) {
            THIS.weaponsFrames[i] = this.value
        });

        var headData = {
            "frames":THIS.headFrames,
            "animations":{
                "run":[0, THIS.headFrames.length-1, "run", 10], "stop":[0]
            },
            "images":[Resource.getRes(imgid)]
        };
        var headSheet = new CJ.SpriteSheet(headData);

        var bodyData = {
            "frames":THIS.bodyFrames,
            "animations":{
                "run":[0, THIS.bodyFrames.length-1, "run", 10], "stop":[4]
            },
            "images":[Resource.getRes(imgid)]
        };
        var bodySheet = new CJ.SpriteSheet(bodyData);

        var legData = {
            "frames":THIS.legFrames,
            "animations":{
                "run":[0, THIS.legFrames.length-1, "run", 10], "stop":[0]
            },
            "images":[Resource.getRes(imgid)]
        };
        var legSheet = new CJ.SpriteSheet(legData);
        var weaponsData = {
            "frames":THIS.weaponsFrames,
            "animations":{
                "run":[0, THIS.weaponsFrames.length-1, "run", 10], "stop":[0]
            },
            "images":[Resource.getRes(imgid)]
        };
        var weaponsSheet = new CJ.SpriteSheet(weaponsData);
        THIS.headbmpAnim = new CJ.BitmapAnimation(headSheet);
        THIS.bodybmpAnim = new CJ.BitmapAnimation(bodySheet);
        THIS.legbmpAnim = new CJ.BitmapAnimation(legSheet);
        THIS.weaponsbmpAnim = new CJ.BitmapAnimation(weaponsSheet);

        THIS.addChild(THIS.headbmpAnim);
        THIS.addChild(THIS.bodybmpAnim);
        THIS.addChild(THIS.legbmpAnim);
        THIS.addChild(THIS.weaponsbmpAnim);
        THIS.headbmpAnim.gotoAndPlay("run");
        THIS.bodybmpAnim.gotoAndPlay("run");
        THIS.legbmpAnim.gotoAndPlay("run");
        THIS.weaponsbmpAnim.gotoAndPlay("run");
    }


    return Sprite;
})


