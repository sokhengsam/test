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
	/*
	persist: function(domain) {
		if(typeof domain.getId !== 'undefined') {
			this.update(domain);
		}
		else {
			var self = this;
			self.getDB().transaction(function(tx) {
				tx.executeSql(self.getInsertStatement(), [domain.getSurveyCode(), domain.getSurveyName(), domain.getStatus()], 
				function(){
					console.log("insert success");
					
				}, 
				function(){
					console.log("insert fail");
				});
			});
		}
		return domain;
	},*/
	updateStatus: function(surveyId, status) {
		var updateStatement= "UPDATE "+this.options.tableName+" SET status = ? WHERE surveyId = " + surveyId;
		this.getDB().transaction(function(tx) {
			tx.executeSql(updateStatement, [status], function(){console.log("update status done!");}, function(tx, error){console.log("update status fail " + error.message);});
		}); 
	},
	getAll: function() {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					console.log("Reading dataset..");
					var item = new Surveys();
					item.setSurveyId(dataset.item(i)["surveyId"]);
					item.setSurveyCode(dataset.item(i)["surveyCode"]);
					item.setDescription1(dataset.item(i)["description1"]);
					item.setDescription2(dataset.item(i)["description2"]);
					item.setStatus(dataset.item(i)["status"]);
					item.setLastDownload(dataset.item(i)["lastDownload"]);
					items.push(item);
				}
			});
		});
		return items;
	},
	
});