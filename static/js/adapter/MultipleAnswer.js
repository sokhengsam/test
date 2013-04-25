var MultipleAnswer = new Class({
	answer: [],
	initialize: function(answer){
		// answer of question for merge template
		this.answer = answer;
	},
	mergeTemplate: function(){
		// merge template
		$('#multipleTemplate').tmpl(this.answer).appendTo($(".answer-block"));
	}
});