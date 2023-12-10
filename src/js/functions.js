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

export { checkSphereCollision, drawRandom, degreeToRadians, circleCircumference };