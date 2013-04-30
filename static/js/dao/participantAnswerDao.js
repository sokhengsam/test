var ParticipantAnswerDao = new Class({
	Extends: SQLiteHelper,
	Implements: ParticipantAnswer,
	options: {
		tableName: "ParticipantAnswer",
	},
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
	}
});