Car = {
  car1: null,
  bumper1: null,
  car2: null,
  bumper2: null
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


  var blueTextureURL = "/images/blue_texture.png";
  var map = new THREE.TextureLoader().load(blueTextureURL);
  var blueCarMaterial = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color:0xffffff, map:map }),
    .5, // Friction (0-1)
    0 // Restitution (0-1)
  );
  this.car1 = new Physijs.BoxMesh(
    new THREE.CylinderGeometry(1, 2.5, 2.5, 8),
    blueCarMaterial,
    1
  );
  this.car1.__dirtyRotation = true;
  this.car1.position.set(-5, 5, 0);
  this.car1.castShadow = true;
  this.car1.receiveShadow = true;
  Game.scene.add( this.car1 );

  var purpleTextureURL = "/images/purple_texture.png";
  map = new THREE.TextureLoader().load(purpleTextureURL);
  var purpleCarMaterial = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color:0xffffff, map:map }),
    .5, // Friction (0-1)
    0 // Restitution (0-1)
  );
  this.car2 = new Physijs.BoxMesh(
    new THREE.CylinderGeometry(1, 2.5, 2.5, 8),
    purpleCarMaterial,
    1
  );
  this.car2.__dirtyRotation = true;
  this.car2.position.set(5, 5, 0);
  this.car2.castShadow = true;
  this.car2.receiveShadow = true;
  Game.scene.add( this.car2 );

  this.loadBumpers();
}

Car.loadBumpers = function(){
  var bumperTextureURL = "/images/red_texture.png";
  var map = new THREE.TextureLoader().load(bumperTextureURL);
  var bumperMaterial = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color: 0xB20000, map:map }),
    .5, // Friction (0-1)
    0 // Restitution (0-1)
  );
  this.bumper1 = new Physijs.BoxMesh(
    new THREE.CylinderGeometry(1, 2, 2, 8),
    bumperMaterial,
    1
  );
  this.bumper1.__dirtyRotation = true;
  this.bumper1.castShadow = true;
  this.bumper1.receiveShadow = true;
  this.car1.add( this.bumper1 );
  this.bumper1.position.set(0.5, -0.23, 0);

  this.bumper2 = new Physijs.BoxMesh(
    new THREE.CylinderGeometry(1, 2, 2, 8),
    bumperMaterial,
    1
  );
  this.bumper2.__dirtyRotation = true;
  this.bumper2.castShadow = true;
  this.bumper2.receiveShadow = true;
  this.car2.add( this.bumper2 );
  this.bumper2.position.set(0.5, -0.23, 0);
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
    var force_vector = new THREE.Vector3(10, 0, 0);
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
    var force_vector = new THREE.Vector3(-10, 0, 0);
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
    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.extractRotation(Car.car2.matrix);
    var force_vector = new THREE.Vector3(10, 0, 0);
    var final_vector = force_vector.applyMatrix4(rotationMatrix);
    console.log('Final vector:', final_vector);
    final_vector.x -= .35;
    Car.car2.applyCentralImpulse(final_vector);
  }
  else if (key == 'k'){
    // Move Backwards
    console.log('Car 2 Move Backwards');
    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.extractRotation(Car.car2.matrix);
    var force_vector = new THREE.Vector3(-10, 0, 0);
    var final_vector = force_vector.applyMatrix4(rotationMatrix);
    final_vector.x -= .35;
    Car.car2.applyCentralImpulse(final_vector);
  }
  else if (key == 'j'){
    // Rotate Left
    console.log('Car 2 Rotate Left');
    Car.car2.rotateY(.1);
    Car.car2.__dirtyRotation = true;
    console.log(Car.car2.rotation);
  }
  else if (key == 'l'){
    // Rotate Right
    console.log('Car 2 Rotate Right');
    Car.car2.rotateY(-.1);
    Car.car2.__dirtyRotation = true;
    console.log(Car.car2.rotation);
  }
}
