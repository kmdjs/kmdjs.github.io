/// <reference path="Vector2.js" />
(function (window) {
    var MathHelp = {};
    MathHelp.getRandomNumber = function (min, max) {
        return (min + Math.floor(Math.random() * (max - min + 1)))
    }

    MathHelp.randomItemFromArray = function (array) {
        var i = MathHelp.getRandomNumber(0, array.length - 1);
        return array[i];
    }

    MathHelp.isPointInRect = function (point, rect) {
        return point.x > rect.x && point.x < rect.x + rect.width && point.y > rect.y && point.y < rect.y + rect.height;
    }

    MathHelp.getRotation = function (soucePoint, targetPoint) {
        return (Math.atan2(targetPoint.y - soucePoint.y, targetPoint.x - soucePoint.x)) / Math.PI * 180;
    }

    MathHelp.getCellSurround = function (centerCell) {
        return [{ x: centerCell.x, y: centerCell.y - 1 }, { x: centerCell.x + 1, y: centerCell.y - 1 }, { x: centerCell.x + 1, y: centerCell.y }, { x: centerCell.x + 1, y: centerCell.y + 1 }, { x: centerCell.x, y: centerCell.y + 1 }, { x: centerCell.x - 1, y: centerCell.y + 1 }, { x: centerCell.x - 1, y: centerCell.y }, { x: centerCell.x - 1, y: centerCell.y - 1}];
    }

    MathHelp.isInSurround = function (centerCell, targetCell) {
        var tempV = targetCell.sub(centerCell);
        if (tempV.x === 0 && tempV.y === 0) return false;
        return (Math.abs(tempV.x) === 1 || Math.abs(tempV.x) === 0) && (Math.abs(tempV.y) === 1 || Math.abs(tempV.y) === 0);
    }

    window.MathHelp = MathHelp;
} (window));