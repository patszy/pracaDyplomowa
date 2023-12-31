
import GameElement from '../abstractClasses/GameElement';
import * as THREE from 'three';
import { drawRandom } from '../functions';

class Map extends GameElement{
  constructor({
    gravity = 1,
    size = 1,
    maxHeight = 5,
    speed = 1,
    ...options
  }) {
    super(options);

    this.gravity = gravity;
    this.size = size;
    this.maxHeight = maxHeight+1;
    this.speed = speed;
    this.earlierHeight = 1; 

//Sides
    this.right = this.mesh.position.x + this.size / 2;
    this.left = this.mesh.position.x - this.size / 2;
    this.bottom = this.mesh.position.y;
    this.top = this.mesh.position.y;
    this.front = this.mesh.position.z;
    this.back = this.mesh.position.z + this.size / 2;

//THREE
    this.mesh = new THREE.Object3D();

    this.geometryBox = new THREE.BoxGeometry(this.size, this.size, this.size);
    this.materialBox = new THREE.MeshLambertMaterial({ color: options.color });
    this.meshBox = new THREE.Mesh(this.geometryBox, this.materialBox);
    this.numberOfSquares = Math.floor((2*Math.PI*this.radius)/this.size);
    this.angleStep = (2*Math.PI)/this.numberOfSquares;
    this.currentBox = this.numberOfSquares-1;
    
    for(let i=0; i<this.numberOfSquares; i++) {
      const angle = i*this.angleStep;

      const x = this.radius * Math.cos(angle);
      const z = this.radius * Math.sin(angle);

      const squareClone = this.meshBox.clone();
      squareClone.position.set(x,0,z);
      squareClone.lookAt(0,0,0);
      this.mesh.add(squareClone);
    }
  }

  updateSides() {
    for(let i=0; i<this.mesh.children.length; i++){
      this.mesh.children[i].right = this.mesh.children[i].position.x + this.mesh.children[i].geometry.parameters.width/2;
      this.mesh.children[i].left = this.mesh.children[i].position.x - this.mesh.children[i].geometry.parameters.width/2;
  
      this.mesh.children[i].bottom = this.mesh.children[i].position.y - this.mesh.children[i].geometry.parameters.height/2;
      this.mesh.children[i].top = this.mesh.children[i].position.y + this.mesh.children[i].geometry.parameters.height/2;
  
      this.mesh.children[i].front = this.mesh.children[i].position.z + this.mesh.children[i].geometry.parameters.depth/2;
      this.mesh.children[i].back = this.mesh.children[i].position.z - this.mesh.children[i].geometry.parameters.depth/2;
    }
  }

  generateMap() {
    let changeHeight = {min: this.size, max:this.earlierHeight+this.size}
    if(changeHeight.max>this.size*this.maxHeight) {
      console.log("ChangeMax"+changeHeight.max+"SizeMax"+this.size*this.maxHeight);
      changeHeight = {min:this.size, max:this.size*this.maxHeight};
      console.log(changeHeight);
    }

    do{
      this.earlierHeight = drawRandom(changeHeight.min, changeHeight.max);
    } while(this.earlierHeight%this.size != 0)
    
    
    if(this.currentBox<=0) this.currentBox = this.numberOfSquares;
    this.currentBox--;

    this.mesh.children[this.currentBox].geometry = new THREE.BoxGeometry(this.size, this.earlierHeight, this.size);
    this.mesh.children[this.currentBox].position.y = (this.earlierHeight)/2-(this.size/2);
  }

  updatePosition() {
    let rotationMod = Math.floor((Math.abs(this.mesh.rotation.y)%this.angleStep)*(100/this.speed));
    if(rotationMod == 0) this.generateMap();
    this.mesh.rotation.y -= this.speed/100;
  }
}

export default Map;