var AnswerTypeDao = new Class({
	Extends: SQLiteHelper,
	Implements: AnswerType,
	options: {
		tableName: "AnswerType",
	},
	jQuery: "AnswerTypeDao",
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
	},
	getAllForBackup: function(successCallback){
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = {};
					item.AnswerTypeId = dataset.item(i)["answerTypeId"];
					item.AnswerTypeCode = dataset.item(i)["answerTypeCode"];
					items.push(item);
				}
				successCallback(items);
			});
		});
	}
});