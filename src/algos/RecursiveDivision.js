/**
 * @param {Array} graph 2D-Array/Matrix consisting of specific node objects
 * @param {Object} startNode object with row, column, wall, start, end as keys
 * @param {Object} endNode object with row, column, wall, start, end as keys
 * @returns {Array} Array of wall coordinates in arrays without start and end location
 *
 * The recursive divison is an algorithm which splits a grid either horizontal or vertical
 * You have to determine a random coordinate and draw the wall
 * The wall has to have a randomly generated gap
 * By dividing the grid you create subgrids which have to be divided and walled again
 * Therefore you need to call 4 recursions: If split vertically left and right, otherwise if split horizontal top and bottom
 * The recursive function stops when the difference between end and start coordinates is 1
 *
 * It is important to notice that the walls must have 1 passable node in between each other
 * At the coordinate of the gap cannot be a wall
 * The most sensitive part of this algorithm is in generating random values for gap and walls
 */

export class RecursiveDivision {
  constructor(graph, startNode, endNode) {
    this.graph = graph;
    this.startNode = startNode;
    this.endNode = endNode;
  }
  // executes the maze
  runMaze() {
    let wallList = [];
    const startX = 0;
    const startY = 0;
    const endX = this.graph[0].length - 1;
    const endY = this.graph.length - 1;
    const start = [this.startNode.row, this.startNode.column];
    const end = [this.endNode.row, this.endNode.column];
    // fill wallList with Arrays of coordinates -> [row, column]
    this.mazeDivision(
      startX,
      startY,
      endX,
      endY,
      this.isHorizontal(),
      wallList
    );
    // filter the newly filled wallList. This is optional for the frontend, so you dont wall a start or end node
    wallList = this.filterStartAndEndNode(wallList, start, end);
    return wallList;
  }

  mazeDivision(startX, startY, endX, endY, isHorizontal, wallList) {
    if (!isHorizontal) {
      if (endX - startX < 2) {
        return;
      }
      // generate the random x coordinate for the wall
      let wallX = Math.floor(this.randomNum(startX + 1, endX) / 2) * 2;
      // generate the random x coordinate for the gap
      let gap =
        Math.floor(Math.floor(Math.random() * (endY - startY) + startY) / 2) *
          2 +
        1;
      // set up vertical walls based on wall x and gap
      this.divideVertically(startY, wallX, endY, gap, wallList);

      this.mazeDivision(
        startX,
        startY,
        wallX - 1,
        endY,
        this.isHorizontal(wallX - 1 - startX, endY - startY),
        wallList
      );

      this.mazeDivision(
        wallX + 1,
        startY,
        endX,
        endY,
        this.isHorizontal(endX - (wallX + 1), endY - startY),
        wallList
      );
    }

    if (isHorizontal) {
      if (endY - startY < 2) {
        return;
      }
      // generate the random x coordinate for the wall
      let wallY = Math.floor(this.randomNum(startY + 1, endY) / 2) * 2;
      // generate the random x coordinate for the gap
      let gap =
        Math.floor(Math.floor(Math.random() * (endX - startX) + startX) / 2) *
          2 +
        1;
      // set up vertical walls based on wall x and gap
      this.divideHorizontally(startX, wallY, endX, gap, wallList);

      this.mazeDivision(
        startX,
        startY,
        endX,
        wallY - 1,
        this.isHorizontal(endX - startX, wallY - 1 - startY),
        wallList
      );
      this.mazeDivision(
        startX,
        wallY + 1,
        endX,
        endY,
        this.isHorizontal(endX - startX, endY - (wallY + 1)),
        wallList
      );
    }
  }
  /**
   * Gets a random int value in range of min and max
   * @param {int} min smaller value
   * @param {int} max higher value
   * @returns random value
   */
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Checks if we have to divide the grid vertically or horizontally
   * @param {Int} width width of the current grid
   * @param {Int} height height of the current grid
   * @returns {Boolean} horizontal or not
   */
  isHorizontal(width, height) {
    if (width < height) {
      return true;
    } else if (height < width) {
      return false;
    } else {
      return Math.random() < 0.5 ? true : false;
    }
  }

  /**
   * Sets up walls
   * @param {Int} startY start value of Y coordinate
   * @param {Int} wallX random generated coordinate of the wall
   * @param {Int} wallLength height of the grid
   * @param {Int} gap random generated coordinated of the gap
   * @param {Array} wallList array of wall coordinates
   */
  divideVertically(startY, wallX, wallLength, gap, wallList) {
    for (let wallY = startY; wallY <= wallLength; wallY++) {
      if (wallY !== gap) {
        wallList.push([wallY, wallX]);
      }
    }
  }
  /**
   * Sets up walls
   * @param {Int} startX start value of X coordinate
   * @param {Int} wallY random generated coordinate of the wall
   * @param {Int} wallLength height of the grid
   * @param {Int} gap random generated coordinated of the gap
   * @param {Array} wallList array of wall coordinates
   */
  divideHorizontally(startX, wallY, wallLength, gap, wallList) {
    for (let wallX = startX; wallX <= wallLength; wallX++) {
      if (wallX !== gap) {
        wallList.push([wallY, wallX]);
      }
    }
  }
  /**
   * Simple function to filter the start and end nodes out of the wall
   * This is only for frontend purposes, so you dont overwrite start and end nodes will walls
   * @param {Array} wallList array of all wall nodes
   * @param {Array} start [row, column] coordinates of the start node
   * @param {Array} end [row, column] coordinates of the end node
   * @returns {Array} filtered array
   */
  filterStartAndEndNode(wallList, start, end) {
    if (!wallList || !start || !end) return false;
    console.log(wallList);
    let newArr = [];
    for (let index = 0; index < wallList.length; index++) {
      const element = wallList[index];
      if (
        !this.equalityChecker(start, element) &&
        !this.equalityChecker(end, element)
      ) {
        newArr.push(element);
      }
    }
    console.log(newArr);
    wallList = newArr;
    return wallList;
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

export default RecursiveDivision;
