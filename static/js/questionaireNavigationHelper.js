var qIndex = 0,
	totalQ,
	sectionId,
	progress,
	lastQid,
	questionaires,
	yes = true,
	lang=1,
	MOVE_NEXT_MODE = 1,
	MOVE_PREVIOUS_MODE = 2,
	startTimeQ,
	dateConvertor = new DateTimeConvertor(),
	numberUpsertAnswers = [];

function getQuestion(mode) {
	$(".read-more-sign").hide();
	questionaires = $("body").data("questionaire");
	totalQ = questionaires.questions.length;
	isFromPrivious = questionaires.fromPrevious;
	if(isFromPrivious) {
		qIndex = totalQ -1;
	}
	if(Number(qIndex)+1 <= totalQ) {
		startTimeQ = dateConvertor.getCurrentDateTime();
		$(".pagination-label").text(Number(qIndex)+1 +"/"+totalQ);
		var question =  questionaires.questions[qIndex];
		if(question.options.questionTypeId == 7){ // parent question with complete answer with GOTOQUESTION
			if(mode == MOVE_NEXT_MODE){
				qIndex++;
			}
			else if(mode == MOVE_PREVIOUS_MODE){
				qIndex--;
				if(qIndex < 0){
					sectionDisplayed--;
					$("#content").load("static/view/section.html");
					return;
				}
			}
			question =  questionaires.questions[qIndex];
		}
		answerQ = participantAnswerList[question.getQuestionId()];
		lastQid = question.getQuestionId();
		sectionId = question.getSectionId();
		var qOption = question.options;
		qOption.text = question.getDescription1();
		qOption.displaySectionName = questionaires.displaySectionName;
		
		if(lang == 2) {
			qOption.text = question.getDescription2();
		}
		if(qOption.questionTypeId == 6) {
			getGroupQuesion(qOption);
		}
		else if(qOption.questionTypeId != 7) {
			//console.log(question.getDependencyId());
			if(question.getDependencyId() != null){
				skipSimpleQuestionDependency(mode,questionaires.questions, question, qOption);
			}
			else{
				renderSimpleQuestionAnswerAndSpecialParentChildQuestion(question, qOption);
			}
		}
	}
	setTimeout(function(){
		var availableH = ($(window).height() - $(".footer").outerHeight() - $(".question-header").height() - 15);
		if($(".question-block").height() > availableH){
			$(".read-more-sign").show();
		}
		$("#scrollWrapper").css("height", availableH + "px");
		if(typeof scroller !== 'undefined' && scroller != null) {
			scroller.destroy();
			scroller = new iScroll("scrollWrapper", {checkDOMChanges: false});
		}
	}, 600);
	setTimeout(function(){
		$(".resize").bind("click", function(){
			var size = $(this).css("font-size");
			$(".question").css("font-size", size);
			$(".answer").css("font-size", size);
			$(".group-question-row").css("font-size", size);
			$(".pquestion").css("font-size", size);
			$(".active").removeClass("active");
			$(this).addClass("active");
			resizeScrollArea();
		});
	}, 400);
}

function resizeScrollArea() {
	var availableH = ($(window).height() - $(".footer").outerHeight() - $(".question-header").height() - 15);
	$("#scrollWrapper").css("height", availableH + "px");
	if(typeof scroller !== 'undefined' && scroller != null) {
		scroller.refresh();
	}
}

/**
 * Verify and skip question depended on previous question score
 * 
 * @param questions
 * @param question
 * @param qOption
 */
function skipSimpleQuestionDependency(mode,questions,question,qOption){
	var pSurvey = $("#participant").data("participant");
	isSkipDependencyQuestion(pSurvey.getParticipantSurveyId(), question.getDependencyId(), function(isSkip){
		if(isSkip){
			if(MOVE_NEXT_MODE == mode){
				qIndex++;
				if(qIndex == questions.length){
					$("#content").load("static/view/section.html");
				}
				getQuestion(MOVE_NEXT_MODE);
			}
			else if(MOVE_PREVIOUS_MODE == mode){
				qIndex--;
				if(qIndex < 0){
					sectionDisplayed--;
					$("#content").load("static/view/section.html");
				}
				getQuestion(MOVE_PREVIOUS_MODE);
			}
		}
		else{
			renderSimpleQuestionAnswerAndSpecialParentChildQuestion(question, qOption);
		}
	});
}

/**
 * Render questions' and answers' template of simple question type and  special parent child question
 *  
 * @param question
 * @param qOption
 */
function renderSimpleQuestionAnswerAndSpecialParentChildQuestion(question,qOption){
	if(qOption.parentId != null){
		questionDao.findQuestionByPrimaryKey(qOption.parentId,function(parentQuestion){
			qOption.parentQuestion = parentQuestion.getQuestionCode() + ". " + (lang == 2? parentQuestion.getDescription2(): parentQuestion.getDescription1());
			populateSimpleQuestionAnswer(question,qOption);
		});
	}
	else{
		populateSimpleQuestionAnswer(question,qOption);
	}
}

/**
 * Populate simple questions and answers
 * 
 * @param question
 * @param qOption
 */
