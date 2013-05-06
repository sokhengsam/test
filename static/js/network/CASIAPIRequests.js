var persistLength = [];
var CASIAPIRequests = new Class({
	Extends: BaseJSNetwork, 
	Implements: [JSONParser, DateTimeConvertor],
	initailize: function(options){
		this.parent();
		this.baseUrl = "http://cenat.gov.kh:8090/CASIMS/index.php/home/getjsondata";
		this.self = this;
	},
	uploadSurvey: function(requestData) {
		var self = this;
		var mobileKey = mobile.getMobileKey();
		requestData.mobilekey = mobileKey;
		this.postRequest("http://cenat.gov.kh:8090/CASIMS/index.php/home/uploadjsondata", requestData, 
			function(response){
				self.handleUploadResponse(response);
			}, 
			function(){
				console.log("falt");
			}
		);
	},
	handleUploadResponse: function(response) {
		enablepage();
		var syncstatus = response.syncstatus.Value;
		var synclog = response.SynLog;
		switch(syncstatus) {
			case 0:
				alert("Invalid MobileKey. Make sure your device didn't clear any important data.");
				break;
			case 1:
				this.parseSynLog(synclog);
				alert("Synchronize completed.");
				break;
			case 2:
				alert("Invalid data");
				break;
			case 3:
				alert("Data can't be saved. Please try again.");
				break;
			default:
				console.log("Unkown syncstatus");
		}
		
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
		//this.parseJson(sampleJson);
		this.parseJson(response);
	},
	downloadSurveyFail: function() {
		console.log("download survey fail. reading from static sample json");
		this.parseJson(sampleJson);
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
