var Surveys =  new Class({
	Implements: [Options, Fields],
	fields: {
		primaryKey: {
			name: 'surveyId',
			dataType: 'INTEGER',
			isPrimaryKey: true,
		},
		surveyCode: {
			name: 'surveyCode',
			dataType: 'TEXT',
		},
		description1: {
			name: 'description1',
			dataType: 'TEXT',
		},
		description2: {
			name: 'description2',
			dataType: 'TEXT'
		},
		status: {
			name: 'status',
			dataType: 'TEXT'
		},
		editedDate: {
			name: 'editedDate',
			dataType: 'NUMERIC'
		},
		lastDownload: {
			name: 'lastDownload',
			dataType: 'NUMERIC',
		},
		logo: {
			name:"logo",
			dataType: ''
		},
		introduction1: {
			name: 'introduction1',
			dataType: 'TEXT',
		},
		introduction2: {
			name: 'introduction2',
			dataType: 'TEXT',
		},
		endText: {
			name: 'endText',
			dataType: 'TEXT'
		}
	},
	options:{
		surveyId: '',
		surveyCode: '',
		description1: '',
		description2: '',
		status: '',
		editedDate: '',
		lastDownload: '',
		logo: '',
		introduction1: '',
		introduction2: '',
		endText: ''
	},
	jQuery: "Surveys",
	initialize: function(options){
		//this.setFields(this.fields); // inherited from Options like jQuery.extend();
		//this.setOptions(this.options);
	},
	setSurveyId: function(id) {
		this.options.surveyId = id;
	},
	setSurveyCode: function(code) {
		this.options.surveyCode = code;
	},
	setDescription1: function(name) {
		this.options.description1 = name;
	},
	setDescription2: function(name) {
		this.options.description2 = name;
	},
	setStatus:function(status) {
		this.options.status = status;
	},
	setEditedDate: function(editedDate) {
		this.options.editedDate = editedDate;
	},
	setLastDownload: function(lastDownload) {
		this.options.lastDownload = lastDownload;
	},
	setLogo: function(logo) {
		this.options.logo = logo;
	},
	setIntroduction1: function(ins) {
		this.options.introduction1 = ins;
	},
	setIntroduction2: function(i) {
		this.options.introduction2 = i;
	},
	setEndText: function(endText) {
		this.options.endText = endText;
	},
	getEditedDate: function() {
		return this.options.editedDate;
	},
	getStatus: function() {
		return this.options.status;
	},
	getSurveyId: function() {
		return this.options.surveyId;
	},
	getSurveyCode: function() {
		return this.options.surveyCode;
	},
	getDescription1: function() {
		return this.options.description1;
	},
	getDescriptio2: function() {
		return this.options.description2;
	},
	getLastDownload: function() {
		return this.options.lastDownload;
	},
	getLogo: function() {
		return this.options.logo;
	},
	getEndText: function() {
		return this.options.endText;
	},
	getIntroduction1: function() {
		return this.options.introduction1;
	},
	getIntroduction2: function() {
		return this.options.introduction2;
	}
});

