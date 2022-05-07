
export function VectorFree(placementMatrix, y1, x1, y2, x2) {
  console.log("VectorFree ", x1, y1, x2, y2);
  if (x1 === x2 && y1 > y2) { //  north
    console.log('direction is north');
    for (let i = y1 - 1; i > y2; i--) {
      if (placementMatrix[i][x1] !== 0) {
        console.log("VectorFree found an obstacle")
        return false;
      }
    }
  } else if (x1 < x2 && y1 == y2) { //  east
    console.log('direction is east');
    for (let i = x1 + 1; i < x2; i++) {
      if (placementMatrix[y1][i] !== 0) {
        console.log("VectorFree found an obstacle")
        return false;
      }
    }
  } else if (x1 == x2 && y1 < y2) { //  south
    console.log('direction is south');
    for (let i = y1 + 1; i < y2; i++) {
      if (placementMatrix[i][x1] !== 0) {
        console.log("VectorFree found an obstacle")
        return false;
      }
    }
  } else if (x1 > x2 && y1 == y2) { //  west
    console.log('direction is west');
    for (let i = x1 - 1; i > x2; i--) {
      if (placementMatrix[y1][i] !== 0) {
        console.log("VectorFree found an obstacle")
        return false;
      }
    }
  } else if (x1 < x2 && y1 > y2) { // northeast
    console.log(`direction is northeast. start position (x,y) is (${x1},${y1})-->(${x2},${y2})`);
    for (let i = x2 - x1; i > 0; i--) {
      console.log(`i= ${i}: (x,y) is (${x1 + i},${y1 - i}): ${placementMatrix[x1 + i][y1 - i]}`);
      if (placementMatrix[x1 + i][y1 - i] !== 0) {
        console.log("VectorFree found an obstacle")
        return false;
      }
    }
  } else if (x1 < x2 && y1 < y2) { // southeast
    console.log(`direction is southeast. start position (x,y) is (${x1},${y1})-->(${x2},${y2})`);
    for (let i = x1; i > x2; i++) {
        console.log(`i= ${i}: (x,y) is (${x1 + i},${y1 + i}): ${placementMatrix[x1 + i][y1 + i]}`);
        if (placementMatrix[x1 + i][y1 + i] !== 0 ) {
          console.log("VectorFree found an obstacle")
          return false
        }
    }
  } else if (x1 > x2 && y1 < y2) { // southwest
    console.log('direction is southwest (not implemented)');
    return true;
  } else if (x1 > x2 && y1 > y2) { //  northwest
    console.log('direction is northwest (not implemented)');
    return true;
  }
  return true;
}


