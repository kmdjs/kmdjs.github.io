define(function () {


    var Tabs = function (tabBtns, pages) {
        this.initialize(tabBtns, pages);


    }


    Tabs.prototype = new CJ.Container();

    Tabs.prototype.Container_initialize = Tabs.prototype.initialize;

    Tabs.prototype.initialize = function (tabBtns, pages) {
        this.Container_initialize();


        this.tabBtns = tabBtns;
        this.pages = pages;
        this.currentIndex = 0;
        this.select(currentIndex);
        for (var i = 0; i < this.tabBtns.length; i++) {

            this.tabBtns[i].onClick = function () {


            }
        }
        this.addChild(tabBtns);
        this.addChild(pages);
    }

    Tabs.prototype.select = function (index) {

            for (var j = 0; j < this.tabBtns.length; j++) {
                this.tabBtns[j].unSelect();

                this.pages[j].hidden();
            }
            this.tabBtns[index].select();
            this.pages[index].show();
        
    }
    return Tabs;
})