//该类很关键，是进行在一个持续的时间内根据设置的起始值和结束值，通过更新函数和停止函数进行业务逻辑的处理。如人物跑动的数据操作等
define(function() {

    var Transition = Class.extend({
        init: function() {
            this.startValue = 0;
            this.endValue = 0;
            this.duration = 0;
            this.inProgress = false;
        },

	  //开始函数，只是用来传递一系列的值为后面的操作使用
        start: function(currentTime, updateFunction, stopFunction, startValue, endValue, duration) {
            this.startTime = currentTime;			 //开始时间为调用start时的系统时间
            this.updateFunction = updateFunction;	 //更新函数
            this.stopFunction = stopFunction;		 //停止函数
            this.startValue = startValue;				 //开始值
            this.endValue = endValue;				 //结束值
            this.duration = duration;				 //持续时间
            this.inProgress = true;			//该标记位用来标记是否处在处理过程中
            this.count = 0;
        },

	 //在过程中的操作函数
        step: function(currentTime) {
            //当该Transition的inProgress = true时
            if(this.inProgress) {
            
                if(this.count > 0) {//当count>0说明要跳帧
                    this.count -= 1;
                    log.debug(currentTime + ": jumped frame");
                }
                else {
                    var elapsed = currentTime - this.startTime;  //逝去时间
                    
                    //当逝去时间大于定义的持续时间时
                    if(elapsed > this.duration) {  
                        elapsed = this.duration; 
                    }
        		  
        		  //差值 = 结束值 - 起始值 
                    var diff = this.endValue - this.startValue;
                    var i = this.startValue + ((diff / this.duration) * elapsed);//当前的线性值
            
                    i = Math.round(i);   //对当前值四舍五入
              
                    if(elapsed === this.duration || i === this.endValue) {//说面到了设定的持续时间的长度
                        this.stop();			//停止
                        if(this.stopFunction) {   //如果传递了停止函数
                            this.stopFunction();  //运行停止函数
                        }
                    }
                    else if(this.updateFunction) { //没有到设定的持续时间是调用更新函数
                        this.updateFunction(i);
                    }
                }
            }
        },
       
        //重函数，恢复初始值
        restart: function(currentTime, startValue, endValue) {
            this.start(currentTime, this.updateFunction, this.stopFunction, startValue, endValue, this.duration);
            this.step(currentTime);
        },
	 
	  //停止，用来改变inProgress = false 说明经历了持续时间操作完毕，改变标志位
        stop: function() {
            this.inProgress = false;
        }
    });
    
    return Transition;
});
