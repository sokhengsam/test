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
			dataType: 'TEXT',
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
	}
});

var Section = new Class({
	Implements: [Options, Fields],
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
		}
	},
	options: {
		sectionId: '',
		surveyId: '',
		sectionCode: '',
		description1: '',
		description2: ''
	},
	jQuery: 'Section',
	initialize: function(options){
		//this.setFields(this.fields); // inherited from Options like jQuery.extend();
		//this.setOptions(this.options);
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
		}
	},
	options: {
		questionId: '',
		sectionId:'',
		questionCode: '',
		allowNull:'',
		description1:'',
		description2: '',
		parentId: '',
		questionTypeId: '',
		enableOther: '',
		numberRange:'',
		dateRange:'',
		image: ''
	},
	jQuery: "Question",
	initialize: function(options){
		//nothing to do with the initialize
		//this.setFields(this.fields); // inherited from Options like jQuery.extend();
		//this.setOptions(this.options);
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
		}
	},
	options: {
		questionTypeId: '',
		questionTypeName: '',
	},
	setQuestionTypeId: function(questionTypeId) {
		this.options.questionTypeId =  questionTypeId;
	},
	setQuestionTypeName: function(questionTypeName) {
		this.options.questionTypeName = questionTypeName;
	},
	getQuestionTypeId: function() {
		return this.options.questionTypeId;
	},
	getQuestionTypeName: function() {
		return this.options.questionTypeName;
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
		value:{
			name: 'value', //number value pair to each question used for generating report
			dataType: 'INTEGER'
		},
		goToQuestionId: {
			name: 'goToQuestionId',
			dataType: 'INTEGER'
		}
	},
	options: {
		answerId:'',
		questionId: '',
		description1: '',
		description2: '',
		value: '',
		goToQuestionId: '',
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
			isPrimaryKey: true
		},
		interviewCode: {
			name: 'interviewCode',
			dataType: 'INTEGER'
		},
		participantCode: {
			name: 'participantCode',
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
		}
	},
	options: {
		participantAnswerId:'',
		interviewCode: '',
		participantCode: '',
		answerId: '',
		questionId: '',
		description: '',
	},
	setParticipantAnswerId: function(id) {
		this.options.participantAnserId = id;
	},
	getParticipantAnswerId: function() {
		return this.options.participantAnserId;
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
		}
	},
	options: {
		provinceId: '',
		provinceCode: '',
		provinceName: ''
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
	getProvinceId: function() {
		return this.options.provinceId
	},
	getProvinceCode: function() {
		return this.options.provinceCode;
	},
	getProvinceName: function() {
		return this.options.provinceName;
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
		}
	},
	options: {
		languageId: "",
		languageCode: "",
		languageName: ""
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
	getLanguageId: function() {
		return this.options.languageId;
	},
	getLanguageCode: function() {
		return this.options.languageCode;
	},
	getLanguageName: function() {
		return this.options.languageName;
	}
});