function populateSimpleQuestionAnswer(question,qOption){
	var questionAdapter = new QuestionAdapter(qOption);
	questionAdapter.mergeTemplate();
	var pSurvey = $("#participant").data("participant");
	var participantAnswer;
	participantAnswerDao.getBySQuestion(question.getQuestionId(), pSurvey.getParticipantSurveyId(), function(items) {
		if(items != undefined) {
			if(qOption.questionTypeId == 5) {
				participantAnswer = items;
				$("#"+question.getQuestionId()).data("panswerid", items);
			}
			else {
				participantAnswer = items[0];
			}
		}
		var answers = answerDao.getByQuestion(question.getQuestionId(), function(answers){
			var answerAdapter = new AnswerAdapter({questionType: question.getQuestionTypeId()}, answers, $("body").data("language"), participantAnswer);
			answerAdapter.mergeTemplate(function(){
				setTimeout(function(){
					enablepage();
				}, 400);
			});
		});
	});
}

/**
 * 
 */
function findSectionKeyByQuestionKey(questionId,successCallback){
	var returnValue;
	questionDao.findSectionKeyByQuestionKey(questionId,function(sectionId){
		successCallback(sectionId);
	});
}

function getGroupQuesion(qOption) {
	var groupQuestionAdapter = new GroupQuestionAdapter();
	var groupQuestion = new Object();
	groupQuestion.parentQuestionCode = qOption.questionCode;
	groupQuestion.label = qOption.text;
	groupQuestion.displaySectionName = qOption.displaySectionName;
	groupQuestion.skipToId = qOption.skipToId;
	groupQuestionAdapter.mergeGroupQuestionParent(groupQuestion); // merge parent question info 
	var pSurvey = $("#participant").data("participant");
	questionDao.getChild(qOption.questionId, function(questions) {
		$.each(questions,function(index,question){
			if(question.getDependencyId() != null){
				 isSkipDependencyQuestion(pSurvey.getParticipantSurveyId(), question.getDependencyId(),function(isSkip){
					 if(!isSkip){
						 renderGroupQuestion(pSurvey,question,qOption,groupQuestionAdapter);
					 }
				 },index);
			}
			else{
				renderGroupQuestion(pSurvey,question,qOption,groupQuestionAdapter);
			}
		});
	});
}

function renderGroupQuestion(pSurvey,question,qOption,groupQuestionAdapter){
	question.text = question.getDescription1();
	if(lang == 2) {
		question.text = question.getDescription2();
	}
	participantAnswerDao.getBySQuestion(question.getQuestionId(), pSurvey.getParticipantSurveyId(), function(items) {
		if(items != undefined) {
			if(qOption.questionTypeId == 5) {
				participantAnswer = items;
			}
			else {
				participantAnswer = items[0];
			}
		}
		answerDao.getByQuestion(question.getQuestionId(), function(answers){
			groupQuestionAdapter.mergeChildQuestionTemplate(question);
			groupQuestionAdapter.mergeChildQuestionAnswerTemplate(question.getQuestionTypeId(),answers,lang, participantAnswer);
		});
	});
}

/**
 * Check skip condition of dependency question in group
 * 
 * @param participantSurveyId
 * @param dependencyId
 * @param onSuccess
 */
function isSkipDependencyQuestion(participantSurveyId,dependencyId,onSuccess){
	getAnswerValue(participantSurveyId, dependencyId, function(answerValue){
		if(Number(answerValue) == 0){
			onSuccess(true);
		}
		else {
			onSuccess(false);
		}		
	});
}

/**
 * Get answer score by participant survey id and question id
 * 
 * @param participantSurveyId
 * @param dependencyId
 * @param onSuccess
 */
function getAnswerValue(participantSurveyId,dependencyId,onSuccess){
	participantAnswerDao.findParticipantAnswerByParticipantSurveyQuestionId(participantSurveyId,dependencyId,function(participant){
		if(participant == undefined){
			onSuccess(0); // no score
			return false;
		}
		answerDao.findByPrimaryKey(participant.getAnswerId(),function(answer){
			onSuccess(answer.getValue());
		});
		
	});
}

/**
 * 
 * @param onComplete
 */
function autoCheckUpsertParticipantAnswer(onComplete){
	numberUpsertAnswers.shift();
	console.log("numberUpsertAnswers : " + numberUpsertAnswers.length);
	if(numberUpsertAnswers.length == 0){
		setTimeout(function(){enablepage();}, 400);
		onComplete();
	}
}

/**
 * 
 */
function calculateUpsertParticipantAnswer(){
	//check if the answer type is in [2, 3, 4, 5] or not
	
	$("#content input[type='text'],#content input[type='number']").each(function(index){
		//check if its parent is check box or radio if its parant is radio or checkbox skip the count
		var radio = $(this).prev().prev();
		if($(this).val() != "" && radio != undefined && !(radio.is(":radio") || radio.is("checkbox"))){
			numberUpsertAnswers.push(index);
		}
	});
	$("#content input[type='radio']:checked,#content input[type='checkbox']:checked").each(function(index){
		numberUpsertAnswers.push(index);
	});
	console.log("total number of saved answer : " + numberUpsertAnswers.length);
}

