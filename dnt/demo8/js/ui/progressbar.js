//渲染的类
define(function () {
    ProgressBar.prototype = new CJ.Container();

    /**
    *
    * @param   progressBarType expBar 经验bar loadBar 加载bar lifeBar 血条bar 魔法值SPbar otherBar 其他bar  bar类型
    * @constructor
    */
    function ProgressBar(progressBarType) {
        this.initialize(progressBarType);
    }

    ProgressBar.prototype.Container_initialize = ProgressBar.prototype.initialize; //unique to avoid overiding base class

    ProgressBar.prototype.initialize = function (progressBarType) {
        this.Container_initialize();
        eval("this." + progressBarType + "(0,0)");
    }


    /**
    * 增加进度条槽
    * @param x
    * @param y
    * @param barImgbitmap
    */
    ProgressBar.prototype.addBar = function (x, y, barImgbitmap) {
        this.barX = x;
        this.barY = y;
        this.barImgbitmap = barImgbitmap;
        if (barImgbitmap) {
            barImgbitmap.x = x;
            barImgbitmap.y = y;
            this.addChild(barImgbitmap);
        }

    }

    /**
    *  进度条填充物
    *
    * @param x
    *
    * @param y
    *     填充图片的bitmap
    * @param imgFillerBitmap
    *     是否可见
    * @param isVisible
    */
    ProgressBar.prototype.addfiller = function (x, y, imgFillerBitmap, isVisible) {
        this.imgfiller = imgFillerBitmap;
        this.imgfiller.x = x;
        this.imgfiller.y = y;
        this.imgfiller.visible = isVisible;
        if (this.imgfiller.sourceRect) {
            this.imgfillerWidth = this.imgfiller.sourceRect.width;
            this.imgfiller.sourceRect.width=0.1;
        } else {
            this.imgfillerWidth = this.imgfiller.image.width;
            this.imgfiller.sourceRect = new CJ.Rectangle(x, y, this.imgfillerWidth, this.imgfiller.image.height);
            this.imgfiller.sourceRect.width=0.1;
        }
        this.addChild(this.imgfiller);

    }

    /**
    *
    * @param x
    * @param y
    *   数字bitmap数组
    *     存放格式   {"0":num0,"1":num1,"2":num2,"3":num3,"4":num4,"5":num5,"6":num6,"7":num7,"8":num8,"9":num9};
    * @param numBigmapArray
    * @param isVisible
    */
    ProgressBar.prototype.addNum = function (x, y, numBigmapArray, isVisible) {
        this.numBigmapArray = numBigmapArray;
        this.numBigmapX = x;
        this.numBigmapY = y;
        this.numBigmapVisible = isVisible;
        this.numBigmapArray[0].x = x
        this.numBigmapArray[0].y = y
        this.numBigmapArray[0].visible = isVisible;
        this.numimg = this.numBigmapArray[0];
        this.addChild(this.numimg);
    }

    /**
    *   进度条上所添加
    * @param startX
    *        起始x
    * @param startY
    *        起始y
    * @param BitmapAnimation
    *         动画对象
    * @param gotoAndPlayName
    *         动画运行方法名
    */
    ProgressBar.prototype.addProgressCell = function (startX, startY, BitmapAnimation, gotoAndPlayName, isVisible) {
        this.progressCell = BitmapAnimation;
        this.progressCellStartX = startX;
        this.progressCellStartY = startY;
        this.progressCell.x = startX;
        this.progressCell.y = startY;
        this.addChild(this.progressCell);
        this.progressCell.gotoAndPlay(gotoAndPlayName);
    }

    /**
    * 添加其他组件
    * @param x
    * @param y
    * @param bitmapOther
    * @param isVisible
    */
    ProgressBar.prototype.addOther = function (x, y, bitmapOther, isVisible) {
        this.removeChild(bitmapOther);
        bitmapOther.x = x;
        bitmapOther.y = y;
        bitmapOther.visible = isVisible;
        this.addChild(bitmapOther);

    }

    /**
    * 设置填充多少进度
    * @param pmgress
    */
    ProgressBar.prototype.setBar = function (pmgress) {
        if(pmgress>100){
            return;
        }
        if (this.numBigmapArray) {
            var pmgress1 = Math.round(pmgress);
            if (pmgress1 <= 9) {
                this.numBigmapArray[pmgress1].x = this.numBigmapX;
                this.numBigmapArray[pmgress1].y = this.numBigmapY;
                this.removeChild(this.numimg);
                this.numimg = this.numBigmapArray[pmgress1];
                this.addChild(this.numimg);
            } else if (pmgress1 == 100) {
                var numWidth = "";
                if (this.numBigmapArray[0].sourceRect) {
                    numWidth = this.numBigmapArray[0].sourceRect.width;
                } else {
                    numWidth = this.numBigmapArray[0].image.width;
                }
                this.numBigmapArray[0].x = this.numBigmapX + numWidth * 2;
                if( this.imgPerce)     {
                    this.imgPerce.x =this.numBigmapArray[0].x+ numWidth;
                }
                this.numBigmapArray[0].y = this.numBigmapY;
                this.removeChild(this.numimg);
                this.numimg = this.numBigmapArray[0];
                this.addChild(this.numimg);
                this.removeChild(this.numimgshi);
                this.numimgshi = this.numBigmapArray[0].clone();
                this.numimgshi.sourceRect = this.numBigmapArray[0].sourceRect.clone();
                this.numimgshi.x = this.numBigmapX + numWidth;
                this.numimgshi.y = this.numBigmapY;
                this.addChild(this.numimgshi);
                this.numimgbai = this.numBigmapArray[1];
                this.numimgbai.x = this.numBigmapX;
                this.numimgbai.y = this.numBigmapY;
                this.addChild(this.numimgbai);
                this.removeChild(this.progressCell);
            } else {
                var pmgressshi = (pmgress1 + "").substring(0, 1);
                var pmgressge = (pmgress1 + "").substring(1, 2);
                var numWidth = "";
                if (this.numBigmapArray[pmgressge].sourceRect) {
                    numWidth = this.numBigmapArray[pmgressge].sourceRect.width;
                } else {
                    numWidth = this.numBigmapArray[pmgressge].image.width;
                }
                this.numBigmapArray[pmgressge].x = this.numBigmapX + numWidth;
                if( this.imgPerce)     {
                    this.imgPerce.x =this.numBigmapArray[pmgressge].x+ numWidth;
                }
                this.numBigmapArray[pmgressge].y = this.numBigmapY;
                this.removeChild(this.numimg);
                this.numimg = this.numBigmapArray[pmgressge];
                this.addChild(this.numimg);
                this.removeChild(this.numimgshi);
                this.numimgshi = this.numBigmapArray[pmgressshi].clone();
                this.numimgshi.sourceRect = this.numBigmapArray[pmgressshi].sourceRect.clone();
                this.numimgshi.x = this.numBigmapX;
                this.numimgshi.y = this.numBigmapY;
                this.addChild(this.numimgshi);
            }
        }
        pmgress = pmgress / 100;
        if (this.imgfiller) {
            this.imgfiller.sourceRect.width = this.imgfillerWidth *pmgress ;
            if (this.progressCell) {
                this.progressCell.x = this.progressCellStartX + this.imgfillerWidth * pmgress;
            }
            if (pmgress == 100) {
                this.progressCell.visible = false;
            }
        }

    }

    /**
    * 显示
    */
    ProgressBar.prototype.show = function () {
        this.visible = true;
    }

    /**
    * 设置显示位置
    * @param x
    * @param y
    */
    ProgressBar.prototype.setPostion = function (x, y) {
        this.x = x;
        this.y = y;
    }

    /**
    *  otherBar
    * @param x
    * @param y
    */
    ProgressBar.prototype.otherBar = function (x, y) {
        var progressbar = this;
        var imgKuang = new CJ.Bitmap(Resource.getRes("exp2"));
        imgKuang.sourceRect = new CJ.Rectangle(0, 0, 229, 23);
        progressbar.addBar(x, y, imgKuang);
        //添加进度条填充框
        var imgTiao = new CJ.Bitmap(Resource.getRes("exp1"));
        imgTiao.sourceRect = new CJ.Rectangle(7, 4, 214, 12);
        progressbar.addfiller(x + 8, y + 4, imgTiao, true);
        ProgressBar = progressbar;
    }

    /**
    *  SPbar
    * @param x
    * @param y
    */
    ProgressBar.prototype.SPBar = function (x, y) {
        var progressbar = this;
        var imgKuang = new CJ.Bitmap(Resource.getRes("exp2"));
        imgKuang.sourceRect = new CJ.Rectangle(0, 0, 229, 23);
        progressbar.addBar(x, y, imgKuang);
        //添加进度条填充框
        var imgTiao = new CJ.Bitmap(Resource.getRes("exp1"));
        imgTiao.sourceRect = new CJ.Rectangle(7, 4, 214, 12);
        progressbar.addfiller(x + 8, y + 4, imgTiao, true);
        ProgressBar = progressbar;
    }

    /**
    * Lifebar
    * @param x
    * @param y
    */
    ProgressBar.prototype.LifeBar = function (x, y) {
        var progressbar = this;
        var imgKuang = new CJ.Bitmap(Resource.getRes("exp2"));
        imgKuang.sourceRect = new CJ.Rectangle(0, 0, 229, 23);
        progressbar.addBar(x, y, imgKuang);
        //添加进度条填充框
        var imgTiao = new CJ.Bitmap(Resource.getRes("exp1"));
        imgTiao.sourceRect = new CJ.Rectangle(7, 4, 214, 12);
        progressbar.addfiller(x + 8, y + 4, imgTiao, true);
        ProgressBar = progressbar;
    }


    /**
    * 经验bar
    * @param x
    * @param y
    */
    ProgressBar.prototype.expBar = function (x, y) {
        var progressbar = this;
        ProgressBar = progressbar;
        //添加进度条填充框
        var imgTiao = new CJ.Bitmap(Resource.getRes("bg_714"));
        progressbar.addfiller(x, y, imgTiao, true);
        var imgKuang = new CJ.Bitmap(Resource.getRes("bg_717"));
        progressbar.addBar(x, y, imgKuang);
    }

    /**
    * 加载bar
    * @param x
    * @param y
    */
    ProgressBar.prototype.loadBar = function (x, y) {
        var progressbar = this;
        var imgKuang = new CJ.Bitmap(Resource.getRes("progressbar"));
        imgKuang.sourceRect = new CJ.Rectangle(239, 69, 572, 59);
        progressbar.addBar(x, y, imgKuang);
        //添加进度条填充框
        var imgTiao = new CJ.Bitmap(Resource.getRes("progressbar"));
        imgTiao.sourceRect = new CJ.Rectangle(328, 34, 493, 26);
        progressbar.addfiller(x + 40, y + 16, imgTiao, true);

        //添加进度显示动画
        var loadImgData = {
            "frames": [
                [3, 0, 64, 66, 0, 0, 0],
                [78, 0, 64, 66, 0, 0, 0],
                [144, 0, 64, 66, 0, 0, 0],
                [211, 0, 64, 66, 0, 0, 0],
                [3, 72, 64, 66, 0, 0, 0],
                [71, 72, 64, 66, 0, 0, 0],
                [173, 71, 64, 66, 0, 0, 0],
                [2, 141, 64, 66, 0, 0, 0],
                [69, 141, 64, 66, 0, 0, 0],
                [137, 141, 64, 66, 0, 0, 0],
                [203, 141, 64, 66, 0, 0, 0]
            ],
            "animations": {
                "run": [0, 9, "run", 20],
                "xxx": [0, 2, 3, 2, 421, 2]
            },
            "images": [Resource.getRes("progressbar")]
        };
        var loadImgDataSheet = new CJ.SpriteSheet(loadImgData);
        var loadImgDatabmpAnim = new CJ.BitmapAnimation(loadImgDataSheet);
        progressbar.addProgressCell(x + 14, y - 5, loadImgDatabmpAnim, 'run', true);

        //添加进度显示数字数组，数组格式注意
        var num0 = new CJ.Bitmap(Resource.getRes("progressbar"));
        num0.sourceRect = new CJ.Rectangle(278, 2, 27, 30);
        var num1 = new CJ.Bitmap(Resource.getRes("progressbar"));
        num1.sourceRect = new CJ.Rectangle(307, 34, 19, 30);
        var num2 = new CJ.Bitmap(Resource.getRes("progressbar"));
        num2.sourceRect = new CJ.Rectangle(246, 205, 27, 30);
        var num3 = new CJ.Bitmap(Resource.getRes("progressbar"));
        num3.sourceRect = new CJ.Rectangle(217, 205, 27, 30);
        var num4 = new CJ.Bitmap(Resource.getRes("progressbar"));
        num4.sourceRect = new CJ.Rectangle(188, 209, 27, 30);
        var num5 = new CJ.Bitmap(Resource.getRes("progressbar"));
        num5.sourceRect = new CJ.Rectangle(159, 209, 27, 30);
        var num6 = new CJ.Bitmap(Resource.getRes("progressbar"));
        num6.sourceRect = new CJ.Rectangle(131, 209, 27, 30);
        var num7 = new CJ.Bitmap(Resource.getRes("progressbar"));
        num7.sourceRect = new CJ.Rectangle(101, 209, 27, 30);
        var num8 = new CJ.Bitmap(Resource.getRes("progressbar"));
        num8.sourceRect = new CJ.Rectangle(72, 209, 27, 30);
        var num9 = new CJ.Bitmap(Resource.getRes("progressbar"));
        num9.sourceRect = new CJ.Rectangle(307, 2, 27, 30);
        numArray = { "0": num0, "1": num1, "2": num2, "3": num3, "4": num4, "5": num5, "6": num6, "7": num7, "8": num8, "9": num9 };

        //填充其他一些文字属性
        var loadImgZai = new CJ.Bitmap(Resource.getRes("progressbar"));
        loadImgZai.sourceRect = new CJ.Rectangle(38, 209, 32, 43);

        var loadImgRu = new CJ.Bitmap(Resource.getRes("progressbar"));
        loadImgRu.sourceRect = new CJ.Rectangle(335, 2, 39, 25);

        var loadImgZhong = new CJ.Bitmap(Resource.getRes("progressbar"));
        loadImgZhong.sourceRect = new CJ.Rectangle(2, 209, 33, 45);

        var imgPerce = new CJ.Bitmap(Resource.getRes("progressbar"));
        imgPerce.sourceRect = new CJ.Rectangle(278, 34, 27, 30);
        this.imgPerce=imgPerce;
        progressbar.addOther(x + 170, y + 50, loadImgZai, true);
        progressbar.addOther(x + 210, y + 60, loadImgRu, true);
        progressbar.addOther(x + 250, y + 50, loadImgZhong, true);
        progressbar.addNum(x + 290, y + 60, numArray, true);
        progressbar.addOther(x + 315, y + 60, imgPerce, true);

        ProgressBar = progressbar;
    }

    ProgressBar.prototype.destory = function () {
        if (this.progressCell) {
            this.progressCell.stop();
        }
        this.removeAllChildren();
        this.removeChild(this);
    }

    ProgressBar.prototype.getBarWidth = function () {
        return this.barImgbitmap.sourceRect.width;
    }


    ProgressBar.prototype.hiden = function () {
        this.visible = false;
    }

    return ProgressBar;
});


