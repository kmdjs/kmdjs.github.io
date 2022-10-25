/* 去除繁琐api 还原webgl本质
 * super easy to use library focus on webgl , you can create webgl demos in seconds with it. 
 * By dnt http://kmdjs.github.io/
 * Github: https://github.com/kmdjs/pixel
 * MIT Licensed.
 */
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.pixel = factory();
    }
}(this, function () {
    'use strict';

    var _pixel = function (selector, vertex, fragment) {
        var canvas = typeof selector === "string" ? document.querySelector(selector) : selector;
        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.protoClear = gl.clear;
        extend(gl);
        gl.textureCache = {};
        gl.program(vertex, fragment);
        gl.bufferIndex([0, 1, 2, 2, 1, 3]);
        return gl;

    }

    function extend(gl) {
        gl.bufferIndex = function (arr) {
            this.indexBuffer = this.createBuffer();
            this.bindBuffer(this.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            this.bufferData(this.ELEMENT_ARRAY_BUFFER, new Uint16Array(arr), this.STATIC_DRAW);
        }

        gl.program = function (vertex, fragment) {
            var program = this.loadProgram(this.getShader(vertex), this.getShader(fragment));
            this.useProgram(program);
            this._currentProgram = program;
        }

        gl.attribIndex = function (name) {
            return this.getAttribLocation(this._currentProgram,name);
        }

        gl.uniformIndex = function (name) {
            return this.getUniformLocation(this._currentProgram,name);
        }

        gl.buffer = function (name, arr) {
            var texCoordLocation = this.attribIndex(name);

            // provide texture coordinates for the rectangle.
            var texCoordBuffer = this.createBuffer();
            this.bindBuffer(this.ARRAY_BUFFER, texCoordBuffer);
            this.bufferData(this.ARRAY_BUFFER, new Float32Array(arr), this.STATIC_DRAW);
            this.enableVertexAttribArray(texCoordLocation);
            this.vertexAttribPointer(texCoordLocation, 2, this.FLOAT, false, 0, 0);
        
        }
        gl.uniform = function (name ,value) {
            this["uniform" + (arguments.length - 1) + "f"](this.uniformIndex("angle"), value);
        }
        gl.texture = function (image) {
            if (this.textureCache[image.src]) {
                image.glTexture = this.textureCache[image.src];               // this.activeTexture(this.TEXTURE0);                this.bindTexture(this.TEXTURE_2D, image.glTexture);
                return;
            }
            image.texture = this.createTexture();
            this.bindTexture(this.TEXTURE_2D,  image.texture );

            // Set the parameters so we can render any size image.
            this.texParameteri(this.TEXTURE_2D, this.TEXTURE_WRAP_S, this.CLAMP_TO_EDGE);
            this.texParameteri(this.TEXTURE_2D, this.TEXTURE_WRAP_T, this.CLAMP_TO_EDGE);
            this.texParameteri(this.TEXTURE_2D, this.TEXTURE_MIN_FILTER, this.NEAREST);
            this.texParameteri(this.TEXTURE_2D, this.TEXTURE_MAG_FILTER, this.NEAREST);

            // Upload the image into the texture.
            this.texImage2D(this.TEXTURE_2D, 0, this.RGBA, this.RGBA, this.UNSIGNED_BYTE, image);
            this.textureCache[image.src] = image.texture;
        }

        gl.draw = function () {
            this.drawElements(this.TRIANGLES, 6, this.UNSIGNED_SHORT, 0);
        }

        gl.getShader = function getShader( id) {
            var shaderScript = document.getElementById(id);

            // error - element with supplied id couldn't be retrieved
            if (!shaderScript) {
                return null;
            }

            // If successful, build a string representing the shader source
            var str = "precision mediump float;const mat4 pMatrix = mat4( " + 2 / this.canvas.width + ",0,0,0,0, " + -2 / this.canvas.height + ",0,0, 0,0,-2,0,-1,1,-1,1);";
            var k = shaderScript.firstChild;
            while (k) {
                if (k.nodeType == 3) {
                    str += k.textContent;
                }
                k = k.nextSibling;
            }

            var shader;

            // Create shaders based on the type we set
            //   note: these types are commonly used, but not required
            if (shaderScript.type == "x-shader/x-fragment") {
                shader = this.createShader(this.FRAGMENT_SHADER);
            } else if (shaderScript.type == "x-shader/x-vertex") {
                shader = this.createShader(this.VERTEX_SHADER);
            } else {
                return null;
            }

            this.shaderSource(shader, str);
            this.compileShader(shader);

            // Check the compile status, return an error if failed
            if (!this.getShaderParameter(shader, this.COMPILE_STATUS)) {
                console.log(this.getShaderInfoLog(shader));
                return null;
            }

            return shader;
        },
        gl.loadProgram=function( vertexShader, fragmentShader) {
            // create a progam object
            var program = this.createProgram();

            // attach the two shaders 
            this.attachShader(program, vertexShader);
            this.attachShader(program, fragmentShader);

            // link everything 
            this.linkProgram(program);

            // Check the link status
            var linked = this.getProgramParameter(program, this.LINK_STATUS);
            if (!linked) {

                // An error occurred while linking
                var lastError = this.getProgramInfoLog(program);
                console.warn("Error in program linking:" + lastError);

                this.deleteProgram(program);
                return null;
            }

            // if all is well, return the program object
            return program;
        };
        gl.clear = function () {
            this.protoClear(this.COLOR_BUFFER_BIT);
        }
        gl.position = function (vertex) {
            this.buffer("position", vertex)
        }
  
        gl.texCoord = function (vertex) {
            this.buffer("texCoord", vertex)
        }
    }
        
    var pixel = function (selector, vertex, fragment) {
        return new _pixel(selector, vertex, fragment);
    };

    pixel.images = {};
    pixel.loadImage = function (arr, callback) {
        var len = arr.length,loadedCount=0;
        for (var i = 0; i < len; i++) {
            var image = new Image,item=arr[i];
            image.onload = (function (item) {

                return function () {
                    pixel.images[item.id] = this;
                    loadedCount++;
                    if (loadedCount === len) callback();
                }
               
            })(item);
            image.src = item.src;
        }
    }
   
    return pixel;
}));