function getSelectedSingleAnswer(parentSelector){
	return $(".answer-block input[type='radio']:checked");
}

/**
 * Score calculation algorith:
 * We calculate only the E1b to  E7b (Alcoholic use), E1e - E7e(ATS use)
 * Base on these 2 score, where will be 2 differeces message alert at the end of questionaire.
 * 
 * Base on the requirement only question type = 4 will be calculated
 * 
 * @param child
 * @param type
 */
function parseValue(child, type, qid) {
	//if(Number(type) == 4) {
		//calculate the alcoholic value
		var pLog = $("#participantLog").data("participantLog");
		if(alcoholicPartId.indexOf(Number(qid)) != -1) {
			console.log("Calculate the alcoholic score");
			alcoholicScore += Number(child.find("input[type='radio']:checked").attr("svalue"));
			pLog.setAlcoholScore(alcoholicScore);
			console.log("Alcoholic Score: " + alcoholicScore);
		}
		else if(atsPartId.indexOf(Number(qid)) != -1) {
			console.log("Calculate the ATS score");
			atsScore += Number(child.find("input[type='radio']:checked").attr("svalue"));
			pLog.setATSScore(atsScore);
			console.log("ATS score: " + atsScore);
		}
		participantLogDao.update(pLog);
	//}
}

