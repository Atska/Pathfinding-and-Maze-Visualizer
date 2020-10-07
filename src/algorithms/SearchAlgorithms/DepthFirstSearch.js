import { equalityChecker, getNeighbors } from "../../utils/helperFunctions.js";
/**
 * The depth-first-search is a classic algorithm for traveling trees or graphs.
 * Its not a good algorithm for pathfinding and rarely delivers the shortest path.
 * The algorithm itself is done iteratly with a stack data structure.
 * @param {Array} graph 2D-Array/Matrix consisting of specific node objects
 * @param {Object} startNode object with row, column, wall, start, end as keys
 * @param {Object} endNode object with row, column, wall, start, end as keys
 * @returns {Array} Array of wall coordinates in arrays without start and end location
 */
class DepthFirstSearch {
  constructor(graph, startNode, endNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  search() {
    const start = [this.startNode.row, this.startNode.column];
    const end = [this.endNode.row, this.endNode.column];
    const result = [];
    const visitedNodes = [];
    const stack = [start];
    const previousNodes = {};
    const visited = this.setUpVisitedMap(this.graph, this.startNode);

    while (stack.length > 0) {
      let curr_node = stack.pop();
      visited[curr_node] = true;
      //Found the node
      if (equalityChecker(curr_node, end)) {
        // traverse the prevNode object to get all coordinates in an Array
        while (previousNodes[curr_node]) {
          result.push(curr_node);
          curr_node = previousNodes[curr_node];
        }
        // Order the array from start to end node
        result.reverse();
        break;
      }
      // if its a wall => skip
      if (this.graph[curr_node[0]][curr_node[1]].wall === true) continue;
      // get all neighbors of the current node
      const allNeighbors = getNeighbors(curr_node, this.graph);
      for (let i = 0; i < allNeighbors.length; i++) {
        const neighborNode = allNeighbors[i];
        // check if node wasnt visited otherwise ignore it
        if (!visited[neighborNode]) {
          // put the unvisited node on the stack for backtracking
          stack.push(neighborNode);
          previousNodes[neighborNode] = curr_node;
          // for frontend purposes: Check if neighbors arent walls or endNode
          if (
            !this.graph[neighborNode[0]][neighborNode[1]].wall &&
            !equalityChecker(neighborNode, end)
          )
            visitedNodes.push(neighborNode);
        }
      }
    }
    return { path: result, visitedNodes: visitedNodes };
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

export default DepthFirstSearch;
