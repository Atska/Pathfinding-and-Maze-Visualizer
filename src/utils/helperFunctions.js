/**
 * Gets the values of the coordinates of neighboring nodes. Only top, right, bottom and left neighbors.
 * @param {Object} curr_node Current node object
 * @param {Array} graph 2D graph consisting of node objects
 * @returns Array of all the valid coordinates [row, column] of neighboring nodes in an array
 */
export const getNeighbors = (curr_node, graph) => {
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

/**
 * Hashmap for keeping track of the cost of a node to determine the shortest path.
 * The cost of a node is the distance of the node to the start
 * Start cost is 0 and every unvisited node positive Infinity
 * @param {Array} graph 2D graph consisting of node objects
 * @param {Array} queue Queue as an Array
 * @returns {Object}
 */
export const setUpCostMap = (graph, startNode) => {
  let cost = {};
  graph.map((row, rowIndex) => {
    // eslint-disable-next-line array-callback-return
    return row.map((node, nodeIndex) => {
      let location = [node.row, node.column];
      if (node === startNode) {
        cost[location] = { G: 0 };
      } else {
        cost[location] = { G: Infinity };
      }
    });
  });
  return cost;
};

/**
 * Compares two array with two values [val1, val2] and checks if their values are the same
 * @param {Array} arr1 Array with two values -> [3, 3]
 * @param {Array} arr2 Array with two values -> [3, 3]
 * @returns Boolean; If array values are same -> true else -> false
 */
export const equalityChecker = (arr1, arr2) => {
  if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) return true;
  return false;
};

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