function parseInputValue(child, participantA, type) {
	if(Number(type) == 1 || Number(type) == 2 || Number(type) == 3 || Number(type) == 6) {
		participantA.setDescription(child.find("input").val());
	}
	else if(Number(type) == 4 || Number(type) == 5) {
		switch(Number(type)) {
			case 4: //single question type
				participantA.setAnswerId(child.find("input[type='radio']:checked").attr("id").substring(1));
				break;
			case 5: //multiple question type
				//how to store the answer id in the participant answer for this???
				var checkList = [];
				child.find("input[type='checkbox']:checked").each(function(i, ch){
					checkList.push($(ch).attr("id").substring(1));
				});
				participantA.options.checkList = checkList;
				break;
			default:
				console.log("unknow answer type");
		}
	}
}
//TODO: there are duplicate code in this function. it's should be split
function parseParticipantAnswer(onCompleteUpsert) {
	calculateUpsertParticipantAnswer();
	var pSurvey = $("#participant").data("participant");
	var childQuestions = $(".child-question");
	//parent child question
	if(childQuestions.length > 0) {
		var pAnswers = [];
		childQuestions.each(function(i, child){
			var q = $(child).find(".group-question-row");
			var type = q.attr("qtype");
			if(Number(type) == 1 || Number(type) == 2 || Number(type) == 3 || Number(type) == 6) {
				//check if it's an update or new insert
				var input = $(child).find("input");
				var participantA = new ParticipantAnswer();
				panswer = input.attr("panswer");
				if(panswer != '') {
					participantA.setParticipantSurveyId(pSurvey.getParticipantSurveyId());
					participantA.setAnswerId("");
					participantA.setQuestionId(q.attr("id"));
					participantA.setDescription(input.val());
					participantA.setStartDateTime(startTimeQ);
					participantA.setEndDateTime(dateConvertor.getCurrentDateTime());
					participantA.setStatus("");
					participantA.setParticipantAnswerId(panswer);
					participantAnswerDao.update(participantA,function(){
						autoCheckUpsertParticipantAnswer(onCompleteUpsert);
					},i);
				}
				else {
					participantA.setParticipantSurveyId(pSurvey.getParticipantSurveyId());
					participantA.setAnswerId("");
					participantA.setQuestionId(q.attr("id"));
					participantA.setDescription(input.val());
					participantA.setStartDateTime(startTimeQ);
					participantA.setEndDateTime(dateConvertor.getCurrentDateTime());
					participantA.setStatus("");
					participantAnswerDao.persist(participantA,function(){
						autoCheckUpsertParticipantAnswer(onCompleteUpsert);
					},i);
				}
				
			}
			else if(Number(type) == 4 || Number(type) == 5) {
				var participantA = new ParticipantAnswer();
				switch(Number(type)) {
					case 4: //single question type
						var panswerid = $(child).find(".answer input[type='radio']:checked").data("panswerid");
						var answerType = $(child).find(".answer input[type='radio']:checked").attr("answertypeid");
						participantA.setParticipantSurveyId(pSurvey.getParticipantSurveyId());
						participantA.setAnswerId($(child).find("input[type='radio']:checked").attr("id").substring(1));
						participantA.setQuestionId(q.attr("id"));
						var description = "";
						if([2, 3, 4, 5].indexOf(Number(answerType)) != -1) {
							description = $(child).find(".answer input[type='radio']:checked").siblings("input").val();
						}
						participantA.setDescription(description);
						participantA.setStartDateTime(startTimeQ);
						participantA.setEndDateTime(dateConvertor.getCurrentDateTime());
						participantA.setStatus("");
						if(panswerid == undefined) {
							participantAnswerDao.persist(participantA,function(){
								autoCheckUpsertParticipantAnswer(onCompleteUpsert);
							},i);
						}
						else {
							participantA.setParticipantAnswerId(panswerid);
							participantAnswerDao.update(participantA,function(){
								autoCheckUpsertParticipantAnswer(onCompleteUpsert);
							},i);
						}
						break;
					case 5: //multiple question type
						//how to store the answer id in the participant answer for this???
						$(child).find(".answer input[type='checkbox']:checked").each(function(i, ch){
							participantA.setParticipantSurveyId(pSurvey.getParticipantSurveyId());
							participantA.setAnswerId($(ch).attr("id").substring(1));
							participantA.setQuestionId(q.attr("id"));
							participantA.setDescription("");
							participantA.setStartDateTime(startTimeQ);
							participantA.setEndDateTime(dateConvertor.getCurrentDateTime());
							participantA.setStatus("");
							participantAnswerDao.persist(participantA,function(){
								autoCheckUpsertParticipantAnswer(onCompleteUpsert);
							},i);
						});
						break;
					default:
						console.log("unknow answer type");
				}
			}
		});
	}
	else {
		var type = $(".question").attr("qtype");
		var participantA = new ParticipantAnswer();
		if(Number(type) == 1 || Number(type) == 2 || Number(type) == 3 || Number(type) == 6) {
			//check if it's an update or new insert
			var input = $(".answer").find("input");
			panswer = input.attr("panswer");
			participantA.setParticipantSurveyId(pSurvey.getParticipantSurveyId());
			participantA.setAnswerId("");
			participantA.setQuestionId($(".question").attr("id"));
			participantA.setDescription($(".answer").find("input").val());
			participantA.setStartDateTime(startTimeQ);
			participantA.setEndDateTime(dateConvertor.getCurrentDateTime());
			participantA.setStatus("");
			if(panswer != '') {
				participantA.setParticipantAnswerId(panswer);
				participantAnswerDao.update(participantA,function(){
					autoCheckUpsertParticipantAnswer(onCompleteUpsert);
				});
			}
			else {
				participantAnswerDao.persist(participantA,function(){
					autoCheckUpsertParticipantAnswer(onCompleteUpsert);
				});
			}
			
		}
		else if(Number(type) == 4 || Number(type) == 5) {
			switch(Number(type)) {
				case 4: //single question type
					var panswerid = $(".answer").find("input[type='radio']:checked").data("panswerid");
					var answerType = $(".answer").find("input[type='radio']:checked").attr("answertypeid");
					participantA.setParticipantSurveyId(pSurvey.getParticipantSurveyId());
					//TODO: some answer got the substring error 
					participantA.setAnswerId($(".answer").find("input[type='radio']:checked").attr("id").substring(1));
					participantA.setQuestionId($(".question").attr("id"));
					var description = "";
					if([2, 3, 4, 5].indexOf(Number(answerType)) != -1) {
						description = $(".answer").find("input[type='radio']:checked").siblings("input").val();
					}
					participantA.setDescription(description);
					participantA.setStartDateTime(startTimeQ);
					participantA.setEndDateTime(dateConvertor.getCurrentDateTime());
					participantA.setStatus("");
					if(panswerid == undefined) {
						participantAnswerDao.persist(participantA,function(){
							autoCheckUpsertParticipantAnswer(onCompleteUpsert);
						});
					}
					else {
						participantA.setParticipantAnswerId(panswerid);
						participantAnswerDao.update(participantA,function(){
							autoCheckUpsertParticipantAnswer(onCompleteUpsert);
						});
					}
					break;
				case 5: //multiple question type
					//how to store the answer id in the participant answer for this???
					var panswerid = $(".question").data("panswerid");//get the array of panswer id
					console.log(panswerid);
					//remove the existing answer and add new one. this is the best solution for the multiple answer??
					if(panswerid.length > 0) {
						participantAnswerDao.removeByIds(panswerid, function(){
							$(".answer-block").find(".answer input[type='checkbox']:checked").each(function(i, ch){
								participantA = new ParticipantAnswer()
								participantA.setParticipantSurveyId(pSurvey.getParticipantSurveyId());
								participantA.setAnswerId($(ch).attr("id").substring(1));
								participantA.setQuestionId($(".question").attr("id"));
								participantA.setDescription("");
								participantA.setStartDateTime(startTimeQ);
								participantA.setEndDateTime(dateConvertor.getCurrentDateTime());
								participantA.setStatus("");
								participantAnswerDao.persist(participantA,function(){
									autoCheckUpsertParticipantAnswer(onCompleteUpsert);
								});
							});
						});
					}
					else {
						$(".answer-block").find(".answer input[type='checkbox']:checked").each(function(i, ch){
							participantA = new ParticipantAnswer()
							participantA.setParticipantSurveyId(pSurvey.getParticipantSurveyId());
							participantA.setAnswerId($(ch).attr("id").substring(1));
							participantA.setQuestionId($(".question").attr("id"));
							participantA.setDescription("");
							participantA.setStartDateTime(startTimeQ);
							participantA.setEndDateTime(dateConvertor.getCurrentDateTime());
							participantA.setStatus("");
							participantAnswerDao.persist(participantA,function(){
								autoCheckUpsertParticipantAnswer(onCompleteUpsert);
							});
						});
					}
					break;
				default:
					console.log("unknow answer type");
			}
		}
	}
}

