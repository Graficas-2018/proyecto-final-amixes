Car = {}

Car.init = function(){
  if(Car.debug)
  console.log("Debugeando");
  gameThis = Game.this;
}

Car.update = function(delta){
  gameThis.isPlaying = true;
}
