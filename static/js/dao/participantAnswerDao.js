var ParticipantAnswerDao = new Class({
	Extends: SQLiteHelper,
	Implements: ParticipantAnswer,
	options: {
		tableName: "ParticipantAnswer",
	},
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
	},
	getBySQuestion: function(qId, psId, successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " Where questionId = " + qId  + " AND participantSurveyId = " + psId;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new ParticipantAnswer();
					item.setParticipantAnswerId(dataset.item(i)["participantAnswerId"]);
					item.setParticipantSurveyId(dataset.item(i)["participantSurveyId"]);
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setAnswerId(dataset.item(i)["answerId"]);
					item.setDescription(dataset.item(i)["description"]);
					item.setStartDateTime(dataset.item(i)["startDateTime"]);
					item.setEndDateTime(dataset.item(i)["endDateTime"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	
	getBySurvey: function(psId, successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " Where participantSurveyId in (" + psId +")";
		console.log(selectAll);
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new ParticipantAnswer();
					item.setParticipantAnswerId(dataset.item(i)["participantAnswerId"]);
					item.setParticipantSurveyId(dataset.item(i)["participantSurveyId"]);
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setAnswerId(dataset.item(i)["answerId"]);
					item.setDescription(dataset.item(i)["description"]);
					item.setStartDateTime(dataset.item(i)["startDateTime"]);
					item.setEndDateTime(dataset.item(i)["endDateTime"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	getAllForBackup: function(successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = {};
					item.ParticipantAnswerID = dataset.item(i)["participantAnswerId"];
					item.ParticipantSurveyID = dataset.item(i)["participantSurveyId"];
					item.AnswerID = dataset.item(i)["answerId"];
					item.QuestionID = dataset.item(i)["questionId"];
					item.Description = dataset.item(i)["description"];
					item.AddedDate = dataset.item(i)["startDateTime"];
					//item.EndDateTime = dataset.item(i)["endDateTime"];
					item.AddedBy = "Mobile_Web";
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	getBySurveyList: function(psIds, successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " Where participantSurveyId IN (" + psIds.join() + ")";
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new ParticipantAnswer();
					item.setParticipantAnswerId(dataset.item(i)["participantAnswerId"]);
					item.setParticipantSurveyId(dataset.item(i)["participantSurveyId"]);
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setAnswerId(dataset.item(i)["answerId"]);
					item.setDescription(dataset.item(i)["description"]);
					item.setStartDateTime(dataset.item(i)["startDateTime"]);
					item.setEndDateTime(dataset.item(i)["endDateTime"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	removeBySurvey: function(surveyId, successCallback) {
		var sql = "DELETE FROM " + this.options.tableName + " WHERE participantSurveyId IN (Select participantSurveyId from participantSurvey " +
		  "where surveyId = " + surveyId + " and status = 1)";
		this.options.db.transaction(function(tx) {
			tx.executeSql(sql, [], function(){console.log("Delete record succed");}, function(tx, error){console.log("Delete fail " + error.message);});
		});
	},
	findParticipantAnswerByParticipantSurveyQuestionId: function(participantSurveyId,questionId,successCallback){
		var sql = "SELECT answerId from " + this.options.tableName + " WHERE questionId=" + questionId + " AND participantSurveyId=" + participantSurveyId;
		var item;
		//console.log(sql);
		this.options.db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, result) {
				dataset = result.rows;
				//console.log(dataset.length);
				for (var i = 0; i < dataset.length; i++) {
					item = new ParticipantAnswer();
					item.setAnswerId(dataset.item(i)["answerId"]);
					break;
				}
				//console.log("answer id : " + item.getAnswerId());
				successCallback(item);
			});
		});
	},
	removeByIds: function(panswerid, successCallback) {
		var ids = [];
		for(var i = 0; i < panswerid.length; i++) {
			ids.push(panswerid[i].getParticipantAnswerId());
		}
		var sql = "DELETE FROM " + this.options.tableName + " WHERE participantAnswerId IN (" + ids.join() + ")";
		this.options.db.transaction(function(tx) {
			tx.executeSql(sql, [], function(){console.log("Delete record succed");successCallback();}, function(tx, error){console.log("Delete fail " + error.message);});
		});
	},
	removeByParticipantSurveyIdAndQuestionId: function(participantSurveyId,questionId,onSuccess){
		var sql = "DELETE FROM " + this.options.tableName + " WHERE participantSurveyId = " + participantSurveyId + " and questionId = " + questionId;
		this.options.db.transaction(function(tx) {
			tx.executeSql(sql, [], function(){console.log("Delete record succed");onSuccess();}, function(tx, error){console.log("Delete fail " + error.message);});
		});
	},
	queryByQuestionId: function(questionId,participantSurveyId, successCallback) {
		var sql = "SELECT * FROM " + this.options.tableName + " WHERE questionId = " + questionId + " and participantSurveyId = " + participantSurveyId;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new ParticipantAnswer();
					item.setParticipantAnswerId(dataset.item(i)["participantAnswerId"]);
					item.setParticipantSurveyId(dataset.item(i)["participantSurveyId"]);
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setAnswerId(dataset.item(i)["answerId"]);
					item.setDescription(dataset.item(i)["description"]);
					item.setStartDateTime(dataset.item(i)["startDateTime"]);
					item.setEndDateTime(dataset.item(i)["endDateTime"]);
					items.push(item);
				}
				console.log(items);
				successCallback(items);
			});
		});
	},
	queryRTSADMINCondition: function(participantSurveyId, successCallback) {
		var sql = "select count(*) as count from " +  this.options.tableName + " where "
			                             + "answerId in (1366, 1367, 1368, 1369, 1356, 1372, 1375, 1390, 1392) and participantSurveyId = " + participantSurveyId;
		var count = 0;
 		this.options.db.transaction(function(tx){
 			tx.executeSql(sql, [], function(tx, result) {
 				dataset = result.rows;
				count = dataset.item(0)["count"];
 				successCallback(count);
 			});
 		});
	}
	
	
});