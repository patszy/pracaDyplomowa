import GameObject from './GameObject';

class MapElement extends GameObject {
  constructor({
    angle = 0,
    aboveMapHeight = 0,
    ...options
  }) {
    if(new.target === MapElement) throw new Error("Cannot instantiate abstract class MapElement");

    super(options);
    
    this.angle = angle;
    this.aboveMapHeight = aboveMapHeight;
    
    this.mesh.castShadow = true;
  }

  updatePosition(map) {
    this.angle += map.rotationSpeed/100;

    this.mesh.position.x = map.radius * Math.cos(this.angle);
    this.mesh.position.z = map.radius * Math.sin(this.angle);
    this.mesh.position.y = this.aboveMapHeight;
  }
}

export default MapElement;
