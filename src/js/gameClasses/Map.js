
import GameElement from '../abstractClasses/GameElement';
import * as THREE from 'three';
import { drawRandom } from '../functions';

class Map extends GameElement{
  constructor({
    gravity = 1,
    ...options
  }) {
    super(options);

    this.gravity = gravity;
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

    this.geometryBox = new THREE.BoxGeometry(1, 1, 1);
    this.materialBox = new THREE.MeshLambertMaterial({ color: options.color });
    this.meshBox = new THREE.Mesh(this.geometryBox, this.materialBox);
    this.numberOfSquares = Math.floor((2*Math.PI*this.radius));
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
    // let changeHeight = {min:0, max:1};
    // (this.earlierHeight<=1) ? changeHeight.min = 0 : changeHeight.min = 1;
    // (this.earlierHeight>=3) ? changeHeight.max = -2 : changeHeight.max = 2;
    // this.earlierHeight = drawRandom(this.earlierHeight-changeHeight.min, this.earlierHeight+changeHeight.max);
    
    // if(this.currentBox<=0) this.currentBox = this.numberOfSquares-1;
    // this.currentBox--;

    // this.mesh.children[this.currentBox].geometry = new THREE.BoxGeometry(1, this.earlierHeight, 1);
    // this.mesh.children[this.currentBox].position.y = (this.earlierHeight)/2-.5;
  }

  updatePosition() {
    this.mesh.rotation.y -= 0.01;
  }
}

export default Map;