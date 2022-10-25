define(function () {


    var Page = function () {


        this.initialize();
    }

    Page.prototype = new CJ.Container();

    Page.prototype.Container_initialize = Page.prototype.initialize;

    Page.prototype.initialize = function () {
        this.Container_initialize();
    
    }

    Page.prototype.show = function () {
        this.visible = true;
    }

    Page.prototype.hidden = function () {
        this.visible = false;
    }
    return Page;
})