﻿/**
* EaselJS
* Visit http://easeljs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 Grant Skinner
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
**/
(function (j) { var c = function () { throw "UID cannot be instantiated"; }; c._nextID = 0; c.get = function () { return c._nextID++ }; j.UID = c })(window); (function (j) {
    var c = function () { throw "Ticker cannot be instantiated."; }; c.useRAF = null; c._listeners = null; c._pauseable = null; c._paused = false; c._inited = false; c._startTime = 0; c._pausedTime = 0; c._ticks = 0; c._pausedTickers = 0; c._interval = 50; c._lastTime = 0; c._times = null; c._tickTimes = null; c._rafActive = false; c._timeoutID = null; c.addListener = function (a, b) { c._inited || c.init(); c.removeListener(a); c._pauseable[c._listeners.length] = b == null ? true : b; c._listeners.push(a) }; c.init = function () {
        c._inited = true; c._times = []; c._tickTimes =
        []; c._pauseable = []; c._listeners = []; c._times.push(c._startTime = c._getTime()); c.setInterval(c._interval)
    }; c.removeListener = function (a) { c._listeners != null && (a = c._listeners.indexOf(a), a != -1 && (c._listeners.splice(a, 1), c._pauseable.splice(a, 1))) }; c.removeAllListeners = function () { c._listeners = []; c._pauseable = [] }; c.setInterval = function (a) {
        c._lastTime = c._getTime(); c._interval = a; c.timeoutID != null && clearTimeout(c.timeoutID); if (c.useRAF) {
            if (c._rafActive) return; c._rafActive = true; var b = j.requestAnimationFrame ||
            j.webkitRequestAnimationFrame || j.mozRequestAnimationFrame || j.oRequestAnimationFrame || j.msRequestAnimationFrame; if (b) { b(c._handleAF); return }
        } if (c._inited) c.timeoutID = setTimeout(c._handleTimeout, a)
    }; c.getInterval = function () { return c._interval }; c.setFPS = function (a) { c.setInterval(1E3 / a) }; c.getFPS = function () { return 1E3 / c._interval }; c.getMeasuredFPS = function (a) { if (c._times.length < 2) return -1; a == null && (a = c.getFPS() >> 1); a = Math.min(c._times.length - 1, a); return 1E3 / ((c._times[0] - c._times[a]) / a) }; c.setPaused =
    function (a) { c._paused = a }; c.getPaused = function () { return c._paused }; c.getTime = function (a) { return c._getTime() - c._startTime - (a ? c._pausedTime : 0) }; c.getTicks = function (a) { return c._ticks - (a ? c._pausedTickers : 0) }; c._handleAF = function (a) { a - c._lastTime >= c._interval - 1 && c._tick(); c.useRAF ? (j.requestAnimationFrame || j.webkitRequestAnimationFrame || j.mozRequestAnimationFrame || j.oRequestAnimationFrame || j.msRequestAnimationFrame)(c._handleAF, c.animationTarget) : c._rafActive = false }; c._handleTimeout = function () {
        c._tick();
        if (!c.useRAF) c.timeoutID = setTimeout(c._handleTimeout, c._interval)
    }; c._tick = function () { c._ticks++; var a = c._getTime(), b = a - c._lastTime, n = c._paused; n && (c._pausedTickers++, c._pausedTime += b); c._lastTime = a; for (var i = c._pauseable, d = c._listeners.slice(), e = d ? d.length : 0, f = 0; f < e; f++) { var g = i[f], k = d[f]; k == null || n && g || k.tick == null || k.tick(b, n) } for (c._tickTimes.unshift(c._getTime() - a) ; c._tickTimes.length > 100;) c._tickTimes.pop(); for (c._times.unshift(a) ; c._times.length > 100;) c._times.pop() }; c._getTime = function () { return (new Date).getTime() };
    j.Ticker = c
})(window); (function (j) {
    var c = function (b, a, i, c, e) { this.initialize(b, a, i, c, e) }, a = c.prototype; a.stageX = 0; a.stageY = 0; a.type = null; a.nativeEvent = null; a.onMouseMove = null; a.onMouseUp = null; a.target = null; a.initialize = function (b, a, i, c, e) { this.type = b; this.stageX = a; this.stageY = i; this.target = c; this.nativeEvent = e }; a.clone = function () { return new c(this.type, this.stageX, this.stageY, this.target, this.nativeEvent) }; a.toString = function () { return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]" }; j.MouseEvent =
    c
})(window); (function (j) {
    var c = function (b, a, i, c, e, f) { this.initialize(b, a, i, c, e, f) }, a = c.prototype; c.identity = null; c.DEG_TO_RAD = Math.PI / 180; a.a = 1; a.b = 0; a.c = 0; a.d = 1; a.tx = 0; a.ty = 0; a.alpha = 1; a.shadow = null; a.compositeOperation = null; a.initialize = function (b, a, i, c, e, f) { if (b != null) this.a = b; this.b = a || 0; this.c = i || 0; if (c != null) this.d = c; this.tx = e || 0; this.ty = f || 0 }; a.prepend = function (b, a, i, c, e, f) {
        var g = this.tx; if (b != 1 || a != 0 || i != 0 || c != 1) {
            var k = this.a, h = this.c; this.a = k * b + this.b * i; this.b = k * a + this.b * c; this.c = h * b + this.d * i; this.d =
            h * a + this.d * c
        } this.tx = g * b + this.ty * i + e; this.ty = g * a + this.ty * c + f
    }; a.append = function (b, a, i, c, e, f) { var g = this.a, k = this.b, h = this.c, l = this.d; this.a = b * g + a * h; this.b = b * k + a * l; this.c = i * g + c * h; this.d = i * k + c * l; this.tx = e * g + f * h + this.tx; this.ty = e * k + f * l + this.ty }; a.prependMatrix = function (b) { this.prepend(b.a, b.b, b.c, b.d, b.tx, b.ty); this.prependProperties(b.alpha, b.shadow, b.compositeOperation) }; a.appendMatrix = function (b) { this.append(b.a, b.b, b.c, b.d, b.tx, b.ty); this.appendProperties(b.alpha, b.shadow, b.compositeOperation) };
    a.prependTransform = function (b, a, i, d, e, f, g, k, h) { if (e % 360) var l = e * c.DEG_TO_RAD, e = Math.cos(l), l = Math.sin(l); else e = 1, l = 0; if (k || h) this.tx -= k, this.ty -= h; f || g ? (f *= c.DEG_TO_RAD, g *= c.DEG_TO_RAD, this.prepend(e * i, l * i, -l * d, e * d, 0, 0), this.prepend(Math.cos(g), Math.sin(g), -Math.sin(f), Math.cos(f), b, a)) : this.prepend(e * i, l * i, -l * d, e * d, b, a) }; a.appendTransform = function (b, a, i, d, e, f, g, k, h) {
        if (e % 360) var l = e * c.DEG_TO_RAD, e = Math.cos(l), l = Math.sin(l); else e = 1, l = 0; f || g ? (f *= c.DEG_TO_RAD, g *= c.DEG_TO_RAD, this.append(Math.cos(g),
        Math.sin(g), -Math.sin(f), Math.cos(f), b, a), this.append(e * i, l * i, -l * d, e * d, 0, 0)) : this.append(e * i, l * i, -l * d, e * d, b, a); if (k || h) this.tx -= k * this.a + h * this.c, this.ty -= k * this.b + h * this.d
    }; a.rotate = function (b) { var a = Math.cos(b), b = Math.sin(b), c = this.a, d = this.c, e = this.tx; this.a = c * a - this.b * b; this.b = c * b + this.b * a; this.c = d * a - this.d * b; this.d = d * b + this.d * a; this.tx = e * a - this.ty * b; this.ty = e * b + this.ty * a }; a.skew = function (b, a) { b *= c.DEG_TO_RAD; a *= c.DEG_TO_RAD; this.append(Math.cos(a), Math.sin(a), -Math.sin(b), Math.cos(b), 0, 0) }; a.scale =
    function (b, a) { this.a *= b; this.d *= a; this.tx *= b; this.ty *= a }; a.translate = function (b, a) { this.tx += b; this.ty += a }; a.identity = function () { this.alpha = this.a = this.d = 1; this.b = this.c = this.tx = this.ty = 0; this.shadow = this.compositeOperation = null }; a.invert = function () { var b = this.a, a = this.b, c = this.c, d = this.d, e = this.tx, f = b * d - a * c; this.a = d / f; this.b = -a / f; this.c = -c / f; this.d = b / f; this.tx = (c * this.ty - d * e) / f; this.ty = -(b * this.ty - a * e) / f }; a.isIdentity = function () {
        return this.tx == 0 && this.ty == 0 && this.a == 1 && this.b == 0 && this.c == 0 && this.d ==
        1
    }; a.decompose = function (b) { b == null && (b = {}); b.x = this.tx; b.y = this.ty; b.scaleX = Math.sqrt(this.a * this.a + this.b * this.b); b.scaleY = Math.sqrt(this.c * this.c + this.d * this.d); var a = Math.atan2(-this.c, this.d), i = Math.atan2(this.b, this.a); a == i ? (b.rotation = i / c.DEG_TO_RAD, this.a < 0 && this.d >= 0 && (b.rotation += b.rotation <= 0 ? 180 : -180), b.skewX = b.skewY = 0) : (b.skewX = a / c.DEG_TO_RAD, b.skewY = i / c.DEG_TO_RAD); return b }; a.reinitialize = function (b, a, c, d, e, f, g, k, h) {
        this.initialize(b, a, c, d, e, f); this.alpha = g || 1; this.shadow = k; this.compositeOperation =
        h; return this
    }; a.appendProperties = function (b, a, c) { this.alpha *= b; this.shadow = a || this.shadow; this.compositeOperation = c || this.compositeOperation }; a.prependProperties = function (b, a, c) { this.alpha *= b; this.shadow = this.shadow || a; this.compositeOperation = this.compositeOperation || c }; a.clone = function () { var b = new c(this.a, this.b, this.c, this.d, this.tx, this.ty); b.shadow = this.shadow; b.alpha = this.alpha; b.compositeOperation = this.compositeOperation; return b }; a.toString = function () {
        return "[Matrix2D (a=" + this.a + " b=" + this.b +
        " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
    }; c.identity = new c(1, 0, 0, 1, 0, 0); j.Matrix2D = c
})(window); (function (j) { var c = function (b, a) { this.initialize(b, a) }, a = c.prototype; a.x = 0; a.y = 0; a.initialize = function (b, a) { this.x = b == null ? 0 : b; this.y = a == null ? 0 : a }; a.clone = function () { return new c(this.x, this.y) }; a.toString = function () { return "[Point (x=" + this.x + " y=" + this.y + ")]" }; j.Point = c })(window); (function (j) { var c = function (b, a, c, d) { this.initialize(b, a, c, d) }, a = c.prototype; a.x = 0; a.y = 0; a.width = 0; a.height = 0; a.initialize = function (b, a, c, d) { this.x = b == null ? 0 : b; this.y = a == null ? 0 : a; this.width = c == null ? 0 : c; this.height = d == null ? 0 : d }; a.clone = function () { return new c(this.x, this.y, this.width, this.height) }; a.toString = function () { return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]" }; j.Rectangle = c })(window); (function (j) { var c = function (b, a, c, d) { this.initialize(b, a, c, d) }, a = c.prototype; c.identity = null; a.color = null; a.offsetX = 0; a.offsetY = 0; a.blur = 0; a.initialize = function (b, a, c, d) { this.color = b; this.offsetX = a; this.offsetY = c; this.blur = d }; a.toString = function () { return "[Shadow]" }; a.clone = function () { return new c(this.color, this.offsetX, this.offsetY, this.blur) }; c.identity = new c("transparent", 0, 0, 0); j.Shadow = c })(window); (function (j) {
    var c = function (b) { this.initialize(b) }, a = c.prototype; a.complete = true; a._animations = null; a._frames = null; a._images = null; a._data = null; a._loadCount = 0; a._frameHeight = 0; a._frameWidth = 0; a._numFrames = 0; a._regX = 0; a._regY = 0; a.initialize = function (b) {
        var a, c, d; if (b != null) {
            if (b.images && (c = b.images.length) > 0) {
                d = this._images = []; for (a = 0; a < c; a++) {
                    var e = b.images[a]; if (!(e instanceof Image)) { var f = e, e = new Image; e.src = f } d.push(e); if (!e.getContext && !e.complete) this._loadCount++, this.complete = false, function (b) {
                        e.onload =
                        function () { b._handleImageLoad() }
                    }(this)
                }
            } if (b.frames != null) if (b.frames instanceof Array) { this._frames = []; d = b.frames; for (a = 0, c = d.length; a < c; a++) f = d[a], this._frames.push({ image: this._images[f[4] ? f[4] : 0], rect: new Rectangle(f[0], f[1], f[2], f[3]), regX: f[5] || 0, regY: f[6] || 0 }) } else c = b.frames, this._frameWidth = c.width, this._frameHeight = c.height, this._regX = c.regX || 0, this._regY = c.regY || 0, this._numFrames = c.count, this._loadCount == 0 && this._calculateFrames(); if ((c = b.animations) != null) {
                this._animations = []; this._data =
                {}; for (var g in c) { b = { name: g }; f = c[g]; if (isNaN(f)) if (f instanceof Array) { b.frequency = f[3]; b.next = f[2]; d = b.frames = []; for (a = f[0]; a <= f[1]; a++) d.push(a) } else b.frequency = f.frequency, b.next = f.next, d = b.frames = f.frames.slice(0); else d = b.frames = [f]; b.next = d.length < 2 || b.next == false ? null : b.next == true ? g : b.next; if (!b.frequency) b.frequency = 1; this._animations.push(g); this._data[g] = b }
            }
        }
    }; a.getNumFrames = function (b) { return b == null ? this._frames ? this._frames.length : this._numFrames : (b = this._data[b], b == null ? 0 : b.frames.length) };
    a.getAnimations = function () { return this._animations.slice(0) }; a.getAnimation = function (b) { return this._data[b] }; a.getFrame = function (b) { return this.complete && this._frames && (frame = this._frames[b]) ? frame : null }; a.toString = function () { return "[SpriteSheet]" }; a.clone = function () {
        var b = new c; b.complete = this.complete; b._animations = this._animations; b._frames = this._frames; b._images = this._images; b._data = this._data; b._frameHeight = this._frameHeight; b._frameWidth = this._frameWidth; b._numFrames = this._numFrames; b._loadCount =
        this._loadCount; return b
    }; a._handleImageLoad = function () { if (--this._loadCount == 0) this._calculateFrames(), this.complete = true }; a._calculateFrames = function () {
        if (!(this._frames || this._frameWidth == 0)) {
            this._frames = []; for (var b = 0, a = this._frameWidth, c = this._frameHeight, d = 0, e = this._images; d < e.length; d++) {
                for (var f = e[d], g = (f.width + 1) / a | 0, k = (f.height + 1) / c | 0, k = this._numFrames > 0 ? Math.min(this._numFrames - b, g * k) : g * k, h = 0; h < k; h++) this._frames.push({ image: f, rect: new Rectangle(h % g * a, (h / g | 0) * c, a, c), regX: this._regX, regY: this._regY });
                b += k
            } this._numFrames = b
        }
    }; j.SpriteSheet = c
})(window); (function (j) {
    function c(b, a) { this.f = b; this.params = a } c.prototype.exec = function (b) { this.f.apply(b, this.params) }; var a = function () { this.initialize() }, b = a.prototype; a.getRGB = function (b, a, c, e) { b != null && c == null && (e = a, c = b & 255, a = b >> 8 & 255, b = b >> 16 & 255); return e == null ? "rgb(" + b + "," + a + "," + c + ")" : "rgba(" + b + "," + a + "," + c + "," + e + ")" }; a.getHSL = function (b, a, c, e) { return e == null ? "hsl(" + b % 360 + "," + a + "%," + c + "%)" : "hsla(" + b % 360 + "," + a + "%," + c + "%," + e + ")" }; a.STROKE_CAPS_MAP = ["butt", "round", "square"]; a.STROKE_JOINTS_MAP = ["miter", "round",
    "bevel"]; a._ctx = document.createElement("canvas").getContext("2d"); a.beginCmd = new c(a._ctx.beginPath, []); a.fillCmd = new c(a._ctx.fill, []); a.strokeCmd = new c(a._ctx.stroke, []); b._strokeInstructions = null; b._strokeStyleInstructions = null; b._fillInstructions = null; b._instructions = null; b._oldInstructions = null; b._activeInstructions = null; b._active = false; b._dirty = false; b.initialize = function () { this.clear(); this._ctx = a._ctx }; b.draw = function (b) {
        this._dirty && this._updateInstructions(); for (var a = this._instructions,
        c = 0, e = a.length; c < e; c++) a[c].exec(b)
    }; b.moveTo = function (b, a) { this._activeInstructions.push(new c(this._ctx.moveTo, [b, a])); return this }; b.lineTo = function (b, a) { this._dirty = this._active = true; this._activeInstructions.push(new c(this._ctx.lineTo, [b, a])); return this }; b.arcTo = function (b, a, d, e, f) { this._dirty = this._active = true; this._activeInstructions.push(new c(this._ctx.arcTo, [b, a, d, e, f])); return this }; b.arc = function (b, a, d, e, f, g) {
        this._dirty = this._active = true; g == null && (g = false); this._activeInstructions.push(new c(this._ctx.arc,
        [b, a, d, e, f, g])); return this
    }; b.quadraticCurveTo = function (b, a, d, e) { this._dirty = this._active = true; this._activeInstructions.push(new c(this._ctx.quadraticCurveTo, [b, a, d, e])); return this }; b.bezierCurveTo = function (b, a, d, e, f, g) { this._dirty = this._active = true; this._activeInstructions.push(new c(this._ctx.bezierCurveTo, [b, a, d, e, f, g])); return this }; b.rect = function (b, a, d, e) { this._dirty = this._active = true; this._activeInstructions.push(new c(this._ctx.rect, [b, a, d, e])); return this }; b.closePath = function () {
        if (this._active) this._dirty =
        true, this._activeInstructions.push(new c(this._ctx.closePath, [])); return this
    }; b.clear = function () { this._instructions = []; this._oldInstructions = []; this._activeInstructions = []; this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = null; this._active = this._dirty = false; return this }; b.beginFill = function (b) { this._active && this._newPath(); this._fillInstructions = b ? [new c(this._setProp, ["fillStyle", b])] : null; return this }; b.beginLinearGradientFill = function (b, a, d, e, f, g) {
        this._active && this._newPath();
        d = this._ctx.createLinearGradient(d, e, f, g); e = 0; for (f = b.length; e < f; e++) d.addColorStop(a[e], b[e]); this._fillInstructions = [new c(this._setProp, ["fillStyle", d])]; return this
    }; b.beginRadialGradientFill = function (b, a, d, e, f, g, k, h) { this._active && this._newPath(); d = this._ctx.createRadialGradient(d, e, f, g, k, h); e = 0; for (f = b.length; e < f; e++) d.addColorStop(a[e], b[e]); this._fillInstructions = [new c(this._setProp, ["fillStyle", d])]; return this }; b.beginBitmapFill = function (b, a) {
        this._active && this._newPath(); var d = this._ctx.createPattern(b,
        a || ""); this._fillInstructions = [new c(this._setProp, ["fillStyle", d])]; return this
    }; b.endFill = function () { this.beginFill(null); return this }; b.setStrokeStyle = function (b, i, d, e) { this._active && this._newPath(); this._strokeStyleInstructions = [new c(this._setProp, ["lineWidth", b == null ? "1" : b]), new c(this._setProp, ["lineCap", i == null ? "butt" : isNaN(i) ? i : a.STROKE_CAPS_MAP[i]]), new c(this._setProp, ["lineJoin", d == null ? "miter" : isNaN(d) ? d : a.STROKE_JOINTS_MAP[d]]), new c(this._setProp, ["miterLimit", e == null ? "10" : e])]; return this };
    b.beginStroke = function (b) { this._active && this._newPath(); this._strokeInstructions = b ? [new c(this._setProp, ["strokeStyle", b])] : null; return this }; b.beginLinearGradientStroke = function (b, a, d, e, f, g) { this._active && this._newPath(); d = this._ctx.createLinearGradient(d, e, f, g); e = 0; for (f = b.length; e < f; e++) d.addColorStop(a[e], b[e]); this._strokeInstructions = [new c(this._setProp, ["strokeStyle", d])]; return this }; b.beginRadialGradientStroke = function (b, a, d, e, f, g, k, h) {
        this._active && this._newPath(); d = this._ctx.createRadialGradient(d,
        e, f, g, k, h); e = 0; for (f = b.length; e < f; e++) d.addColorStop(a[e], b[e]); this._strokeInstructions = [new c(this._setProp, ["strokeStyle", d])]; return this
    }; b.beginBitmapStroke = function (b, a) { this._active && this._newPath(); var d = this._ctx.createPattern(b, a || ""); this._strokeInstructions = [new c(this._setProp, ["strokeStyle", d])]; return this }; b.endStroke = function () { this.beginStroke(null); return this }; b.curveTo = b.quadraticCurveTo; b.drawRect = b.rect; b.drawRoundRect = function (b, a, c, e, f) {
        this.drawRoundRectComplex(b, a, c, e,
        f, f, f, f); return this
    }; b.drawRoundRectComplex = function (b, a, d, e, f, g, k, h) {
        this._dirty = this._active = true; this._activeInstructions.push(new c(this._ctx.moveTo, [b + f, a]), new c(this._ctx.lineTo, [b + d - g, a]), new c(this._ctx.arc, [b + d - g, a + g, g, -Math.PI / 2, 0, false]), new c(this._ctx.lineTo, [b + d, a + e - k]), new c(this._ctx.arc, [b + d - k, a + e - k, k, 0, Math.PI / 2, false]), new c(this._ctx.lineTo, [b + h, a + e]), new c(this._ctx.arc, [b + h, a + e - h, h, Math.PI / 2, Math.PI, false]), new c(this._ctx.lineTo, [b, a + f]), new c(this._ctx.arc, [b + f, a + f, f, Math.PI,
        Math.PI * 3 / 2, false])); return this
    }; b.drawCircle = function (b, a, c) { this.arc(b, a, c, 0, Math.PI * 2); return this }; b.drawEllipse = function (b, a, d, e) { this._dirty = this._active = true; var f = d / 2 * 0.5522848, g = e / 2 * 0.5522848, k = b + d, h = a + e, d = b + d / 2, e = a + e / 2; this._activeInstructions.push(new c(this._ctx.moveTo, [b, e]), new c(this._ctx.bezierCurveTo, [b, e - g, d - f, a, d, a]), new c(this._ctx.bezierCurveTo, [d + f, a, k, e - g, k, e]), new c(this._ctx.bezierCurveTo, [k, e + g, d + f, h, d, h]), new c(this._ctx.bezierCurveTo, [d - f, h, b, e + g, b, e])); return this }; b.drawEllipseComplex =
    function (b, a, d, e) { this._dirty = this._active = true; var f = d / 2 * 0.5522848, g = e / 2 * 0.5522848, k = b + d, h = a + e, d = b + d / 2, e = a + e / 2; this._activeInstructions.push(new c(this._ctx.moveTo, [b, e]), new c(this._ctx.bezierCurveTo, [b, e - g, d - f, a, d, a]), new c(this._ctx.bezierCurveTo, [d + f, a, k, e - g, k, e]), new c(this._ctx.bezierCurveTo, [k, e + g, d + f, h, d, h]), new c(this._ctx.bezierCurveTo, [d - f, h, b, e + g, b, e])); return this }; b.drawPolyStar = function (b, a, d, e, f, g) {
        this._dirty = this._active = true; f == null && (f = 0); f = 1 - f; g == null ? g = 0 : g /= 180 / Math.PI; var k =
        Math.PI / e; this._activeInstructions.push(new c(this._ctx.moveTo, [b + Math.cos(g) * d, a + Math.sin(g) * d])); for (var h = 0; h < e; h++) g += k, f != 1 && this._activeInstructions.push(new c(this._ctx.lineTo, [b + Math.cos(g) * d * f, a + Math.sin(g) * d * f])), g += k, this._activeInstructions.push(new c(this._ctx.lineTo, [b + Math.cos(g) * d, a + Math.sin(g) * d])); return this
    }; b.clone = function () {
        var b = new a; b._instructions = this._instructions.slice(); b._activeInstructions = this._activeInstructions.slice(); b._oldInstructions = this._oldInstructions.slice();
        if (this._fillInstructions) b._fillInstructions = this._fillInstructions.slice(); if (this._strokeInstructions) b._strokeInstructions = this._strokeInstructions.slice(); if (this._strokeStyleInstructions) b._strokeStyleInstructions = this._strokeStyleInstructions.slice(); b._active = this._active; b._dirty = this._dirty; return b
    }; b.toString = function () { return "[Graphics]" }; b.mt = b.moveTo; b.lt = b.lineTo; b.at = b.arcTo; b.bt = b.bezierCurveTo; b.qt = b.quadraticCurveTo; b.a = b.arc; b.r = b.rect; b.cp = b.closePath; b.c = b.clear; b.f = b.beginFill;
    b.lf = b.beginLinearGradientFill; b.rf = b.beginRadialGradientFill; b.bf = b.beginBitmapFill; b.ef = b.endFill; b.ss = b.setStrokeStyle; b.s = b.beginStroke; b.ls = b.beginLinearGradientStroke; b.rs = b.beginRadialGradientStroke; b.bs = b.beginBitmapStroke; b.es = b.endStroke; b.dr = b.drawRect; b.rr = b.drawRoundRect; b.rc = b.drawRoundRectComplex; b.dc = b.drawCircle; b.de = b.drawEllipse; b.dp = b.drawPolyStar; b._updateInstructions = function () {
        this._instructions = this._oldInstructions.slice(); this._instructions.push(a.beginCmd); this._fillInstructions &&
        this._instructions.push.apply(this._instructions, this._fillInstructions); this._strokeInstructions && (this._instructions.push.apply(this._instructions, this._strokeInstructions), this._strokeStyleInstructions && this._instructions.push.apply(this._instructions, this._strokeStyleInstructions)); this._instructions.push.apply(this._instructions, this._activeInstructions); this._fillInstructions && this._instructions.push(a.fillCmd); this._strokeInstructions && this._instructions.push(a.strokeCmd)
    }; b._newPath = function () {
        this._dirty &&
        this._updateInstructions(); this._oldInstructions = this._instructions; this._activeInstructions = []; this._active = this._dirty = false
    }; b._setProp = function (b, a) { this[b] = a }; j.Graphics = a
})(window); (function (j) {
    var c = function () { this.initialize() }, a = c.prototype; c.suppressCrossDomainErrors = false; c._hitTestCanvas = document.createElement("canvas"); c._hitTestCanvas.width = c._hitTestCanvas.height = 1; c._hitTestContext = c._hitTestCanvas.getContext("2d"); c._nextCacheID = 1; a.alpha = 1; a.cacheCanvas = null; a.id = -1; a.mouseEnabled = true; a.name = null; a.parent = null; a.regX = 0; a.regY = 0; a.rotation = 0; a.scaleX = 1; a.scaleY = 1; a.skewX = 0; a.skewY = 0; a.shadow = null; a.visible = true; a.x = 0; a.y = 0; a.compositeOperation = null; a.snapToPixel =
    false; a.onPress = null; a.onClick = null; a.onDoubleClick = null; a.onMouseOver = null; a.onMouseOut = null; a.tick = null; a.filters = null; a.cacheID = 0; a._cacheOffsetX = 0; a._cacheOffsetY = 0; a._cacheDataURLID = 0; a._cacheDataURL = null; a._matrix = null; a.initialize = function () { this.id = UID.get(); this._matrix = new Matrix2D }; a.isVisible = function () { return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 }; a.draw = function (b, a) {
        if (a || !this.cacheCanvas) return false; b.drawImage(this.cacheCanvas, this._cacheOffsetX, this._cacheOffsetY);
        return true
    }; a.cache = function (b, a, i, d) { if (this.cacheCanvas == null) this.cacheCanvas = document.createElement("canvas"); var e = this.cacheCanvas.getContext("2d"); this.cacheCanvas.width = i; this.cacheCanvas.height = d; e.clearRect(0, 0, i + 1, d + 1); e.setTransform(1, 0, 0, 1, -b, -a); this.draw(e, true, this._matrix.reinitialize(1, 0, 0, 1, -b, -a)); this._cacheOffsetX = b; this._cacheOffsetY = a; this._applyFilters(); this.cacheID = c._nextCacheID++ }; a.updateCache = function (b) {
        if (this.cacheCanvas == null) throw "cache() must be called before updateCache()";
        var a = this.cacheCanvas.getContext("2d"); a.setTransform(1, 0, 0, 1, -this._cacheOffsetX, -this._cacheOffsetY); b ? a.globalCompositeOperation = b : a.clearRect(0, 0, this.cacheCanvas.width + 1, this.cacheCanvas.height + 1); this.draw(a, true); if (b) a.globalCompositeOperation = "source-over"; this._applyFilters(); this.cacheID = c._nextCacheID++
    }; a.uncache = function () { this._cacheDataURL = this.cacheCanvas = null; this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0 }; a.getCacheDataURL = function () {
        if (!this.cacheCanvas) return null; if (this.cacheID !=
        this._cacheDataURLID) this._cacheDataURL = this.cacheCanvas.toDataURL(); return this._cacheDataURL
    }; a.getStage = function () { for (var b = this; b.parent;) b = b.parent; return b instanceof Stage ? b : null }; a.localToGlobal = function (b, a) { var c = this.getConcatenatedMatrix(this._matrix); if (c == null) return null; c.append(1, 0, 0, 1, b, a); return new Point(c.tx, c.ty) }; a.globalToLocal = function (b, a) { var c = this.getConcatenatedMatrix(this._matrix); if (c == null) return null; c.invert(); c.append(1, 0, 0, 1, b, a); return new Point(c.tx, c.ty) };
    a.localToLocal = function (b, a, c) { b = this.localToGlobal(b, a); return c.globalToLocal(b.x, b.y) }; a.setTransform = function (b, a, c, d, e, f, g, k, h) { this.x = b || 0; this.y = a || 0; this.scaleX = c == null ? 1 : c; this.scaleY = d == null ? 1 : d; this.rotation = e || 0; this.skewX = f || 0; this.skewY = g || 0; this.regX = k || 0; this.regY = h || 0 }; a.getConcatenatedMatrix = function (b) {
        b ? b.identity() : b = new Matrix2D; for (var a = this; a != null;) b.prependTransform(a.x, a.y, a.scaleX, a.scaleY, a.rotation, a.skewX, a.skewY, a.regX, a.regY), b.prependProperties(a.alpha, a.shadow,
        a.compositeOperation), a = a.parent; return b
    }; a.hitTest = function (b, a) { var i = c._hitTestContext, d = c._hitTestCanvas; i.setTransform(1, 0, 0, 1, -b, -a); this.draw(i); i = this._testHit(i); d.width = 0; d.width = 1; return i }; a.clone = function () { var b = new c; this.cloneProps(b); return b }; a.toString = function () { return "[DisplayObject (name=" + this.name + ")]" }; a.cloneProps = function (b) {
        b.alpha = this.alpha; b.name = this.name; b.regX = this.regX; b.regY = this.regY; b.rotation = this.rotation; b.scaleX = this.scaleX; b.scaleY = this.scaleY; b.shadow =
        this.shadow; b.skewX = this.skewX; b.skewY = this.skewY; b.visible = this.visible; b.x = this.x; b.y = this.y; b.mouseEnabled = this.mouseEnabled; b.compositeOperation = this.compositeOperation; if (this.cacheCanvas) b.cacheCanvas = this.cacheCanvas.cloneNode(true), b.cacheCanvas.getContext("2d").putImageData(this.cacheCanvas.getContext("2d").getImageData(0, 0, this.cacheCanvas.width, this.cacheCanvas.height), 0, 0)
    }; a.applyShadow = function (b, a) {
        a = a || Shadow.identity; b.shadowColor = a.color; b.shadowOffsetX = a.offsetX; b.shadowOffsetY =
        a.offsetY; b.shadowBlur = a.blur
    }; a._tick = function () { this.tick && this.tick() }; a._testHit = function (b) { try { var a = b.getImageData(0, 0, 1, 1).data[3] > 1 } catch (i) { if (!c.suppressCrossDomainErrors) throw "An error has occured. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."; } return a }; a._applyFilters = function () {
        if (this.filters && this.filters.length != 0 && this.cacheCanvas) for (var b = this.filters.length, a = this.cacheCanvas.getContext("2d"), c = this.cacheCanvas.width,
        d = this.cacheCanvas.height, e = 0; e < b; e++) this.filters[e].applyFilter(a, 0, 0, c, d)
    }; j.DisplayObject = c
})(window); (function (j) {
    var c = function () { this.initialize() }, a = c.prototype = new DisplayObject; a.children = null; a.DisplayObject_initialize = a.initialize; a.initialize = function () { this.DisplayObject_initialize(); this.children = [] }; a.isVisible = function () { return this.visible && this.alpha > 0 && this.children.length && this.scaleX != 0 && this.scaleY != 0 }; a.DisplayObject_draw = a.draw; a.draw = function (b, a, i) {
        var d = Stage._snapToPixelEnabled; if (this.DisplayObject_draw(b, a)) return true; for (var i = i || this._matrix.reinitialize(1, 0, 0, 1, 0, 0,
        this.alpha, this.shadow, this.compositeOperation), a = this.children.length, e = this.children.slice(0), f = 0; f < a; f++) {
            var g = e[f]; if (g.isVisible()) {
                var k = false, h = g._matrix.reinitialize(i.a, i.b, i.c, i.d, i.tx, i.ty, i.alpha, i.shadow, i.compositeOperation); h.appendTransform(g.x, g.y, g.scaleX, g.scaleY, g.rotation, g.skewX, g.skewY, g.regX, g.regY); h.appendProperties(g.alpha, g.shadow, g.compositeOperation); if (!(g instanceof c && g.cacheCanvas == null)) d && g.snapToPixel && h.a == 1 && h.b == 0 && h.c == 0 && h.d == 1 ? b.setTransform(h.a, h.b, h.c,
                h.d, h.tx + 0.5 | 0, h.ty + 0.5 | 0) : b.setTransform(h.a, h.b, h.c, h.d, h.tx, h.ty), b.globalAlpha = h.alpha, b.globalCompositeOperation = h.compositeOperation || "source-over", (k = h.shadow) && this.applyShadow(b, k); g.draw(b, false, h); k && this.applyShadow(b)
            }
        } return true
    }; a.addChild = function (b) { if (b == null) return b; var a = arguments.length; if (a > 1) { for (var c = 0; c < a; c++) this.addChild(arguments[c]); return arguments[a - 1] } b.parent && b.parent.removeChild(b); b.parent = this; this.children.push(b); return b }; a.addChildAt = function (b, a) {
        var c =
        arguments.length; if (c > 2) { for (var a = arguments[d - 1], d = 0; d < c - 1; d++) this.addChildAt(arguments[d], a + d); return arguments[c - 2] } b.parent && b.parent.removeChild(b); b.parent = this; this.children.splice(a, 0, b); return b
    }; a.removeChild = function (b) { var a = arguments.length; if (a > 1) { for (var c = true, d = 0; d < a; d++) c = c && this.removeChild(arguments[d]); return c } return this.removeChildAt(this.children.indexOf(b)) }; a.removeChildAt = function (b) {
        var a = arguments.length; if (a > 1) {
            for (var c = [], d = 0; d < a; d++) c[d] = arguments[d]; c.sort(function (b,
            a) { return a - b }); for (var e = true, d = 0; d < a; d++) e = e && this.removeChildAt(c[d]); return e
        } if (b < 0 || b > this.children.length - 1) return false; a = this.children[b]; if (a != null) a.parent = null; this.children.splice(b, 1); return true
    }; a.removeAllChildren = function () { for (var b = this.children; b.length;) b.pop().parent = null }; a.getChildAt = function (b) { return this.children[b] }; a.sortChildren = function (b) { this.children.sort(b) }; a.getChildIndex = function (b) { return this.children.indexOf(b) }; a.getNumChildren = function () { return this.children.length };
    a.swapChildrenAt = function (b, a) { var c = this.children, d = c[b], e = c[a]; d && e && (c[b] = e, c[a] = d) }; a.swapChildren = function (b, a) { for (var c = this.children, d, e, f = 0, g = c.length; f < g; f++) if (c[f] == b && (d = f), c[f] == a && (e = f), d != null && e != null) return; f != g && (c[d] = a, c[e] = b) }; a.setChildIndex = function (b, a) { for (var c = this.children, d = 0, e = c.length; d < e; d++) if (c[d] == b) break; d == e || a < 0 || a > e || d == a || (c.splice(a, 1), a < d && d--, c.splice(b, d, 0)) }; a.contains = function (b) { for (; b;) { if (b == this) return true; b = b.parent } return false }; a.hitTest = function (b,
    a) { return this.getObjectUnderPoint(b, a) != null }; a.getObjectsUnderPoint = function (b, a) { var c = [], d = this.localToGlobal(b, a); this._getObjectsUnderPoint(d.x, d.y, c); return c }; a.getObjectUnderPoint = function (b, a) { var c = this.localToGlobal(b, a); return this._getObjectsUnderPoint(c.x, c.y) }; a.clone = function (b) { var a = new c; this.cloneProps(a); if (b) for (var i = a.children = [], d = 0, e = this.children.length; d < e; d++) { var f = this.children[d].clone(b); f.parent = a; i.push(f) } return a }; a.toString = function () {
        return "[Container (name=" +
        this.name + ")]"
    }; a._tick = function (b) { for (var a = this.children.length - 1; a >= 0; a--) { var c = this.children[a]; c._tick && c._tick(b) } this.tick && this.tick() }; a._getObjectsUnderPoint = function (b, a, i, d) {
        var e = DisplayObject._hitTestContext, f = DisplayObject._hitTestCanvas, g = this._matrix, k = d & 1 && (this.onPress || this.onClick || this.onDoubleClick) || d & 2 && (this.onMouseOver || this.onMouseOut); if (this.cacheCanvas) if (this.getConcatenatedMatrix(g), e.setTransform(g.a, g.b, g.c, g.d, g.tx - b, g.ty - a), e.globalAlpha = g.alpha, this.draw(e),
        this._testHit(e)) { if (f.width = 0, f.width = 1, k) return this } else return null; for (var h = this.children.length - 1; h >= 0; h--) {
            var l = this.children[h]; if (l.isVisible() && l.mouseEnabled) if (l instanceof c) if (k) { if (l = l._getObjectsUnderPoint(b, a)) return this } else { if (l = l._getObjectsUnderPoint(b, a, i, d), !i && l) return l } else if (!d || k || d & 1 && (l.onPress || l.onClick || l.onDoubleClick) || d & 2 && (l.onMouseOver || l.onMouseOut)) if (l.getConcatenatedMatrix(g), e.setTransform(g.a, g.b, g.c, g.d, g.tx - b, g.ty - a), e.globalAlpha = g.alpha, l.draw(e),
            this._testHit(e)) if (f.width = 0, f.width = 1, k) return this; else if (i) i.push(l); else return l
        } return null
    }; j.Container = c
})(window); (function (j) {
    var c = function (b) { this.initialize(b) }, a = c.prototype = new Container; c._snapToPixelEnabled = false; a.autoClear = true; a.canvas = null; a.mouseX = null; a.mouseY = null; a.onMouseMove = null; a.onMouseUp = null; a.onMouseDown = null; a.snapToPixelEnabled = false; a.mouseInBounds = false; a.tickOnUpdate = true; a._activeMouseEvent = null; a._activeMouseTarget = null; a._mouseOverIntervalID = null; a._mouseOverX = 0; a._mouseOverY = 0; a._mouseOverTarget = null; a.Container_initialize = a.initialize; a.initialize = function (b) {
        this.Container_initialize();
        this.canvas = b instanceof HTMLCanvasElement ? b : document.getElementById(b); this._enableMouseEvents(true)
    }; a.update = function () { if (this.canvas) { this.autoClear && this.clear(); c._snapToPixelEnabled = this.snapToPixelEnabled; if (this.tickOnUpdate) { if (this.tick == this.update) { var b = 1; this.tick = null } this._tick(true); if (b) this.tick = this.update } this.draw(this.canvas.getContext("2d"), false, this.getConcatenatedMatrix(this._matrix)) } }; a.tick = a.update; a.clear = function () {
        if (this.canvas) {
            var b = this.canvas.getContext("2d");
            b.setTransform(1, 0, 0, 1, 0, 0); b.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }; a.toDataURL = function (b, a) { a || (a = "image/png"); var c = this.canvas.getContext("2d"), d = this.canvas.width, e = this.canvas.height, f; if (b) { f = c.getImageData(0, 0, d, e); var g = c.globalCompositeOperation; c.globalCompositeOperation = "destination-over"; c.fillStyle = b; c.fillRect(0, 0, d, e) } var k = this.canvas.toDataURL(a); if (b) c.clearRect(0, 0, d, e), c.putImageData(f, 0, 0), c.globalCompositeOperation = g; return k }; a.enableMouseOver = function (b) {
        if (this._mouseOverIntervalID) clearInterval(this._mouseOverIntervalID),
        this._mouseOverIntervalID = null; if (b == null) b = 20; else if (b <= 0) return; var a = this; this._mouseOverIntervalID = setInterval(function () { a._testMouseOver() }, 1E3 / Math.min(50, b)); this._mouseOverX = NaN; this._mouseOverTarget = null
    }; a.clone = function () { var b = new c(null); this.cloneProps(b); return b }; a.toString = function () { return "[Stage (name=" + this.name + ")]" }; a._enableMouseEvents = function () {
        var b = this, a = j.addEventListener ? j : document; a.addEventListener("mouseup", function (a) { b._handleMouseUp(a) }, false); a.addEventListener("mousemove",
        function (a) { b._handleMouseMove(a) }, false); a.addEventListener("dblclick", function (a) { b._handleDoubleClick(a) }, false); this.canvas && this.canvas.addEventListener("mousedown", function (a) { b._handleMouseDown(a) }, false)
    }; a._handleMouseMove = function (b) {
        if (this.canvas) { if (!b) b = j.event; var a = this.mouseInBounds; this._updateMousePosition(b.pageX, b.pageY); if (a || this.mouseInBounds) { b = new MouseEvent("onMouseMove", this.mouseX, this.mouseY, this, b); if (this.onMouseMove) this.onMouseMove(b); if (this._activeMouseEvent && this._activeMouseEvent.onMouseMove) this._activeMouseEvent.onMouseMove(b) } } else this.mouseX =
        this.mouseY = null
    }; a._updateMousePosition = function (b, a) { var c = this.canvas; do b -= c.offsetLeft, a -= c.offsetTop; while (c = c.offsetParent); if (this.mouseInBounds = b >= 0 && a >= 0 && b < this.canvas.width && a < this.canvas.height) this.mouseX = b, this.mouseY = a }; a._handleMouseUp = function (b) {
        var a = new MouseEvent("onMouseUp", this.mouseX, this.mouseY, this, b); if (this.onMouseUp) this.onMouseUp(a); if (this._activeMouseEvent && this._activeMouseEvent.onMouseUp) this._activeMouseEvent.onMouseUp(a); if (this._activeMouseTarget && this._activeMouseTarget.onClick &&
        this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, true, this._mouseOverIntervalID ? 3 : 1) == this._activeMouseTarget) this._activeMouseTarget.onClick(new MouseEvent("onClick", this.mouseX, this.mouseY, this._activeMouseTarget, b)); this._activeMouseEvent = this._activeMouseTarget = null
    }; a._handleMouseDown = function (b) {
        if (this.onMouseDown) this.onMouseDown(new MouseEvent("onMouseDown", this.mouseX, this.mouseY, this, b)); var a = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, this._mouseOverIntervalID ? 3 : 1);
        if (a) { if (a.onPress instanceof Function && (b = new MouseEvent("onPress", this.mouseX, this.mouseY, a, b), a.onPress(b), b.onMouseMove || b.onMouseUp)) this._activeMouseEvent = b; this._activeMouseTarget = a }
    }; a._testMouseOver = function () {
        if (!(this.mouseX == this._mouseOverX && this.mouseY == this._mouseOverY && this.mouseInBounds)) {
            var b = null; if (this.mouseInBounds) b = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, 3), this._mouseOverX = this.mouseX, this._mouseOverY = this.mouseY; if (this._mouseOverTarget != b) {
                if (this._mouseOverTarget &&
                this._mouseOverTarget.onMouseOut) this._mouseOverTarget.onMouseOut(new MouseEvent("onMouseOut", this.mouseX, this.mouseY, this._mouseOverTarget)); if (b && b.onMouseOver) b.onMouseOver(new MouseEvent("onMouseOver", this.mouseX, this.mouseY, b)); this._mouseOverTarget = b
            }
        }
    }; a._handleDoubleClick = function (b) {
        if (this.onDoubleClick) this.onDoubleClick(new MouseEvent("onDoubleClick", this.mouseX, this.mouseY, this, b)); var a = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, this._mouseOverIntervalID ? 3 : 1); if (a && a.onDoubleClick instanceof
        Function) a.onDoubleClick(new MouseEvent("onPress", this.mouseX, this.mouseY, a, b))
    }; j.Stage = c
})(window); (function (j) {
    var c = function (b) { this.initialize(b) }, a = c.prototype = new DisplayObject; a.image = null; a.snapToPixel = true; a.DisplayObject_initialize = a.initialize; a.initialize = function (b) { this.DisplayObject_initialize(); typeof b == "string" ? (this.image = new Image, this.image.src = b) : this.image = b }; a.isVisible = function () { return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2) }; a.DisplayObject_draw = a.draw; a.draw = function (b,
    a) { if (this.DisplayObject_draw(b, a)) return true; b.drawImage(this.image, 0, 0); return true }; a.clone = function () { var b = new c(this.image); this.cloneProps(b); return b }; a.toString = function () { return "[Bitmap (name=" + this.name + ")]" }; j.Bitmap = c
})(window); (function (j) {
    var c = function (b) { this.initialize(b) }, a = c.prototype = new DisplayObject; a.onAnimationEnd = null; a.currentFrame = -1; a.currentAnimation = null; a.paused = true; a.spriteSheet = null; a.snapToPixel = true; a.offset = 0; a.currentAnimationFrame = 0; a._advanceCount = 0; a._animation = null; a.DisplayObject_initialize = a.initialize; a.initialize = function (b) { this.DisplayObject_initialize(); this.spriteSheet = b }; a.isVisible = function () {
        return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.spriteSheet.complete &&
        this.currentFrame >= 0
    }; a.DisplayObject_draw = a.draw; a.draw = function (b, a) { if (this.DisplayObject_draw(b, a)) return true; this._normalizeFrame(); var c = this.spriteSheet.getFrame(this.currentFrame); if (c != null) { var d = c.rect; b.drawImage(c.image, d.x, d.y, d.width, d.height, -c.regX, -c.regY, d.width, d.height); return true } }; a.gotoAndPlay = function (b) { this.paused = false; this._goto(b) }; a.gotoAndStop = function (b) { this.paused = true; this._goto(b) }; a.advance = function () {
        this._animation ? this.currentAnimationFrame++ : this.currentFrame++;
        this._normalizeFrame()
    }; a.clone = function () { var b = new c(this.spriteSheet); this.cloneProps(b); return b }; a.toString = function () { return "[BitmapAnimation (name=" + this.name + ")]" }; a._tick = function (b) { var a = this._animation ? this._animation.frequency : 1; b && !this.paused && (++this._advanceCount + this.offset) % a == 0 && this.advance() }; a._normalizeFrame = function () {
        var b = this._animation; if (b) if (this.currentAnimationFrame >= b.frames.length) {
            if (b.next ? this._goto(b.next) : (this.paused = true, this.currentAnimationFrame = b.frames.length -
            1, this.currentFrame = b.frames[this.currentAnimationFrame]), this.onAnimationEnd) this.onAnimationEnd(this, b.name)
        } else this.currentFrame = b.frames[this.currentAnimationFrame]; else if (this.currentFrame >= this.spriteSheet.getNumFrames() && (this.currentFrame = 0, this.onAnimationEnd)) this.onAnimationEnd(this, null)
    }; a.DisplayObject_cloneProps = a.cloneProps; a.cloneProps = function (b) {
        this.DisplayObject_cloneProps(b); b.onAnimationEnd = this.onAnimationEnd; b.currentFrame = this.currentFrame; b.currentAnimation = this.currentAnimation;
        b.paused = this.paused; b.offset = this.offset; b._animation = this._animation; b.currentAnimationFrame = this.currentAnimationFrame
    }; a._goto = function (b) { if (isNaN(b)) { var a = this.spriteSheet.getAnimation(b); if (a) this.currentAnimationFrame = 0, this._animation = a, this.currentAnimation = b, this._normalizeFrame() } else this.currentAnimation = this._animation = null, this.currentFrame = b }; j.BitmapAnimation = c
})(window); (function (j) {
    var c = function (b) { this.initialize(b) }, a = c.prototype = new DisplayObject; a.graphics = null; a.DisplayObject_initialize = a.initialize; a.initialize = function (b) { this.DisplayObject_initialize(); this.graphics = b ? b : new Graphics }; a.isVisible = function () { return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.graphics }; a.DisplayObject_draw = a.draw; a.draw = function (b, a) { if (this.DisplayObject_draw(b, a)) return true; this.graphics.draw(b); return true }; a.clone = function (b) {
        b = new c(b && this.graphics ?
        this.graphics.clone() : this.graphics); this.cloneProps(b); return b
    }; a.toString = function () { return "[Shape (name=" + this.name + ")]" }; j.Shape = c
})(window); (function (j) {
    var c = function (b, a, c) { this.initialize(b, a, c) }, a = c.prototype = new DisplayObject; c._workingContext = document.createElement("canvas").getContext("2d"); a.text = ""; a.font = null; a.color = null; a.textAlign = null; a.textBaseline = null; a.maxWidth = null; a.outline = false; a.lineHeight = null; a.lineWidth = null; a.DisplayObject_initialize = a.initialize; a.initialize = function (b, a, c) { this.DisplayObject_initialize(); this.text = b; this.font = a; this.color = c ? c : "#000" }; a.isVisible = function () {
        return Boolean(this.visible && this.alpha >
        0 && this.scaleX != 0 && this.scaleY != 0 && this.text != null && this.text != "")
    }; a.DisplayObject_draw = a.draw; a.draw = function (b, a) {
        if (this.DisplayObject_draw(b, a)) return true; this.outline ? b.strokeStyle = this.color : b.fillStyle = this.color; b.font = this.font; b.textAlign = this.textAlign ? this.textAlign : "start"; b.textBaseline = this.textBaseline ? this.textBaseline : "alphabetic"; for (var c = String(this.text).split(/(?:\r\n|\r|\n)/), d = this.lineHeight == null ? this.getMeasuredLineHeight() : this.lineHeight, e = 0, f = 0, g = c.length; f < g; f++) {
            var k =
            b.measureText(c[f]).width; if (this.lineWidth == null || k < this.lineWidth) this._drawTextLine(b, c[f], e); else { for (var k = c[f].split(/(\s)/), h = k[0], l = 1, j = k.length; l < j; l += 2) b.measureText(h + k[l] + k[l + 1]).width > this.lineWidth ? (this._drawTextLine(b, h, e), e += d, h = k[l + 1]) : h += k[l] + k[l + 1]; this._drawTextLine(b, h, e) } e += d
        } return true
    }; a.getMeasuredWidth = function () { return this._getWorkingContext().measureText(this.text).width }; a.getMeasuredLineHeight = function () { return this._getWorkingContext().measureText("M").width * 1.2 };
    a.clone = function () { var b = new c(this.text, this.font, this.color); this.cloneProps(b); return b }; a.toString = function () { return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]" }; a.DisplayObject_cloneProps = a.cloneProps; a.cloneProps = function (b) { this.DisplayObject_cloneProps(b); b.textAlign = this.textAlign; b.textBaseline = this.textBaseline; b.maxWidth = this.maxWidth; b.outline = this.outline; b.lineHeight = this.lineHeight; b.lineWidth = this.lineWidth }; a._getWorkingContext = function () {
        var b =
        c._workingContext; b.font = this.font; b.textAlign = this.textAlign ? this.textAlign : "start"; b.textBaseline = this.textBaseline ? this.textBaseline : "alphabetic"; return b
    }; a._drawTextLine = function (b, a, c) { this.outline ? b.strokeText(a, 0, c, this.maxWidth) : b.fillText(a, 0, c, this.maxWidth || 65535) }; j.Text = c
})(window); (function (j) {
    var c = function () { throw "SpriteSheetUtils cannot be instantiated"; }; c._workingCanvas = document.createElement("canvas"); c._workingContext = c._workingCanvas.getContext("2d"); c.addFlippedFrames = function (a, b, j, i) { if (b || j || i) { var d = 0; b && c._flip(a, ++d, true, false); j && c._flip(a, ++d, false, true); i && c._flip(a, ++d, true, true) } }; c.extractFrame = function (a, b) {
        isNaN(b) && (b = a.getAnimation(b).frames[0]); var j = a.getFrame(b); if (!j) return null; var i = j.rect, d = c._workingCanvas; d.width = i.width; d.height = i.height;
        c._workingContext.drawImage(j.image, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height); j = new Image; j.src = d.toDataURL("image/png"); return j
    };
    c.clipImage = function (image, sx, sy, sw, sh) { var canvas = c._workingCanvas; canvas.width = sw; canvas.height = sh; c._workingContext.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh); var img = new Image(); img.src = canvas.toDataURL("image/png"); return img }; c._flip = function (a, b, j, i) {
        for (var d = a._images, e = c._workingCanvas, f = c._workingContext, g = d.length / b, k = 0; k < g; k++) { var h = d[k]; h.__tmp = k; e.width = h.width; e.height = h.height; f.setTransform(j ? -1 : 1, 0, 0, i ? -1 : 1, j ? h.width : 0, i ? h.height : 0); f.drawImage(h, 0, 0); var l = new Image; l.src = e.toDataURL("image/png"); l.width = h.width; l.height = h.height; d.push(l) } f = a._frames; e = f.length / b; for (k =
        0; k < e; k++) { var h = f[k], m = h.rect.clone(), l = d[h.image.__tmp + g * b], o = { image: l, rect: m, regX: h.regX, regY: h.regY }; if (j) m.x = l.width - m.x - m.width, o.regX = m.width - h.regX; if (i) m.y = l.height - m.y - m.height, o.regY = m.height - h.regY; f.push(o) } j = "_" + (j ? "h" : "") + (i ? "v" : ""); i = a._animations; a = a._data; d = i.length / b; for (k = 0; k < d; k++) { f = i[k]; h = a[f]; g = { name: f + j, frequency: h.frequency, next: h.next, frames: [] }; h.next && (g.next += j); f = h.frames; h = 0; for (l = f.length; h < l; h++) g.frames.push(f[h] + e * b); a[g.name] = g; i.push(g.name) }
    }; j.SpriteSheetUtils =
    c
})(window); (function (j) {
    var c = function (b) { this.initialize(b) }, a = c.prototype = new DisplayObject; a.htmlElement = null; a._style = null; a.DisplayObject_initialize = a.initialize; a.initialize = function (b) { typeof b == "string" && (b = document.getElementById(b)); this.DisplayObject_initialize(); this.mouseEnabled = false; if (this.htmlElement = b) this._style = b.style, this._style.position = "absolute", this._style.transformOrigin = this._style.webkitTransformOrigin = this._style.msTransformOrigin = this._style.MozTransformOrigin = "0% 0%" }; a.isVisible =
    function () { return this.htmlElement != null }; a.draw = function () { if (this.htmlElement != null) { var b = this._matrix, a = this.htmlElement; a.style.opacity = "" + b.alpha; a.style.visibility = this.visible ? "visible" : "hidden"; a.style.transform = a.style.webkitTransform = a.style.oTransform = a.style.msTransform = ["matrix(" + b.a, b.b, b.c, b.d, b.tx, b.ty + ")"].join(","); a.style.MozTransform = ["matrix(" + b.a, b.b, b.c, b.d, b.tx + "px", b.ty + "px)"].join(","); return true } }; a.cache = function () { }; a.uncache = function () { }; a.updateCache = function () { };
    a.hitTest = function () { }; a.localToGlobal = function () { }; a.globalToLocal = function () { }; a.localToLocal = function () { }; a.clone = function () { var a = new c; this.cloneProps(a); return a }; a.toString = function () { return "[DOMElement (name=" + this.name + ")]" }; a._tick = function () { if (this.htmlElement != null) this.htmlElement.style.visibility = "hidden" }; j.DOMElement = c
})(window); (function (j) { var c = function () { this.initialize() }, a = c.prototype; a.initialize = function () { }; a.getBounds = function () { return new Rectangle(0, 0, 0, 0) }; a.applyFilter = function () { }; a.toString = function () { return "[Filter]" }; a.clone = function () { return new c }; j.Filter = c })(window); (function (j) {
    var c = function () { throw "Touch cannot be instantiated"; }; c.isSupported = function () { return "ontouchstart" in j }; c.enable = function (a) { if (a != null && c.isSupported()) a._primaryTouchId = -1, a._handleTouchMoveListener = null, a.canvas.addEventListener("touchstart", function (b) { c._handleTouchStart(a, b) }, false), document.addEventListener("touchend", function (b) { c._handleTouchEnd(a, b) }, false) }; c._handleTouchStart = function (a, b) {
        b.preventDefault(); if (a._primaryTouchId == -1) {
            a._handleTouchMoveListener = a._handleTouchMoveListener ||
            function (b) { c._handleTouchMove(a, b) }; document.addEventListener("touchmove", a._handleTouchMoveListener, false); var j = b.changedTouches[0]; a._primaryTouchId = j.identifier; a._updateMousePosition(j.pageX, j.pageY); a._handleMouseDown(j)
        }
    }; c._handleTouchMove = function (a, b) { var j = c._findPrimaryTouch(a, b.changedTouches); j && a._handleMouseMove(j) }; c._handleTouchEnd = function (a, b) {
        var j = c._findPrimaryTouch(a, b.changedTouches); if (j) a._primaryTouchId = -1, a._handleMouseUp(j), document.removeEventListener("touchmove", a._handleTouchMoveListener),
        a._handleTouchMoveListener = null
    }; c._findPrimaryTouch = function (a, b) { for (var c = b.length, i = 0; i < c; i++) { var d = b[i]; if (d.identifier == a._primaryTouchId) return d } return null }; j.Touch = c
})(window);