var GroupQuestionAdapter = new Class({
	Implements:[QuestionAdapter,AnswerAdapter],
	initialize:function(options){
		this.data = options;
	},
	mergeGroupQuestionParent: function(mergeData){
		this.mergeGroupQuestionTemplate({questionCode: mergeData.parentQuestionCode,text: mergeData.label});
	},
	mergeChildQuestionTemplate: function(mergeData){
		//console.log("text : " + mergeData.text);
		var question = $('#groupQuestionTemplate').tmpl({questionId: mergeData.getQuestionId(),questionTypeId: mergeData.getQuestionTypeId(),questionCode: mergeData.getQuestionCode(),text:mergeData.text});
		$(".question-block").append(question);
	}
	,
	mergeChildQuestionAnswerTemplate: function(questionType,answers,lang){
		var answerAdapter = new AnswerAdapter({questionType: questionType}, answers, lang);
		answerAdapter.mergeTemplate();
	}
});