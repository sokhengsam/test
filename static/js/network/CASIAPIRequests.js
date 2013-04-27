var persistLength = [];
var CASIAPIRequests = new Class({
	Extends: BaseJSNetwork,
	Implements: JSONParser,
	initailize: function(options){
		this.parent();
		this.baseUrl = "http://cenat.gov.kh:8090/CASIMS/index.php/home/getjsondata";
		this.self = this;
	},
	pushAnswer: function(requestData,responseHandler,failureHandler){
		this.postRequest(this.baseUrl,requestData,responseHandler,failureHandler);
	},
	downloadSurvey: function() {
		requestData=[];
		var self = this;
		this.getRequest("http://cenat.gov.kh:8090/CASIMS/index.php/home/getjsondata", requestData, function(response){self.insertDB(response);}, function(){self.downloadSurveyFail();});
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
			evaluationOutcome = sampleJson.outcomeevaluation;
		
		this.countPersistProcess((surveys.length + sections.length))
		
		this.parseSurvey(surveys,this.processPersistCompleteCallback);
		this.parseSection(sections,this.processPersistCompleteCallback);
		this.parseQuestionType(questiontypes);
		this.parseQuestion(question);
		this.parseAnswer(answers);
		this.parseParticipantAnswer(participantanswers);
		this.parseProvince(provinces);
		this.parseLanguages(languages);
		this.parseEvaluationOutcome(evaluationOutcome);
	},
	processPersistCompleteCallback: function(){
		console.log(persistLength);
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