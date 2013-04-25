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
	
	
});