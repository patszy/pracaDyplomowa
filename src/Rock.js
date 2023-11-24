import * as THREE from 'three';
import { collisionDetect, drawRandom } from './functions';

class Rock extends THREE.Mesh {
  constructor({
    radius,
    details,
    color = `#808080`,
    positionRadius = 0,
    velocity = {x:0, y:0, z:0},
    position = {x: 0, y: 0, z:0},
  }) {
    super (
      new THREE.DodecahedronGeometry(radius, details),
      new THREE.MeshLambertMaterial({color})
    )

    this.radius = radius;
    this.velocity = velocity;
    this.positionRadius = positionRadius;
    this.position.set(position.x, position.y, position.z);
    this.top = this.position.y + this.radius;
    this.bottom = this.position.y - this.radius;
    this.right = this.position.x + this.radius;
    this.left = this.position.x - this.radius;
    this.front = this.position.z + this.radius;
    this.back = this.position.z - this.radius;
  }

  updatePosition(ground, hero) {
    this.getSides();
    this.velocity.z += ground.speed*2;
    this.position.x = Math.sin(-this.velocity.z) * this.positionRadius;
    this.position.z = Math.cos(-this.velocity.z) * this.positionRadius;

    if(this.velocity.z >= Math.PI*2) {
      this.velocity.z = 0;
      this.positionRadius = drawRandom(ground.startRadius + this.radius*2, ground.endRadius - this.radius*2);
    }

    let collision = collisionDetect({
      obj1: hero,
      obj2: this
    });
   
    if(collision.xCollision && collision.yCollision && collision.zCollision) {
      this.velocity.z = 0;
      this.positionRadius = drawRandom(ground.startRadius + this.radius*2, ground.endRadius - this.radius*2);
    }
  }

  getSides() {
    this.top = this.position.y + this.radius;
    this.bottom = this.position.y - this.radius;
    this.right = this.position.x + this.radius;
    this.left = this.position.x - this.radius;
    this.front = this.position.z + this.radius;
    this.back = this.position.z - this.radius;
  }
}

export default Rock;