/// <reference path="../PE.js" />
/// <reference path="Shape/Circle.js" />
/// <reference path="HitManagement.js" />

/// <reference path="../Math/Vector2.js" />
/// <reference path="class.min.js" />
/// <reference path="World.js" />

PE.Objects = [];
PE.ObjectRender = Class.create((function () {

    function initialize() {

    }
    function update(timeStep, stage) {
        PE.World.update(timeStep);

        var cases = {
            "Circle": drawCircle,
            "Rect": drawRect
        };

        function drawRect(obj) {
            if (obj.id === -1) {
                var o = new Container();
                o.x = obj.position.x;
                o.y = obj.position.y;

                var shape = new Shape();
                o.addChild(shape);
                o.rotation = obj.rotation;
                var g = shape.graphics;
                g.beginStroke("#444");
                g.drawRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);
                g.closePath();
                stage.addChild(o);
                obj.id = stage.getChildIndex(o);
            }
            else {
                var o = stage.getChildAt(obj.id);
                o.x = obj.position.x;
                o.y = obj.position.y;
                o.rotation = obj.rotation;
            }
        }

        function drawCircle(obj) {
            if (obj.id === -1) {
                var r = obj.radius;
                var o = new Container();
                o.x = obj.position.x;
                o.y = obj.position.y;
                o.rotation = obj.rotation;
                if (obj.imgUrl === "") {
                    var shape = new Shape();
                    o.addChild(shape);
                    var g = shape.graphics;
                    g.beginStroke("#444");
                    g.drawCircle(0, 0, r).lineTo(-r, 0).moveTo(0, -r).lineTo(0, r);
                    g.closePath();
                }
                else {
                    var img = new Bitmap(obj.imgUrl);
                    img.x = -obj.radius;
                    img.y = -obj.radius;
                    o.addChild(img);
                }
                stage.addChild(o);
                obj.id = stage.getChildIndex(o);
            }
            else {
                var o = stage.getChildAt(obj.id);
                o.x = obj.position.x;
                o.y = obj.position.y;
                o.rotation = obj.rotation;
            }
        }
        for (var i in PE.Objects) {
            if (PE.Objects[i].type === "Circle") drawCircle(PE.Objects[i]);
            if (PE.Objects[i].type === "Rect") drawRect(PE.Objects[i]);

        }

        stage.update();
    }
    return {
        initialize: initialize,
        update: update.setStatic()

    };

} ()));
