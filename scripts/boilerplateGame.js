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

    self.isGameOver = false;
    self.currentQuestionIndex = 0;
    self.canMove = true;
    self.wrongGates = [];
    self.correctGate = {};


    self.topGate = {};
    self.leftGate = {};
    self.bottomGate = {};
    self.rightGate = {};

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

//    self.drawStartScreen(); 
    self.start();

}


//Starting point for the game
JSBoilerplate.prototype.start = function() {
    var self = this; 
    self.drawGameArea();
    self.keyControl();
    self.jumpControl();
    self.newGame();
    self.clickListener();



    var container = document.querySelector(".gameArea");
    var playerFigure = document.querySelector(".playerFigure");
    var questionArea = document.querySelector(".questionArea");
    var targetElement;
    
    self.gpcontrol = new VilleControl();
    $('body').on('gpcontrol', function(e) {
        if(e.direction === 'up') {

	    var currentTarget = $(".answerTop")[0];
	    console.log(currentTarget);

	    
	    var parentPosition = self.getPosition(container, currentTarget);
	    console.log(parentPosition.x + " " + parentPosition.y);

	    var currentTargetQ = $(".answerTop");
	    console.log(currentTargetQ);

	    xpos = currentTargetQ[0].offsetLeft;
	    ypos = currentTargetQ[0].offsetTop;
	    
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);
	    
	    console.log("getClickPosition " + xPosition + " " + yPosition);

	    console.log("1");
//	    var currentTarget = document.querySelector(".answerTop");
	    var parentPosition = self.getPosition(container, currentTarget);
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);

	    console.log("getClickPosition " + xPosition + " " + yPosition);



	    playerFigure.style.left = xPosition + "px";
	    playerFigure.style.top = yPosition + "px";
	    playerFigure.className += " movingFigure";
	    targetElement = document.querySelector(".answerTop"); //.currentTarget;
	    	
	    if(questionArea.getAttribute('data-value') == targetElement.getAttribute('data-value')){
	    questionArea.className += " correctAnswer";
	    $(playerFigure).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function(e){
		if(e.originalEvent.propertyName === 'top'){
		    console.log(e.originalEvent.propertyName);

	    console.log("correct");
//	    self.finishGame();
	    self.clearGame();	    
		    self.newGame();

//		    document.getElementById("playerFigure").focus();
//		    document.getElementById("playerFigure").select();
		    
//		    $(".gameArea").focus();
		}
	    });
		
	    }else{
	    
	    
		//	    if(questionArea.getAttribute('data-value') != targetElement.getAttribute('data-value')){
		questionArea.className = questionArea.className.replace(/\bcorrectAnswer\b/,'');
		console.log("wrong");		
	    }
	    
	    console.log("1end");

	    
        }
        else if(e.direction === 'left') {

	    var currentTarget = $(".answerLeft")[0];
	    console.log(currentTarget);

	    
	    var parentPosition = self.getPosition(container, currentTarget);
	    console.log(parentPosition.x + " " + parentPosition.y);

	    var currentTargetQ = $(".answerLeft");
	    console.log(currentTargetQ);

	    xpos = currentTargetQ[0].offsetLeft;
	    ypos = currentTargetQ[0].offsetTop;
	    
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);
	    
	    console.log("getClickPosition " + xPosition + " " + yPosition);

	    console.log("1");
//	    var currentTarget = document.querySelector(".answerTop");
	    var parentPosition = self.getPosition(container, currentTarget);
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);

	    console.log("getClickPosition " + xPosition + " " + yPosition);



	    playerFigure.style.left = xPosition + "px";
	    playerFigure.style.top = yPosition + "px";
	    playerFigure.className += " movingFigure";
	    targetElement = document.querySelector(".answerLeft"); //.currentTarget;
	    
	
	    if(questionArea.getAttribute('data-value') == targetElement.getAttribute('data-value')){
	    questionArea.className += " correctAnswer";
	    $(playerFigure).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function(e){
		if(e.originalEvent.propertyName === 'top'){
		    console.log(e.originalEvent.propertyName);

	    console.log("correct");
//	    self.finishGame();
	    self.clearGame();	    
		    self.newGame();

//		    document.getElementById("playerFigure").focus();
//		    document.getElementById("playerFigure").select();
		    
//		    $(".gameArea").focus();
		}
	    });
		
	    }else{
	    
	    
		//	    if(questionArea.getAttribute('data-value') != targetElement.getAttribute('data-value')){
		questionArea.className = questionArea.className.replace(/\bcorrectAnswer\b/,'');
		console.log("wrong");		
	    }
	    
	    console.log("1end");


	}
        else if(e.direction === 'right') {
//                self.moveCharacterToWithOutJump('right');

	    var currentTarget = $(".answerRight")[0];
	    console.log(currentTarget);

	    
	    var parentPosition = self.getPosition(container, currentTarget);
	    console.log(parentPosition.x + " " + parentPosition.y);

	    var currentTargetQ = $(".answerRight");
	    console.log(currentTargetQ);

	    xpos = currentTargetQ[0].offsetLeft;
	    ypos = currentTargetQ[0].offsetTop;
	    
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);
	    
	    console.log("getClickPosition " + xPosition + " " + yPosition);

	    console.log("1");
