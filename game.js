var buttonColours = ["red","blue","yellow","green"];
var level = 0;
var gamePattern = [];
var userChosenPattern = [];

$(document).keypress(function(){
	$("#level-title").text("Level " + level);
	nextSequence();
})
$(".btn").click(function(){
	var userChosenColour = $(this).attr("id");
	userChosenPattern.push(userChosenColour);
	playSound(userChosenColour);
	addAnimate(userChosenColour);
	checkAnswer(userChosenPattern.length-1);
})

function checkAnswer(currentLevel){
	if(gamePattern[currentLevel] === userChosenPattern[currentLevel]){
		console.log("Success");
	if(gamePattern.length === userChosenPattern.length){
		setTimeout(function(){
			nextSequence();
		},1000)
	}
	}
	else{
		console.log("Wrong");
		playSound("wrong");

		$("body").addClass("game-over");

		setTimeout(function(){
			$("body").removeClass("game-over");
		},200)

		$("#level-title").text("Game Over, Press Any Key to Restart");

		startOver();
	}
}

function nextSequence(){
	userChosenPattern = [];
	level++;
	$("#level-title").text("Level " + level);
	randomNumber = Math.random();
	randomNumber = randomNumber * 4;
	randomNumber = Math.floor(randomNumber);
	var randomChosenColour = buttonColours[randomNumber];	
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
}

function playSound(name){
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function addAnimate(currentColour){
	$("#" + currentColour).addClass("pressed");
	setTimeout(function(){
		$("#" + currentColour).removeClass("pressed");
	},100)
}

function startOver(){
	level = 0;
	gamePattern = [];
}