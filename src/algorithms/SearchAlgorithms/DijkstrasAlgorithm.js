import { getNeighbors, equalityChecker } from "../../utils/helperFunctions.js";

/**
 * Classic dijkstras is an algorithm for finding the shortest path between 2 nodes.
 * Usually you need a PriorityQueue/Heap data structure but the distant between nodes
 * is constant 1 so you can use a queue
 *
 * @param {Array} graph 2D-Array/Matrix consisting of specific node objects
 * @param {Object} startNode object with row, column, wall, start, end as keys
 * @param {Object} endNode object with row, column, wall, start, end as keys
 * @returns {Array} Array of wall coordinates in arrays without start and end location
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
    const visitedNodes = [];
    // setUp distances grid in a hashmap -> distanceMap[[0, 0]]
    const distanceMap = this.setUpDistances(this.graph, this.startNode);

    // while nodes to visit still exists
    while (queue.length) {
      let curr_node = queue.shift();
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
        // removes first node for visual effect in frontend
        if (curr_node !== start) visitedNodes.push(curr_node);
        // gets an array of neighbors
        let neighborList = getNeighbors(curr_node, this.graph);
        for (let i = 0; i < neighborList.length; i++) {
          // Determine the cost "G" of a node
          // adds the distance of the current node with its neighbors which is always 1
          let sum_distance = distanceMap[curr_node] + 1;
          if (sum_distance < distanceMap[neighborList[i]]) {
            prevNode[neighborList[i]] = curr_node;
            distanceMap[neighborList[i]] = sum_distance;
            queue.push(neighborList[i]);
          }
        }
      }
    }
    return { shortestPath: result, visitedNodes: visitedNodes };
  }

  /**
   * Based on graph, put every node into an javascript object as a key and set their value
   * to Infinity and the start to 0
   * @param {Array} graph 2D graph consisting of node objects
   * @param {Array} queue Queue as an Array
   */
  setUpDistances(graph, startNode) {
    let distances = {};
    graph.map((row, rowIndex) => {
      // eslint-disable-next-line array-callback-return
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
}

export default Dijkstras;
