/// <reference path="../PE.js" />

/// <reference path="../Math/Vector2.js" />
/// <reference path="class.min.js" />

PE.Math = Class.create((function () {

    
    function getRandomNumber(min, max) {
        return (min + Math.floor(Math.random() * (max - min + 1)))
    }
    return {
        getRandomNumber: getRandomNumber.setStatic()
    };

} ()));
