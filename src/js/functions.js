const checkBoxCollision = (obj1, obj2) => {
  const x = obj1.left + obj1.velocity.x <= obj2.right && obj1.right >= obj2.left;
  const y = obj1.bottom + obj1.velocity.y <= obj2.top && obj1.top >= obj2.bottom;
  const z = obj1.front + obj1.velocity.z >= obj2.back && obj1.back <= obj2.front;
  
  return {x, y, z};
}

const checkSphereCollision = (obj1, obj2) => {
  const center1 = obj1.mesh.position.clone();
  const center2 = obj2.mesh.position.clone();
  const distanceVector = center2.clone().sub(center1);
  const radiusSum = obj1.radius + obj2.radius;

  if (distanceVector.length() < radiusSum) return true;

  return false;
}

const handleWindowResize = (camera, renderer) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

const drawRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function degreeToRadians(degree) {
  return (Math.PI / 180) * degree;
}

export { checkBoxCollision, checkSphereCollision, handleWindowResize, drawRandom, degreeToRadians };