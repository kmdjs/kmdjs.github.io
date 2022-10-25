var fpsLabel;
var canvas;
var stage;
var plasma;
var bgBmp;
var ship;
var explode;
var shipImage;
var playMenu;
var txt;
var plasmas = [];

var enemyImage;
var explodeImage;
var enemys = [];
var target;

var grids = [];
var gridImage;
var girdBmp;
var backgroundImg;
var loadingTxt;
var gameStartTag = false;
var scoreLabel;
var score = 0;
function main() {
    canvas = document.getElementById("canvas");
    stage = new Stage(canvas);
    loadingTxt = new Bitmap(loadingCanvas);
    loadingTxt.y = 200;
    stage.addChild(loadingTxt);
    Ticker.setFPS(60);
    Ticker.addListener(window);
    loadSoundThenImage();
}

main();

function loadSoundThenImage() {

   
    var filetype;
    agent = navigator.userAgent.toLowerCase();

   
    if (agent.indexOf("chrome") > -1) {
        filetype = ".mp3";
    } else if (agent.indexOf("opera") > -1) {
        filetype = ".ogg";
    } else if (agent.indexOf("firefox") > -1) {
        filetype = ".ogg";
    } else if (agent.indexOf("safari") > -1) {
        filetype = ".mp3";
    } else if (agent.indexOf("msie") > -1) {
        filetype = ".mp3";
    }


 
    if (agent.indexOf("firefox") > -1) {
        loadImage();
    }
    else {
        
        SoundJS.onLoadQueueComplete = loadImage;
 
        SoundJS.addBatch([
		{ name: "begin", src: "mp3/assets/Game-Spawn" + filetype, instances: 1 },
		{ name: "break", src: "mp3/assets/Game-Break" + filetype, instances: 6 },
		{ name: "death", src: "mp3/assets/Game-Death" + filetype, instances: 1 },
		{ name: "laser", src: "mp3/assets/Game-Shot" + filetype, instances: 6 },
		{ name: "music", src: "mp3/assets/18-machinae_supremacy-lord_krutors_dominion" + filetype, instances: 1}]);
    }
}

function loadImage() {
    
    var loader = new PxLoader();
    backgroundImg = loader.addImage('image/backdrop.png');
    plasmaImg = loader.addImage('image/plasma.png');
    enemyImage = loader.addImage('image/mine.png');
    explodeImage = loader.addImage('image/explosion2-64.png');
    shipImage = loader.addImage('image/ship.png');
    gridImage = loader.addImage('image/grid.png');

    loader.addCompletionListener(function () {
        init();

    });



    loader.addProgressListener(function (e) {
   

    });

    loader.start();
}


function init() {



    stage.enableMouseOver(10);

    bgBmp = new Bitmap(backgroundImg);
    girdBmp = new Bitmap(gridImage);
    stage.addChild(bgBmp);


    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 11; j++) {
            var tempGirdBmp = girdBmp.clone();
            tempGirdBmp.alpha = 0.5;
            tempGirdBmp.x = i * 62;
            tempGirdBmp.y = j * 62;
            grids.push(tempGirdBmp);
            stage.addChild(tempGirdBmp);

        }
    }





    SoundJS.play("music", null, 0.2, true);


 
    var spriteSheet = new SpriteSheet({
        images: [explodeImage],
        frames: { width: 64, height: 64, regX: 32, regY: 32 },
        animations: {
            explode: [0, 13, "explode"]
        }
    });
    explode = new BitmapAnimation(spriteSheet);
    explode.onAnimationEnd = function () {
        stage.removeChild(this);
    }
    stage.addChild(explode);




    ship = new Ship(shipImage);
    stage.addChild(ship);




    var aboutMenu = new MenuItem(113, 320, "#3A5C68", 128, 38, "ABOUT", "bold 36px Arial", "#FFF");
    aboutMenu.onClick = function (evt) {
        alert("under construction. ：）");
        SoundJS.play("begin", SoundJS.INTERUPT_LATE);

    }
    aboutMenu.onMouseOver = function (e) {
        this.setTxtColor("#FF7E00");
        SoundJS.play("begin", SoundJS.INTERUPT_LATE);
        stage.update();
    }
    aboutMenu.onMouseOut = function (e) {
        this.setTxtColor("#FFF");
        stage.update();
    }
    stage.addChild(aboutMenu);


    var playMenu = new MenuItem(133, 260, "#3A5C68", 95, 40, "PLAY", "bold 36px Arial", "#FFF");
    playMenu.onClick = function (evt) {
        gameStartTag = true;
        this.visible = false;
        stage.removeChild(aboutMenu);
        generateMines(10);
        SoundJS.play("begin", SoundJS.INTERUPT_LATE);
    }
    playMenu.onMouseOver = function (e) {
        this.setTxtColor("#FF7E00");
        SoundJS.play("begin", SoundJS.INTERUPT_LATE);
        stage.update();
    }
    playMenu.onMouseOut = function (e) {
        this.setTxtColor("#FFF");
        stage.update();
    }
    stage.addChild(playMenu);



    fpsLabel = new Text("-- FPS", "bold 14px Arial", "#fff");
    fpsLabel.x = 310;
    fpsLabel.y = 20;
    fpsLabel.alpha = 0.8;
    stage.addChild(fpsLabel);
    stage.removeChild(loadingTxt);

    var autograph = new Text("create by 当耐特", "bold 12px Arial", "#fff");
    autograph.alpha = 0.5;
    autograph.x = 230;
    autograph.y = 630;
    stage.addChild(autograph);

    scoreLabel = new Text("Score: --", "bold 14px Arial", "#fff");


    scoreLabel.y = 20;
    stage.addChild(scoreLabel);


}