var Section = new Class({
	Implements: [Options, Fields],
	questions: [],
	fields: {
		primaryKey: {
			name: 'sectionId',
			dataType: 'INTEGER',
			isPrimaryKey: true,
		},
		surveyId: {
			name: 'surveyId',
			dataType: 'INTEGER',
		},
		sectionCode: {
			name: 'sectionCode',
			dataType: 'TEXT',
		},
		description1: {
			name: 'description1',
			dataType: 'TEXT'
		},
		description2: {
			name:'description2',
			dataType: 'TEXT'
		},
		introduction1: {
			name: 'introduction1',
			dataType: 'TEXT'
		},
		introduction2: {
			name: 'introduction2',
			dataType: 'TEXT'
		},
		status: {
			name: 'status',
			dataType: 'INTEGER'
		}
	},
	options: {
		sectionId: '',
		surveyId: '',
		sectionCode: '',
		description1: '',
		description2: '',
		introduction1: '',
		introduction2: '',
		status: '' // status here can be active or inactive
	},
	jQuery: 'Section',
	initialize: function(options){
		//this.setFields(this.fields); // inherited from Options like jQuery.extend();
		this.setOptions(this.options);
	},
	getPrimaryKey: function() {
		return this.fields.primaryKey;
	},
	setSectionId: function(sectionId) {
		this.options.sectionId = sectionId;
	},
	setSurveyId: function(surveyId) {
		this.options.surveyId = surveyId;
	},
	setSectionCode: function(sectionCode) {
		this.options.sectionCode = sectionCode;
	},
	setDescription1: function(sectionName) {
		this.options.description1 = sectionName;
	},
	setDescription2: function(sectionname) {
		this.options.description2 = sectionname;
	},
	setIntroduction1: function(introduction1) {
		this.options.introduction1 = introduction1;
	},
	setIntroduction2: function(introduction2) {
		this.options.introduction2 = introduction2;
	},
	setStatus: function(status) {
		this.options.status = status;
	},
	getSectionId: function() {
		return this.options.sectionId;
	},
	getSectionCode: function() {
		return this.options.sectionCode;
	},
	getDescription1: function() {
		return this.options.description1;
	},
	getDescription2: function() {
		return this.options.description2;
	},
	getIntroduction1: function() {
		return this.options.introduction1;
	},
	getIntroduction2: function() {
		return this.options.introduction2;
	},
	getStatus: function() {
		return this.options.status;
	}
});
/* Question domain object */
var Question = new Class({
	Implements: [Options, Fields],
	text: "",
	fields: {
		primaryKey: {
			name: 'questionId',
			dataType: 'INTEGER',
			isPrimaryKey: true,
		},
		sectionId:{
			name: 'sectionId',
			dataType: "INTEGER",
		},
		questionCode: {
			name: 'questionCode',
			dataType: 'TEXT',
		},
		allowNull: {
			name: 'allowNull',
			dataType: 'NUMERIC',
		},
		description1: {
			name: 'description1', //question in english
			dataType: 'TEXT'
		},
		description2: {
			name: 'description2', //question in khmer
			dataType: 'TEXT'
		},
		introduction1: {
			name:"introduction1",
			dataType: 'TEXT'
		},
		introduction2: {
			name: "introduction2",
			dataType: "TEXT"
		},
		parentId: {
			name: 'parentId', //parent question id
			dataType: 'INTEGER',
		},
		questionTypeId: {
			name: 'questionTypeId', //question type (multiple, single, or other). on question can have only 1 type of answer
			dataType: 'INTEGER'
		},
		enableOther: {
			name: 'enableOther', //enable for other question
			dataType: 'NUMERIC',
		},
		numberRange: {
			name: 'numberRange', //number question can have the range from - to. //Master db has 2 fields for this, but i would suggest to place it in one field contains from-to then we just substring when we validate the input 
			dataType: 'TEXT'
		},
		dateRange: {
			name: 'dateRange', //same as the number range. from-to
			dataType: 'TEXT'
		},
		image: {
			name: 'image', //binary string image. some question can be the image question
			dataType: 'BLOB'
		},
		orderNo: {
			name: 'orderNo',
			dataType: 'INTEGER',
		},
		status: {
			name: 'status',
			dataType: 'INTEGER'
		},
		dependencyId: {
			name: 'dependencyId',
			dataType: 'INTEGER'
		},
		skipToId: {
			name: 'skipToId',
			dataType: 'INTEGER'
		}
	},
	options: {
		questionId: '',
		sectionId:'',
		questionCode: '',
		allowNull:'',
		description1:'',
		description2: '',
		introduction1: '',
		introduction2: '',
		parentId: '',
		questionTypeId: '',
		enableOther: '',
		numberRange:'',
		dateRange:'',
		image: '',
		orderNo: '',
		status: '',
		dependencyId: '',
		skipToId: ''
	},
	jQuery: "Question",
	initialize: function(options){
		//nothing to do with the initialize
		this.setFields(this.fields); // inherited from Options like jQuery.extend();
		this.setOptions(this.options);
	},
	setImage: function(image) {
		this.options.image = image;
	},
	getImage: function() {
		return this.options.image;
	},
	setQuestionId: function(id) {
		this.options.questionId = id;
	},
	setSectionId: function(id) {
		this.options.sectionId = id;
	},
	setQuestionCode: function(code) {
		this.options.questionCode = code;
	},
	setDescription1: function(description1) {
		this.options.description1 = description1;
	},
	setDescription2: function(description2) {
		this.options.description2 = description2;
	},
	setIntroduction1: function(introduction1) {
		this.options.introduction1 = introduction1;
	},
	setIntroduction2: function(introduction2) {
		this.options.introduction2 = introduction2;
	},
	setParentId: function(parentId) {
		this.options.parentId = parentId;
	},
	setQuestionTypeId: function(questionTypeId) {
		this.options.questionTypeId = questionTypeId;
	},
	setEnableOther: function(enableOther) {
		this.options.enableOther = enableOther;
	},
	setNumberRange: function(numberRange) {
		this.options.numberRange = numberRange;
	},
	setDateRange: function(dateRange) {
		this.options.dateRange = dateRange;
	},
	setAllowNull: function(allowNull) {
		this.options.allowNull = allowNull;
	},
	setOrder: function(order) {
		this.options.orderNo = order;
	},
	setStatus: function(status) {
		this.options.status = status;
	},
	setDependencyId: function(dependencyId){
		this.options.dependencyId = dependencyId;
	},
	setSkipToId: function(skipToId){
		this.options.skipToId = skipToId;
	},
	getAllowNull: function() {
		return this.options.allowNull;
	},
	getQuestionId: function() {
		return this.options.questionId;
	},
	getSectionId: function() {
		return this.options.sectionId;
	},
	getQuestionCode: function() {
		return this.options.questionCode;
	},
	getDescription1: function() {
		return this.options.description1;
	},
	getDescription2: function() {
		return this.options.description2;
	},
	getIntroduction1: function() {
		return this.options.introduction1;
	},
	getIntroduction2: function() {
		return this.options.introduction2;
	},
	getParentId: function() {
		return this.options.parentId;
	},
	getQuestionTypeId: function() {
		return this.options.questionTypeId;
	},
	getEnableOther: function() {
		return this.options.enableOther;
	},
	getNumberRange: function() {
		return this.options.numberRange;
	},
	getDateRange: function() {
		return this.options.dateRange;
	},
	getOrder: function() {
		return this.options.orderNo;
	},
	getStatus: function() {
		return this.options.status;
	},
	getDependencyId: function(){
		return this.options.dependencyId;
	},
	getSkipToId: function(){
		return this.options.skipToId;
	}

});
/**
 * Question type class
 */
