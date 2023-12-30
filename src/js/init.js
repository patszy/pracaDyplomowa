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
    initialMapSpeed: 2,
    levelUpMapSpeed: .5,
    // levelUpSpeed: 2,
    health: 100,
    fog: {
      near: 150,
      far: 500
    }
  });
  game.createScene();
  game.createLights();
}

const createMap = () =>{
  map = new Map({
    radius: 10,
    rotationSpeed: game.initialMapSpeed,
    color: game.green,
    gravity: 0.1
  });
  game.scene.add(map.mesh);
}

const createHero = () =>{
  hero = new Hero({
    radius: .5,
    details: 2,
    color: game.red,
    speed: 0.02,
    jumpStrength: .8,
    bounciness: .7 
  });
  hero.setPosition(new THREE.Vector3(0,3,map.radius));
  game.initialHeroPosition = new THREE.Vector3(...hero.mesh.position);
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
    radius: 5,
    color: game.blue,
    rotationSpeed: 0.03,
    rotationCenter: new THREE.Vector3(...map.mesh.position),
    aboveMapHeight: drawRandom(hero.radius*3, hero.radius*6),
    startAngle: drawRandom(270, 360)
  });
  game.scene.add(gem.mesh);
}

//ANIMATION LOOP

const animate = () => {
  map.updatePosition();
  hero.updatePosition(map, game);
  // rock.updatePosition(map, hero, game);
  // gem.updatePosition(map, hero, game);

  const deltaTime = game.clock.getDelta();

  if (game.clock.elapsedTime >= .17) {
      map.generateMap();
      game.clock.elapsedTime = 0;
  }

  game.renderer.render(game.scene, game.camera);
  
  requestAnimationFrame(animate);
}

const init = () => {
  createGame();
  createMap();
  createHero();
  // createRock();
  // createGem();

  animate();
}

export default init;
