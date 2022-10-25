
(function (window) {

    var Enemy = function (v, image) {

        this.initialize(v, image);
    }

    Enemy.prototype = new Container();

    Enemy.prototype.Container_initialize = Enemy.prototype.initialize;
    Enemy.prototype.initialize = function (v, image) {

        this.Container_initialize();
        var bmp = new Bitmap(image);
        this.addChild(bmp);
        this.velocity = v;
    }
    Enemy.prototype.tick = function () {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

    }
    window.Enemy = Enemy;
} (window));