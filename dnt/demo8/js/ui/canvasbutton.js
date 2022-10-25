define(function () {
    // from CJ.Container
    CanvasButton.prototype = new CJ.Container();


    function CanvasButton(enabled, overDown, disabled) {
        var THIS = this;

        //get parent's initialize to THIS.super_initialize
        THIS.super_initialize = CanvasButton.prototype.initialize;

        // public properties:
        THIS.disabled = null;
        THIS.enabled = null;
        THIS.overDown = null;
        THIS.isEnabled = true;

        //constructor:
        THIS.initialize = function (disabled, enabled, overDown) {

            //execute parent's initialize
            THIS.super_initialize();
            THIS.disabled = disabled;
            THIS.enabled = enabled;
            THIS.overDown = overDown;
            if (THIS.disabled) {
                THIS.disabled.regX = THIS.disabled.image.width / 2;
                THIS.disabled.regY = THIS.disabled.image.height / 2;
                THIS.addChild(THIS.disabled);
            }
            if (THIS.enabled) {
                THIS.enabled.regX = THIS.enabled.image.width / 2;
                THIS.enabled.regY = THIS.enabled.image.height / 2;
                THIS.addChild(THIS.enabled);
            }
            if (!THIS.overDown) {
                THIS.overDown = enabled.clone();
            } else {
                THIS.overDown.regX = THIS.overDown.image.width / 2;
                THIS.overDown.regY = THIS.overDown.image.height / 2;
            }
            THIS.addChild(THIS.overDown);
            THIS.setEnabled(THIS.isEnabled);

            if (CJ.Touch.isSupported()) {
                THIS.onMouseOver = null;
                THIS.onMouseOut = null;
            }
            else {
                THIS.onPress = null;
                THIS.handleMouseUp = null;
            }
        }

        // public methods:
        THIS.onPress = function (e) {
            trace("CanvasButton.onPress");
            if (THIS.isEnabled) {
                THIS.overDown.visible = true;
                e.onMouseUp = function (e) { THIS.handleMouseUp(e) };
                // setTimeout(THIS.handleMouseUp, 200);
            }
        }

        THIS.handleMouseUp = function () {
            //trace("CanvasButton.handleMouseUp");
            if (THIS.isEnabled) {
                THIS.overDown.visible = false;
            }
        }

        THIS.onMouseOver = function (e) {
            //trace("CanvasButton.onMouseOver");
            if (THIS.isEnabled) {
                THIS.enabled.visible = false;
                THIS.overDown.visible = true;
            }
        }

        THIS.onMouseOut = function (e) {
            //trace("CanvasButton.handleMouseOut");
            if (THIS.isEnabled) {
                THIS.enabled.visible = true;
                THIS.overDown.visible = false;
            }
        }

        THIS.setEnabled = function (isEnabled) {
            THIS.isEnabled = isEnabled;
            THIS.mouseEnabled = isEnabled;
            if (!isEnabled && THIS.disabled) {
                THIS.disabled.visible = true;
                THIS.enabled.visible = false;
                THIS.overDown.visible = false;
            }
            else {
                THIS.enabled.visible = true;
                THIS.overDown.visible = false;
                if (THIS.disabled)
                    THIS.disabled.visible = false;
            }

        }

        // do not execute constructor if graphics not supplied.
        if (enabled)
        //execute initialize
            THIS.initialize(disabled, enabled, overDown);
    }
    return CanvasButton;
});
