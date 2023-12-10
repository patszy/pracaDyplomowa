import * as THREE from 'three';
import MapElement from '../abstractClasses/MapElement';
import { degreeToRadians, drawRandom } from '../functions';

class Cloud extends MapElement {
  constructor({
    speed = 0.001,
    scale = new THREE.Vector3(drawRandom(1, 2), drawRandom(5, 7)*0.1, drawRandom(1, 2)),
    ...options
  }) {
    super(options);

    this.speed = speed;
    this.scale = scale;

    this.mesh = new THREE.Object3D();
    this.mesh.position.set(...this.position);

    this.cloudGeo = new THREE.DodecahedronGeometry(options.radius, options.details);
    this.cloudMat = new THREE.MeshLambertMaterial({ color: options.color, opacity: 0.7, transparent: true });

    for(let i=0; i<drawRandom(1, 3); i++) {
      this.cloud = new THREE.Mesh(this.cloudGeo, this.cloudMat);
      this.cloud.position.set(drawRandom(-20, 20), drawRandom(-20, 20), drawRandom(-20, 20));
      this.cloud.castShadow = true;
      this.cloud.receiveShadow = true;
      this.mesh.add(this.cloud); 
    }
    
    this.spawn();
  }

  updatePosition(map) {
    this.velocity.x = this.velocity.y += this.speed;
    this.mesh.position.x = Math.cos(degreeToRadians(this.startAngle) + this.velocity.x) * (map.radius + this.aboveMapHeight) + this.rotationCenter.x;
    this.mesh.position.y = Math.sin(degreeToRadians(this.startAngle) + this.velocity.y) * (map.radius + this.aboveMapHeight) + this.rotationCenter.y;
    this.mesh.position.z = this.position.z;
  }

  spawn() {
    this.radius = drawRandom(10, 20);
    this.speed = drawRandom(1, 10)*0.0001;
    this.position.z = drawRandom(-300, 300);
    
    if(this.position.z < -150 || this.position.z > 150) this.aboveMapHeight = drawRandom(0,70);
    else this.aboveMapHeight = drawRandom(70, 150);

    this.scale = new THREE.Vector3(drawRandom(1, 2), drawRandom(5, 7)*0.1, drawRandom(1, 2));
    
    for(let i=0; i<this.mesh.children.length; i++){
      this.mesh.children[i].geometry = new THREE.DodecahedronGeometry(this.radius, this.details);
    }

    this.mesh.scale.set(...this.scale);
  }
}

export default Cloud;
