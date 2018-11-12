Interactions = {
  testCube: null,
}

Interactions.init = function(){
  if(Interactions.debug)
  console.log("Debugeando");
}

Interactions.update = function(delta){
  // checkCarCollision();
}

function checkCarCollision()
{
  var carbox1 = new THREE.Box3().setFromObject(Car.car1);
  var carbox2 = new THREE.Box3().setFromObject(Car.car2);

  if (carbox1.intersectsBox(carbox2)){
    console.log('CAR COLLISION');
  }
}
