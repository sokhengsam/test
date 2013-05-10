var SingleAnswer = new Class({
	answer: "",
	pAnswer: '',
	TEXT_ANSWERTYPE: "2",
	TEXT_ANSWERTYPE_REQURE: "3",
	NUMBER_ANSWERTYPE: "4",
	NUMBER_ANSWERTYPE_REQURE: "5",
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
		if(this.answer.answerTypeId == this.TEXT_ANSWERTYPE || this.answer.answerTypeId == this.TEXT_ANSWERTYPE_REQUIRE){
			singleAnswerTemplate.append($("<input type='text' />"))
		}
		else if(this.answer.answerTypeId == this.NUMBER_ANSWERTYPE || this.answer.answerTypeId == this.NUMBER_ANSWERTYPE_REQURE){
			singleAnswerTemplate.append($("<input type='number' />"))
		}
		singleAnswerTemplate.appendTo($(".answer-block :last"));
		if(this.pAnswer != undefined) {
			$("#a"+this.pAnswer.getAnswerId()).attr("checked", "checked");
			$("#a"+this.pAnswer.getAnswerId()).trigger("click");
		}
	}
});