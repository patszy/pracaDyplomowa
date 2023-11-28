import * as THREE from 'three';
import { checkSphereCollision } from './functions';

class Obstacle {
  constructor({
    radius = 1,
    details = 0,
    color = `#808080`,
    velocity = {x:0, y:0, z:0},
    position = {x: 0, y: 0, z:0}
  }) {
    this.geometry = new THREE.DodecahedronGeometry(radius, details);
    this.material = new THREE.MeshLambertMaterial({color, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.radius = radius;
    this.details = details,
    this.velocity = velocity;
    this.speed = 0;
    
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

  updatePosition(map, hero) {
    this.getSides();

    this.mesh.position.x = map.radius * Math.cos(map.mesh.rotation.y);
    this.mesh.position.y = map.radius * Math.sin(map.mesh.rotation.y)-map.radius;

    let collision = checkSphereCollision({ obj1: this, obj2: hero });
    if(collision) {
      hero.velocity.y = hero.jumpStrength;
    } else {
      // console.log(false);
    }
  }
}

export default Obstacle;