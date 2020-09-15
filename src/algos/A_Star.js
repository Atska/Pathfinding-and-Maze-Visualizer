import { PriorityQueue } from "../utils/PriorityQueue.js";
import { createGraph } from "../utils/helperFunctions.js";

/**
 * @param {Array} graph 2D-Array/Matrix consisting of specific node objects
 * @param {Object} startNode object with row, column, wall, start, end as keys
 * @param {Object} endNode object with row, column, wall, start, end as keys
 * @returns {Array} Array of wall coordinates in arrays without start and end location
 *
 *
 */
class AStar {
  constructor(graph, startNode, endNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  shortestPath() {
    if (!this.graph || !this.startNode || !this.endNode) return false;
    const start = [this.startNode.row, this.startNode.column];
    const end = [this.endNode.row, this.endNode.column];
    let prevNode = { start: null };
    const result = [];
    const visitedNodes = [];
    let queue = new PriorityQueue();
    queue.enqueue(start, 0);
    // setUp distances grid in a hashmap -> distanceMap[[0, 0]]
    const costMap = this.setUpAStarCostMap(this.graph, this.startNode);
    costMap[start] = { G: 0, H: 0, F: 0 };
    // while nodes to visit still exists
    while (queue.values.length) {
      //Get the enqueued array
      let curr_node = queue.dequeue().val;
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

      if (curr_node) {
        // gets an array of neighbors
        let neighborList = this.getNeighbors(curr_node, this.graph);
        for (let i = 0; i < neighborList.length; i++) {
          // G: Similar to dijkstras its the distance between the current node and the start
          const G = costMap[curr_node]["G"] + 1;
          // H: The Heuristik
          const H =
            (neighborList[i][0] - end[0]) ** 2 +
            (neighborList[i][1] - end[1]) ** 2;
          // F: New Score to determine shortest path
          const F = G + H;
          // important for shortest path. Avoids checking nodes twice and updates shortest path
          if (G < costMap[neighborList[i]]["G"]) {
            // Avoids overlapping visited nodes with walled nodes and filters end node for front end purposes
            if (
              !this.graph[neighborList[i][0]][neighborList[i][1]].wall &&
              !this.equalityChecker(neighborList[i], end)
            )
              visitedNodes.push(neighborList[i]);
            costMap[neighborList[i]] = { G: G, H: H, F: F };
            prevNode[neighborList[i]] = curr_node;
            queue.enqueue(neighborList[i], F);
          }
        }
      }
    }
    return { shortestPath: result, visitedNodes: visitedNodes };
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
   *
   * @param {Array} graph 2D graph consisting of node objects
   * @param {Array} queue Queue as an Array
   */
  setUpAStarCostMap(graph, startNode) {
    let cost = {};
    graph.map((row, rowIndex) => {
      return row.map((node, nodeIndex) => {
        let location = [node.row, node.column];
        if (node === startNode) {
          cost[location] = { G: 0, H: 0, F: 0 };
        } else {
          cost[location] = { G: Infinity, H: Infinity, F: Infinity };
        }
      });
    });
    return cost;
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

export default AStar;

let g = createGraph();
let startNode = { row: 1, column: 1, wall: false, start: false, end: false };
let endNode = { row: 8, column: 14, wall: false, start: false, end: false };
g[3][3].wall = true;
const astar = new AStar(g, startNode, endNode);

console.log(astar.shortestPath());
