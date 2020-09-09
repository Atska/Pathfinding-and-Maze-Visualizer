/**
 * @param {Array} graph 2D-Array/Matrix consisting of specific node objects
 * @param {Object} startNode object with row, column, wall, start, end as keys
 * @param {Object} endNode object with row, column, wall, start, end as keys
 * @returns {Array} Array of wall coordinates in arrays without start and end location
 *
 * classic dijkstras is an algorithm for finding the shortest path between 2 nodes
 * Usually you need a PriorityQueue/Heap data structure but the distant between nodes
 * is constant 1 so you can use a queue
 */
class Dijkstras {
  constructor(graph, startNode, endNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  shortestPath() {
    if (!this.graph || !this.startNode || !this.endNode) return false;
    const start = [this.startNode.row, this.startNode.column];
    const end = [this.endNode.row, this.endNode.column];
    let prevNode = {};
    let queue = [start];
    const result = [];
    const allNeighbors = [];
    // setUp distances grid in a hashmap -> distanceMap[[0, 0]]
    const distanceMap = this.setUpDistances(this.graph, this.startNode);
    // while nodes to visit still exists

    while (queue.length) {
      let curr_node = queue.shift();
      // if wall skip it and continue
      if (this.graph[curr_node[0]][curr_node[1]].wall === true) continue;
      // EndCondition: Check if current node is the end node -> finish
      if (this.equalityChecker(curr_node, end)) {
        // traverse the prevNode object to get all coordinates in an Array
        while (prevNode[curr_node]) {
          result.push(curr_node);
          curr_node = prevNode[curr_node];
        }
        // Order the array from start to end node
        result.reverse();
        break;
      }

      if (curr_node || distanceMap[curr_node] !== Infinity) {
        allNeighbors.push(curr_node);
        // gets an array of neighbors
        let neighborList = this.getNeighbors(curr_node, this.graph);
        for (let i = 0; i < neighborList.length; i++) {
          // adds the distance of the current node with its neighbors which is always 1
          let sum_distance = distanceMap[curr_node] + 1;
          if (sum_distance < distanceMap[neighborList[i]]) {
            distanceMap[neighborList[i]] = sum_distance;
            prevNode[neighborList[i]] = curr_node;
            queue.push(neighborList[i]);
          }
        }
      }
    }
    return { shortestPath: result, visitedNodes: allNeighbors };
  }

  /**
   * Gets the values of the coordinates of neighboring nodes
   * @param {Object} curr_node Current node object
   * @param {Array} graph 2D graph consisting of node objects
   * @returns Array of all the valid coordinates [row, column] of neighboring nodes in an array
   */
  getNeighbors(curr_node, graph) {
    // find neighboring nodes; current[0] = row; currentrow[1] = column
    const neighbors = [];
    const rowSize = graph.length - 1;
    const columnSize = graph[0].length - 1;
    //right neighbor
    if (curr_node[1] < columnSize)
      neighbors.push([curr_node[0], curr_node[1] + 1]);
    //bottom neighbor
    if (curr_node[0] < rowSize)
      neighbors.push([curr_node[0] + 1, curr_node[1]]);
    //left neighbor
    if (curr_node[1] > 0) neighbors.push([curr_node[0], curr_node[1] - 1]);
    //top neighbor
    if (curr_node[0] > 0) neighbors.push([curr_node[0] - 1, curr_node[1]]);
    return neighbors;
  }

  /**
   * Based on graph, sets up equivalent Array consisting
   * @param {Array} graph 2D graph consisting of node objects
   * @param {Array} queue Queue as an Array
   */
  setUpDistances(graph, startNode) {
    let distances = {};
    graph.map((row, rowIndex) => {
      return row.map((node, nodeIndex) => {
        let location = [node.row, node.column];
        if (node === startNode) {
          distances[location] = 0;
        } else {
          distances[location] = Infinity;
        }
      });
    });
    return distances;
  }

  /**
   * Compares two array
   * @param {Array} arr1 Array with two values -> [3, 3]
   * @param {Array} arr2 Array with two values -> [3, 3]
   * @returns Boolean; If array values are same -> true else -> false
   */
  equalityChecker(arr1, arr2) {
    if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) return true;
    return false;
  }
}

export default Dijkstras;