//	    var currentTarget = document.querySelector(".answerTop");
	    var parentPosition = self.getPosition(container, currentTarget);
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);

	    console.log("getClickPosition " + xPosition + " " + yPosition);



	    playerFigure.style.left = xPosition + "px";
	    playerFigure.style.top = yPosition + "px";
	    playerFigure.className += " movingFigure";
	    targetElement = document.querySelector(".answerRight"); //.currentTarget;
	    
	
	    if(questionArea.getAttribute('data-value') == targetElement.getAttribute('data-value')){
	    questionArea.className += " correctAnswer";
	    $(playerFigure).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function(e){
		if(e.originalEvent.propertyName === 'top'){
		    console.log(e.originalEvent.propertyName);

	    console.log("correct");
//	    self.finishGame();
	    self.clearGame();	    
		    self.newGame();

//		    document.getElementById("playerFigure").focus();
//		    document.getElementById("playerFigure").select();
		    
//		    $(".gameArea").focus();
		}
	    });
		
	    }else{
	    
	    
		//	    if(questionArea.getAttribute('data-value') != targetElement.getAttribute('data-value')){
		questionArea.className = questionArea.className.replace(/\bcorrectAnswer\b/,'');
		console.log("wrong");		
	    }
	    
	    console.log("1end");


	}
        else if(e.direction === 'down') {
                $('.item0[data-level="'+self.currentQuestion+'"]').click();

	    var currentTarget = $(".answerBottom")[0];
	    console.log(currentTarget);

	    
	    var parentPosition = self.getPosition(container, currentTarget);
	    console.log(parentPosition.x + " " + parentPosition.y);

	    var currentTargetQ = $(".answerBottom");
	    console.log(currentTargetQ);

	    xpos = currentTargetQ[0].offsetLeft;
	    ypos = currentTargetQ[0].offsetTop;
	    
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);
	    
	    console.log("getClickPosition " + xPosition + " " + yPosition);

	    console.log("1");
//	    var currentTarget = document.querySelector(".answerTop");
	    var parentPosition = self.getPosition(container, currentTarget);
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);

	    console.log("getClickPosition " + xPosition + " " + yPosition);



	    playerFigure.style.left = xPosition + "px";
	    playerFigure.style.top = yPosition + "px";
	    playerFigure.className += " movingFigure";
	    targetElement = document.querySelector(".answerBottom"); //.currentTarget;
	    
	
	    if(questionArea.getAttribute('data-value') == targetElement.getAttribute('data-value')){
	    questionArea.className += " correctAnswer";
	    $(playerFigure).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function(e){
		if(e.originalEvent.propertyName === 'top'){
		    console.log(e.originalEvent.propertyName);

	    console.log("correct");
//	    self.finishGame();
	    self.clearGame();	    
		    self.newGame();

//		    document.getElementById("playerFigure").focus();
//		    document.getElementById("playerFigure").select();
		    
//		    $(".gameArea").focus();
		}
	    });
		
	    }else{
	    
	    
		//	    if(questionArea.getAttribute('data-value') != targetElement.getAttribute('data-value')){
		questionArea.className = questionArea.className.replace(/\bcorrectAnswer\b/,'');
		console.log("wrong");		
	    }
	    
	    console.log("1end");

	}

/*
	else if(e.direction === 'triangle') {
                $('.item1[data-level="'+self.currentQuestion+'"]').click();
        }
        else if(e.direction === 'circle') {
                $('.item2[data-level="'+self.currentQuestion+'"]').click();
        }
        else if(e.direction === 'square') {
                $('.item3[data-level="'+self.currentQuestion+'"]').click();
        }
*/
	/*
        else if (e.direction === 'connected') {
                self.options.dance = true;
                self.dance = true;
                        $('.optionLabel').each(function(index) {
                                $(this)[0].className = $(this)[0].className.replace('nodance', 'dance');
                        });
        }
*/
	/*
        else if (e.direction === 'disconnected') {
                self.options.dance = false;
                self.dance = false;
                        $('.optionLabel').each(function(index) {

                                $(this)[0].className = $(this)[0].className.replace('dance', 'nodance');
                        });
        }
*/


    });

    
