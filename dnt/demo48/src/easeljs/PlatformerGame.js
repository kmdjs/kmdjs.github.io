//-----------------------------------------------------------------------------
// PlatformerGame.js
//
// Inspired by the Microsoft XNA Community Game Platformer Sample
// Copyright (C) Microsoft Corporation. All rights reserved.
// Ported to HTML5 Canvas with EaselJS by David Rousset - http://blogs.msdn.com/davrous
//-----------------------------------------------------------------------------

/// <summary>
/// This is the main type for your game
/// </summary>
(function (window) {
    //usefull keycodes
    var KEYCODE_SPACE = 32;
    var KEYCODE_UP = 38;
    var KEYCODE_LEFT = 37;
    var KEYCODE_RIGHT = 39;
    var KEYCODE_W = 87;
    var KEYCODE_A = 65;
    var KEYCODE_D = 68;
    var KEYCODE_J = 74;
    // The number of levels in the Levels directory of our content. We assume that
    // levels in our content are 0-based and that all numbers under this constant
    // have a level file present. This allows us to not need to check for the file
    // or handle exceptions, both of which can add unnecessary time to level loading.
    var numberOfLevels = 4;

    // Used in case of an HTTP issue or access denied on file://
    // This is a static level. So if you're looping always on the same level
    // You're stuck in the Matrix because of an exception somewhere... Up to you to find where!
    var hardcodedErrorTextLevel = ".....................................................................................................................................................GGG.................###................................GGG.......GGG.......###...--..###........................1................X.####################";

    // Variables used to handle the overlay canvas to display "You died", "You win", etc.
    var statusCanvas = null;
    var statusCanvasCtx = null;
    var overlayEnabled = true;
    var scoreText = null;
    var timeRemainingText = null;

    // Displaying the timer in red under 30s of remaining time
    var WarningTime = 30;

    function PlatformerGame(stage, contentManager, gameWidth, gameHeight) {
        this.platformerGameStage = stage;
        this.platformerGameContentManager = contentManager;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.levelIndex = -1;
        this.level = null;
        this.wasContinuePressed = false;
        this.continuePressed = false;
        // Preparing the overlay canvas for future usage
        this.SetOverlayCanvas();

        // Little closure needed here
        var instance = this; // store the current context 

        // Our hero can be moved with the arrow keys (left, right)
        // And jump with W
        document.onkeydown = function (e) {
            instance.handleKeyDown(e);
        };

        document.onkeyup = function (e) {
            instance.handleKeyUp(e);
        };

        this.LoadNextLevel();
    };

    // Update logic callbacked by EaselJS
    // Equivalent of the Update() method of XNA
    PlatformerGame.prototype.tick = function () {
        //   try {
        if (this.level !== null) {
            this.HandleInput();
            this.level.Update();
            this.UpdateScore();

            // If the hero died or won, display the appropriate overlay
            if (overlayEnabled) {
                this.DrawOverlay();
            }
            var showleft = 0;
            var showtop = 160;
            if (this.level.Hero.x > canvas2.width - Constant.SHOWBORDERWIDTH && this.level.Hero.x < canvas.width - Constant.SHOWBORDERWIDTH) {
                showleft = this.level.Hero.x - canvas2.width +Constant.SHOWBORDERWIDTH;

            } else if (this.level.Hero.x <= canvas2.width - Constant.SHOWBORDERWIDTH) {
                showleft = 0;

            } else {
                showleft = canvas.width - canvas2.width;
            }
            if (this.level.Hero.y > canvas2.height - Constant.SHOWBORDERHEIGHT && this.level.Hero.y < canvas.height - Constant.SHOWBORDERHEIGHT) {
                showtop = this.level.Hero.y - canvas2.height + Constant.SHOWBORDERHEIGHT;
            } else if (this.level.Hero.y <= canvas2.height - Constant.SHOWBORDERHEIGHT) {
                showtop = 0;
            } else {
                showtop = canvas.height - canvas2.height;
            }
            canvasBmp.sourceRect = new Rectangle(showleft, showtop, 480, 320);


            stage2.update();
        }
        //}
        //        catch (e) {
        //            console.log('Error', e);
        //        }
    };


    // Starting the game
    PlatformerGame.prototype.StartGame = function () {
        // we want to do some work before we update the canvas,
        // otherwise we could use Ticker.addListener(stage);
        Ticker.addListener(this);
        // Targeting 60 FPS
        Ticker.setFPS(60);
    };

    // Well, the method's name should be self explicit ;-)
    PlatformerGame.prototype.UpdateScore = function () {
        if (scoreText === null) {
            timeRemainingText = new Text("TIME: ", "bold 14px Arial", "yellow");
            timeRemainingText.x = 10;
            timeRemainingText.y = 20;
            this.platformerGameStage.addChild(timeRemainingText);

            scoreText = new Text("SCORE: 0", "bold 14px Arial", "yellow");
            scoreText.x = 10;
            scoreText.y = 34;
            this.platformerGameStage.addChild(scoreText);
        }

        if (this.level.TimeRemaining < WarningTime && !this.level.ReachedExit) {
            timeRemainingText.color = "red";
        }
        else {
            timeRemainingText.color = "yellow";
        }

        scoreText.text = "SCORE: " + this.level.Score;
        timeRemainingText.text = "TIME: " + parseInt(this.level.TimeRemaining);
    };

    // Perform the appropriate action to advance the game and
    // to get the player back to playing.
    PlatformerGame.prototype.HandleInput = function () {
        if (!this.wasContinuePressed && this.continuePressed) {
            if (!this.level.Hero.IsAlive) {
                this.HideStatusCanvas();
                this.level.StartNewLife();
            }
            else if (this.level.TimeRemaining == 0) {
                if (this.level.ReachedExit)
                    this.LoadNextLevel();
                else
                    this.ReloadCurrentLevel();
            }
        }

        this.wasContinuePressed = this.continuePressed;
    };

    // Determine the status overlay message to show.
    PlatformerGame.prototype.DrawOverlay = function () {
        var status = null;

        if (this.level.TimeRemaining == 0) {
            if (this.level.ReachedExit) {
                status = this.platformerGameContentManager.winOverlay;
            }
            else {
                status = this.platformerGameContentManager.loseOverlay;
            }
        }
        else if (!this.level.Hero.IsAlive) {
            status = this.platformerGameContentManager.diedOverlay;
        }

        if (status !== null) {
            this.ShowStatusCanvas(status);
        }
    };

    // Creating a second canvas to display it over the main gaming canvas 
    // It's displayed in style:absolute
    // It is used to display to proper overlay contained in /overlays folder
    // with some opacity effect
    PlatformerGame.prototype.SetOverlayCanvas = function () {
        var oneOfThisOverlay = this.platformerGameContentManager.winOverlay;

        statusCanvas = document.createElement("canvas");
        document.body.appendChild(statusCanvas);
        statusCanvasCtx = statusCanvas.getContext("2d");

        statusCanvas.setAttribute('width', oneOfThisOverlay.width);
        statusCanvas.setAttribute('height', oneOfThisOverlay.height);
        // We center it
        var statusX = (this.gameWidth - oneOfThisOverlay.width) / 2;
        var statusY = (this.gameHeight - oneOfThisOverlay.height) / 2;
        statusCanvas.style.position = 'absolute';
        statusCanvas.style.top = statusY + "px";
        statusCanvas.style.left = statusX + "px";
    };

    // Cleaning the previous overlay canvas and setting it visible
    // with the new overlay image
    PlatformerGame.prototype.ShowStatusCanvas = function (status) {
        statusCanvas.style.display = "block";
        statusCanvasCtx.clearRect(0, 0, status.width, status.height);
        statusCanvasCtx.drawImage(status, 0, 0);
        overlayEnabled = false;
    };

    // Hiding the overlay canvas while playing the game
    PlatformerGame.prototype.HideStatusCanvas = function () {
        overlayEnabled = true;
        statusCanvas.style.display = "none";
    };

    // Loading the next level contained into /level/{x}.txt
    PlatformerGame.prototype.LoadNextLevel = function () {
        this.levelIndex = (this.levelIndex + 1) % numberOfLevels;

        // Searching where we are currently hosted
        var nextLevelUrl = window.location.href.replace('index.html', '') + "levels/" + this.levelIndex + ".txt";
        try {
            var request = new XMLHttpRequest();
            request.open('GET', nextLevelUrl, true);

            // Little closure
            var instance = this;
            request.onreadystatechange = function () {
                instance.OnLevelReady(this);
            };
            request.send(null);
        }
        catch (e) {
            // Probably an access denied if you try to run from the file:// context
            // Loading the hard coded error level to have at least something to play with
            this.LoadThisTextLevel(hardcodedErrorTextLevel);
        }
    };

    // Callback method for the onreadystatechange event of XMLHttpRequest
    PlatformerGame.prototype.OnLevelReady = function (eventResult) {
        var newTextLevel = "";

        if (eventResult.readyState == 4) {
            // If everything was OK
            if (eventResult.status == 200)
                newTextLevel = eventResult.responseText.replace(/[\n\r\t]/g, '');
            else {
                console.log('Error', eventResult.statusText);
                // Loading a hard coded level in case of error
                newTextLevel = hardcodedErrorTextLevel;
            }

            this.LoadThisTextLevel(newTextLevel);
        }
    };

    PlatformerGame.prototype.LoadThisTextLevel = function (textLevel) {
        this.HideStatusCanvas();
        scoreText = null;

        // Unloads the content for the current level before loading the next one.
        if (this.level != null)
            this.level.Dispose();

        this.level = new Level(this.platformerGameStage, this.platformerGameContentManager, textLevel, this.gameWidth, this.gameHeight);
        this.level.StartLevel();
    };

    // Loaded if the hero lost because of a timeout
    PlatformerGame.prototype.ReloadCurrentLevel = function () {
        --this.levelIndex;
        this.LoadNextLevel();
    };

    PlatformerGame.prototype.handleKeyDown = function (e) {
        //cross browser issues exist
        if (!e) { var e = window.event; }
        switch (e.keyCode) {
            case KEYCODE_A: ;
            case KEYCODE_LEFT:
                this.level.Hero.direction = Constant.LEFT;
                break;
            case KEYCODE_D: ;
            case KEYCODE_RIGHT:
                this.level.Hero.direction = Constant.RIGHT;
                break;
            case KEYCODE_W:
                this.level.Hero.isJumping = true;
                this.continuePressed = true;
                break;
            case KEYCODE_J:
                if (this.level.Hero.IsOnGround && this.level.Hero.currentAnimation.indexOf("penetrate") === -1)
                    this.level.Hero.attackCmd = true;
                break;
        }
    };

    PlatformerGame.prototype.handleKeyUp = function (e) {
        //cross browser issues exist
        if (!e) { var e = window.event; }
        switch (e.keyCode) {
            case KEYCODE_A: ;
            case KEYCODE_LEFT: ;
                this.level.Hero.direction = Constant.STATICLEFT;
                break;
            case KEYCODE_D: ;
            case KEYCODE_RIGHT:
                this.level.Hero.direction = Constant.STATICRIGHT;
                break;
            case KEYCODE_W:
                this.continuePressed = false;
                break;
            case KEYCODE_J:
                //  this.level.Hero.attackCmd = false;
        }
    };

    window.PlatformerGame = PlatformerGame;
} (window));