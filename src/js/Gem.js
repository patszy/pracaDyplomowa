import * as THREE from 'three';
import { checkSphereCollision } from './functions';

class Gem {
  constructor({
    radius = 1,
    details = 0,
    color = `#0000ff`,
    shininess = 1,
    velocity = {x:0, y:0, z:0},
    position = {x: 0, y: 0, z:0}
  }) {
    this.geometry = new THREE.OctahedronGeometry(radius, details);
    this.material = new THREE.MeshPhongMaterial({color, shininess, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.radius = radius;
    this.details = details,
    this.shininess = shininess,
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

    this.mesh.position.x = Math.cos(map.mesh.rotation.y) * (map.radius+this.velocity.y);
    this.mesh.position.y = Math.sin(map.mesh.rotation.y) * (map.radius+this.velocity.y) - map.radius;

    let collision = checkSphereCollision({ obj1: this, obj2: hero });
    if(collision) {
      console.log(true);
    } else {
      // console.log(false);
    }
  }
}

export default Gem;