//    container.addEventListener("click", getClickPosition, false);    

//    self.checkCursorPosition();
//    self.checkCursorElement();

    console.log("the game has begun!");

}

JSBoilerplate.prototype.keyControl = function(){

    var self = this;
    var container = document.querySelector(".gameArea");
    var playerFigure = document.querySelector(".playerFigure");
    var questionArea = document.querySelector(".questionArea");
    var targetElement;

    $(window).bind('keydown', function(e) {
        // 1
        if(e.keyCode == 49 || e.which == 49) {
            e.preventDefault();

	    var currentTarget = $(".answerTop")[0];
	    console.log(currentTarget);

	    
	    var parentPosition = self.getPosition(container, currentTarget);
	    console.log(parentPosition.x + " " + parentPosition.y);

	    var currentTargetQ = $(".answerTop");
	    console.log(currentTargetQ);

	    xpos = currentTargetQ[0].offsetLeft;
	    ypos = currentTargetQ[0].offsetTop;
	    
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);
	    
	    console.log("getClickPosition " + xPosition + " " + yPosition);

	    console.log("1");
//	    var currentTarget = document.querySelector(".answerTop");
	    var parentPosition = self.getPosition(container, currentTarget);
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);

	    console.log("getClickPosition " + xPosition + " " + yPosition);



	    playerFigure.style.left = xPosition + "px";
	    playerFigure.style.top = yPosition + "px";
	    playerFigure.className += " movingFigure";
	    targetElement = document.querySelector(".answerTop"); //.currentTarget;
	    
	
	    if(questionArea.getAttribute('data-value') == targetElement.getAttribute('data-value')){
	    questionArea.className += " correctAnswer";
	    $(playerFigure).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function(e){
		if(e.originalEvent.propertyName === 'top'){
		    console.log(e.originalEvent.propertyName);

	    console.log("correct");
//	    self.finishGame();
	    self.clearGame();	    
		    self.newGame();

//		    document.getElementById("playerFigure").focus();
//		    document.getElementById("playerFigure").select();
		    
//		    $(".gameArea").focus();
		}
	    });
		
	    }else{
	    
	    
		//	    if(questionArea.getAttribute('data-value') != targetElement.getAttribute('data-value')){
		questionArea.className = questionArea.className.replace(/\bcorrectAnswer\b/,'');
		console.log("wrong");		
	    }
	    
	    console.log("1end");

        }// end keycode 1
		
        // 2
        else if(e.keyCode == 50 || e.which == 50) {
            e.preventDefault();
	    console.log("2");

	    var currentTarget = $(".answerLeft")[0];
	    console.log(currentTarget);

	    
	    var parentPosition = self.getPosition(container, currentTarget);
	    console.log(parentPosition.x + " " + parentPosition.y);

	    var currentTargetQ = $(".answerLeft");
	    console.log(currentTargetQ);

	    xpos = currentTargetQ[0].offsetLeft;
	    ypos = currentTargetQ[0].offsetTop;
	    
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);
	    
	    console.log("getClickPosition " + xPosition + " " + yPosition);

	    console.log("1");
//	    var currentTarget = document.querySelector(".answerTop");
	    var parentPosition = self.getPosition(container, currentTarget);
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);

	    console.log("getClickPosition " + xPosition + " " + yPosition);



	    playerFigure.style.left = xPosition + "px";
	    playerFigure.style.top = yPosition + "px";
	    playerFigure.className += " movingFigure";
	    targetElement = document.querySelector(".answerTop"); //.currentTarget;
	    
	
	    if(questionArea.getAttribute('data-value') == targetElement.getAttribute('data-value')){
	    questionArea.className += " correctAnswer";
	    $(playerFigure).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function(e){
		if(e.originalEvent.propertyName === 'top'){
		    console.log(e.originalEvent.propertyName);

	    console.log("correct");
//	    self.finishGame();
	    self.clearGame();	    
		    self.newGame();

//		    document.getElementById("playerFigure").focus();
//		    document.getElementById("playerFigure").select();
		    
//		    $(".gameArea").focus();
		}
	    });
		
	    }else{
	    
	    
		//	    if(questionArea.getAttribute('data-value') != targetElement.getAttribute('data-value')){
		questionArea.className = questionArea.className.replace(/\bcorrectAnswer\b/,'');
		console.log("wrong");		
	    }
	    
	    console.log("1end");

	}

        // 3
        else if(e.keyCode == 51 || e.which == 51) {
            e.preventDefault();
	    console.log("3");

	    var currentTarget = $(".answerRight")[0];
	    console.log(currentTarget);

	    
	    var parentPosition = self.getPosition(container, currentTarget);
	    console.log(parentPosition.x + " " + parentPosition.y);

	    var currentTargetQ = $(".answerRight");
	    console.log(currentTargetQ);

	    xpos = currentTargetQ[0].offsetLeft;
	    ypos = currentTargetQ[0].offsetTop;
	    
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);
	    
	    console.log("getClickPosition " + xPosition + " " + yPosition);

	    console.log("1");
