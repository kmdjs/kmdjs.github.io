(function() {
	var Highlight = (function() {
		function Highlight($appendTo) {
			this._$container = $('<div class="highlight"/>').appendTo( $appendTo );
		}
		
		var HighlightProto = Highlight.prototype;
		
		HighlightProto.moveTo = function(rect, animate) {
			var $container = this._$container.transitionStop(true),
				destination = {
					left: rect.x,
					top: rect.y,
					width: rect.width,
					height: rect.height,
					opacity: 1
				};
			
			
			if (rect.width && rect.height) {
				$container.css('display', 'block');
				
				if (animate) {
					$container.transition(destination, {
						duration: 200,
						easing: 'easeOutQuad'
					});
				}
				else {					
					$container.vendorCss(destination);				
				}
			}
			else {
				this.hide(animate);
			}
		};
		
		HighlightProto.hide = function(animate) {
			var $container = this._$container.transitionStop(true);
			
			if (animate) {
				var currentLeft = parseInt( $container.css('left') ),
					currentTop = parseInt( $container.css('top') );
				
				$container.transition({
					left: currentLeft + $container.width()  / 2,
					top:  currentTop  + $container.height() / 2,
					width: 0,
					height: 0,
					opacity: 0
				}, {
					duration: 200,
					easing: 'easeInQuad'
				});
			}
			else {
				$container.css('display', 'none');
			}
		};
		
		HighlightProto.setHighVisOnDark = function(highVis) {
			this._$container[highVis ? 'addClass' : 'removeClass']('high-vis');
			return this;
		}
		
		return Highlight;
	})();
	
	var SelectColor = (function() {
		
		function SelectColor($eventArea, $canvas) {
			this._$canvas = $canvas;
			this._$eventArea = $eventArea;
			this._context = $canvas[0].getContext('2d');
			this._listeners = [];
		}
		
		var SelectColorProto = SelectColor.prototype = new spriteCow.MicroEvent;
		
		SelectColorProto.activate = function() {
			var selectColor = this,
				canvasX, canvasY,
				context = selectColor._context,
				$eventArea = selectColor._$eventArea;
			
			selectColor._listeners.push([
				$eventArea, 'mousedown', function(event) {
					if (event.button !== 0) { return; }
					var color = selectColor._getColourAtMouse(event.pageX, event.pageY);
					selectColor.trigger('select', color);
					$(".css-output code").html("rgba: [" + color[0] + "," + color[1] + "," + color[2] + "," + (color[3]/255) +"]");
					event.preventDefault();
				}
			]);
			
			selectColor._listeners.push([
				$eventArea, 'mousemove', function(event) {
					var color = selectColor._getColourAtMouse(event.pageX, event.pageY);
					selectColor.trigger( 'move', color );
				}
			]);
			
			selectColor._listeners.forEach(function(set) {
				set[0].bind.apply( set[0], set.slice(1) );
			});
			
			return selectColor;
		};
		
		SelectColorProto.deactivate = function() {
			this._listeners.forEach(function(set) {
				set[0].unbind.apply( set[0], set.slice(1) );
			});
			
			return this;
		};
		
		SelectColorProto._getColourAtMouse = function(pageX, pageY) {
			var offset = this._$canvas.offset(),
				x = pageX - Math.floor(offset.left),
				y = pageY - Math.floor(offset.top);
			
			return this._context.getImageData(x, y, 1, 1).data;
		};
		
		return SelectColor;
	})();
	
	var SelectArea = (function() {
		function SelectArea($eventArea, $area, highlight) {
			this._$area = $area;
			this._$eventArea = $eventArea;
			this._highlight = highlight;
			this._listeners = [];
		}
		
		var SelectAreaProto = SelectArea.prototype = new spriteCow.MicroEvent;
		
		SelectAreaProto.activate = function() {
			var selectArea = this,
				rect = new spriteCow.Rect(0, 0, 0, 0),
				startX, startY,
				startPositionX, startPositionY,
				isDragging,
				$document = $(document);
			
			document.oncontextmenu = function () {
			    return false;
			};
			selectArea._listeners.push([
				selectArea._$eventArea, 'mousedown', function (event) {
				
				    //if (event.button !== 0) { return; }
				    if (event.button === 0) {
				        var offset = selectArea._$area.offset();
				        startX = event.pageX;
				        startY = event.pageY;
				        // firefox like coming up with fraction values from offset()
				        startPositionX = Math.floor(event.pageX - offset.left);
				        startPositionY = Math.floor(event.pageY - offset.top);

				        rect = new spriteCow.Rect(
                            startPositionX,
                            startPositionY,
                            1, 1
                        );

				        selectArea._highlight.moveTo(rect);
				        isDragging = true;
				     
				    } else if (event.button == 2) {
				        var dlCanvas = document.createElement("canvas");
				        var dlCtx = dlCanvas.getContext("2d");
				        dlCanvas.height = rect.height;
				        dlCanvas.width = rect.width;
				        dlCtx.drawImage(spriteCow.spriteCanvasInstance.currentImg, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
				        if (dlCanvas.toBlob) {
				            dlCanvas.toBlob(
                                function (blob) {
                                    var url = window.URL.createObjectURL(blob);
                                    var dlLink = document.createElement("a");
                                    dlLink.setAttribute('href', url);
                                    dlLink.setAttribute('download', new Date().getTime() + '.png');
                                    dlLink.click();
                                },
                                'image/png'
                            );
				        }
				    }

				    event.preventDefault();
				}
			]);
			
			selectArea._listeners.push([
				$document, 'mousemove', function(event) {
					if (!isDragging) { return; }
					
					rect.x = startPositionX + Math.min(event.pageX - startX, 0);
					rect.y = startPositionY + Math.min(event.pageY - startY, 0);
					rect.width = Math.abs(event.pageX - startX) || 1;
					rect.height = Math.abs(event.pageY - startY) || 1;
					selectArea._highlight.moveTo(rect);
				}
			]);
			
			selectArea._listeners.push([
				$document, 'mouseup', function(event) {
					if (!isDragging) { return; }
					isDragging = false;
					selectArea.trigger('select', rect);
				}
			]);
			
			selectArea._listeners.forEach(function(set) {
				set[0].bind.apply( set[0], set.slice(1) );
			});
			
			return selectArea;
		};
		
		SelectAreaProto.deactivate = function() {
			this._listeners.forEach(function(set) {
				set[0].unbind.apply( set[0], set.slice(1) );
			});
			
			return this;
		};
		
		return SelectArea;
	})();
	
	var CanvasHelper = {};

	CanvasHelper.drawCircle = function (x, y, r, ctx) {
	    ctx.save();
	    ctx.fillStyle = "white";
	    ctx.beginPath();
	    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
	    ctx.fill();
       
	    ctx.strokeStyle = "#00AAFF";
	    ctx.beginPath();
	    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
	    ctx.stroke();
	    ctx.restore();
	}

	CanvasHelper.drawLine = function (a,b,c,d, ctx) {
	    ctx.save();
	    ctx.strokeStyle = "#00AAFF";
	    ctx.lineWidth = 3;
	    ctx.beginPath();
	    ctx.moveTo(a, b);
	    ctx.lineTo(c, d);
	    ctx.stroke();
	    ctx.restore();
	}

	CanvasHelper.fillPolygon = function (path, ctx) {
	    var len = path.length;

	    ctx.save();
	    ctx.fillStyle = "#00AAFF";
	    ctx.globalAlpha = 0.3;
	    ctx.beginPath();
	    ctx.moveTo(path[0][0], path[0][1])
	    for (var i = 1; i < len; i++) {
	        ctx.lineTo(path[i][0], path[i][1]);
	    }
	    ctx.lineTo(path[0][0], path[0][1]);
	    ctx.fill();
	    ctx.restore();

	    ctx.save();
	 
	    ctx.lineWidth = 3;
	    ctx.strokeStyle = "#00AAFF";
	
	    ctx.stroke();
	    ctx.restore();
	}

	CanvasHelper.renderPath = function (path, ctx,canvas) {
	
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	   ctx.drawImage(spriteCow.spriteCanvasInstance.currentImg, 0,0);
	    var len=path.length;
	    if (len=== 0) return;

	    if (len === 1) {
	        CanvasHelper.drawCircle(path[0][0], path[0][1],5, ctx);
	        return;
	    }

	    if (len=== 2) {
	        CanvasHelper.drawLine(path[0][0], path[0][1], path[1][0], path[1][1], ctx)
	        CanvasHelper.drawCircle(path[0][0], path[0][1], 5, ctx);
	        CanvasHelper.drawCircle(path[1][0], path[1][1], 5, ctx);
	        return;
	    }

	    if (len > 2) {
	        CanvasHelper.fillPolygon(path,ctx);
	  


	        for (var i = 0; i < len; i++) {
	            CanvasHelper.drawCircle(path[i][0], path[i][1], 5, ctx);
	        }
	        return;
	    }
	}

	var SelectPolygon = (function () {
	    function SelectPolygon($canvas) {
	        this._$canvas = $canvas;
	        this._context = this._$canvas[0].getContext("2d");
	        this._path = [];
	    }
	    var SelectPolygonProto = SelectPolygon.prototype ;
	    SelectPolygonProto.activate = function () {
	        var self = this;
	        var ismousedown = false;
	        this._$canvas.bind("mousedown.polygon", function (event) {
	            var ctx = self._context;
	            ismousedown = true;
	            var offset = self._$canvas.offset();
	            var x = Math.floor(event.pageX - offset.left);
	            var y = Math.floor(event.pageY - offset.top);
	            
	            self._path.push([x, y]);
	            CanvasHelper.renderPath(self._path, ctx, self._$canvas[0]);

	            $(".css-output code").html(JSON.stringify(self._path));
	        })


       
	    }
	    SelectPolygonProto.deactivate = function () {
	        this._$canvas.unbind(".polygon");
	     
	        return this;
	    }
	    return SelectPolygon;
	})();

	spriteCow.SpriteCanvasView = (function() {
		function SpriteCanvasView(spriteCanvas, $appendToElm) {
			var spriteCanvasView = this,
				$container = $('<div class="sprite-canvas-container"/>'),
				$canvas = $( spriteCanvas.canvas ).appendTo( $container ),
				// this cannot be $appendToElm, as browsers pick up clicks on scrollbars, some don't pick up mouseup http://code.google.com/p/chromium/issues/detail?id=14204#makechanges
				highlight = new Highlight( $container ),
				selectArea = new SelectArea( $container, $canvas, highlight ),
				selectColor = new SelectColor( $canvas, $canvas ),
			    selectPolygon = new SelectPolygon($canvas);

			this._$container = $container;
			this._$bgElm = $appendToElm;
			this._spriteCanvas = spriteCanvas;
			this._highlight = highlight;
			this._selectArea = selectArea;
			this._selectColor = selectColor;
			this._selectPolygon = selectPolygon;
			$container.appendTo( $appendToElm );
			
			selectArea.bind('select', function(rect) {
				var spriteRect = spriteCanvas.trimBg(rect);
				if (spriteRect.width && spriteRect.height) { // false if clicked on bg pixel
					spriteRect = spriteCanvas.expandToSpriteBoundry(rect);
					spriteCanvasView._setCurrentRect(spriteRect);
				}
				else {
					highlight.hide(true);
				}
			    //◊¢»Î’‚¿Ôconsole.log(spriteRect)
				$(".css-output code").html(JSON.stringify(spriteRect));
			});
			
			selectColor.bind('select', function(color) {
				spriteCanvasView.trigger('bgColorSelect', color);
				spriteCanvas.setBg(color);
			});
			
			selectColor.bind('move', function(color) {
				spriteCanvasView.trigger('bgColorHover', color);
			});
		}
		
		var SpriteCanvasViewProto = SpriteCanvasView.prototype = new spriteCow.MicroEvent;
		
		SpriteCanvasViewProto._setCurrentRect = function(rect) {
			this._highlight.moveTo(rect, true);
			this.trigger('rectChange', rect);
		};
		
		SpriteCanvasViewProto.setTool = function (mode) {
		   
		    this._spriteCanvas.setImg(this._spriteCanvas.currentImg);
		    var selectArea = this._selectArea,
				selectColor = this._selectColor,
			selectPolygon = this._selectPolygon;
			this._highlight.hide();
			selectArea.deactivate();
			selectColor.deactivate();
			selectPolygon.deactivate();
			selectPolygon._path.length = 0;
			switch (mode) {
				case 'select-sprite':
					selectArea.activate();
					break;
				case 'select-bg':
					selectColor.activate();
					break;
			    case 'derived-vertex':
			        selectPolygon.activate();
			        break;
			}
		};
		
		SpriteCanvasViewProto.setBg = function(color) {
			if ( $.support.transition ) {
				this._$bgElm.transition({ 'background-color': color }, {
					duration: 500
				});								
			}
			else {
				this._$bgElm.css({ 'background-color': color });
			}
			
			this._highlight.setHighVisOnDark( color === '#000' );
		};
		
		return SpriteCanvasView;
	})();
	
})();