/// <reference path="../PE.js" />
/// <reference path="Shape/Circle.js" />
/// <reference path="Math/Line.js" />

/// <reference path="../Math/Vector2.js" />
/// <reference path="class.min.js" />
PE.CollisionManagement = Class.create((function () {
    var hitPoints = [];
    function initialize() {

    }

    function collisionDetection() {
    
        for (var i = 0; i < PE.Objects.length; i++) {
            for (var j = i + 1; j < PE.Objects.length; j++) {
                if (PE.Objects[i].type === "Circle" && PE.Objects[j].type === "Circle") {
            
                    collisionCCHandling(PE.Objects[i], PE.Objects[j]);
                }


                if ((PE.Objects[i].type === "Circle" && PE.Objects[j].type === "Rect") || (PE.Objects[i].type === "Rect" && PE.Objects[j].type === "Circle")) {
                    var c, r;
                    if (PE.Objects[i].type === "Circle") {
                        c = PE.Objects[i];
                        r = PE.Objects[j];
                    }
                    else {
                        r = PE.Objects[i];
                        c = PE.Objects[j];
                    }
                    var ps = r.getFourVertexCoordinates();
           
                    var L1 = new PE.Line(ps[0], ps[1]);
                    var L2 = new PE.Line(ps[2], ps[3]);
               
                    var L3 = new PE.Line(ps[0], ps[3]);
                    var L4 = new PE.Line(ps[1], ps[2]);

                    var v1 = new PE.Vector2(ps[1].x - ps[0].x, ps[1].y - ps[0].y);
                    var v2 = new PE.Vector2(ps[2].x - ps[1].x, ps[2].y - ps[1].y);
                    var v3 = new PE.Vector2(ps[3].x - ps[2].x, ps[3].y - ps[2].y);
                    var v4 = new PE.Vector2(ps[1].x - ps[3].x, ps[1].y - ps[3].y);


                    var h1 = c.position.distanceToLine(L1);
                    var h2 = c.position.distanceToLine(L2);
                    var h3 = c.position.distanceToLine(L3);
                    var h4 = c.position.distanceToLine(L4);
              
                    if (Math.round(h1 + h2 + h3 + h4) <= Math.round(r.height + r.width)) {
                        if (h1 <= c.radius) rebound(v1, L1, c, r, L3, L4);
                        if (h2 <= c.radius) rebound(v2, L2, c, r, L3, L4);
                        if (h3 <= c.radius) rebound(v3, L3, c, r, L1, L2);
                        if (h4 <= c.radius) rebound(v4, L4, c, r, L1, L2);
                    }
                    else if (h1 <= r.height && h2 <= r.height) {
                
                        if (h3 <= c.radius) rebound(v3, L3, c, r, L1, L2);
                        if (h4 <= c.radius) rebound(v4, L4, c, r, L1, L2);


                    } else if (h3 <= r.width && h4 <= r.width) {
                
                        if (h1 <= c.radius) rebound(v1, L1, c, r, L3, L4);
                        if (h2 <= c.radius) rebound(v2, L2, c, r, L3, L4);
                    } else {
            
                        if (c.position.distanceTo(ps[0]) <= c.radius) reboundByApex(ps[0], c, r);
                        if (c.position.distanceTo(ps[1]) <= c.radius) reboundByApex(ps[1], c, r);

                        if (c.position.distanceTo(ps[2]) <= c.radius) reboundByApex(ps[2], c, r);
                        if (c.position.distanceTo(ps[3]) <= c.radius) reboundByApex(ps[3], c, r);


                    }

                }
            }
        }
    }

    function resolveOverlap(c, r, p) {
 
        c.position.x += (c.radius - c.position.distanceTo(p)) * (c.position.x - p.x) / c.position.distanceTo(p);
        c.position.y += (c.radius - c.position.distanceTo(p)) * (c.position.y - p.y) / c.position.distanceTo(p);
    }

    function rebound(v, line, bodyA, bodyB, L1, L2) {

        var contactPoint = line.getVerticalCrossoverPoint(bodyA.position);
        var d1 = contactPoint.distanceToLine(L1);
        var d2 = contactPoint.distanceToLine(L2);
        var d;
        if (d1 > d2) { d = d2; } else { d = d1 };



        var v = PE.Vector2.sub(contactPoint, bodyA.position);
        v.multiplyScalar(L1.length / (bodyA.radius * 2));
        var tempCenter = PE.Vector2.add(contactPoint, v);

        var vA = bodyA.speed;
        var vB = bodyB.speed;
        var wA = bodyA.palstance;
        var wB = bodyB.palstance;

        var normal = new PE.Vector2();
        normal.x = tempCenter.x - bodyA.position.x;
        normal.y = tempCenter.y - bodyA.position.y;
        normal.normalizeSelf();
        var tangent = new PE.Vector2(normal.y, -normal.x);
        var rA = PE.Vector2.sub(contactPoint, bodyA.position);

        var rB = PE.Vector2.sub(contactPoint, bodyB.position);
        var vrn = normal.x * ((vA.x - wA * rA.y) - (vB.x - wB * rB.y)) + normal.y * ((vA.y + wA * rA.x) - (vB.y + wB * rB.x));

        var vrt = tangent.x * ((vA.x - wA * rA.y) - (vB.x - wB * rB.y)) + tangent.y * ((vA.y + wA * rA.x) - (vB.y + wB * rB.x));

        if (vrn > 0) {

            var normalMass = 1 / (bodyA.getInvMass() + bodyB.getInvMass() / (d * 2 / (d1 + d2)));

            var restitution = (bodyA.restitution + bodyB.restitution) / 2;

            var normalImpulse = -normalMass * vrn * (1 + restitution);

                bodyA.speed.x += normalImpulse * normal.x * bodyA.getInvMass();
                bodyA.speed.y += normalImpulse * normal.y * bodyA.getInvMass();
                bodyB.speed.x -= normalImpulse * normal.x * bodyB.getInvMass();
                bodyB.speed.y -= normalImpulse * normal.y * bodyB.getInvMass();



                wB -= (rB.x * normalImpulse * normal.y - rB.y * normalImpulse * normal.x) * bodyB.getInvRotationalInertia();
                bodyB.palstance = wB;

            if (vrt !== 0 ) {

                var tangentImpulse = normalImpulse * (bodyA.friction + bodyB.friction) / 2;

                if (vrt < 0)
                    tangentImpulse *= -1;

                var Ix = tangentImpulse * tangent.x;
                var Iy = tangentImpulse * tangent.y;

                bodyA.speed.x += Ix * bodyA.getInvMass();
                bodyA.speed.y += Iy * bodyA.getInvMass();

                wA += (rA.x * Iy - rA.y * Ix) * bodyA.getInvRotationalInertia();

                bodyB.speed.x -= Ix * bodyB.getInvMass();
                bodyB.speed.y -= Iy * bodyB.getInvMass();

                wB -= (rB.x * Iy - rB.y * Ix) * bodyB.getInvRotationalInertia();

                bodyA.palstance = wA;
                bodyB.palstance = wB;
            }
        }
        resolveOverlap(bodyA, bodyB, contactPoint)
    }
    function reboundByApex(p, c, r) {
        var pTemp = new PE.Vector2(p.x - c.speed.x, p.y - c.speed.y);
        var lTemp = new PE.Line(c.position, p);
        pTemp.reflectionByLine(lTemp);
        c.speed.x = pTemp.x - p.x;
        c.speed.y = pTemp.y - p.y;

        resolveOverlap(c, r, p);
    }


    function collisionCRHandling(bodyA, bodyB, contactPoint) {
        var vA = bodyA.speed;
        var vB = bodyB.speed;
        var wA = bodyA.palstance;
        var wB = bodyB.palstance;

    }
    function collisionCCHandling(bodyA, bodyB) {


        var vA = bodyA.speed;
        var vB = bodyB.speed;
        var wA = bodyA.palstance;
        var wB = bodyB.palstance;


        var r = bodyA.radius + bodyB.radius;

        var distSqr = (bodyA.position.x - bodyB.position.x) * (bodyA.position.x - bodyB.position.x) + (bodyA.position.y - bodyB.position.y) * (bodyA.position.y - bodyB.position.y);

        var isTouching = distSqr <= r * r ? true : false;

        var normal = new PE.Vector2();
        normal.x = bodyB.position.x - bodyA.position.x;
        normal.y = bodyB.position.y - bodyA.position.y;
        normal.normalizeSelf();

        var tangent = new PE.Vector2(normal.y, -normal.x);
        var ratio = bodyA.radius / r;
        var contactPoint = new PE.Vector2();
        contactPoint.x = bodyA.position.x + (bodyB.position.x - bodyA.position.x) * ratio;
        contactPoint.y = bodyA.position.y + (bodyB.position.y - bodyA.position.y) * ratio;


        var rA = PE.Vector2.sub(contactPoint, bodyA.position);
        var rB = PE.Vector2.sub(contactPoint, bodyB.position);

        var vrn = normal.x * ((vA.x - wA * rA.y) - (vB.x - wB * rB.y)) + normal.y * ((vA.y + wA * rA.x) - (vB.y + wB * rB.x));

        var vrt = tangent.x * ((vA.x - wA * rA.y) - (vB.x - wB * rB.y)) + tangent.y * ((vA.y + wA * rA.x) - (vB.y + wB * rB.x));

        if (isTouching && vrn > 0) {

            var normalMass = 1 / (bodyA.getInvMass() + bodyB.getInvMass());

            var restitution = (bodyA.restitution + bodyB.restitution) / 2;

            var normalImpulse = -normalMass * vrn * (1 + restitution);


                bodyA.speed.x += normalImpulse * normal.x * bodyA.getInvMass();
                bodyA.speed.y += normalImpulse * normal.y * bodyA.getInvMass();
                bodyB.speed.x -= normalImpulse * normal.x * bodyB.getInvMass();
                bodyB.speed.y -= normalImpulse * normal.y * bodyB.getInvMass();

            if (vrt != 0) {

                var tangentImpulse = normalImpulse * (bodyA.friction + bodyB.friction) / 2;

                if (vrt < 0)
                    tangentImpulse *= -1;

                var Ix = tangentImpulse * tangent.x;
                var Iy = tangentImpulse * tangent.y;
                bodyA.speed.x += Ix * bodyA.getInvMass();
                bodyA.speed.y += Iy * bodyA.getInvMass();

                wA += (rA.x * Iy - rA.y * Ix) * bodyA.getInvRotationalInertia();

                bodyB.speed.x -= Ix * bodyB.getInvMass();
                bodyB.speed.y -= Iy * bodyB.getInvMass();
                wB -= (rB.x * Iy - rB.y * Ix) * bodyB.getInvRotationalInertia();


                bodyA.palstance = wA;
                bodyB.palstance = wB;
            }

            var distance = bodyA.position.distanceTo(bodyB.position);
            var cosAngle = (bodyA.position.x - bodyB.position.x) / distance;
            var sinAngle = (bodyA.position.y - bodyB.position.y) / distance;

            var tempX = (1 + bodyA.radius + bodyB.radius - distance) * cosAngle / 2;
            var tempY = (1 + bodyA.radius + bodyB.radius - distance) * sinAngle / 2;
            bodyA.position.x += tempX;
            bodyA.position.y += tempY;
            bodyB.position.x -= tempX;
            bodyB.position.y -= tempY;
        }

    }
    function solve(dt) {
        var minSleepTime = 0;


        for (var i = 0; i < PE.Objects.length; i++) {
            var b = PE.Objects[i];
            if (b.bodyType === PE.BodyType.Static) {
                continue;
            }


            if (b.palstance > PE.Settings.AngularSleepTolerance || b.speed.dot(b.speed) > PE.Settings.LinearSleepToleranceSqr) {
       
                b.sleepTime = 0.0;
                minSleepTime = 0.0;
            }
            else {
                b.SleepTime += step.dt;
                minSleepTime = Math.Min(minSleepTime, b.SleepTime);
            }
        }
        console.log(minSleepTime);
        if (minSleepTime >= PE.Settings.TimeToSleep) {
            for (var i = 0; i < PE.Objects.length; i++) {
                PE.Objects[i].awake = false;
            }
        }

    }
    return {
        initialize: initialize,
        collisionDetection: collisionDetection.setStatic(),
        solve: solve.setStatic()
    };

} ()));

                