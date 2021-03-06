var DateTimeConvertor = new Class({
	initialize: function(options) {
	},
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
	getCurrentTime: function() {
		var today = new Date();
		var time = today.getHours();
		var minutes = today.getMinutes();
		var second = today.getSeconds();
		if(minutes == 0) {
			minutes = "00";
		}
		return time + ":" + minutes + ":" + second;
	},
	getCurrentTimeString: function() {
		var today = new Date();
		var time = today.getHours();
		var minutes = today.getMinutes();
		var second = today.getSeconds();
		if(minutes == 0) {
			minutes = "00";
		}
		return time + "" + minutes + "" + second;
	},
	getCurrentUSDate: function() {
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
		today = yyyy+'-'+mm+'-'+dd;
		return today;
	},
	getTimeStamp: function() {
		var today = new Date();
		return today.getTime();
	},
	getCurrentDateTime: function() {
		return this.getCurrentUSDate() + " " + this.getCurrentTime();
	},
	getDateFromMilli: function(milli){
		if(milli == '' || typeof(milli) == 'undefined'){
			return '';
		}
		var now = new Date(milli);
		var day = now.getDate();
		var month = now.getMonth();
		var year = now.getFullYear();
		
		month++;

		if(day < 10){
			day = "0"+day;
		}
		if(month < 10){
			month = "0"+month;
		}

		return month+'-'+day+'-'+year;
	},
	getCurrentDateAndTime: function() {
		return this.getCurrentUSDate()+"-"+this.getCurrentTimeString();
	}
	
});