import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Game from './Game';
import Map from './Map';
import Hero from './Hero';
import { mapBorderDetect, handleWindowResize } from './functions';

const init = () => {
  const Colors = {
    red: `#c1121f`,
    white: `#f8f9fa`,
    brown: `#99582a`,
    pink: `#c1121f`,
    brownDark: `#432818`,
    blue: `#219ebc`,
    green: `#2d6a4f`
  };

  const game = new Game ({
    gravity: -0.005,
    speed: 10000, //higher value slows game
    jumpPower: 0.12,
    heroInitialPosition: {
      x: 0,
      y: 0,
      z: 0,
    },
    width: window.innerWidth,
    height: window.innerHeight
  });

  let scene,
  camera,
  renderer;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, game.width / game.height, .1, 1000);
  renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(game.width, game.height);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

//Map instance
  const map = new Map({
    startRadius: 10,
    endRadius: 20,
    details: 128,
    color: Colors.green,
    gravity: game.gravity
  });

  map.speed = (2*Math.PI*map.middleRadius)/game.speed;
  game.heroInitialPosition = {
    x: map.middleRadius,
    y: 2,
    z: 0,
  }

//Hero instance
  const hero = new Hero({
    radius: .7,
    details: 0,
    color: Colors.blue,
    shininess: 100,
    velocity: {
      x: 0,
      y: -.01
    },
    position: {
      x: game.heroInitialPosition.x,
      y: game.heroInitialPosition.y,
      z: game.heroInitialPosition.z,
    },
    bounciness: .7,
    jumping: false
  });

  hero.speed = map.speed*((2*Math.PI*map.middleRadius)/(2*Math.PI*hero.radius));
  
  map.setHorizontally();
  map.receiveShadow = true;
  hero.castShadow = true;
 
//Setting lights
  const ambientLight = new THREE.AmbientLight(0xffffff, .5);
  const light = new THREE.DirectionalLight(0xffffff, 3);
  const backLight = new THREE.PointLight(0xffffff, 1);
  
  light.position.set(-map.middleRadius, map.middleRadius, -map.middleRadius);
  light.castShadow = true;
  light.shadow.mapSize.width = 512;
  light.shadow.mapSize.height = 512;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500;
  light.shadow.camera.left = - 20;
  light.shadow.camera.right = 20;
  light.shadow.camera.top = 20;
  light.shadow.camera.bottom = -20;
  scene.add(map, hero, ambientLight, light, backLight);

//Keys, Event listeners
  const Keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    space: {
      pressed: false
    }
  };

  window.addEventListener('keydown', (event) => {
    switch(event.code) {
      case 'KeyA' : 
        Keys.a.pressed = true;
        break;
      case 'KeyD' : 
        Keys.d.pressed = true;
        break;
      case 'Space' : 
        if(!hero.jumping) {
          Keys.space.pressed = true;
          hero.velocity.y = game.jumpPower;
          hero.jumping = true;
        };
        break;
    }
  });

  window.addEventListener('keyup', (event) => {
    switch(event.code) {
      case 'KeyA' : 
        Keys.a.pressed = false;
        break;
      case 'KeyD' : 
        Keys.d.pressed = false;
        break;
      case 'Space' : 
        Keys.space.pressed = false;
        break;
    }
  });
  
  window.addEventListener("resize", () => handleWindowResize(game, renderer, camera), false);

  camera.position.set(hero.position.x, hero.position.y+2, hero.position.z+5);

//Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    hero.update(map);

    camera.lookAt(hero.position.x, hero.position.y, hero.position.z);
    backLight.position.set(hero.position.x, 2, 2);

    if(mapBorderDetect({obj1: hero, obj2: map}).l) {
      Keys.a.pressed = false;
    } else if(mapBorderDetect({obj1: hero, obj2: map}).r) {
      Keys.d.pressed = false;
    }

    if(Keys.a.pressed) hero.velocity.x = -hero.speed/3;
    else if(Keys.d.pressed) hero.velocity.x = hero.speed/3;
    else hero.velocity.x = 0;
    
    hero.rotation.x -= hero.speed;
    map.rotation.z += map.speed;

    renderer.render( scene, camera );
  }

  animate();
}

export default init;