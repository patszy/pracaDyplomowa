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
    speed: .05,
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

  camera.position.set(0, 5, 15);
  camera.lookAt(0,0,0);

  renderer.shadowMap.enabled = true;
  renderer.setSize(game.width, game.height);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

//Map instance
  const map = new Map({
    startRadius: 5,
    endRadius: 10,
    details: 64,
    color: Colors.green,
    gravity: game.gravity
  });

  game.heroInitialPosition = {
    x: Math.sin(Math.PI/4) * map.middle,
    y: 2,
    z: Math.cos(Math.PI/4) * map.middle,
  }

//Hero instance
  const hero = new Hero({
    radius: .5,
    details: 1,
    color: Colors.blue,
    velocity: {
      move: 0,
      y: -.01
    },
    positionRadius: map.middle,
    position: {
      x: game.heroInitialPosition.x,
      y: game.heroInitialPosition.y,
      z: game.heroInitialPosition.z,
    },
    bounciness: .7,
    jumping: false
  });

  map.setHorizontally();
  map.receiveShadow = true;
  hero.receiveShadow = true;
  hero.castShadow = true;
 

//Setting lights
  const ambientLight = new THREE.AmbientLight(0xffffff, .5);
  const hemisphereLight = new THREE.HemisphereLight(0xfffafa, 0x000000, .9);
  const light = new THREE.DirectionalLight(0xffffff, 3);

  light.position.set(15, 35, 35);
  light.castShadow = true;
  scene.add(map, hero, ambientLight, hemisphereLight, light);

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

//Animation loop
  function animate() {
    requestAnimationFrame(animate);
  
    hero.update(map);
    if(mapBorderDetect({obj1: hero, obj2: map}).l) {
      Keys.a.pressed = false;
    } else if(mapBorderDetect({obj1: hero, obj2: map}).r) {
      Keys.d.pressed = false;
    }

    if(Keys.a.pressed) hero.velocity.move = -game.speed;
    else if(Keys.d.pressed) hero.velocity.move = game.speed;
    else hero.velocity.move = 0;
    
    map.rotation.z += 0.01;

    renderer.render( scene, camera );
  }

  animate();
}

export default init;