var QuestionType = new Class({
	Implements: [Option, Fields],
	fields: {
		primaryKey: {
			name: 'questionTypeId',
			dataType: 'INTEGER',
			isPrimaryKey: true
		},
		questionTypeName: {
			name: 'questionTypeName',
			dataType: 'TEXT'
		},
		status: {
			name: 'status',
			dataType: 'INTEGER'
		}
	},
	options: {
		questionTypeId: '',
		questionTypeName: '',
		status: ''
	},
	setQuestionTypeId: function(questionTypeId) {
		this.options.questionTypeId =  questionTypeId;
	},
	setQuestionTypeName: function(questionTypeName) {
		this.options.questionTypeName = questionTypeName;
	},
	setStatus: function(status) {
		this.options.status = status;
	},
	getQuestionTypeId: function() {
		return this.options.questionTypeId;
	},
	getQuestionTypeName: function() {
		return this.options.questionTypeName;
	},
	getStatus: function() {
		return this.options.status;
	}
});
/**
 * Answer domain object
 */
var Answer = new Class({
	Implements: [Option, Fields],
	fields: {
		primaryKey: {
			name: 'answerId',
			dataType: 'INTEGER',
			isPrimaryKey: true
		},
		questionId: {
			name: 'questionId',
			dataType: 'INTEGER'
		},
		description1: {
			name: 'description1',
			dataType: 'TEXT'
		},
		description2: {
			name: 'description2',
			dataType: 'TEXT'
		},
		answerTypeId: {
			name: 'answerTypeId',
			dataType: 'INTEGER'
		},
		value:{
			name: 'value', //number value pair to each question used for generating report
			dataType: 'INTEGER'
		},
		goToQuestionId: {
			name: 'goToQuestionId',
			dataType: 'INTEGER'
		},
		status: {
			name: 'status',
			dataType: 'INTEGER'
		},
		numberRange: {
			name: 'numberRange', //number question can have the range from - to. //Master db has 2 fields for this, but i would suggest to place it in one field contains from-to then we just substring when we validate the input 
			dataType: 'TEXT'
		}
		
	},
	options: {
		answerId:'',
		questionId: '',
		description1: '',
		description2: '',
		answerTypeId: '',
		value: '',
		goToQuestionId: '',
		status: '',
		numberRange: ''
	},
	setQuestionId: function(id) {
		this.options.questionId = id;
	},
	setAnswerId: function(id) {
		this.options.answerId = id;
	},
	setGoToQuestionId: function(goToQuestionId) {
		this.options.goToQuestionId = goToQuestionId;
	},
	setValue: function(value) {
		this.options.value = value;
	},
	setDescription1: function(description1) {
		this.options.description1 = description1;
	},
	setDescription2: function(description2) {
		this.options.description2 = description2;
	},
	setStatus: function(status) {
		this.options.status = status;
	},
	setAnswerTypeId: function(id) {
		this.options.answerTypeId = id;
	},
	setNumberRange: function(numberRange){
		this.options.numberRange = numberRange;
	},
	getAnswerTypeId: function() {
		return this.options.answerTypeId;
	},
	getGoToQuestionId: function() {
		return this.options.goToQuestionId;
	},
	getValue: function() {
		return this.options.value;
	},
	getQuestionId: function() {
		return this.options.questionId;
	},
	getAnswerId: function() {
		return this.options.answerId;
	},
	getDescription1: function() {
		return this.options.description1;
	},
	getDescription2: function() {
		return this.options.description2;
	},
	getStatus: function() {
		return this.options.status;
	},
	getNumberRange: function(){
		return this.options.numberRange;
	}
});

