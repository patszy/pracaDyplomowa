import * as THREE from 'three';
import { collisionDetect } from './functions';

class Hero extends THREE.Mesh {
  constructor({
    radius,
    details,
    color = Colors.blue,
    shininess = 0,
    velocity = {move:0, y:0},
    positionRadius = 0,
    position = {x: 0, y: 0, z:0},
    bounciness = 1,
    jumping = false,
  }) {
    super (
      new THREE.IcosahedronGeometry(radius, details),
      new THREE.MeshPhongMaterial({color, shininess})
    )

    this.radius = radius;
    this.details = details;
    this.velocity = velocity;
    this.positionRadius = positionRadius;
    this.position.set(position.x, position.y, position.z);
    this.top = this.position.y + this.radius;
    this.bottom = this.position.y - this.radius;
    this.bounciness = bounciness;
    this.jumping = jumping;
  }

  getSides() {
    this.bottom = this.position.y - this.radius;
  }

  update(ground) {
    this.getSides();

    this.positionRadius += this.velocity.move; 
    this.position.x = Math.sin(Math.PI / 4) * this.positionRadius;
    this.position.z = Math.cos(Math.PI / 4) * this.positionRadius;

    this.applyGravity(ground)
  }

  applyGravity(ground) {
    this.velocity.y += ground.gravity;

    if(collisionDetect({
      obj1: this,
      obj2: ground
    })) {
      this.jumping = false;
      this.velocity.y *= this.bounciness;
      this.velocity.y = -this.velocity.y;
    } else {
      this.position.y += this.velocity.y;
    }
  }
}

export default Hero;