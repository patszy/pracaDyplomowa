import * as THREE from 'three';

class Game {
  constructor({
//GAME COLORS
    white = `#f8f9fa`,
    black = `#04080f`,
    red = `#780000`,
    green = `#004b23`,
    blue = `#07c8f9`,
    skyblue = `#e3f2fd`,
    yellow = `#ffe169`,
    gray = `#6c757d`,

//GAME VARIABLES
    playStatus = true,
    initMapSpeed = 0,
    initHeroPosition = new THREE.Vector3(0, 0, 0),
    levelUpMapSpeed = 0,
    mapMaxHeight = 3,
    levelUpMapHeight = 1,
    initMapMaxHeight = 1,
    initStats = {
      health: 100,
      level: 1,
      score: 0,
    },
    keys = {
      go: false,
      jump: false
    },

//THREE VARIABLES
    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    viewAngle = 75,
    minGenerationField = 1,
    maxGenerationField = 1000,
    cameraPositon = new THREE.Vector3(-100, 50, 0),
    cameraLookAt = new THREE.Vector3(0, 15, 0),
    lights = {
      ambientLight: {color: `#f8f9fa`, strength: .3},
      shadowLight: {
        color: `#f8f9fa`,
        strength: 5,
        position: new THREE.Vector3(-100, 200, 200),
        left: -300,
        right: 300,
        top: 300,
        bottom: -300,
        near: 1,
        far: 1000,
        shadowDetails: 2048,
      },
    },
    fog = {
      color: `#f8f9fa`,
      near: 0,
      far: 500,
    }
  }){

//GAME COLORS
    this.white = white,
    this.black = black,
    this.red = red,
    this.green = green,
    this.blue = blue,
    this.skyblue = skyblue,
    this.yellow = yellow,
    this.gray = gray,
    

//THREE VARIABLES
    this.WIDTH = WIDTH,
    this.HEIGHT = HEIGHT,
    this.aspectRatio = this.WIDTH / this.HEIGHT;
    this.viewAngle = viewAngle,
    this.minGenerationField = minGenerationField,
    this.maxGenerationField = maxGenerationField,
    this.cameraPositon = cameraPositon;
    this.cameraLookAt = cameraLookAt;
    this.lights = lights;
    this.fog = fog;
  
//GAME VARIABLES
    this.playStatus = playStatus;
    this.initMapSpeed = initMapSpeed;
    this.initHeroPosition = initHeroPosition;
    this.levelUpMapSpeed = levelUpMapSpeed;
    this.mapMaxHeight = mapMaxHeight;
    this.levelUpMapHeight = levelUpMapHeight;
    this.initMapMaxHeight = initMapMaxHeight;
    this.initStats = initStats;
    this.stats = {...initStats};
    this.levelValue = document.getElementById(`levelValue`);
    this.scoreValue = document.getElementById(`scoreValue`);
    this.hpBar = document.getElementById(`hpBar`);
    this.hpValue = document.getElementById(`hpValue`);
    this.messageRestart = document.getElementById(`restartMessage`);
    this.keys = keys;
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(this.viewAngle, this.aspectRatio, this.minGenerationField, this.maxGenerationField);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    this.scene.background = new THREE.Color(this.fog.color);
    this.scene.fog = new THREE.Fog(this.fog.color, this.fog.near, this.fog.far);
    this.camera.position.set(...this.cameraPositon);
    this.camera.lookAt(this.cameraLookAt);

    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    window.addEventListener(`resize`, () => this.handleWindowResize(this.camera, this.renderer), false);
    window.addEventListener('keydown', (event) => this.handleKeyDown(event));
    window.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  createLights() {
    this.ambientLight = new THREE.AmbientLight(this.lights.ambientLight.color, this.lights.ambientLight.strength);
    this.shadowLight = new THREE.DirectionalLight(this.lights.shadowLight.color, this.lights.shadowLight.strength);

    this.shadowLight.position.set(...this.lights.shadowLight.position);
    this.shadowLight.castShadow = true;
    this.shadowLight.shadow.camera.left = this.lights.shadowLight.left;
    this.shadowLight.shadow.camera.right = this.lights.shadowLight.right;
    this.shadowLight.shadow.camera.top = this.lights.shadowLight.top;
    this.shadowLight.shadow.camera.bottom = this.lights.shadowLight.bottom;
    this.shadowLight.shadow.camera.near = this.lights.shadowLight.near;
    this.shadowLight.shadow.camera.far = this.lights.shadowLight.far;
    this.shadowLight.shadow.mapSize.width = this.lights.shadowLight.shadowDetails;
    this.shadowLight.shadow.mapSize.height = this.lights.shadowLight.shadowDetails;

    this.scene.add(this.ambientLight, this.shadowLight);
  }

  updateWindowSize() {
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;
    this.aspectRatio = this.WIDTH / this.HEIGHT;
  }

  handleWindowResize(camera, renderer) {
    this.updateWindowSize();
    renderer.setSize(this.WIDTH, this.HEIGHT);
    camera.aspect = this.aspectRatio;
    camera.updateProjectionMatrix();
  }

  handleKeyDown(event) {
    switch (event.code) {
      case 'Space':
        this.keys.jump = true;
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.code) {
      case 'Space':
        this.keys.jump = false;
        break;
    }
  }

  startGame(map, hero, gem) {
    map.maxHeight = this.initMapMaxHeight;
    map.reset();
    map.rotationSpeed = this.initMapSpeed;
    hero.velocity = new THREE.Vector3(0,0,0);
    hero.mesh.position.set(...this.initHeroPosition);    
    gem.spawn(map);

    this.stats = {...this.initStats};
    this.messageRestart.style.display = `none`;
    this.scoreValue.innerText = this.stats.score;
    this.levelValue.innerText = this.stats.level;
    this.hpValue.innerText = this.hpBar.style.width = `${this.stats.health}%`;
    this.playStatus = true;
  }

  stopGame(map, hero) {
    hero.velocity = new THREE.Vector3(-.2, 0, -.3-map.rotationSpeed);
    this.messageRestart.style.display = `block`;
    this.playStatus = false;
  }

  updateScore(value){
    this.stats.score = this.stats.score + value;
    this.scoreValue.innerText = Math.floor(this.stats.score);
  }

  updateLevel(map){
    this.stats.level++;
    this.levelValue.innerText = this.stats.level;
    map.rotationSpeed += this.levelUpMapSpeed;
    map.maxHeight = (map.maxHeight+this.levelUpMapHeight >= this.mapMaxHeight) ? this.mapMaxHeight : map.maxHeight + this.levelUpMapHeight;
  }

  updateHealth() {
    this.stats.health = 0;
    this.hpValue.innerText = this.hpBar.style.width = `${this.stats.health}%`;
    if(this.stats.health < 0 ) this.hpValue.innerText = this.hpBar.style.width = `0%`;
  }

  checkNoHealth(map, hero) {
    if(this.stats.health <= 0) this.stopGame(map, hero);
  }
}

export default Game;