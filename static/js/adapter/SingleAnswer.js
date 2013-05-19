var SingleAnswer = new Class({
	answer: "",
	pAnswer: '',
	TEXT_ANSWERTYPE: "2",
	TEXT_ANSWERTYPE_REQUIRE: "3",
	NUMBER_ANSWERTYPE: "4",
	NUMBER_ANSWERTYPE_REQUIRE: "5",
	initialize: function(answer, pAnswer){
		// answer of question for merge template
		this.answer = answer;
		this.pAnswer = pAnswer;
	},
	mergeTemplate: function(){
		// merge template
		var singleAnswerTemplate = $('#singleTemplate').tmpl(this.answer);
		singleAnswerTemplate.find("input[type='radio']").data("goToQuestionId",this.answer.goToQuestionId);
		var description = "";
		if(this.pAnswer != undefined) {
			description = this.pAnswer.getDescription();
			singleAnswerTemplate.find("input[type='radio']").data("panswerid",this.pAnswer.getParticipantAnswerId());
		}
		//auto add input box if answer type is other
		if(this.answer.answerTypeId == this.TEXT_ANSWERTYPE || this.answer.answerTypeId == this.TEXT_ANSWERTYPE_REQUIRE){
			singleAnswerTemplate.append($("<input type='text' />").val(description));
		}
		else if(this.answer.answerTypeId == this.NUMBER_ANSWERTYPE || this.answer.answerTypeId == this.NUMBER_ANSWERTYPE_REQUIRE){
			singleAnswerTemplate.append($("<input type='number' />").val(description));
		}
		singleAnswerTemplate.appendTo($(".answer-block :last"));
		if(this.pAnswer != undefined) {
			$("#a"+this.pAnswer.getAnswerId()).attr("checked", "checked");
			$("#a"+this.pAnswer.getAnswerId()).trigger("click");
		}
	}
});