import React, { Component } from "react";
import "./Node.css";
/**
 * Creates a node as a square.
 */
class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      row,
      column,
      start,
      end,
      wall,
      onMouseDown,
      onMouseUp,
      onClick,
      onMouseEnter,
    } = this.props;
    // Sets the css className of Node and check whether its start, end or normal colored
    const className = () => {
      if (start) return "node-start";
      if (end) return "node-end";
      if (wall && !end && !start) return "node-wall";
      return "node";
    };
    return (
      <div
        id={[row, column]}
        className={className()}
        onMouseEnter={() => onMouseEnter()}
        onMouseUp={() => onMouseUp()}
        onMouseDown={() => onMouseDown()}
        onClick={() => onClick()}
      ></div>
    );
  }
}

export default Node;
