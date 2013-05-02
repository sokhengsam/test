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
	/*
	persist: function(domain) {
		if(typeof domain.getId !== 'undefined') {
			this.update(domain);
		}
		else {
			var self = this;
			this.getDB().transaction(function(tx) {
				tx.executeSql(self.getInsertStatement(), [domain.getQuestionId(), domain.getText(), domain.getAnswerType()], function(){console.log("insert success");}, function(tx, error){console.log("insert fail " + error.message);});
			});
		}
		console.log("persist " + this.options.tableName);
		
	},*/
	getAll: function() {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					console.log("Reading dataset..");
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
		console.log(select);
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(select, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					console.log("Reading answer dataset..");
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
});