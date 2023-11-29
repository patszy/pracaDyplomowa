import * as THREE from 'three';
import { checkSphereCollision, degreeToRadians } from './functions';

class Obstacle {
  constructor({
    radius = 1,
    details = 0,
    color = `#808080`,
    rotationCenter = new THREE.Vector3(0, 0, 0),
    startAngle = 0,
    aboveMapHeight = 0,
    velocity = {x:0, y:0, z:0},
    position = {x: 0, y: 0, z:0},
  }) {
    this.geometry = new THREE.DodecahedronGeometry(radius, details);
    this.material = new THREE.MeshLambertMaterial({color, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.radius = radius;
    this.rotationCenter = rotationCenter,
    this.aboveMapHeight = aboveMapHeight,
    this.startAngle = startAngle,
    this.velocity = velocity;
    
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

    this.velocity.x = this.velocity.y += map.speed;

    this.mesh.position.x = Math.cos(degreeToRadians(this.startAngle) + this.velocity.x) * (map.radius + this.aboveMapHeight) + this.rotationCenter.x;
    this.mesh.position.y = Math.sin(degreeToRadians(this.startAngle) + this.velocity.y) * (map.radius + this.aboveMapHeight) + this.rotationCenter.y;

    if(checkSphereCollision({ obj1: this, obj2: hero })) {
      hero.velocity.y = hero.jumpStrength;
    }
  }
}

export default Obstacle;