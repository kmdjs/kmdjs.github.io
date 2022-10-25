/// <reference path="PE.js" />

/// <reference path="Math/Vector2.js" />
/// <reference path="class.min.js" />
/// <reference path="../z__scrap/class.js" />
PE.World = Class.create((function () {
    function initialize(gravity) {
        PE.World.gravity = gravity;
    }
    function update(dt) {
        applyForces(dt);
        PE.CollisionManagement.collisionDetection();

    }
    function addBody(body) {
        PE.Objects.push(body);
    }
    function applyForces(dt) {
        for (var i = 0; i < PE.Objects.length; i++) {
            var obj = PE.Objects[i];
            var f = PE.Vector2.multiply(PE.World.gravity, obj.mass);
            obj.force.addSelf(f);
            obj.integrateVelocity(dt);
            obj.clearForce();



            obj.integrateRotation(dt);

            obj.integratePosition(dt);
        }
    }
    return {

        initialize: initialize,
        addBody: addBody.setStatic(),
        update: update.setStatic()
    };

} ()));

PE.World.gravity = new PE.Vector2(0, 9.8);
