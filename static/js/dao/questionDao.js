var QuestionDao = new Class({
	Extends: SQLiteHelper,
	Implements: Question,
	options: {
		tableName: "Question",
	},
	jQuery: "QuestionDao",
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
/*		this.dropTable(function(){
		});
*/	},
	getAll: function() {
		var selectAll = "SELECT * FROM "+this.options.tableName + " Order By orderNo asc";
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new Question();
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setSurveyId(dataset.item(i)["sectionId"]);
					item.setQuestionCode(dataset.item(i)["questionCode"]);
					item.setQuestionName(dataset.item(i)["questionName"]);
					item.setText(dataset.item(i)["text"]);
					items.push(item);
				}
			});
		});
		return items;
	},
	getChild: function(id, success) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " WHERE parentId = " + id + " Order By orderNo asc";
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new Question();
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setSectionId(dataset.item(i)["sectionId"]);
					item.setQuestionCode(dataset.item(i)["questionCode"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					item.setQuestionTypeId(dataset.item(i)["questionTypeId"]);
					item.setAllowNull(dataset.item(i)["allowNull"]);
					items.push(item);
				}
				success(items);
			});
		});
	},
	getBySection: function(sectionId, successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " WHERE sectionId = " + sectionId + " Order By orderNo asc";
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new Question();
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setSectionId(dataset.item(i)["sectionId"]);
					item.setQuestionCode(dataset.item(i)["questionCode"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					item.setQuestionTypeId(dataset.item(i)["questionTypeId"]);
					item.setAllowNull(dataset.item(i)["allowNull"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	findSectionKeyByQuestionKey: function(questionId,successCallback){
		var sql = "SELECT sectionId FROM " + this.options.tableName + " WHERE questionId=" + questionId;
		var sectionId;
		this.options.db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					sectionId = dataset.item(i)["sectionId"];
				}
				successCallback(sectionId);
			});
		});	
	}
});