/* File Created: May 5, 2012 */
(function (window) {

    var Vector2 = function (x, y) {
        this.initialize(x, y);
    };
    Vector2.prototype = {
        initialize: function (x, y) {
            this.x = x || 0;
            this.y = y || 0;
        },
        set: function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        },
        sub: function (v) {
            return new Vector2(this.x - v.x, this.y - v.y);
        },
        subSelf: function (v) {
            this.x = this.x - v.x,
            this.y = this.y - v.y;
        },
        multiplyScalar: function (s) {
            this.x *= s;
            this.y *= s;
            return this;
        },
        divideScalar: function (s) {
            if (s) {
                this.x /= s;
                this.y /= s;
            } else {
                this.set(0, 0);
            }
            return this;
        },

        rotateSelf: function (p, theta) {
            //先过原点
            var v = this.sub(p);
            theta *= Math.PI / 180;
            var R = [[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]];
            this.x = p.x + R[0][0] * v.x + R[0][1] * v.y;
            this.y = p.y + R[1][0] * v.x + R[1][1] * v.y;
        },
        rotate: function (p, theta) {
            //先过原点
            var v = this.sub(p);

            theta *= Math.PI / 180;
            var R = [[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]];

            return new Vector2(p.x + R[0][0] * v.x + R[0][1] * v.y, p.y + R[1][0] * v.x + R[1][1] * v.y);
        },
        length: function () {
            return Math.sqrt(this.lengthSq());
        },
        normalize: function () {
            return this.divideScalar(this.length());
        },
        lengthSq: function () {
            return this.x * this.x + this.y * this.y;
        },
        distanceToSquared: function (v) {
            var dx = this.x - v.x,
             dy = this.y - v.y;
            return dx * dx + dy * dy;
        },
        distanceTo: function (v) {
            return Math.sqrt(this.distanceToSquared(v));
        },
        setLength: function (l) {
            return this.normalize().multiplyScalar(l);
        }
    };
    window.Vector2 = Vector2;
} (window));