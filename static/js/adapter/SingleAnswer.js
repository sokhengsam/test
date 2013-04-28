var SingleAnswer = new Class({
	answer: "",
	ANSWERTYPE: "2",
	initialize: function(answer){
		// answer of question for merge template
		this.answer = answer;
	},
	mergeTemplate: function(){
		// merge template
		var singleAnswerTemplate = $('#singleTemplate').tmpl(this.answer);
		singleAnswerTemplate.find("input[type='radio']").data("goToQuestionId",this.answer.goToQuestionId);
		//auto add input box if answer type is other
		if(this.answer.answerTypeId == this.ANSWERTYPE){
			singleAnswerTemplate.append($("<input type='text' />"))
		}
		singleAnswerTemplate.appendTo($(".answer-block :last"));
	}
});