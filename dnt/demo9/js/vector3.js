var Vector3 = function (x, y, z) { this.x = x; this.y = y; this.z = z; };
Vector3.prototype = {
    dot: function (v) { return this.x * v.x + this.y * v.y + this.z * v.z; },
    sub: function (v) { return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z); },
    normalize: function () { return this.divideScalar(this.length()); },
    divideScalar: function (s) { return new Vector3(this.x / s, this.y / s, this.z / s); },
    length: function () { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); },
    sqrLength: function () { return this.x * this.x + this.y * this.y + this.z * this.z; },
    multiplyScalar: function (s) { return new Vector3(this.x * s, this.y * s, this.z * s); },
    add: function (v) { return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z); },
    cross: function (v) { return new Vector3(-this.z * v.y + this.y * v.z, this.z * v.x - this.x * v.z, -this.y * v.x + this.x * v.y); },
    round: function () { return new Vector3(Math.round(this.x), Math.round(this.y), Math.round(this.z)) },
    distanceTo: function (v) {   return Math.sqrt(this.distanceToSquared(v)); },
    distanceToSquared: function (v) {   var dx = this.x - v.x;   var dy = this.y - v.y; var dz = this.z - v.z;
       return dx * dx + dy * dy + dz * dz;
    }
}