var persistLength = [];
var CASIAPIRequests = new Class({
	Extends: BaseJSNetwork, 
	Implements: [JSONParser, DateTimeConvertor],
	initailize: function(options){
		this.parent();
		this.baseUrl = "http://cenat.gov.kh:8090/CASIMS/index.php/home/getjsondata";
		this.self = this;
	},
	pushAnswer: function(requestData,responseHandler,failureHandler){
		this.postRequest(this.baseUrl,requestData,responseHandler,failureHandler);
	},
	downloadSurvey: function() {
		var mobileKey = mobile.getMobileKey();
		
		requestData={
			"last-modified-since": this.getTimeStamp(),
			"mobilekey": mobileKey 
		};
		var self = this;
		this.getRequest("http://cenat.gov.kh:8090/CASIMS/index.php/home/getjsondata", requestData, function(response){self.insertDB(response);}, function(){self.downloadSurveyFail();});
	},
	getMobileKey: function(successCallback) {
		var self = this;
		this.getRequest("http://cenat.gov.kh:8090/CASIMS/index.php/home/getmobilekey", {}, function(response){
			self.storeMobileKey(response, successCallback);
		});
	},
	insertDB: function(response){
		$.when(this.parseJson(response)).done(function(){console.log("done");});
	},
	downloadSurveyFail: function() {
		console.log("download survey fail. reading from static sample json");
		this.parseJson(sampelJson);
	},
	parseJson: function(sampleJson) {
		
		var surveys = sampleJson.survey,
			sections = sampleJson.section,
			questiontypes = sampleJson.questiontype,
			question = sampleJson.question,
			answers = sampleJson.answer,
			participantanswers = sampleJson.participantanswer,
			provinces = sampleJson.province,
			languages = sampleJson.language,
			evaluationOutcome = sampleJson.outcomeevaluation,
			answerType = sampleJson.answertype;
		
		this.countPersistProcess((surveys.length + 
								  sections.length + 
								  questiontypes.length + 
								  question.length + 
								  answers.length +
								  provinces.length + 
								  evaluationOutcome.length + 
								  answerType.length + 
								  languages.length));
		
		this.parseSurvey(surveys,this.processPersistCompleteCallback);
		this.parseSection(sections,this.processPersistCompleteCallback);
		this.parseQuestionType(questiontypes,this.processPersistCompleteCallback);
		this.parseQuestion(question,this.processPersistCompleteCallback);
		this.parseAnswer(answers,this.processPersistCompleteCallback);
		this.parseParticipantAnswer(participantanswers,this.processPersistCompleteCallback);
		this.parseProvince(provinces,this.processPersistCompleteCallback);
		this.parseLanguages(languages,this.processPersistCompleteCallback);
		this.parseEvaluationOutcome(evaluationOutcome,this.processPersistCompleteCallback);
		this.parseAnswerType(answerType,this.processPersistCompleteCallback);
	},
	processPersistCompleteCallback: function(){
		//console.log(persistLength);
		persistLength.shift();
		if(persistLength.length == 0){
			enablepage();
		}
	},
	countPersistProcess: function(length){
		for(i=0;i < length;i++){
			persistLength.push(i);
		}
	}
});