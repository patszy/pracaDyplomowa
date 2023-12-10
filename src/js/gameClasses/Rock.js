import * as THREE from 'three';
import MapElement from '../abstractClasses/MapElement';
import { checkSphereCollision, degreeToRadians, drawRandom } from '../functions';

class Rock extends MapElement {
  constructor(options) {
    super(options);

    this.aboveMapHeight = drawRandom(-this.radius / 2, this.radius / 2);

    this.geometry = new THREE.DodecahedronGeometry(options.radius, options.details);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  updatePosition(map, hero, game) {
    super.updatePosition(map);

    if(degreeToRadians(this.startAngle) + this.velocity.x > degreeToRadians(540)) this.spawn(hero);
    if(checkSphereCollision(this, hero)) {
      hero.velocity.y = hero.jumpStrength/2;
      game.updateHealth(this);
    }
    game.checkNoHealth(hero);
  }

  spawn(hero) {
    super.spawn();

    this.radius = drawRandom(hero.radius, hero.jumpStrength * 3);
    this.mesh.geometry = new THREE.DodecahedronGeometry(this.radius, this.details);
    this.aboveMapHeight = drawRandom(-this.radius / 2, this.radius / 2);
  }
}

export default Rock;
