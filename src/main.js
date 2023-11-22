import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Map from './Map';
import Hero from './Hero';

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

  let scene,
  camera,
  renderer,
  width = window.innerWidth,
  height = window.innerHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, .1, 1000);
  renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});

  camera.position.set(0, 5, 15);
  camera.lookAt(0,0,0);

  renderer.shadowMap.enabled = true;
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const map = new Map({
    startRadius: 5,
    endRadius: 10,
    details: 64,
    color: Colors.green,
    gravity: -0.005
  });

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
      x: Math.sin(Math.PI/4) * map.middle,
      y: 2,
      z: Math.cos(Math.PI/4) * map.middle,
    },
    bounciness: .7
  });

  map.setHorizontally();
  map.receiveShadow = true;
  hero.castShadow = true;

  const ambientLight = new THREE.AmbientLight(0xffffff, .5);
  const light = new THREE.PointLight(0xffffff, 100);

  light.position.set(Math.sin(Math.PI/8) * map.middle, 5, Math.cos(Math.PI/8) * map.middle);
  light.castShadow = true;

  scene.add(map, hero, ambientLight, light);

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
        Keys.space.pressed = true;
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

  function animate() {
    requestAnimationFrame(animate);

    hero.update(map);

    if(Keys.a.pressed) hero.velocity.move = -0.05;
    else if(Keys.d.pressed) hero.velocity.move = 0.05;
    else hero.velocity.move = 0;

    renderer.render( scene, camera );
  }
}