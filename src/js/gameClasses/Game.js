import * as THREE from 'three';

class Game {
  constructor({
//GAME COLORS
    white = `#f8f9fa`,
    black = `#212529`,
    red = `#a4161a`,
    green = `#40916c`,
    blue = `#219ebc`,
    gray = `#6c757d`,

//GAME VARIABLES
    playStatus = true,
    initialMapSpeed = 0,
    initialHeroPosition = new THREE.Vector3(0, 0, 0),
    levelUpMapSpeed = 0,
    levelUpSpeed = 1,
    health = 0,
    level = 1,
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
    cameraVars = {
      position: new THREE.Vector3(-100, 100, 50),
      lookAt: new THREE.Vector3(0, 50, 0)
    },
    lights = {
      ambientLight: {color: `#212529`, strength: 0.5},
      hemisphereLight: {skyColor: `#f8f9fa`, groundColor: `#212529`, strength: 0.5},
      shadowLight: {
        color: `#f8f9fa`,
        strength: 1,
        position: new THREE.Vector3(100, 300, 300),
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
      near: 200,
      far: 500,
    }
  }){

//GAME COLORS
    this.white = white,
    this.black = black,
    this.red = red,
    this.green = green,
    this.blue = blue,
    this.gray = gray,
    

//THREE VARIABLES
    this.WIDTH = WIDTH,
    this.HEIGHT = HEIGHT,
    this.aspectRatio = this.WIDTH / this.HEIGHT;
    this.viewAngle = viewAngle,
    this.minGenerationField = minGenerationField,
    this.maxGenerationField = maxGenerationField,
    this.cameraVars = cameraVars;
    this.lights = lights;
    this.fog = fog;
  
//GAME VARIABLES
    this.playStatus = playStatus;
    this.initialMapSpeed = initialMapSpeed;
    this.initialHeroPosition = initialHeroPosition;
    this.levelUpMapSpeed = levelUpMapSpeed;
    this.levelUpSpeed = levelUpSpeed;
    this.health = health;
    this.level = level;
    this.score = 0;
    this.levelValue = document.getElementById(`levelValue`);
    this.scoreValue = document.getElementById(`scoreValue`);
    this.scoreBar = document.getElementById(`hpBar`);
    this.hpValue = document.getElementById(`hpValue`);
    this.messageRestart = document.getElementById(`restartMessage`);
    this.keys = keys;
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(this.viewAngle, this.aspectRatio, this.minGenerationField, this.maxGenerationField);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    this.scene.fog = new THREE.Fog(this.fog.color, this.fog.near, this.fog.far);
    this.camera.position.set(...this.cameraVars.position);
    this.camera.lookAt(this.cameraVars.lookAt);

    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    window.addEventListener(`resize`, () => this.handleWindowResize(this.camera, this.renderer), false);
    window.addEventListener('keydown', (event) => this.handleKeyDown(event));
    window.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  createLights() {
    this.ambientLight = new THREE.AmbientLight(this.lights.ambientLight.color, this.lights.ambientLight.strength);
    this.hemisphereLight = new THREE.HemisphereLight(this.lights.hemisphereLight.skyColor, this.lights.hemisphereLight.groundColor, this.lights.hemisphereLight.strength);
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

    this.scene.add(this.ambientLight, this.hemisphereLight, this.shadowLight);
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
      case 'KeyW':
        this.keys.go = true;
        break;
      case 'Space':
        this.keys.jump = true;
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.code) {
      case 'KeyW':
        this.keys.go = false;
        break;
      case 'Space':
        this.keys.jump = false;
        break;
    }
  }

  startGame(map, hero) {
    hero.mesh.position.set(...this.initialHeroPosition);
    map.rotationSpeed = this.initialMapSpeed;
    this.health = 100;
    this.score = 0;
    this.level = 1;
    this.messageRestart.style.display = `none`;
    this.scoreValue.innerText = this.score;
    this.levelValue.innerText = this.level;
    this.hpValue.innerText = this.scoreBar.style.width = `${this.health}%`;
    this.playStatus = true;
  }

  stopGame(hero) {
    hero.mesh.position.x -= 2;
    hero.mesh.position.z += 5;
    this.messageRestart.style.display = `block`;
    this.playStatus = false;
  }

  updateScore(map) {
    this.score++;
    this.scoreValue.innerText = this.score;
    if(this.score % this.levelUpSpeed == 0) {
      this.level ++;
      map.rotationSpeed += this.levelUpMapSpeed;
      this.levelValue.innerText = this.level;
    }
  }

  updateHealth(rock) {
    this.health -= Math.round(rock.radius);
    this.hpValue.innerText = this.scoreBar.style.width = `${this.health}%`;
    if(this.health < 0 ) this.hpValue.innerText = this.scoreBar.style.width = `0%`;
  }
}

export default Game;