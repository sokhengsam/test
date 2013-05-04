var QuestionTypeDao = new Class({
	Extends: SQLiteHelper,
	Implements: QuestionType,
	options: {
		tableName: 'QuestionType'
	},
	jQuery: 'QuestionTypeDao',
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
	},
	getAll: function() {
		var self = this;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(self.getSelectAllStatement(), [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new QuestionType();
					item.setQuestionTypeId(dataset.item(i)["questionTypeId"]);
					item.setQuestionTypeName(dataset.item(i)["questionTypeName"]);
					items.push(item);
				}
			});
		});
		return items;
	},
	findByPrimaryKey: function(id) {
		var self = this;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(self.getFindByPrimaryKeyStatement(id), [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new QuestionType();
					item.setQuestionTypeId(dataset.item(i)["questionTypeId"]);
					item.setQuestionTypeName(dataset.item(i)["questionTypeName"]);
					items.push(item);
				}
			});
		});
		return items;
	}
});