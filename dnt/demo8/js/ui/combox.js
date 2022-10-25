define(function () {

    var imgCount = 6;
    var imgsets = [];     //保存bitMap对象的索引
    var num = 0;             //当前数值
    var maxNum = 10;         //可以显示的最大值
    var minNum = 0;          //可以显示的最小值
    var upx = null;
    var upy = null;
    var downx = null;
    var downy = null;
    var upContainer = new CJ.Container();     //上选择的容器
    var downContainer = new CJ.Container();   //下选择的容器

    var scrollcallbackUp = null;                      //更改滚动条的位置的方法
    var scrollcallbackDown = null;

    ComBox.prototype = new CJ.Container();

    /*
     *  _minV:最小值
     *  _maxV:最大值
     *  _numV:初始值
     *  up_x: 上箭头的x坐标
     *  up_y: 上箭头的y坐标
     *  down_x:下箭头的x坐标
     *  down_y:下箭头的y坐标
     */
    function ComBox(_minV,_maxV,_numV, up_x, up_y, down_x, down_y) {
        this.initialize(_minV,_maxV,_numV, up_x, up_y, down_x, down_y);
    }

    ComBox.prototype.Container_initialize = ComBox.prototype.initialize; //unique to avoid overiding base class

    ComBox.prototype.initialize = function (_minV,_maxV,_numV, up_x, up_y, down_x, down_y) {

        this.Container_initialize();
        maxNum = _maxV;         //最大值
        minNum = _minV;         //最小值
        num = _numV;            //当前数值

        upx = up_x;
        upy = up_y;
        downx = down_x;
        downy = down_y;

        _loadImage("assets/message/xia.png", "xia");
        _loadImage("assets/message/xia_press.png", "xia_press");
        _loadImage("assets/message/xia_unable.png", "xia_unable");

        _loadImage("assets/message/shang.png", "shang");
        _loadImage("assets/message/shang_press.png", "shang_press");
        _loadImage("assets/message/shang_unable.png", "shang_unable");

        globlethis = this;

    }

    //此方法不是组件的公用方法,只在messageframe中有用
    ComBox.prototype.adjust = function (size, persize) {
        //更新按钮的显示状态
        maxNum = size - persize;
        log.info("adjust_maxNum=" + maxNum);
        imgsets["shang"].visible = true;
        imgsets["shang_unable"].visible = false;

    }

    //调整当前值
    ComBox.prototype.adjustnum = function (numv) {
        //更新按钮的显示状态
        num = numv;
        logic()
    }

    //上按钮的暴露方法,这里可以进行和别的组件的联动处理
    ComBox.prototype.onUp = function (callback) {
        scrollcallbackUp = callback;
    }

    //下按钮的暴露方法,这里可以进行和别的组件的联动处理
    ComBox.prototype.onDown = function (callback) {
        scrollcallbackDown = callback;
    }

    //-----------private method-----------

    //图片的加载
    var _loadImage = function (filepath, name) {
        var imgObject = new Image();
        //log.info("Loading image_" + name + ": " + filepath);
        imgObject.onload = function () {


            var bitmap = new CJ.Bitmap(imgObject);
            bitmap.scaleX = 0.66;
            bitmap.scaleY = 0.66;
            bitmap.visible = false;
            imgsets[name] = bitmap;
            imgCount -= 1;
            if (name == "shang" || name == "shang_press" || name == "shang_unable") {

                if (name == "shang" && num < maxNum) {
                    imgsets[name].visible = true;

                }

                if (name == "shang_unable" && num == maxNum) {
                    flag = true;
                    imgsets[name].visible = true;
                }
                imgsets[name].x = upx;
                imgsets[name].y = upy;
                upContainer.addChild(imgsets[name]);

            }
            else if (name == "xia" || name == "xia_press" || name == "xia_unable") {
                imgsets[name].x = upx;
                imgsets[name].y = upy;
                if (name == "xia" && num > minNum) {
                    imgsets[name].visible = true;
                }

                if (name == "xia_unable" && num == minNum) {
                    flag = true;
                    imgsets[name].visible = true;
                }
                imgsets[name].x = downx;
                imgsets[name].y = downy;
                downContainer.addChild(imgsets[name]);

            }

            if (imgCount === 0) {
                //图片全部加载完毕....
                //给upContainer添加按下事件
                handlePrss(upContainer, "shang");
                globlethis.addChild(upContainer)

                //给downContainer添加按下事件
                handlePrss(downContainer, "xia");
                globlethis.addChild(downContainer);
            }
        };

        imgObject.src = filepath;
    }

    //箭头点击事件的处理
    var handlePrss = function (c, name) {
        c.onPress = function (e) {
            //当在正常区间时的处理逻辑
            if (name == "shang" && num < maxNum) {
                imgsets["shang"].visible = false;
                imgsets["shang_press"].visible = true;
                imgsets["shang_unable"].visible = false;
                e.onMouseUp = function () {
                    num++;
                    imgsets["shang"].visible = true;
                    imgsets["shang_press"].visible = false;
                    imgsets["shang_unable"].visible = false;
                    if (scrollcallbackUp) {
                        log.info("shang_num===" + num);
                        log.info("shang_maxNum" + maxNum);
                        scrollcallbackUp();
                    }
                    logic();  //必须放在onMouseUp中否则执行顺序不对
                }
            }
            //下按钮的逻辑
            else if (name == "xia" && num > minNum) {
                imgsets["xia"].visible = false;
                imgsets["xia_press"].visible = true;
                imgsets["xia_unable"].visible = false;
                e.onMouseUp = function () {
                    num--;
                    imgsets["xia"].visible = true;
                    imgsets["xia_press"].visible = false;
                    imgsets["xia_unable"].visible = false;
                    if (scrollcallbackDown) {
                        log.info("xia_num===" + num);
                        log.info("xia_maxNum" + maxNum);
                        scrollcallbackDown();
                    }
                    logic();  //必须放在onMouseUp中否则执行顺序不对
                }
            }
        }
    }

    //num改变后按钮显示状态的判断
    var logic = function () {
        //正常范围内
        if (num < maxNum) {
            log.info("mid_shang");
            imgsets["shang"].visible = true;
            imgsets["shang_press"].visible = false;
            imgsets["shang_unable"].visible = false;
        }

        if (num > minNum) {
            log.info("mid_xia");
            imgsets["xia"].visible = true;
            imgsets["xia_press"].visible = false;
            imgsets["xia_unable"].visible = false;
        }

        //到最大值
        if (num == maxNum) {
            log.info("num == maxNum");
            imgsets["shang"].visible = false;
            imgsets["shang_press"].visible = false;
            imgsets["shang_unable"].visible = true;
        }

        //到最小值
        if (num == minNum) {
            log.info("num == minNum");
            imgsets["xia"].visible = false;
            imgsets["xia_press"].visible = false;
            imgsets["xia_unable"].visible = true;
        }
    }

    return  ComBox;
});
