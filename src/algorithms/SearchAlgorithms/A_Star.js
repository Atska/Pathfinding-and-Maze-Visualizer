import { PriorityQueue } from "../../utils/PriorityQueue.js";
import {
  getNeighbors,
  setUpCostMap,
  equalityChecker,
} from "../../utils/helperFunctions.js";

/**
 * The A-Star algorithm is an extension of dijkstras and return the shortest path between 2 nodes
 * It uses a score to determine the direction to travel
 * The formula is F = G + H.
 * G is the distance from the node to the start node.
 * H is based on the Manhatten distance
 * F is the sum of G and H.
 * @param {Array} graph 2D-Array/Matrix consisting of specific node objects
 * @param {Object} startNode object with row, column, wall, start, end as keys
 * @param {Object} endNode object with row, column, wall, start, end as keys
 * @returns {Array} Array of wall coordinates in arrays without start and end location
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
    const costMap = setUpCostMap(this.graph, this.startNode);
    costMap[start] = { G: 0, H: 0, F: 0 };
    // while nodes to visit still exists
    while (queue.values.length) {
      //Get the enqueued array
      let curr_node = queue.dequeue().val;
      // if wall skip it and continue
      if (this.graph[curr_node[0]][curr_node[1]].wall === true) continue;
      // EndCondition: Check if current node is the end node -> finish
      if (equalityChecker(curr_node, end)) {
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
        let neighborList = getNeighbors(curr_node, this.graph);
        for (let i = 0; i < neighborList.length; i++) {
          // G: Similar to dijkstras its the distance between the current node and the start
          const G = costMap[curr_node]["G"] + 1;
          // H: The Heuristik. Manhatten distance
          const H = this.ManhattenDistance(neighborList[i], end);
          // F: New Score to determine shortest path
          const F = G + H;
          // important for shortest path. Avoids checking nodes twice and updates shortest path
          if (G < costMap[neighborList[i]]["G"]) {
            // Avoids overlapping visited nodes with walled nodes and filters end node for front end purposes
            if (
              !this.graph[neighborList[i][0]][neighborList[i][1]].wall &&
              !equalityChecker(neighborList[i], end)
            )
              visitedNodes.push(neighborList[i]);
            costMap[neighborList[i]] = { G: G };
            prevNode[neighborList[i]] = curr_node;
            queue.enqueue(neighborList[i], F);
          }
        }
      }
    }
    return { shortestPath: result, visitedNodes: visitedNodes };
  }

  ManhattenDistance(node, end) {
    return Math.abs(end[0] - node[0]) + Math.abs(end[1] - node[1]);
  }
}

export default AStar;
