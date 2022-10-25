/// <reference path="../PE.js" />

/// <reference path="../Math/Vector2.js" />
/// <reference path="../ObjectManagement.js" />

PE.Body = Class.create((function () {
 
    function initialize() {
        this.id = -1;
        this.bodyType = PE.BodyType.Dynamic;
        this.ignoreGravity = true;
        this.enabled = true;
        this.friction = 0.2;
        this.restitution = 1.0;

        this.position = PE.Vector2.Zero;
      
        this.mass = 1;

        this.speed = PE.Vector2.Zero;

        this.force = PE.Vector2.Zero;
        this.rotation = 0;
        this.palstance = 0;
        this.imgUrl = "";
        PE.World.addBody(this);


    }

    function integrateRotation(dt) {

        if (this.rotation >= 360) this.rotation %= 360;
        this.rotation += this.palstance * 180 * dt / Math.PI;
    }
    function integrateVelocity(dt) {

        this.speed.x += (this.force.x / this.mass) * dt;
        this.speed.y += (this.force.y / this.mass) * dt;
    }
    function integratePosition(dt) {
        this.position.x += this.speed.x * dt;
        this.position.y += this.speed.y * dt;

    }
    function clearForce() {
        this.force.x = 0;
        this.force.y = 0;
    }

    function getInvMass() {
        if (this.bodyType === PE.BodyType.Static) {
            return 0;
        }
        else {
            return 1 / this.mass;
        }

    }
    return {
        initialize: initialize,
        integrateVelocity: integrateVelocity,
        integratePosition: integratePosition,
        clearForce: clearForce,
        getInvMass: getInvMass,
        integrateRotation: integrateRotation
    };

} ()));
PE.BodyType = {

    Static: "Static",

    Dynamic: "Dynamic"
}

