export const createGraph = (
  rowSize,
  colSize,
  isWall,
  isStart,
  isEnd,
  basecase
) => {
  const graph = [];
  // create a 2D Array
  for (let row = 0; row < rowSize; row++) {
    const currentRow = [];
    for (let column = 0; column < colSize; column++) {
      // create an object with node coordinates. Starts and end return a true bool when they hit the coordinates
      currentRow.push(
        createNode(row, column, isWall, isStart, isEnd, basecase)
      );
    }
    graph.push(currentRow);
  }
  return graph;
};

export const createNode = (row, column, isWall, isStart, isEnd, basecase) => {
  const nodeSchema = {
    row: row,
    column: column,
    wall: isWall,
    start: isStart,
    end: isEnd,
  };
  if (basecase === "resetAll")
    document.getElementById([row, column]).className = "node";

  return nodeSchema;
};

export const setStartNode = (graph, row, column) => {
  graph[row][column].start = true;
};

export const deleteStartNode = (graph, row, column) => {
  if (graph[row][column]) {
    graph[row][column].start = false;
  }
};

export const setEndNode = (graph, row, column) => {
  graph[row][column].end = true;
};

export const deleteEndNode = (graph, row, column) => {
  graph[row][column].end = false;
};

export const setWall = (graph, row, column) => {
  graph[row][column].wall = true;
  return graph;
};

export const deleteWall = (graph, row, column) => {
  graph[row][column].wall = false;
  return graph;
};

export const animateSearchProcess = (neighborList, shortestPath) => {
  for (let i = 0; i < neighborList.length; i++) {
    setTimeout(() => {
      let currRow = neighborList[i][0];
      let currColumn = neighborList[i][1];
      document.getElementById([currRow, currColumn]).className = "node-search";
      if (i === neighborList.length - 1) {
        return setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 150);
      }
    }, 30 * i);
  }
};

export const animateShortestPath = (shortestPath) => {
  for (let i = 0; i < shortestPath.length - 1; i++) {
    setTimeout(() => {
      let currRow = shortestPath[i][0];
      let currColumn = shortestPath[i][1];
      document.getElementById([currRow, currColumn]).className =
        "node-shortest-path";
    }, 60 * i);
  }
  return;
};

export const animateMaze = (wallList, graph, endNode) => {
  // i = 1 so we dont animate start node
  for (let i = 0; i < wallList.length; i++) {
    setTimeout(() => {
      const currRow = wallList[i][0];
      const currColumn = wallList[i][1];
      if (currRow !== endNode.row || currColumn !== endNode.column) {
        deleteWall(graph, currRow, currColumn);
        document.getElementById([currRow, currColumn]).className = "node";
      }
    }, 30 * i);
  }
};

export const animateDivMaze = (wallList, graph) => {
  // i = 1 so we dont animate start node
  for (let i = 0; i < wallList.length; i++) {
    setTimeout(() => {
      const currRow = wallList[i][0];
      const currColumn = wallList[i][1];
      setWall(graph, currRow, currColumn);
      document.getElementById([currRow, currColumn]).className = "node-wall";
    }, 30 * i);
  }
};

export const createWalledGraph = (graph, startNode, endNode) => {
  setTimeout(() => {
    graph.forEach((row, rowIndex) => {
      return row.forEach((node, nodeIndex) => {
        const currentNode = graph[rowIndex][nodeIndex];
        if (!currentNode.start && !currentNode.end) {
          setWall(graph, rowIndex, nodeIndex);
          document.getElementById([rowIndex, nodeIndex]).className =
            "node-wall";
        }
      });
    });
  });
};
