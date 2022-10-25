    var Vector2 = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };
    Vector2.prototype = {
        add: function (v) {
            this.x+=v.x;
            this.y+=v.y;
        },
        sub: function (v) {
            return new Vector2(this.x - v.x, this.y - v.y);
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