/**
 * Score calculation. only the specific id of question will be calculated
 */
function parseAnswer() {
	var childQuestions = $(".child-question");
	//parent child question
	if(childQuestions.length > 0) {
		childQuestions.each(function(i, child){
			var q = $(child).find(".group-question-row");
			var type = q.attr("qtype");
			var qId = q.attr("id");
			if(alcoholicPartId.indexOf(Number(qId)) != -1 || atsPartId.indexOf(Number(qId)) != -1) {
				parseValue($(child), type, q.attr("id"));
			}
		});
	}
	
	//alert(answerVal);
}

$(function(){
	
	//init language
	
	lang = $("body").data("language");
	
	// continue questionnaire in incomplete questionnaire
	var startQuestionData = $("body").data("startQuestionData");
	if(null != startQuestionData){
		qIndex = startQuestionData.lastQuestionIndex;
		sectionDisplayed = startQuestionData.lastSectionIndex;
		$("body").removeData("startQuestionData");
	}
	console.log("getting question load");
	getQuestion(MOVE_NEXT_MODE);
	if(sectionDisplayed == 0 && qIndex == 0) {
		$("#previousQuestion").hide();
	}
	$("#homePage").click(function(){
		$("#content").load("static/view/home.html");
	});
	$("#nextQuestion").click(function(){
		if(!answerValidated()){
			return false;
		}
		var totalScore = calculateTotalAnswerValues();
		var goToQuestionId = getSelectedSingleAnswer().data("goToQuestionId");
		var skipToQuestionAttr = $(".question-block > .question").attr("skipquestionidwidthscore");
		var skipToQuestionId = skipToQuestionAttr != undefined && skipToQuestionAttr != "" && skipToQuestionAttr != null ? skipToQuestionAttr : "";
		if(totalScore == 0 && skipToQuestionId != ""){
			gotoQuestion(skipToQuestionId);
		}
		else if(null != goToQuestionId){
			gotoQuestion(goToQuestionId);
		}
		else{
			//validate answer before going next
			var selectedSectionId = $("body").data("questionaire").sectionId;
			//if(valid) {
				/*if(qIndex == totalQ) {
					return;
				}*/
				qIndex = qIndex + 1;
				if(qIndex < totalQ) {
					if(selectedSectionId == 9) {
						parseAnswer();
					}
					showLoadingDialog();
					parseParticipantAnswer(function(){
						clearQuestionBlock();
						//save the last question 
						saveLastQuestion();
						getQuestion(MOVE_NEXT_MODE);
					});	
					//we have speciall case for the surveyId =3
					parseAnswerSpecialCase();
					$("#previousQuestion").show();
					//clearQuestionBlock();
					//getQuestion(MOVE_NEXT_MODE);
				}
				else {
					//save the last question of the section and clear the question block
					//check the survey displayed. 
					//if all the survey already displayed meant they are at the end so, show dialog. Otherwise, load next section
					//sectionDisplayed started from 0
					if(sectionDisplayed < $("body").data("sections").length -1) {
						parseParticipantAnswer(function(){
							clearQuestionBlock();
						});
						$("#content").load("static/view/section.html");
					}
					else {
						//total score and show dialog
						showDailog();
					}
				}	
			//}
		}
	});
	
	$("#previousQuestion").click(function(){
		showLoadingDialog();
		if(skipQuestionHistory[eval(sectionId+lastQid)] != null){
			restoreSkipQuestion($(this));
		}
		else{
			if(sectionDisplayed > 0 && qIndex == 0) {
				sectionDisplayed--;
				$("#content").load("static/view/section.html", function(){
					setTimeout(function(){
						enablepage();
					}, 400);
				});
			}
			else {
				clearQuestionBlock();
				questionaires.fromPrevious = false;
				qIndex--;
				getQuestion(MOVE_PREVIOUS_MODE);
				if(qIndex == 0 && sectionDisplayed == 0) {
					$(this).hide();
				}
			}
		}
		
	});
	
	setTimeout(function() {
		var availableH = ($(window).height() - $(".footer").outerHeight() - $(".question-header").height() - 15);
		$("#scrollWrapper").css("height", availableH + "px");
		scroller = new iScroll("scrollWrapper", {checkDOMChanges: false});
	}, 600);
	
});


function calculateTotalAnswerValues(){
	/*if(skipQuestionIdByScore == null){
		return false;
	}*/
	var totalScore = 0;
	/*$("#content input [type='text'],#content input [type='number']").each(function(index){
		if($(this).val() != ""){
			numberUpsertAnswers.push(index);
		}
	});*/
	$("#content input[type='radio']:checked,#content input[type='checkbox']:checked").each(function(index,input){
		var score = $(input).attr("svalue");
		totalScore = Number(totalScore) + Number(score);
	});
	
	// specify for parent child question
/*	questionDao.getChild(skipQuestionIdByScore, function(questions) {
		console.log(questions);
		$.each(questions,function(index,question){
			getAnswerValue(participantSurveyId, question.getQuestionId(), function(score){
				totalScore = totalScore + score;
				console.log("total score : " + totalScore);
			},totalScore);
		});
	},totalScore);*/
	console.log("total score : " + totalScore);
	
	return totalScore;
}

