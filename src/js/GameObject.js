import * as THREE from 'three';
import { degreeToRadians } from './functions';

class GameObject {
  constructor({
    radius = 1,
    details = 0,
    color = '#000000',
    startAngle = 0,
    aboveMapHeight = 0,
    rotationCenter = new THREE.Vector3(0, 0, 0),
    velocity = new THREE.Vector3(0, 0, 0),
    position = new THREE.Vector3(0, 0, 0)
  }) {
    this.radius = radius;
    this.details = details;
    this.color = color;
    this.startAngle = startAngle;
    this.aboveMapHeight = aboveMapHeight;
    this.rotationCenter = rotationCenter;
    this.velocity = velocity;
    this.position = position;
  }

  getSides() {
    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;
    this.top = this.mesh.position.y + this.radius;
    this.bottom = this.mesh.position.y - this.radius;
    this.front = this.mesh.position.z + this.radius;
    this.back = this.mesh.position.z - this.radius;
  }

  updatePosition(map) {
    this.getSides();

    this.velocity.x = this.velocity.y += map.speed;

    this.mesh.position.x = Math.cos(degreeToRadians(this.startAngle) + this.velocity.x) * (map.radius + this.aboveMapHeight) + this.rotationCenter.x;
    this.mesh.position.y = Math.sin(degreeToRadians(this.startAngle) + this.velocity.y) * (map.radius + this.aboveMapHeight) + this.rotationCenter.y;
  }
}

export default GameObject;
