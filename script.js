// set up the custom cursor
// $(document).mousemove(e => {
// 	$('.cursor').attr("style", `top: ${+e.pageY - 5}px; left: ${+e.pageX -5}px;`);
// });

// loading the default DOM values
$( document ).ready(function() {
	$('.prev-score').text('0');
	$('.high-score').text(`${hiScore}`);
	if (($(window).width() < 800) || $(window).height() < 600){	
		renderWarning();
	}	
});

// game code begins
var score = 0;
var hiScore = 0;
var gameScore = [];
var playedYet = false;
var inGame = false;
var intervals = [];

$('#start-btn').click(e => {
	startGame();
});

$('#stop-btn').click(e => {
	endGame();
})

function startGame(){
	inGame = true;
	showPlayingScreen();
	moveTarget();
	$('.current-score').text(`0`);
	score = 0;
	gameScore = [];	
	
	if(!playedYet){
		$('.target').click(function(e) {
			moveTarget();
			updateScores();
		});
		playedYet = true;
	}
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

function endGame(){
	intervals.forEach(x => clearInterval(x));
	intervals = [];
		// clear any existing intervals, then remove all of them.
	inGame = false;
	showStartScreen();
	$('#greeting').text('Well done!');
	$('.prev-score').text(`${score}`);
	$('.high-score').text(`${hiScore}`);
}

function showStartScreen(){
	$('.game-display').attr('style', 'display: none');
	$('.game').attr('style', 'display: none');
	$('.game-screen').attr('style', 'display: none')
	$('#smile').attr('style', 'display: block');
	$('.start-menu').attr('style', 'display: flex');
}

function showPlayingScreen(){
	$('.game-display').attr('style', 'display: flex');
	$('.game').attr('style', 'display: block');
	$('.game-screen').attr('style', 'display: block')
	$('#smile').attr('style', 'display: none');
	$('.start-menu').attr('style', 'display: none');
}

$(window).resize(function(){
	if (($(window).width() < 800) || $(window).height() < 600){	
		endGame();
		renderWarning();
	}	
	else if (($(window).width() >= 800) && $(window).height() >= 600){
		renderContainer();
	}
});

// screen sizing issues
function renderWarning(){
	$('.container').attr('style', 'display: none');
	$('.error-screen').attr('style', 'display: flex');
}

function renderContainer(){
	$('.container').attr('style', 'display: flex');
	$('.error-screen').attr('style', 'display: none');
}


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