/**
 *  Restore skip question 
 * @param previousNavigator
 */
function restoreSkipQuestion(previousNavigator){
	var questionData = skipQuestionHistory[eval(sectionId+lastQid)].split(",");
	delete skipQuestionHistory[eval(sectionId+lastQid)];
	questionDao.getBySection(questionData[0], function(questions) {
		$("body").data("questionaire", {"questions": questions, fromPrevious: false, "sectionId": questionData[0],"displaySectionName": questionData[4]});
		sectionDisplayed = Number(questionData[2]);
		qIndex = Number(questionData[3]);
		sectionId = Number(questionData[0]);
		clearQuestionBlock();
		questionaires.fromPrevious = false;
		console.log("restoring skip question");
		getQuestion(MOVE_PREVIOUS_MODE);
		if(qIndex == 0 && sectionDisplayed == 0) {
			previousNavigator.hide();
		}
	});
}

/**
 * Go to any question with specific question id
 * 
 * @param goToQuestionId
 */
function gotoQuestion(goToQuestionId){
	var currentQuestionInfo = sectionId + "," + lastQid + "," +  sectionDisplayed + "," + qIndex;
	// maintain question index and section
	findSectionKeyByQuestionKey(goToQuestionId,function(secId){
		//iterator section to get section index
		var sections = $("body").data("sections");
		for(i=0;i<sections.length;i++){
			if(sections[i].getSectionId() == secId){
				sectionDisplayed = i;
				break;
			}
		}
		questionDao.getBySection(secId, function(questions) {
			//iterator question to get section index 
			for(i=0;i<questions.length;i++){
				if(questions[i].getQuestionId() == goToQuestionId){
					qIndex = i;
					break;
				}
			}
			$("body").data("questionaire", {"questions": questions, fromPrevious: false, "sectionId": secId,"displaySectionName": (lang == 2 ? sections[sectionDisplayed].getDescription2() : sections[sectionDisplayed].getDescription1())});
			if(secId == 9) {
				parseAnswer();
			}
			parseParticipantAnswer(function(){
				clearQuestionBlock();
				getQuestion(MOVE_NEXT_MODE);
			});	
			//we have speciall case for the surveyId =3
			parseAnswerSpecialCase();
			$("#previousQuestion").show();
			//clearQuestionBlock();
			//getQuestion(MOVE_NEXT_MODE);
			skipQuestionHistory[eval(secId+questions[qIndex].getQuestionId())] = currentQuestionInfo + "," + (lang == 2 ? sections[sectionDisplayed].getDescription2() : sections[sectionDisplayed].getDescription1()); //keep to back state
		});
	});
}

function showScoreMessage(message) {
	buildPopUpPage(394,190);
	var actionBlock = $("<div class='dialog-action'></div>");
	actionBlock.append($('<button></button>').text("Ok").addClass("dialog-button").click(function(){
		enablepage();
		deleteData();
		$("#content").load("static/view/home.html");
	}));
	$("#popup").append($("<div class='score-dialog-message'></div>").text(message));
	$("#popup").append(actionBlock);
}
/**
 * 
 */
function parseAnswerSpecialCase() {
	var selectedSurvey = $("#selectedSurvey").data("selectedSurvey");
	if(selectedSurvey.surveyId == 3) {
		var qType = $(".question-block > .question").attr("qtype");
		//parent child question doesn't stored question type in the parent div
		if(qType == undefined) {
			//loop through the children
			var t = true;
			var child = $(".child-question");
			for(var i = 0; i < child.length ; i++) {
				var qType = $(child[i]).find(".group-question-row").attr("qtype");
				var tq;
				if(Number(qType) == 4) {
					tq = $(child[i]).find(".answer > input[type='radio']:checked").val();
					if(tq == "No") {
						yes = false;
						return;
					}
				}
			}
		}
		else {
			//can't be null
			if(Number(qType) == 4 ) {
				t = $(".answer-block input[type='radio']:checked").val();
				if(t == "No") {
					yes = false;
					return;
				}
			}
		}yes
	}
}
function clearQuestionBlock(){
	$(".question-header").remove();
	$(".question-code").remove();
	$(".question-block").remove();
	$("#scrollWrapper").remove();
}

/**
 * Save the last question and section index of the participant 
 * to avoid the losing data when user click on back button of the browswer
 */
function saveLastQuestion() {
	var pLog = $("#participantLog").data("participantLog");
	var language = $("body").data("language");
	pLog.setLastQuestion(lastQid);
	pLog.setLastScore(0);
	pLog.setATSScore(atsScore);
	pLog.setAlcoholScore(alcoholicScore);
	pLog.setLastSectionIndex(sectionDisplayed);
	pLog.setLastQuestionIndex(qIndex);
	pLog.setLastSectionId(sectionId);
	pLog.setLanguage(language);
	participantLogDao.update(pLog);
}
/**
 * Suspend button clicked function call.
 * 
 */
