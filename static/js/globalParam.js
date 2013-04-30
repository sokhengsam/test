var surveyDao = null,
	questionDao = null,
	answerDao = null,
	sectionDao = null,
	questionTypeDao = null,
	participantAnswerDao = null,
	languageDao = null,
	provinceDao = null,
	outcomeEvaluationDao = null,
	participantSurveyDao = null,
	participantLogDao = null,
	mobileDao = null,
	answerTypeDao = null,
	evaluationOutcomeDao= null,
	scroller = null,
	request = null,
	mobile = null;
	skipQuestionHistory = [],
	answerVal = 0;


var sampleJson = 
{
	    "survey": [
	        {
	            "SurveyID": "1",
	            "SurveyCode": "S01",
	            "Description1": "SMART Girl",
	            "Description2": "ស្មាតហ្គឺល",
	            "Logo": null,
	            "IntroductionText": "អ្នកអាចចំណាយ ពេលប្រហែលជា៦០នាទីសម្រាប់ចូលរួមក្នុងការសិក្សាស្រាវជ្រាវនេះ។ មានសំនួរមួយចំនួននឹង សួរពីរឿងផ្ទាល់ខ្លួនរបស់អ្នក។ អ្នកអាចបដិសេធមិនឆ្លើយនូវសំនួរណា ដែលអ្នកមិនចង់ឆ្លើយ។ យើងសុំឲ្យអ្នកឆ្លើយដោយស្មោះត",
	            "EndText": "សូមអរគុណសំរាប់ការចូលរួម។",
	            "AddedDate": "2013-04-21 17:16:39",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        }
	    ],
	    "section": [
	        {
	            "SectionID": "1",
	            "SectionCode": "A",
	            "Description1": "Demographics",
	            "Description2": "លក្ខណៈប្រជាសាស្រ្ត",
	            "SurveyID": "1",
	            "AddedDate": "2013-04-21 17:21:28",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "SectionID": "2",
	            "SectionCode": "B",
	            "Description1": "Occupation and Socioeconomic Status",
	            "Description2": "ការងារ និងសុខមាលភាពសេដ្ឋកិច្ច",
	            "SurveyID": "1",
	            "AddedDate": "2013-04-21 17:23:58",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        }
	    ],
	    "questiontype": [
	        {
	            "QuestionTypeID": "1",
	            "QuestionTypeName": "Text",
	            "AddedDate": "2013-04-21 16:09:30",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "QuestionTypeID": "2",
	            "QuestionTypeName": "Number",
	            "AddedDate": "2013-04-21 16:39:22",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "QuestionTypeID": "3",
	            "QuestionTypeName": "Date",
	            "AddedDate": "2013-04-21 16:40:39",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "QuestionTypeID": "4",
	            "QuestionTypeName": "Single",
	            "AddedDate": "2013-04-21 16:44:30",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "QuestionTypeID": "5",
	            "QuestionTypeName": "Multiple",
	            "AddedDate": "2013-04-21 16:44:49",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        }
	    ],
	    "question": [
	        {
	            "QuestionID": "1",
	            "QuestionCode": "A1",
	            "Description1": "How old are you?",
	            "Description2": "តើអ្នកមានអាយុប៉ុន្មានឆ្នាំ",
	            "ParentID": null,
	            "SectionID": "1",
	            "QuestionTypeID": "2",
	            "Image": null,
	            "OrderNo": "1",
	            "AllowNull": "0",
	            "EnableOther": "0",
	            "NumberRangeFrom": null,
	            "NumberRangeTo": null,
	            "DateRangeFrom": null,
	            "DateRangeTo": null,
	            "AddedDate": "2013-04-21 17:29:56",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "QuestionID": "2",
	            "QuestionCode": "A2",
	            "Description1": "Are you married?",
	            "Description2": "តើអ្នករៀបការហើយឬនៅ?",
	            "ParentID": null,
	            "SectionID": "1",
	            "QuestionTypeID": "4",
	            "Image": null,
	            "OrderNo": "2",
	            "AllowNull": "0",
	            "EnableOther": "0",
	            "NumberRangeFrom": null,
	            "NumberRangeTo": null,
	            "DateRangeFrom": null,
	            "DateRangeTo": null,
	            "AddedDate": "2013-04-21 17:32:04",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        }
	    ],
	    "answer": [
	        {
	            "AnswerID": "2",
	            "QuestionID": "2",
	            "Description1": "Legally Married",
	            "Description2": "រៀបការតាមច្បាប់",
	            "Value": "1",
	            "GoToQuestionID": null,
	            "AddedDate": "2013-04-21 17:35:13",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "AnswerID": "3",
	            "QuestionID": "2",
	            "Description1": "Traditional Marriage",
	            "Description2": "រៀបការតាមប្រពៃណី",
	            "Value": "2",
	            "GoToQuestionID": null,
	            "AddedDate": "2013-04-21 17:35:53",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "AnswerID": "4",
	            "QuestionID": "2",
	            "Description1": "Living together but not in a legal or traditional marriage",
	            "Description2": "រស់នៅជាមួយគ្នាប៉ុន្តែមិនបានរៀបការតាមច្បាប់/រៀបការតាមប្រពៃណី",
	            "Value": "3",
	            "GoToQuestionID": null,
	            "AddedDate": "2013-04-21 17:37:27",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "AnswerID": "5",
	            "QuestionID": "2",
	            "Description1": "Single",
	            "Description2": "នៅលីវ (មិនធ្លាប់រៀបការ)",
	            "Value": "6",
	            "GoToQuestionID": null,
	            "AddedDate": "2013-04-21 17:41:01",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        }
	    ],
	    "language": [
	        {
	            "LanguageID": "1",
	            "LanguageCode": "EN",
	            "LanguageName": "English",
	            "AddedDate": "2013-04-21 16:54:16",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "LanguageID": "2",
	            "LanguageCode": "KH",
	            "LanguageName": "Khmer",
	            "AddedDate": "2013-04-21 16:54:35",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        }
	    ],
	    "province": [
	        {
	            "ProvinceID": "1",
	            "ProvinceCode": "PP",
	            "ProvinceName": "Phnom Penh",
	            "AddedDate": "2013-04-21 16:57:22",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "ProvinceID": "2",
	            "ProvinceCode": "BB",
	            "ProvinceName": "Battambang",
	            "AddedDate": "2013-04-21 16:57:51",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "ProvinceID": "3",
	            "ProvinceCode": "SR",
	            "ProvinceName": "Siem Reap",
	            "AddedDate": "2013-04-21 16:58:07",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "ProvinceID": "4",
	            "ProvinceCode": "KC",
	            "ProvinceName": "Kampong Cham",
	            "AddedDate": "2013-04-21 16:58:55",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "ProvinceID": "5",
	            "ProvinceCode": "PL",
	            "ProvinceName": "Paillin",
	            "AddedDate": "2013-04-21 17:02:40",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "ProvinceID": "6",
	            "ProvinceCode": "BM",
	            "ProvinceName": "Banteay Meanchey",
	            "AddedDate": "2013-04-21 17:02:51",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "ProvinceID": "7",
	            "ProvinceCode": "KS",
	            "ProvinceName": "Kampong Speu",
	            "AddedDate": "2013-04-21 17:03:05",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "ProvinceID": "8",
	            "ProvinceCode": "KD",
	            "ProvinceName": "Kandal",
	            "AddedDate": "2013-04-21 17:03:18",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "ProvinceID": "9",
	            "ProvinceCode": "SN",
	            "ProvinceName": "Sihanouk",
	            "AddedDate": "2013-04-21 17:03:26",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        },
	        {
	            "ProvinceID": "10",
	            "ProvinceCode": "KN",
	            "ProvinceName": "Kampong Chhnang",
	            "AddedDate": "2013-04-21 17:03:34",
	            "AddedBy": "langda",
	            "EditedDate": null,
	            "EditedBy": null,
	            "Status": "1"
	        }
	    ]
	};

