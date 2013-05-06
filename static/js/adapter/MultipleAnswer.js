var MultipleAnswer = new Class({
	answer: "",
	ANSWERTYPE: 2,
	pAnswer:'',
	initialize: function(answer, pAnswer){
		// answer of question for merge template
		this.answer = answer;
		this.pAnswer = pAnswer;
	},
	mergeTemplate: function(){
		// merge template
		var multipleAnswerTemplate = $('#multipleTemplate').tmpl(this.answer);
		if(this.answer.answerTypeId == this.ANSWERTYPE){
			multipleAnswerTemplate.append($("<input type='text' />"))
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