function suspend() {
	saveLastQuestion();
	deleteData();
	$("#content").load("static/view/home.html");
}

function validateNumberRange(numberRange,inputNumber){
	var returnObj = {state: false};
	if(numberRange == null || typeof(numberRange) == 'undefined' || typeof(inputNumber) == 'undefined' || inputNumber.length <0){
		returnObj.state = false;
		returnObj.message = "Invalide number range";
		return returnObj;
	}
	var range = numberRange.split("-");
	if(ignoreNumberRangeValidation(range) || (Number(range[0])<= Number(inputNumber) && Number(inputNumber) <= Number(range[1]))){
		returnObj.state = true;
	}
	returnObj.message = "The input value must be in range " + range[0] + " to " + range[1]; 
	return returnObj;
}

function ignoreNumberRangeValidation(range){
	return range[0] == "null" || range[1] == "null";
}

function validateEmpty(inputValue){
	var returnObj = {};
	if(inputValue != ""){
		returnObj.state = true;
	}
	else{
		returnObj.state = false;
		returnObj.message = "You must answer this question.";
	}
	return returnObj;
}

function validateTextLength(inputValue,maxLength){
	var returnObj = {};
	if(inputValue.length <= maxLength){
		returnObj.state = true;
	}
	else{
		returnObj.state = false;
		returnObj.message = "Your answer must be less than or equal " + maxLength + " characters";
	}
	return returnObj;
}

