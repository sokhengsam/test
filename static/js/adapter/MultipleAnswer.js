var MultipleAnswer = new Class({
	answer: "",
	TEXT_ANSWERTYPE: "2",
	TEXT_ANSWERTYPE_REQURE: "3",
	NUMBER_ANSWERTYPE: "4",
	NUMBER_ANSWERTYPE_REQURE: "5",
	pAnswer:'',
	initialize: function(answer, pAnswer){
		// answer of question for merge template
		this.answer = answer;
		this.pAnswer = pAnswer;
	},
	mergeTemplate: function(){
		// merge template
		var multipleAnswerTemplate = $('#multipleTemplate').tmpl(this.answer);
		
		//auto add input box if answer type is other
		if(this.answer.answerTypeId == this.TEXT_ANSWERTYPE || this.answer.answerTypeId == this.TEXT_ANSWERTYPE_REQUIRE){
			multipleAnswerTemplate.append($("<input type='text' />"))
		}
		else if(this.answer.answerTypeId == this.NUMBER_ANSWERTYPE || this.answer.answerTypeId == this.NUMBER_ANSWERTYPE_REQUIRE){
			multipleAnswerTemplate.append($("<input type='number' />"))
		}
		multipleAnswerTemplate.appendTo($(".answer-block :last"));
		if(this.pAnswer != undefined) {
			for(var i = 0; i < this.pAnswer.length; i++) {
				var p = this.pAnswer[i];
				$("#a"+p.getAnswerId()).attr("checked", "checked");
				$("#a"+p.getAnswerId()).trigger("click");
			}
		}
	}
});