var Game = {};

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
  this.scene = new THREE.Scene();

  this.camera = new THREE.PerspectiveCamera(
      70, WIDTH/HEIGHT, 1, 10000);
  this.camera.position.z = 5;
  this.camera.position.y = 5;
  this.camera.position.x = 5;
  this.camera.lookAt(this.scene.position); // point at origin

  // create ground and axis / grid helpers
  var ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100),
      new THREE.MeshBasicMaterial({color: 0xcccccc}));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.01; // to avoid z-fighting with axis and shadows
  this.scene.add(ground);
  this.scene.add((new THREE.AxesHelper(5)));



  this.orbitControls = new THREE.OrbitControls(this.camera);


  // funcion para activar el debug
  document.addEventListener('keyup', function (event) {
      if (event.keyCode === 27) { // listen for Esc Key
          event.preventDefault();
          this.toggleDebug();
      }
  }.bind(this));

  // start up game
  this.init();
  window.requestAnimationFrame(this.tick);
}

// Esta funcion la conocemos como run()
// Usar update() para implementación
Game.tick = function (elapsed) {
    window.requestAnimationFrame(this.tick);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    this.update(delta);
    this.renderer.render(this.scene, this.camera);
}.bind(Game);

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
}

// Inicializacion inical
Game.init = function () {
  this.debug = false;
  GameLogic.init();
  Car.init();
  Interactions.init();
};

window.onload = function () {
    Game.run();
};
