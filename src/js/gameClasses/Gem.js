import * as THREE from 'three';
import MapElement from '../abstractClasses/MapElement';
import { checkSphereCollision, degreeToRadians, drawRandom } from '../functions';

class Gem extends MapElement {
  constructor({
    shininess = 1,
    rotationSpeed = 0,
    ...options
  }) {
    super(options);

    this.rotationSpeed = rotationSpeed;
    this.angle = 0;

    this.geometry = new THREE.OctahedronGeometry(options.radius, options.details);
    this.material = new THREE.MeshPhongMaterial({color: options.color, shininess, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  updatePosition(map, hero, game) {
    this.angle += map.rotationSpeed/100;
    // super.updatePosition(map);

    // if(this.mesh.position.z > map.back) this.spawn(map, hero);
    this.mesh.position.x = map.radius * Math.cos(this.angle);
    this.mesh.position.z = map.radius * Math.sin(this.angle);

    console.log(checkSphereCollision(this, hero));
    if(checkSphereCollision(this, hero)) {
      this.spawn(map, hero);
      // this.updatePosition(map, hero);
      game.updateScore(map);
      hero.setRotationSpeed(map);
    }
  }

  spawn(map, hero) {
    super.spawn();

    this.aboveMapHeight = drawRandom(map.size+hero.radius * 3, map.size+hero.radius * 6);
    this.mesh.position.y = this.aboveMapHeight;
  }
}

export default Gem;