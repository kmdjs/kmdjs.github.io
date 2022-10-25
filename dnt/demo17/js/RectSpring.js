/// <reference path="easeljs-0.6.1.min.js" />
var RectSpring = function (spring1,spring2, b1, b2, b3, b4,boolFill) {
    this.b1 = b1;
    this.b2 = b2;
    this.b3 = b3;
    this.b4 = b4;
    //this.length = spring.length;
    //this.k = spring.k;
    this.spring1 = spring1;
    this.spring2 = spring2;
    this.boolFill = boolFill;
    this.container = new createjs.Container();
    stage.addChild(this.container);
    this.shape = new createjs.Shape();
    this.container.addChild(this.shape);
    
    createjs.Ticker.addListener(this);
}

RectSpring.prototype.render = function () {
    this.shape.graphics.clear();
    if (this.boolFill)
    {
        this.shape.graphics.ss(2).beginFill("black").mt(this.b1.position.x, this.b1.position.y).lt(this.b2.position.x, this.b2.position.y).lt(this.b3.position.x, this.b3.position.y).lt(this.b4.position.x, this.b4.position.y).lt(this.b1.position.x, this.b1.position.y).lt(this.b3.position.x, this.b3.position.y).mt(this.b2.position.x, this.b2.position.y).lt(this.b4.position.x, this.b4.position.y).cp().ef();
    }
    this.shape.graphics.beginFill("black").dc(this.b1.position.x, this.b1.position.y, this.b1.r).ef();

    this.shape.graphics.beginFill("black").dc(this.b2.position.x, this.b2.position.y, this.b2.r).ef()
    this.shape.graphics.beginFill("black").dc(this.b3.position.x, this.b3.position.y, this.b3.r).ef()
    this.shape.graphics.beginFill("black").dc(this.b4.position.x, this.b4.position.y, this.b4.r).ef()
    this.shape.graphics.ss(2).beginStroke("black").mt(this.b1.position.x, this.b1.position.y).lt(this.b2.position.x, this.b2.position.y).lt(this.b3.position.x, this.b3.position.y).lt(this.b4.position.x, this.b4.position.y).lt(this.b1.position.x, this.b1.position.y).lt(this.b3.position.x, this.b3.position.y).mt(this.b2.position.x, this.b2.position.y).lt(this.b4.position.x, this.b4.position.y).es();

   
}

RectSpring.prototype.tick = function () {
    this._handle(this.b1, this.b2, this.spring1);
    this._handle(this.b2, this.b3, this.spring1);
    this._handle(this.b3, this.b4, this.spring1);
    this._handle(this.b4, this.b1, this.spring1);
    this._handle(this.b2, this.b4, this.spring2);
    this._handle(this.b3, this.b1, this.spring2);
    this.render();

}

RectSpring.prototype._handle = function (b1, b2, sp) {
    var length = b1.position.distanceTo(b2.position);
    var dl = sp.length - length;
    var forceScalar = dl * sp.k;
    var n = b2.position.sub(b1.position).normalize();
    var force = n.multiplyScalar(forceScalar);
    b2.speed.x += force.x;
    b2.speed.y += force.y;

    b1.speed.x -= force.x;
    b1.speed.y -= force.y;

}