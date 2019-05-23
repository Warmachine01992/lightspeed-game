//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// loading the default DOM values
$( document ).ready(function() {
	$('.prev-score').text(padDigits(score));
	$('.high-score').text(padDigits(hiScore));
	if (($(window).width() < 800) || $(window).height() < 600){	
		showWarningScreen();
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
	$('.target').attr('style', `transform: translate(385px, 250px)`);
}

function moveTarget(){
	let x = (Math.floor(Math.random() * gameX) + 25);
	let y = (Math.floor(Math.random() * gameY) + 25);
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
	$('.start-screen').attr('style', 'display: flex');
	$('.game-screen').attr('style', 'display: none');
	$('.error-screen').attr('style', 'display: none');
}

function showPlayingScreen(){
	$('.start-screen').attr('style', 'display: none');
	$('.game-screen').attr('style', 'display: flex')
}

function showWarningScreen(){
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// handling screen size
$(window).resize(function(){
	if (($(window).width() < 800) || $(window).height() < 600){	
		endGame();
		showWarningScreen();
	}	
	else if (($(window).width() >= 800) && ($(window).height() >= 600) && !inGame){
		showStartScreen();
	}
});



/*
const cursor = document.querySelector('.cursor');
const cursorFollow = document.querySelector('.cursor-follow');
const playBtn = document.querySelector('#start-btn')

document.addEventListener('mousemove', e=> {
	cursor.setAttribute("style", `top: ${+e.pageY - 5}px; left: ${+e.pageX -5}px;`);
});

document.addEventListener('mousemove', e=> {
	cursorFollow.setAttribute("style", `top: ${+e.pageY - 8}px; left: ${+e.pageX - 8}px;`);
});
*/