//	    var currentTarget = document.querySelector(".answerTop");
	    var parentPosition = self.getPosition(container, currentTarget);
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);

	    console.log("getClickPosition " + xPosition + " " + yPosition);



	    playerFigure.style.left = xPosition + "px";
	    playerFigure.style.top = yPosition + "px";
	    playerFigure.className += " movingFigure";
	    targetElement = document.querySelector(".answerTop"); //.currentTarget;
	    
	
	    if(questionArea.getAttribute('data-value') == targetElement.getAttribute('data-value')){
	    questionArea.className += " correctAnswer";
	    $(playerFigure).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function(e){
		if(e.originalEvent.propertyName === 'top'){
		    console.log(e.originalEvent.propertyName);

	    console.log("correct");
//	    self.finishGame();
	    self.clearGame();	    
		    self.newGame();

//		    document.getElementById("playerFigure").focus();
//		    document.getElementById("playerFigure").select();
		    
//		    $(".gameArea").focus();
		}
	    });
		
	    }else{
	    
	    
		//	    if(questionArea.getAttribute('data-value') != targetElement.getAttribute('data-value')){
		questionArea.className = questionArea.className.replace(/\bcorrectAnswer\b/,'');
		console.log("wrong");		
	    }
	    
	    console.log("1end");
        }
        
	        // 4
        else if(e.keyCode == 52 || e.which == 52) {
            e.preventDefault();
	    console.log("4");
	    var currentTarget = $(".answerBottom")[0];
	    console.log(currentTarget);

	    
	    var parentPosition = self.getPosition(container, currentTarget);
	    console.log(parentPosition.x + " " + parentPosition.y);

	    var currentTargetQ = $(".answerBottom");
	    console.log(currentTargetQ);

	    xpos = currentTargetQ[0].offsetLeft;
	    ypos = currentTargetQ[0].offsetTop;
	    
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);
	    
	    console.log("getClickPosition " + xPosition + " " + yPosition);

	    console.log("1");
//	    var currentTarget = document.querySelector(".answerTop");
	    var parentPosition = self.getPosition(container, currentTarget);
	    var xPosition = xpos - parentPosition.x - (playerFigure.clientWidth / 2);
	    var yPosition = ypos - parentPosition.y - (playerFigure.clientHeight / 2);

	    console.log("getClickPosition " + xPosition + " " + yPosition);



	    playerFigure.style.left = xPosition + "px";
	    playerFigure.style.top = yPosition + "px";
	    playerFigure.className += " movingFigure";
	    targetElement = document.querySelector(".answerTop"); //.currentTarget;
	    
	
	    if(questionArea.getAttribute('data-value') == targetElement.getAttribute('data-value')){
	    questionArea.className += " correctAnswer";
	    $(playerFigure).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function(e){
		if(e.originalEvent.propertyName === 'top'){
		    console.log(e.originalEvent.propertyName);

	    console.log("correct");
//	    self.finishGame();
	    self.clearGame();	    
		    self.newGame();

//		    document.getElementById("playerFigure").focus();
//		    document.getElementById("playerFigure").select();
		    
//		    $(".gameArea").focus();
		}
	    });
		
	    }else{
	    
	    
		//	    if(questionArea.getAttribute('data-value') != targetElement.getAttribute('data-value')){
		questionArea.className = questionArea.className.replace(/\bcorrectAnswer\b/,'');
		console.log("wrong");		
	    }
	    
	    console.log("1end");
        }
       
        // up arrow and w
        else if(e.keyCode == 38 || e.which == 38 || e.keyCode == 87 || e.which == 87 ) {
                e.preventDefault();
            if(self.onOption) {
                self.onOption.click();
		console.log("ladder");
//                self.character.removeClass('onLadder');
            }
        }
	
        else {
            console.log("unknown key");
        }
    });

}


