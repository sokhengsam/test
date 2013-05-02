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
		console.log(mergeData);
		var question = $('#groupQuestionTemplate').tmpl({qcode:mergeData.getQuestionCode(), allowNull: mergeData.getAllowNull(), questionId: mergeData.getQuestionId(),questionTypeId: mergeData.getQuestionTypeId(),questionCode: mergeData.getQuestionCode(),text:mergeData.text});
		$(".question-block").append(question);
	}
	,
	mergeChildQuestionAnswerTemplate: function(questionType,answers,lang){
		var answerAdapter = new AnswerAdapter({questionType: questionType}, answers, lang);
		answerAdapter.mergeTemplate();
	}
});