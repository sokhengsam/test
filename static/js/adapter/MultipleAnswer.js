var MultipleAnswer = new Class({
	answer: "",
	ANSWERTYPE: 2,
	initialize: function(answer){
		// answer of question for merge template
		this.answer = answer;
	},
	mergeTemplate: function(){
		// merge template
		var multipleAnswerTemplate = $('#multipleTemplate').tmpl(this.answer);
		if(this.answer.answerTypeId == this.ANSWERTYPE){
			multipleAnswerTemplate.append($("<input type='text' />"))
		}
		multipleAnswerTemplate.appendTo($(".answer-block :last"));
	}
});