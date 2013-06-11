var MultipleAnswer = new Class({
	answer: "",
	TEXT_ANSWERTYPE: "2",
	TEXT_ANSWERTYPE_REQUIRE: "3",
	NUMBER_ANSWERTYPE: "4",
	NUMBER_ANSWERTYPE_REQUIRE: "5",
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
			multipleAnswerTemplate.append($("<input type='text' />"))
		}
		multipleAnswerTemplate.appendTo($(".answer-block :last"));
		if(this.pAnswer != undefined) {
			for(var i = 0; i < this.pAnswer.length; i++) {
				var p = this.pAnswer[i];
				if(p.getAnswerId() == this.answer.answerId){
					var description = "";
					if(p.getDescription() != undefined && p.getDescription() != "") {
						$("#a"+p.getAnswerId()).siblings("input").val(p.getDescription());
						if(this.answer.answerTypeId == this.NUMBER_ANSWERTYPE || this.answer.answerTypeId == this.NUMBER_ANSWERTYPE_REQUIRE){
							$("#a"+p.getAnswerId()).siblings("input").val(numberFormatHelper.getStandardNumberFormat(p.getDescription()));
						}
					}
					//$("#a"+p.getAnswerId()).attr("checked", "checked");
					$("#a"+p.getAnswerId()).trigger("click");
					//console.log($("#a"+p.getAnswerId()));			
				}
			}
			
		}
	}
});