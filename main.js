var Game = {
  debug: false,
};

Game.run = function () {
  var WIDTH = 1280;
  var HEIGHT = 720;

  this._previousElapsed = 0;

  // setup a WebGL renderer within an existing canvas
  var canvas = document.getElementById('webglcanvas');
  this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  // this.renderer.setViewport(0, -250, WIDTH, HEIGHT);
  this.renderer.setSize(WIDTH, HEIGHT);

  // // Turn on shadows
  // renderer.shadowMap.enabled = true;
  // // Options are THREE.BasicShadowMap, THREE.PCFShadowMap, PCFSoftShadowMap
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // create the scene
  this.scene = new Physijs.Scene();
  this.scene.setGravity(new THREE.Vector3( 0, -20, 0 ));

  this.camera = new THREE.PerspectiveCamera(
      70, WIDTH/HEIGHT, 1, 10000);
  this.camera.position.z = 20;
  this.camera.position.y = 35;
  // this.camera.position.x = 5;
  this.camera.lookAt(this.scene.position); // point at origin
  var bgUrl = "./images/milkyway.png";
  var backgroundImg = new THREE.TextureLoader().load(bgUrl);
  backgroundImg.wrapS = backgroundImg.wrapT = THREE.RepeatWrapping;
  backgroundImg.repeat.set(1, 1);
  this.scene.background = backgroundImg;
  var ambientLight = null;
  var spotLight = null;
  var directionalLight = null;
  // Add a directional light to show off the object
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1);

    // Create and add all the lights
    directionalLight.position.set(.5, 0, 3);
    this.camera.add(directionalLight);

    pointLight = new THREE.PointLight (0x0000ff, 1, 20);
    pointLight.position.set(-5, 2, -10);
    this.camera.add(pointLight);

    spotLight = new THREE.SpotLight (0x00ff00);
    spotLight.position.set(2, 2, 5);
    spotLight.target.position.set(2, 0, 4);
    this.camera.add(spotLight);

    ambientLight = new THREE.AmbientLight ( 0x888888 );
    this.camera.add(ambientLight);

    //spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    //spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
  //this.camera.add(spotLight);
  var groundTextureUrl = "/images/platform.png";
  var map = new THREE.TextureLoader().load(groundTextureUrl);
  var ground_material = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({color: 0xcccccc, map:map}),
    1, // high friction
    0 // low restitution
  );

  var ground_geometry = new THREE.PlaneGeometry( 60, 60 );
  ground_geometry.computeFaceNormals();
  ground_geometry.computeVertexNormals();

  // create ground and axis / grid helpers
  // var ground = new Physijs.ConvexMesh(ground_geometry,
  //                                     ground_material);
  //
  var ground = new Physijs.HeightfieldMesh(
      ground_geometry,
      ground_material,
      0 // mass
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.01; // to avoid z-fighting with axis and shadows
  this.scene.add(ground);
  if(this.debug)
  this.scene.add((new THREE.AxesHelper(5)));

  if(this.debug)
  this.orbitControls = new THREE.OrbitControls(this.camera);


  // funcion para activar el debug
  document.addEventListener('keyup', (event)=>{
      if (event.keyCode === 27) { // listen for Esc Key
          event.preventDefault();
          this.debug = !this.debug;
      }
  });

  // start up game
  this.init();
  window.requestAnimationFrame(this.tick);
}

// Esta funcion la conocemos como run()
// Usar update() para implementación
Game.tick = function (elapsed) {
  // console.log("this tik",this);
    window.requestAnimationFrame(this.tick);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    if(GameLogic.isStarted || this.debug){
      this.update(delta);
      this.scene.simulate();
      this.renderer.render(this.scene, this.camera);
    }
}.bind(Game); // need binding because is passed to "requestAnimationFrame" function

Game.materials = {
    shadow: new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.5
    }),
    solid: new THREE.MeshNormalMaterial({}),
    colliding: new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5
    }),
    dot: new THREE.MeshBasicMaterial({
        color: 0x0000ff
    })
};

// Se ejecuta constantemente
Game.update = function (delta) {// old animate funtion
  if(!GameLogic.isPlaying)
  return;
  GameLogic.update(delta);
  Car.update(delta);
  Interactions.update(delta);
  Lives.update(delta);
}

// Inicializacion inical
Game.init = function () {
  GameLogic.init();
  Car.init();
  Interactions.init();
  Lives.init();
};

window.onload = function () {
    Game.run();
};
