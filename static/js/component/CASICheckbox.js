(function($){
	var methods={
		add: function(options){
			$(document).on("click","input[type='checkbox']",function(){
				var that = $(this);
				//console.log("checked attr : " + that.is(":checked"));
				if(that.is(":checked")){
					that.prev().attr("src",options.imageOn);
				}
				else{
					that.prev().attr("src",options.imageOff);
				}
			});
		}
	}
	$.fn.checkbox = function(method,options){
				if(methods[method]){
					return methods[method].apply(this,[options]);
				}
			}
})(jQuery)