/**
 * Participant answer
 */
var ParticipantAnswer = new Class({
	Implements: [Options, Fields],
	fields: {
		primaryKey:{
			name: 'participantAnswerId',
			dataType: 'INTEGER',
			isPrimaryKey: true,
			isAutoIncrease:true
		},
		participantSurveyId: {
			name: 'participantSurveyId',
			dataType: 'INTEGER'
		},
		answerId: {
			name: 'answerId',
			dataType: 'INTEGER'
		},
		questionId: {
			name: 'questionId',
			dataType: 'INTEGER'
		},
		description: {
			name: 'description',
			dataType: 'TEXT'
		},
		startDateTime: {
			name: 'startDateTime',
			dataType: 'TEXT'
		},
		endDateTime: {
			name: 'endDateTime',
			dataType: 'TEXT'
		},
		status: {
			name: 'status',
			dataType: 'INTEGER'
		}
	},
	options: {
		participantAnswerId:'',
		participantSurveyId:'',
		answerId: '',
		questionId: '',
		description: '',
		startDateTime: '',
		endDateTime: '',
		status: ''
	},
	setParticipantAnswerId: function(id) {
		this.options.participantAnswerId = id;
	},
	getParticipantAnswerId: function() {
		return this.options.participantAnswerId;
	},
	setInterviewCode: function(code) {
		this.options.interviewCode = code;
	},
	getInterviewCode: function() {
		return this.options.interviewCode;
	},
	setParticipantCode: function(code) {
		this.options.participantCode = code;
	},
	getParticipantCode: function() {
		return this.options.participantCode;
	},
	setAnswerId: function(answerId) {
		this.options.answerId = answerId;
	},
	getAnswerId: function() {
		return this.options.answerId;
	},
	setQuestionId: function(questionId) {
		this.options.questionId = questionId;
	},
	getQuestionId: function() {
		return this.options.questionId;
	},
	setDescription: function(description) {
		this.options.description = description;
	},
	getDescription: function() {
		return this.options.description;
	},
	setParticipantSurveyId: function(participantSurveyId) {
		this.options.participantSurveyId = participantSurveyId;
	},
	getParticipantSurveyId: function() {
		return this.options.participantSurveyId;
	},
	setStatus: function(status) {
		this.options.status = status;
	},
	getStatus: function() {
		return this.options.status;
	},
	setStartDateTime: function(st) {
		this.options.startDateTime = st;
	},
	getStartDateTime: function() {
		return this.options.startDateTime;
	},
	setEndDateTime: function(et) {
		this.options.endDateTime = et;
	},
	getEndDateTime: function() {
		return this.options.endDateTime;
	}
});

