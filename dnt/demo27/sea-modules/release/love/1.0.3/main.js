define("release/love/1.0.3/main",[],function(){function a(a,b){return 4*(b*d.width+a)}var b="李晋玮",c=function(a,b){this.x=a||0,this.y=b||0};c.prototype={set:function(a,b){return this.x=a,this.y=b,this},sub:function(a){return new c(this.x-a.x,this.y-a.y)},multiplyScalar:function(a){return this.x*=a,this.y*=a,this},divideScalar:function(a){return a?(this.x/=a,this.y/=a):this.set(0,0),this},length:function(){return Math.sqrt(this.lengthSq())},normalize:function(){return this.divideScalar(this.length())},lengthSq:function(){return this.x*this.x+this.y*this.y},distanceToSquared:function(a){var b=this.x-a.x,c=this.y-a.y;return b*b+c*c},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},setLength:function(a){return this.normalize().multiplyScalar(a)}},function(a){var b={};b.getRandomNumber=function(a,b){return a+Math.floor(Math.random()*(b-a+1))},b.randomFromArr=function(a){return a[Math.floor(Math.random()*a.length)]},a.MathHelper=b}(window);var d=document.querySelector("canvas"),e=d.getContext("2d"),f=new Image;f.src="cake.png",f.onload=function(){function g(){var b=setInterval(function(){for(var d=0;k>d;d+=1)A[d]=C[d];for(var d=0;y>d;d++){var f=v[d];f.x+=f.speed2.x,f.y+=f.speed2.y,new c(f.x,f.y).distanceToSquared(new c(f.target2X,f.target2Y))<9&&(f.speed2.x=0,f.speed2.y=0,f.x=f.target2X,f.y=f.target2Y),f.targetRgba;var g=a(Math.round(f.x),Math.round(f.y));A[g]=f.rgba[0],A[g+1]=f.rgba[1],A[g+2]=f.rgba[2],A[g+3]=f.rgba[3]}e.putImageData(z,0,0);for(var h=0,i=0;y>i;i++)0==v[i].speed2.x&&0==v[i].speed2.y&&h++;Math.abs(h-y)<20&&clearInterval(b)},60)}e.drawImage(f,100,85);for(var h=[],i=e.getImageData(0,0,d.width,d.height),j=i.data,k=4*d.width*d.height,l=0;k>l;l+=4)if(0!=j[l+3]){var m=l/4%d.width,n=parseInt(l/4/d.width);h.push({rgba:[j[l],j[l+1],j[l+2],j[l+3]],x:m,y:n})}e.clearRect(0,0,d.width,d.height);var o=o||"140px";e.font="bold "+o+" Arial",e.textBaseline="top",e.fillText("生日快乐",30,40);for(var p=e.getImageData(0,0,d.width,d.height),q=p.data,r=[],l=0;k>l;l+=4)if(0!=q[l+3]){var m=l/4%d.width,n=parseInt(l/4/d.width);r.push({rgba:[q[l],q[l+1],q[l+2],q[l+3]],x:m,y:n})}e.clearRect(0,0,d.width,d.height);var s=e.createLinearGradient(0,0,200,200);s.addColorStop(0,"#FF00FF"),s.addColorStop(.5,"#FFC0CB"),s.addColorStop(1,"red"),e.fillStyle=s;var o=o||"140px";e.font="bold "+o+" Arial",e.textBaseline="top",e.fillText(b,0,0);for(var t=e.getImageData(0,0,d.width,d.height),u=t.data,v=[],l=0;k>l;l+=4)if(0!=u[l+3]){var w=MathHelper.randomFromArr(h),x=MathHelper.randomFromArr(r),m=l/4%d.width,n=parseInt(l/4/d.width);v.push({rgba:w.rgba,x:m,y:n,targetX:w.x,targetY:w.y,speed:new c(w.x,w.y).sub(new c(m,n)).setLength(4),target2X:x.x,target2Y:x.y,speed2:new c(x.x,x.y).sub(new c(m,n)).setLength(4)})}var y=v.length;e.clearRect(0,0,d.width,d.height);var z=e.getImageData(0,0,d.width,d.height),A=z.data,B=e.getImageData(0,0,d.width,d.height),C=B.data,D=setInterval(function(){for(var b=0;k>b;b+=1)A[b]=C[b];for(var b=0;y>b;b++){var h=v[b];h.x+=h.speed.x,h.y+=h.speed.y,new c(h.x,h.y).distanceToSquared(new c(h.targetX,h.targetY))<9&&(h.speed.x=0,h.speed.y=0,h.x=h.targetX,h.y=h.targetY),h.targetRgba;var i=a(Math.round(h.x),Math.round(h.y));A[i]=h.rgba[0],A[i+1]=h.rgba[1],A[i+2]=h.rgba[2],A[i+3]=h.rgba[3]}e.putImageData(z,0,0);for(var j=0,l=0;y>l;l++)0==v[l].speed.x&&0==v[l].speed.y&&j++;if(Math.abs(j-y)<20){clearInterval(D),e.clearRect(0,0,d.width,d.height);for(var b=0;y>b;b++)v[b].speed2=new c(v[b].target2X,v[b].target2Y).sub(new c(v[b].x,v[b].y)).setLength(4);e.drawImage(f,100,85),setTimeout(function(){g()},1e3)}},60)}});
