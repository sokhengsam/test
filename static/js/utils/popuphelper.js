/**
 * Get the page size
 * @returns the arrays of width and height
 */
function getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight) {
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else {
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	console.log(xScroll);
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
		windowHeight = document.documentElement.clientHeight
	} else if (document.body) {
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight
	}
	if (yScroll < windowHeight) {
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll
	}
	console.log(window.innerWidth);
	if (xScroll < windowWidth) {
		pageWidth = xScroll;
	} else {
		pageWidth = windowWidth;
	}
	
	console.log(pageWidth);
	var pageSizes = new Array();
	pageSizes[0] = window.innerWidth;
	pageSizes[1] = pageHeight;
	return pageSizes;
}

/**
 * Build the overlay
 */
function buildOverlay() {
	var pageSizes = getPageSize();
	$("<div></div>").attr({id: "maskLayer"}).css({height: pageSizes[1] + "px",width: pageSizes[0] + "px"}).prependTo('body');
	return false;
}

function buildPopUpPage(width, height) {
	if(width == undefined) {
		width = 700;
	}
	if(height == undefined) {
		height = 500;
	}
	buildOverlay();
	var xScroll, yScroll;
	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
		xScroll = self.pageXOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) {
		yScroll = document.documentElement.scrollTop;
		xScroll = document.documentElement.scrollLeft;
	} else if (document.body) {
		yScroll = document.body.scrollTop;
		xScroll = document.body.scrollLeft;
	}
	
	var ptop = yScroll + Number(window.innerHeight/2) - Number(height/2);
	var pleft = xScroll + Number(window.innerWidth/2) - Number(width/2);
	
	var popupContainer = $('<div></div>').attr({id: "popup"}).css({"top": ptop + "px","left": pleft + "px","width":width+"px","height":height+"px"});
	popupContainer.appendTo('body');
}

function enablepage() {
	$("#popup").remove();
	$("#maskLayer").remove();
} 