var LanguageDao = new Class({
	Extends: SQLiteHelper,
	Implements: Language,
	options: {
		tableName: 'Language',
	},
	jQuery: 'LanguageDao',
	initialize: function(options) {
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		this.createTable();
	},
	getAll: function(successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var items = [];
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					var item = new Language();
					item.setLanguageId(dataset.item(i)["languageId"]);
					item.setLanguageCode(dataset.item(i)["languageCode"]);
					item.setLanguageName(dataset.item(i)["languageName"]);
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
					item.LanguageId = dataset.item(i)["languageId"];
					item.LanguageCode = dataset.item(i)["languageCode"];
					item.LanguageName = dataset.item(i)["languageName"];
					items.push(item);
				}
				successCallback(items);
			});
		});
	}
	
});