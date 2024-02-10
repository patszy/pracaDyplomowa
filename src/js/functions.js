const checkBoxCollision = (obj1, obj2) => {
  const x = obj1.right >= obj2.left && obj1.left <= obj2.right;
  const y = obj1.bottom + obj1.velocity.y <= obj2.top && obj1.top >= obj2.bottom;
  const z = obj1.front <= obj2.back && obj1.back >= obj2.front;

  return {x, y, z};
}

const checkMapCollision = (hero, map) => {
  let x, y, z = false;

  for(let i=0; i<map.mesh.children.length; i++){
    x = hero.right >= map.mesh.children[i].left && hero.left <= map.mesh.children[i].right;
    z = hero.back >= map.mesh.children[i].front && hero.front <= map.mesh.children[i].back;

    if(x && z) {
      y = hero.bottom + hero.velocity.y <= map.mesh.children[i].top && hero.top >= map.mesh.children[i].bottom;
      if(y) return {x, y, z};
    }
  }

  return {x, y, z};
}

const checkSphereCollision = (obj1, obj2) => {
  const center1 = obj1.mesh.position.clone();
  const center2 = obj2.mesh.position.clone();

  if (center2.sub(center1).length() < obj1.radius + obj2.radius) return true;

  return false;
}

export { checkMapCollision, checkBoxCollision, checkSphereCollision };