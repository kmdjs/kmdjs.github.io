define(function () {
    function Map(id, horizontalCount, verticalCount, cellWidth, cellHeight, aStarCellWidth, aStarCellHeight, mask, obstruction) {
        this.initialize(id, horizontalCount, verticalCount, cellWidth, cellHeight, aStarCellWidth, aStarCellHeight, mask, obstruction);
    }

    Map.prototype = new CJ.Container();

    // constructor:
    Map.prototype.Container_initialize = Map.prototype.initialize;

    Map.prototype.initialize = function (id, horizontalCount, verticalCount, cellWidth, cellHeight,  aStarCellWidth, aStarCellHeight, mask, obstruction) {
        this.Container_initialize();

        this.id = id;
        this.horizontalCount = horizontalCount;
        this.verticalCount = verticalCount;
        this.cellWidth = cellWidth - 1;
        this.cellHeight = cellHeight - 1;

        //用这个存该场景的所有碎片地图
        this.cellMaps = [];
        this.preCellPosition = { x: -1, y: -1 };
        this.aStarCellWidth = aStarCellWidth;
         this.aStarCellHeight = aStarCellHeight;
        this.mask = mask;
        this.obstruction = obstruction;
    };

    Map.prototype.getCellIndexByPosition = function (position) {
        return new Vector2(parseInt(position.x / this.cellWidth), parseInt(position.y / this.cellHeight));

    };

    Map.prototype.getSmallCellIndex = function (position) {
        return new Vector2(parseInt(position.x / this.aStarCellWidth), parseInt(position.y / this.aStarCellHeight));

    };


    Map.prototype.getPositionBySmallCellIndex = function (position) {
        return new Vector2(position.x * this.aStarCellWidth + (this.aStarCellWidth / 2), position.y * this.aStarCellHeight + (this.aStarCellHeight / 2));
    };
    //这里人物的position不是在canvas中的位置，而是在整个大的地图上的坐标位置
    Map.prototype.updateMapByViewPort = function (viewPort) {


        var cellPositon = this.getCellIndexByPosition({ x: viewPort[0], y: viewPort[1] });

        var offsetX = viewPort[0] - (cellPositon.x * this.cellWidth);
        var offsetY = viewPort[1] - (cellPositon.y * this.cellHeight);

        var xCount = Math.floor(Global.canvas.width / this.cellWidth) + 2;
        var yCount = Math.floor(Global.canvas.height / this.cellHeight) + 2;
        this.x = 0;
        this.y = 0;
        if (this.preCellPosition.x !== cellPositon.x || this.preCellPosition.y !== cellPositon.y) {
            //如果已经有了，则不再load图片
            for (var i = cellPositon.x - 1; i <= cellPositon.x + xCount; i++) {
                for (var j = cellPositon.y - 1; j <= cellPositon.y + yCount; j++) {
                    if (i < 0 || i >= this.horizontalCount || j < 0 || j >= this.verticalCount) continue;
                    //这个要加上i和j的index限制。图片不然的话不存在。
                    if (!_.include(this.cellMaps, i + "_" + j)) {
                        this.cellMaps.push(i + "_" + j);
                        //var bitmap = new CJ.Bitmap(content[j + i * this.verticalCount]);
                        var bitmap = new CJ.Bitmap("assets/maps/" + this.id + "/" + i + "_" + j + ".jpg");
                        bitmap.tag = i + "_" + j;
                        bitmap.x = (i - cellPositon.x) * this.cellWidth;
                        bitmap.y = (j - cellPositon.y) * this.cellHeight;
                        // console.log(bitmap.x + "___" + bitmap.y)
                        this.addChild(bitmap);
                    }
                    else {
                        for (var k = 0; k < this.getNumChildren(); k++) {
                            if (this.children[k].tag === i + "_" + j) {
                                this.children[k].x = (i - cellPositon.x) * this.cellWidth;
                                this.children[k].y = (j - cellPositon.y) * this.cellHeight;

                            }
                        }
                    }
                }
            }
        }
        this.preCellPosition.x = cellPositon.x;
        this.preCellPosition.y = cellPositon.y;
        this.x -= offsetX;
        this.y -= offsetY;
    }

    Map.prototype.isCellInObstruction = function (x, y) {

        return _.include(this.obstruction, x + "_" + y);
    }

    Map.prototype.isCellPositionInMask = function (x, y) {
        return _.include(this.mask, x + "_" + y);
    }

    Map.prototype.isPositionInObstruction = function (x, y) {
        var tempP = this.getSmallCellIndex({ x: x, y: y });
        return _.include(this.obstruction, tempP.x + "_" + tempP.y);
    }

    Map.prototype.isPositionInMask = function (x, y) {
        var tempP = this.getSmallCellIndex({ x: x, y: y });
        return _.include(this.mask, tempP.x + "_" + tempP.y);
    }

    return Map;
});