//-----------------------------------------------------------------------------
// XNARectangle.js
//
// Using EaselJS.Rectangle() as the based prototype to build XNARectangle to mimic the Rectangle class of XNA
// Copyright (C) Microsoft Corporation. All rights reserved.
// Ported to HTML5 Canvas with EaselJS by David Rousset - http://blogs.msdn.com/davrous 
//-----------------------------------------------------------------------------
(function (window) {
    //
    function XNARectangle(x, y, width, height) {
        this.initialize(x, y, width, height);
    }
    XNARectangle.prototype = new Rectangle();

    // constructor:
    XNARectangle.prototype.Rectangle_initialize = XNARectangle.prototype.initialize;

    XNARectangle.prototype.initialize = function (x, y, width, height) {
        this.Rectangle_initialize(x, y, width, height);
        this.Location = new Point(this.x, this.y);
        this.Center = new Point(parseInt(this.x + this.width / 2), parseInt(this.y + this.height / 2));
    };

    XNARectangle.prototype.setX = function (x) {
        this.initialize(x, this.y, this.width, this.height);
    };
    XNARectangle.prototype.setY = function (y) {
        this.initialize(this.x, y, this.width, this.height);
    };
    XNARectangle.prototype.setWidth = function (width) {
        this.initialize(this.x, this.y, width, this.height);
    };
    XNARectangle.prototype.setHeight = function (height) {
        this.initialize(this.x, this.y, this.width, height);
    };
    XNARectangle.prototype.Left = function () {
        return parseInt(this.x);
    };

    XNARectangle.prototype.Right = function () {
        return parseInt(this.x + this.width);
    };

    XNARectangle.prototype.Top = function () {
        return parseInt(this.y);
    };

    XNARectangle.prototype.Bottom = function () {
        return parseInt(this.y + this.height);
    };

    // Checking if the targetted rectangle is contained in this rectangle
    XNARectangle.prototype.Contains = function (targetRectangle) {
        if (this.x <= targetRectangle.x && targetRectangle.x + targetRectangle.width <= this.x + this.width && this.y <= targetRectangle.y)
            return targetRectangle.y + targetRectangle.height <= this.y + this.height;
        else
            return false;
    };

    // Checking if the targetted point is contained in this rectangle
    XNARectangle.prototype.ContainsPoint = function (targetPoint) {
        if (this.x <= targetPoint.x && targetPoint.x < this.x + this.width && this.y <= targetPoint.y)
            return targetPoint.y < this.y + this.height;
        else
            return false;
    };

    // Checking if the targetted rectangle intersects with this rectangle
    XNARectangle.prototype.Intersects = function (targetRectangle) {
        if (targetRectangle.x < this.x + this.width && this.x < targetRectangle.x + targetRectangle.width && targetRectangle.y < this.y + this.height)
            return this.y < targetRectangle.y + targetRectangle.height;
        else
            return false;
    };


    /// <summary>
    /// Gets the position of the center of the bottom edge of the rectangle.
    /// </summary>
    XNARectangle.prototype.GetBottomCenter = function () {
        return new Point(parseInt(this.x + (this.width / 2)), this.Bottom());
    };

    /// <summary>
    /// Calculates the signed depth of intersection between two rectangles.
    /// </summary>
    /// <returns>
    /// The amount of overlap between two intersecting rectangles. These
    /// depth values can be negative depending on which wides the rectangles
    /// intersect. This allows callers to determine the correct direction
    /// to push objects in order to resolve collisions.
    /// If the rectangles are not intersecting, Vector2.Zero is returned.
    /// </returns>
    XNARectangle.prototype.GetIntersectionDepth = function (rectB) {
        var rectA = this;

        // Calculate half sizes.
        var halfWidthA = rectA.width / 2.0;
        var halfHeightA = rectA.height / 2.0;
        var halfWidthB = rectB.width / 2.0;
        var halfHeightB = rectB.height / 2.0;

        // Calculate centers.
        var centerA = new Point(rectA.Left() + halfWidthA, rectA.Top() + halfHeightA);
        var centerB = new Point(rectB.Left() + halfWidthB, rectB.Top() + halfHeightB);

        // Calculate current and minimum-non-intersecting distances between centers.
        var distanceX = centerA.x - centerB.x;
        var distanceY = centerA.y - centerB.y;
        var minDistanceX = halfWidthA + halfWidthB;
        var minDistanceY = halfHeightA + halfHeightB;

        // If we are not intersecting at all, return (0, 0).
        if (Math.abs(distanceX) >= minDistanceX || Math.abs(distanceY) >= minDistanceY)
            return new Point(0, 0);

        // Calculate and return intersection depths.
        var depthX = distanceX > 0 ? minDistanceX - distanceX : -minDistanceX - distanceX;
        var depthY = distanceY > 0 ? minDistanceY - distanceY : -minDistanceY - distanceY;
        return new Point(depthX, depthY);
    };

    window.XNARectangle = XNARectangle;
} (window));