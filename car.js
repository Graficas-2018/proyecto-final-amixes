Car = {
  car1: null,
  car2: null
}

Car.init = function(){
  if(Car.debug)
  console.log("Debugeando");

  this.loadCar();
}

Car.update = function(delta){
  document.addEventListener("keypress", this.keyPressed, false);
}

Car.loadCar = function(){
  // console.log('This update:',this.update);
  var textureUrl = "./images/car.png";

  var texture = new THREE.TextureLoader().load(textureUrl);
  // var material = new THREE.MeshBasicMaterial({ map: texture });
  // var geometry = new THREE.CubeGeometry(3, 3, 3);
  // // And put the geometry and material together into a mesh
  // this.car1 = new THREE.Mesh(geometry, material);

  var carMaterial = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color: 0x1919FF }),
    .5, // Friction (0-1)
    0 // Restitution (0-1)
  );
  this.car1 = new Physijs.BoxMesh(
    new THREE.CylinderGeometry(1, 2.5, 2.5, 8),
    carMaterial,
    1
  );
  this.car1.__dirtyRotation = true;
  this.car1.position.set(0, 5, 0);
  this.car1.castShadow = true;
  this.car1.receiveShadow = true;
  Game.scene.add( this.car1 );
}

Car.keyPressed = function(e) {
  var key = e.key.toLowerCase();
  if (key == 'w'){
    // Move Forward
    console.log('Car 1 Move Forward');
    // Car.car1.applyCentralImpulse({x:Car.car1.position.x+5,y:Car.car1.position.y,z:Car.car1.position.z});
    // Car.car1.applyCentralImpulse(Car.car1.matrix.multiplyVector3(new THREE.Vector3(5,0,0)));
    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.extractRotation(Car.car1.matrix);
    var force_vector = new THREE.Vector3(1, 0, 0);
    var final_vector = force_vector.applyMatrix4(rotationMatrix);
    console.log('Final vector:', final_vector);
    final_vector.x -= .35;
    Car.car1.applyCentralImpulse(final_vector);

  }
  else if (key == 's'){
    // Move BackwardsmultiplyVector3
    console.log('Car 1 Move Backwards');
    // Car.car1.applyCentralImpulse({x:Car.car1.position.x,y:Car.car1.position.y,z:Car.car1.position.z-5});
    // Car.car1.applyCentralImpulse(Car.car1.matrix.multiplyVector3(new THREE.Vector3(-5,0,0)));
    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.extractRotation(Car.car1.matrix);
    var force_vector = new THREE.Vector3(-1, 0, 0);
    var final_vector = force_vector.applyMatrix4(rotationMatrix);
    final_vector.x -= .35;
    Car.car1.applyCentralImpulse(final_vector);
  }
  else if (key == 'a'){
    // Rotate Left
    console.log('this 1 Rotate Left');
    Car.car1.rotateY(.1);
    Car.car1.__dirtyRotation = true;
    console.log(Car.car1.rotation);
  }
  else if (key == 'd'){
    // Rotate Right
    console.log('Car 1 Rotate Right');
    Car.car1.rotateY(-.1);
    Car.car1.__dirtyRotation = true;
    console.log(Car.car1.rotation);
  }

  if (key == 'i'){
    // Move Forward
    console.log('Car 2 Move Forward');
  }
  else if (key == 'k'){
    // Move Backwards
    console.log('Car 2 Move Backwards');
  }
  else if (key == 'j'){
    // Rotate Left
    console.log('Car 2 Rotate Left');
  }
  else if (key == 'l'){
    // Rotate Right
    console.log('Car 2 Rotate Right');
  }
}
