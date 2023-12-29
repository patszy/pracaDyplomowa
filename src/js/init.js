import * as THREE from 'three';
import Game from './gameClasses/Game';
import Map from './gameClasses/Map';
import Hero from './gameClasses/Hero';
import Rock from './gameClasses/Rock';
import Gem from './gameClasses/Gem';
import Cloud from './gameClasses/Cloud';
import { drawRandom } from './functions';

//INIT GAME, HERO, MAP, ROCK, GEM

let game, map, hero, rock, gem, cloudHolder=[];

const createGame = () => {
  game = new Game({
    initialMapSpeed: 0.01,
    levelUpMapSpeed: 0.001,
    // levelUpSpeed: 2,
    health: 100,
  });
  game.createScene();
  game.createLights();
}

const createMap = () =>{
  map = new Map({
    radius: 300,
    details: 5,
    color: game.green,
    rotationSpeed: game.initialMapSpeed,
    gravity: 0.5
  });
  game.scene.add(map.mesh);
}

const createHero = () =>{
  hero = new Hero({
    radius: 10,
    details: 2 ,
    color: game.red,
    speed: 0.02,
    jumpStrength: 7,
    bounciness: .7 
  });
  hero.mesh.position.set(0, map.radius+hero.radius*3, 0);
  hero.setRotationSpeed(map);
  game.initialHeroPosition.copy(hero.mesh.position);
  game.scene.add(hero.mesh);
}

const createRock = () =>{
  rock= new Rock({
    radius: drawRandom(hero.radius, hero.jumpStrength*3),
    color: game.gray,
    rotationCenter: new THREE.Vector3(...map.mesh.position),
    startAngle: drawRandom(270, 360)
  });
  game.scene.add(rock.mesh);
}

const createGem = () =>{
  gem = new Gem({
    radius: 5,
    color: game.blue,
    rotationSpeed: 0.03,
    rotationCenter: new THREE.Vector3(...map.mesh.position),
    aboveMapHeight: drawRandom(hero.radius*3, 60),
    startAngle: drawRandom(270, 360)
  });
  game.scene.add(gem.mesh);
}

const createCloud = () =>{
  for(let i=0; i<150; i++){
    cloudHolder[i] = new Cloud({
      color: game.blue,
      rotationCenter: new THREE.Vector3(...map.mesh.position),
      startAngle: drawRandom(0, 360),
    });
    game.scene.add(cloudHolder[i].mesh);
  }
}

//ANIMATION LOOP

const animate = () => {
  map.updatePosition();
  hero.updatePosition(map, game);
  rock.updatePosition(map, hero, game);
  gem.updatePosition(map, hero, game);
  for(let i=0; i<cloudHolder.length; i++){
    cloudHolder[i].updatePosition(map);
  }
  game.renderer.render(game.scene, game.camera);
  
  requestAnimationFrame(animate);
}

const init = () => {
  createGame();
  createMap();
  createHero();
  createRock();
  createGem();
  createCloud();

  animate();
}

export default init;
