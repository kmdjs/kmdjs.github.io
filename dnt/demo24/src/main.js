define(function (require) {


    var Vector2 = require("./vector2");


 
    function getRandomNumber(min, max) {
        return (min + Math.floor(Math.random() * (max - min + 1)))
    }

    var canvas2 = document.querySelector("canvas");
    var ctx2 = canvas2.getContext("2d");
    var img = new Image();
    img.onload = function () {
        ctx2.drawImage(img, 250, 90, 215, 234, 10, 0, 215, 234)

        canvas2.onmousemove = function (evt)
        {
            var offset = canvas2.getBoundingClientRect();
            var windCenter = new Vector2(evt.clientX - offset.left, evt.clientY - offset.top)
      
 


                var imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
                var imageData = imageData2.data;
                var image_data_len = canvas2.width * canvas2.height * 4;
                for (var i = 0; i < image_data_len ; i += 4) {
                    if (imageData[i + 3] != 0) {

                        var x = (i / 4) % canvas2.width;
                        var y = parseInt((i / 4) / canvas2.width);

                        var pp = new Vector2(x, y);

                        if (pp.distanceToSquared(windCenter) < 64) {
                            //    var nv = pp.sub(windCenter).normalize();
                            x += Math.round(getRandomNumber(-1, 1))
                            y -= Math.round(getRandomNumber(-1, 1));
                            var index = getImageDataStartIndexByPosition2(x, y);

                            imageData[index] = imageData[i];
                            imageData[index + 1] = imageData[i + 1];
                            imageData[index + 2] = imageData[i + 2];
                            imageData[index + 3] = imageData[i + 3] / 1.05;

                            //  imageData[i + 3] = 0;
                            // console.log(x+"__"+y)
                        }
                    }
                }
                ctx2.putImageData(imageData2, 0, 0)
     

        }
    }
    function getImageDataStartIndexByPosition2(x, y) {
        return (y * canvas2.width + x) * 4;
    }
    img.src = "plum.png";
})