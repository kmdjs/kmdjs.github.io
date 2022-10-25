
define(function () {
    var imgobjectset = []
    var clocking = 0;

    ProgressFrame.prototype = new CJ.Container();

    function ProgressFrame() {
        this.initialize();
    }

    ProgressFrame.prototype.Container_initialize = ProgressFrame.prototype.initialize; //unique to avoid overiding base class

    ProgressFrame.prototype.initialize = function () {

        this.Container_initialize();
        this.currentIndex = 0;
        this.imageCount = 3;
        imgobjectset["background0"] = Resource.getBitmap("bg_1000");
        imgobjectset["background1"] = Resource.getBitmap("bg_1001");
        imgobjectset["background2"] = Resource.getBitmap("bg_678");
        imgobjectset["background2"].alpha = 0;
        imgobjectset["background1"].alpha = 0;
        this.addChild(imgobjectset["background0"], imgobjectset["background1"], imgobjectset["background2"]);
        CJ.Ticker.addListener(this);

    }




    ProgressFrame.prototype.destory = function () {

        CJ.Ticker.removeListener(this);
        this.removeAllChildren();
    }



    ProgressFrame.prototype.tick = function () {
        clocking += 1000 / 60;
        if (clocking >= 3000) {
            clocking = 0;

            var current = this.currentIndex;
            var next = this.currentIndex + 1;
            if (next >= this.imageCount) {
                next = 0;
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            CJ.Tween.get(imgobjectset["background" + current])
                                   .to({ alpha: 0 }, 1500);
            CJ.Tween.get(imgobjectset["background" + next])
                                   .to({ alpha: 1 }, 1500);
        }


    }
    return ProgressFrame;
});