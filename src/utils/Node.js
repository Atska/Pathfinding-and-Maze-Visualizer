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
    return <div className="Node"></div>;
  }
}

export default Node;
