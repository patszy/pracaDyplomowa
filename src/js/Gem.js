import * as THREE from 'three';
import GameObject from './GameObject';
import { checkSphereCollision, degreeToRadians, drawRandom } from './functions';

class Gem extends GameObject {
  constructor(options) {
    super(options);

    this.rotationSpeed = options.rotationSpeed;
    this.geometry = new THREE.OctahedronGeometry(this.radius, this.details);
    this.material = new THREE.MeshPhongMaterial({ color: this.color, shininess: 1, flatShading: true });
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
    this.startAngle = drawRandom(270, 360);
    this.aboveMapHeight = drawRandom(hero.radius * 3, 60);
    this.velocity.x = this.velocity.y = 0;
  }
}

export default Gem;