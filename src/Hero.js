import * as THREE from 'three';
import { collisionDetect } from './functions';

class Hero extends THREE.Mesh {
  constructor({
    radius,
    details,
    color = `#0000ff`,
    shininess = 0,
    velocity = {x:0, y:0, z:0},
    position = {x: 0, y: 0, z:0},
    bounciness = 1,
    jumping = false,
  }) {
    super (
      new THREE.IcosahedronGeometry(radius, details),
      new THREE.MeshPhongMaterial({color, shininess})
    )

    this.radius = radius;
    this.velocity = velocity;
    this.speed = 0;
    this.position.set(position.x, position.y, position.z);
    this.top = this.position.y + this.radius;
    this.bottom = this.position.y - this.radius;
    this.right = this.position.x + this.radius;
    this.left = this.position.x - this.radius;
    this.front = this.position.z + this.radius;
    this.back = this.position.z - this.radius;
    this.bounciness = bounciness;
    this.jumping = jumping;
  }

  getSides() {
    this.top = this.position.y + this.radius;
    this.bottom = this.position.y - this.radius;
    this.right = this.position.x + this.radius;
    this.left = this.position.x - this.radius;
    this.front = this.position.z + this.radius;
    this.back = this.position.z - this.radius;
  }

  updatePosition(ground) {
    this.getSides();
    
    this.position.x += this.velocity.x;

    this.applyGravity(ground)
  }

  applyGravity(ground) {
    this.velocity.y += ground.gravity;

    if(collisionDetect({
      obj1: this,
      obj2: ground
    }).yCollision) {
      this.jumping = false;
      this.velocity.y *= this.bounciness;
      this.velocity.y = -this.velocity.y;
    } else {
      this.position.y += this.velocity.y;
    }
  }
}

export default Hero;