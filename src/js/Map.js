import * as THREE from 'three';

class Map {
  constructor({
    radius = 1,
    details = 3,
    color = `#00ff00`,
    gravity = 1,
    rotationSpeed = 0,
    speed = 0,
    velocity = new THREE.Vector3(0, 0, 0),
    position = new THREE.Vector3(0, 0, 0),
  }) {
    this.geometry = new THREE.SphereGeometry(radius, details);
    this.material = new THREE.MeshLambertMaterial({color, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;

    this.radius = radius;
    this.details = details;
    this.gravity = gravity;
    this.velocity = velocity;
    this.rotationSpeed = rotationSpeed;
    this.speed = speed;
    
    this.mesh.position.set(position.x, position.y, position.z);

    this.top = this.mesh.position.y + this.radius;
    this.bottom = this.mesh.position.y - this.radius;
    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;
    this.front = this.mesh.position.z + this.height/2;
    this.back = this.mesh.position.z - this.height/2;
  }

  getSides() {
    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;
    this.top = this.mesh.position.y + this.radius;
    this.bottom = this.mesh.position.y - this.radius;
    this.front = this.mesh.position.z + this.radius;
    this.back = this.mesh.position.z - this.radius;
  }
  
  setHorizontally() {
    this.mesh.rotateX(Math.PI / 2);    
  }

  updatePosition() {
    this.mesh.rotation.y += this.speed;
  }
}

export default Map;