const collisionDetect = ({obj1, obj2}) => {
  const yCollision = obj1.bottom + obj1.velocity.y <= obj2.top && obj1.top >= obj2.bottom;

  return yCollision;
}

const mapBorderDetect = ({obj1, obj2}) => {
  const rCollision = {
    l: obj1.positionRadius-obj1.radius <= obj2.startRadius,
    r: obj1.positionRadius+obj1.radius >= obj2.endRadius
  }
  
  return rCollision;
}

export { collisionDetect, mapBorderDetect };