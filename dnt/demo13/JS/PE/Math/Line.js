/// <reference path="../PE.js" />

/// <reference path="../Math/Vector2.js" />
/// <reference path="class.min.js" />

PE.Line = Class.create((function () {

    function initialize(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = this.p1.distanceTo(p2);
    }
    function getVerticalCrossoverPoint(v) {
        if (this.p2.x === this.p1.x) { return new PE.Vector2(this.p1.x, v.y); }
        if (this.p2.y === this.p1.y) { return new PE.Vector2(v.x, this.p1.y); }
        var k = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
        var cx = (k * k * this.p1.x + v.y * k + v.x - this.p1.y * k) / (k * k + 1);
        var cy = k * cx - k * this.p1.x + this.p1.y;
        return new PE.Vector2(cx, cy);
    }

    function getTwoLineCrossoverPoint(l1, l2) {
        var y0 = l1.p1.y;
        var y1 = l1.p2.y;
        var y2 = l2.p1.y;
        var y3 = l2.p2.y;
        var x0 = l1.p1.x;
        var x1 = l1.p2.x;
        var x2 = l2.p1.x;
        var x3 = l2.p2.x;
        if (y3 === y2) {
            y0 = l2.p1.y;
            y1 = l2.p2.y;
            y2 = l1.p1.y;
            y3 = l1.p2.y;
            x0 = l2.p1.x;
            x1 = l2.p2.x;
            x2 = l1.p1.x;
            x3 = l1.p2.x;
        }

        var y = ((y0 - y1) * (y3 - y2) * x0 + (y3 - y2) * (x1 - x0) * y0 + (y1 - y0) * (y3 - y2) * x2 + (x2 - x3) * (y1 - y0) * y2) / ((x1 - x0) * (y3 - y2) + (y0 - y1) * (x3 - x2));

        var x = x2 + (x3 - x2) * (y - y2) / (y3 - y2);
        return new PE.Vector2(x, y);
    }
    return {
        initialize: initialize,
        getVerticalCrossoverPoint: getVerticalCrossoverPoint,
        getTwoLineCrossoverPoint: getTwoLineCrossoverPoint.setStatic()
    };

} ()));
