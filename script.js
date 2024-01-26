

let buttonColours = ['green', 'red', 'yellow', 'blue'];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let started = false;

$(document).keypress(() => {
  if(!started){
    $('#level-title').text(`Level:${level}`);
    nextSequence();
    started = true;
  }
});

function playSound(color) {
  const sound = new Audio(`./sounds/${color}.mp3`);
  sound.play();
}

function animatePressed(currentColor) {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text(`Level:${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  animatePressed(randomChosenColor);
  playSound(randomChosenColor);
};

$('.btn').click((e) => {
  const userChosenColor = $(e.target).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePressed(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  e.target.blur();
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    correctMove();
  }
  else{
    wrongMove();
    startOver();
  }
}

function correctMove() {
  if(gamePattern.length === userClickedPattern.length){
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
}

function wrongMove() {
  playSound("wrong");
  $('body').addClass('game-over');
  setTimeout(() => {
    $('body').removeClass('game-over')
  }, 200);
  $('#level-title').text('Game Over, Press Any Key to Restart');
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}


