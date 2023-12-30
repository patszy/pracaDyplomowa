
import GameElement from '../abstractClasses/GameElement';
import * as THREE from 'three';

class Map extends GameElement{
  constructor({
    size = 100,
    gravity = 1,
    ...options
  }) {
    super(options);

    this.size = size;
    this.gravity = gravity;

//Sides
    this.right = this.mesh.position.x + this.size / 2;
    this.left = this.mesh.position.x - this.size / 2;
    this.bottom = this.mesh.position.y;
    this.top = this.mesh.position.y;
    this.front = this.mesh.position.z - this.size / 2;
    this.back = this.mesh.position.z + this.size / 2;

//THREE
    this.geometry = new THREE.PlaneGeometry(this.size, this.size, this.details, this.details);
    this.material = new THREE.MeshLambertMaterial({ color: options.color, side: THREE.DoubleSide });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
    this.mesh.rotation.x = Math.PI / 2;
    
  }

  updateSides() {
    this.right = this.mesh.position.x + this.size / 2;
    this.left = this.mesh.position.x - this.size / 2;

    this.bottom = this.mesh.position.y;
    this.top = this.mesh.position.y;

    this.front = this.mesh.position.z - this.size / 2;
    this.back = this.mesh.position.z + this.size / 2;
  }
}

export default Map;