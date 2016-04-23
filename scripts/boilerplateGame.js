// Constructor for JSBoilerplate. If you rename this, you need to rename it also in init.js
// Take options object as a parameters. Given options override defaults
JSBoilerplate = function(options) {
	// Make this object visible in functions.
	var self = this; 

	// Default values for options
	// These are defined pretty well in init.js. I'll save some space and leave this half empty.
	self.options = {
		parent: $('body'),
		url: '/',
		theme: 'normal',
	}

	// Extend default options with given options
	// This uses jQuery ($)
	$.extend(self.options, options);

	// Make some options easier to access
	self.data = self.options.data; 
	self.url = self.options.url; 
	self.submit = self.options.submit; 
	self.sendAnswer = self.options.sendAnswer; 

	// Create a container for the game. 
	// There needs to be a "gamearea"-container, which is positioned relative and takes the 
	// full width and height of it's parent. Everything in the game must be placed inside "gamearea".
	// Note: self.options.parent is the most outer container
	// self.parent is the game itself and everything should be added there
	// USE self.parent TO ADD THINGS IN YOUR GAME! 
	self.parent  = $('<div class="gamearea"></div>');
	// Add the game to the outer element
	self.options.parent.append(self.parent); 

	// Load necessary CSS-files
	self.loadCss();

	// Make the are fullscreen. Give some time to make sure
	// the parent is rendered before resizing
	setTimeout(function() {
		self.resize();
	}, 500);

	// Handle window resize
	window.onresize = self.resize.bind(self); 

	// Check if game has been detached every 1000ms
	var detacherId = setInterval(function () {

		if ($(self.parent).parents('body').length === 0) {
			// Detach all key and mouse listeners here.
			// Aslo clear all intervals and timeouts
			clearInterval(detacherId);
		}
	}, 1000);


	// Draw start screen 

    self.drawStartScreen(); 


}


//Starting point for the game
JSBoilerplate.prototype.start = function() {
    var self = this; 
    self.drawGameArea();

    self.movement();

    console.log("the game has begun!");

}



JSBoilerplate.prototype.drawGameArea = function(){

    var self = this;

    // the player figure
    self.playerFigure = $('<div class="playerFigure"></div>');

// positioning player figure in the middle of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    self.playerFigure.css({ top: height/2, left: width/2});
    self.parent.append(self.playerFigure);


     // the wallLeft
    self.wallLeft = $('<div class="wallLeft"></div>');

// positioning wallLeft in the left side of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.wallLeft.css({ top: height/50, left: width/150});
    self.parent.append(self.wallLeft);

     // the wallRight
    self.wallRight = $('<div class="wallRight"></div>');

// positioning wallRight in the right side of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.wallRight.css({ top: height/50, right: width/150});
    self.parent.append(self.wallRight);

     // the wallTop
    self.wallTop = $('<div class="wallTop"></div>');

// positioning wallTop in the top of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.wallTop.css({ top: height/150, right: width/150});
    self.parent.append(self.wallTop);

     // the wallBottom
    self.wallBottom = $('<div class="wallBottom"></div>');

// positioning wallBottom in the bottom of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.wallBottom.css({ bottom: height/150, right: width/150});
    self.parent.append(self.wallBottom);

         // the gateLeft
    self.gateLeft = $('<div class="gateLeft"></div>');

// positioning gateLeft in the left side of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.gateLeft.css({ bottom: height/50, left: width/150});
    self.parent.append(self.gateLeft);

     // the gateRight
    self.gateRight = $('<div class="gateRight"></div>');

// positioning gateRight in the right side of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.gateRight.css({ bottom: height/2.5, right: width/600});
    self.parent.append(self.gateRight);

     // the gateTop
    self.gateTop = $('<div class="gateTop"></div>');

// positioning gateTop in the top of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();

//var string = "name"
//var string2 = "100%"

   // self.gateTop.css({ top: height/string2, right: width/string2});
    self.parent.append(self.gateTop);

    // the gateBottom
    self.gateBottom = $('<div class="gateBottom"></div>');

// positioning gateBottom in the bottom of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.gateBottom.css({ bottom: height/150, right: width/2.4});
    self.parent.append(self.gateBottom);

    // the answerLeft
    self.answerLeft = $('<div class="answerLeft"></div>');

// positioning answerLeft in the left side of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.answerLeft.css({ top: height/50, left: width/150});
    self.parent.append(self.answerLeft);

    // the answerRight
    self.answerRight = $('<div class="answerRight"></div>');

// positioning answerRight in the right side of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.answerLeft.css({ top: height/50, left: width/150});
    self.parent.append(self.answerRight);

    // the answerTop
    self.answerTop = $('<div class="answerTop"></div>');

// positioning answerTop in the top side of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.answerTop.css({ top: height/50, left: width/150});
    self.parent.append(self.answerTop);

    // the answerBottom
    self.answerBottom = $('<div class="answerBottom"></div>');

// positioning answerBottom in the bottom side of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.answerBottom.css({ top: height/50, left: width/150});
    self.parent.append(self.answerBottom);

    // the questionArea
    self.questionArea = $('<div class="questionArea"></div>');

// positioning questionArea in the upper middle of the board
    var width = $('.gamearea').width();
    var height = $('.gamearea').height();
    //self.questionArea.css({ top: height/50, left: width/150});
    self.parent.append(self.questionArea);

}




