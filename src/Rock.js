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
    this.scaleVector = {x: 1, y: 1, z:1};
    this.positionRadius = positionRadius;
    this.position.set(position.x, position.y, position.z);
    this.top = this.position.y + (this.radius*this.scaleVector.y);
    this.bottom = this.position.y - (this.radius*this.scaleVector.y);
    this.right = this.position.x + (this.radius*this.scaleVector.x);
    this.left = this.position.x - (this.radius*this.scaleVector.x);
    this.front = this.position.z + (this.radius*this.scaleVector.z);
    this.back = this.position.z - (this.radius*this.scaleVector.z);
  }

  updatePosition(ground, hero) {
    this.getSides();
    this.velocity.z += ground.speed;
    this.position.x = Math.sin(-this.velocity.z) * this.positionRadius;
    this.position.z = Math.cos(-this.velocity.z) * this.positionRadius;

    let collision = collisionDetect({
      obj1: hero,
      obj2: this
    });
   
    if(this.velocity.z >= Math.PI*2) {
      this.respawn(ground);
    } else if(collision.xCollision && collision.yCollision && collision.zCollision) {
      // this.respawn(ground);
    }
  }

  respawn(ground){
    this.velocity.z = 0;
      this.scaleVector = {
        x: drawRandom(.5, 1.5),
        y: drawRandom(.5, (ground.endRadius - ground.startRadius)/3),
        z: drawRandom(.5, 1.5)
      }

      if(
        this.scaleVector.x*this.radius*2 >= (ground.endRadius - ground.startRadius) / 5 ||
        this.scaleVector.z*this.radius*2 >= (ground.endRadius - ground.startRadius) / 5
        ) {
        this.respawn(ground);
      }

      this.positionRadius = drawRandom(ground.startRadius + this.radius*this.scaleVector.x*2, ground.endRadius - this.radius*this.scaleVector.x*2);
      
      this.scale.set(this.scaleVector.x, this.scaleVector.y, this.scaleVector.z);
  }

  getSides() {
    this.top = this.position.y + (this.radius*this.scaleVector.y);
    this.bottom = this.position.y - (this.radius*this.scaleVector.y);
    this.right = this.position.x + (this.radius*this.scaleVector.x);
    this.left = this.position.x - (this.radius*this.scaleVector.x);
    this.front = this.position.z + (this.radius*this.scaleVector.z);
    this.back = this.position.z - (this.radius*this.scaleVector.z);
  }
}

export default Rock;