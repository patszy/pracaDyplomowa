import * as THREE from 'three';
import MapElement from '../abstractClasses/MapElement';
import { checkSphereCollision, degreeToRadians, drawRandom } from '../functions';

class Gem extends MapElement {
  constructor({
    rotationSpeed = 0,
    ...options
  }) {
    const geometry = new THREE.OctahedronGeometry(options.radius, options.details);
    const material = new THREE.MeshPhongMaterial({ color: options.color, shininess: 1, flatShading: true });

    super({
      geometry: geometry,
      material: material,
      ...options
    });

    this.rotationSpeed = rotationSpeed;
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