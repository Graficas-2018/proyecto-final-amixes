START_COUNTER_TIME = 3;
GameLogic = {
  isPlaying: false,
}


GameLogic.init = function(){
  $('#overlay').show();
  $('#message').hide();
  $('#pauseMenu').hide();
  $('#counter').show();
  this.startNewGame();
}

function _rectChangeCounter(number){
  $('#counterNumber').text(number);
  if(number>0){
    setTimeout(()=>{
      _rectChangeCounter(--number);
    },1000);
  }else{
    $('#overlay').hide();
    $('#counter').hide();
    $('#message').show();
    $('#messageText').text('Inicio');
    setTimeout(()=>{
      $('#message').hide();
    },1000);
  }
}

GameLogic.startCounter = function(number){
  _rectChangeCounter(number);
  setTimeout(()=>{
    this.isPlaying = true;
  },START_COUNTER_TIME*1000)
}

GameLogic.startNewGame = function(){
  this.startCounter(START_COUNTER_TIME);
}
