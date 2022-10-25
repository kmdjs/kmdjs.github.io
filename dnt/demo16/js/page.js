var objPage;
var desenho;
var arrAutoDraw = new Array();
var arrAutoGuess = new Array();
var intOldCol = 0;
var intOldPenWeight = 7;
var intOldEraserWeight = 7;
var corAnterior;
var myDate;
var _debug = false;
var IsBankRecharge = false;
var _effect =false;
var strInterval="";
var strGuessInterval="";
var intGuessMaxTime = 0;
var arrUser = new Array();
var bolLookDrawEnd =false;
var bolLookGuessEnd=false;
var bolCoverClock = false;
var bolSoundClock = false;
var is_days_Drewards = false;
var intActionType = 0;
var strLastInput ="";
var bolDo = false;
var strApiUrl = "";
var iColorStep = 4;
var iMaxIelement = 5;
var intIframeNewsFlag;
var intGameListPage = 0;
var arrGameList=new Array();
var arrGameListShow=new Array();
var aGIR=new Array();
var aGIS = new Array();
var arrFriendList =  new Array();
var arrFriendListNoApp = new Array();
var arrTplList = new Array();
var rNum;
var drawFlag = 0;
var scroll1,scroll2;
var arrUserHelpFlag = { score: 0, hlep: { h1: 0, h2: 0, h3: 0} };
(function (window) {
	var MathHelper = {};
	MathHelper.getRandomNumber = function (min, max) {
		return (min + Math.floor(Math.random() * (max - min + 1)))
	};

	window.MathHelper = MathHelper;
} (window));

(function (window) {
var Sound={};
Sound.Play = function(name)
{
	var ss = document.getElementById(name);
	if(ss.play)
	{
	ss.play();
	}
};

	window.Sound = Sound;
} (window));

function StringToDate(DateStr)
{if(typeof DateStr=="undefined")return new Date();if(typeof DateStr=="date")return DateStr;var converted = Date.parse(DateStr);var myDate = new Date(converted);if(isNaN(myDate)){DateStr=DateStr.replace(/:/g,"-");DateStr=DateStr.replace(" ","-");DateStr=DateStr.replace(".","-");var arys= DateStr.split('-');switch(arys.length){case 7 : myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5],arys[6]);break;case 6 : myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5]);break;default: myDate = new Date(arys[0],--arys[1],arys[2]);break;};};return myDate;}
function $$(id){
	return document.getElementById(id);
}

