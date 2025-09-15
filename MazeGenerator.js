const canvas1 = document.querySelector("#paper1");
const contexts1 = canvas1.getContext("2d");

const width = 20;
const rows = canvas1.height / width;
const cols = canvas1.width / width;
let cells = [];

class Cell {
  constructor(x, y, visited) {
    this.x = x;
    this.y = y;
    this.visited = visited;
  }

  removeWall(neighbor) {
    // 0: Top 1: Right 2: Bottom 3: Left
    let side;

    if (this.x == neighbor.x && this.y < neighbor.y) {
      side = 2;
    } 
    else if (this.x == neighbor.x && this.y > neighbor.y) {
      side = 0;
    } 
    else if (this.x < neighbor.x && this.y == neighbor.y) {
      side = 1;
    } 
    else if (this.x > neighbor.x && this.y == neighbor.y) {
      side = 3;
    }

    if (side == 0 && this.y - width >= 0) {
      contexts1.beginPath();
      contexts1.rect(this.x + 2, this.y - 2, width - 4, 4);
      contexts1.fillStyle = "black";
      contexts1.fill();
      contexts1.strokeStyle = "black";
      contexts1.stroke();
    } else if (side == 2 && this.y + width <= canvas1.height) {
      contexts1.beginPath();
      contexts1.rect(this.x + 2, this.y + width - 2, width - 4, 4);
      contexts1.fillStyle = "black";
      contexts1.fill();
      contexts1.strokeStyle = "black";
      contexts1.stroke();
    } else if (side == 1 && this.x + width <= canvas1.width) {
      contexts1.beginPath();
      contexts1.rect(this.x + width - 2, this.y + 2, 4, width - 4);
      contexts1.fillStyle = "black";
      contexts1.fill();
      contexts1.strokeStyle = "black";
      contexts1.stroke();
    } else if (side == 3 && this.x - width >= 0) {
      contexts1.beginPath();
      contexts1.rect(this.x - 2, this.y + 2, 4, width - 4);
      contexts1.fillStyle = "black";
      contexts1.fill();
      contexts1.strokeStyle = "black";
      contexts1.stroke();
    }
  }

  returnNeighbors() {
    // 0: Top 1: Right 2: Bottom 3: Left
    let neighbors = [];
    let neighbor;

    neighbor = index(this.x, this.y - width);

    if(neighbor >= 0) {
      if (this.y - width >= 0 && cells[neighbor].visited != true) {
        neighbors.push(cells[neighbor]);
      }
    }

    neighbor = index(this.x, this.y + width);
    if(neighbor >= 0) {
      if (this.y + width <= canvas1.height && cells[neighbor].visited != true) {
        neighbors.push(cells[neighbor]);
      }
    }

    neighbor = index(this.x + width, this.y);
    if(neighbor >= 0) {
      if (this.x + width <= canvas1.width && cells[neighbor].visited != true) {
        neighbors.push(cells[neighbor]);
      }
    }

    neighbor = index(this.x - width, this.y);
    if(neighbor >= 0) {
      if (this.x - width >= 0 && cells[neighbor].visited != true) {
        neighbors.push(cells[neighbor]);
      }
    }

    if(neighbors.length == 0) {
      return null;
    }
    else {
      return neighbors[Math.floor(Math.random() * neighbors.length)];
    }
  }

  colorCell(color) {
    contexts1.beginPath();
    contexts1.rect(this.x, this.y, width, width);
    contexts1.fillStyle = color;
    contexts1.fill();
    contexts1.stroke();
  }
}

// Converts two-dimensional coordinates to one-dimensional index
function index(x, y) {
  x = x/width;
  y = y/width;

  if(y < 0 || x < 0 || x > cols - 1 || y > rows - 1) {
    return -1;
  }
  else {
    return y * rows + x;
  }
}

// Initializing the cells
function createCells() {
  let cells = [];

  for (let y = 0; y < canvas1.height; y += width) {
    for (let x = 0; x < canvas1.width; x += width) {
      cells.push(new Cell(x, y, false));
    }
  }

  return cells;
}
// Drawing the grid
function drawGrid() {
  for (let x = 0; x <= canvas1.width; x += width) {
    contexts1.beginPath();
    contexts1.moveTo(x, 0);
    contexts1.lineTo(x, canvas1.height);
    contexts1.strokeStyle = 'white';
    contexts1.stroke();
  }

  for (let y = 0; y <= canvas1.height; y += width) {
    contexts1.beginPath();
    contexts1.moveTo(0, y);
    contexts1.lineTo(canvas1.width, y);
    contexts1.strokeStyle = 'white';
    contexts1.stroke();
  }
}

async function sleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}

// Maze generating algorithm
// pop push shift unshift

async function generateMaze() {
  drawGrid();
  cells = createCells();

  let stack = [];
  let neighbor = null;

  stack.unshift(cells[0]);
  cells[0].visited = true;

  let current = cells[0];

  while (stack.length != 0) {
    neighbor = current.returnNeighbors();

    if (neighbor != null) {
      current.removeWall(neighbor);
      neighbor.visited = true;
      stack.unshift(neighbor);
      current = neighbor;
    } 
    else {
      current = stack.shift();
    }

    contexts1.beginPath();
    contexts1.rect(current.x + 4, current.y + 4, width - 6, width - 6);
    contexts1.fillStyle = 'green';
    contexts1.fill();

    await sleep(100);

    contexts1.beginPath();
    contexts1.rect(current.x + 4, current.y + 4, width - 6, width - 6);
    contexts1.fillStyle = 'black';
    contexts1.fill();
    
  }
}

generateMaze();

//canvas1.addEventListener("mousemove", function (event) {

//   let x1;

//   for (x1 = 0; x1 < canvas1.width; x1 += width) {
//     if (event.offsetX < x1) {
//       break;
//     }
//   }

//   let y1;

//   for (y1 = 0; y1 < canvas1.height; y1 += width) {
//     if (event.offsetY < y1) {
//       break;
//     }
//   }

//   cells[index(x1, y1)].colorCell();
// });
