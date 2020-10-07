import {
  shuffleArray,
  filterStartAndEndNode,
} from "../../utils/helperFunctions.js";
import Set from "../../utils/Set.js";

/**
 * This algorithm is based on the binary tree data structure.
 * Like the binary tree every branch has to children.
 * There will never be a crossroads, and all dead ends have passages pointing down or right,
 * and never up or left.
 * Two of the four sides will form a corridor where no wall can exists.
 * @param {Array} graph 2D-Array/Matrix consisting of specific node objects
 * @param {Object} startNode object with row, column, wall, start, end as keys
 * @param {Object} endNode object with row, column, wall, start, end as keys
 * @returns {Array} Array of wall coordinates in arrays without start and end location
 */
class BinaryTreeMaze {
  constructor(graph, startNode, endNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  runMaze() {
    // we need a Set data structure to prevnt dublicate entries
    const result = new Set();
    const start = [this.startNode.row, this.startNode.column];
    const end = [this.endNode.row, this.endNode.column];

    // iterate through the graph
    this.graph.forEach((row, rowIndex) => {
      row.forEach((node, nodeIndex) => {
        // because of the grid design of the app, always skip a row to form the wall nodes
        // horitontal / vertical walls are always on even rows and columns
        if (rowIndex % 2 === 0 && nodeIndex % 2 === 0) {
          const allNeighbors = this.getNeighbors(rowIndex, nodeIndex);
          if (allNeighbors) {
            const { currentNode, neighbors } = allNeighbors;
            const chosenNeighbor = this.flipCoin(neighbors);
            const inBetweenNode = this.getInBetweenNode(
              currentNode,
              chosenNeighbor
            );
            result.add(chosenNeighbor);
            result.add(inBetweenNode);
            result.add(currentNode);
          }
        }
      });
    });
    return filterStartAndEndNode(result.get(), start, end);
  }

  /**
   * Get north or west neighbors of the current node.
   * Must travel 2 nodes [2, 2] => west neighbor [2,0] because of the grid design
   * @param {Int} row row number of the current node
   * @param {Int} column column number of the current node
   * @returns {Object} {currentNode: [currentNode-row, currentNode-column], neighbots: [All neighbors as arrays]}
   */
  getNeighbors(row, column) {
    let neighbors = [];
    // north
    if (row >= 2) neighbors.push([row - 2, column]);
    // west
    if (column >= 2) neighbors.push([row, column - 2]);
    // skip node which has no north or west neighbors
    if (neighbors.length === 0) return;
    return { currentNode: [row, column], neighbors: neighbors };
  }
  /**
   * Shuffles an array and returns first value of shuffled array to get a random neighbor
   * @param {Array} neighborArray Array of all neighbors
   * @returns {Array} returns one array of the row and column data of the neighbor node
   */
  flipCoin(neighborArray) {
    if (neighborArray.length === 1) return neighborArray[0];
    return shuffleArray(neighborArray)[0];
  }
  /**
   * We travel 2 nodes at the same time. If we set the current node and the neighbor node to
   * passable nodes we need to make the in between node of both to a passable node too.
   * @param {Array} currentNode coordinates of the current node
   * @param {Array} neighborNode coordinates of the neighbor node
   * @returns {Array}
   */
  getInBetweenNode(currentNode, neighborNode) {
    const row = currentNode[0] - neighborNode[0];
    const column = currentNode[1] - neighborNode[1];
    // get north in between node
    if (row !== 0) return [currentNode[0] - 1, currentNode[1]];
    // get west in between node
    if (column !== 0) return [currentNode[0], currentNode[1] - 1];
  }
}

export default BinaryTreeMaze;
