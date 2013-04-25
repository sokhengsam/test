var JSONParser = new Class({
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
	parseSurvey: function(surveys) {
		for(var n =0 ; n < surveys.length; n++) {
			var survey = new Surveys();
			var s = surveys[n];
			survey.setSurveyId(s.SurveyID);
			survey.setSurveyCode(s.SurveyCode);
			survey.setDescription1(s.Description1);
			survey.setDescription2(s.Description2);
			survey.setStatus(s.Status);
			survey.setEditedDate(s.EditedDate);
			survey.setLastDownload(this.getCurrentDate());
			surveyDao.persist(survey);
		}
	},
	parseSection: function(sections) {
		for(var sec = 0; sec < sections.length; sec++) {
			var section = new Section();
			var sect = sections[sec];
			section.setSectionId(sect.SectionID);
			section.setSurveyId(sect.SurveyID);
			section.setSectionCode(sect.SectionCode);
			section.setDescription1(sect.Description1);
			section.setDescription2(sect.Description2);
			sectionDao.persist(section);
		}
	},
	parseQuestionType: function(questionTypes) {
		for(var i = 0; i < questionTypes.length; i++) {
			var questionType = new QuestionType();
			var q = questionTypes[i];
			questionType.setQuestionTypeId(q.QuestionTypeID);
			questionType.setQuestionTypeName(q.QuestionTypeName);
			questionTypeDao.persist(questionType);
		}
	},
	parseQuestion: function(questions) {
		for(var i = 0; i < questions.length; i++) {
			var question = new Question();
			var q = questions[i];
			question.setQuestionId(q.QuestionID);
			question.setSectionId(q.SectionID);
			question.setQuestionCode(q.QuestionCode);
			question.setAllowNull(q.AllowNull);
			question.setDescription1(q.Description1);
			question.setDescription2(q.Description2);
			question.setParentId(q.ParentID);
			question.setQuestionTypeId(q.QuestionTypeID);
			question.setEnableOther(q.EnableOther);
			question.setNumberRange(q.NumberRangeFrom + "-" + q.NumberRangeTo);
			question.setDateRange(q.DateRangeFrom + "-" + q.DateRangeTo);
			question.setImage(q.Image);
			questionDao.persist(question);
		}
	},
	parseAnswer: function(answers) {
		for(var i = 0; i < answers.length; i++) {
			var answer = new Answer();
			var a = answers[i];
			answer.setAnswerId(a.AnswerID);
			answer.setQuestionId(a.QuestionID);
			answer.setDescription1(a.Description1);
			answer.setDescription2(a.Description2);
			answer.setValue(a.Value);
			answer.setGoToQuestionId(a.GoToQuestionID);
			answerDao.persist(answer);
		}
	},
	parseProvince: function(provinces) {
		for(var i = 0; i < provinces.length; i++) {
			var province = new Province();
			var p = provinces[i];
			province.setProvinceId(p.ProvinceID);
			province.setProvinceCode(p.ProvinceCode);
			province.setProvinceName(p.ProvinceName);
			provinceDao.persist(province);
		}
	},
	parseLanguages: function(languages) {
		for(var i = 0; i < languages.length; i++) {
			var language = new Language();
			var p = languages[i];
			language.setLanguageId(p.LanguageID);
			language.setLanguageCode(p.LanguageCode);
			language.setLanguageName(p.LanguageName);
			languageDao.persist(language);
		}
	},
	parseParticipantAnswer: function(participantAnswers) {
		
	},
	
});