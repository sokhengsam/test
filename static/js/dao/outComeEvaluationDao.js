var OutComeEvaluationDao = new Class({
	Extends: SQLiteHelper,
	Implements: OutcomeEvaluation,
	options: {
		tableName: "OutcomeEvaluation",
	},
	jQuery: "OutComeEvaluationDao",
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
					var item = new OutcomeEvaluation();
					item.setOutcomeEvaluationId(dataset.item(i)["outcomeEvaluationId"]);
					item.setOutcomeEvaluationCode(dataset.item(i)["outcomeEvaluationCode"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
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
					item.OutcomeEvaluationId = dataset.item(i)["outcomeEvaluationId"];
					item.OutcomeEvaluationCode = dataset.item(i)["outcomeEvaluationCode"];
					item.Description1 = dataset.item(i)["description1"];
					item.Description2 = dataset.item(i)["description2"];
					items.push(item);
				}
				successCallback(items);
			});
		});
	}
});