var ParticipantSurvey = new Class({
	Implements: [Options, Fields],
	fields: {
		primaryKey: {
			name: 'participantSurveyId',
			dataType: 'INTEGER',
			isAutoIncrease: true,
			isPrimaryKey: true,
		},
		surveyId: {
			name: 'surveyId',
			dataType: 'INTEGER'
		},
		surveyDate: {
			name: 'surveyDate',
			dataType: 'NUMERIC'
		},
		interviewCode: {
			name: 'interviewCode',
			dataType: 'TEXT'
		},
		participantCode: {
			name: 'participantCode',
			dataType: 'TEXT'
		},
		placeOfInterview: {
			name: 'placeOfInterview',
			dataType: 'TEXT'
		},
		provinceId: {
			name: 'provinceId',
			dataType: 'INTEGER'
		},
		outComeEvaluationId: {
			name: 'outComeEvaluationId',
			dataType: 'INTEGER'
		},
		languageId: {
			name: 'languageId',
			dataType: 'INTEGER'
		},
		startDateTime: {
			name: 'startDateTime',
			dataType: 'TEXT'
		},
		endDateTime: {
			name: 'endDateTime',
			dataType: 'TEXT'
		},
		status: {
			name: 'status',
			dataType: 'INTEGER'
		}
	},
	options: {
		participantSurveyId: '',
		surveyId: '',
		surveyDate: '',
		interviewCode: '',
		participantCode: '',
		placeOfInterview: '',
		provinceId: '',
		outComeEvaluationId: '',
		languageId: '',
		startDateTime: '',
		endDateTime: '',
		status: ''
	},
	setParticipantSurveyId: function(id) {
		this.options.participantSurveyId = id;
	},
	setSurveyId: function(id) {
		this.options.surveyId = id;
	},
	setSurveyDate: function(d) {
		this.options.surveyDate = d;
	},
	setInterviewCode: function(c) {
		this.options.interviewCode = c;
	},
	setParticipantCode: function(c) {
		this.options.participantCode = c;
	},
	setPlaceOfInterview: function(p) {
		this.options.placeOfInterview = p;
	},
	setProvinceId: function(id) {
		this.options.provinceId = id;
	},
	setOutComeEvaluationId: function(id) {
		this.options.outComeEvaluationId = id;
	},
	setLanguageId: function(id) {
		this.options.languageId = id;
	},
	setStartDateTime: function(start) {
		this.options.startDateTime = start;
	},
	setEndDateTime: function(end) {
		this.options.endDateTime = end;
	},
	setStatus: function(status) {
		this.options.status = status;
	},
	getParticipantSurveyId: function() {
		return this.options.participantSurveyId;
	},
	getSurveyId: function() {
		return this.options.surveyId;
	},
	getSurveyDate: function() {
		return this.options.surveyDate;
	},
	getInterviewCode: function() {
		return this.options.interviewCode;
	},
	getParticipantCode: function() {
		return this.options.participantCode;
	},
	getPlaceOfInterview: function() {
		return this.options.placeOfInterview;
	},
	getProvinceId: function() {
		return this.options.provinceId;
	},
	getOutComeEvaluationId: function() {
		return this.options.outComeEvaluationId;
	},
	getLanguageId: function() {
		return this.options.languageId;
	},
	getStartDateTime: function() {
		return this.options.startDateTime;
	},
	getEndDateTime: function() {
		return this.options.endDateTime;
	},
	getStatus: function() {
		return this.options.status;
	}
});

