Car = {
  car1: null,
  car2: null
}

Car.init = function(){
  if(Car.debug)
  console.log("Debugeando");

  document.addEventListener("keypress", keyPressed, false);
  loadCar();
}

Car.update = function(delta){
}

function loadCar()
{
  var textureUrl = "./images/car.png";
  var texture = new THREE.TextureLoader().load(textureUrl);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  var geometry = new THREE.CubeGeometry(4, 4, 4);
  // And put the geometry and material together into a mesh
  this.car1 = new THREE.Mesh(geometry, material);
  car1.position.set(0, 4, 0);
  car1.castShadow = true;
  car1.receiveShadow = true;
  Game.scene.add( car1 );
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