function answerValidated() {
	var qType = $(".question-block > .question").attr("qtype");
	//parent child question doesn't stored question type in the parent div
	if(qType == undefined) {
		//loop through the children
		var t = true;
		var child = $(".child-question");
		for(var i = 0; i < child.length ; i++) {
			var gQuestionRow = $(child[i]).find(".group-question-row"); 
			var allownull = gQuestionRow.attr("allownull");
			var qType = gQuestionRow.attr("qtype");
			var numberRange = gQuestionRow.attr("numberRange");
			var tq;
			if(allownull == 0) {
				if(Number(qType) == 1 || Number(qType) == 2 || Number(qType) == 3 || Number(qType) == 6) {
					var emptyValidation = validateEmpty($(child[i]).find(".answer > input").val());
					var numberRangeValidation = Number(qType) == 2? validateNumberRange(numberRange,$(child[i]).find(".answer > input").val()) : null;
					var textLengthValidation = Number(qType) == 1? validateTextLength($(child[i]).find(".answer > input").val(),80) : null;
					if(!emptyValidation.state){
						alert(emptyValidation.message + " " + $(child[i]).find(".group-question-row").attr('qcode') + ".");
					}
					else if(null != numberRangeValidation && !numberRangeValidation.state) {
						alert(numberRangeValidation.message + " in " + $(child[i]).find(".group-question-row").attr('qcode') + ".");
					}
					else if(null != textLengthValidation && !textLengthValidation.state) {
						alert(textLengthValidation.message + " in " + $(child[i]).find(".group-question-row").attr('qcode') + ".");
					}
					if(!emptyValidation.state || (null != numberRangeValidation && !numberRangeValidation.state) || (null != textLengthValidation && !textLengthValidation.state)){
						return false;
					}
				}
				else if(Number(qType) == 4 || Number(qType) == 5) {
					var t;
					switch(Number(qType)) {
						case 4: //single question type
							var radio = $(child[i]).find(".answer > input[type='radio']:checked");
							var answerTypeId = radio.attr("answerTypeId")
							if(answerTypeId == 3 || answerTypeId == 5){ // answer type id 3 and 5 is other require
								var emptyValidation = validateEmpty(radio.siblings("input").val());
								if(!emptyValidation.state){
									alert(emptyValidation.message);
									return false;
								}
							}
							else if(answerTypeId == 2 || answerTypeId == 3){
								var textLengthValidation = validateTextLength(radio.siblings("input").val(), 80);
								if(!textLengthValidation.state){
									alert(textLengthValidation.message);
									return false;
								}
							}
							tq = radio.length > 0;
							break;
						case 5: //multiple question type
							//how to store the answer id in the participant answer for this???
							tq = $(child[i]).find(".answer > input[type='checkbox']:checked").length > 0;
							break;
						default:
							console.log("unknow answer type");
					}
					if(!tq) {
						alert("At least one answer must be provided for question " +$(child[i]).find(".group-question-row").attr('qcode') + ".");
						return tq;
					}
				}
			}
		}
	}
	else {
		//can't be null
		if($(".question-block > .question").attr("allownull") == 0) {
			var textVal;
			if(Number(qType) == 1 || Number(qType) == 2 || Number(qType) == 3 || Number(qType) == 6) {
				var numberRange = $(".question-block > .question").attr("numberRange");
				var emptyValidation = validateEmpty($(".question-block > .answer-block").find("input").val());
				var numberRangeValidation = Number(qType) == 2? validateNumberRange(numberRange,$(".question-block > .answer-block").find("input").val()) : null;
				if(!emptyValidation.state){
					alert(emptyValidation.message);
				}
				else if(null != numberRangeValidation && !numberRangeValidation.state) {
					alert(numberRangeValidation.message);
				}
				return emptyValidation.state && numberRangeValidation.state;
			}
			else if(Number(qType) == 4 || Number(qType) == 5) {
				var t;
				switch(Number(qType)) {
					case 4: //single question type
						var radio = $(".answer-block input[type='radio']:checked");
						var answerTypeId = radio.attr("answerTypeId")
						if(answerTypeId == 3 || answerTypeId == 5){ // answer type id 3 and 5 is other require
							var emptyValidation = validateEmpty(radio.siblings("input").val());
							if(!emptyValidation.state){
								alert(emptyValidation.message);
								return false;
							}
						}
						else if(answerTypeId == 2 || answerTypeId == 3){
							var textLengthValidation = validateTextLength(radio.siblings("input").val(), 80);
							if(!textLengthValidation.state){
								alert(textLengthValidation.message);
								return false;
							}
						}
						t = radio.length > 0;
						break;
					case 5: //multiple question type
						//how to store the answer id in the participant answer for this???
						t = $(".answer-block input[type='checkbox']:checked").length > 0;
						break;
					default:
						console.log("unknow answer type");
				}
				if(!t) {
					alert("At least one answer must be provided.");
				}
				return t;
			}
		}
	}
	return true;
}
function deleteData() {
	delete qIndex;
	delete totalQ;
	delete sectionId;
	delete progress;
	delete participantAnswerList;
	delete lastQid;
	sectionDisplayed = Number(-1);
	delete $("body").data("sections");
	delete $("body").data("language");
	delete $("body").data("questionaire");
	delete $("#selectedSurvey").data("selectedSurvey");
	delete $("#participant").data("participant");
	delete $("#participantLog").data("participantLog");
}
function showDailog(){
	buildPopUpPage(260,110);
	var actionBlock = $("<div class='dialog-action'></div>");
	actionBlock.append($('<button></button>').text("Yes").addClass("dialog-button").click(function(){
		var selectedSurvey = $("#selectedSurvey").data("selectedSurvey");
		enablepage();
		var participantSurvey = $("#participant").data("participant");
		var dateTimeConvertor = new DateTimeConvertor();
		participantSurvey.setEndDateTime(dateTimeConvertor.getCurrentDateTime());
		participantSurvey.setStatus(1);
		participantSurveyDao.update(participantSurvey);
		var participantSurveyLog = $("#participantLog").data("participantLog");
		participantSurveyLog.setEndDateTime(dateTimeConvertor.getCurrentDateTime());
		participantLogDao.update(participantSurveyLog);
		if(selectedSurvey.surveyId != 10) {
			var alertStr = "";
			if(atsScore == '' && alcoholicScore == '' || (atsScore == 0 && alcoholicScore == 0)) {
				atsScore = participantSurveyLog.getATSScore();
				alcoholicScore = participantSurveyLog.getAlcoholScore();
			}
			if(atsScore >=1 && atsScore < 4) {
				alertStr = "ពិន្ទុជំនួយ (ASSIST SCORE) សម្រាប់ ATS >= ១ សូមផ្តល់ការប្រឹក្សាស្តីពីការប្រើប្រាស់ ATS)\n";
			}
			else if(atsScore >=4) {
				alertStr = "ពិន្ទុជំនួយ (ASSIST SCORE) សម្រាប់ ATS >= 4 អ្នកចូលរួមអាចនឹងត្រូវលក្ខខណ្ឌចូលរួមកម្មវិធី CCT\n";
			}
			if(alcoholicScore >=6) {
				alertStr += "ពិន្ទុជំនួយ (ASSIST SCORE) សម្រាប់ គ្រឿងស្រវឹង >= 6 សូមផ្តល់ការប្រឹក្សាស្តីពីការប្រើប្រាស់គ្រឿងស្រវឹង";
			}
			if(alertStr != "") {
				showScoreMessage(alertStr);
			}
			else {
				deleteData();
				$("#content").load("static/view/home.html");
			}
		}
		else {
			if(!yes) {
				alert("You are fail in this section.");
			}
			else {
				alert("You are pass in this section");
			}
			deleteData();
			$("#content").load("static/view/home.html");
		}
	}));
	actionBlock.append($('<button></button>').text("No").addClass("dialog-button").click(enablepage));
	$("#popup").append($("<div class='dialog-title'></div>").text("Confirm"));
	$("#popup").append($("<div class='dialog-message'></div>").text("Are you satify with your answer?"));
	$("#popup").append(actionBlock);
	$("#popup").css("background-color", "#385676");
}

window.addEventListener("resize", function() {
	if(typeof scroller !== 'undefined') {
		scroller.stop();
		var availableH = ($(window).height() - $(".footer").outerHeight() - $(".question-header").height() - 15);
		$("#scrollWrapper").css("height", availableH + "px");
		scroller.refresh();
	}
});