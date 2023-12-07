import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Game from './Game';
import Map from './Map';
import Hero from './Hero';
import Rock from './Rock';
import Gem from './Gem';
import { handleWindowResize, drawRandom } from './functions';


//INIT COLORS

const Colors = {
  white: `#f8f9fa`,
  black: `#212529`,
  red: `#a4161a`,
  green: `#40916c`,
  blue: `#219ebc`,

  brown: `#99582a`,
  pink: `#ff8fa3`,
  brownDark: `#432818`,
  gray: `#6c757d`,
};

//THREE.JS NECESSARY VARIABLES

let scene,
    camera, viewAngle, aspectRatio, minGenerationField, maxGenerationField,
    renderer,
    controls,
    ambientLight, hemisphereLight, pointLight;

//INIT SCENE, CAMERA, RENDERER, WINDOW RESIZE

const createScene = () => {
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  aspectRatio = WIDTH / HEIGHT;
  viewAngle = 75;
  minGenerationField = 1;
  maxGenerationField = 1000;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(viewAngle, aspectRatio, minGenerationField, maxGenerationField);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  controls = new OrbitControls(camera, renderer.domElement);

  scene.fog = new THREE.Fog(Colors.gray, 100, 500);
  camera.position.set(-100, 100, 50);
  camera.lookAt(0, 50, 0);

  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  window.addEventListener(`resize`, () => handleWindowResize(camera, renderer), false);
}

//LIGHTS

const createLights = () => {
  
  ambientLight = new THREE.AmbientLight(Colors.pink, .5);
  hemisphereLight = new THREE.HemisphereLight(Colors.gray, Colors.black, 1);
  pointLight = new THREE.DirectionalLight(Colors.white, 1);

  pointLight.position.set(150, 350, 350);
  pointLight.castShadow = true;
  pointLight.shadow.camera.left = -400;
  pointLight.shadow.camera.right = 400;
  pointLight.shadow.camera.top = 400;
  pointLight.shadow.camera.bottom = -400;
  pointLight.shadow.camera.near = minGenerationField;
  pointLight.shadow.camera.far = maxGenerationField;
  pointLight.shadow.mapSize.width = 4096;
  pointLight.shadow.mapSize.height = 4096;

  scene.add(ambientLight, hemisphereLight, pointLight);
}

//INIT GAME, HERO, MAP, ROCK, GEM

let game, map, hero, rock, gem;

const createGame = () => {
  game = new Game({
    initialMapSpeed: 0.01,
    levelUpMapSpeed: 0.001,
    health: 100,
  });
}

const createMap = () =>{
  map = new Map({
    radius: 300,
    details: 50,
    color: Colors.green,
    rotationSpeed: game.initialMapSpeed,
    gravity: 0.5
  });
  map.setHorizontally();
  map.mesh.position.y -= map.radius;
  map.getSides();
  scene.add(map.mesh);
}

const createHero = () =>{
  hero = new Hero({
    radius: 10,
    details: 2 ,
    color: Colors.red,
    speed: 0.02,
    jumpStrength: 7,
    bounciness: .7 
  });
  hero.setRotationSpeed(map);
  hero.mesh.position.y += hero.radius*2;
  game.initialHeroPosition = new THREE.Vector3(hero.mesh.position.x, hero.mesh.position.y, hero.mesh.position.z);
  scene.add(hero.mesh);
}

const createRock = () =>{
  rock= new Rock({
    radius: drawRandom(hero.radius, hero.jumpStrength*3),
    color: Colors.gray,
    rotationCenter: new THREE.Vector3(map.mesh.position.x, map.mesh.position.y, map.mesh.position.z),
    startAngle: drawRandom(270, 360)
  });
  rock.aboveMapHeight = drawRandom(-rock.radius/2, rock.radius/2),
  scene.add(rock.mesh);
}

const createGem = () =>{
  gem = new Gem({
    radius: 5,
    color: Colors.blue,
    rotationSpeed: 0.03,
    rotationCenter: new THREE.Vector3(map.mesh.position.x, map.mesh.position.y, map.mesh.position.z),
    aboveMapHeight: drawRandom(hero.radius*3, 60),
    startAngle: drawRandom(270, 360)
  });
  scene.add(gem.mesh);
}

//EVENT LISTENERS

const Keys = {
  w: {
    pressed: false
  },
  space: {
    pressed: false
  }
};

window.addEventListener('keydown', (event) => {
  switch(event.code) {
    case 'KeyW' : 
      Keys.w.pressed = true;
      break;
    case 'Space' :
      Keys.space.pressed = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch(event.code) {
    case 'KeyW' : 
      Keys.w.pressed = false;
      break;
    case 'Space' : 
      Keys.space.pressed = false;
      break;
  }
});

//ANIMATION LOOP

const animate = () => {
  map.updatePosition();
  hero.updatePosition(map, game, Keys);
  rock.updatePosition(map, hero, game);
  gem.updatePosition(map, hero, game);
  renderer.render( scene, camera );
  requestAnimationFrame(animate);
}

const init = () => {
  createGame();
  createScene();
  createLights();
  createMap();
  createHero();
  createRock();
  createGem();

  animate();
}

export default init;
