Interactions = {
  testCube: null,
}

Interactions.init = function(){
  if(Interactions.debug)
  console.log("Debugeando");
  this.loadTest();
}

Interactions.update = function(delta){
  // checkCarCollision();
}

Interactions.loadTest = function(){
  this.testCube = Car.car1.clone();
  this.testCube.position.set(0, 1.5, 5);
  Game.scene.add(this.testCube);
}

function checkCarCollision()
{
  var carbox1 = new THREE.Box3().setFromObject(Car.car1);
  var carbox2 = new THREE.Box3().setFromObject(Car.car2);

  if (carbox1.intersectsBox(carbox2)){
    console.log('CAR COLLISION');
  }
}
