/// <reference path="../PE.js" />

/// <reference path="../Math/Vector2.js" />
/// <reference path="../ObjectManagement.js" />
/// <reference path="../sylvester.src.js" />



PE.Rect = Class.create(PE.Body, (function () {
    function initialize($super) {
        $super();
        this.type = "Rect";

        this.width = 2;
        this.height = 2;
    }

    function getRotationalInertia() {

        return this.mass * (this.width * this.width + this.height * this.height) / 12
    }

    function getInvRotationalInertia() {
        if (this.bodyType === PE.BodyType.Static) {
            return 0;
        }
        else {
            return 12 / (this.mass * (this.width * this.width + this.height * this.height));
        }

    }
    function getFourVertexCoordinates() {
        var points = [];
        var v1 = new PE.Vector2(this.position.x - this.width / 2, this.position.y - this.height / 2);
        var v2 = new PE.Vector2(this.position.x + this.width / 2, this.position.y - this.height / 2);
        var v3 = new PE.Vector2(this.position.x + this.width / 2, this.position.y + this.height / 2);
        var v4 = new PE.Vector2(this.position.x - this.width / 2, this.position.y + this.height / 2);
        var rv = new PE.Vector2(this.position.x, this.position.y);
        v1.rotate(this.rotation * Math.PI / 180, rv);
        v2.rotate(this.rotation * Math.PI / 180, rv);
        v3.rotate(this.rotation * Math.PI / 180, rv);
        v4.rotate(this.rotation * Math.PI / 180, rv);
        points.push(v1);
        points.push(v2);
        points.push(v3);
        points.push(v4);
        return points;
    }
    return {
        initialize: initialize,
        getFourVertexCoordinates: getFourVertexCoordinates,
        getRotationalInertia: getRotationalInertia,
        getInvRotationalInertia: getInvRotationalInertia
    };

} ()));
