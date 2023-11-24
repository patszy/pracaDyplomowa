const collisionDetect = ({obj1, obj2}) => {
  const xCollision = obj1.left + obj1.velocity.x <= obj2.right && obj1.right >= obj2.left;
  const yCollision = obj1.bottom + obj1.velocity.y <= obj2.top && obj1.top >= obj2.bottom;
  const zCollision = obj1.front + obj1.velocity.z >= obj2.back && obj1.back <= obj2.front;
  
  return {xCollision, yCollision, zCollision};
}

const mapBorderDetect = ({obj1, obj2}) => {
  const rCollision = {
    l: obj1.left <= obj2.left,
    r: obj1.right >= obj2.right
  }
  
  return rCollision;
}

const handleWindowResize = (game, renderer, camera) => {
  game.setWidthHeight();
  renderer.setSize(game.width, game.height);
  camera.aspect = game.width / game.height;
  camera.updateProjectionMatrix();
}

const drawRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export { collisionDetect, mapBorderDetect, handleWindowResize, drawRandom };