(function (window) {


    /// How long to wait before turning around.
    /// </summary>
    var MaxWaitTime = 0.5;

    /// <summary>
    /// The speed at which this enemy moves along the X axis.
    /// </summary>
    var MoveSpeed = 64.0;

    // Index used for the naming of the monsters
    var monsterIndex = 0;

    var globalTargetFPS = 17;

    var StaticTile = new Tile(null, Enum.TileCollision.Passable, 0, 0);

    function Snail(level, position, imgMonster) {
        this.initialize(level, position, imgMonster);
    };

    Snail.prototype = new BitmapAnimation();

    // constructor:
    Snail.prototype.BitmapAnimation_initialize = Snail.prototype.initialize;

    Snail.prototype.initialize = function (level, position, imgSnail) {


        var localSpriteSheet = new SpriteSheet({
            images: [imgSnail], //image to use
            frames: [[499, 6, 31, 28, 0, 15.5, 28], [576, 7, 32, 28, 0, 16, 28], [672, 7, 33, 28, 0, 16.5, 28], [536, 6, 36, 28, 0, 18, 28], [823, 5, 35, 32, 0, 17.5, 32], [625, 3, 36, 32, 0, 18, 32], [719, 7, 33, 27, 0, 16.5, 27], [869, 9, 40, 25, 0, 20, 25], [768, 11, 48, 23, 0, 24, 23]],
            animations: {
                walk: [0, 2, "walk", 20],
                attcked: [3, 5, "walk", 4],
                died: [6, 8, false, 4]
            }
        });

        SpriteSheetUtils.addFlippedFrames(localSpriteSheet, true, false, false);

        this.BitmapAnimation_initialize(localSpriteSheet);

        this.x = position.x;
        this.y = position.y;
        this.level = level;

        /// <summary>
        /// How long this Snail has been waiting before turning around.
        /// </summary>
        this.waitTime = 0;


        // start playing the first sequence:
        this.gotoAndPlay("walk_h"); //animate
        this.debuggerRect = new Shape();
        stage.addChild(this.debuggerRect);
        //        this.name = "Monster" + monsterIndex;
        //        monsterIndex++;

        /// <summary>
        /// The direction this Snail is facing and moving along the X axis.
        /// </summary>
        // 1 = right & -1 = left
        this.direction = Constant.RIGHT;
        // starting directly at the first frame of the walk_right sequence
        // this.currentFrame = 21;
    };

    /// <summary>
    /// Gets a rectangle which bounds this Snail in world space.
    /// </summary>
    Snail.prototype.BoundingRectangle = function () {
        var left = parseInt(Math.round(this.x - 19));
        var top = parseInt(Math.round(this.y - 24));
        //这里的50是蜗牛的debugger宽度
        return new XNARectangle(left, top,35, 20);
    };

    /// <summary>
    /// Paces back and forth along a platform, waiting at either end.
    /// </summary>
    Snail.prototype.tick = function () {
        this.debuggerRect.graphics.clear();
        var bounds = this.BoundingRectangle();
        this.debuggerRect.graphics.ss(4, 'round', 'round').beginStroke("#F00").drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
        // We should normaly try here to compute the elpsed time since
        // the last update. But setTimeout/setTimer functions
        // are not predictable enough to do that. requestAnimationFrame will
        // help when the spec will be stabilized and used properly by all major browsers
        // In the meantime, we're cheating... and living in a perfect 60 FPS world ;-)
        var elapsed = globalTargetFPS / 1000;
        //这里的50是蜗牛的debugger宽度
        var posX = this.x + (50 / 2) * this.direction;
        var tileX = Math.floor(posX / StaticTile.Width) - this.direction;
        var tileY = Math.floor(this.y / StaticTile.Height);

        if (this.waitTime > 0) {
            // Wait for some amount of time.
            this.waitTime = Math.max(0.0, this.waitTime - elapsed);
            if (this.waitTime <= 0.0 && !this.level.IsHeroDied && !this.level.ReachedExit) {
                // Then turn around.
                this.direction = -this.direction;
                if (this.direction === Constant.RIGHT) {
                    this.gotoAndPlay("walk_h"); //animate
                }
                else {
                    this.gotoAndPlay("walk"); //animate
                }

            }
        }
        else {
            // If we are about to run into a wall or off a cliff, start waiting.
            if (this.level.GetCollision(tileX + this.direction, tileY - 1) === Enum.TileCollision.Impassable
                || this.level.GetCollision(tileX + this.direction, tileY) === Enum.TileCollision.Passable
                || this.level.IsHeroDied || this.level.ReachedExit) {
                this.waitTime = MaxWaitTime;
                if (this.currentAnimation.indexOf("idle") === -1) {
                    this.gotoAndPlay("idle");
                }
            }
            else {
                // Move in the current direction.
                var velocity = this.direction * MoveSpeed * elapsed;
                this.x = this.x + velocity;
            }
        }
    };

    window.Snail = Snail;
} (window));