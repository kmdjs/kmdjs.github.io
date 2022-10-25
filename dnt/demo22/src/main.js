define(function (require) {


    var Vector2 = require("./vector2");
    var v2 = new Vector2(10, 10);
    
    console.log(v2.sub({ x: 1, y: 1 }));

    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    //ctx.font = "40px Georgia";
    //ctx.fillText("Hello World!", 10, 50);

    ctx.font = "40px Verdana";
    // 创建渐变
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height/2);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // 用渐变填色
    ctx.fillStyle = gradient;
   
    ctx.fillText(" Chinese Ink", 10, 90);

    var gradient2 = ctx.createLinearGradient(0, canvas.height / 2, canvas.width, 0);
    gradient2.addColorStop("0", "magenta");
    gradient2.addColorStop("0.5", "blue");
    gradient2.addColorStop("1.0", "yellow");
    ctx.fillText("create by 当耐特", 10, 180);
  
   
    var windCenter = new Vector2(10, canvas.height-140);
    var windR = 15;
    setInterval(function () {

        windR += 1;
        //ctx.beginPath();
        //ctx.arc(windCenter.x, windCenter.y, windR, 0, Math.PI * 2, true);
        //ctx.closePath();
        //ctx.stroke();


        var imageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var imageData = imageData2.data;
        var image_data_len = canvas.width * canvas.height * 4;
        for (var i = 0; i < image_data_len ; i += 4) {
            if (imageData[i + 3] != 0) {
            
                var x = (i / 4) % canvas.width;
                var y = parseInt((i / 4) / canvas.width);
     
                var pp = new Vector2(x, y);

                //if (pp.distanceToSquared(windCenter) < windR * windR) {
                //    var nv = pp.sub(windCenter).normalize();
                x +=Math.round( getRandomNumber(-1,1))
                y -=Math.round( getRandomNumber( -1,1));
                    var index = getImageDataStartIndexByPosition(x, y);
                  
                    imageData[index] = imageData[i];
                    imageData[index + 1] = imageData[i + 1];
                    imageData[index + 2] = imageData[i + 2];
                    imageData[index + 3] = imageData[i + 3]/1.05;
                   
                  //  imageData[i + 3] = 0;
                   // console.log(x+"__"+y)
                }
            //}
        }
        ctx.putImageData(imageData2, 0, 0)
    }, 300);

   

    function getImageDataStartIndexByPosition(x,y) {
        return (y * canvas.width+x) * 4 ;
    }    function getRandomNumber(min, max) {
        return (min + Math.floor(Math.random() * (max - min + 1)))
    }
    //1.写上字
    //2.开启定时器
    //3.loop=>遍历像素
    //4.求出x,y
    //5.求出x,y距离风中心得范围
    //6.移动该像素的x,y(根据风向)
})