/**
 * Province
 */
var Province = new Class({
	Implements: [Options, Fields],
	fields: {
		primaryKey: {
			name: "provinceId",
			dataType: "INTEGER",
			isPrimaryKey: true
		},
		provinceCode: {
			name: "provinceCode",
			dataType: "TEXT"
		},
		provinceName: {
			name: "provinceName",
			dataType: "TEXT"
		},
		status: {
			name: 'status',
			dataType: 'INTEGER'
		}
	},
	options: {
		provinceId: '',
		provinceCode: '',
		provinceName: '',
		status: ''
	},
	setProvinceId: function(id) {
		this.options.provinceId = id;
	},
	setProvinceCode: function(code) {
		this.options.provinceCode = code;
	},
	setProvinceName: function(name) {
		this.options.provinceName = name;
	},
	setStatus: function(status) {
		this.options.status = status;
	},
	getProvinceId: function() {
		return this.options.provinceId
	},
	getProvinceCode: function() {
		return this.options.provinceCode;
	},
	getProvinceName: function() {
		return this.options.provinceName;
	},
	getStatus: function() {
		return this.options.status;
	}
});

var Language = new Class({
	Implements: [Options, Fields],
	fields: {
		primaryKey: {
			name: "languageId",
			dataType: "INTEGER",
			isPrimaryKey: true
		},
		languageCode: {
			name: "languageCode",
			dataType: "TEXT",
		},
		languageName: {
			name: "languageName",
			dataType: "TEXT"
		},
		status: {
			name: "status",
			dataType: "INTEGER",
		}
	},
	options: {
		languageId: "",
		languageCode: "",
		languageName: "",
		status: ""
	},
	setLanguageId: function(id) {
		this.options.languageId = id;
	},
	setLanguageCode: function(code) {
		this.options.languageCode = code;
	},
	setLanguageName: function(name) {
		this.options.languageName = name;
	},
	setStatus: function(status) {
		this.options.status = status;
	},
	getLanguageId: function() {
		return this.options.languageId;
	},
	getLanguageCode: function() {
		return this.options.languageCode;
	},
	getLanguageName: function() {
		return this.options.languageName;
	},
	getStatus: function() {
		return this.options.status;
	}
});

var OutcomeEvaluation = new Class({
	Implements: [Options, Fields],
	fields: {
		primaryKey: {
			name: "outcomeEvaluationId",
			dataType:"INTEGER",
			isPrimaryKey: true
		},
		outcomeEvaluationCode: {
			name: "outcomeEvaluationCode",
			dataType: "TEXT"
		},
		description1: {
			name: "description1",
			dataType: "TEXT"
		},
		description2: {
			name: "description2",
			dataType: "TEXT"
		},
		status: {
			name: "status",
			dataType: "INTEGER"
		}
	},
	options: {
		outcomeEvaluationId: '',
		outcomeEvaluationCode: '',
		description1: '',
		description2: '',
		status: ''
	},
	setOutcomeEvaluationId: function(id) {
		this.options.outcomeEvaluationId = id;
	},
	setOutcomeEvaluationCode: function(code) {
		this.options.outcomeEvaluationCode = code;
	},
	setDescription1: function(d1) {
		this.options.description1 = d1;
	},
	setDescription2: function(d2) {
		this.options.description2 = d2;
	},
	setStatus: function(s) {
		this.options.status = s;
	},
	getOutcomeEvaluationId: function() {
		return this.options.outcomeEvaluationId;
	},
	getOutcomeEvaluationCode: function() {
		return this.options.outcomeEvaluationCode;
	},
	getDescription1: function() {
		return this.options.description1;
	},
	getDescription2: function() {
		return this.options.description2;
	},
	getStatus: function() {
		return this.options.status;
	}
});

