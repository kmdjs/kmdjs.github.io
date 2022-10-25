/// <reference path="../PE.js" />

/// <reference path="../Math/Vector2.js" />
/// <reference path="class.min.js" />

PE.BodyCounter = Class.create((function () {

    function get() {
        return PE.BodyCounter.ID++;
    }

    return {
        get: get.setStatic()
    };

} ()));
PE.BodyCounter.ID = 0;
