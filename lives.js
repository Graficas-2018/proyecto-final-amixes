Lives = {
  liveMesh: null,
  liveBBox: null,
  objLoader: null
}

Lives.init = function(){
  // this.loadObjectModel();
  this.loadObj('./models/heart');
}

Lives.update = function(delta){
  this.liveBBox.update();
  // console.log("Lives update ",this.liveBBox,Car.car1BBox,Car.car2BBox);
  var liveBox = new THREE.Box3().setFromObject(this.liveBBox);
  var car1Box = new THREE.Box3().setFromObject(Car.car1BBox);
  var car2Box = new THREE.Box3().setFromObject(Car.car2BBox);
  // console.log("Lives update ",liveBox,car1Box,car2Box);
  if(car1Box.intersectsBox(liveBox)){
    console.log("intersectsBox car1");
    this.updateLive('player1Lives');
  }
  if(car2Box.intersectsBox(liveBox)){
    console.log("intersectsBox car2");
    this.updateLive('player2Lives');
  }
}

Lives.updateLive = function(player){
  this.hideHeart();
  this.changeHeartPosition();
  GameLogic[player]++;
  GameLogic.updateLives();
  setTimeout(()=>{
    this.showHeart();
  },3000);
}

Lives.loadObjectModel = function(){
  var redHeartMaterial = new THREE.MeshPhongMaterial({ color:0xc41c1c});
  var heartShape = new THREE.Shape();
  heartShape.moveTo( 25, 25 );
  heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
  heartShape.bezierCurveTo( 30, 0, 30, 35,30,35 );
  heartShape.bezierCurveTo( 30, 55, 10, 77, 25, 95 );
  heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
  heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
  heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
  var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
  var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
  this.liveMesh = new THREE.Mesh( geometry,  redHeartMaterial);

  this.liveMesh.position.set(5, 2.5, 0);
  this.liveMesh.castShadow = true;
  this.liveMesh.receiveShadow = true;
  Game.scene.add( this.liveMesh );
}

Lives.loadObj = function(modelFile){
  var mtlLoader = new THREE.MTLLoader();
  var url = `${modelFile}.mtl`;
  mtlLoader.load( url, ( materials )=>{

    materials.preload();

    if(!this.objLoader)
    this.objLoader = new THREE.OBJLoader();
    this.objLoader.setMaterials( materials );
    console.log("materials",materials);
    this.objLoader.load(
      `${modelFile}.obj`,
      (object)=>{
        // var texture = new THREE.TextureLoader().load('../models/cerberus/Cerberus_A.jpg');
        // var normalMap = new THREE.TextureLoader().load('../models/cerberus/Cerberus_N.jpg');
        // var specularMap = new THREE.TextureLoader().load('../models/cerberus/Cerberus_M.jpg');

        object.traverse(  ( child )=>{
          if ( child instanceof THREE.Mesh ){
            console.log("child",child);
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = new THREE.MeshBasicMaterial({color: 0xf51212});
            // child.material.normalMap = normalMap;
            // child.material.specularMap = specularMap;
          }
        } );

        this.liveMesh = object;
        this.liveMesh.scale.set(0.2,0.2,0.2);
        this.liveMesh.rotation.x = -Math.PI /2;

        this.liveBBox = new THREE.BoxHelper(this.liveMesh, 0x00ff00);
        this.liveBBox.update();
        this.liveBBox.visible = false;
        this.changeHeartPosition();

        Game.scene.add( this.liveMesh );
        Game.scene.add( this.liveBBox );
      }, ( xhr )=>{
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },( error )=>{// called when loading has errors
        console.log( 'An error happened' );
      });
  });
}

Lives.hideHeart = function(){
  this.liveMesh.traverse( function ( object ) { object.visible = false; } );
}

Lives.showHeart = function(){
  this.liveMesh.traverse( function ( object ) { object.visible = true; } );
}
function getRandom(){
  return Math.floor(Math.random() * (10 - (-10))) + (-10);
}
Lives.changeHeartPosition = function(){
  console.log("changeHeartPosition",this.liveMesh,new THREE.Vector3(getRandom(),getRandom(),0));
  this.liveMesh.position.set(getRandom(),0,getRandom());
  console.log("changeHeartPosition",this.liveMesh.position);
}
