
function ScrollBar(upBtn, downBtn, scrollBar, scrollHeight, panelHeight) {
    this.initialize(upBtn, downBtn, scrollBar, scrollHeight, panelHeight);
}

ScrollBar.prototype = new CJ.Container();



// constructor:
ScrollBar.prototype.super_initialize = ScrollBar.prototype.initialize;

ScrollBar.prototype.initialize = function (upBtn, downBtn, scrollBar, scrollHeight, panelHeight) {
    this.super_initialize();

    scrollBar.scaleY = ((scrollHeight - 2 * 0.65 * downBtn.image.height) / scrollBar.image.height) * scrollHeight / panelHeight;

    this.addChild(upBtn, downBtn, scrollBar);
    upBtn.scaleX = upBtn.scaleY = downBtn.scaleX = downBtn.scaleY = 0.65;
    scrollBar.y = upBtn.image.height * 0.65;
    downBtn.y = scrollHeight - downBtn.image.height * 0.65;
    var THIS = this;
    scrollBar.onPress = function (evt) {
        var offset = { x: scrollBar.x - evt.stageX, y: scrollBar.y - evt.stageY };
        evt.onMouseMove = function (ev) {
            //target.x = ev.stageX + offset.x;
            console.log(offset.y)
//            if (scrollBar.y > upBtn.image.height * 0.65 || (evt.stageY - ev.stageY) < 0) {
//                scrollBar.y = ev.stageY + offset.y;

//            } else {
//                scrollBar.y = upBtn.image.height * 0.65;
//            }
            if (scrollBar.y + scrollBar.image.height * scrollBar.scaleY < downBtn.y || (evt.stageY - ev.stageY) > 0) {

                if (scrollBar.y > upBtn.image.height * 0.65 || (evt.stageY - ev.stageY) < 0) {
                    scrollBar.y = ev.stageY + offset.y;

                } else {
                    scrollBar.y = upBtn.image.height * 0.65;
                }
            //    scrollBar.y = ev.stageY + offset.y;
            
            } else {

                scrollBar.y = downBtn.y - (scrollBar.image.height * scrollBar.scaleY);
            }

          
            THIS.scroll(scrollHeight * (scrollBar.y - upBtn.image.height * 0.65) / (scrollBar.image.height * scrollBar.scaleY));
            //  }
        }
    }

}

ScrollBar.prototype.scroll = function () { 

}