function generateMines(count) {
    for (var i = 0; i < count; i++) {
        var enemyTemp = new Enemy(new Vector2(0, 1), enemyImage);
        enemyTemp.x = MathHelp.getRandomNumber(0, 340);
        enemyTemp.y = MathHelp.getRandomNumber(-10, -50);
        enemys.push(enemyTemp);
        stage.addChild(enemyTemp);
    }

}




var shootHeld; 	
var lfHeld; 			
var rtHeld; 			
var energyHeld;
var mineCount = 20;

function tick() {
    if (gameStartTag) {


        if (enemys.length === 0) {
            mineCount += 10;
            generateMines(mineCount);
        }


        scoreLabel.text = "Score: " + score;

  
        for (var j = 0; j < enemys.length; j++) {
            if (enemys[j].x > canvas.width + 100 || enemys[j].x < -100 || enemys[j].y > canvas.height + 20 || enemys[j].y < -100) {
                stage.removeChild(enemys[j]);
                enemys.splice(j--, 1);
            }
        }

  
        for (var i = 0; i < plasmas.length; i++) {
            var pp = plasmas[i];
            if (pp.x > canvas.width + 100 || pp.x < -100 || pp.y > canvas.height + 100 || pp.y < -100) {
                stage.removeChild(plasmas[i]);
                plasmas.splice(i--, 1);

            }
        }

      
        for (var i = 0; i < plasmas.length; i++) {
            for (var j = 0; j < enemys.length; j++) {

                if (plasmas[i]) {
                    var ep = new Vector2(enemys[j].x + 16, enemys[j].y + 16);
                    var pp = new Vector2(plasmas[i].x + 48 * Math.sin(plasmas[i].rotation * Math.PI / 180), plasmas[i].y - 48 * Math.cos(plasmas[i].rotation * Math.PI / 180));

                    if (pp.distanceTo(ep) < 8) {
                        score += MathHelp.getRandomNumber(10, 50);
                        explode.x = ep.x;
                        explode.y = ep.y;
                        stage.removeChild(enemys[j]);
                        stage.removeChild(plasmas[i]);
                        plasmas.splice(i--, 1);
                        enemys.splice(j--, 1);

                        var explodeClone = explode.clone();
                        explodeClone.gotoAndPlay("explode");
                        explodeClone.onAnimationEnd = function () {
                            stage.removeChild(this);
                        };
                        stage.addChild(explodeClone);
                        SoundJS.play("break", SoundJS.INTERUPT_LATE);
                    }
                }
            }
        }

        if (energyHeld) {
            for (var i = 0; i < 5; i++) {
                var r = ship.rotation - 30 + i * 15;
                var v = new Vector2(-Math.sin(r * (Math.PI / -180)) * 10, -Math.cos(r * (Math.PI / -180)) * 10);
                var p = new Plasma(v, plasmaImg);
                p.x = ship.x;
                p.y = ship.y;
                p.rotation = r;
                plasmas.push(p);
                stage.addChild(p);
            }
        
            SoundJS.play("laser", SoundJS.INTERUPT_LATE);
            ship.fire();
        }

        if (shootHeld) {
            var v = new Vector2(-Math.sin(ship.rotation * (Math.PI / -180)) * 10, -Math.cos(ship.rotation * (Math.PI / -180)) * 10);
            var p = new Plasma(v, plasmaImg);
            p.x = ship.x;
            p.y = ship.y;
            p.rotation = ship.rotation;
            plasmas.push(p);
            stage.addChild(p);
       
            SoundJS.play("laser", SoundJS.INTERUPT_LATE);
            ship.fire();
        }


        if (lfHeld) {
            ship.rotation -= 2;
        }
        if (rtHeld) {
            ship.rotation += 2;
        }

      
        for (var k in grids) {
            if (grids[k].x < -63) {
                grids[k].x = 370;
            }
            grids[k].x--;
        }

     
        fpsLabel.text = Math.round(Ticker.getMeasuredFPS()) + " FPS";
    }


    stage.update();

}





document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
var KEYCODE_SPACE = 32; 
var KEYCODE_UP = 38; 	
var KEYCODE_LEFT = 37; 	
var KEYCODE_RIGHT = 39; 
var KEYCODE_W = 87; 		
var KEYCODE_A = 65; 		
var KEYCODE_D = 68; 		
var KEYCODE_J = 74;
var img = new Image();

function handleKeyDown(e) {

    if (!e) { var e = window.event; }
    switch (e.keyCode) {
        case KEYCODE_SPACE: energyHeld = true; break;
        case KEYCODE_J: shootHeld = true; break;
        case KEYCODE_A: lfHeld = true; break;
        case KEYCODE_LEFT: lfHeld = true; break;
        case KEYCODE_D: rtHeld = true; break;
        case KEYCODE_RIGHT: rtHeld = true; break;
    }
}

function handleKeyUp(e) {

    if (!e) { var e = window.event; }
    switch (e.keyCode) {
        case KEYCODE_SPACE: energyHeld = false; break;
        case KEYCODE_J: shootHeld = false; break;
        case KEYCODE_A: lfHeld = false; break;

        case KEYCODE_LEFT: lfHeld = false; break;
        case KEYCODE_D: rtHeld = false; break;
        case KEYCODE_RIGHT: rtHeld = false; break;
    }
}
