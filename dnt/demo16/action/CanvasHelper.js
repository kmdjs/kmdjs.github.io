﻿(function(j){var h=[],b=[],i=function(e){this.canvas=e;this.w=this.canvas.width;this.h=this.canvas.height;this.imageData=this.canvas.getContext("2d").getImageData(0,0,this.w,this.h);h.length=0;for(var b=this.imageData.data,c={x:0,y:0},d=[],a=0,f=b.length;a<f;a+=4)if(b[a]+b[a+1]+b[a+2]+b[a+3]!=0&&b[a]+b[a+1]+b[a+2]+b[a+3]!=1020){c.x=a/4%this.w;c.y=parseInt(a/4/this.w);d.push({x:a/4%this.w,y:parseInt(a/4/this.w)})}this.pixPositions=d},g=1,e=2,c=2,f=2,d=2,a=i.prototype;a.searchRects=function(a){var d=this.getHaveColorPointByResultRectArr(a);if(b.length>0){var c=this.searchTransparentRectByCenterPoint(d);h.push(c);return this.searchRects(h)}else return h};a.getHaveColorPointByResultRectArr=function(c){b.length=0;if(!c){b.push(this.pixPositions[parseInt(this.pixPositions.length/2)]);return b[0]}for(var a=0;a<this.pixPositions.length;a++){var d=this.isInRect(this.pixPositions[a],c);!d&&b.push(this.pixPositions[a])}return b[parseInt(b.length/2)]};a.isInRect=function(c,b){for(var a=0;a<b.length;a++)if(c.x>=b[a][0].x&&c.x<=b[a][1].x&&c.y>=b[a][0].y&&c.y<=b[a][1].y)return true;return false};a.getPaintRect=function(){var a=this.pixPositions[parseInt(this.pixPositions.length/2)];return this.searchTransparentRectByCenterPoint(a)};a.isXLineTransparent=function(e,b){this.correctionPosition(e);this.correctionPosition(b);for(var f=b.y,c=e.x;c<b.x+1;c++){var a=this.getImageDataStartIndexByPosition({x:c,y:f});if(this.imageData.data[a]===undefined)continue;var d=this.imageData.data[a]+this.imageData.data[a+1]+this.imageData.data[a+2]+this.imageData.data[a+3];if(d!==0&&d!==1020)return false}return true};a.isYLineTransparent=function(e,b){this.correctionPosition(e);this.correctionPosition(b);for(var f=b.x,c=e.y;c<b.y+1;c++){var a=this.getImageDataStartIndexByPosition({x:f,y:c});if(this.imageData.data[a]===undefined)continue;var d=this.imageData.data[a]+this.imageData.data[a+1]+this.imageData.data[a+2]+this.imageData.data[a+3];if(d!==0&&d!==1020)return false}return true};a.getImageDataStartIndexByPosition=function(a){return a.y*this.w*4+a.x*4+1};a.correctionPosition=function(a){if(a.x<0)a.x=0;if(a.y<0)a.y=0;if(a.x>this.w)a.x=this.w;if(a.y>this.h)a.y=this.h};a.searchTransparentRectByCenterPoint=function(a){var b={x:a.x-e,y:a.y-f},j={x:a.x+c,y:a.y-f},h={x:a.x+c,y:a.y+d},k={x:a.x-e,y:a.y+d},i=true;if(!this.isXLineTransparent(b,j))if(b.y>0){f+=g;i=false}else{b.y=0;j.y=0}if(!this.isYLineTransparent(j,h))if(j.x<this.w){i=false;c+=g}else{j.x=this.w;h.x=this.w}if(!this.isXLineTransparent(k,h))if(h.y<this.h){i=false;d+=g}else{h.y=this.h;k.y=this.h}if(!this.isYLineTransparent(b,k))if(k.x>0){i=false;e+=g}else{b.x=0;k.x=0}if(i){e=2,c=2,f=2,d=2;return[b,h]}else return this.searchTransparentRectByCenterPoint(a)};j.CanvasHelper=i})(window)