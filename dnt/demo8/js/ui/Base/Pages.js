define(function () {


    var Pages = function () {


        this.initialize(arguments);
    }

    Pages.prototype = new CJ.Container();

    Pages.prototype.Container_initialize = Pages.prototype.initialize;

    Pages.prototype.initialize = function (pages) {
        this.Container_initialize();
        for (var i = 0; i < pages.length; i++) {
            pages[i].index = i;
            this.addChild(pages[i]);
        }
    }


    return Pages;
})