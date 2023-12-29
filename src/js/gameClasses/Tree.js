import * as THREE from 'three';
import MapElement from '../abstractClasses/MapElement';
import { drawRandom } from '../functions';

class Tree extends MapElement {
  constructor({
    height = {
      min: 5,
      max: 60,
    },
    crownColor = `#40916c`,
    ...options
  }) {
    super(options);

    this.height = drawRandom(height.min, height.max);
    this.crownColor = crownColor;

    this.mesh = new THREE.Object3D();

    this.treeGeo = new THREE.CylinderGeometry(3, 7, this.height, 5, 3);
    this.treeMat = new THREE.MeshLambertMaterial({ color: options.color });

    this.tree = new THREE.Mesh(this.treeGeo, this.treeMat);
    this.tree.castShadow = true;
    this.tree.receiveShadow = true;

    if(this.height > 30) {
      if( Math.floor(Math.random()>.5)) {
        this.crownGeo = new THREE.IcosahedronGeometry(20, 1);
        this.crownMat = new THREE.MeshLambertMaterial({ color: this.crownColor });
        this.crown = new THREE.Mesh(this.crownGeo, this.crownMat);
        this.crown.castShadow = true;
        this.crown.receiveShadow = true;
        this.crown.position.y = this.height-10;

        this.tree.add(this.crown);
      }
    }
    
    this.mesh.add(this.tree); 
    
    this.spawn();
  }

  updatePosition(map) {
    this.velocity.x = this.velocity.y += map.speed;
   
    this.mesh.position.x = Math.sin(this.theta) * Math.cos(this.phi + this.velocity.x) * map.radius;
    this.mesh.position.y = Math.sin(this.theta) * Math.sin(this.phi + this.velocity.y) * (map.radius+(this.height/2));
    this.mesh.position.z = Math.cos(this.theta) * map.radius;
    this.vec = this.mesh.position.clone();
    this.axis = new THREE.Vector3(0,1,0);
    this.mesh.quaternion.setFromUnitVectors(this.axis, this.vec.clone().normalize());
  }

  spawn() {
    this.radius = drawRandom(10, 20);
    this.phi = Math.random() * Math.PI * 2;
    this.theta = Math.acos(2 * Math.random() - 1);
    do{
      this.phi = Math.random() * Math.PI * 2;
      this.theta = Math.acos(2 * Math.random() - 1);
    }
    while (Math.cos(this.theta) * 300 > -30 && Math.cos(this.theta) * 300 < 30)

  }
}

export default Tree;
