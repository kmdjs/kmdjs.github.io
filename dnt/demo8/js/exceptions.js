//定义异常信息的结构
define(function() {
    
    var Exceptions = {
        
        //截获异常
        LootException: Class.extend({
            init: function(message) {
                this.message = message;
            }
        })
    };
    
    return Exceptions;
});