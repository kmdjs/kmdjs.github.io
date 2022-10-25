define(function () {
    var ExperienceBar = function () {

        this.initialize();
    }

    ExperienceBar.prototype = new CJ.Container();

    ExperienceBar.prototype.Container_initialize = ExperienceBar.prototype.initialize;
    ExperienceBar.prototype.initialize = function () {
        this.Container_initialize();

        this.progressBmp = new CJ.Bitmap(Resource.getRes("bg_714"));

        var bgBmp = new CJ.Bitmap(Resource.getRes("bg_717"));
        this.addChild(this.progressBmp, bgBmp);

    }

    ExperienceBar.prototype.setProgress = function (percentage) {
        //for ie bug
        if (percentage <= 0) percentage = 0.001;
        if (percentage >1) percentage = 1;
        this.progressBmp.sourceRect = new CJ.Rectangle(0, 0, this.progressBmp.image.width * percentage, this.progressBmp.image.height);
    }


    return ExperienceBar;
});