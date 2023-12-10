import * as THREE from 'three';

class GameObject {
  constructor({
    radius = 1,
    details = 0,
    color = '#ffffff',
    velocity = new THREE.Vector3(0, 0, 0),
    position = new THREE.Vector3(0, 0, 0),
    geometry,
    material,
  }) {
    if(new.target === GameObject) throw new Error("Cannot instantiate abstract class GameObject");

    this.radius = radius;
    this.details = details;
    this.color = color;
    this.velocity = velocity;
    this.position = position;
    
    this.geometry = geometry || new THREE.IcosahedronGeometry(this.radius, this.details);
    this.material = material || new THREE.MeshLambertMaterial({color: this.color, flatShading: true});;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(...this.position);
  }
}

export default GameObject;