var ParticipantLog = new Class({
	Implements: [Options, Fields],
	fields: {
		primaryKey: {
			name: 'participantLogId',
			dataType: 'INTEGER',
			isPrimaryKey: true,
			isAutoIncrease: true
		},
		participantSurveyId: {
			name: 'participantSurveyId',
			dataType: "INTEGER"
		},
		participantCode: {
			name: 'participantCode',
			dataType: 'TEXT',
		},
		startDateTime: {
			name: 'startDateTime',
			dataType: 'NUMERIC'
		},
		endDateTime: {
			name: 'endDateTime',
			dataType: 'NUMERIC'
		},
		lastQuestion: {
			name: 'lastQuestion',
			dataType: 'INTEGER'
		},
		lastScore: {
			name: 'lastScore',
			dataType: 'INTEGER'
		},
		lastATSScore: {
			name: 'atsScore',
			dataType: 'INTEGER'
		},
		lastAlcoholicScore: {
			name: 'alcoholicScore',
			dataType: 'INTEGER'
		},
		lastSectionIndex:{
			name: 'lastSectionIndex',
			dataType: 'INTEGER'
		},
		lastQuestionIndex:{
			name: 'lastQuestionIndex',
			dataType: 'INTEGER'
		},
		lastSectionId: {
			name: 'lastSectionId',
			dataType: 'INTEGER'
		},
		language: {
			name: "language",
			dataType: "INTEGER"
		},
		crf2pass: {
			name: "crf2pass",
			dataType: "INTEGER",
		},
		a1avalid: {
			name: "a1avalid",
			dataType: "INTEGER"
		},
		previousHistoryLog: {
			name: "previousHistoryLog",
			dataType: "TEXT"
		}
	},
	options: {
		participantLogId: '',
		participantCode: '',
		startDateTime: '',
		endDateTime: '',
		lastQuestion: '',
		participantSurveyId: '',
		lastScore: '',
		atsScore: '',
		alcoholicScore: '',
		lastSectionIndex: "",
		lastQuestionIndex: "",
		lastSectionId: "",
		language: '',
		crf2pass:'',
		a1avalid:'',
		previousHistoryLog: ''
	},
	setParticipantLogId: function(id){
		this.options.participantLogId = id;
	},
	setParticipantCode: function(code) {
		this.options.participantCode = code;
	},
	setStartDateTime: function(d) {
		this.options.startDateTime = d;
	},
	setEndDateTime: function(d) {
		this.options.endDateTime = d;
	},
	setLastQuestion: function(i) {
		this.options.lastQuestion = i;
	},
	setParticipantSurveyId: function(id) {
		this.options.participantSurveyId = id;
	},
	setLastScore: function(score) {
		this.options.lastScore = score;
	},
	setATSScore: function(score) {
		this.options.atsScore = score;
	},
	setAlcoholScore: function(score) {
		this.options.alcoholicScore = score;
	},
	setLastSectionIndex: function(sectionIndex){
		this.options.lastSectionIndex = sectionIndex;
	},
	setLastQuestionIndex: function(questionIndex){
		this.options.lastQuestionIndex = questionIndex;
	},
	setLastSectionId: function(sectionId){
		this.options.lastSectionId = sectionId;
	},
	setLanguage: function(langId) {
		this.options.language = langId;
	},
	setPreviousHistoryLog: function(previousHistoryLog) {
		this.options.previousHistoryLog = previousHistoryLog;
	},
	getLanguage: function() {
		return this.options.language;
	},
	getLastScore: function() {
		return this.options.lastScore;
	},
	getATSScore: function() {
		return this.options.atsScore;
	},
	getAlcoholScore: function() {
		return this.options.alcoholicScore;
	},
	getParticipantSurveyId: function() {
		return this.options.participantSurveyId;
	},
	getParticipantLogId: function(){
		return this.options.participantLogId;
	},
	getParticipantCode: function() {
		return this.options.participantCode;
	},
	getStartDateTime: function() {
		return this.options.startDateTime;
	},
	getEndDateTime: function() {
		return this.options.endDateTime;
	},
	getLastQuestion: function() {
		return this.options.lastQuestion;
	},
	getLastSectionIndex: function(){
		return this.options.lastSectionIndex;
	},
	getLastQuestionIndex: function(){
		return this.options.lastQuestionIndex;
	},
	getLastSectionId: function(){
		return this.options.lastSectionId;
	},
	setCRF2Pass: function(p) {
		this.options.crf2pass = p;
	},
	getCRF2Pass: function() {
		return this.options.crf2pass;
	},
	setA1AValid: function(valid) {
		this.options.a1avalid = valid;
	},
	getA1AValid: function() {
		return this.options.a1avalid;
	},
	getPreviousHistoryLog: function(){
		return this.options.previousHistoryLog;
	}
	
});

