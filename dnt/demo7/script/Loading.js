
Loading = function (text, fontSize, baseFontSize, color, position, interval, font, bolder) {
    this.text = text;
    this.fontSize = fontSize;
    this.baseFontSize = baseFontSize;
    this.color = color;
    this.position = position;
    this.interval = interval;
    this.font = font;
    this.bolder = bolder;
    return this.init();
}

Loading.prototype.init = function () {
    var text = [];
    var _this = this;
    var words = _this.text.split("");
    for (i in words) {
        text.push({
            "text": words[i],
            "fontSize": _this.fontSize,
            "baseFontSize": _this.baseFontSize,
            "color": _this.color,
            "position": new Vector2(_this.position.x + i * _this.interval, _this.position.y),
            "font": _this.font,
            "bolder": _this.bolder
        });

    }
    return text;
}


var loading = new Loading("Loading", 30, 30, "#ffffff", new Vector2(130, 40), 15, "宋体", "bolder");
var loadingCanvas = document.createElement('canvas');
loadingCanvas.width = 260;
loadingCanvas.height = 150;

var cxt = loadingCanvas.getContext("2d");
cxt.fillStyle = loading[0].color;
function drawLoading() {
    for (i in loading) {
        cxt.font = loading[i].bolder + " " + loading[i].fontSize + "px " + loading[i].font;
        cxt.fillText(loading[i].text, loading[i].position.x, loading[i].position.y);
    }

}
var currentMap = 0;
function changeFontSize() {
    if (currentMap > 400) currentMap = 0;
    currentMap += 5;
    if (parseInt(currentMap / 40) <= loading.length - 1) {
        loading[parseInt(currentMap / 40)].fontSize = 2 * loading[0].baseFontSize - currentMap % 40;
    }
    if (parseInt(currentMap / 40) + 1 <= loading.length - 1) {

        loading[parseInt(currentMap / 40) + 1].fontSize = currentMap % 40 + loading[0].baseFontSize;
    }
}
function draw() {
    cxt.clearRect(0, 0, loadingCanvas.width, loadingCanvas.height);
    drawLoading();
    changeFontSize();
}
setInterval(draw, 15);