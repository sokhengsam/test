var SurveysDao = new Class({
	Extends: SQLiteHelper,
	Implements: Surveys,
	options: {
		tableName: "Surveys",
	},
	jQuery: "SurveysDao",
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
	},
	
	updateStatus: function(surveyId, status) {
		var updateStatement= "UPDATE "+this.options.tableName+" SET status = ? WHERE surveyId = " + surveyId;
		this.getDB().transaction(function(tx) {
			tx.executeSql(updateStatement, [status], function(){console.log("update status done!");}, function(tx, error){console.log("update status fail " + error.message);});
		}); 
	},
	getAllForBackup: function(successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.getDB().transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = {};
					item.SurveyId = dataset.item(i)["surveyId"];
					item.SurveyCode = dataset.item(i)["surveyCode"];
					item.Description1 = dataset.item(i)["description1"];
					item.Description2 = dataset.item(i)["description2"];
					item.Status = dataset.item(i)["status"];
					item.LastDownload = dataset.item(i)["lastDownload"];
					item.Introduction1 = dataset.item(i)["introduction1"];
					item.Introduction2 = dataset.item(i)["introduction2"];
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	getAll: function(successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.getDB().transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new Surveys();
					item.setSurveyId(dataset.item(i)["surveyId"]);
					item.setSurveyCode(dataset.item(i)["surveyCode"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					item.setStatus(dataset.item(i)["status"]);
					item.setLastDownload(dataset.item(i)["lastDownload"]);
					item.setIntroduction1(dataset.item(i)["introduction1"]);
					item.setIntroduction2(dataset.item(i)["introduction2"]);
					items.push(item);
				}
				successCallback(items);
			});
		});
	},
	findByPrimaryKey: function(id) {
		var self = this;
		this.getDB().transaction(function(tx){
			tx.executeSql(self.getFindByPrimaryKeyStatement(id), [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new Surveys();
					item.setSurveyId(dataset.item(i)["surveyId"]);
					item.setSurveyCode(dataset.item(i)["surveyCode"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					item.setStatus(dataset.item(i)["status"]);
					item.setLastDownload(dataset.item(i)["lastDownload"]);
					item.setIntroduction1(dataset.item(i)["introduction1"]);
					item.setIntroduction2(dataset.item(i)["introduction2"]);
					items.push(item);
				}
			});
		});
		return items;
	},
	selectLastItem: function(successCallback) {
		var self = this;
		var selectLast = "select * from surveys order by lastDownload desc limit 1";
		this.getDB().transaction(function(tx){
			tx.executeSql(selectLast, [], function(tx, result) {
				dataset = result.rows;
				var item = new Surveys();
				for (var i = 0; i < dataset.length; i++) {
					item.setSurveyId(dataset.item(i)["surveyId"]);
					item.setSurveyCode(dataset.item(i)["surveyCode"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					item.setStatus(dataset.item(i)["status"]);
					item.setLastDownload(dataset.item(i)["lastDownload"]);
					item.setIntroduction1(dataset.item(i)["introduction1"]);
					item.setIntroduction2(dataset.item(i)["introduction2"]);
				}
				successCallback(item);
			});
		});
	}
});