/**
 * 
 */
var Mobile = new Class({
	Implement: [Options, Fields],
	fields: {
		primaryKey: {
			name: "mobileId",
			isPrimaryKey: true,
			dataType: "INTEGER",
			isAutoIncrease: true
		},
		mobileKey: {
			name: "mobileKey",
			dataType: "TEXT"
		}
	},
	options: {
		mobileId: "",
		mobileKey: ""
	},
	setMobileId: function(id) {
		this.options.mobileId = id;
	},
	setMobileKey: function(mobileKey) {
		this.options.mobileKey = mobileKey;
	},
	getMobileId: function() {
		return this.options.mobileId;
	},
	getMobileKey: function() {
		return this.options.mobileKey;
	}
});

var AnswerType = new Class({
	Implements: [Options, Fields],
	fields: {
		primaryKey: {
			name: "answerTypeId",
			isPrimaryKey: true,
			dataType: "INTEGER"
		},
		answerTypeCode: {
			name: "answerTypeCode",
			dataType: "INTEGER"
		}
	},
	options: {
		answerTypeId: "",
		answerTypeCode: ""
	},
	setAnswerTypeId: function(id) {
		this.options.answerTypeId = id;
	},
	setAnswerTypeCode: function(code) {
		this.options.answerTypeCode = code;
	},
	getAnswerTypeId: function() {
		return this.options.answerTypeId;
	},
	getAnswerTypeCode: function() {
		return this.options.answerTypeCode;
	}
});

var SyncLog = new Class({
	Implements: [Options, Fields],
	fields: {
		primaryKey: {
			name: "synLogId",
			isPrimaryKey: true,
			dataType: "INTEGER"
		},
		participantSurveyId: {
			name: "participantSurveyId",
			dataType: "INTEGER"
		},
		surveyId: {
			name: "surveyId",
			dataType: "INTEGER"
		},
		syncDate: {
			name: "synDate",
			dataType: "TEXT"
		},
		status: {
			name: "status",
			dataType: "INTEGER"
		}
	},
	options: {
		synLogId: '',
		participantSurveyId: '',
		surveyId: '',
		synDate:'',
		status: ''
	},
	setSynLogId: function(id) {
		this.options.synLogId = id;
	},
	setParticipantSurveyId: function(id) {
		this.options.participantSurveyId = id;
	},
	setSynDate:function(d) {
		this.options.synDate = d;
	},
	setSurveyId: function(id) {
		this.options.surveyId = id;
	},
	setStatus: function(s) {
		this.options.status = s;
	},
	getStatus: function() {
		return this.options.status;
	},
	getSynLogId: function() {
		return this.options.synLogId;
	},
	getParticipantSurveyId: function(id) {
		return this.options.participantSurveyId;
	},
	getSurveyId: function() {
		return this.options.surveyId;
	},
	getSynDate:function() {
		return this.options.synDate;
	}
});