function GetRequest(paras){
	var url = location.href;
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
	var paraObj = {}
	for (i=0; j=paraString[i]; i++){
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if(typeof(returnValue)=="undefined"){
		return "";
	}else{
		return returnValue;
	}
}
function Page(){
var arrPanelIdList = ["panelCover","panelLoading","panelLogin","panelInvitation","panelHall","panelGameDrawTurn","panelGameDrawWaitStart","panelGameGuessTurn",
	"panelGameDrawWord","panelGameGuessWaitStart","panelGameLookWaitStart","panelGameDrawWait","panelGame","panelGameEndWin","panelGameEndFail",
	"panelLookGameEndWin","panelLookGameEndFail","panelView","panelGuess","panelShopBox","panelShopColor","panelShopRecharge","panelGameDrawEnd","panelNewNews","panelBestLook","panelWebInvite","panelInvite","panelSeriesLook","days_rewards"];
var arrDrawWidthBar = ["draw_line","draw_eraser","draw_penheight"];
var arrPanelSub = ["draw_header","guess_header","guess_footer","draw_footer","look_header","look_footer","guess_input","look_input"];


this.ViewTplDrawStart = function (intNum) {
    this.InitDraw();
    $("#panelGame").show();
    $("#template_animate").hide();
    
    //this.HideAllSub();
    //this.ShowDrawSub();
    intActionType = 1;
    this.SetTplDrawInfo(intNum);
    //this.ViewDraw();
    //this.Hide("template_animate");
};

this.Hide = function () {
    $("#sel_cor div").removeClass("sis-colorBg2").addClass("sis-colorBg1");
    $("#panelGame").hide();
    $("#template_animate").show();
}

    ///////Save tpl
this.SetTplDrawInfo = function (intNum) {
   
  
    $$('draw_view').style.display = "block";
    /////////////////////////////////////////////////////

    if (intActionType != 0) {
        objPage.AddJS("actJs","action/"+ intNum+"/action.js" );
        aGIS["sai"] = aGIS["ai" + intNum];
        $$('draw_view').style.display = "block";
    } else {
        $$('draw_view').style.display = "none";
    }
  
  //  $$("draw_end_draw_img").src = aGIS["usa"];
   // $$("draw_end_guess_img").src = aGIS["uoa"];
    //$$("draw_end_draw_name").innerHTML = aGIS["usn"];
 //   $$("draw_end_guess_name").innerHTML = aGIS["uon"];
 //   aGIS["draw_turn"] = aGIS["turn"];
  //  aGIS["selected_topic"] = aGIR[0]["topic" + intNum];
  //  aGIS["difficulty"] = intNum;
   // if (_debug) {
 //       console.log("SetGameDrawInfo:" + aGIS["selected_topic"]);
//    }
    /////////////////////////////////////////////////////

};

this.AddJS = function (id, fileUrl) {
    if (_debug) console.log("AddJS:" + fileUrl);
    var scriptTag = document.getElementById(id);
    var oHead = document.getElementsByTagName("HEAD").item(0);
    var oScript = document.createElement("script");
    if (scriptTag) oHead.removeChild(scriptTag);
    oScript.id = id;
    oScript.type = "text/javascript";
    oScript.src = fileUrl;
    if (_debug) oScript.src = fileUrl + "?" + Math.random();
    oHead.appendChild(oScript);
};

this.OpenDrawWidthBar = function (tipo) {

    if (tipo == 0) {
        desenho.mudaCor(intOldCol, true);
    } else if (tipo == 1) {
        desenho.mudaCor(0, true);
    }
    this.CloseDrawWidthBar();
    if (tipo == 0) {
        this.SetLineWidth(intOldPenWeight);
    } else if (tipo == 1) {
        this.SetLineWidth(intOldEraserWeight);
    }
    $$(arrDrawWidthBar[tipo]).style.display = "block";
};

this.SetLinhaStyle = function (weight) {

    intOldPenWeight = weight;
    this.SetLineWidth(weight);
    this.SetLineColor(intOldCol);
    for (i = 2; i <= 32; i += 5) {
        if ($$('linha_larg' + i)) {
            $$('linha_larg' + i).style.backgroundColor = "#D9FFA1";
        }
    }
    $$('linha_larg' + weight).style.backgroundColor = "#A7C964";
};

this.SetEraserStyle = function (weight) {

    intOldEraserWeight = weight;
    desenho.mudaCor(0, true);
    for (i = 2; i <= 32; i += 5) {
        if ($$('eraser_larg' + i)) {
            $$('eraser_larg' + i).style.backgroundColor = "#D9FFA1";
        }
    }
    $$('eraser_larg' + weight).style.backgroundColor = "#A7C964";
    this.SetLineWidth(weight);
};

this.SetPenStyle = function (intHeight) {
    this.CloseDrawWidthBar();
    desenho.setPenOffsetTop(intHeight);
    if (intHeight == 0) {
        $$('draw_pen').height = 20;
    } else {
        $$('draw_pen').height = intHeight;
    }
    this.CloseDrawWidthBar();
    for (i = 0; i <= 40; i = i + 10) {
        if ($$('penheight_larg' + i)) {
            $$('penheight_larg' + i).style.backgroundColor = "#EEE";
        }
    }
    $$('penheight_larg' + intHeight).style.backgroundColor = "#A7C964";
};

this.InitDraw = function () {

    this.InitBoard(true);
    this.InitPen();
    //this.SetPenStyle(0);
    desenho.setDrawStart();
};


this.InitBoard = function (bolDraw) {

    this.StopAutoDraw();
    this.StopAutoGuess();
    if (_debug) {
        console.log("InitBoard " + bolDraw);
    }
    if (desenho == undefined) {
        if (_debug) {
            console.log("InitBoard create");
        }
        desenho = new Desenho($$("canvas"), $$("canvasPrev"), false);
        desenho.onStartDraw = function () {
            objPage.CloseDrawWidthBar();
        }
    }
    desenho.ClearAll();
    if (bolDraw) {
        desenho.setStart();
        desenho.setDrawStart();
    } else {
        desenho.setEnd();
    }
    desenho.limparTela(bolDraw);
    this.CloseDrawWidthBar();
    desenho.liberar(bolDraw);
};

this.InitPen = function () {
    this.SetLineWidth(7);
    this.SetLineColor(1);
};

this.StopAutoDraw = function () {
    if (arrAutoDraw.length > 0) {
        for (i = 0; i < arrAutoDraw.length; i++) {
            window.clearTimeout(arrAutoDraw[i]);
        }
        arrAutoDraw = new Array();
    }
};

this.StopAutoGuess = function () {
    if (arrAutoGuess.length > 0) {
        for (i = 0; i < arrAutoGuess.length; i++) {
            window.clearTimeout(arrAutoGuess[i]);
        }
        arrAutoGuess = new Array();
    }
};

this.CloseDrawWidthBar = function () {
    for (var cont = 0; cont < arrDrawWidthBar.length; cont++) {
        $$(arrDrawWidthBar[cont]).style.display = "none";
    }
};
this.SetLineWidth = function (num) {
    desenho.mudaBorda(num, true);
    this.CloseDrawWidthBar();
};

this.SetLineColor = function (num, elem) {
    intOldCol = num;
    desenho.mudaCor(num, true);
    this.CloseDrawWidthBar();
    if (elem != undefined) {
        if (corAnterior) {
            //corAnterior.style.borderColor = '#7B7B7B';
            corAnterior.className = "cor sis sis-colorBg1";
        }
    }
    if (elem) {
        //elem.style.borderColor = '#97CBFF';
        elem.className = "cor sis sis-colorBg2";
        corAnterior = elem;
    }
    this.SetLineWidth(intOldPenWeight);
};

this.AddJSOnce = function (id, fileUrl) {
    var scriptTag = document.getElementById(id);
    if (scriptTag) {
        //		if (_debug) {
        //			alert("ext");
        //		} 
        return;
    }
    this.AddJS(id, fileUrl);
};
}
