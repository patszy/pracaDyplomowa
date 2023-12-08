import * as THREE from 'three';
import GameObject from './GameObject';
import { checkSphereCollision, degreeToRadians, drawRandom } from './functions';

class Rock extends GameObject {
  constructor(options) {
    super(options);

    this.geometry = new THREE.DodecahedronGeometry(this.radius, this.details);
    this.material = new THREE.MeshLambertMaterial({ color: this.color, flatShading: true });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;
    this.top = this.mesh.position.y + this.radius;
    this.bottom = this.mesh.position.y - this.radius;
    this.front = this.mesh.position.z + this.radius;
    this.back = this.mesh.position.z - this.radius;
  }

  updatePosition(map, hero, game) {
    super.updatePosition(map);

    if(degreeToRadians(this.startAngle) + this.velocity.x > degreeToRadians(540)) this.spawn(hero);
    if(checkSphereCollision(this, hero)) {
      hero.velocity.y = hero.jumpStrength/2;
      game.updateHealth(this);
    }
    if(game.health <= 0) game.stopGame(hero);
  }

  spawn(hero) {
    this.startAngle = drawRandom(270, 360);
    this.velocity.x = this.velocity.y = 0;
    this.radius = drawRandom(hero.radius, hero.jumpStrength * 3);
    this.mesh.geometry = new THREE.DodecahedronGeometry(this.radius, this.details);
    this.aboveMapHeight = drawRandom(-this.radius / 2, this.radius / 2);
  }
}

export default Rock;
