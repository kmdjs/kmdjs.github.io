
PE.Vector2 = Class.create((function () {

    function initialize(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    function set(x, y) {
        this.x = x;
        this.y = y;
        return this;

    }
    function copy(v) {

        this.x = v.x;
        this.y = v.y;

        return this;

    }
    function clone() {

        return new PE.Vector2(this.x, this.y);

    }

    function add(v1, v2) {

        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;

        return this;

    }

    function addSelf(v) {

        this.x += v.x;
        this.y += v.y;

        return this;

    }

    function sub(v1, v2) {



        return new PE.Vector2(v1.x - v2.x, v1.y - v2.y);
    }

    function subSelf(v) {

        this.x -= v.x;
        this.y -= v.y;

        return this;

    }
    function multiply(v, s) {
        return new PE.Vector2(v.x * s, v.y * s);
    }
    function multiplyScalar(s) {

        this.x *= s;
        this.y *= s;

        return this;

    }

    function divideScalar(s) {

        if (s) {

            this.x /= s;
            this.y /= s;

        } else {

            this.set(0, 0);

        }

        return this;

    }


    function negate() {

        return this.multiplyScalar(-1);

    }

    function dot(v) {

        return this.x * v.x + this.y * v.y;

    }

    function lengthSq() {

        return this.x * this.x + this.y * this.y;

    }

    function length() {

        return Math.sqrt(this.lengthSq());

    }

    function normalize() {

        return this.divideScalar(this.length());

    }

    function distanceTo(v) {

        return Math.sqrt(this.distanceToSquared(v));

    }

    function distanceToSquared(v) {

        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;

    }


    function setLength(l) {

        return this.normalize().multiplyScalar(l);

    }

    function equals(v) {

        return ((v.x === this.x) && (v.y === this.y));

    }


    function distanceToLineTemp(v1, v2) {
        var A = (v2.y - v1.y) / (v2.x - v1.x);
        var B = -1;
        var C = v1.y - A * v1.x;
        return Math.abs(A * this.x + B * this.y + C) / Math.sqrt(A * A + B * B);
    }

    function distanceToLine(line) {
        if (line.p2.x === line.p1.x) {

            return Math.abs(this.x - line.p1.x);
        }
        else {
            var A = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
            var B = -1;
            var C = line.p1.y - A * line.p1.x;
            return Math.abs(A * this.x + B * this.y + C) / Math.sqrt(A * A + B * B);
        }
    }
    function rotate(angle, v) {

        var v1 = Vector.create([this.x, this.y]);
        var v2 = Vector.create([v.x, v.y]);
        var v3 = v1.rotate(angle, v2);
        this.x = v3.elements[0];
        this.y = v3.elements[1];
        return this;
    }

    function reflectionByLine(line) {
        var cp = line.getVerticalCrossoverPoint(this);
        this.reflectionByPoint(cp);
        return this;
    }
    function reflectionByPoint(point) {
        this.x = 2 * point.x - this.x;
        this.y = 2 * point.y - this.y;
        return this;
    }
    function angleFrom(v) {
        var v1 = Vector.create([this.x, this.y]);
        var v2 = Vector.create([v.x, v.y]);
        return v1.angleFrom(v2);
    }
    function normalizeSelf() {
        var inv = 1 / this.length();
        this.x = this.x * inv;
        this.y = this.y * inv;
    }
    function normalize() {
        var inv = 1 / this.length();
        return new PE.Vector2(this.x * inv, this.y * inv);
    }
    return {
        initialize: initialize,
        set: set,
        copy: copy,
        clone: clone,
        add: add.setStatic(),
        addSelf: addSelf,
        sub: sub.setStatic(),
        subSelf: subSelf,
        multiplyScalar: multiplyScalar,
        divideScalar: divideScalar,
        negate: negate,
        dot: dot,
        lengthSq: lengthSq,
        length: length,
        normalize: normalize,
        distanceTo: distanceTo,
        distanceToSquared: distanceToSquared,
        setLength: setLength,
        equals: equals,
        distanceToLine: distanceToLine,
        rotate: rotate,
        reflectionByLine: reflectionByLine,
        reflectionByPoint: reflectionByPoint,
        angleFrom: angleFrom,
        multiply: multiply.setStatic(),
        normalize: normalize,
        normalizeSelf: normalizeSelf

    };
} ()));

PE.Vector2.Zero = new PE.Vector2(0, 0);
