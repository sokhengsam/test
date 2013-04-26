var GroupQuestionAdapter = new Class({
	Implements:[QuestionAdapter,AnswerAdapter],
	initialize:function(options){
		this.data = options;
	},
	mergeGroupTemplate: function(){
		this.mergeGroupQuestionTemplate({questionCode: this.data.parentQuestionCode,text: this.data.label});
		for(q=0;q<this.data.questions.length;q++){
			var question = $('#groupQuestionTemplate').tmpl({text:this.data.questions[q].text});
			$(".question-block").append(question);
			for(a=0;a < this.data.questions[q].answers.length;a++){
				this.mergeAnswerTemplate({text: this.data.questions[q].answers[a]});
			}
		}
	},
	convert: function(){
		var groupQuestionData = new Object();
		groupQuestionData.questionCode = "Q009";
		groupQuestionData.label = "How about program";
		groupQuestionData.questions = new Array();
		var question = new Object();
		question.label = "How do you know the program?";
		question.answers = new Array();
		question.answers.push("Radio");
		question.answers.push("TV");
		question.answers.push("Website");
		question.answers.push("Newspager");
		
		groupQuestionData.questions.push(question);
		
		var question2 = new Object();
		question2.label = "When do the program start?";
		question2.answers = new Array();
		question2.answers.push("Monday");
		question2.answers.push("Tueday");
		question2.answers.push("Wensday");
		question2.answers.push("Thurday");
		
		groupQuestionData.questions.push(question2);
		
		return groupQuestionData;
	}
});