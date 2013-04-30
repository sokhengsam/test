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
					item.set
					item.setParticipantLogId(dataset.item(i)["participantLogId"]);
					item.setParticipantCode(dataset.item(i)["participantCode"]);
					item.setStartDateTime(dataset.item(i)["startDateTime"]);
					item.setEndDateTime(dataset.item(i)["endDateTime"]);
					item.setLastQuestion(dataset.item(i)["lastQuestion"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	}
});