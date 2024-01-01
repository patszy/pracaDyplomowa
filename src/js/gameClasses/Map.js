
import GameElement from '../abstractClasses/GameElement';
import * as THREE from 'three';
import { drawRandom, radiansToDegrees } from '../functions';

class Map extends GameElement{
  constructor({
    gravity = 1,
    size = 1,
    maxHeight = 5,
    ...options
  }) {
    super(options);

    this.gravity = gravity;
    this.size = size;
    this.maxHeight = maxHeight+1;
    this.earlierHeight = this.size; 

//Sides
    this.right = this.mesh.position.x + this.size / 2;
    this.left = this.mesh.position.x - this.size / 2;
    this.bottom = this.mesh.position.y;
    this.top = this.mesh.position.y;
    this.front = this.mesh.position.z - this.size / 2;
    this.back = this.mesh.position.z + this.size / 2;

//THREE
    this.mesh = new THREE.Object3D();
    this.material = new THREE.MeshLambertMaterial({ color: options.color });
    this.numberOfSquares = Math.floor((2*Math.PI*this.radius)/this.size)
    this.angleStep = (2*Math.PI)/this.numberOfSquares;
    this.currentBox = this.numberOfSquares-1;

    this.createHills();
  }

  createHills() {
    const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    const meshBox = new THREE.Mesh(geometry, this.material);
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

  // generate() {
  //   let changeHeight = {min: this.size, max:this.earlierHeight+this.size}
  //   if(changeHeight.max>this.size*this.maxHeight) changeHeight = {min:this.size, max:this.size*this.maxHeight};

  //   do this.earlierHeight = drawRandom(changeHeight.min, changeHeight.max);
  //   while(this.earlierHeight%this.size != 0)
    
  //   if(this.currentBox<=0) this.currentBox = this.numberOfSquares;
  //   this.currentBox--;

  //   this.mesh.children[this.currentBox].geometry = new THREE.BoxGeometry(this.size, this.earlierHeight, this.size);
  //   this.mesh.children[this.currentBox].position.y = (this.earlierHeight)/2-(this.size/2);
  // }

  generate() {
    const currentChild = this.mesh.children[this.currentBox];
    const maxHeight = this.size * this.maxHeight;
    let heightRange = {
        min: this.size,
        max: Math.min(this.earlierHeight + this.size, maxHeight)
    };

    this.currentBox = (this.currentBox <= 0) ? this.numberOfSquares-1 : this.currentBox-1;

    if(heightRange.max > maxHeight) heightRange.max = maxHeight;

    do this.earlierHeight = drawRandom(heightRange.min, heightRange.max);
    while (this.earlierHeight % this.size !== 0);

    currentChild.geometry = new THREE.BoxGeometry(this.size, this.earlierHeight, this.size);
    currentChild.position.y = this.earlierHeight / 2 - this.size / 2;
  }

  reset() {
    this.earlierHeight = this.size;
    this.mesh.children.forEach(box => {
      box.geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
      box.position.y = 0;
    });
  }

  updatePosition() {
    let rotationMod = Math.floor((Math.abs(this.mesh.children[0].angle)%this.angleStep)*(100/this.rotationSpeed));
    
    if(!rotationMod) this.generate();

    this.mesh.children.forEach(child => {  
      child.position.x = this.radius * Math.cos(child.angle);
      child.position.z = this.radius * Math.sin(child.angle);
      child.rotation.y = -child.angle;

      child.angle += this.rotationSpeed / 100;
    });
  }
}

export default Map;