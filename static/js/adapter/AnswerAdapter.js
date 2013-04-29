var AnswerAdapter = new Class({
	Implements: Options,
	lang:'',
	options: {
		questionType: '',
	},
	answers: [],
	initialize: function(options, answers, lang){
		//parse json to question template data
		this.answers = answers;
		this.setOptions(options);
		this.lang = lang;
	},
	mergeTemplate: function(){
		if(Number(this.options.questionType) == 1 || Number(this.options.questionType) == 2 
				|| Number(this.options.questionType) == 3 || Number(this.options.questionType) == 6) {
			switch(Number(this.options.questionType)) {
				case 1: //input text
					var inputTextAnswer = new InputTextAnswer(aOption);
					inputTextAnswer.mergeTemplate();
					$("input[type='text']:first").focus();
					break;
				case 2: //number
					var inputNumberAnswer = new InputNumberAnswer(aOption);
					inputNumberAnswer.mergeTemplate();
					$("input[type='number']:first").focus();
					break;
				case 3: //date
					break;
				case 6: //parent child question type
					break;
				default:
					console.log("unknow answer type");
			}
		}
		else if(Number(this.options.questionType) == 4 || Number(this.options.questionType) == 5) {
			for(var a = 0; a < this.answers.length; a++) {
				var answer = this.answers[a];
				var aOption = answer.options;
				aOption.text = answer.getDescription1();
				if(this.lang == 2) {
					aOption.text = answer.getDescription2();
				}
				switch(Number(this.options.questionType)) {
					case 4: //single question type
						var singleAnswer = new SingleAnswer(aOption);
						singleAnswer.mergeTemplate();
						break;
					case 5: //multiple question type
						var multipleAnswer = new MultipleAnswer(aOption);
						multipleAnswer.mergeTemplate();
						break;
						
					default:
						console.log("unknow answer type");
				}
			}
		}
	},
	mergeAnswerTemplate: function(aOption){
		var singleAnswer = new SingleAnswer(aOption);
		singleAnswer.mergeTemplate();
	}
});