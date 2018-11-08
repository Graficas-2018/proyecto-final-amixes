var Game = {};

Game.run = function () {
  var WIDTH = 512;
  var HEIGHT = 512;

  this._previousElapsed = 0;

  // setup a WebGL renderer within an existing canvas
  var canvas = document.getElementById('webglcanvas');
  this.renderer = new THREE.WebGLRenderer({canvas: canvas});
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  this.renderer.setViewport(0, 0, WIDTH, HEIGHT);

  // create the scene
  this.scene = new THREE.Scene();

  // create an isometric camera
  this.camera = new THREE.OrthographicCamera(
      -5, 5, 5, -5, -1, 100);
  this.camera.position.z = 5;
  this.camera.position.y = 5;
  this.camera.position.x = 5;
  this.camera.lookAt(this.scene.position); // point at origin

  // Aquí agregar mapa


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
  Car.update(delta);
}

// Inicializacion inical
Game.init = function () {
  this.debug = false;
  Car.init();
};

window.onload = function () {
    Game.run();
};
