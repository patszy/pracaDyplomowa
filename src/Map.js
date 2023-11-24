import * as THREE from 'three';

class Map extends THREE.Mesh {
  constructor({
    startRadius,
    endRadius,
    details,
    color = `#00ff00`,
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
    this.front = 1;
    this.back = 1;
  }
  
  setHorizontally() {
    this.rotateX(Math.PI / 2);
  }

  setSpeed(speed) {
    this.speed = (2*Math.PI*this.middleRadius)/speed;
  }
}

export default Map;