JSBoilerplate.prototype.jumpControl = function(){
    var villeControl = new VilleControl();

    //villeControl.observe();
    //villeControl.emitEvent();
    
    
 
}




JSBoilerplate.prototype.drawGameArea = function(){

    var self = this;

//    var height = $(window).height();
//    var width = $(window).width();
    var height = $(document).height();
    var width = $(document).width();

    // no work, does not give height
    //    var width = $('.gamearea').width();
    //    var height = $('.gamearea').height();


    
    // the player figure
    self.playerFigure = $('<div class="playerFigure" id="playerFigure"></div>');

// positioning player figure in the middle of the board
    console.log("width " + width);
    console.log("height " + height);

    self.playerFigure.css({ top: height/2, left: width/2});
    self.parent.append(self.playerFigure);

    self.playerFigure.xpos = width/2;
    self.playerFigure.ypos = height/2;

    
     // the wallLeft, positioning wallLeft in the left side of the board
    self.wallLeft = $('<div class="wallLeft"></div>');
    self.parent.append(self.wallLeft);

     // the wallRight, positioning wallRight in the right side of the board
    self.wallRight = $('<div class="wallRight"></div>');
    self.parent.append(self.wallRight);

     // the wallTop, positioning to the top of the board
    self.wallTop = $('<div class="wallTop"></div>');
    self.parent.append(self.wallTop);

     // the wallBottom, positioning wallBottom in the bottom of the board
    self.wallBottom = $('<div class="wallBottom"></div>');
    self.parent.append(self.wallBottom);

         // the gateLeft, positioning gateLeft in the left side of the board
    self.gateLeft = $('<div class="gateLeft"></div>');
    self.parent.append(self.gateLeft);

     // the gateRight, positioning gateRight in the right side of the board
    self.gateRight = $('<div class="gateRight"></div>');
    self.parent.append(self.gateRight);

     // the gateTop, positioning gateTop in the top of the board
    self.gateTop = $('<div class="gateTop"></div>');
    self.parent.append(self.gateTop);

    // the gateBottom, positioning gateBottom in the bottom of the board
    self.gateBottom = $('<div class="gateBottom"></div>');
    self.parent.append(self.gateBottom);

/*
    // the questionArea, positioning questionArea in the upper middle of the board
    self.questionArea = $('<div class="questionArea"></div>');
    self.parent.append(self.questionArea);
*/


    self.questionArea = $('<div class="questionArea"></div>');
    self.parent.append(self.questionArea);

    // the answerLeft, positioning answerLeft in the left side of the board
    self.answerLeft = $('<div class="answerLeft clickable"></div>');
    self.parent.append(self.answerLeft);

    // the answerRight, positioning answerRight in the right side of the board
    self.answerRight = $('<div class="answerRight clickable"></div>');
    self.parent.append(self.answerRight);

    // the answerTop, positioning answerTop in the top side of the board
    self.answerTop = $('<div class="answerTop clickable"></div>');
    self.parent.append(self.answerTop);

    // the answerBottom, positioning answerBottom in the bottom side of the board
    self.answerBottom = $('<div class="answerBottom clickable"></div>');
    self.parent.append(self.answerBottom);




    /*
     // the choiceLeft, positioning choiceLeft in the left of the board
    self.choiceLeft = $('<div class="choiceLeft">17</div>');
    self.parent.append(self.choiceLeft);

    // the choiceRight, positioning choiceRight in the right of the board
    self.choiceRight = $('<div class="choiceRight">12</div>');
    self.parent.append(self.choiceRight);

    // the choiceTop, positioning choiceTop in the top of the board
    self.choiceTop = $('<div class="choiceTop">9</div>');
    self.parent.append(self.choiceTop);

    // the choiceBottom, positioning choiceBottom in the bottom of the board
    self.choiceBottom = $('<div class="choiceBottom">71</div>');
    self.parent.append(self.choiceBottom);
*/

}

JSBoilerplate.prototype.newGame = function(){
    var self = this;
    var methods = [];
    methods.push(self.addition);
    methods.push(self.subtraction);
    methods.push(self.multiplication);
    methods.push(self.division);

    var a = Math.floor(Math.random() * methods.length);
    console.log(a);
    switch(a){
    case 0: self.addition();
	break;
    case 1: self.subtraction();
	break;    
    case 2: self.multiplication();
	break;
    case 3: self.division();
	break;
    }

}

