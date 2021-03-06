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
	getAllForBackup: function(successCallback) {
		var selectAll = "SELECT * FROM " + this.options.tableName;
		console.log("Select p survey: " + selectAll);
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = {};
					item.ParticipantLogID = dataset.item(i)["participantLogId"];
					item.ParticipantSurveyID = dataset.item(i)["participantSurveyId"];
					//item.ParticipantCode = dataset.item(i)["participantCode"];
					item.StartDateTime = dataset.item(i)["startDateTime"];
					item.EndDateTime = dataset.item(i)["endDateTime"];
					/*
					item.LastQuestion = dataset.item(i)["lastQuestion"];
					item.ATSScore = dataset.item(i)["atsScore"];
					item.AlcoholScore = dataset.item(i)["alcoholicScore"];
					item.LastSectionId = dataset.item(i)["lastSectionId"];
					item.LastSectionIndex = dataset.item(i)["lastSectionIndex"];
					item.LastQuestionIndex = dataset.item(i)["lastQuestionIndex"];
					item.Language = dataset.item(i)["language"];
					item.CRF2Pass = dataset.item(i)["crf2pass"];
					item.A1AValid = dataset.item(i)["a1avalid"];
					*/
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	getByParticipantSurveyId: function(partcipantSurveyId, successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " WHERE participantSurveyId = " + partcipantSurveyId;
		console.log("Select p survey: " + selectAll);
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new ParticipantLog();
					item.setParticipantLogId(dataset.item(i)["participantLogId"]);
					item.setParticipantSurveyId(dataset.item(i)["participantSurveyId"]);
					item.setParticipantCode(dataset.item(i)["participantCode"]);
					item.setStartDateTime(dataset.item(i)["startDateTime"]);
					item.setEndDateTime(dataset.item(i)["endDateTime"]);
					item.setLastQuestion(dataset.item(i)["lastQuestion"]);
					item.setATSScore(dataset.item(i)["atsScore"]);
					item.setAlcoholScore(dataset.item(i)["alcoholicScore"]);
					item.setLastSectionId(dataset.item(i)["lastSectionId"]);
					item.setLastSectionIndex(dataset.item(i)["lastSectionIndex"]);
					item.setLastQuestionIndex(dataset.item(i)["lastQuestionIndex"]);
					item.setLanguage(dataset.item(i)["language"]);
					item.setCRF2Pass(dataset.item(i)["crf2pass"]);
					item.setA1AValid(dataset.item(i)["a1avalid"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	findParticipantLogByParticipantSurvey: function(participantSurveyId,successCallback){
		var sql = "SELECT * FROM "+this.options.tableName + " WHERE participantSurveyId = " + participantSurveyId;
		var item;
		//console.log("findParticipantLogByParticipantSurvey : " + sql);
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
					item.setATSScore(dataset.item(i)["atsScore"]);
					item.setAlcoholScore(dataset.item(i)["alcoholicScore"]);
					item.setLastSectionIndex(dataset.item(i)["lastSectionIndex"]);
					item.setLastQuestionIndex(dataset.item(i)["lastQuestionIndex"]);
					item.setLastSectionId(dataset.item(i)["lastSectionId"]);
					item.setLanguage(dataset.item(i)["language"]);
					item.setCRF2Pass(dataset.item(i)["crf2pass"]);
					item.setA1AValid(dataset.item(i)["a1avalid"]);
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
					item.setATSScore(dataset.item(i)["atsScore"]);
					item.setAlcoholScore(dataset.item(i)["alcoholicScore"]);
					item.setLastSectionIndex(dataset.item(i)["lastSectionIndex"]);
					item.setLastQuestionIndex(dataset.item(i)["lastQuestionIndex"]);
					item.setLastSectionId(dataset.item(i)["lastSectionId"]);
					item.setLanguage(dataset.item(i)["language"]);
					item.setCRF2Pass(dataset.item(i)["crf2pass"]);
					item.setA1AValid(dataset.item(i)["a1avalid"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	removeBySurvey: function(surveyId, callBack) {
		var sql = "DELETE FROM " + this.options.tableName + " WHERE participantSurveyId IN (Select participantSurveyId from participantSurvey " +
				  "where surveyId = " + surveyId + " and status = 1)";
		
		this.options.db.transaction(function(tx) {
			tx.executeSql(sql, [], function(){console.log("Delete record succed");}, function(tx, error){console.log("Delete fail " + error.message);});
		});
	}
});