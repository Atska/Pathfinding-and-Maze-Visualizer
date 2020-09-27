import React, { Component } from "react";
// Components
import Node from "./Node.js";
import ControlPanel from "./ControlPanel.js";

// CSS
import "./Field.css";
// Algorithms
import AStar from "../algorithms/A_Star.js";
import DepthFirstSearch from "../algorithms/DepthFirstSearch.js";
import GreedyBFS from "../algorithms/GreedyBestFirstSearch";
import Dijkstras from "../algorithms/DijkstrasAlgorithm.js";
import RecursiveBacktracking from "../algorithms/RecursiveBacktracking.js";
import RecursiveDivision from "../algorithms/RecursiveDivision.js";
import BreadthFirstSearch from "../algorithms/BreadthFirstSearch.js";
import BinaryTreeMaze from "../algorithms/BinaryTreeMaze.js";

class Field extends Component {
  // graph size
  rowsize = 21;
  columnSize = 43;

  state = {
    graph: [],
    startNodeExits: false,
    endNodeExists: false,
    mouseIsClicked: false,
    startNode: null,
    endNode: null,
  };

  componentDidMount() {
    const newGraph = createGraph(
      this.rowsize,
      this.columnSize,
      false,
      false,
      false
    );
    this.setState({ graph: newGraph });
  }

  onClick = (row, column) => {
    const { startNodeExits, endNodeExists, graph } = this.state;
    const { start, end } = graph[row][column];

    // set start node
    if (!startNodeExits) {
      setStartNode(graph, row, column);
      this.setState({ startNodeExits: true, startNode: graph[row][column] });
    }
    // delete start node
    if (startNodeExits && start) {
      deleteStartNode(graph, row, column);
      this.setState({ startNodeExits: false, startNode: null });
    }
    // set end node
    if (!endNodeExists && startNodeExits && !start) {
      setEndNode(graph, row, column);
      this.setState({ endNodeExists: true, endNode: graph[row][column] });
    }
    // delete end node
    if (endNodeExists && setStartNode && end && !start) {
      deleteEndNode(graph, row, column);
      this.setState({ endNodeExists: false, endNode: null });
    }
    // set walls
  };

  onMouseDown = (row, column) => {
    const { startNodeExits, endNodeExists, graph, mouseIsClicked } = this.state;
    const { start, end, wall } = graph[row][column];
    // if node isnt a wall -> setup the wall
    if (
      endNodeExists &&
      startNodeExits &&
      !mouseIsClicked &&
      !end &&
      !start &&
      !wall
    ) {
      let newGraph = setWall(graph, row, column);
      this.setState({ graph: newGraph, mouseIsClicked: true });
    }
    // if node is a wall -> delete wall
    if (endNodeExists && startNodeExits && !end && !start && wall) {
      let newGraph = deleteWall(graph, row, column);
      this.setState({ graph: newGraph });
    }
  };

  onMouseUp = () => {
    this.setState({ mouseIsClicked: false });
  };

  onMouseEnter = (row, column) => {
    const { startNodeExits, endNodeExists, graph, mouseIsClicked } = this.state;
    const { start, end, wall } = graph[row][column];

    if (!mouseIsClicked) return;
    if (endNodeExists && startNodeExits && !end && !start && !wall) {
      let newGraph = setWall(graph, row, column);
      this.setState({ graph: newGraph });
    }
  };

  resetField() {
    const { graph } = this.state;
    graph.forEach((row, rowIndex) => {
      return row.forEach((node, nodeIndex) => {
        if (
          document.getElementById([rowIndex, nodeIndex]).className ===
            "node-shortest-path" ||
          document.getElementById([rowIndex, nodeIndex]).className ===
            "node-search" ||
          document.getElementById([rowIndex, nodeIndex]).className ===
            "node-wall"
        ) {
          deleteWall(graph, rowIndex, nodeIndex);
          document.getElementById([rowIndex, nodeIndex]).className = "node";
        }
      });
    });
  }

  clearSearch() {
    const { graph } = this.state;
    graph.forEach((row, rowIndex) => {
      return row.forEach((node, nodeIndex) => {
        if (
          document.getElementById([rowIndex, nodeIndex]).className ===
            "node-shortest-path" ||
          document.getElementById([rowIndex, nodeIndex]).className ===
            "node-search"
        )
          return (document.getElementById([rowIndex, nodeIndex]).className =
            "node");
      });
    });
  }

  visualizeDijkstras() {
    const { graph, startNode, endNode } = this.state;
    if ((graph, startNode, endNode)) {
      const dijkstras = new Dijkstras(graph, startNode, endNode);
      const { shortestPath, visitedNodes } = dijkstras.shortestPath();
      animateSearchProcess(visitedNodes, shortestPath);
    }
  }

  visualizeAStar() {
    const { graph, startNode, endNode } = this.state;
    if ((graph, startNode, endNode)) {
      const A_Star = new AStar(graph, startNode, endNode);
      const { shortestPath, visitedNodes } = A_Star.shortestPath();
      animateSearchProcess(visitedNodes, shortestPath);
    }
    return;
  }

