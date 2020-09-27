import React, { Component } from "react";
// CSS
import "./ControlPanel.css";

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      visualizeAStar,
      visualizeMaze,
      visualizeDijkstras,
      visualizeDivMaze,
      visualizeGreedyBFS,
      visualizeTree,
      visualizeDFS,
      visualizeBFS,
      resetField,
      clearSearch,
    } = this.props;

    return (
      <div className="ControlPanel">
        <div className="Search">
          <p>Search Algorithms</p>
          <br />
          <button onClick={() => visualizeAStar()}>AStar</button>
          <br />
          <button onClick={() => visualizeDijkstras()}>Dijkstra's</button>
          <br />
          <button onClick={() => visualizeGreedyBFS()}>
            GreedyBestFirstSearch
          </button>
          <br />
          <button onClick={() => visualizeDFS()}>DepthFirstSearch</button>
          <br />
          <button onClick={() => visualizeBFS()}>BreadthFirstSearch</button>
        </div>
        <div className="Maze">
          <p>Maze Algorithms</p>
          <button onClick={() => visualizeTree()}>BinaryTreeMaze</button>
          <button onClick={() => visualizeMaze()}>RecursiveBacktracking</button>
          <button onClick={() => visualizeDivMaze()}>RecursiveDivision</button>
        </div>
        <div className="Reset">
          <button onClick={() => resetField()}>Reset Field</button>
          <br />
          <button onClick={() => clearSearch()}>Clear Search</button>
        </div>
      </div>
    );
  }
}
export default ControlPanel;
