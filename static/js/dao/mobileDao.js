var MobileDao = new Class({
	Extends: SQLiteHelper,
	Implements: Mobile,
	options: {
		tableName: "Mobile",
	},
	jQuery: "MobileDao",
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
	},
	getAll: function(successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var item;
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					item = new Mobile();
					item.setMobileId(dataset.item(i)["mobileId"]);
					item.setMobileKey(dataset.item(i)["mobileKey"]);
				}
				successCallback(item);
			});
		});
	},
	getAllForBackup: function(successCallback) {
		var selectAll = "SELECT * FROM "+this.options.tableName;
		var item;
		this.options.db.transaction(function(tx){
			tx.executeSql(selectAll, [], function(tx, result) {
				dataset = result.rows;
				for (var i = 0; i < dataset.length; i++) {
					item = {};
					item.MobileKey = dataset.item(i)["mobileKey"];
				}
				successCallback(item);
			});
		});
	}
});