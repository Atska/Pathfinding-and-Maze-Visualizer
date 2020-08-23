import PriorityQueue from "../utils/PriorityQueue.mjs";

const createGraph = () => {
  const graph = [];
  let rowSize = 10;
  let colSize = 10;
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

const createNode = (row, column) => {
  const nodeSchema = {
    row: row,
    column: column,
    wall: false,
    start: false,
    end: false,
  };
  return nodeSchema;
};

const dijkstras = (graph, startNode, endNode) => {
  if (!graph || !startNode || !endNode) return false;
  const end = [endNode.row, endNode.column];
  let prevNode = {};
  let queue = new PriorityQueue();
  const result = [];
  // setUp distances grid in a hashmap -> distanceMap[[0, 0]]
  // setUp queue with the startNode
  const distanceMap = setUpDistancesAndQueue(graph, queue);
  //console.log(distanceMap);
  // while nodes to visit still exists
  while (queue.values.length) {
    // get the first value from the queue array -> currentNode [row, col] -> [1, 1]
    let curr_node = queue.dequeue().val;
    // if wall continue
    if (graph[(curr_node[0], curr_node[1])].wall) continue;
    // Check if current node is the end node -> finish
    if (equalityChecker(curr_node, end)) {
      while (prevNode[curr_node]) {
        result.push(curr_node);
        curr_node = prevNode[curr_node];
      }
      break;
    }

    if (curr_node || distanceMap[curr_node] !== Infinity) {
      // gets an array of neighbors
      let neighborList = getNeighbors(curr_node, graph);
      for (let i = 0; i < neighborList.length; i++) {
        // adds the distance of the current node with its neighbors which is always 1
        let sum_distance = distanceMap[curr_node] + 1;
        if (sum_distance < distanceMap[neighborList[i]]) {
          distanceMap[neighborList[i]] = sum_distance;
          prevNode[neighborList[i]] = curr_node;
          queue.enqueue(neighborList[i], 1);
        }
      }
    }
  }
  return result.reverse();
};

/**
 *
 */
const setUpDistancesAndQueue = (graph, queue) => {
  let distances = {};
  graph.map((row, rowIndex) => {
    return row.map((node, nodeIndex) => {
      let location = [node.row, node.column];
      if (node === startNode) {
        distances[location] = 0;
        queue.enqueue(location, 1);
      } else {
        distances[location] = Infinity;
        queue.enqueue(location, Infinity);
      }
    });
  });
  return distances;
};

/**
 * Returns an array of the coordinates of the neighboring nodes
 */
const getNeighbors = (curr_node, graph) => {
  // find neighboring nodes; current[0] = row; currentrow[1] = column
  const neighbors = [];
  const rowSize = graph.length - 1;
  const columnSize = graph[0].length - 1;
  //right neighbor
  if (curr_node[1] < columnSize)
    neighbors.push([curr_node[0], curr_node[1] + 1]);
  //bottom neighbor
  if (curr_node[0] < rowSize) neighbors.push([curr_node[0] + 1, curr_node[1]]);
  //left neighbor
  if (curr_node[1] > 0) neighbors.push([curr_node[0], curr_node[1] - 1]);
  //top neighbor
  if (curr_node[0] > 0) neighbors.push([curr_node[0] - 1, curr_node[1]]);
  return neighbors;
};

const equalityChecker = (arr1, arr2) => {
  if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) return true;
  return false;
};

/**
 * Main
 */
const graph = createGraph();

const endNode = {
  row: 1,
  column: 1,
  wall: false,
  start: false,
  end: true,
};
const startNode = {
  row: 8,
  column: 8,
  wall: false,
  start: true,
  end: false,
};
graph[8][8] = startNode;
graph[1][1] = endNode;
//console.log(graph);
//dijkstras(graph, startNode, endNode);
console.log(dijkstras(graph, startNode, endNode));
//console.log(graph);
