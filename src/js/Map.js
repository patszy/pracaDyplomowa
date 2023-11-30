import * as THREE from 'three';

class Map {
  constructor({
    radius = 1,
    height = 1,
    radailSegments = 3,
    color = `#00ff00`,
    gravity = 1,
    speed = 0,
    reverse = false,
    reverseTo = 0,
    position = {x: 0, y: 0, z: 0},
  }) {
    this.geometry = new THREE.CylinderGeometry(radius, radius, height, radailSegments);
    this.material = new THREE.MeshLambertMaterial({color, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;

    this.radius = radius;
    this.height = height;
    this.radailSegments = radailSegments;
    this.gravity = gravity;
    this.speed = speed;
    this.reverse = reverse;
    this.reverseTo = reverseTo;
    
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