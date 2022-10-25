(function (window) {
    MGButton.prototype = new Container();
    function MGButton(disabled, enabled, overDown) {
        var THIS = this;
        THIS.super_initialize = MGButton.prototype.initialize; //unique to avoid overiding base class

        // public properties:
        THIS.disabled = null;
        THIS.enabled = null;
        THIS.overDown = null;
        THIS.isEnabled = true;

        //constructor:
        THIS.initialize = function (disabled, enabled, overDown) {
            THIS.super_initialize();
            THIS.disabled = disabled;
            THIS.enabled = enabled;
            THIS.overDown = overDown;
            if (THIS.disabled)
                THIS.addChild(THIS.disabled);
            if (THIS.enabled)
                THIS.addChild(THIS.enabled);
            if (!THIS.overDown) {
                THIS.overDown = enabled.clone();
            }
            THIS.addChild(THIS.overDown);
            THIS.setEnabled(THIS.isEnabled);

            if (Touch.isSupported()) {
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
            trace("MGButton.onPress");
            if (THIS.isEnabled) {
                THIS.overDown.visible = true;
                e.onMouseUp = function (e) { THIS.handleMouseUp(e) };
                // setTimeout(THIS.handleMouseUp, 200);
            }
        }

        THIS.handleMouseUp = function () {
            //trace("MGButton.handleMouseUp");
            if (THIS.isEnabled) {
                THIS.overDown.visible = false;
            }
        }

        THIS.onMouseOver = function (e) {
            //trace("MGButton.onMouseOver");
            if (THIS.isEnabled) {
                THIS.enabled.visible = false;
                THIS.overDown.visible = true;
            }
        }

        THIS.onMouseOut = function (e) {
            //trace("MGButton.handleMouseOut");
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
            THIS.initialize(disabled, enabled, overDown);
    }
    window.MGButton = MGButton;
} (window));

