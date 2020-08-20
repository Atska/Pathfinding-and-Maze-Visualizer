import React, { Component } from "react";
// Components
import Node from "../utils/Node";
// CSS
import "./Field.css";

class Field extends Component {
  state = {
    graph: [],
  };

  componentDidMount = () => {
    const graph = [];
    let rowSize = 18;
    let colSize = 30;

    // create a 2D Array
    // [ [0, 1, 2]
    //   [0, 1, 2]
    //   [0, 1, 2]  ]
    for (let row = 0; row < rowSize; row++) {
      const currentRow = [];
      for (let column = 0; column < colSize; column++) {
        currentRow.push([]);
      }
      graph.push(currentRow);
    }
    this.setState({ graph });
  };

  render() {
    const { graph } = this.state;
    // create the board.
    let board = graph.map((row, rowIndex) => {
      return (
        // each row must be in a div so you can form a field in css
        <div key={rowIndex}>
          {row.map((column, columnIndex) => {
            return <Node key={columnIndex} />;
          })}
        </div>
      );
    });

    //HTML
    return <div className="Field">{board}</div>;
  }
}
export default Field;
