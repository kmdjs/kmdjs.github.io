//客户端websocket用到的配置文件
define(function () {
    var ClickAnm = function (position) {
        this.initialize(position);
    }


    ClickAnm.prototype = new CJ.Container();

    // constructor:
    ClickAnm.prototype.Container_initialize = ClickAnm.prototype.initialize;

    ClickAnm.prototype.initialize = function (stagePosition) {
        this.Container_initialize();
        this.position = Global.stageToWorld(stagePosition);
        var currentStagePositon = Global.worldToStage(this.position);
        this.x = currentStagePositon.x;
        this.y = currentStagePositon.y;

        var currentCell = Global.map.getSmallCellIndex(this.position);
         if (_.include(Global.map.mask, currentCell.x + "_" + currentCell.y)) {
            this.alpha = 0.5;
        }
        this.preViewPortX = Global.player.viewPort[0];
        this.preViewPortY = Global.player.viewPort[1];
        var spriteSheet = new CJ.SpriteSheet({
            images: [Resource.getRes("clickAnm")],
            frames: { width: 64, height: 64, regX: 32, regY: 32 },
            animations: {
                show: [0, 9, "", 6]
            }
        });

        var clickAnm = new CJ.BitmapAnimation(spriteSheet);
        clickAnm.gotoAndPlay("show");
        clickAnm.onAnimationEnd = function () {
            CJ.Ticker.removeListener(clickAnm.parent);
            clickAnm.parent.removeChild(this);
        }
        this.addChild(clickAnm);
    }

    ClickAnm.prototype.tick = function () {
        if (this.preViewPortX !== Global.player.viewPort[0] || this.preViewPortY !== Global.player.viewPort[1]) {
            this.x += this.preViewPortX - Global.player.viewPort[0];
            this.y += this.preViewPortY - Global.player.viewPort[1];
            this.preViewPortX = Global.player.viewPort[0];
            this.preViewPortY = Global.player.viewPort[1];
        }
    }



    return ClickAnm;
});