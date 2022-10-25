/// <reference path="../../demo17/js/easeljs-0.6.1.min.js" />
/// <reference path="tweenjs-0.4.1.min.js" />
var GuideBox = function (id) {
    this.stage = new createjs.Stage(id);
    createjs.Ticker.addListener(this.stage, "tick");
    createjs.Ticker.setFPS(60);
    var self = this;
    this.stage.addEventListener("stagemousedown", function (event) {
        if (self.stage.mouseX >= self.stage.canvas.width / 2) {
            self.next();
        } else {
            self.prev();
        }
    });
  
    //playing,end
    this.state = "";
    var KEYCODE_SPACE = 32;
    var KEYCODE_UP = 38;
    var KEYCODE_LEFT = 37;
    var KEYCODE_RIGHT = 39;
    var KEYCODE_W = 87;
    var KEYCODE_A = 65;
    var KEYCODE_D = 68;
    var KEYCODE_J = 74;
    this.interval = 20;
    window.onkeyup = function (event) {
        if (!event) { var event = window.event; }
        switch (event.keyCode) {
            case KEYCODE_SPACE: energyHeld = true; break;
            case KEYCODE_J: shootHeld = true; break;
            case KEYCODE_A: self.prev(); break;
            case KEYCODE_LEFT: self.prev(); break;
            case KEYCODE_D: self.next(); break;
            case KEYCODE_RIGHT: self.next();  break;
        }
    }
    this.index = 0;
    this.statusIndex = 0;
    this.immediately = false;
    this.tweenTargets = [];
}

GuideBox.prototype.init = function () {

    this.tasks = [];
    var j = arguments.length;
    for (var i = 0; i < j; i++) {
        var ctt = new createjs.Container();
        this.stage.addChild(ctt);
        this.tasks.push(arguments[i]);
    }
    this.ctrlCTT = new createjs.Container();
    this.stage.addChild(this.ctrlCTT);
    this.ctrlShape = new createjs.Shape();
    this.ctrlCTT.addChild(this.ctrlShape);
    this.renderCtrl(j, 0);
}


GuideBox.prototype.next = function () {
  
   // if (this.statusIndex > this.tasks[this.index].length) return;
    if (this.state == "playing") {
        this.completeCurrentTask();
        return;
    }
    this.state = "playing";
  //执行中再按next,立即执行完
    var task = this.tasks[this.index][this.statusIndex]
    for (var item in task)
    {
        this[item].apply(this,task[item])
    }
    this.statusIndex++;

    if(this.statusIndex > this.tasks[this.index].length)
    {
        if (this.index < this.tasks.length - 1) {
            this.state = "";
            createjs.Tween.get(this.stage.getChildAt(this.index)).to({ alpha: 0 }, 300);
          
            this.index++;
            this.renderCtrl(this.tasks.length, this.index);
            createjs.Tween.get(this.stage.getChildAt(this.index)).to({ alpha: 1 }, 300);
   
            this.statusIndex = 0;
        } else {
            this.statusIndex--;
        }
    }
}

GuideBox.prototype.completeCurrentTask = function ()
{
    
    if (this.loop) clearInterval(this.loop);
    var tt;
    while (tt = this.tweenTargets.shift()) createjs.Tween.removeTweens(tt);
    var child = this.stage.getChildAt(this.index).children[this.statusIndex - 1];
    if (child) child.parent.removeChild(child);
    var task = this.tasks[this.index][this.statusIndex - 1];

    this.immediately = true;
    for (var item in task) {
        this[item].apply(this, task[item])
    }
}

GuideBox.prototype.prev = function () {
    //立即执行以前的task
    this.state = "";
    this.immediately = false;
    if (this.loop) clearInterval(this.loop);
    var tt;
    while (tt = this.tweenTargets.shift()) createjs.Tween.removeTweens(tt);
    if (this.statusIndex == 0) {
        if (this.index > 0) {
            createjs.Tween.get(this.stage.getChildAt(this.index)).to({ alpha: 0 }, 300)

            this.index--;
            createjs.Tween.get(this.stage.getChildAt(this.index)).to({ alpha: 1 }, 300)
            this.renderCtrl(this.tasks.length, this.index);
            this.statusIndex = this.tasks[this.index].length;
        }
        return;

    }
    var child = this.stage.getChildAt(this.index).children[this.statusIndex - 1];
    if (child) child.parent.removeChild(child);
    this.statusIndex--;
}

GuideBox.prototype.first = function () {

}

GuideBox.prototype.last = function () {

}


GuideBox.prototype.drawRect = function (x, y, width, height, lineWidth, color) {
    var shape = new createjs.Shape();
    this.stage.getChildAt(this.index).addChild(shape);
    var self = this;
    lineWidth = lineWidth || 3, color = color || "black";

    if (this.immediately)
    {       
        shape.graphics.ss(lineWidth).beginStroke(color);
        shape.graphics.rect(x, y, width, height);
        self.state = "";
        this.immediately = false;
    } else
    {
        var stepw = sw = 4, steph = sh = height / width * 4;
        this.loop = setInterval(function () {

            if (sw < width) {
                shape.graphics.clear();
                shape.graphics.ss(lineWidth).beginStroke(color);
                shape.graphics.rect(x, y, sw, sh);
                sw += stepw;
                sh += steph;
            } else {
                //self.interval = 10;
                self.state = "";
                clearInterval(self.loop);
            }
        }, self.interval);
    }
}

