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
		var sqlCountSurvey = "SELECT count(*) as count FROM "+this.options.tableName + " WHERE surveyId = " + surveyId;
		var returnValue;
		this.options.db.transaction(function(tx){
			tx.executeSql(sqlCountSurvey, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					returnValue = dataset.item(i)["count"];
					break;
					
				}
				successCallback(returnValue);
			});
		});
	}
});