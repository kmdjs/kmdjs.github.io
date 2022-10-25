/* 
 * @requires Vector3
 */

Camera = function (eye, front, up, fov) {
    this.eye = eye;
    this.front = front;
    this.refUp = up;
    this.fov = fov;
    this.right = this.front.cross(this.refUp);
    this.up = this.right.cross(this.front);
    this.fovScale = Math.tan(this.fov * 0.5 * Math.PI / 180) * 2;
};

Camera.prototype = {

    generateRay: function (x, y) {
        var r = this.right.multiplyScalar((x - 0.5) * this.fovScale);
        var u = this.up.multiplyScalar((y - 0.5) * this.fovScale);
        return new Ray3(this.eye, this.front.add(r).add(u).normalize());
    }
};