GuideBox.prototype.drawLine = function (x1, y1, x2, y2, lineWidth, color) {

    var shape = new createjs.Shape();
    this.stage.getChildAt(this.index).addChild(shape);
    if (this.immediately) {
        this.state = "";
        this.immediately = false;
        shape.graphics.ss(lineWidth).beginStroke(color);
        shape.graphics.mt(x1, y1).lineTo(x2, y2).cp().es();
      
    } else {
        var self = this;
        var p1 = new Vector2(x1, y1)
        var p2 = new Vector2(x2, y2)
        var d = p2.sub(p1).normalize();
        var dv = d.setLength(5);
        var target = p1.add(dv);
        var lengthS = p1.distanceToSquared(p2);

     this.loop = setInterval(function () {
            //加var的作用域bug
            lineWidth = lineWidth || 4, color = color || "black";

            if (target.distanceToSquared(p1) <= lengthS) {
                shape.graphics.clear();
                shape.graphics.ss(lineWidth).beginStroke(color);
                shape.graphics.mt(x1, y1).lineTo(target.x, target.y).cp().es();
                target = target.add(dv);
            } else {
                //self.interval = 20;
                self.state = "";
                clearInterval(self.loop);
            }
        }, self.interval)
    }

}

GuideBox.prototype.fillText = function (x, y, text, fontSize, color) {
    var txt = new createjs.Text(text, (fontSize||"20")+"px Arial", color||"#FFF");
    txt.y = y;
    txt.x = x;
    if (this.immediately)
    {
        this.state = "";
        this.immediately = false;
        this.stage.getChildAt(this.index).addChild(txt);
    } else
    {
        txt.alpha = 0;
        var self = this;
        this.stage.getChildAt(this.index).addChild(txt);
        this.tweenTargets.push(txt);
      createjs.Tween.get(txt).to({ alpha: 1 }, 1500).call(function () {
    
            self.state = "";
        });
    }
    
   
    
    
}

GuideBox.prototype.drawImage = function (x,y,src) {
    var bmp = new createjs.Bitmap(src);
    bmp.x = x;
    bmp.y = y;
   
    if (this.immediately) {
        this.state = "";
        this.immediately = false;
        this.stage.getChildAt(this.index).addChild(bmp);
    } else {
        bmp.alpha = 0;
        var self = this;
        this.stage.getChildAt(this.index).addChild(bmp);
        this.tweenTargets.push(bmp);
        createjs.Tween.get(bmp).to({ alpha: 1 }, 1500).call(function () {
            self.state = "";
        });
    }
}
GuideBox.prototype.drawCircle = function (x, y, r, lineWidth, color) {
    var shape = new createjs.Shape();
    this.stage.getChildAt(this.index).addChild(shape);
    var self = this;
    lineWidth = lineWidth || 3, color = color || "black";

    if (this.immediately) {
        shape.graphics.ss(lineWidth).beginStroke(color);
        shape.graphics.drawCircle(x, y,r);
        self.state = "";
        this.immediately = false;
    } else {
        var stepr = sr = 2;
        this.loop = setInterval(function () {

            if (sr < r) {
                shape.graphics.clear();
                shape.graphics.ss(lineWidth).beginStroke(color);
                shape.graphics.drawCircle(x, y, sr);
                sr += stepr;
            } else {
                //self.interval = 10;
                self.state = "";
                clearInterval(self.loop);
            }
        }, self.interval);
    }
}
GuideBox.prototype.renderCtrl = function (size, index) {
    this.ctrlShape.graphics.clear();
    var startX = this.stage.canvas.width/2-30*size/2-4;
    for (var i = 0; i < size; i++) {
        startX += 30
        this.ctrlShape.graphics.beginStroke("black").dc(startX , this.stage.canvas.height-15, 8).endStroke();
        this.ctrlShape.graphics.beginFill(i == index ? "black" : "white").dc(startX, this.stage.canvas.height - 15, 8).ef();
       
        
    }
    
}

GuideBox.prototype.drawArrow = function (direction, lineWidth, color) {

}

GuideBox.prototype.drawStar = function (direction, lineWidth, color) {

}

GuideBox.prototype.drawEllipse = function (direction, lineWidth, color) {

}

GuideBox._deepClone=function(item) {
    if (!item) { return item; } // null, undefined values check

    var types = [Number, String, Boolean],
        result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function (type) {
        if (item instanceof type) {
            result = type(item);
        }
    });

    if (typeof result == "undefined") {
        if (Object.prototype.toString.call(item) === "[object Array]") {
            result = [];
            item.forEach(function (child, index, array) {
                result[index] = GuideBox._deepClone(child);
            });
        } else if (typeof item == "object") {
            // testing that this is DOM
            if (item.nodeType && typeof item.cloneNode == "function") {
                var result = item.cloneNode(true);
            } else if (!item.prototype) { // check that this is a literal
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    // it is an object literal
                    result = {};
                    for (var i in item) {
                        result[i] = GuideBox._deepClone(item[i]);
                    }
                }
            } else {
                // depending what you would like here,
                // just keep the reference, or create new object
                if (false && item.constructor) {
                    // would not advice to do that, reason? Read below
                    result = new item.constructor();
                } else {
                    result = item;
                }
            }
        } else {
            result = item;
        }
    }

    return result;
}