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
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  updatePosition(map, hero, game) {
    super.updatePosition(map);

    this.mesh.rotation.y -= this.rotationSpeed;

    if(degreeToRadians(this.startAngle) + this.velocity.x > degreeToRadians(540)) this.spawn(hero);
    if(checkSphereCollision(this, hero)) {
      this.spawn(hero);
      this.updatePosition(map, hero);
      game.updateScore(map);
      hero.setRotationSpeed(map);
    }
  }

  spawn(hero) {
    super.spawn();

    this.aboveMapHeight = drawRandom(hero.radius * 3, 60);
  }
}

export default Gem;