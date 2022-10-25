var Ball = function (p, r) {
    this.p = p;
    this.r = r;
    this.sqrR = this.r * this.r;
}
Ball.prototype = {

    intersect: function (ray) {
        var v = ray.origin.sub(this.p);
    var a0 = v.sqrLength() - this.sqrR;
    var np = ray.direction;
    var dotV = np.dot(v);
    if (dotV <= 0) {
        var discr = dotV * dotV - a0;
        if (discr >= 0) {
            return ray.getPoint(-dotV - Math.sqrt(discr));
        }
    }
    return null;
}
}