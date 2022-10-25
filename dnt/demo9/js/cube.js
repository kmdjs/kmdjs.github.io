/// <reference path="vector3.js" />
var Cube = function (center, length) {
    this.center = center;
    this.length = length;
    this.hLength = length / 2;

    this.minX = this.center.x - this.hLength;
    this.maxX = this.center.x + this.hLength;
    this.minY = this.center.y - this.hLength;
    this.maxY = this.center.y + this.hLength;
    this.minZ = this.center.z - this.hLength;
    this.maxZ = this.center.z + this.hLength;
}

Cube.prototype.intersect = function (r3) {
    var d = r3.direction, p1 = r3.origin;
    var irs = [];
    var ir1 = this.getTIntersectPlane(p1, d, "z", this.center.z - this.hLength);
    var ir2 = this.getTIntersectPlane(p1, d, "z", this.center.z + this.hLength);
    var ir3 = this.getTIntersectPlane(p1, d, "x", this.center.x - this.hLength);
    var ir4 = this.getTIntersectPlane(p1, d, "x", this.center.x + this.hLength);
    var ir5 = this.getTIntersectPlane(p1, d, "y", this.center.y - this.hLength);
    var ir6 = this.getTIntersectPlane(p1, d, "y", this.center.y + this.hLength);

    if (ir1) irs.push(ir1);
    if (ir2) irs.push(ir2);
    if (ir3) irs.push(ir3);
    if (ir4) irs.push(ir4);
    if (ir5) irs.push(ir5);
    if (ir6) irs.push(ir6);

    if (irs.length === 1) {
        return irs[0].cp;
    }
    else if (irs.length === 2) {
        if (irs[0].t > irs[1].t) return irs[1].cp;
        if (irs[1].t > irs[0].t) return irs[0].cp;
    }

    return null;
}

Cube.prototype.getTIntersectPlane = function (p1,d,type,value) {

    var _intersectResult = [];
    var t, cp;
    if (type === "z")
    {     
        t= (value - p1.z) / d.z;
        cp = p1.add(d.multiplyScalar(t));       
        if (cp.x < this.maxX && cp.x > this.minX && cp.y < this.maxY && cp.y > this.minY) return { t: t, cp: cp };
    }
    if (type === "x") {
         t = (value - p1.x) / d.x;
         cp = p1.add(d.multiplyScalar(t));
         if (cp.z < this.maxZ && cp.z > this.minZ && cp.y < this.maxY && cp.y > this.minY) return { t: t, cp: cp };
    }
    if (type === "y") {
         t = (value - p1.y) / d.y;
         cp = p1.add(d.multiplyScalar(t));
         if (cp.x < this.maxX && cp.x > this.minX && cp.z < this.maxZ && cp.z > this.minZ) return { t: t, cp: cp };
    }

    return null;
}

Cube.prototype.intersectFrontPlane = function (r3) {
    var ir = this.getTIntersectPlane(r3.origin, r3.direction, "z", this.center.z + this.hLength);
    if (ir) return ir.cp;
    return null;
}