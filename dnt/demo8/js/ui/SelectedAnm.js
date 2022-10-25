//客户端websocket用到的配置文件
define(function () {
    var SelectedAnm = function () {
        this.initialize();
    }


    SelectedAnm.prototype = new CJ.Container();

    // constructor:
    SelectedAnm.prototype.Container_initialize = SelectedAnm.prototype.initialize;

    SelectedAnm.prototype.initialize = function () {
        this.Container_initialize();
        
        var spriteSheet = new CJ.SpriteSheet({
            images: [Resource.getRes("selectedAnm")],
            frames: Resource.getCenterFrames("selectedAnm"),
            animations: {
                show: [0, 5, "show", 6]
            }
        });

        var sa = new CJ.BitmapAnimation(spriteSheet);
        sa.gotoAndPlay("show");
        this.addChild(sa);
    }

    return SelectedAnm;
});