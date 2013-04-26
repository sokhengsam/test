var SectionDao = new Class({
	Extends: SQLiteHelper,
	Implements: Section,
	options: {
		tableName: 'Section',
	},
	jQuery: 'SectionDao',
	initialize: function(options) {
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		this.createTable();
	},
	getBySurvey: function(surveyId, success) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " WHERE surveyId = " + surveyId;
		var items = [];
		var self = this;
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new Section();
					item.setSectionId(dataset.item(i)["sectionId"]);
					item.setSectionCode(dataset.item(i)["sectionCode"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					//item.questions.push(self.getQuestion(item.getSectionId()));
					items.push(item);
					success();
				}
			});
		});
		return items;
	},
	getQuestion: function(sectionId) {
		var q = [];
		var selectAllQ = "SELECT * FROM Question WHERE sectionId = " + sectionId;
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAllQ, [], function(tx, resultq){
				datasetQ = resultq.rows;
				for(var iq = 0; iq < datasetQ.length; iq++) {
					var question = new Question();
					question.setQuestionId(dataset.item(iq)["questionId"]);
					question.setSectionId(dataset.item(iq)["surveyId"]);
					question.setQuestionCode(dataset.item(iq)["questionCode"]);
					question.setDescription1(dataset.item(iq)["description1"]);
					question.setDescription2(dataset.item(iq)["description2"]);
					question.setQuestionTypeId(dataset.item(iq)["questionTypeId"]);
					q.push(question);
				}
			});
		});
		return q;
	}
	
});