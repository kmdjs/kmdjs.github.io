/// <reference path="Vector2.js" />
(function (window) {
    var MathHelp = {};
    MathHelp.getRandomNumber = function (min, max) {
        return (min + Math.floor(Math.random() * (max - min + 1)))
    }

    MathHelp.intersectDetectionTwoLine = function (p1, p2, p3, p4) {


    }
    window.MathHelp = MathHelp;
} (window));