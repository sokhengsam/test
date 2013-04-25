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
		var selectAll = "SELECT * FROM "+this.options.tableName;
		
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				console.log(dataset.length);
				for (var i = 0; i < dataset.length; i++) {
					console.log("Reading question dataset..");
					var item = new Question();
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setSurveyId(dataset.item(i)["surveyId"]);
					item.setQuestionCode(dataset.item(i)["questionCode"]);
					item.setQuestionName(dataset.item(i)["questionName"]);
					item.setText(dataset.item(i)["text"]);
					items.push(item);
				}
			});
		});
		return items;
	},
	getBySurvey: function(surveyId) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " WHERE sectionId = " + surveyId;
		console.log(selectAll);
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				console.log(dataset.length);
				for (var i = 0; i < dataset.length; i++) {
					console.log("Reading question dataset..");
					var item = new Question();
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setSectionId(dataset.item(i)["surveyId"]);
					item.setQuestionCode(dataset.item(i)["questionCode"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					item.setQuestionTypeId(dataset.item(i)["questionTypeId"]);
					items.push(item);
				}
			});
		});
		return items;
	},
});