define(function () {
    PopupViewer.prototype = new CJ.Container();
    function PopupViewer(isMask)
    {
        var THIS = this;

        // public properties:
        THIS.TWEEN_TIME = 300;
        THIS.blocker = null;
        THIS.poupsQueue = [];
        THIS.currentPopup = null;
        THIS.viewPopupCallback = null;
        THIS.callbackParams = null;

        //constructor:
        THIS.initialize = function (isMask)
        {
            THIS.super_initialize = PopupViewer.prototype.initialize; //unique to avoid overiding base class
            var g =  new CJ.Graphics();
            if(isMask){
                g.setStrokeStyle(1);
                g.beginStroke(new CJ.Graphics.getRGB(0, 0, 0));
                g.beginFill(new CJ.Graphics.getRGB(55, 55, 55));
                g.drawRect(0, 0, Util.pW(100), Util.pH(100));
                THIS.blocker = new CJ.Shape(g);
                THIS.blocker.alpha = 0.3;
                THIS.addChild(THIS.blocker);
                THIS.blocker.onPress = function (e) { };
            }
        }

        // public methods:
        THIS.addPopup = function (popup,isFirst)
        {
            if (isFirst)
                THIS.poupsQueue.unshift(popup); 
            else
               THIS.poupsQueue.push(popup); 
        }

        THIS.startViewing = function (viewPopupsCallback, callbackParams)
        {
            THIS.viewPopupCallback = viewPopupsCallback;
            THIS.callbackParams = callbackParams;
            THIS.showPopup();
        }

        THIS.closePopup = function ()
        {
            CJ.Tween.get(THIS.currentPopup).to({
                alpha: 0
            }, THIS.TWEEN_TIME).call(THIS.killPopup, [THIS.currentPopup]);
        }

        THIS.showPopup = function ()
        {
            THIS.currentPopup = THIS.poupsQueue.shift();
            THIS.currentPopup.alpha = 0;
            THIS.addChild(THIS.currentPopup);
            CJ.Tween.get(THIS.currentPopup).to({
                alpha: 1
            }, THIS.TWEEN_TIME);
        }

        THIS.killPopup = function (popup)
        {
            THIS.removeChild(popup);
            popup = null;

            if (THIS.poupsQueue.length > 0)
                THIS.showPopup();
            else
            {
                mgMain.endPopupView(THIS.viewPopupCallback, THIS.callbackParams);
                THIS.viewPopupCallback = null;
                THIS.callbackParams = null;
            }
        }

        THIS.hasPopups = function ()
        {
            return (THIS.poupsQueue.length > 0)
        }

        THIS.initialize();
    }

    return PopupViewer;
});

