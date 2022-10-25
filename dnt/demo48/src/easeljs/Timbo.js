
(function (window) {
    function Timbo(texture, collision, x, y) {
        this.initialize(texture, collision, x, y);
    }
    Timbo.prototype = new Bitmap();

    // constructor:
    Timbo.prototype.Bitmap_initialize = Timbo.prototype.initialize; //unique to avoid overiding base class

    Timbo.prototype.initialize = function (texture, collision, x, y) {
        if (texture != null) {
            this.Bitmap_initialize(texture);
            this.empty = false;
        }
        else {
            this.empty = true;
        }
        this.Collision = collision;
        //这里乘的是格子的宽度和高度
        this.x = x *40;
        this.y = y * 32;

    };

    Timbo.prototype.Width = 15;
    Timbo.prototype.Height = 149;

    window.Timbo = Timbo;
} (window));