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
	}
});