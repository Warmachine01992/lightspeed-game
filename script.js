//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// loading the default DOM values
$( document ).ready(function() {
	$('.prev-score').text(padDigits(score));
	$('.high-score').text(padDigits(hiScore));
	if ($(window).height() < 400){
		showWarningScreen();
	} else if ($(window).width() < 800){	
		smallGame();
	}	
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// game variables and event listeners 
var score = 0;
var hiScore = 0;
var gameScore = [];
var inGame = false;
var intervals = [];
var gameX = 750;
var gameY = 450;
var gamePadding = 25;
var isSmall = false;
var warning = false;
var targetWidth = 30;

$('#start-btn').click(e => {
	getReady();
});

$('#stop-btn').click(e => {
	endGame();
})

$('.target').click(function(e) {
	moveTarget();
	updateScores();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// game functionality

function getReady(){
	inGame = true;

	showPlayingScreen();
	showReadyScreen();
	$('#countdown').text(3)
	readyCount(2);
}

function startGame(){
	score = 0;
	gameScore = [];	

	hideReadyScreen();
	centerTarget();
	$('.current-score').text(padDigits(score));
	$('.game-clock').text(15);
	countDown(14);
}

function readyCount(seconds) {
	var intervalId = setInterval(function() {
		if (seconds > 0) {
			$('#countdown').text(seconds);
			seconds--;
		} else {
			clearInterval(intervalId);
			startGame()
		}
	}, 1000);
	intervals.push(intervalId);
}

function countDown(seconds) {
	var intervalId = setInterval(function() {
		if (seconds >= 0) {
			$('.game-clock').text(padDigits(seconds));
			seconds--;
		} else {
			clearInterval(intervalId);
			endGame();
		}
	}, 1000);
	intervals.push(intervalId);
		// allows this interval to be accessible outside of this function if necessary.
		// fixes a bug that didn't clear the interval if quit before one second has passed.
}

function centerTarget(){
	$('.target').attr('style', `transform: translate(
		${gameX/2 + gamePadding - targetWidth/2}px, 
		${gameY/2 + gamePadding - targetWidth/2}px)`
	);
}

function moveTarget(){
	let x = (Math.floor(Math.random() * gameX) + gamePadding);
	let y = (Math.floor(Math.random() * gameY) + gamePadding);
	$('.target').attr('style', `transform: translate(${x}px, ${y}px)`);
}

function updateScores(){
	gameScore.push('x');
	$('.current-score').text(`${gameScore.length.toString().padStart(2, "0")}`);
	score = gameScore.length;
	if(score > hiScore){
		hiScore = gameScore.length;
	}
}

function endGame(){
	inGame = false;
	// clear any existing intervals, then remove all of them.
	intervals.forEach(x => clearInterval(x));
	intervals = [];

	showStartScreen();
	$('.prev-score').text(padDigits(score));
	$('.high-score').text(padDigits(hiScore));
	if(score > 0) {
		wellDone()
	} else {
		welcome();
	}
}

function padDigits(num){
	return num.toString().padStart(2, "0");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// screen rendering
function welcome() {
	$('#eye').attr('style', 'display: block');
	$('#wink').attr('style', 'display: none')
	$('#greeting').text('Welcome!');
}

function wellDone() {
	$('#eye').attr('style', 'display: none');
	$('#wink').attr('style', 'display: block')
	$('#greeting').text('Well done!');
}

function showStartScreen(){
	warning = false;
	$('.start-screen').attr('style', 'display: flex');
	$('.game-screen').attr('style', 'display: none');
	$('.error-screen').attr('style', 'display: none');
}

function showPlayingScreen(){
	$('.start-screen').attr('style', 'display: none');
	$('.game-screen').attr('style', 'display: flex')
}

function showWarningScreen(){
	warning = true;
	$('.start-screen').attr('style', 'display: none');
	$('.game-screen').attr('style', 'display: none');
	$('.error-screen').attr('style', 'display: flex');
}

function showReadyScreen(){
	$('.get-ready').attr('style', 'display: flex');
	$('.HUD').attr('style', 'display: none');
	$('.target').attr('style', 'display: none');
}

function hideReadyScreen(){
	$('.get-ready').attr('style', 'display: none');
	$('.HUD').attr('style', 'display: flex');
	$('.target').attr('style', 'display: block');
}

function smallGame(){
	isSmall = true;
	gameX = 290;
	gameY = 260;
	gamePadding = 20;
	targetWidth = 16;
}

function normalGame(){
	isSmall = false;
	gameX = 750;
	gameY = 450;
	gamePadding = 25;
	targetWidth = 30;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// handling screen size
$(window).resize(function(){
	if (($(window).height() < 400)) {
		endGame();
		showWarningScreen();
	} else {
		if (warning) {
			showStartScreen();
		} else {
			if (($(window).width() < 800) && !isSmall){	
				endGame();
				smallGame();
				// showWarningScreen();
			}	
			else if (($(window).width() >= 800) && isSmall){
				endGame();
				normalGame();
			}
		}
	}
});