define(['ui/Popup'], function (Popup) {
    LevelUpPopup.prototype = new Popup();
    function LevelUpPopup(level, bonus)
    {
        var THIS = this;
        THIS.super_initialize = LevelUpPopup.prototype.initialize; //unique to avoid overiding base class

        // public properties:
        THIS.levelText = null;
        THIS.xpText = null;
        THIS.xpTextBg = null;
        THIS.newRecord = null;

        //constructor:
        THIS.initialize = function ()
        {
            THIS.super_initialize();
            THIS.createBg();
            THIS.addTitle("levelUpTitle");
            THIS.createCloseButton();
            THIS.createOkButton("okButton");
            THIS.createShareButton();
            THIS.placeButtons();

            //level:
            var strokes = [{ color: "#ffffff" }, { color: "#5d00bd", lineWidth: 5}];
            THIS.levelText = new TextStroke(level, "24px Bowlby One SC", strokes, "center");
            THIS.levelText.x = 133;
            THIS.levelText.y = -146;
            THIS.addChild(THIS.levelText);

            // bonus:
            var bonusBg = util.getAssetBitmap(bonus.type, true);
            util.addChildAtPos(THIS, bonusBg, 0, 0);

            strokes = [{ color: "#44B6E1" }, { color: "#0e6ca9", lineWidth: 3 }, { color: "#ffffff", lineWidth: 7}];
            var bonusText = new TextStroke("+" + bonus.amount.toString(), "48px Bowlby One SC", strokes, "center");
            util.addChildAtPos(THIS, bonusText, -11,-39);

            if (bonus.amount != 0)
            {


            }

            THIS.showMe();
        }

        // public methods:



        THIS.initialize();
    }

    return LevelUpPopup;
});

