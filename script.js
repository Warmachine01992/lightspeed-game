

// set up the custom cursor
// $(document).mousemove(e => {
// 	$('.cursor').attr("style", `top: ${+e.pageY - 5}px; left: ${+e.pageX -5}px;`);
// });
// loading the default DOM values
$( document ).ready(function() {
	$('.prev-score').text('0');
	$('.high-score').text(`${hiScore}`);
	if (($(window).width() < 800) || $(window).height() < 600){	
		showWarningScreen();
	}	
});

// game code begins
var score = 0;
var hiScore = 0;
var gameScore = [];
var inGame = false;
var intervals = [];

$('#start-btn').click(e => {
	startGame();
});

$('#stop-btn').click(e => {
	endGame();
})

$('.target').click(function(e) {
	moveTarget();
	updateScores();
});

function startGame(){
	inGame = true;
	score = 0;
	gameScore = [];	

	showPlayingScreen();
	centerTarget();
	$('.current-score').text(`score`);
	$('.game-clock').text(15);
	countDown(14, 1, '.game-clock');
}

function countDown(seconds) {
	var intervalId = setInterval(function() {
		if (seconds >= 0) {
			$('.game-clock').text(seconds);
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

function updateScores(){
	gameScore.push('x');
	$('.current-score').text(`${gameScore.length}`);
	score = gameScore.length;
	if(score > hiScore){
		hiScore = gameScore.length;
	}
}

function moveTarget(){
	let x = (Math.floor(Math.random() * 750) + 25);
	let y = (Math.floor(Math.random() * 450) + 25);
	$('.target').attr('style', `transform: translate(${x}px, ${y}px)`);
}

function centerTarget(){
	$('.target').attr('style', `transform: translate(400px, 250px)`);
}

function endGame(){
	inGame = false;
	// clear any existing intervals, then remove all of them.
	intervals.forEach(x => clearInterval(x));
	intervals = [];

	showStartScreen();
	$('.prev-score').text(`${score}`);
	$('.high-score').text(`${hiScore}`);
	if(score > 0) {
		wellDone()
	} else {
		welcome();
	}
}

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

$(window).resize(function(){
	if (($(window).width() < 800) || $(window).height() < 600){	
		endGame();
		showWarningScreen();
	}	
	else if (($(window).width() >= 800) && ($(window).height() >= 600) && !inGame){
		showStartScreen();
	}
});

// screen sizing issues


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