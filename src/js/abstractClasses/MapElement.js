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
    this.velocity.z = map.speed;

    this.mesh.position.y = this.aboveMapHeight;
    this.mesh.position.z += this.velocity.z;
  }

  spawn(map) {
    this.mesh.position.z = map.front;
  }
}

export default MapElement;
