//定时,以duration为时长，判断当前时间是否超时
define(function() {

    var Timer = Class.extend({
        init: function(duration, startTime) {
            this.lastTime = startTime || 0;
            this.duration = duration;
        },

        isOver: function(time) {
            var over = false;
            //当大于时长时
            if((time - this.lastTime) > this.duration) {
                over = true;	//设置为超时
                this.lastTime = time;//设置最后时间为传入的时间，一般传入的时间为当前时间
            }
            return over;//返回超时判断结果
        }
    });

    return Timer;
});