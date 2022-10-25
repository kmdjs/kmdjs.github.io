
(function (window) {

    var MenuItem = function (x, y, targetColor, targetWidth, targetHeight, text, font, color) {

        this.initialize(x, y, targetColor, targetWidth, targetHeight, text, font, color);
    }

    MenuItem.prototype = new Container();

    MenuItem.prototype.Container_initialize = MenuItem.prototype.initialize;

    MenuItem.prototype.initialize = function (x, y, targetColor, targetWidth, targetHeight, text, font, color) {

        this.Container_initialize();
        this.x = x;
        this.y = y;
        var target = new Shape();
        target.alpha =0.01;
        target.graphics.beginFill(targetColor).drawRect(0, 0, targetWidth, targetHeight);
        this.addChild(target);
        this.txt = new Text(text, font, color);
        this.txt.textBaseline = "top";
        this.addChild(this.txt);

    }

    MenuItem.prototype.setTxtColor = function (color) {

        this.txt.color = color;

    }

    window.MenuItem = MenuItem;

} (window));