/// <reference path="easeljs-0.4.2.min.js" />

(function (window) {
    // Constants for controling horizontal movement
    var MoveAcceleration = 13000.0;
    var MaxMoveSpeed = 1750.0;
    var GroundDragFactor = 0.48;
    var AirDragFactor = 0.58;

    // Constants for controlling vertical movement
    var MaxJumpTime = 0.35;
    var JumpLaunchVelocity = -5000.0;
    var GravityAcceleration = 1800.0;
    var MaxFallSpeed = 550.0;
    var JumpControlPower = 0.14;

    var globalTargetFPS = 17;

    var StaticTile = new Tile(null, Enum.TileCollision.Passable, 0, 0);

    // imgPlayer should be the PNG containing the sprite sequence
    // level must be of type Level
    // position must be of type Point
    function Player(imgPlayer, level, position) {
        this.initialize(imgPlayer, level, position);
    }

    // Using EaselJS BitmapSequence as the based prototype
    Player.prototype = new BitmapAnimation();

    Player.prototype.IsAlive = true;
    Player.prototype.HasReachedExit = false;

    /// <summary>
    /// Gets whether or not the player's feet are on the ground.
    /// </summary>
    Player.prototype.IsOnGround = true;

    // constructor:
    //unique to avoid overiding base class
    Player.prototype.BitmapAnimation_initialize = Player.prototype.initialize;

    /// <summary>
    /// Constructors a new player.
    /// </summary>
    Player.prototype.initialize = function (imgPlayer, level, position) {


        var localSpriteSheet = new SpriteSheet({
            images: [imgPlayer], //image to use
            frames: [[14, 9, 52, 53, 0, 34, 53], [103, 10, 49, 53, 0, 29.5, 53], [185, 9, 55, 53, 0, 37.5, 53], [360, 9, 52, 53, 0, 34, 53], [274, 10, 54, 51, 0, 27, 51], [447, 9, 55, 52, 0, 27.5, 52], [708, 10, 55, 51, 0, 27.5, 51], [1725, 14, 34, 60, 0, 17, 60], [1537, 27, 52, 53, 0, 28, 53], [524, 39, 74, 50, 0, 49, 50], [1171, 32, 83, 48, 0, 48.5, 48]],
            animations: {
                walk: [0, 3, "walk", 8],
                die: [0, 3, false, 4],
                jump: [7, 7],
                celebrate: [0, 4, false, 4],
                idle: [4, 6, "idle", 15],
                penetrate: [8, 10, false, 12]
            }
        });

        SpriteSheetUtils.addFlippedFrames(localSpriteSheet, true, false, false);

        this.BitmapAnimation_initialize(localSpriteSheet);
        this.level = level;
        this.position = position;
        this.velocity = new Point(0, 0);
        this.previousBottom = 0.0;

        this.elapsed = 0;

        this.isJumping = false;
        this.wasJumping = false;
        this.jumpTime = 0.0;
        this.attackCmd = false;

        this.debuggerRect = new Shape();
        stage.addChild(this.debuggerRect);
        // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
        // of animated monster if you disabled the shadow.
        if (enableShadows)
            this.shadow = new Shadow("#000", 3, 2, 2);

        this.name = "Hero";

        // 1 = right & -1 = left & 0 = idle
        this.direction = Constant.STATICRIGHT;

        // starting directly at the first frame of the walk_right sequence
        this.currentFrame = 66;
        var _this = this;
        this.onAnimationEnd = function () {

            if (this.currentAnimation.indexOf("penetrate") > -1) {

                this.stop();
                _this.attackCmd = false;
            }

        }
        this.Reset(position);
    };

    /// <summary>
    /// Resets the player to life.
    /// </summary>
    /// <param name="position">The position to come to life at.</param>
    Player.prototype.Reset = function (position) {
        this.x = position.x;
        this.y = position.y;
        this.velocity = new Point(0, 0);
        this.IsAlive = true;
        this.level.IsHeroDied = false;
        this.gotoAndPlay("idle");
    };

    /// <summary>
    /// Gets a rectangle which bounds this player in world space.
    /// </summary>
    Player.prototype.BoundingRectangle = function () {
        //碰撞矩形区域相对于精灵图的区域块，要变窄一些
        var leftTemp = 8;
        if (this.direction == Constant.RIGHT || this.direction == Constant.STATICRIGHT) {
            leftTemp = 22;
        }
        var left = parseInt(Math.round(this.x - leftTemp));
        var top = parseInt(Math.round(this.y - 50));
        return new XNARectangle(left, top, 28, 50);
    };

    /// <summary>
    /// Handles input, performs physics, and animates the player sprite.
    /// </summary>
    /// <remarks>
    /// We pass in all of the input states so that our game is only polling the hardware
    /// once per frame. We also pass the game's orientation because when using the accelerometer,
    /// we need to reverse our motion when the orientation is in the LandscapeRight orientation.
    /// </remarks>
    Player.prototype.tick = function () {

        // It not possible to have a predictable tick/update time
        // requestAnimationFrame could help but is currently not widely and properly supported by browsers
        // this.elapsed = (Ticker.getTime() - this.lastUpdate) / 1000;
        // We're then forcing/simulating a perfect world
        this.elapsed = globalTargetFPS / 1000;

        this.ApplyPhysics();

        if (this.IsAlive && this.IsOnGround && !this.HasReachedExit && !this.attackCmd) {
            if (Math.abs(this.velocity.x) - 0.02 > 0) {
                // Checking if we're not already playing the animation
                if (this.currentAnimation !== "walk" && this.direction === Constant.LEFT) {
                    this.gotoAndPlay("walk");
                }
                if (this.currentAnimation !== "walk_h" && this.direction === Constant.RIGHT) {
                    this.gotoAndPlay("walk_h");
                }
            }
            else {
                if (this.currentAnimation !== "idle" && this.direction === Constant.STATICLEFT) {
                    this.gotoAndPlay("idle");
                }
                if (this.currentAnimation !== "idle_h" && this.direction === Constant.STATICRIGHT) {
                    this.gotoAndPlay("idle_h");
                }
            }
        }
        this.debuggerRect.graphics.clear();
        this.attack();
        if (!this.IsOnGround) {
            if (this.direction == Constant.RIGHT || this.direction == Constant.STATICRIGHT) {
                this.gotoAndPlay("jump_h");
            }
            else {
                this.gotoAndPlay("jump");
            }
        }
        // Clear input.
        this.isJumping = false;

        var bounds = this.BoundingRectangle();
        this.debuggerRect.graphics.beginStroke("#F00").drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
    };

    /// <summary>
    /// Updates the player's velocity and position based on input, gravity, etc.
    /// </summary>
    Player.prototype.ApplyPhysics = function () {
        if (this.IsAlive && !this.HasReachedExit) {
            var previousPosition = new Point(this.x, this.y);

            // Base velocity is a combination of horizontal movement control and
            // acceleration downward due to gravity.
            this.velocity.x += this.direction * MoveAcceleration * this.elapsed;
            this.velocity.y = Math.clamp(this.velocity.y + GravityAcceleration * this.elapsed, -MaxFallSpeed, MaxFallSpeed);

            this.velocity.y = this.DoJump(this.velocity.y);

            // Apply pseudo-drag horizontally.
            if (this.IsOnGround) {
                this.velocity.x *= GroundDragFactor;
            }
            else {
                this.velocity.x *= AirDragFactor;
            }

            // Prevent the player from running faster than his top speed.
            this.velocity.x = Math.clamp(this.velocity.x, -MaxMoveSpeed, MaxMoveSpeed);

            this.x += this.velocity.x * this.elapsed;
            this.y += this.velocity.y * this.elapsed;
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);

            // If the player is now colliding with the level, separate them.
            this.HandleCollisions();

            // If the collision stopped us from moving, reset the velocity to zero.
            if (this.x === previousPosition.x) {
                this.velocity.x = 0;
            }

            if (this.y === previousPosition.y) {
                this.velocity.y = 0;
            }
        }
    };

    /// <summary>
    /// Calculates the Y velocity accounting for jumping and
    /// animates accordingly.
    /// </summary>
    /// <remarks>
    /// During the accent of a jump, the Y velocity is completely
    /// overridden by a power curve. During the decent, gravity takes
    /// over. The jump velocity is controlled by the jumpTime field
    /// which measures time into the accent of the current jump.
    /// </remarks>
    /// <param name="velocityY">
    /// The player's current velocity along the Y axis.
    /// </param>
    /// <returns>
    /// A new Y velocity if beginning or continuing a jump.
    /// Otherwise, the existing Y velocity.
    /// </returns>
    Player.prototype.DoJump = function (velocityY) {
        // If the player wants to jump
        if (this.isJumping) {
            // Begin or continue a jump
            if ((!this.wasJumping && this.IsOnGround) || this.jumpTime > 0.0) {
                if (this.jumpTime == 0.0) {
                    this.level.levelContentManager.playerJump.play();
                }

                this.jumpTime += this.elapsed;
                // Playing the proper animation based on
                // the current direction of our hero

            }

            // If we are in the ascent of the jump
            if (0.0 < this.jumpTime && this.jumpTime <= MaxJumpTime) {
                // Fully override the vertical velocity with a power curve that gives players more control over the top of the jump
                velocityY = JumpLaunchVelocity * (1.0 - Math.pow(this.jumpTime / MaxJumpTime, JumpControlPower));
            }
            else {
                // Reached the apex of the jump
                this.jumpTime = 0.0;
            }
        }
        else {
            // Continues not jumping or cancels a jump in progress
            this.jumpTime = 0.0;
        }
        this.wasJumping = this.isJumping;

        return velocityY;
    };

    /// <summary>
    /// Detects and resolves all collisions between the player and his neighboring
    /// tiles. When a collision is detected, the player is pushed away along one
    /// axis to prevent overlapping. There is some special logic for the Y axis to
    /// handle platforms which behave differently depending on direction of movement.
    /// </summary>
    Player.prototype.HandleCollisions = function () {
        //获取人物左上角的坐标
        var bounds = this.BoundingRectangle();
        var leftTile = Math.floor(bounds.Left() / StaticTile.Width);
        var rightTile = Math.ceil((bounds.Right() / StaticTile.Width)) - 1;
        var topTile = Math.floor(bounds.Top() / StaticTile.Height);
        var bottomTile = Math.ceil((bounds.Bottom() / StaticTile.Height)) - 1;

        // Reset flag to search for ground collision.
        this.IsOnGround = false;



        var timboBounds = this.level.GetBound2s(10, 9);
        var depth1 = bounds.GetIntersectionDepth(timboBounds);
        if (false) {
           
            this.x = this.x + depth1.x;
            // Perform further collisions with the new bounds.
            bounds = this.BoundingRectangle();
        }


        // For each potentially colliding tile,
        for (var y = topTile; y <= bottomTile; ++y) {
            for (var x = leftTile; x <= rightTile; ++x) {
                // If this tile is collidable,
                var collision = this.level.GetCollision(x, y);
                if (collision !== Enum.TileCollision.Passable) {
                    // Determine collision depth (with direction) and magnitude.
                    var tileBounds = this.level.GetBounds(x, y);
                    var depth = bounds.GetIntersectionDepth(tileBounds);
                    if (depth.x !== 0 && depth.y !== 0) {
                        var absDepthX = Math.abs(depth.x);
                        var absDepthY = Math.abs(depth.y);
                        // Resolve the collision along the shallow axis.
                        if (collision == Enum.TileCollision.Platform) {
                            // If we crossed the top of a tile, we are on the ground.
                            if (this.previousBottom <= tileBounds.Top()) {
                                this.IsOnGround = true;
                                // Resolve the collision along the Y axis.
                                this.y = this.y + depth.y;
                                // Perform further collisions with the new bounds.
                                bounds = this.BoundingRectangle();
                            }
                        }
                        // Ignore platforms, unless we are on the ground.
                        else if (collision == Enum.TileCollision.Impassable) {
                            if (absDepthY < absDepthX) {
                                if (this.previousBottom <= tileBounds.Top()) {
                                    this.IsOnGround = true;
                                }
                                // Resolve the collision along the Y axis.
                                this.y = this.y + depth.y;
                                // Perform further collisions with the new bounds.
                                bounds = this.BoundingRectangle();
                            } else {
                                //大部分是跳起空中发生碰撞的时候才会执行到这里
                                // Resolve the collision along the X axis.
                                this.x = this.x + depth.x;
                                // Perform further collisions with the new bounds.
                                bounds = this.BoundingRectangle();

                            }
                        }
                    }
                }
            }
        }

        // Save the new bounds bottom.
        this.previousBottom = bounds.Bottom();
    };

    /// <summary>
    /// Called when the player has been killed.
    /// </summary>
    /// <param name="killedBy">
    /// The enemy who killed the player. This parameter is null if the player was
    /// not killed by an enemy (fell into a hole).
    /// </param>
    Player.prototype.OnKilled = function (killedBy) {
        this.IsAlive = false;
        this.velocity = new Point(0, 0);

        // Playing the proper animation based on
        // the current direction of our hero
        if (this.direction === 1) {
            this.gotoAndPlay("die_h");
        }
        else {
            this.gotoAndPlay("die");
        }

        if (killedBy !== null && killedBy !== undefined) {
            this.level.levelContentManager.playerKilled.play();
        }
        else {
            this.level.levelContentManager.playerFall.play();
        }
    };

    /// <summary>
    /// Called when this player reaches the level's exit.
    /// </summary>
    Player.prototype.OnReachedExit = function () {
        this.HasReachedExit = true;
        this.level.levelContentManager.exitReached.play();

        // Playing the proper animation based on
        // the current direction of our hero
        if (this.direction === 1) {
            this.gotoAndPlay("celebrate_h");
        }
        else {
            this.gotoAndPlay("celebrate");
        }
    };

    Player.prototype.attack = function () {
        //   alert(this.currentAnimation.indexOf("penetrate"))
        if (this.attackCmd && this.currentAnimation.indexOf("penetrate") === -1) {

            if (this.direction == Constant.RIGHT || this.direction == Constant.STATICRIGHT) {
                var bounds = this.BoundingRectangle();
                var attackBound = new XNARectangle(bounds.x + bounds.width, bounds.y, bounds.width + 10, bounds.height);

                for (var i = 0; i < this.level.Snails.length; i++) {
                    if (this.level.Hero.IsAlive && this.level.Snails[i].BoundingRectangle().Intersects(attackBound)) {
                        this.level.Snails[i].gotoAndPlay("attcked");
                        var currentX = this.level.Snails[i].x;
                        var target = this.level.Snails[i];
                        //Tween.get(target).wait(500).to({ alpha: 0, visible: false }, 1000).call(onComplete);
                        Tween.get(target).to({ x: currentX + 25 }, 200);

                    }
                }

                this.debuggerRect.graphics.beginStroke("#F00").drawRect(bounds.x + bounds.width, bounds.y, bounds.width + 10, bounds.height);
                this.gotoAndPlay("penetrate_h");
            }
            else {
                this.gotoAndPlay("penetrate");
            }
        }


    };



    window.Player = Player;
} (window));