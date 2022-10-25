var Ball = function (speed, position) {
    this.speed = speed;
    this.position = position;
    this.r = 5;
    createjs.Ticker.addListener(this);
}

Ball.prototype.tick = function () {
    this.speed.y += 0.1;
    this.position.add(this.speed);
    if (this.position.y + this.r >= stage.canvas.height || this.position.y   <= this.r)
    {
        this.speed.y *= -0.7;
        this.speed.x *= 0.9;
        this.position.y = stage.canvas.height - this.r;
    }
    if (this.position.x + this.r >= stage.canvas.width ) {
        this.speed.x *= -0.78;
        this.position.x = stage.canvas.width - this.r;
    }
    if (this.position.x <= this.r)
    {
        this.speed.x *= -0.78;
        this.position.x = this.r;
    }
}