/* File Created: August 15, 2012 */
define(function () {

    function LowPixelMap(mapID) {
        this.initialize(mapID);
    }

    LowPixelMap.prototype = new CJ.Container();

    // constructor:
    LowPixelMap.prototype.Container_initialize = LowPixelMap.prototype.initialize;

    LowPixelMap.prototype.initialize = function (mapID) {
        this.preViewPortX = -0.1;
        this.preViewPortY = -0.1;

        this.bitmap = new CJ.Bitmap(Resource.getRes("minMap" + mapID));

        this.bitmap.scaleX = this.bitmap.scaleY = 10;
        this.addChild(this.bitmap);
    }

    LowPixelMap.prototype.tick = function () {
        if (this.preViewPortX !== Global.player.viewPort[0] || this.preViewPortY !== Global.player.viewPort[1]) {
            this.bitmap.x -= parseInt(Global.player.viewPort[0] - this.preViewPortX);
            this.bitmap.y -= parseInt(Global.player.viewPort[1] - this.preViewPortY);
            this.preViewPortX = Global.player.viewPort[0];
            this.preViewPortY = Global.player.viewPort[1];
        }
    }
    return LowPixelMap;
});