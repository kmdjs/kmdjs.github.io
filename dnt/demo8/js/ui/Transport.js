define(function () {

    var Transport = function (cellPosition, position, targetMapID, playposition) {
        this.initialize(cellPosition, position, targetMapID, playposition);
    }

    Transport.prototype = new CJ.Container();

    // constructor:
    Transport.prototype.Container_initialize = Transport.prototype.initialize;

    Transport.prototype.initialize = function (cellPosition, position, targetMapID, playposition) {
        this.Container_initialize();
        this.playerPosition = new Vector2(playposition.split("_")[0], playposition.split("_")[1]);
        this.preViewPortX = Global.player.viewPort[0];
        this.preViewPortY = Global.player.viewPort[1];
        this.targetMapID = targetMapID;
        this.cellPosition = cellPosition;
        var spriteSheet = new CJ.SpriteSheet({
            images: [Resource.getRes("transport")],
            frames: { width: 134, height: 76, regX: 67, regY: 38 },
            animations: {
                show: [0, 6, "show", 16]
            }
        });

        var showAnm = new CJ.BitmapAnimation(spriteSheet);
        showAnm.gotoAndPlay("show");
        this.position = position;
        var currentStagePositon = Global.worldToStage(this.position);
        this.x = currentStagePositon.x;
        this.y = currentStagePositon.y;
        //        showAnm.onAnimationEnd = function () {
        //            CJ.Ticker.removeListener(showAnm.parent);
        //            showAnm.parent.removeChild(this);
        //        }
        this.addChild(showAnm);
    }

    Transport.prototype.tick = function () {
        if (this.preViewPortX !== Global.player.viewPort[0] || this.preViewPortY !== Global.player.viewPort[1]) {
            this.x += this.preViewPortX - Global.player.viewPort[0];
            this.y += this.preViewPortY - Global.player.viewPort[1];
            this.preViewPortX = Global.player.viewPort[0];
            this.preViewPortY = Global.player.viewPort[1];
        }
    }

    return Transport;
});