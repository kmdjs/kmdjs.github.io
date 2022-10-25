(function (window) {

    function Ship(spriteSheetImage) {
        this.initialize(spriteSheetImage);
    }
    Ship.prototype = new BitmapAnimation();

    Ship.prototype.Container_initialize = Ship.prototype.initialize;

    Ship.prototype.initialize = function (spriteSheetImage) {
        var spriteSheet = new SpriteSheet({
            images: [spriteSheetImage],
            frames: { width: 24, height: 24, regX: 12, regY: 12 },
            animations: {
                fire: [0, 3, "fire"]
            }
        });
        this.Container_initialize(spriteSheet);
        this.gotoAndPlay("fire");
        this.onAnimationEnd = function () {
            this.gotoAndStop("fire");
        }

        this.direction = 0;

        this.x = 180;
        this.y = 560;


    }
    Ship.prototype.fire = function () {
        this.gotoAndPlay("fire");
    }


    Ship.prototype.tick = function () {

        this.x += this.vX;
        this.y += this.vY;

    }

    window.Ship = Ship;
} (window));