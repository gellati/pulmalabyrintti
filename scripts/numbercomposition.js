// Constructor for NumberComposition. If you rename this, you need to rename it also in init.js
// Take options object as a parameters. Given options override defaults
NumberComposition = function(options) {
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
	self.lifes = self.options.lifes; 

	// Helper variables to follow the state of the game
	self.isGameOver = false; 
	self.currentQuestion = 0; 

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


	// Draw start screen 
	self.drawStartScreen(); 
}


//Starting point for the game
NumberComposition.prototype.start = function() {
	var self = this; 

	self.drawGameArea();
	self.nextProblem();
	console.log("the game has begun!");

}

// Draw the game area and prepare needed containers
NumberComposition.prototype.drawGameArea = function() {
	var self = this; 

	// Save this as a variable to the game object
	// The outer container is .optionsContainer, which by design takes a certain height and full width
	// of the screen. The inner container .options will then adapt to the number of options and keep options in the middle
	self.optionsContainer = $('<div class="optionsContainer"><div class="options"></div></div>');

	// Add optionsContainer to the gamearea
	self.parent.append(self.optionsContainer);

	// Container for the question/target value
	// Container is later available via self.targetValueContainer
	self.targetValueContainer = $('<div class="targetValue"></div>');
	// Add targetValue to gamearea
	self.parent.append(self.targetValueContainer); 

	// Container for current value (selected options)
	// Container is later available via self.currentValueContainer
	self.currentValueContainer = $('<div class="currentValue"></div>'); 
	// Add currentValue to gamearea
	self.parent.append(self.currentValueContainer);


	// Container for lifes
	// Container is later available via self.lifesContainer
	self.lifesContainer = $('<div class="lifes">' +self.lifes+ '</div>'); 
	// Add currentValue to gamearea
	self.parent.append(self.lifesContainer);

}	

// Read next problem from data and create corresponding options
// and show question (the target number)
NumberComposition.prototype.nextProblem = function() {
	var self = this; 

	self.currentData = self.data[self.currentQuestion]; 
	// Update options
	self.updateOptions(self.currentData.options);
	self.targetValueContainer.html(self.currentData.question); 
	self.currentValueContainer.html(self.currentData.startValue);
}

// Helper for updating the buttons. Give options as an array
// This will remove all exisiting options
NumberComposition.prototype.updateOptions = function(options) {
	var self = this; 

	// define a function to add new options
	////////////////////////////////////////////////////////////
	// Create new options
	////////////////////////////////////////////////////////////
	function createNewOptions() {
		// Iterate trough the optiosn and create new buttons
		for (var i=0; i<options.length; i++) {
			// Create new button by calling self.createOption and give the button text
			// as a parameter. Also add it to proper place on the game area (inner option container)
			$('.options').append(self.createOption(options[i])); 
		}
	}

	////////////////////////////////////////////////////////////
	// Fade out and remove existing options
	////////////////////////////////////////////////////////////	
	// Use animate.css effects
	// First check, if we have existing buttons. If yes, remove them and then add new ones
	if($('.option').length > 0) {
		$('.option').addClass('fadeOut'); 
		// When the animation ends, remove the items. Listen for animation end event
		$('.option').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
			// When animation end fires, this function is executed
			function() {
				// remove all option-buttons
				$('.option').remove(); 
				createNewOptions();
		});
	}

	else {
		createNewOptions(); 
	}
}

// Creates a new option button
NumberComposition.prototype.createOption = function(content) {
	var self = this; 

	var option = $('<div class="animated option bounceIn" data-value="'+content+'">' +content+ '</div>');
	// Add click listener. Function gets executed when button is clicked.
	option.click(function(e) {
		// stop default behaviour just in case
		e.preventDefault(); 
		// If the game is over, dont do anything
		if(self.isGameOver) {
			return;
		}
		// Add or remove .active -class of the button
		$(this).toggleClass('active');
		// calculate the value of currently activate buttons
		self.calculate(); 
	});

	return option;
}

