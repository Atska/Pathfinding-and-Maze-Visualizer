import React, { Component } from "react";
// Components
import Node from "./Node.js";
import ControlPanel from "./ControlPanel.js";
// CSS
import "./Visualizer.css";
// Search Algorithms
import AStar from "../algorithms/SearchAlgorithms/A_Star.js";
import Dijkstras from "../algorithms/SearchAlgorithms/DijkstrasAlgorithm.js";
import GreedyBFS from "../algorithms/SearchAlgorithms/GreedyBestFirstSearch";
import DepthFirstSearch from "../algorithms/SearchAlgorithms/DepthFirstSearch.js";
import BreadthFirstSearch from "../algorithms/SearchAlgorithms/BreadthFirstSearch.js";
// Maze Algorithms
import BinaryTreeMaze from "../algorithms/MazeAlgorithms/BinaryTreeMaze.js";
import RecursiveDivision from "../algorithms/MazeAlgorithms/RecursiveDivision.js";
import RecursiveBacktracking from "../algorithms/MazeAlgorithms/RecursiveBacktracking.js";
// helper functions
import {
  createGraph,
  setEndNode,
  setStartNode,
  setWall,
  deleteWall,
  deleteEndNode,
  deleteStartNode,
  animateDivMaze,
  animateSearchProcess,
  animateMaze,
  createWalledGraph,
} from "../utils/helperFunctionsVisualizer.js";

class Field extends Component {
  // graph size
  rowsize = Math.floor(Math.floor((window.innerHeight - 130) / 25) * 0.9);
  columnSize = Math.floor(Math.floor(window.innerWidth / 25) * 0.9);

  state = {
    graph: [],
    startNodeExits: false,
    endNodeExists: false,
    mouseIsClicked: false,
    startNode: null,
    endNode: null,
  };

  // set up field
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
  };

  // on mouse down set up or delete a wall
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

  // clears the board of wall and search nodes
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

  // clears the board of the search
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
      setTimeout(() => animateMaze(maze.runMaze(), graph, endNode), 2000);
    }
  }
  visualizeTree() {
    const { graph, startNode, endNode } = this.state;
    if ((graph, startNode, endNode)) {
      const maze = new BinaryTreeMaze(graph, startNode, endNode);
      createWalledGraph(graph, startNode, endNode);
      setTimeout(() => animateMaze(maze.runMaze(), graph, endNode), 2000);
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
        <div className="Row" key={rowIndex}>
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

    return (
      <div className="Visualizer">
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
        <div className="Field">{board}</div>
      </div>
    );
  }
}

export default Field;
