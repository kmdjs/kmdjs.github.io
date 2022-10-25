define(function () {
    //
    function Popup()
    {
        this.initialize();
    }
    Popup.prototype =new CJ.Container();

    // public properties:
    Popup.prototype.xButton = null;
    Popup.prototype.shareButton = null;
    Popup.prototype.okButton = null;
    Popup.prototype.gotoWorldButton = null;
    Popup.prototype.lowButtons = null;
    Popup.prototype.worldId = null;

    // constructor:
    Popup.prototype.Container_initialize = Popup.prototype.initialize; //unique to avoid overiding base class

    Popup.prototype.initialize = function ()
    {
        this.Container_initialize();
        this.lowButtons = [];
        this.scaleX = 0.1;
        this.scaleY = 0.1;
    }

    // public methods:
    Popup.prototype.showMe = function ()
    {
        CJ.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 600, Ease.backOut).wait(150).call(this.showTweenComplete);
    }

    Popup.prototype.showTweenComplete = function ()
    {
        //to be overriden
    }

    Popup.prototype.createBg = function ()
    {
        this.x = Util.pW(50);
        this.y = Util.pH(50);
        var bg = Util.getAssetBitmap("popupBase", true);
        this.addChildAt(bg, 0);
    }

    Popup.prototype.addTitle = function (assetType)
    {
        var title = util.getAssetBitmap(assetType, true);
        util.addChildAtPos(this, title, 0, -160);
    }


    Popup.prototype.createCloseButton = function ()
    {
        var THIS = this;
        THIS.xButton = util.makeGeneralButton("xButton", true);
        util.addChildAtPos(this, this.xButton, 340, -206);
        this.xButton.onClick = function (e) { THIS.buttonClickHandler(e, this) };
    }

    Popup.prototype.createShareButton = function ()
    {
        var THIS = this;
        this.shareButton = util.makeGeneralButton("shareButton", true);
        this.shareButton.name = "shareButton";
        this.shareButton.visible = false;
        this.lowButtons.push(this.shareButton);
    }

    Popup.prototype.createOkButton = function (assetType)
    {
        this.okButton = util.makeGeneralButton(assetType, true);
        this.okButton.name = assetType;
        this.lowButtons.push(this.okButton);
    }

    Popup.prototype.createGotoWorldButton = function ()
    {
        this.gotoWorldButton = util.makeGeneralButton("gotoWorldButton", true);
        this.gotoWorldButton.name = "gotoWorldButton";
        this.lowButtons.push(this.gotoWorldButton);
    }

    Popup.prototype.placeButtons = function ()
    {
        var THIS = this;
        var btn;
        var xCounter = 0;
        for (var i = 0; i < this.lowButtons.length; i++)
        {
            btn = this.lowButtons[i];
            btn.y = 170;
            btn.x = 340 - xCounter - util.getAssetW(btn.name) / 2
            xCounter += 10 + util.getAssetW(btn.name);
            btn.onClick = function (e) { THIS.buttonClickHandler(e, this) };
            this.addChild(btn);
        }
    }

    Popup.prototype.buttonClickHandler = function (e, target)
    {
        switch (target)
        {
            case this.xButton:
            case this.okButton:
                this.closeMe();
                break;
            case this.shareButton:
                trace("share button clicked");
                break;
            case this.gotoWorldButton:
                //TODO improve code
                this.parent.callbackParams = this.worldId;
                this.parent.viewPopupCallback = mgMain.gotoNewWorldPopupCallback;
                this.closeMe();
                break;
        }
    }

    Popup.prototype.closeMe = function ()
    {
        this.parent.closePopup();
    }

    Popup.prototype.enableButtons = function (isEnabled)
    {
        for (var i = 0; i < this.lowButtons.length; i++)
        {
            this.lowButtons[i].setEnabled(isEnabled);
        }
        this.xButton.setEnabled(isEnabled);
    }

    return Popup;
});

