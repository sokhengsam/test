/*************************************************************
**	create base backend api class for next extend
*************************************************************/

var BaseJSNetwork = new Class({
	initialize: function(options){
		//nothing to do
	},
	getRequest: function(requestUrl,requestData,responseHandler,failureHandler){
		$.ajax({
			type: "GET",
			url: requestUrl,
			dataType: "json",
			data:requestData,
			success: function(data, textStatus, jqXHR) {
				responseHandler(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
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
		$.ajax({
			type: "POST",
			url: requestUrl,
			dataType: "json",
			data:{
				mobilekey: requestData.mobilekey, 
		        participantsurvey: requestData.participantsurvey,
		        participantanswer: requestData.participantanswer,
		        participantlog: requestData.participantlog
			},
			success: function(data, textStatus, jqXHR) {
				responseHandler(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				failureHandler(jqXHR, textStatus, errorThrown);
			}
		});
		/*
		$.post(requestUrl , requestData, function(response, textStatus, jqXHR){
			responseHandler(response, textStatus, jqXHR);
		},"json")
		.error(function(jqXHR, textStatus, errorThrown){
			failureHandler(jqXHR, textStatus, errorThrown);
		});*/
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