define(function () {
    function NPC(position) {
        this.initialize(position);
    }

    NPC.prototype = new CJ.Container();



    // constructor:
    NPC.prototype.Container_initialize = NPC.prototype.initialize;

    NPC.prototype.initialize = function (id, name, position, speed) {
        this.Container_initialize();

        this.position = position;


        var spriteSheet = new CJ.SpriteSheet({
            images: [Resource.getRes("1_npc1")],

            frames: Resource.getFrames("1_npc1"),
            animations: {
                stand: [0, 2, "stand", 10]
            }
        });

        this.bmpAnim = new CJ.BitmapAnimation(spriteSheet);

        this.bmpAnim.gotoAndPlay("stand"); 	//animate


        this.addChild(this.bmpAnim);


        this.preViewPortX = Global.player.viewPort[0];
        this.preViewPortY = Global.player.viewPort[1];
       CJ.Ticker.addListener(this);
    };




    NPC.prototype.setAlpha = function () {

        if (_.include(Global.map.mask, this.currentCell.x + "_" + this.currentCell.y)) {
            this.alpha = 0.5;
        } else {
            this.alpha = 1;
        }
    }

    NPC.prototype.tick = function () {

        this.setStagePosition();
    }

    NPC.prototype.setStagePosition = function () {
        if (this.preViewPortX !== Global.player.viewPort[0] || this.preViewPortY !== Global.player.viewPort[1]) {
        
            this.x += this.preViewPortX - Global.player.viewPort[0];
            this.y += this.preViewPortY - Global.player.viewPort[1];
            this.preViewPortX = Global.player.viewPort[0];
            this.preViewPortY = Global.player.viewPort[1];
        }
    }


    return NPC;
});