import { IcosahedronGeometry, MeshLambertMaterial, Mesh, Vector3 } from 'three';

class GameObject {
  constructor({
    radius = 1,
    details = 0,
    color = '#ffffff',
    velocity = new Vector3(0, 0, 0),
    position = new Vector3(0, 0, 0),
    geometry,
    material,
  }) {
    if(new.target === GameObject) throw new Error("Cannot instantiate abstract class GameObject");

    this.radius = radius;
    this.details = details;
    this.color = color;
    this.velocity = velocity;
    this.position = position;
    
    this.geometry = geometry || new IcosahedronGeometry(this.radius, this.details);
    this.material = material || new MeshLambertMaterial({color: this.color, flatShading: true});;
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(...this.position);
    this.mesh.receiveShadow = true;
  }
}

export default GameObject;
