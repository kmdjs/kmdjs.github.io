//bg 面板背景
//width面板宽度
//height面板高度
//visibleX, visibleY, visibleWidth, visibleHeight可视区域
//scrollBarX是否显示X轴滚动条
//scrollBarY是否显示Y轴滚动条
function Panel(bg, x, y, width, height, visibleX, visibleY, visibleWidth, visibleHeight) {
    this.initialize(bg, x, y, width, height, visibleX, visibleY, visibleWidth, visibleHeight);
}

Panel.prototype = new CJ.Container();



// constructor:
Panel.prototype.super_initialize = Panel.prototype.initialize;

Panel.prototype.initialize = function (bg, x, y, width, height, visibleX, visibleY, visibleWidth, visibleHeight) {
    this.super_initialize();


    this.panelCTT = new CJ.Container();
    // masks can only be shapes.
    this.visibleArea = new CJ.Shape();
    this.x = x;
    this.y = y;
    // only the drawPolyStar call is needed for the mask to work:
    this.visibleArea.graphics.beginStroke("#fff").setStrokeStyle(4).drawRect(this.x + visibleX, this.y + visibleY, visibleWidth, visibleHeight).closePath();
    this.mask = this.visibleArea;
    this.panelCTT.addChild(bg);
    this.addChild(this.panelCTT);

    var THIS = this;
    var sb = new ScrollBar(Resource.getBitmap("button_793_2"), Resource.getBitmap("button_794_2"), Resource.getBitmap("scroll"), visibleHeight, height)
    this.addChild(sb);
    sb.scroll = function (xx) {
        THIS.panelCTT.y= -xx;
    }
}







