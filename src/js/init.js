import * as THREE from 'three';
import Game from './gameClasses/Game';
import Map from './gameClasses/Map';
import Hero from './gameClasses/Hero';
import Rock from './gameClasses/Rock';
import Gem from './gameClasses/Gem';
import { drawRandom } from './functions';

//INIT GAME, HERO, MAP, ROCK, GEM

let game, map, hero, rock, gem;

const createGame = () => {
  game = new Game({
    initMapSpeed: 1,
    initMapMaxHeight: 1,
    levelUpMapSpeed: .1,
    mapMaxHeight: 3,
    health: 100,
  });
  game.fog = {
    color: game.black,
    near: 100,
    far: 150
  }
  game.createScene();
  game.createLights();
}

const createMap = () =>{
  map = new Map({
    radius: 50,
    size: 10,
    maxHeight: game.initMapMaxHeight,
    rotationSpeed: game.initMapSpeed,
    color: game.green,
    gravity: .5
  });
  game.scene.add(map.mesh);
}

const createHero = () =>{
  hero = new Hero({
    radius: map.size/5,
    details: 2,
    color: game.red,
    jumpStrength: map.size*.5,
    bounciness: .5
  });
  hero.setPosition(new THREE.Vector3(-map.radius, map.size*2, 0));
  game.initHeroPosition = new THREE.Vector3(...hero.mesh.position);
  game.scene.add(hero.mesh);
}

const createRock = () =>{
  rock= new Rock({
    radius: drawRandom(hero.radius, hero.radius*2),
    color: game.gray,
    rotationCenter: new THREE.Vector3(...map.mesh.position),
    startAngle: drawRandom(270, 360)
  });
  game.scene.add(rock.mesh);
}

const createGem = () =>{
  gem = new Gem({
    radius: hero.radius/1.5,
    color: game.blue,
    rotationSpeed: 1
  });
  gem.spawn(map, hero);
  game.scene.add(gem.mesh);
}

//ANIMATION LOOP

const animate = () => {
  map.updatePosition(game);
  hero.updatePosition(map, game, gem);
  // rock.updatePosition(map, hero, game);
  gem.updatePosition(map, hero, game);

  game.renderer.render(game.scene, game.camera);
  
  requestAnimationFrame(animate);
}

const init = () => {
  createGame();
  createMap();
  createHero();
  // createRock();
  createGem();

  animate();
}

export default init;
