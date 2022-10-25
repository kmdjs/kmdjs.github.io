PE.Circle = Class.create(PE.Body, (function () {

    function initialize($super) {
        $super();
        this.radius = 10;
        this.type = "Circle";
    }
    function getRotationalInertia() {

        return this.mass * this.radius * this.radius;
    }

    function getInvRotationalInertia() {
        if (this.bodyType === PE.BodyType.Static) {
            return 0;
        }
        else {
            return 1 / (this.mass * this.radius * this.radius);
        }
    }
    return {
        initialize: initialize,
        getRotationalInertia: getRotationalInertia,
        getInvRotationalInertia: getInvRotationalInertia
    };
})())