var GroupQuestionAdapter = new Class({
	Implements:[QuestionAdapter,AnswerAdapter],
	initialize:function(options){
		this.data = options;
	},
	mergeGroupQuestionParent: function(mergeData){
		this.mergeGroupQuestionTemplate({introduction: mergeData.introduction, questionCode: mergeData.parentQuestionCode,text: mergeData.label,displaySectionName: mergeData.displaySectionName,skipToId: mergeData.skipToId});
	},
	mergeChildQuestionTemplate: function(mergeData){
		var question = $('#groupQuestionTemplate').tmpl({qcode:mergeData.getQuestionCode(), allowNull: mergeData.getAllowNull(), questionId: mergeData.getQuestionId(),questionTypeId: mergeData.getQuestionTypeId(),questionCode: mergeData.getQuestionCode(),text:mergeData.text,numberRange: mergeData.getNumberRange()});
		$(".question-block").append(question);
	}
	,
	mergeChildQuestionAnswerTemplate: function(questionType,answers,lang, participantAnswer, callback){
		var answerAdapter = new AnswerAdapter({questionType: questionType}, answers, lang, participantAnswer);
		answerAdapter.mergeTemplate(callback);
	}
});