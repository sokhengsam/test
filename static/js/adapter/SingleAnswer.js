var SingleAnswer = new Class({
	answers:[],
	initialize: function(answers){
		// answer of question for merge template
		this.answers = answers;
	},
	mergeTemplate: function(){
		// merge template
		$('#singleTemplate').tmpl(this.answers).appendTo($(".answer-block :last"));
	}
});