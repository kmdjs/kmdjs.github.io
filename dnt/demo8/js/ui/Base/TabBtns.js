define(function () {


    var TabBtns = function () {


        this.initialize(arguments);
    }

    TabBtns.prototype = new CJ.Container();

    TabBtns.prototype.Container_initialize = TabBtns.prototype.initialize;

    TabBtns.prototype.initialize = function (tabBtns) {
        this.Container_initialize();
        for (var i = 0; i < tabBtns.length; i++) {
            tabBtns[i].index = i;
            this.addChild(tabBtns[i]);
        }
    }


    return TabBtns;
})