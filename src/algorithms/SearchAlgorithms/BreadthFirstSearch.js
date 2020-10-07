import { equalityChecker, getNeighbors } from "../../utils/helperFunctions.js";
import Set from "../../utils/Set.js";
/**
 * The breadth-first-search is a classic tree or graph traversal algorithm.
 * It is an uninformed algorithm which guarantees the shortest path.
 * @param {Array} graph 2D-Array/Matrix consisting of specific node objects
 * @param {Object} startNode object with row, column, wall, start, end as keys
 * @param {Object} endNode object with row, column, wall, start, end as keys
 * @returns {Array} Array of wall coordinates in arrays without start and end location
 */
class BreadthFirstSearch {
  constructor(graph, startNode, endNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  search() {
    const start = [this.startNode.row, this.startNode.column];
    const end = [this.endNode.row, this.endNode.column];
    const result = [];
    const visitedNodes = new Set();
    const queue = [start];
    const previousNodes = {};
    const visited = this.setUpVisitedMap(this.graph, this.startNode);

    while (queue.length > 0) {
      let currentNode = queue.shift();
      // set the startnode to visited
      if (equalityChecker(currentNode, start)) visited[currentNode] = true;
      // if wall current node is a wall => skip node
      if (this.graph[currentNode[0]][currentNode[1]].wall === true) continue;
      // end condition
      if (equalityChecker(currentNode, end)) {
        // traverse the prevNode object to get all coordinates in an Array
        while (previousNodes[currentNode]) {
          result.push(currentNode);
          currentNode = previousNodes[currentNode];
        }
        // Order the array from start to end node
        result.reverse();
        break;
      }
      // get neighbors of the current node
      const neighbors = getNeighbors(currentNode, this.graph);
      for (let i = 0; i < neighbors.length; i++) {
        const elem = neighbors[i];
        if (!visited[elem]) {
          visited[elem] = true;
          queue.push(elem);
          previousNodes[elem] = currentNode;
          if (!equalityChecker(currentNode, start))
            visitedNodes.add(currentNode);
        }
      }
    }
    return { path: result, visitedNodes: visitedNodes.get() };
  }

  setUpVisitedMap(graph, startNode) {
    const visited = {};
    graph.map((row, rowIndex) => {
      // eslint-disable-next-line array-callback-return
      return row.map((node, nodeIndex) => {
        let location = [node.row, node.column];
        visited[location] = false;
      });
    });
    return visited;
  }
}

export default BreadthFirstSearch;
