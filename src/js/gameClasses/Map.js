import * as THREE from 'three';
import GameElement from '../abstractClasses/GameElement';

class Map extends GameElement{
  constructor({
    gravity = 1,
    ...options
  }) {
    const geometry = new THREE.SphereGeometry(options.radius, options.details);
    const material = new THREE.MeshLambertMaterial({color: options.color, flatShading: true});

    super({
      geometry: geometry,
      material: material,
      ...options
    });

    this.gravity = gravity;

    this.mesh.position.y = -this.radius;  
  }
  
  setHorizontally() {
    this.mesh.rotateX(Math.PI / 2);
  }

  updatePosition() {
    this.mesh.rotation.y += this.speed;
  }
}

export default Map;