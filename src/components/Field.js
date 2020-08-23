import React, { Component } from "react";
// Components
import Node from "./Node";
// CSS
import "./Field.css";
// Algorithms
// import "../algos/dijkstras";

class Field extends Component {
  state = {
    graph: [],
    startNodeExits: false,
    endNodeExists: false,
    mouseIsClicked: false,
  };

  componentDidMount() {
    const newGraph = createGraph();
    this.setState({ graph: newGraph });
  }

  onClick = (row, column) => {
    const { startNodeExits, endNodeExists, graph, mouseIsClicked } = this.state;
    const { start, end, wall } = graph[row][column];

    // set start node
    if (!startNodeExits) {
      setStartNode(graph, row, column);
      this.setState({ startNodeExits: true });
    }
    // delete start node
    if (startNodeExits && start) {
      deleteStartNode(graph, row, column);
      this.setState({ startNodeExits: false });
    }
    // set end node
    if (!endNodeExists && startNodeExits && !start) {
      setEndNode(graph, row, column);
      this.setState({ endNodeExists: true });
    }
    // delete end node
    if (endNodeExists && setStartNode && end && !start) {
      deleteEndNode(graph, row, column);
      this.setState({ endNodeExists: false });
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
    const graph = createGraph();
    this.setState({
      graph: graph,
      startNodeExits: false,
      endNodeExists: false,
    });
  }

  visualizeDijkstras() {}

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
    return <div className="Field">{board}</div>;
  }
}
export default Field;

const createGraph = () => {
  const graph = [];
  let rowSize = 21;
  let colSize = 35;
  // create a 2D Array
  for (let row = 0; row < rowSize; row++) {
    const currentRow = [];
    for (let column = 0; column < colSize; column++) {
      // create an object with node coordinates. Starts and end return a true bool when they hit the coordinates
      currentRow.push(createNode(row, column));
    }
    graph.push(currentRow);
  }
  return graph;
};

const createNode = (row, column) => {
  const nodeSchema = {
    row: row,
    column: column,
    wall: false,
    start: false,
    end: false,
  };
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
