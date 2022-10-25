/// <reference path="Vector2.js" />
(function (window) {
    var MathHelp = {};
    MathHelp.getRandomNumber = function (min, max) {
        return (min + Math.floor(Math.random() * (max - min + 1)))
    }

    MathHelp.randomNumberForArray = function (array) {
        var i = MathHelp.getRandomNumber(0, array.length - 1);
        return array[i];
    }

    window.MathHelp = MathHelp;
} (window));