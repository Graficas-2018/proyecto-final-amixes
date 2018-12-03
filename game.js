START_COUNTER_TIME = 3;
GameLogic = {
  isPlaying: false,
  isStarted: false,
  gameType: '',
  player1Name: '',
  player2Name: '',
  player1Lives: 1,
  player2Lives: 1,
}
GameLogic.showBox = function(submenu){
  $('#boxContainer').show();
  $('#overlay').show();
  $(submenu).show();
}
GameLogic.hideBox = function(){
  $('#boxContainer').hide();
  $('#overlay').hide();
  $('#mainMenu').hide();
  $('#message').hide();
  $('#pauseMenu').hide();
  $('#counter').hide();
  $('#gameOverText').hide();
}
GameLogic.init = function(){
  this.hideBox();
  console.log("GameLogic.init",Game.debug);
  $('#gameUi').hide();
  if(!Game.debug)
  this.showBox('#mainMenu');
  this.initClicks();
}
GameLogic.initClicks = function(){
  $('#continueButton').click(()=>this.hideBox());
  $('.typeButton').click((event)=>{
    console.log("click item",event);
    $('.typeButton').removeClass('selected');
    $(event.target).addClass('selected');
  });

  $('#playButton').click((event)=>{
    this.gameType = $('.typeButton.selected').attr('data');console.log("$('.typeButton.selected')",this.gameType);
    this.player1Name = $('#player1Name').val();console.log("$('#player1Name')",this.player1Name);
    this.player2Name = $('#player2Name').val();console.log("$('#player2Name')",this.player2Name);
    if(!this.gameType || !this.player1Name || !this.player2Name){
      $('#mainErrorMessage').text('Faltan datos');
    }else{
      $('#mainErrorMessage').text('');
      this.hideBox();
      this.startNewGame();
    }
  });

  $('.resetButton').click((event)=>{
    console.log("resetButton click");
    this.restartGame();
  });
  $('.exitButton').click((event)=>{
    console.log("exitButton click");
    this.resetGame();
  });
}

GameLogic._rectChangeCounter =  function (number){
  $('#counterNumber').text(number);
  if(number>0){
    setTimeout(()=>{
      this._rectChangeCounter(--number);
    },1000);
  }else{
    this.hideBox();
    this.showMessage('Inicio!', true);
  }
}

GameLogic.startCounter = function(number){
  this.showBox('#counter');
  this._rectChangeCounter(number);
  setTimeout(()=>{
    this.isPlaying = true;
  },START_COUNTER_TIME*1000)
}

GameLogic.startNewGame = function(){
  console.log("this.gameType",this.gameType);
  if(this.gameType == 'vidas'){
    this.player1Lives = 3;
    this.player2Lives = 3;
    $('.livesConatiner').show();
  }else{
    this.player1Lives = 1;
    this.player2Lives = 1;
    $('.livesConatiner').hide();
  }

  $('#player1Label').text(this.player1Name);
  $('#player2Label').text(this.player2Name);
  $('#player1LivesLabel').text(this.player1Lives);
  $('#player2LivesLabel').text(this.player2Lives);
  this.isStarted = true;
  $('#gameUi').show();
  this.startCounter(START_COUNTER_TIME);
  $(document).keypress(event=>{
    // console.log("keypress",event);
    let key = event.originalEvent.key;
    if(key =='p'|| key =='P')
    this.openPause();
  });
}

GameLogic.updateLives = function(){
  $('#player1LivesLabel').text(this.player1Lives);
  $('#player2LivesLabel').text(this.player2Lives);
  if(this.player1Lives == 0)
    return this.gameOver(this.player2Name);
  if(this.player2Lives == 0)
    return this.gameOver(this.player1Name);
}

GameLogic.showMessage = function(message,autohide){
  // show message
  this.showBox('#message');
  $('#messageText').text(message);
  if(autohide)
  setTimeout(()=>{
    this.hideBox();
  },1000);
}

GameLogic.gameOver = function(winner){
  // show message
  this.isStarted = false;
  this.isPlaying = false;
  this.showBox('#gameOverText');
  $('#winnerText').text(winner);
}

GameLogic.restartGame = function(){
  this.isPlaying = false;
  this.isStarted = false;
  this.hideBox();
  // start new game
  this.startNewGame();
}

GameLogic.resetGame = function(){
  this.isPlaying = false;
  this.isStarted = false;
  // Open main menu
  this.hideBox();
  this.showBox('#mainMenu');
}

GameLogic.openPause = function(){
  this.showBox('#pauseMenu');
}

GameLogic.update = function(delta){
  if(!GameLogic.isStarted)
  console.log("firstUpdate");
  GameLogic.isStarted = GameLogic.isStarted?GameLogic.isStarted:true;
}
