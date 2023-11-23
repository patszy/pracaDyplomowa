import * as THREE from 'three';

class Map extends THREE.Mesh {
  constructor({
    startRadius,
    endRadius,
    details,
    color = `#ffffff`,
    gravity = 0,
    position = {x: 0, y: 0, z: 0},
  }) {
    super (
      new THREE.RingGeometry(startRadius, endRadius, details),
      new THREE.MeshLambertMaterial({color, side: THREE.DoubleSide})
    )

    this.startRadius = startRadius;
    this.endRadius = endRadius;
    this.middleRadius = (startRadius+endRadius)/2;
    this.gravity = gravity;
    this.speed = 0;
    
    this.position.set(position.x, position.y, position.z);

    this.top = this.position.y;
    this.bottom = this.position.y;
    this.right = this.endRadius;
    this.left = this.startRadius;
  }
  
  setHorizontally() {
    this.rotateX(Math.PI / 2);
  }
}

export default Map;