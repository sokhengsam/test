var QuestionAdapter = new Class({
	question: null,
	initialize: function(question){
		//parse json to question template data
		this.question = question;
	},
	mergeTemplate: function(event,callback){
		var question = $('#questionTemplate').tmpl(this.question);
		$("#content").prepend(question);
		
		if(event != undefined && callback != undefined){
			question.bind(event,function(){
				callback($(this).find(".answer-block"));
			});
		}
		
	},
	mergeGroupQuestionTemplate: function(){
		console.log("mergeQuestionTemplate");
		var question = $('#parentGroupQuestionTemplate').tmpl(this.question);
		$("#content").prepend(question);
	}
});