// Calculate value of selected items and update currentValue
NumberComposition.prototype.calculate = function() {
	var self = this; 

	var value = self.currentData.startValue; 
	var answers = [];

	// Get all active elements and read their value.
	// Value can be read from HTML-content or from data-value -attribute
	$('.active').each(function(index) {
		// Read the current value and make sure it is a number
		// $(this) is the current element in the each-loop
		var val = parseFloat($(this).attr('data-value')); 

		// Save the value to an array. This will be used to track players answers
		answers.push(val);

		// Check the operation and act accordingly 
		if(self.currentData.operation === 'addition') {
			value += val; 
		}
		else if (self.currentData.operation === 'subtraction') {
			value -= val; 
		} 
		else if (self.currentData.operation === 'division') {
			value = value/val; 
		}
		else if (self.currentData.operation === 'multiplication') {
			value = value*val; 
		}
		// Handle error situation gracefully
		else {
			console.log("Operation", self.currentData.operation, "not supported"); 
		}
	});

	// Update value for the user to see
	// use html instead of append to remove old value
	$('.currentValue').html(value);

	// Compare the value to correct answer
	if(value == self.currentData.correct) {
		// Answer is correct
		self.correctAnswer(answers); 
	}

	// If operation is addition or multiplication and the current value is greater than the correct answer, call wrongAnswer
	else if ((self.currentData.operation === 'addition' || self.currentData.operation === 'multiplication') && value > self.currentData.correct) {
		self.wrongAnswer(answers); 
	}
	// If the operation is subtraction or division and the current value is smaller than correct value, call wrongAnswer
	else if ((self.currentData.operation === 'subtraction' || self.currentData.operation === 'division') && value < self.currentData.correct) {
		self.wrongAnswer(answers);
	}
}

// Handle correct answer. Show correct animation and move to next problem or show game over (end of the game -screen)
NumberComposition.prototype.correctAnswer = function(answers) {
	var self = this; 

	console.log("correct answer"); 
	self.currentQuestion++; 

	// Save the answer
	self.sendAnswer({problem: self.currentData, answer: answers});

	// Animte the target
	self.targetValueContainer.addClass('animated bounce'); 
	$('.targetValue').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
		// When animation end fires, this function is executed
		function() {
			$(this).removeClass('animated bounce');
			// Check if there is more questions and generate next problem 
			if(self.currentQuestion < self.data.length) {
				self.nextProblem(); 
			}
			// If that was the last problem, submit in mark of gameover
			else {
				self.gameOver();
			}
	});


}

// Handle wrong answer. Wrong answer will loose one life and will start current level all over again
NumberComposition.prototype.wrongAnswer = function(answers) {
	var self = this; 

	// Save the answer
	self.sendAnswer({problem: self.currentData, answer: answers});

	self.updateLifes();


	// Animte the target
	self.targetValueContainer.addClass('animated shake'); 
	$('.targetValue').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
		// When animation end fires, this function is executed
		function() {
			$(this).removeClass('animated shake');

			// Check if there is more questions and generate next problem 
			// Also check that we have enought lifes to continue
			if(self.currentQuestion < self.data.length && self.lifes >= 0) {
				self.nextProblem(); 
			}
			// If that was the last problem, submit in mark of gameover
			// Also in case of loosing all the lifes we finish the game
			else {
				self.gameOver();
			}
	});

	
}

NumberComposition.prototype.gameOver = function() {
	var self = this; 

	self.gameOver = true; 
	self.parent.html('');

	self.submit();
}

NumberComposition.prototype.updateLifes = function() {
	var self = this; 

	self.lifes--; 
	// Update lifes for the player to see
	$('.lifes').html(self.lifes); 
}

// Draws the initial start screen, with a big start-button. 
// Game starts only after user has decied to start the game. 
// You can skip this, if you like.
NumberComposition.prototype.drawStartScreen = function() {
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
	
	$(document).keypress(function(e) {
		if(e.which === 13 || e.keyCode === 13) {
			$('.startButton').click(); 
		}
	});
}

// Load the base_theme.css and set theme, if available.
// No need to modify this, unless you want to implement themes or 
// load external css-libraries
NumberComposition.prototype.loadCss = function() {
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
	$('head').append('<link id="boilerpalte-style'+ (count+2) +'" rel="stylesheet" href="' + self.options.url + 'stylesheets/animate.min.css">');
}

// Keep the game in fullscreen even on window resize
NumberComposition.prototype.resize = function() {
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
NumberComposition.prototype.shuffleOptions = function(options, correct) {
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
NumberComposition.prototype.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Shuffle array
NumberComposition.prototype.shuffle = function(array) {

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
NumberComposition.prototype.isIn = function(array, item) {
	for(var i=0; i<array.length; i++) {
		if(array[i] === item) {
			return true;
		}
	}
	
	return false;
}