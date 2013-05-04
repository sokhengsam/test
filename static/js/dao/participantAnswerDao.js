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
		var selectAll = "SELECT * FROM "+this.options.tableName + " Where participantSurveyId = " + psId;
		console.log("select: " + selectAll);
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
	getBySurveyList: function(psIds, successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " Where participantSurveyId IN (" + psIds.join() + ")";
		console.log("select: " + selectAll);
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
	}
});