function disablePage() {
	var pageSize = populatePageSize();
	var maskLayer = document.createElement('div');
	maskLayer.setAttribute("id", "maskLayer");
	
	// fixed auto zoom on screen
	mainContainer = document.createElement('div');
	mainContainer.setAttribute('id', 'maskLayerContainer');
	mainContainer.style.marginLeft = "0";
	mainContainer.style.marginRight = "0";
	mainContainer.appendChild(maskLayer);

	//document.body.appendChild(mainContainer);
	document.body.insertBefore(mainContainer, document.body.childNodes[0]);
}

/**
 * 
 * @returns {Array}
 */
function populatePageSize() {
	var windowWidth, windowHeight;
	if (self.innerHeight) {
		if (document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) {
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) {
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}

	return new Array(windowWidth, windowHeight)
}

/**
 * Get the position of the scroll
 * @returns {Array}
 */
function populatePageScroll() {
	var xScroll, yScroll;
	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
		xScroll = self.pageXOffset
	} else if (document.documentElement && document.documentElement.scrollTop) {
		yScroll = document.documentElement.scrollTop;
		xScroll = document.documentElement.scrollLeft
	} else if (document.body) {
		yScroll = document.body.scrollTop;
		xScroll = document.body.scrollLeft
	}
 
	return new Array(xScroll, yScroll);
}
function loadAjaxLoader() {
	
}