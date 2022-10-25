
(function (window) {
    var MathHelp = function () {
    }
    MathHelp.getRandomNumber = function (min, max) {
        return (min +  Math.floor(Math.random() * (max - min + 1)))
    }
    window.MathHelp = MathHelp;
} (window));