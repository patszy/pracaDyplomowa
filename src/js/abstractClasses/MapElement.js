import * as THREE from 'three';
import GameObject from './GameObject';
import { drawRandom, degreeToRadians } from '../functions';

class MapElement extends GameObject {
  constructor({
    startAngle = 0,
    aboveMapHeight = 0,
    rotationCenter = new THREE.Vector3(0, 0, 0),
    ...options
  }) {
    if(new.target === MapElement) throw new Error("Cannot instantiate abstract class MapElement");

    super(options);
    
    this.startAngle = startAngle;
    this.aboveMapHeight = aboveMapHeight;
    this.rotationCenter = rotationCenter;
    
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  updatePosition(map) {
    this.velocity.x = this.velocity.y += map.speed;

    this.mesh.position.x = Math.cos(degreeToRadians(this.startAngle) + this.velocity.x) * (map.radius + this.aboveMapHeight) + this.rotationCenter.x;
    this.mesh.position.y = Math.sin(degreeToRadians(this.startAngle) + this.velocity.y) * (map.radius + this.aboveMapHeight) + this.rotationCenter.y;
    this.mesh.position.z = this.position.z;
  }

  spawn() {
    this.startAngle = drawRandom(270, 360);
    this.velocity.x = this.velocity.y = 0;
  }
}

export default MapElement;
