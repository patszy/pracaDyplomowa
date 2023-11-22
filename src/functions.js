const collisionDetect = ({obj1, obj2}) => {
  // const xCollision = obj1.right >= obj2.left && obj1.left <= obj2.right;
  const yCollision = obj1.bottom + obj1.velocity.y <= obj2.top && obj1.top >= obj2.bottom;
  // const zCollision = obj1.front >= obj2.back && obj1.back <= obj2.front
    
  return yCollision;
}

export { collisionDetect };