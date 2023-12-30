import Map from "./gameClasses/Map";
import Hero from "./gameClasses/Hero";

const checkBoxCollision = (obj1, obj2) => {
  const x = obj1.right >= obj2.left && obj1.left <= obj2.right;
  const y = obj1.bottom + obj1.velocity.y <= obj2.top && obj1.top >= obj2.bottom;
  const z = obj1.front <= obj2.back && obj1.back >= obj2.front;

  return x && y && z;
}

const checkMapCollision = (hero, map) => {
  // const x = map.right >= map.left && map.left <= map.right;
  let y = false;
  for(let i=0; i<map.mesh.children.length; i++){
    y = hero.bottom + hero.velocity.y <= map.mesh.children[i].top && hero.top >= map.mesh.children[i].bottom;
    if(y == true) return y;
  }
  // const z = map.front <= map.back && map.back >= map.front;
  // console.log(y);
  return y;
}

const checkSphereCollision = (obj1, obj2) => {
  const center1 = obj1.mesh.position.clone().add(obj1.velocity);
  const center2 = obj2.mesh.position.clone().add(obj2.velocity);

  if (center2.sub(center1).length() < obj1.radius + obj2.radius) return true;

  return false;
}

const drawRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const degreeToRadians = (degree) => {
  return (Math.PI / 180) * degree;
}

const circleCircumference = (radius) => {
  return 2*Math.PI*radius;
}

export { checkMapCollision, checkBoxCollision, checkSphereCollision, drawRandom, degreeToRadians, circleCircumference };