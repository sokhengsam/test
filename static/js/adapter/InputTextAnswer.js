var InputTextAnswer = new Class({
	answers:[],
	initialize: function(answers){
		// answer of question for merge template
		this.answers = answers;
	},
	mergeTemplate: function(){
		// merge template
		$('#textTemplate').tmpl(this.answers).appendTo($(".answer-block :last"));
	}
});
var InputNumberAnswer = new Class({
	answers:[],
	initialize: function(answers){
		console.log(answers);
		// answer of question for merge template
		this.answers = answers;
	},
	mergeTemplate: function(){
		// merge template
		$('#numberTemplate').tmpl(this.answers).appendTo($(".answer-block :last"));
	}
});