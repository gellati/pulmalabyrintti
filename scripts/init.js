function startGame() {
	// Interface to communicate with ViLLE
	// Call submit, when the game ends.
	// There is no need to modify this, unless you want to debug something
	var submit = function() {
		console.log("Submit"); 
	}

	// After each answer, call sendAnswer to record answers.
	// There is no need to modify this, unless you want to debug something
	var sendAnswer = function(answer) {
		console.log("Saving ", answer); 
	}

	// options for the game
	var options = {
		parent: $('body'), 		// Where the game should be created
		url: '',				// Base url for stylesheets, images etc.
		submit: submit, 		// Uses submit -function defined above
		sendAnswer: sendAnswer, // Uses sendAnswer -function defined above
		data: [					// array of questions/problems
			// First question object
			{
				question: '9', 				// Target number, as an equation or just a number
				options: ['1', '2', '3', '4', '5', '6', '7'], 	// These will serve as usable numbers to form the target number 
				correct: '9',  					// Correct answer (the target number). I changed this to String instead of an Array
				operation: 'addition' ,			// Which operation addition, subtraction, division or multiplication
				startValue: 0					// Where the user starts. Ssubtraction and division should have a big number. Multiplication should have 1
			}, // first question object ends

			// Second question object
			{ 
				question: '2+2', 
				options: ['2', '3', '4', '5'], 
				correct: '4',
				operation: 'addition',
				startValue: 0
			}, // second question object ends
		],
		theme: 'normal',
		
		///////////////////////////////////////////////////////////////////////////////////
		// Optional configurations
		// Add as many you need in your game, these are just examples
		lifes: 3, 			// How many tries?
		time: 10			// Time to answer the question (find the target number)
	}

	// crate new instance of the game. 
	// If you rename the JSBoilerplate in the game.js, you must rename it here too. 
	var game = new NumberComposition(options); 

}

// Run the game on page load
startGame(); 