// Draws the initial start screen, with a big start-button. 
// Game starts only after user has decied to start the game. 
// You can skip this, if you like.
JSBoilerplate.prototype.drawStartScreen = function() {
	var self = this; 

	self.parent.append('<div class="startbutton">Start!</div>'); 
	$('.startbutton').click(function(e) {
		var elem = this; 
		e.preventDefault();
		// disable keylistener
		$(document).off('keypress');

		// ugly hack to wait until the animation is completed.
		setTimeout(function() {
			// fade button, start game, remove button
			$(elem).fadeOut(function() {
				// focus parent div (needed, if you have keylistener in your game)
				self.parent.focus();
				// start the game 
				self.start(); 
				// remove start-button
				$(elem).remove();

			});
		}, 200);
	});
	
	$(document).keypress(function(e) { // 13 == enter key
		if(e.which === 13 || e.keyCode === 13) {
			$('.startButton').click(); 
		}
	});
}

// Load the base_theme.css and set theme, if available.
// No need to modify this, unless you want to implement themes or 
// load external css-libraries
JSBoilerplate.prototype.loadCss = function() {
	var self = this;
	// remove all existing stylesheets (should not be any)
	$("[id^=boilerpalte-style]").remove();

	////////////////////////////////////////////////////////////
	// See which theme is selected, default is normal or empty
	////////////////////////////////////////////////////////////
	if(self.options.theme == "normal") {
		$(self.parent).addClass(self.options.theme);
	}
	// Example for alterntive theme
	// Not implemented in this boilerplate!
	else if (self.options.theme == 'something_else') {
		$(self.parent).addClass(self.options.theme);
		var style = self.url + 'stylesheets/something_else.css';
	}
	// Default case, if the theme is completely missing from options
	else {
		console.log("Theme not supported, using 'normal'");
		$(self.parent).addClass("normal");
	}
	
	var count = $("[id^=boilerpalte-style]").length + 1; 

	////////////////////////////////////////////////////////////
	// Load the files
	////////////////////////////////////////////////////////////
	// load the base_theme.css
	$('head').append('<link id="boilerpalte-style'+ count +'" rel="stylesheet" href="'+ self.url + 'stylesheets/base_theme.css' +'">');	

	// Load special theme
	if(style) {
		$('head').append('<link id="boilerpalte-style'+ (count+1) +'" rel="stylesheet" href="'+ style +'">');
	}

	// Loading any external stylesheets, like animate.css
	// $('head').append('<link id="boilerpalte-style'+ (count+2) +'" rel="stylesheet" href="' + self.options.url + 'stylesheets/animate.css">');
}

// Keep the game in fullscreen even on window resize
JSBoilerplate.prototype.resize = function() {
	var self = this;
	// First make sure that the outer most element is full width and height
	$(self.options.parent).width(parseFloat($(window).width()) - parseFloat($(self.options.parent).offset().left) + 'px');
	$(self.options.parent).height(parseFloat($(window).height()) - parseFloat($(self.options.parent).offset().top) + 'px');

	// Make sure that the game container fills the outer most container.
	$(self.parent).width($(self.options.parent).width());
    $(self.parent).height($(self.options.parent).height());

    
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Helper functions, use if you need 
///////////////////////////////////////////////////////////////////////////////////////////////////

// Shuffle options array. Makes sure correct option is included in shuffled array
JSBoilerplate.prototype.shuffleOptions = function(options, correct) {
	var self = this; 
	var arr = []; 

	options = self.shuffle(options);
	var isCorrect = false;

	for(var i=0; i<self.options.nOptions; i++) {
		arr.push(options[i]);
		if(options[i] === correct) {
			isCorrect = true;
		}
	}

	if(!isCorrect) {
		arr[0] = correct;
	}

	arr = self.shuffle(arr);

	return arr;
}

// Get random int including min and max
JSBoilerplate.prototype.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Shuffle array
JSBoilerplate.prototype.shuffle = function(array) {

	var currentIndex = array.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
	}

	return array;
}

// Checks if array as given item
JSBoilerplate.prototype.isIn = function(array, item) {
	for(var i=0; i<array.length; i++) {
		if(array[i] === item) {
			return true;
		}
	}
	
	return false;
}

/*
 var drawing_width = 100
  var drawing_height = 60
var draw = SVG('player').size(drawing_width, drawing_height)

var player = draw.rect(40, 20).fill('#aa00aa');
*/

JSBoilerplate.prototype.movement = function(){
    var self = this;

    var x, y;
    document.onkeydown = function(event){

	switch(event.keyCode){
	case 39: rightKey = true;
	    x = $(".playerFigure").offset().left;
	    $(".playerFigure").css({left: x + 5});
	    console.log("right");
	    break;
	case 38: upKey = true;
	    y = $(".playerFigure").offset().top;
	    $(".playerFigure").css({top: y - 5});
	    console.log("up");
	    break;
	case 37: leftKey = true;
	    x = $(".playerFigure").offset().left;
	    $(".playerFigure").css({left: x - 5});
	    console.log("left");
	    break;
	case 40: downKey = true;
	    y = $(".playerFigure").offset().top;
	    $(".playerFigure").css({top: y + 5});
	    console.log("down");
	    break;
	}

    }
}
