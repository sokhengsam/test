var ParticipantLogDao = new Class({
	Extends: SQLiteHelper,
	Implements: ParticipantLog,
	options: {
		tableName: "ParticipantLog",
	},
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
	},
	getByParticipantCode: function(partcipantCode, successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " WHERE participantCode = " + partcipantCode;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new ParticipantLog();
					item.setParticipantLogId(dataset.item(i)["participantLogId"]);
					item.setParticipantCode(dataset.item(i)["participantCode"]);
					item.setStartDateTime(dataset.item(i)["startDateTime"]);
					item.setEndDateTime(dataset.item(i)["endDateTime"]);
					item.setLastQuestion(dataset.item(i)["lastQuestion"]);
					item.setLastSectionId(dataset.item(i)["lastSectionId"]);
					item.setLastSectionIndex(dataset.item(i)["lastSectionIndex"]);
					item.setLastQuestionIndex(dataset.item(i)["lastQuestionIndex"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	findParticipantLogByParticipantSurvey: function(participantSurveyId,successCallback){
		var sql = "SELECT * FROM "+this.options.tableName + " WHERE participantSurveyId = " + participantSurveyId;
		var item;
		this.options.db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new ParticipantLog();
					item.setParticipantLogId(dataset.item(i)["participantLogId"]);
					item.setParticipantSurveyId(dataset.item(i)["participantSurveyId"]);
					item.setParticipantCode(dataset.item(i)["participantCode"]);
					item.setStartDateTime(dataset.item(i)["startDateTime"]);
					item.setEndDateTime(dataset.item(i)["endDateTime"]);
					item.setLastQuestion(dataset.item(i)["lastQuestion"]);
					item.setLastScore(dataset.item(i)["lastScore"]);
					item.setLastSectionIndex(dataset.item(i)["lastSectionIndex"]);
					item.setLastQuestionIndex(dataset.item(i)["lastQuestionIndex"]);
					item.setLastSectionId(dataset.item(i)["lastSectionId"]);
				}
				successCallback(item);
			});
		});
	},
	findParticipantLogByParticipantSurveys: function(participantSurveyIds,successCallback){
		var sql = "SELECT * FROM "+this.options.tableName + " WHERE participantSurveyId IN (" + participantSurveyIds.join() + ")";
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new ParticipantLog();
					item.setParticipantLogId(dataset.item(i)["participantLogId"]);
					item.setParticipantSurveyId(dataset.item(i)["participantSurveyId"]);
					item.setParticipantCode(dataset.item(i)["participantCode"]);
					item.setStartDateTime(dataset.item(i)["startDateTime"]);
					item.setEndDateTime(dataset.item(i)["endDateTime"]);
					item.setLastQuestion(dataset.item(i)["lastQuestion"]);
					item.setLastScore(dataset.item(i)["lastScore"]);
					item.setLastSectionIndex(dataset.item(i)["lastSectionIndex"]);
					item.setLastQuestionIndex(dataset.item(i)["lastQuestionIndex"]);
					item.setLastSectionId(dataset.item(i)["lastSectionId"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	removeBySurvey: function(surveyId, callBack) {
		var sql = "DELETE * FROM " + this.options.tableName + " WHERE participantSurveyId IN (Select participantSurveyId from participantSurvey " +
				  "where surveyId = " + surveyId + " and status = 1)";
		this.options.db.transaction(function(tx) {
			tx.executeSql(sql, [], function(){console.log("Delete record succed");}, function(tx, error){console.log("Delete fail " + error.message);});
		});
	}
});