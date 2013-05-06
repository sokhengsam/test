var SingleAnswer = new Class({
	answer: "",
	pAnswer: '',
	ANSWERTYPE: "2",
	initialize: function(answer, pAnswer){
		// answer of question for merge template
		this.answer = answer;
		this.pAnswer = pAnswer;
	},
	mergeTemplate: function(){
		// merge template
		var singleAnswerTemplate = $('#singleTemplate').tmpl(this.answer);
		singleAnswerTemplate.find("input[type='radio']").data("goToQuestionId",this.answer.goToQuestionId);
		if(this.pAnswer != undefined) {
			singleAnswerTemplate.find("input[type='radio']").data("panswerid",this.pAnswer.getParticipantAnswerId());
		}
		//auto add input box if answer type is other
		if(this.answer.answerTypeId == this.ANSWERTYPE){
			singleAnswerTemplate.append($("<input type='text' />"))
		}
		singleAnswerTemplate.appendTo($(".answer-block :last"));
		if(this.pAnswer != undefined) {
			$("#a"+this.pAnswer.getAnswerId()).attr("checked", "checked");
			$("#a"+this.pAnswer.getAnswerId()).trigger("click");
		}
	}
});