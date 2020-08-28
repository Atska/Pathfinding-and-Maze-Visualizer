class RecursiveBacktracking {
  constructor(graph, startNode, endNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  runMaze() {
    const start = [this.startNode.row, this.startNode.column];
    const end = [this.endNode.row, this.endNode.column];
    const stack = [start];
    const visited = {};
    const mazeList = [];
    this.dfs(stack, visited, mazeList);
    return mazeList;
  }

  dfs(stack, visited, mazeList) {
    const currentNode = stack.pop();
    mazeList.push(currentNode);
    // node is visited!
    visited[currentNode] = true;
    // traverse 2 node at the same time -> [0, 0] neighbor are [0, 2] or [2, 0]
    // get all neighbors which werent visited yet
    const unvisitedNeigh = this.getUnvisitedNeighbors(currentNode, visited);
    // hit a dead end -> backtrack!
    if (unvisitedNeigh.length === 0) {
      // no value in stack -> dfs is finished
      if (stack.length === 0) return;
      return this.dfs(stack, visited, mazeList);
    }
    // has valid neighbors -> put back to stack to backtrack
    stack.push(currentNode);
    // get a random unvisited neighbor
    const neighbor = this.shuffleArray(unvisitedNeigh).pop();
    // get the node in between the current node and the neighbor
    const inBetweenNode = this.getInBetweenNodes(currentNode, neighbor);
    visited[inBetweenNode] = true;
    mazeList.push(inBetweenNode);
    stack.push(neighbor);
    this.dfs(stack, visited, mazeList);
  }

  getInBetweenNodes(currentNode, neigh) {
    // 1, 1 | 1, 3 | 3, 1 || 0, 0 | 0, 2 | 2, 0 || 5, 5 | 5, 3 | 3, 5
    const row = (neigh[0] - currentNode[0]) / 2;
    const col = (neigh[1] - currentNode[1]) / 2;
    const inBetweenNode = [currentNode[0] + row, currentNode[1] + col];
    return inBetweenNode;
  }

  getUnvisitedNeighbors(currentNode, visited) {
    const rowSize = this.graph.length - 2;
    const columnSize = this.graph[0].length - 2;
    const row = currentNode[0];
    const column = currentNode[1];
    const unvisited = [];
    // right
    if (column < columnSize) {
      unvisited.push([row, column + 2]);
    }
    // bottom
    if (row < rowSize) {
      unvisited.push([row + 2, column]);
    }
    // left
    if (column > 1) {
      unvisited.push([row, column - 2]);
    }
    // top
    if (row > 1) {
      unvisited.push([row - 2, column]);
    }
    return unvisited.filter((i) => {
      return visited[i] === undefined;
    });
  }

  shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
}

export default RecursiveBacktracking;

export const createGraph = () => {
  const graph = [];
  let rowSize = 21;
  let colSize = 35;
  // create a 2D Array
  for (let row = 0; row < rowSize; row++) {
    const currentRow = [];
    for (let column = 0; column < colSize; column++) {
      // create an object with node coordinates. Starts and end return a true bool when they hit the coordinates
      currentRow.push(createNode(row, column));
    }
    graph.push(currentRow);
  }
  return graph;
};

export const createNode = (row, column) => {
  const nodeSchema = {
    row: row,
    column: column,
    wall: false,
    start: false,
    end: false,
  };
  return nodeSchema;
};
const test = createGraph();
let start = { row: 1, column: 1 };
let end = { row: 10, column: 10 };
const rec = new RecursiveBacktracking(test, start, end);
console.log(rec.runMaze());
