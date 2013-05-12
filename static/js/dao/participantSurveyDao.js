var ParticipantSurveyDao = new Class({
	Extends: SQLiteHelper,
	Implements: ParticipantSurvey,
	options: {
		tableName: "ParticipantSurvey",
	},
	jQuery: "ParticipantSurveyDao",
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
	},
	getAll: function(successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new ParticipantSurvey();
					item.setParticipantSurveyId(dataset.item(i)["participantSurveyId"]);
					item.setSurveyId(dataset.item(i)["surveyId"]);
					item.setSurveyDate(dataset.item(i)["surveyDate"]);
					item.setInterviewCode(dataset.item(i)["interviewCode"]);
					item.setParticipantCode(dataset.item(i)["participantCode"]);
					item.setPlaceOfInterview(dataset.item(i)["placeOfInterview"]);
					item.setProvinceId(dataset.item(i)["provinceId"]);
					item.setOutComeEvaluationId(dataset.item(i)["outComeEvaluationId"]);
					item.setLanguageId(dataset.item(i)["languageId"]);
					item.setStartDateTime(dataset.item(i)["startDateTime"]);
					item.setEndDateTime(dataset.item(i)["endDateTime"]);
					item.setStatus(dataset.item(i)["status"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	getBySurvey: function(surveyid, successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " WHERE surveyId = " + surveyid;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new ParticipantSurvey();
					item.setParticipantSurveyId(dataset.item(i)["participantSurveyId"]);
					item.setSurveyId(dataset.item(i)["surveyId"]);
					item.setSurveyDate(dataset.item(i)["surveyDate"]);
					item.setInterviewCode(dataset.item(i)["interviewCode"]);
					item.setParticipantCode(dataset.item(i)["participantCode"]);
					item.setPlaceOfInterview(dataset.item(i)["placeOfInterview"]);
					item.setProvinceId(dataset.item(i)["provinceId"]);
					item.setOutComeEvaluationId(dataset.item(i)["outComeEvaluationId"]);
					item.setLanguageId(dataset.item(i)["languageId"]);
					item.setStartDateTime(dataset.item(i)["startDateTime"]);
					item.setEndDateTime(dataset.item(i)["endDateTime"]);
					item.setStatus(dataset.item(i)["status"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	countParticipantBySurveyKey: function(surveyId,successCallback){
		var sqlCountSurvey = "SELECT count(*) as count,status FROM "+this.options.tableName + " WHERE surveyId = " + surveyId + " group by status";
		var returnValue = new Object();
		var completeAndIncompleteStatusNumber = 0;
		this.options.db.transaction(function(tx){
			tx.executeSql(sqlCountSurvey, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					if(dataset.item(i)["status"] === 0 || dataset.item(i)["status"] === 1 ){
						completeAndIncompleteStatusNumber = completeAndIncompleteStatusNumber + dataset.item(i)["count"];
					}
					else{
						returnValue.sync = dataset.item(i)["count"];
					}
				}
				returnValue.notSync = completeAndIncompleteStatusNumber;
				successCallback(returnValue);
			});
		});
	},
	removeByIdAndComplete: function(surveyId) {
		var sql = "DELETE FROM " + this.options.tableName + " WHERE status= 1 and surveyId = " + surveyId;
		this.options.db.transaction(function(tx) {
			tx.executeSql(sql, [], function(){console.log("Delete record succed");}, function(tx, error){console.log("Delete fail " + error.message);});
		});
	} 
});