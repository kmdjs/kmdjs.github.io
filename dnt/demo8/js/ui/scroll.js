/**
 * Created with JetBrains WebStorm.
 * User: wangxinbo
 * Date: 12-8-21
 * Time: 上午8:23
 * （1）会根据传递回来图片（必须是满显示时最大高度的图片）来自动生成后面的滚动框
 *  (2) 滑块的长度会根据内容的长度进行自动缩放,要传递给textarea每页的最大显示数，根据内容的最大行数和每页的最大显示行数，每次缩放1/page的高度
 */

define(function () {

    var globlethis;
    var shape;                    //框
    var bitmap;                   //滑块
    var shapeheight;              //框的高度
    var contentsize = 0;          //内容的行数,会通过adjust函数进行改变
    var persize = 0;
    var vx;
    var vy;
    var xh;
    var scrollcallback = null;
    var currentlinenum = 0;        //当前页的条数
    var minheight;                 //滚动条的最小长度：
    var scale = 1;                 //缩放的比例
    Scroll.prototype = new CJ.Container();

    /*
     *  bitmap:滑块的图片（要求是全天填充滚动的图片，会根据内容的行数进行缩放）
     *  contentsize:为当前内容的行数
     *  x:滚动条的x坐标
     *  y:滚动条的y坐标
     */
    function Scroll(bitmap, contentsize, persize, x, y) {
        this.initialize(bitmap, contentsize, persize, x, y);
    }

    Scroll.prototype.Container_initialize = Scroll.prototype.initialize;    //unique to avoid overiding base class

    Scroll.prototype.initialize = function (bitmapv, contentsizev, persizev, x, y) {

        this.Container_initialize();

        //初始化私有变量
        bitmap = bitmapv;
        vx = x;
        vy = y;
        contentsize = contentsizev;
        persize = persizev;
        globlethis = this;
        initShape();      //初始化滚动条的框
        initScrollBar();  //初始化滚动条

    }

    //调用者在tick中通过调用该方法时时调整滚动条的位置和缩放比例
    Scroll.prototype.adjust = function (size) { //size为当前总共的行数
        contentsize = size;
        //重新计算当前的页数和缩放比例
        var page = getPage(size);
        if (page > 1) {
            //缩放比列的计算
            if (shapeheight - (contentsize - persize) > minheight) {
                scale = 1 - ((contentsize - persize ) / shapeheight);
            }
            else {
                //缩小到一定值时不进行缩放（这时的逻辑后期需要补全）
                scale = minheight / shapeheight;
            }
            bitmap.scaleY = scale;
            xh = (bitmap.image.height) * scale;     //当前滑块的高度
            bitmap.y = (shape.y) + shapeheight - xh;
        }
        if (scrollcallback) {
        	scrollcallback(bitmap.y, shape.y,(shapeheight - xh));
        }
    }


    Scroll.prototype.onScroll = function (callback) {
        scrollcallback = callback;
    }


    Scroll.prototype.updateTargetYUp = function()
    {
        bitmap.y -= 1;
        if (scrollcallback) {
            scrollcallback(bitmap.y, shape.y,(shapeheight - xh));
        }

    }

    Scroll.prototype.updateTargetYDown = function()
    {
        bitmap.y += 1;
        if (scrollcallback) {
            scrollcallback(bitmap.y, shape.y,(shapeheight - xh));
        }

    }

    //初始化滚动条的框
    var initShape = function () {
        shapeheight = bitmap.image.height;
        var weight = bitmap.image.width
        //滚动条轮廓
        var g = new CJ.Graphics();
        g.setStrokeStyle(1);
        g.beginStroke(CJ.Graphics.getRGB(0, 0, 0));
        g.beginFill(CJ.Graphics.getRGB(66, 66, 66));
        g.drawRoundRect(0, 0, weight, shapeheight, 0);
        shape = new CJ.Shape(g);
        shape.x = vx;
        shape.y = vy;
        globlethis.addChild(shape);

    }


    /*
     *  初始化滚动条
     */
    var initScrollBar = function () {
        //滑块最小长度的计算方法
        if (shapeheight % persize == 0) {
            minheight = shapeheight - (shapeheight / persize - 1) * persize;
        }
        else {
            minheight = shapeheight - (Math.ceil(shapeheight / persize) - 1) * persize
        }

        var page = getPage(contentsize);
        bitmap.x = vx;
        bitmap.y = vy;
        //bitmap.regX = bitmap.image.width / 2 | 0;
        //bitmap.regY = (bitmap.image.height)/2|0;
        bitmap.scaleY = scale;     //按照信息内容进行缩放
        bitmap.name = "bmp";
        bitmap.visible = true;
        globlethis.addChild(bitmap);
        xh = (bitmap.image.height) * scale;     //当前滑块的高度
        var oldx = 0;
        var startY = 0;
        var scrollY = 0;
        var maxy = shape.y + shapeheight;

        (function (target) {
            bitmap.onPress = function (evt) {

            	startY = evt.stageY;	//起始点
            	scrollY = evt.target.y; //滚动条的y坐标
            	oldx = evt.stageY;      //鼠标的以前的y点

                evt.onMouseMove = function (ev) {
                    var offset = 0;
                    var offset_ = 0;
                    target.x = vx;         				         
                    if (ev.stageY < oldx) {                          //up
                    	offset = startY - ev.stageY;
                    	offset_ = ev.stageY - startY;
                    	if (scrollY + xh + offset_ >= maxy) {	//判断是否超过下边界
                    		target.y = shape.y + shapeheight - xh;
                    	} else 
                        if (scrollY - offset <= shape.y) {
                            target.y = shape.y;
                        } else {
                            target.y = scrollY - offset;          
                        }
                        //联动显示时向上处理
                        if (scrollcallback) {
                           scrollcallback(target.y, shape.y,(shapeheight - xh));
                        }
                    } else if(ev.stageY > oldx) { //down
                    	offset = ev.stageY - startY;
                    	offset_ = startY - ev.stageY;
                    	if (scrollY - offset_ <= shape.y) {	//判断是否超过上边界
                    		target.y = shape.y;
                    	} else 
                        if (scrollY + xh + offset >= maxy) {
                            target.y = maxy - xh;
                        }  else {
                            target.y = scrollY + offset;       
                        }
                        //联动显示时向下处理
                        if (scrollcallback) {
                           scrollcallback(target.y, shape.y,(shapeheight - xh));
                        }

                    }
                    oldx = ev.stageY;
                }

            }
        })(bitmap);
    }

    //计算当前页数,计算后直接更改全局变量page
    //size：内容的总行数，   persize为每页的最大行数
    var getPage = function (size) {
        var page = 1;

        var temp;
        var mod;
        if (size == 0) {
            temp = 0;
            mod = 0;
        }
        else {
            temp = parseInt(size / persize);
            mod = size % persize
        }

        if (temp == 0) {
            page = 1;
        }

        if (mod > 0) {
            page = temp + 1;
        }
        else if (mod == 0 && size != 0) {
            page = temp;
        }

        currentlinenum = mod;
        return page;
    }

    return Scroll;
});

