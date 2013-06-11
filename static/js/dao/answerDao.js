var AnswerDao = new Class({
	Extends: SQLiteHelper,
	Implements: Answer,
	options: {
		tableName: "Answer",
	},
	jQuery: "AnswerDao",
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
	},
	getAllForBackup: function(successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = {};
					item.QuestionId = dataset.item(i)["questionId"];
					item.AnswerId = dataset.item(i)["answerId"];
					item.Description1 = dataset.item(i)["description1"];
					item.Description2 = dataset.item(i)["description2"];
					item.AnswerTypeId = dataset.item(i)["answerTypeId"];
					item.Value = dataset.item(i)["value"];
					item.GoToQuestionId = dataset.item(i)["goToQuestionId"];
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	getAll: function() {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new Answer();
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setAnswerId(dataset.item(i)["answerId"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					item.setAnswerTypeId(dataset.item(i)["answerTypeId"]);
					item.setValue(dataset.item(i)["value"]);
					item.setGoToQuestionId(dataset.item(i)["goToQuestionId"]);
					items.push(item);
				}
			});
		});
		return items;
	},
	getByQuestion: function(id, success) {
		var select = "SELECT * FROM " + this.options.tableName + " WHERE questionId = " + id;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(select, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new Answer();
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setAnswerId(dataset.item(i)["answerId"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					item.setAnswerTypeId(dataset.item(i)["answerTypeId"]);
					item.setValue(dataset.item(i)["value"]);
					item.setGoToQuestionId(dataset.item(i)["goToQuestionId"]);
					items.push(item);
				}
				success(items);
			});
		});
		//return items;
	},
	findByPrimaryKey: function(answerId,onSuccess){
		var select = "SELECT * FROM " + this.options.tableName + " WHERE answerId = " + answerId;
		//console.log(select);
		var item;
		this.options.db.transaction(function(tx){
			tx.executeSql(select, [], function(tx, result) {
				dataset = result.rows;
				//console.log(dataset.length);
				for (var i = 0; i < dataset.length; i++) {
					item = new Answer();
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setAnswerId(dataset.item(i)["answerId"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					item.setAnswerTypeId(dataset.item(i)["answerTypeId"]);
					item.setValue(dataset.item(i)["value"]);
					item.setGoToQuestionId(dataset.item(i)["goToQuestionId"]);
					break;
				}
				//console.log(item);
				onSuccess(item);
			});
		});
	}
});