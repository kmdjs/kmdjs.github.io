	define(function(){
		function Tips() {
			this.initialize();
		}
		//继承自 CJ.Container
	    Tips.prototype = new CJ.Container();
		// constructor:
	    Tips.prototype.Container_initialize = Tips.prototype.initialize; //unique to avoid overiding base class
    
		Tips.prototype.initialize = function() {
	        this.Container_initialize();
	        this.fontSize = 12;		//字体大小
			this.width = 170;		//固定宽度
			this.spacing = 20;		//行间距
			this.textSpacing = 16;	//文本强制换行,行间距
			this.special = 10;		//特殊属性(高亮属性)间距
			this.content = null;	//内容
			this.totalWidth = 0; //文字所占宽度
			this.rows = 0; //分几行进行显示
			this.rowsWord = 0; 	//每行显示的字数
			this.height = 0; //文字所占高度
			this.stage = Global.stage;
			this.contentsplit = true;
	    }
        Tips.prototype.popup = function(message) {
        	this.removeAllChildren(); 
        	this.content = message.content;
        	if (typeof message.content != 'string') {
        		this.totalWidth = this.fontSize * message.content.join().length; //文字所占宽度
        	} else {
	        	this.totalWidth = this.fontSize * this.content.length; //文字所占宽度
	        }
			this.rows = (this.totalWidth % this.width) == 0 ? (this.totalWidth / this.width) : (this.totalWidth / this.width) + 1; //分几行进行显示
			this.rowsWord = (this.width / this.fontSize) - 1; 	//每行显示的字数
			this.height = ((this.rows + 1) * this.textSpacing); //文字所占高度
			this.height += this.getMessageHeight(message);
			var position = this.getPosition();
			var x = position.x, y = position.y;
			var shape = new CJ.Shape();
			shape.graphics.beginBitmapStroke(Resource.getRes("22")).beginFill("rgba(11,11,15,0.8)").drawRoundRect(x, y, this.width, this.height,5).endFill();
			this.addChild(shape);
			x += 5;
			y += this.spacing;
            var titletext = this.createText(message.title.name + message.separate,  message.title.nameColor, x, y);
            this.addChild(titletext);
            if (message.title.value != null) {
            	var titlevalue = this.createText(message.title.value,   message.title.valueColor, titletext.getMeasuredWidth() + x + 10, y);
            	this.addChild(titlevalue);
            }
            y += this.spacing;
            for (var i = 0 ; i < message.properties.length; i++) {
            	var prop = message.properties[i];
            	if (prop.special) {
            		shape.graphics.beginBitmapStroke(Resource.getRes("33")).moveTo(x, y - this.special).lineTo(x + this.width - 10, y - this.special).endFill();
            		y += this.special;
            	}
            	var proptext = this.createText(prop.name + message.separate,  prop.nameColor, x, y);
            	this.addChild(proptext);
            	if (prop.value != null) {
	            	var propvalue = this.createText(prop.value,  prop.valueColor, proptext.getMeasuredWidth() + x + 10, y);
	            	this.addChild(propvalue);
	            }
	            y += this.spacing;
	            if (prop.special) {
            		shape.graphics.beginBitmapStroke(Resource.getRes("33")).moveTo(x, y - this.special).lineTo(x + this.width - 10, y - this.special).endFill();
            	}
            }
            if (message.properties.length > 0 && this.contentsplit) {
            	y += this.textSpacing;
            }
            var start = 0;
            if (typeof this.content != 'string') {
            	for (var m = 0; m < this.content.length; m++) {
            		start = 0;
            		var $content = this.content[m];
		            for (var i = 0; i < this.rows; i++) {
		            	this.addChild(this.createText($content.substring(start, start + this.rowsWord),  message.contentColor, x, y));
		            	y += this.textSpacing;
		            	if ($content.length < (start + this.rowsWord)) {
		            		this.addChild(this.createText($content.substring(start + this.rowsWord, $content.length),  message.contentColor, x, y));
		            		break;
		            	}
		            	start += this.rowsWord;
		            }
		        }
	        } else {
	        	for (var i = 0; i < this.rows; i++) {
	            	this.addChild(this.createText(this.content.substring(start, start + this.rowsWord),  message.contentColor, x, y));
	            	y += this.textSpacing;
	            	if (this.content.length < (start + this.rowsWord)) {
	            		this.addChild(this.createText(this.content.substring(start + this.rowsWord, this.content.length),  message.contentColor, x, y));
	            		break;
	            	}
	            	start += this.rowsWord;
	            }
	        }
            this.stage.addChild(this);
        }
        Tips.prototype.getPosition = function() {
        	var point = new CJ.Point();
        	point.x = this.stage.mouseX;
        	point.y = this.stage.mouseY;
        	var screenWidth = this.stage.canvas.width;
        	var screenHeigth = this.stage.canvas.height;
        	if (point.x + this.width > screenWidth) {
        		point.x = point.x - this.width - 40;
        	}
        	if (point.y + this.height > screenHeigth) {
        		point.y = point.y - this.height - 40;
        	}
        	return point;
        }
        Tips.prototype.createText = function(content, color, x, y) {
        	var text = new CJ.Text(content, this.fontSize + "px Arial", color);
            text.x = x;
            text.y = y;
            return text;
        }
        Tips.prototype.getMessageHeight = function(message) {
        	var height = 10;
        	var row = 0;
        	if (message.titlt != null) {
        		height += this.textSpacing;
        		row++;
        	}
        	for (var i = 0; i < message.properties.length; i++) {
        		height += this.textSpacing;
        		row++;
        	}
        	return height + (row * this.textSpacing); 
        }
        Tips.prototype.message = function() {
        	this.title = null;
        	this.properties = new Array();
        	this.content = null;
        	this.separate = "";
        }
        Tips.prototype.hiden = function() {
	       this.visible = false;
	    }
	    Tips.prototype.show = function() {
	       this.visible = true;
	    }
	    Tips.prototype.destroy = function() {
	       this.removeAllChildren(); 
           this.stage.removeChild(this);
	    }
        return Tips;
    })
    
