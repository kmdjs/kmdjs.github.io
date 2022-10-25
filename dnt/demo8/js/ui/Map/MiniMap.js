define(function () {

    var MiniMap = function (mapID, width, height) {
        this.initialize(mapID, width, height);
    }
    MiniMap.prototype = new CJ.Container();

    // constructor:
    MiniMap.prototype.Container_initialize = MiniMap.prototype.initialize;

    MiniMap.prototype.initialize = function (mapID, width, height) {
        this.Container_initialize();
        this.bitmap = new CJ.Bitmap(Resource.getRes("minMap" + mapID));

        // this.bitmap.sourceRect = new CJ.Rectangle(this.player.position.x / 10 - width / 2, this.player.position.y / 10 - height / 2, width, height);
        this.addChild(this.bitmap);
        this.width = width;
        this.height = height;

        var myShape2 = new CJ.Shape();
        myShape2.graphics = new CJ.Graphics().setStrokeStyle(2).beginStroke("#7A6C5C").drawRoundRect(0, 0, this.width, this.height, 5).endStroke();
        this.addChild(myShape2);

        this.transportShapeCtt = new CJ.Container();
        this._clocking = 0;
        this.pathShapeCtt = new CJ.Container();
        this.enemyShapeCtt = new CJ.Container();
        this.playerCtt = new CJ.Container();
        this.addChild(this.enemyShapeCtt, this.transportShapeCtt, this.pathShapeCtt, this.playerCtt);
    }

    MiniMap.prototype.tick = function () {
        this._clocking += 1000 / 60;

        //当达到定时时间或者第一次近如过程动画时都执行
        if (this._clocking >= 200) {
            this._clocking = 0;
            var beginX = Global.player.position.x / 10 - this.width / 2;
            var beginY = Global.player.position.y / 10 - this.height / 2;
            if (beginX < 0) {
                beginX = 0;
            }
            if (beginY < 0) {
                beginY = 0;
            }
            if (beginX + this.width > this.bitmap.image.width) {
                beginX = this.bitmap.image.width - this.width;
            }
            if (beginY + this.height > this.bitmap.image.height) {
                beginY = this.bitmap.image.height - this.height;
            }
            this.bitmap.sourceRect = new CJ.Rectangle(beginX, beginY, this.width, this.height);

            var rect = new CJ.Rectangle(this.bitmap.sourceRect.x * 10, this.bitmap.sourceRect.y * 10, this.bitmap.sourceRect.width * 10, this.bitmap.sourceRect.height * 10);
            this.drawTransport(rect);
            this.drawPath(rect);
            this.drawEnemy(rect);

            this.drawPlayer(rect);
        }
    }

    MiniMap.prototype.drawTransport = function (rect) {
        this.transportShapeCtt.removeAllChildren();

        for (var i = 0; i < Global.transports.length; i++) {
            if (MathHelp.isPointInRect(Global.transports[i].position, rect)) {
                var text = new CJ.Text("传", "bold 10px Arial", "#ffffff");
                var tempPosition = Global.transports[i].position.sub(new Vector2(rect.x, rect.y)).divideScalar(10);
                text.x = tempPosition.x;
                text.y = tempPosition.y;
                this.transportShapeCtt.addChild(text);
            }
        }
    }

    MiniMap.prototype.drawPath = function (rect) {
        this.pathShapeCtt.removeAllChildren();

        for (var i = 0; i < Global.player.path.length; i++) {
            var tempV = Global.map.getPositionBySmallCellIndex({ x: Global.player.path[i][0], y: Global.player.path[i][1] });
            var tempPosition = tempV.sub(new Vector2(rect.x, rect.y)).divideScalar(10);
            var shape = new CJ.Shape();
            shape.graphics.beginFill("#FF6800").drawCircle(0, 0, 1);
            shape.x = tempPosition.x;
            shape.y = tempPosition.y;
            this.pathShapeCtt.addChild(shape);
        }
    }

    MiniMap.prototype.drawEnemy = function (rect) {
        this.enemyShapeCtt.removeAllChildren();

        for (var i = 0; i < Global.enemyArr.length; i++) {
            if (Global.enemyArr[i].HP > 0 && MathHelp.isPointInRect(Global.enemyArr[i].position, rect)) {
                var tempPosition = Global.enemyArr[i].position.sub(new Vector2(rect.x, rect.y)).divideScalar(10);
                var shape = new CJ.Shape();
                shape.graphics.beginStroke("black").drawCircle(0, 0, 3).endStroke();
                shape.graphics.beginFill("#B50000").drawCircle(0, 0, 3);
                shape.x = tempPosition.x;
                shape.y = tempPosition.y;
                this.enemyShapeCtt.addChild(shape);
            }
        }
    }

    MiniMap.prototype.drawPlayer = function (rect) {
        this.playerCtt.removeAllChildren();

        for (var i = 0; i < Global.players.length; i++) {
            if (MathHelp.isPointInRect(Global.players[i].position, rect)) {
                var tempPosition = Global.players[i].position.sub(new Vector2(rect.x, rect.y)).divideScalar(10);
                if (Global.players[i].id == Global.player.id) {
                    var bitmap = Resource.getBitmap("minMapMe");
                    bitmap.regX = bitmap.image.width/2;
                    bitmap.regY = bitmap.image.height / 2;
                    bitmap.x = tempPosition.x;
                    bitmap.y = tempPosition.y;
                    this.playerCtt.addChild(bitmap);
                }
                else {
                   
                    var shape = new CJ.Shape();
                    shape.graphics.beginStroke("black").drawCircle(0, 0, 3).endStroke();
                    shape.graphics.beginFill("#69D025").drawCircle(0, 0, 3);
                    shape.x = tempPosition.x;
                    shape.y = tempPosition.y;
                    this.playerCtt.addChild(shape);
                }
            }
        }
    }

    return MiniMap;
});