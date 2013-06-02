var JSONParser = new Class({
	Extends: DateTimeConvertor,
	getCurrentDate: function() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd < 10){
			dd = '0' + dd;
		}
		if(mm < 10){
			mm = '0' + mm;
		}
		today = dd+'-'+mm+'-'+yyyy;
		return today;
	},
	parseSurvey: function(surveys,persistCallback) {
		for(var n =0 ; n < surveys.length; n++) {
			var survey = new Surveys();
			var s = surveys[n];
			survey.setSurveyId(s.SurveyID);
			survey.setSurveyCode(s.SurveyCode);
			survey.setDescription1(s.Description1);
			survey.setDescription2(s.Description2);
			survey.setStatus(s.Status);
			survey.setEditedDate(s.EditedDate);
			survey.setLastDownload(this.getTimeStamp());
			survey.setLogo(s.Logo);
			survey.setIntroduction1(s.Introduction1);
			survey.setIntroduction2(s.Introduction2);
			surveyDao.persist(survey,persistCallback);
		}
	},
	parseSection: function(sections,persistCallback) {
		for(var sec = 0; sec < sections.length; sec++) {
			var section = new Section();
			var sect = sections[sec];
			section.setSectionId(sect.SectionID);
			section.setSurveyId(sect.SurveyID);
			section.setSectionCode(sect.SectionCode);
			section.setDescription1(sect.Description1);
			section.setDescription2(sect.Description2);
			//server side should provide the introduction 1 and 2
			var int1="", int2 = "";
			if(sect.Introduction1 != null) {
				int1 = sect.Introduction1;
			}
			if(sect.Introduction2 != null) {
				int2 = sect.Introduction2;
			}
			section.setIntroduction1(int1);
			section.setIntroduction2(int2);
			
			sectionDao.persist(section,persistCallback);
		}
	},
	parseQuestionType: function(questionTypes,persistCallback) {
		for(var i = 0; i < questionTypes.length; i++) {
			var questionType = new QuestionType();
			var q = questionTypes[i];
			questionType.setQuestionTypeId(q.QuestionTypeID);
			questionType.setQuestionTypeName(q.QuestionTypeName);
			questionTypeDao.persist(questionType,persistCallback);
		}
	},
	parseQuestion: function(questions,persistCallback) {
		for(var i = 0; i < questions.length; i++) {
			var question = new Question();
			var q = questions[i];
			question.setQuestionId(q.QuestionID);
			question.setSectionId(q.SectionID);
			question.setQuestionCode(q.QuestionCode);
			question.setAllowNull(q.AllowNull);
			question.setDescription1(q.Description1);
			question.setDescription2(q.Description2);
			question.setIntroduction1(q.Introduction1);
			question.setIntroduction2(q.Introduction2);
			question.setParentId(q.ParentID);
			question.setQuestionTypeId(q.QuestionTypeID);
			question.setEnableOther(q.EnableOther);
			question.setNumberRange(q.NumberRangeFrom + "-" + q.NumberRangeTo);
			question.setDateRange(q.DateRangeFrom + "-" + q.DateRangeTo);
			question.setImage(q.Image);
			question.setOrder(q.OrderNo);
			question.setStatus(q.Status);
			question.setDependencyId(q.DependencyID);
			question.setSkipToId(q.SkipToID);
			questionDao.persist(question,persistCallback);
		}
	},
	parseAnswer: function(answers,persistCallback) {
		for(var i = 0; i < answers.length; i++) {
			var answer = new Answer();
			var a = answers[i];
			answer.setAnswerId(a.AnswerID);
			answer.setQuestionId(a.QuestionID);
			answer.setDescription1(a.Description1);
			answer.setDescription2(a.Description2);
			answer.setAnswerTypeId(a.AnswerTypeID);
			answer.setValue(a.Value);
			answer.setGoToQuestionId(a.GoToQuestionID);
			answerDao.persist(answer,persistCallback);
		}
	},
	parseProvince: function(provinces,persistCallback) {
		for(var i = 0; i < provinces.length; i++) {
			var province = new Province();
			var p = provinces[i];
			province.setProvinceId(p.ProvinceID);
			province.setProvinceCode(p.ProvinceCode);
			province.setProvinceName(p.Description1);
			provinceDao.persist(province,persistCallback);
		}
	},
	parseLanguages: function(languages,persistCallback) {
		for(var i = 0; i < languages.length; i++) {
			var language = new Language();
			var p = languages[i];
			language.setLanguageId(p.LanguageID);
			language.setLanguageCode(p.LanguageCode);
			language.setLanguageName(p.LanguageName);
			languageDao.persist(language,persistCallback);
		}
	},
	parseEvaluationOutcome: function(evaluationOutcome,persistCallback) {
		for(var i = 0; i < evaluationOutcome.length; i++) {
			var eva = new OutcomeEvaluation();
			var e = evaluationOutcome[i];
			eva.setOutcomeEvaluationId(e.OutcomeEvaluationID);
			eva.setOutcomeEvaluationCode(e.OutcomeEvaluationCode);
			eva.setDescription1(e.Description1);
			eva.setDescription2(e.Description2);
			eva.setStatus(e.Status);
			evaluationOutcomeDao.persist(eva,persistCallback);
		}
	},
	//shouldn't be nothing to parse
	parseParticipantAnswer: function(participantAnswers) {
		
	},
	
	parseAnswerType: function(answerTypeResponse,persistCallback) {
		for(var i = 0; i < answerTypeResponse.length ; i++) {
			var answerType = new AnswerType()
			var a = answerTypeResponse[i];
			answerType.setAnswerTypeId(a.AnswerTypeID);
			answerType.setAnswerTypeCode(a.Description1);
			answerTypeDao.persist(answerType,persistCallback);
		}
	},
	storeMobileKey: function(response, successCallback) {
		var key = response.mobilekey;
		var mobile = new Mobile();
		mobile.setMobileId(1);
		mobile.setMobileKey(key);
		mobileDao.persist(mobile);
		successCallback(mobile);
	},
	parseSynLog: function(synclog) {
		//"SynLogID":"1","ParticipantSurveyID":"1","SynDate":"2013-05-06 23:04:00","Status":"1"
		for(var i = 0; i < synclog.length; i++) {
			var sync = synclog[i];
			var s = new SyncLog();
			s.setSynLogId(sync.SynLogID);
			s.setParticipantSurveyId(sync.ParticipantSurveyID);
			s.setSurveyId(sync.SurveyID);
			s.setSynDate(sync.SynDate);
			s.setStatus(sync.Status);
			synLogDao.persist(s);
		}
	}
	
	
});