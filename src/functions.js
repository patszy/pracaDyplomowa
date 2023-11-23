const collisionDetect = ({obj1, obj2}) => {
  const yCollision = obj1.bottom + obj1.velocity.y <= obj2.top && obj1.top >= obj2.bottom;

  return yCollision;
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

export { collisionDetect, mapBorderDetect, handleWindowResize };