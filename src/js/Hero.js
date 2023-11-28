import * as THREE from 'three';
import { checkBoxCollision } from './functions';

class Hero {
  constructor({
    radius = 1,
    details = 0,
    color = `#0000ff`,
    shininess = 0,
    velocity = {x:0, y:1, z:0},
    position = {x: 0, y: 0, z:0},
    bounciness = 1,
    jumpStrength = 1,
    jumping = false,
  }) {
    this.geometry = new THREE.IcosahedronGeometry(radius, details);
    this.material = new THREE.MeshPhongMaterial({color, shininess, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.radius = radius;
    this.velocity = velocity;
    this.speed = 0;
    this.bounciness = bounciness;
    this.jumpStrength = jumpStrength;
    this.jumping = jumping;

    this.mesh.position.set(position.x, position.y, position.z);

    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;
    this.top = this.mesh.position.y + this.radius;
    this.bottom = this.mesh.position.y - this.radius;
    this.front = this.mesh.position.z + this.radius;
    this.back = this.mesh.position.z - this.radius;
  }

  getSides() {
    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;
    this.top = this.mesh.position.y + this.radius;
    this.bottom = this.mesh.position.y - this.radius;
    this.front = this.mesh.position.z + this.radius;
    this.back = this.mesh.position.z - this.radius;
  }

  updatePosition(ground) {
    this.getSides();

    // this.mesh.position.x += this.velocity.x;
    this.mesh.rotation.z -= this.velocity.x;

    this.applyGravity(ground)
  }

  applyGravity(ground) {
    this.velocity.y -= ground.gravity;
    
    if(checkBoxCollision({ obj1: this, obj2: ground }).y) {
      this.jumping = false;
      this.velocity.y *= this.bounciness;
      this.velocity.y = -this.velocity.y;
    } else {
      this.mesh.position.y += this.velocity.y;
    }
  }
}

export default Hero;