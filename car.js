Car = {
  car1: null,
  car2: null
}

Car.init = function(){
  if(Car.debug)
  console.log("Debugeando");

  document.addEventListener("keypress", keyPressed, false);
  this.loadCar();
}

Car.update = function(delta){
}

Car.loadCar = function(){
  var textureUrl = "./images/car.png";
  var texture = new THREE.TextureLoader().load(textureUrl);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  var geometry = new THREE.CubeGeometry(3, 3, 3);
  // And put the geometry and material together into a mesh
  this.car1 = new THREE.Mesh(geometry, material);
  this.car1.position.set(0, 1.5, 0);
  this.car1.castShadow = true;
  this.car1.receiveShadow = true;
  Game.scene.add( this.car1 );
}

function keyPressed(e)
{
  var key = e.key.toLowerCase();
  if (key == 'w'){
    // Move Forward
    console.log('Move Forward');
  }
  else if (key == 's'){
    // Move Backwards
    console.log('Move Backwards');
  }
  else if (key == 'a'){
    // Rotate Left
    console.log('Rotate Left');
  }
  else if (key == 'd'){
    // Rotate Right
    console.log('Rotate Right');
  }
}