JSBoilerplate.prototype.division = function(){
    var self = this;
    console.log("division");
    var type = '/';
    var a, b, c, d;
    var randomNumber1 = Math.floor(Math.random() * 11);
    var randomNumber2 = Math.floor(Math.random() * 11);

    a = randomNumber1 * randomNumber2;
    
    b = a;
    c = a;
    d = a;

    while(b === a ){
	b = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    }

    while(c === a || c === b){
	c = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    }

    while(d === a || d === b || d === c){
	d = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    }
    
    console.log(a + "," + b + "," + c + "," + d);

    var answers = [randomNumber1, b, c, d];
    answers = self.shuffle(answers);
    
    console.log(randomNumber1 + " + " + randomNumber2 + " = " + a);

    self.placeNumbers(type, a, randomNumber2, randomNumber1, answers);
    
}


JSBoilerplate.prototype.multiplication = function(){
    var self = this;
    var type = '*';
    var a, b, c, d;
    var randomNumber1 = Math.floor(Math.random() * 11);
    var randomNumber2 = Math.floor(Math.random() * 11);

    a = randomNumber1 * randomNumber2;
    b = a;
    c = a;
    d = a;
    
    while(b === a ){
	b = Math.floor(Math.random() * 11) * Math.floor(Math.random() * 11);
    }

    while(c === a || c === b){
	c = Math.floor(Math.random() * 11) * Math.floor(Math.random() * 11);
    }

    while(d === a || d === b || d === c){
	d = Math.floor(Math.random() * 11) * Math.floor(Math.random() * 11);
    }
    
    console.log(a + "," + b + "," + c + "," + d);

    var answers = [a, b, c, d];
    answers = self.shuffle(answers);
    
    console.log(randomNumber1 + " + " + randomNumber2 + " = " + a);

    self.placeNumbers(type, randomNumber1, randomNumber2, a, answers);

}

JSBoilerplate.prototype.subtraction = function(){
    var self = this;
    var type = '-';
    var a, b, c, d;
    var randomNumber1 = Math.floor(Math.random() * 11);
    var randomNumber2 = Math.floor(Math.random() * 11);
    while(randomNumber2 >= randomNumber1){
	randomNumber2 = Math.floor(Math.random() * 11);
    }

    a = randomNumber1 - randomNumber2;
    b = a;
    c = a;
    d = a


    while(b === a && b >= 0){
	b = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    }

    while( (c === a || c === b) && c >= 0 ){
	c = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    }

    while( (d === a || d === b || d === c) && d >= 0){
	d = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    }

    var answers = [a, b, c, d];
    answers = self.shuffle(answers);
    self.placeNumbers(type, randomNumber1, randomNumber2, a, answers);
}


JSBoilerplate.prototype.addition = function(){
    var self = this;
    var type = '+';
    var a, b, c, d;
    var randomNumber1 = Math.floor(Math.random() * 11);
    var randomNumber2 = Math.floor(Math.random() * 11);
    
    a = randomNumber1 + randomNumber2;
    b = a;
    c = a;
    d = a


    while(b === a ){
	b = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    }

    while(c === a || c === b){
	c = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    }

    while(d === a || d === b || d === c){
	d = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 11);
    }
    
    console.log(a + "," + b + "," + c + "," + d);

    var answers = [a, b, c, d];
    answers = self.shuffle(answers);
    
    console.log(randomNumber1 + " + " + randomNumber2 + " = " + a);

    self.placeNumbers(type, randomNumber1, randomNumber2, a, answers);

}

JSBoilerplate.prototype.placeNumbers = function(type, randomNumber1, randomNumber2, correctAnswer, answers){
    // the equation, positioning equation in the upper middle of the board    
    var questionArea = document.querySelector('.questionArea');
    questionArea.setAttribute('data-value', correctAnswer);
    questionArea.innerHTML = randomNumber1.toString() + type + randomNumber2.toString() + '=?';

    var answerLeft = document.querySelector('.answerLeft');
    answerLeft.setAttribute('data-value', answers[0]);
    answerLeft.innerHTML = answers[0].toString();

    var answerRight = document.querySelector('.answerRight');
    answerRight.setAttribute('data-value', answers[1]);
    answerRight.innerHTML = answers[1].toString();

    var answerTop = document.querySelector('.answerTop');
    answerTop.setAttribute('data-value', answers[2]);
    answerTop.innerHTML = answers[2].toString();

    var answerBottom = document.querySelector('.answerBottom');
    answerBottom.setAttribute('data-value', answers[3]);
    answerBottom.innerHTML = answers[3].toString();
    
}







