
 Vector2 = function (x, y) {

    this.x = x || 0;
    this.y = y || 0;

};

Vector2.prototype = {
  
    constructor: Vector2,

    set: function (x, y) {

        this.x = x;
        this.y = y;

        return this;

    },

    copy: function (v) {

        this.x = v.x;
        this.y = v.y;

        return this;

    },

    clone: function () {

        return new THREE.Vector2(this.x, this.y);

    },


    add: function (v1, v2) {

        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;

        return this;

    },

    addSelf: function (v) {

        this.x += v.x;
        this.y += v.y;

        return this;

    },

    sub: function (v1, v2) {

        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;

        return this;

    },

    subSelf: function (v) {

        this.x -= v.x;
        this.y -= v.y;

        return this;

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


    negate: function () {

        return this.multiplyScalar(-1);

    },

    dot: function (v) {

        return this.x * v.x + this.y * v.y;

    },

    lengthSq: function () {

        return this.x * this.x + this.y * this.y;

    },

    length: function () {

        return Math.sqrt(this.lengthSq());

    },

    normalize: function () {

        return this.divideScalar(this.length());

    },

    distanceTo: function (v) {
        return Math.sqrt(this.distanceToSquared(v));
    },

    distanceToSquared: function (v) {
        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    },


    setLength: function (l) {

        return this.normalize().multiplyScalar(l);

    },

    equals: function (v) {

        return ((v.x === this.x) && (v.y === this.y));

    },
    rotateSelf: function (p, theta) {
        var v = new Vector2();
      
        v.sub(this, p);
        theta *= Math.PI / 180;
        var R = [[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]];
        this.x = p.x + R[0][0] * v.x + R[0][1] * v.y;
        this.y = p.y + R[1][0] * v.x + R[1][1] * v.y;
    },
    
 
    reflectionSelf: function (v) {
        var nv = v.normalize();
        this.subSelf(nv.multiplyScalar(2 * this.dot(nv)));
    },
    distanceToLine: function (p1, p2) {
        if (p2.x === p1.x) {
            return Math.abs(this.y - p1.y);
        }
        else if (p2.y === p1.y) {
            return Math.abs(this.x - p1.x);
        }
        else {
            var A = (p2.y - p1.y) / (p2.x - p1.x);
            var B = -1;
            var C = p1.y - A * p1.x;
            return Math.abs(A * this.x + B * this.y + C) / Math.sqrt(A * A + B * B);
        }
    },
    isInLineSegment: function (p1,p2) {
        var tempP = new Vector2.sub(p1, p2).vertical();
        var d = p1.distanceTo(p2);
        var d1 = this.distanceToLine(p1, new Vector2().add(p1, tempP));
        var d2 = this.distanceToLine(p2, new Vector2().add(p2, tempP));
        if (Math.round(d1 + d2) == Math.round(d)) return true;
        return false;
    },
    vertical: function () {
        return new Vector2(-this.y, this.x);
    }

};


Vector2.sub = function (v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y)
}


Vector2.rotate = function (p1, p2, theta) {
    var v = new Vector2();
    v.sub(p1, p2);
    theta *= Math.PI / 180;
    var R = [ [Math.cos(theta), -Math.sin(theta)],  [Math.sin(theta), Math.cos(theta)] ];
    return new Vector2(p2.x + R[0][0] * v.x + R[0][1] * v.y, p2.y + R[1][0] * v.x + R[1][1] * v.y);
}