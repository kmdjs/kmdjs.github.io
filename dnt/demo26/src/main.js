define(function (require) {


    var Vector2 = require("./vector2");


 
    function getRandomNumber(min, max) {
        return (min + Math.floor(Math.random() * (max - min + 1)))
    }

    var canvas2 = document.querySelector("canvas");
    var ctx2 = canvas2.getContext("2d");
    var img = new Image();
    var anmPixel = [];
    img.onload = function () {
        ctx2.drawImage(img, 150,50)
        var offset = canvas2.getBoundingClientRect();
        canvas2.onclick = function (evt) {
            canvas2.onclick = null;
            var windCenter = new Vector2(evt.clientX - offset.left, evt.clientY - offset.top)
           
            var imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
            var imageData = imageData2.data;
            var image_data_len = canvas2.width * canvas2.height * 4;
            for (var i = 0; i < image_data_len ; i += 4) {
                if (imageData[i + 3] != 0) {

                    var x = (i / 4) % canvas2.width;
                    var y = parseInt((i / 4) / canvas2.width);

                    var pp = new Vector2(x, y);

                    if (pp.distanceToSquared(windCenter) < 100000) {
                        //r  g  b  a  x  y  speedx  speedy
                        anmPixel.push( {rgba:[imageData[i], imageData[i + 1], imageData[i + 2], imageData[i + 3]],x:x, y:y,speedx: getRandomNumber(-2, 2),speedy: getRandomNumber(-2, 2)});

                        imageData[i] = imageData[i + 1] = imageData[i + 2] = imageData[i + 3] = 0;
                        //imageData[index] = imageData[i];
                        //imageData[index + 1] = imageData[i + 1];
                        //imageData[index + 2] = imageData[i + 2];
                        //imageData[index + 3] = imageData[i + 3] / 1.05;
                        //x += Math.round(getRandomNumber(-1, 1))
                        //y -= Math.round(getRandomNumber(-1, 1));
                        //var index = getImageDataStartIndexByPosition2(x, y);
                        //imageData[index] = imageData[i];
                        //imageData[index + 1] = imageData[i + 1];
                        //imageData[index + 2] = imageData[i + 2];
                        //imageData[index + 3] = imageData[i + 3] / 1.05;

                       
                    }
                }
            }
            ctx2.putImageData(imageData2, 0, 0)
            var imageData3 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
            var imageDataPixel = imageData3.data;
            var imageData4 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
            var imageDataPixel2 = imageData4.data;
            setInterval(function () {
                for (var i = 0; i < image_data_len ; i += 1) {
                    imageDataPixel[i] = imageDataPixel2[i];
                }
                for (var i = 0, j = anmPixel.length; i < j;i++)
                {
                    var item = anmPixel[i];
                    item.x += item.speedx;
                    item.y += item.speedy;
                     item.speedy -= 0.1;
                     var index = getImageDataStartIndexByPosition2(Math.round(item.x), Math.round(item.y));
                   //  if (index > 0 && index < image_data_len) {
                         imageDataPixel[index] = item.rgba[0];
                         imageDataPixel[index + 1] = item.rgba[1];
                         imageDataPixel[index + 2] = item.rgba[2];
                         imageDataPixel[index + 3] = item.rgba[3];
                  //   }
                }
                ctx2.putImageData(imageData3, 0, 0)
            }, 60);
        //    ctx2.putImageData(imageData2, 0, 0)


        }
    }
    function getImageDataStartIndexByPosition2(x, y) {
        return (y * canvas2.width + x) * 4;
    }
    img.src = "computer.png";
})