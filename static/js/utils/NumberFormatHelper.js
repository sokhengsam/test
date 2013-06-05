var NumberFormatHelper = new Class({
	initialize: function(options) {
	},
	getStandardNumberFormat: function(number){
		//Seperates the components of the number
	    var numberArray= number.toString().split(".");
	    //Comma-fies the first part
	    numberArray[0] = numberArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    //Combines the two sections
	    return numberArray.join(".");
	},
	getNumberValue: function(inputValue){
		inputValue = inputValue.replace(",","");
		if(isNaN(inputValue)){
			return null;
		}
		//return parseInt(inputValue);
		return inputValue;
	}
});