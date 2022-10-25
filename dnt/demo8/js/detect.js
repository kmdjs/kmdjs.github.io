//实质用到的是modernizr.js的功能
var Detect = {};

//检测浏览器是否支持websocket
Detect.supportsWebSocket = function() {
    return window.WebSocket || window.MozWebSocket;
};

//检测用户代理
Detect.userAgentContains = function(string) {
    return navigator.userAgent.indexOf(string) != -1;
};

//检测是否为平板电脑
Detect.isTablet = function(screenWidth) {
    if(screenWidth > 640) {
        if((Detect.userAgentContains('Android') && Detect.userAgentContains('Firefox'))
        || Detect.userAgentContains('Mobile')) {
            return true;
        }
    }
    return false;
};

//检测是否为IE
Detect.isWindows = function() {
    return Detect.userAgentContains('Windows');
}

//检测是否为chrome
Detect.isChromeOnWindows = function() {
    return Detect.userAgentContains('Chrome') && Detect.userAgentContains('Windows');
};

//检测浏览器是否支持mp3
Detect.canPlayMP3 = function() {
    return Modernizr.audio.mp3;
};

//检测是否为safari
Detect.isSafari = function() {
    return Detect.userAgentContains('Safari') && !Detect.userAgentContains('Chrome');
};

//检测是否为opera
Detect.isOpera = function() {
    return Detect.userAgentContains('Opera');
};