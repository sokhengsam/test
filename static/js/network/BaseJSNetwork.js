/*************************************************************
**	create base backend api class for next extend
*************************************************************/

var BaseJSNetwork = new Class({
	initialize: function(options){
		//nothing to do
	},
	getRequest: function(requestUrl,requestData,responseHandler,failureHandler){
		console.log(requestUrl);
		$.ajax({
			type: "GET",
			url: requestUrl,
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				responseHandler(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus + "| "+ errorThrown);
				failureHandler(jqXHR, textStatus, errorThrown);
			}
		});
		/*
		$.get(requestUrl , requestData, function(response){
			responseHandler(response);
		},"json")
		.error(function(jqXHR, textStatus, errorThrown){
			failureHandler(jqXHR, textStatus, errorThrown);
		});*/
	},
	postRequest: function(requestUrl,requestData,responseHandler,failureHandler){
		$.post(requestUrl , requestData, function(response, textStatus, jqXHR){
			responseHandler(response, textStatus, jqXHR);
		},"json")
		.error(function(jqXHR, textStatus, errorThrown){
			failureHandler(jqXHR, textStatus, errorThrown);
		});
	},
	deleteRequest: function(requestUrl,responseHandler,failureHandler){
		$.ajax({
			type: "DELETE",
			url: requestUrl,
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				responseHandler(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				failureHandler(jqXHR, textStatus, errorThrown);
			}
		});
	}
});