var SynLogDao = new Class({
	Extends: SQLiteHelper,
	Implements: SyncLog,
	options: {
		tableName: "SynLog",
	},
	jQuery: "SynLogDao",
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
	},
	countSyncBySurvey: function(surveyId, successCallback) {
		var sqlCount = "select count(*) as count from "+ this.options.tableName + " where participantSurveyId in (select participantSurveyId from participantSurvey where surveyId = "+ surveyId +")";
		var returnValue = new Object();
		var synced = 0;
		this.options.db.transaction(function(tx){
			tx.executeSql(sqlCount, [], function(tx, result) {
				dataset = result.rows;
				//for (var i = 0; i < dataset.length; i++) {
				synced = dataset.item(0)["count"];
				//}
				successCallback(synced);
			});
		});
	}
});