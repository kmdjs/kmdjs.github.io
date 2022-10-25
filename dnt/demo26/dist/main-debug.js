define("release/interview/1.0.0/main-debug", [ "./vector2-debug" ], function(require) {
    var Vector2 = require("./vector2-debug");
    function getRandomNumber(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    var canvas2 = document.querySelector("canvas");
    var ctx2 = canvas2.getContext("2d");
    var img = new Image();
    var anmPixel = [];
    img.onload = function() {
        ctx2.drawImage(img, 150, 50);
        var offset = canvas2.getBoundingClientRect();
        canvas2.onclick = function(evt) {
            canvas2.onclick = null;
            var windCenter = new Vector2(evt.clientX - offset.left, evt.clientY - offset.top);
            var imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
            var imageData = imageData2.data;
            var image_data_len = canvas2.width * canvas2.height * 4;
            for (var i = 0; i < image_data_len; i += 4) {
                if (imageData[i + 3] != 0) {
                    var x = i / 4 % canvas2.width;
                    var y = parseInt(i / 4 / canvas2.width);
                    var pp = new Vector2(x, y);
                    if (pp.distanceToSquared(windCenter) < 1e5) {
                        //r  g  b  a  x  y  speedx  speedy
                        anmPixel.push({
                            rgba: [ imageData[i], imageData[i + 1], imageData[i + 2], imageData[i + 3] ],
                            x: x,
                            y: y,
                            speedx: getRandomNumber(-2, 2),
                            speedy: getRandomNumber(-2, 2)
                        });
                        imageData[i] = imageData[i + 1] = imageData[i + 2] = imageData[i + 3] = 0;
                    }
                }
            }
            ctx2.putImageData(imageData2, 0, 0);
            var imageData3 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
            var imageDataPixel = imageData3.data;
            var imageData4 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
            var imageDataPixel2 = imageData4.data;
            setInterval(function() {
                for (var i = 0; i < image_data_len; i += 1) {
                    imageDataPixel[i] = imageDataPixel2[i];
                }
                for (var i = 0, j = anmPixel.length; i < j; i++) {
                    var item = anmPixel[i];
                    item.x += item.speedx;
                    item.y += item.speedy;
                    item.speedy -= .1;
                    var index = getImageDataStartIndexByPosition2(Math.round(item.x), Math.round(item.y));
                    //  if (index > 0 && index < image_data_len) {
                    imageDataPixel[index] = item.rgba[0];
                    imageDataPixel[index + 1] = item.rgba[1];
                    imageDataPixel[index + 2] = item.rgba[2];
                    imageDataPixel[index + 3] = item.rgba[3];
                }
                ctx2.putImageData(imageData3, 0, 0);
            }, 60);
        };
    };
    function getImageDataStartIndexByPosition2(x, y) {
        return (y * canvas2.width + x) * 4;
    }
    img.src = "computer.png";
});

(function() {
    var Vector2 = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };
    Vector2.prototype = {
        set: function(x, y) {
            this.x = x;
            this.y = y;
            return this;
        },
        sub: function(v) {
            return new Vector2(this.x - v.x, this.y - v.y);
        },
        multiplyScalar: function(s) {
            this.x *= s;
            this.y *= s;
            return this;
        },
        divideScalar: function(s) {
            if (s) {
                this.x /= s;
                this.y /= s;
            } else {
                this.set(0, 0);
            }
            return this;
        },
        length: function() {
            return Math.sqrt(this.lengthSq());
        },
        normalize: function() {
            return this.divideScalar(this.length());
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y;
        },
        distanceToSquared: function(v) {
            var dx = this.x - v.x, dy = this.y - v.y;
            return dx * dx + dy * dy;
        },
        distanceTo: function(v) {
            return Math.sqrt(this.distanceToSquared(v));
        },
        setLength: function(l) {
            return this.normalize().multiplyScalar(l);
        }
    };
    define("release/interview/1.0.0/vector2-debug", [], function(require, exports, module) {
        module.exports = Vector2;
    });
})();
