(function($){
	var methods={
		add: function(options){
			console.log("bind event");
			$(document).on("click","input[type='radio']",function(){
				console.log("click event");
				var that = $(this);
				$("input[type='radio'][name='" + that.attr("name") + "']").prev().attr("src",options.imageOff);
				console.log(that.prev().attr("id"));
				
				if(that.is(":checked")){
					that.prev().attr("src",options.imageOn);
				}
				else{
					that.prev().attr("src",options.imageOff);
				}
			});
		}
	}
	$.fn.radio = function(method,options){
				if(methods[method]){
					return methods[method].apply(this,[options]);
				}
			}
})(jQuery)