  visualizeDFS() {
    const { graph, startNode, endNode } = this.state;
    if ((graph, startNode, endNode)) {
      const DFS = new DepthFirstSearch(graph, startNode, endNode);
      const { path, visitedNodes } = DFS.search();
      animateSearchProcess(visitedNodes, path);
    }
  }

  visualizeBFS() {
    const { graph, startNode, endNode } = this.state;
    if ((graph, startNode, endNode)) {
      const BFS = new BreadthFirstSearch(graph, startNode, endNode);
      const { path, visitedNodes } = BFS.search();
      animateSearchProcess(visitedNodes, path);
    }
  }

  visualizeGreedyBFS() {
    const { graph, startNode, endNode } = this.state;
    if ((graph, startNode, endNode)) {
      const GBFS = new GreedyBFS(graph, startNode, endNode);
      const { shortestPath, visitedNodes } = GBFS.shortestPath();
      animateSearchProcess(visitedNodes, shortestPath);
    }
  }

  visualizeMaze() {
    const { graph, startNode, endNode } = this.state;
    if ((graph, startNode, endNode)) {
      const maze = new RecursiveBacktracking(graph, startNode, endNode);
      createWalledGraph(graph, startNode, endNode);
      animateMaze(maze.runMaze(), graph, endNode);
    }
  }
  visualizeTree() {
    const { graph, startNode, endNode } = this.state;
    if ((graph, startNode, endNode)) {
      const maze = new BinaryTreeMaze(graph, startNode, endNode);
      createWalledGraph(graph, startNode, endNode);
      animateMaze(maze.runMaze(), graph, endNode);
    }
  }

  visualizeDivMaze() {
    const { graph, startNode, endNode } = this.state;
    if ((graph, startNode, endNode)) {
      // reset field so we get a clear field
      this.resetField();
      const maze = new RecursiveDivision(graph, startNode, endNode);
      animateDivMaze(maze.runMaze(), graph);
    }
  }

  render() {
    const { graph } = this.state;
    // create the board.
    let board = graph.map((row, rowIndex) => {
      return (
        // each row must be in a div so you can form a field in css
        <div key={rowIndex}>
          {row.map((node, nodeIndex) => {
            // destructuring node object
            const { row, column, wall, start, end } = node;
            return (
              <Node
                key={nodeIndex}
                row={row}
                column={column}
                wall={wall}
                start={start}
                end={end}
                onMouseEnter={() => this.onMouseEnter(rowIndex, nodeIndex)}
                onMouseDown={() => this.onMouseDown(rowIndex, nodeIndex)}
                onMouseUp={() => this.onMouseUp(rowIndex, nodeIndex)}
                onClick={() => this.onClick(rowIndex, nodeIndex)}
              />
            );
          })}
        </div>
      );
    });

    //HTML
    return (
      <div className="Visualizer">
        <div className="Field">{board}</div>
        <ControlPanel
          visualizeAStar={() => this.visualizeAStar()}
          visualizeMaze={() => this.visualizeMaze()}
          visualizeDijkstras={() => this.visualizeDijkstras()}
          visualizeDivMaze={() => this.visualizeDivMaze()}
          visualizeGreedyBFS={() => this.visualizeGreedyBFS()}
          visualizeTree={() => this.visualizeTree()}
          visualizeDFS={() => this.visualizeDFS()}
          visualizeBFS={() => this.visualizeBFS()}
          resetField={() => this.resetField()}
          clearSearch={() => this.clearSearch()}
        />
      </div>
    );
  }
}

export default Field;

const createGraph = (rowSize, colSize, isWall, isStart, isEnd, basecase) => {
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

const createNode = (row, column, isWall, isStart, isEnd, basecase) => {
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

const setStartNode = (graph, row, column) => {
  graph[row][column].start = true;
};

const deleteStartNode = (graph, row, column) => {
  if (graph[row][column]) {
    graph[row][column].start = false;
  }
};

const setEndNode = (graph, row, column) => {
  graph[row][column].end = true;
};

const deleteEndNode = (graph, row, column) => {
  graph[row][column].end = false;
};

const setWall = (graph, row, column) => {
  graph[row][column].wall = true;
  return graph;
};

const deleteWall = (graph, row, column) => {
  graph[row][column].wall = false;
  return graph;
};

const animateSearchProcess = (neighborList, shortestPath) => {
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
    }, 20 * i);
  }
};

const animateShortestPath = (shortestPath) => {
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

const animateMaze = (wallList, graph, endNode, startNode) => {
  // i = 1 so we dont animate start node
  for (let i = 0; i < wallList.length; i++) {
    setTimeout(() => {
      const currRow = wallList[i][0];
      const currColumn = wallList[i][1];
      if (currRow !== endNode.row || currColumn !== endNode.column) {
        deleteWall(graph, currRow, currColumn);
        document.getElementById([currRow, currColumn]).className = "node";
      }
    }, 40 * i);
  }
};

const animateDivMaze = (wallList, graph) => {
  // i = 1 so we dont animate start node
  for (let i = 0; i < wallList.length; i++) {
    setTimeout(() => {
      const currRow = wallList[i][0];
      const currColumn = wallList[i][1];
      setWall(graph, currRow, currColumn);
      document.getElementById([currRow, currColumn]).className = "node-wall";
    }, 40 * i);
  }
};

const createWalledGraph = (graph, startNode, endNode) => {
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
