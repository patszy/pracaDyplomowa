
import MapElement from '../abstractClasses/MapElement';
import { Object3D, BoxGeometry, MeshLambertMaterial, Mesh, MathUtils } from 'three';

class Map extends MapElement{
  constructor({
    gravity = 1,
    size = 1,
    maxHeight = 5,
    ...options
  }) {
    super(options);

    this.gravity = gravity;
    this.size = size;
    this.maxHeight = maxHeight;
    this.earlierHeight = this.size; 

//Sides
    this.right = this.mesh.position.x + this.size / 2;
    this.left = this.mesh.position.x - this.size / 2;
    this.bottom = this.mesh.position.y;
    this.top = this.mesh.position.y;
    this.front = this.mesh.position.z - this.size / 2;
    this.back = this.mesh.position.z + this.size / 2;

//THREE
    this.mesh = new Object3D();
    this.material = new MeshLambertMaterial({ color: options.color });
    this.geometry = new BoxGeometry(this.size, this.size, this.size);
    this.numberOfSquares = Math.floor((2*Math.PI*this.radius)/this.size);
    this.angleStep = (2*Math.PI)/this.numberOfSquares;
    this.boxNumber = this.numberOfSquares-1;

    this.createMap();
  }

  createMap() {
    const meshBox = new Mesh(this.geometry, this.material);
    meshBox.castShadow = true;
    meshBox.receiveShadow = true;
    let angle, x, z, squareClone;
    
    for(let i=0; i<this.numberOfSquares; i++) {
      angle = i*this.angleStep;
      x = this.radius * Math.cos(angle);
      z = this.radius * Math.sin(angle);

      squareClone = meshBox.clone();
      squareClone.angle = angle;
      squareClone.position.set(x,0,z);

      this.mesh.add(squareClone);
    }
  }

  updateSides() {
    this.mesh.children.forEach(box => {
      box.right = box.position.x + this.size / 2;
      box.left = box.position.x - box.geometry.parameters.width/2;
  
      box.bottom = box.position.y - box.geometry.parameters.height/2;
      box.top = box.position.y + box.geometry.parameters.height/2;
  
      box.front = box.position.z - box.geometry.parameters.depth/2;
      box.back = box.position.z + box.geometry.parameters.depth/2;
    });
  }

  spawn() {
    const currentChild = this.mesh.children[this.boxNumber];
    const maxHeight = this.maxHeight + 1;
    let heightRange = {
        min: 1,
        max: Math.min(this.earlierHeight + 1, maxHeight)
    };

    this.earlierHeight = MathUtils.randInt(heightRange.min, heightRange.max);

    currentChild.geometry = new BoxGeometry(this.size, this.earlierHeight * this.size, this.size);
    currentChild.position.y = (this.earlierHeight * this.size - this.size) / 2;

    this.boxNumber = (this.boxNumber <= 0) ? this.numberOfSquares-1 : this.boxNumber-1;
  }

  reset() {
    this.currentMaxHeight = 1;
    this.earlierHeight = this.size;
    this.mesh.children.forEach(box => {
      box.geometry = this.geometry;
      box.position.y = 0;
    });
  }

  getRotationMod() {
    return Math.floor(this.mesh.children[0].angle%this.angleStep/(this.rotationSpeed));
  }

  updatePosition() { 
    if(!this.getRotationMod()) this.spawn();

    this.mesh.children.forEach(child => {  
      child.position.x = this.radius * Math.cos(child.angle);
      child.position.z = this.radius * Math.sin(child.angle);
      child.rotation.y = -child.angle;

      child.angle += this.rotationSpeed;
    });
  }
}

export default Map;