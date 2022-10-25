
(function (window) {
    var Plasma = function (velocity, image) {

        this.initialize(velocity, image);
    }

    Plasma.prototype = new Container();

    Plasma.prototype.Container_initialize = Plasma.prototype.initialize;
    Plasma.prototype.initialize = function (velocity, image) {

        this.Container_initialize();
        var bmp = new Bitmap(image);
        bmp.regX = bmp.image.width/2;
        bmp.regY = bmp.image.height;
 
        this.addChild(bmp);
        this.velocity = velocity;
    }

    Plasma.prototype.tick = function () {

        this.x += this.velocity.x;
        this.y += this.velocity.y;

    }

    window.Plasma = Plasma;
} (window));