JSBoilerplate.prototype.clearGame = function(){
    var self = this;
    console.log("clearGame");

    var questionArea = document.querySelector('.questionArea');
    questionArea.removeAttribute('data-value');
    questionArea.innerHTML = '';
    questionArea.className = questionArea.className.replace(/\bcorrectAnswer\b/,'');
    
    var answerLeft = document.querySelector('.answerLeft');
    answerLeft.removeAttribute('data-value');
    answerLeft.innerHTML = '';


    var answerRight = document.querySelector('.answerRight');
    answerRight.removeAttribute('data-value');
    answerRight.innerHTML = '';

    var answerTop = document.querySelector('.answerTop');
    answerTop.removeAttribute('data-value');
    answerTop.innerHTML = '';

    var answerBottom = document.querySelector('.answerBottom');
    answerBottom.removeAttribute('data-value');
    answerBottom.innerHTML = '';

    
    var height = $(document).height();
    var width = $(document).width();
    
//    playerFigures = $('.playerFigure');
    self.playerFigure.removeClass('movingFigure');
    self.playerFigure.css({ top: height/2, left: width/2});    
    
}

JSBoilerplate.prototype.finishGame = function(){
    var self = this;
    $("document").delay(3000);
    
    

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


JSBoilerplate.prototype.CheckElementOverlap = function(el1, el2) {
    el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;
    
    return !((el1.offsetBottom < el2.offsetTop) ||
             (el1.offsetTop > el2.offsetBottom) ||
             (el1.offsetRight < el2.offsetLeft) ||
             (el1.offsetLeft > el2.offsetRight))
};






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

JSBoilerplate.prototype.keyBoardMovement = function(){
    var self = this;

    var x, y;
    
    if(self.canMove){
	document.onkeydown = function(event){
	    
	    switch(event.keyCode){
	    case 39: rightKey = true;
		x = $(".playerFigure").offset().left;
		$(".playerFigure").css({left: x + 5});
		self.playerFigure.xpos += 5;
		console.log("right");
		break;
	    case 38: upKey = true;s
		y = $(".playerFigure").offset().top;
		$(".playerFigure").css({top: y - 5});
		self.playerFigure.ypos -= 5;
		console.log("up");
		break;
	    case 37: leftKey = true;
		x = $(".playerFigure").offset().left;
		$(".playerFigure").css({left: x - 5});
		self.playerFigure.xpos -= 5;
		console.log("left");
		break;
	    case 40: downKey = true;
		y = $(".playerFigure").offset().top;
		$(".playerFigure").css({top: y + 5});
		self.playerFigure.ypos += 5;
		console.log("down");
		break;
	    }	    
	}
    }    
}


JSBoilerplate.prototype.isCorrectGate = function(x, y){
    
    return true;
}


JSBoilerplate.prototype.isWrongGate = function(x, y){
    return true;
}


JSBoilerplate.prototype.checkCursorElement = function(){
    var self = this;

    var startX, startY, endX, endY, name;
    
    $('.clickable').click(function(event){
	    console.log(event.target.className);
	    //	    console.log(event.target.pageX); // undefined

	console.log($(this).css('left'), $(this).css('top')); //
	console.log("offset " + $(this).offset().left + " " + $(this).offset().top); //

	console.log("pos " + $(this).position().left + " " + $(this).position().top);

	    name = event.target.className;
	endX = parseFloat($(this).css('top'));
	endY = parseFloat($(this).css('left'));
	    console.log(endX + " " + endY);

	console.log("checkCursorelement");


//	$(document).on("mousemove", function(event){
	    console.log("mousemove " + event.pageX + " " + event.pageY);
	//	});

	startX = $(".playerFigure").offset().left;
	startY = $(".playerFigure").offset().top;
	
	startX = parseFloat($(".playerFigure").css('left'));
	startY = parseFloat($(".playerFigure").css('top'));

	endX = event.pageX;
	endY = event.pageY;

//	self.moveElementAnimation(startX, startY, endX, endY);
//	self.moveElementCss(name, endX, endY);	
//	self.moveElementInterval(startX, startY, endX, endY);
	self.moveElementKirupa(startX, startY, endX, endY);
    });

}

JSBoilerplate.prototype.moveElementAnimation = function(startX, startY, endX, endY){
    console.log("moveElementAnimation " + startX + "," + startY + " -> " + endX + "," + endY);
    var dX = startX - endX + 200;
    var dY = startY - endY - 20;
    console.log("diff " + dX + " " + dY);
    $(".playerFigure").animate({left: dX + 'px', top: -dY + 'px'}, "slow");

}


JSBoilerplate.prototype.moveElementCss = function(name, xpos, ypos){
    console.log("moveElement " + xpos + " " + ypos);
    $(".playerFigure").css({'left': 'xpos' + 'px', 'top': 'ypos' + 'px'});
}

JSBoilerplate.prototype.moveElementInterval = function(startX, startY, endX, endY){
    console.log("moveElementInterval " + startX + "," + startY + " -> " + endX + "," + endY);
    var xp = 0, yp = 0;
    xp = startX;
    yp = startY;
    var loop = setInterval(function(){
	// change 12 to alter damping, higher is slower
	xp += (endX - xp) / 12;
	yp += (endY - yp) / 12;
	$(".playerFigure").css({left:xp, top:yp});
    }, 30);
}

JSBoilerplate.prototype.shuffle = function(array){

    let counter = array.length;
    
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
	
        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    
    return array;
    
}

JSBoilerplate.prototype.clickListener = function(){
    var self = this;
    //    function getClickPosition(e) {
    var container = document.querySelector(".gamearea");    

    var playerFigure = document.querySelector(".playerFigure");

    var questionArea = document.querySelector(".questionArea");
    var targetElement;
    
    $(container).on('click', '.clickable', function(e) {

	console.log($(this)[0]);
	
	//var parentPosition = getPosition(e.currentTarget);
	var parentPosition = self.getPosition(container.currentTarget);
	
	var xPosition = e.clientX - parentPosition.x - (playerFigure.clientWidth / 2);
	var yPosition = e.clientY - parentPosition.y - (playerFigure.clientHeight / 2);



/*	
	if(isNaN($(this).css("left"))
	   $(this).css("top")
	   $(this).css("right")
	   $(this).css("bottom"));

	var xPosition = parseFloat($(this).css("left")) - parentPosition.x - (playerFigure.clientWidth / 2);
	var yPosition = parseFloat($(this).css("top")) - parentPosition.y - (playerFigure.clientHeight / 2);
	console.log($(this).css("left"),$(this).css("top"),
		   $(this).css("right"),$(this).css("bottom"));

*/
	
	console.log("getClickPosition " + xPosition + " " + yPosition);
	playerFigure.style.left = xPosition + "px";
	playerFigure.style.top = yPosition + "px";
	playerFigure.className += " movingFigure";
	targetElement = this; //.currentTarget;

	
	if(questionArea.getAttribute('data-value') == targetElement.getAttribute('data-value')){
	    questionArea.className += " correctAnswer";
	    $(playerFigure).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function(e){
		if(e.originalEvent.propertyName === 'top'){
		    console.log(e.originalEvent.propertyName);

	    console.log("correct");
//	    self.finishGame();
	    self.clearGame();	    
		    self.newGame();

//		    document.getElementById("playerFigure").focus();
//		    document.getElementById("playerFigure").select();
		    
//		    $(".gameArea").focus();
		}
	    });
	    
	}else{
	    
	    
	    //	    if(questionArea.getAttribute('data-value') != targetElement.getAttribute('data-value')){
	    questionArea.className = questionArea.className.replace(/\bcorrectAnswer\b/,'');
	    console.log("wrong");		
	}

	
    });
	
//}

    // Helper function to get an element's exact position
/*
    function getPosition(el) {
    }
*/

}


JSBoilerplate.prototype.getPosition = function(el){
    var xPos = 0;
    var yPos = 0;
    while (el) {
	if (el.tagName == "BODY") {
	    
	    // deal with browser quirks with body/window/document and page scroll
	    var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
	    var yScroll = el.scrollTop || document.documentElement.scrollTop;
	    
	    xPos += (el.offsetLeft - xScroll + el.clientLeft);
	    yPos += (el.offsetTop - yScroll + el.clientTop);
	    
	}
	else {
	    // for all other non-BODY elements
	    xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
		yPos += (el.offsetTop - el.scrollTop + el.clientTop);
	}	    
	el = el.offsetParent;
    }
    return {
	x: xPos,
	y: yPos
    };
    

}


JSBoilerplate.prototype.moveElementKirupa = function(startX, startY, endX, endY){
    self = this;

    

/*
	console.log("clickable");
	console.log($(e.currentTarget).attr('class'));

	    console.log("player or mock");
*/
	

//    });



    
    
}








