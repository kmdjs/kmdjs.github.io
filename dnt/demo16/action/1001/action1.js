objPage.AddJSOnce("jsCanvasHelper","action/CanvasHelper.js");
/// <reference path="../../js/CanvasHelper.js" />
(function (window) {
    var canvas;
    var stage;
    var box;
    var objMyDraw;
    var strPath = "action/1001/";


    function MainAction() {
        canvas = document.getElementById("canvasMove");
        stage = new Stage(canvas);

        var ch = new CanvasHelper(objMyDraw);

        var paintRect = ch.getPaintRect();
        console.log(paintRect);
        box = new Bitmap(objMyDraw);
        setBitmapRectByTwoPoint(box, paintRect);
        stage.addChild(box);
        var loopCount = 0;
        var anmTween = Tween.get(box, { loop: "true" }).to({ rotation: 360 }, 1000).call(function () {
            loopCount++;
            if (loopCount > 4) {
                //////////////////////////跳出 s//////////////////////////
                EndAction();
                //////////////////////////跳出 e//////////////////////////

                anmTween.loop = false;
            }
        });

        Ticker.addListener(stage);
    }

    function setBitmapRectByTwoPoint(bm, pointsObj) {
        console.log(pointsObj[0].x + "_" + pointsObj[0].y + "_" + (pointsObj[1].x - pointsObj[0].x) + "_" + (pointsObj[1].y - pointsObj[0].y));
        bm.sourceRect = new Rectangle(pointsObj[0].x, pointsObj[0].y, pointsObj[1].x - pointsObj[0].x, pointsObj[1].y - pointsObj[0].y);
        bm.regX = Math.round((pointsObj[1].x - pointsObj[0].x) / 2);
        bm.regY = Math.round((pointsObj[1].y - pointsObj[0].y) / 2);
        bm.x = Math.round((pointsObj[1].x + pointsObj[0].x) / 2);
        bm.y = Math.round((pointsObj[1].y + pointsObj[0].y) / 2);
    }


 

    //////////////////////////end//////////////////////////

    function DoAction() {
        if (bolDo) return;
        bolDo = true;
        objMyDraw = document.getElementById('canvas');
        document.getElementById('canvasMove').style.display = "block";
        document.getElementById('canvas').style.display = "none";
        desenho.setEnd();
        MainAction();

    }
    function EndAction() {
        try {
            bolDo = false;
            stage.removeAllChildren();
            document.getElementById('canvasMove').style.display = "none";
            document.getElementById('canvas').style.display = "block";
            desenho.setDrawStart();
        } catch (e) { }
    }
 


    // 画模式下 点重新绘图的方法
    function ResetBackGround() {
        if (bolDo) return;
        objPage.InitBoard(true);
    }


    window.DoAction = DoAction;
    window.EndAction = EndAction;
    // 给重新绘图绑定 新事件
    document.getElementById('draw_reset').onclick = ResetBackGround;
} (window));