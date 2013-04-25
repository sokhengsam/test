var ParticipantSurveyDao = new Class({
	Extends: SQLiteHelper,
	Implements: ParticipantSurvey,
	options: {
		tableName: "ParticipantSurvey",
	},
	jQuery: "ParticipantSurveyDao",
	initialize: function(options){
		if(typeof this.getDB() === 'undefined' || this.getDB() === '') {
			this.parent();
		}
		//this is mock up. so, drop the table first to avoid the duplicate data
		this.createTable();
	}
});