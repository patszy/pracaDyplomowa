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

    this.geometry = new THREE.OctahedronGeometry(options.radius, options.details);
    this.material = new THREE.MeshPhongMaterial({color: options.color, shininess, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  updatePosition(map, hero, game) {
    super.updatePosition(map);

    if(this.mesh.position.z > map.back) this.spawn(map, hero);

    if(checkSphereCollision(this, hero)) {
      this.spawn(map, hero);
      this.updatePosition(map, hero);
      game.updateScore(map);
      hero.setRotationSpeed(map);
    }
  }

  spawn(map, hero) {
    super.spawn(map);

    this.aboveMapHeight = drawRandom(hero.radius * 3, hero.radius * 6);
  }
}

export default Gem;