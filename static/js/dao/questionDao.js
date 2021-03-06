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
	getAllForBackup: function(successCallBack) {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = {};
					item.QuestionId = dataset.item(i)["questionId"];
					item.SectionId = dataset.item(i)["sectionId"];
					item.QuestionCode = dataset.item(i)["questionCode"];
					item.Description1 = dataset.item(i)["description1"];
					item.Description2 = dataset.item(i)["description2"];
					item.Introduction1 = dataset.item(i)["introduction1"];
					item.Introduction2 = dataset.item(i)["introduction2"];
					item.QuestionTypeId = dataset.item(i)["questionTypeId"];
					item.AllowNull = dataset.item(i)["allowNull"];
					item.NumberRange = dataset.item(i)["numberRange"];
					item.DependencyId = dataset.item(i)["dependencyId"];
					item.SkipToId = dataset.item(i)["skipToId"];
					items.push(item);
				}
			});
			successCallBack(items);
		});
	},
	getAll: function() {
		var selectAll = "SELECT * FROM "+this.options.tableName + " where status=1 Order By orderNo asc";
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
		var selectAll = "SELECT * FROM "+this.options.tableName + " WHERE status = 1 and parentId = " + id + " Order By orderNo asc";
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
					item.setIntroduction1(dataset.item(i)["introduction1"]);
					item.setIntroduction2(dataset.item(i)["introduction2"]);
					item.setQuestionTypeId(dataset.item(i)["questionTypeId"]);
					item.setAllowNull(dataset.item(i)["allowNull"]);
					item.setNumberRange(dataset.item(i)["numberRange"]);
					item.setDependencyId(dataset.item(i)["dependencyId"]);
					item.setSkipToId(dataset.item(i)["skipToId"]);
					items.push(item);
				}
				success(items);
			});
		});
	},
	getBySection: function(sectionId, successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName + " WHERE status = 1 and sectionId = " + sectionId + " Order By orderNo asc";
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
					item.setIntroduction1(dataset.item(i)["introduction1"]);
					item.setIntroduction2(dataset.item(i)["introduction2"]);
					item.setQuestionTypeId(dataset.item(i)["questionTypeId"]);
					item.setAllowNull(dataset.item(i)["allowNull"]);
					item.setParentId(dataset.item(i)["parentId"]);
					item.setNumberRange(dataset.item(i)["numberRange"]);
					item.setDependencyId(dataset.item(i)["dependencyId"]);
					item.setSkipToId(dataset.item(i)["skipToId"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	findSectionKeyByQuestionKey: function(questionId,successCallback){
		var sql = "SELECT sectionId FROM " + this.options.tableName + " WHERE status = 1 and questionId=" + questionId;
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
	},
	findQuestionByPrimaryKey: function(primaryKey,successCallback){
		var sql = "SELECT * FROM " + this.options.tableName + " WHERE questionId = " + primaryKey;
		//console.log("questiondao.findQuestionByPrimaryKey: " + sql);
		var item;
		this.options.db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					item = new Question();
					item.setQuestionId(dataset.item(i)["questionId"]);
					item.setSectionId(dataset.item(i)["sectionId"]);
					item.setQuestionCode(dataset.item(i)["questionCode"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					item.setIntroduction1(dataset.item(i)["introduction1"]);
					item.setIntroduction2(dataset.item(i)["introduction2"]);
					item.setQuestionTypeId(dataset.item(i)["questionTypeId"]);
					item.setAllowNull(dataset.item(i)["allowNull"]);
					item.setParentId(dataset.item(i)["parentId"]);
					item.setNumberRange(dataset.item(i)["numberRange"]);
					item.setDependencyId(dataset.item(i)["dependencyId"]);
					item.setSkipToId(dataset.item(i)["skipToId"]);
				}
				successCallback(item);
			});
		});
	}
});