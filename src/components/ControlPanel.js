import React, { Component } from "react";
// CSS
import "./ControlPanel.css";

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { searchAlgo: "AStar", mazeAlgo: "RecursiveDivision" };
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
    const handleSearchChange = (event) => {
      this.setState({ searchAlgo: event.target.value });
    };

    const handleSearchClick = () => {
      const { searchAlgo } = this.state;
      if (searchAlgo === "AStar") return visualizeAStar();
      if (searchAlgo === "Dijkstras") return visualizeDijkstras();
      if (searchAlgo === "GreedyBFS") return visualizeGreedyBFS();
      if (searchAlgo === "DepthFirstSearch") return visualizeDFS();
      if (searchAlgo === "BreadthFirstSearch") return visualizeBFS();
    };

    const handeMazeChange = (event) => {
      this.setState({ mazeAlgo: event.target.value });
    };

    const handleMazeClick = () => {
      const { mazeAlgo } = this.state;
      if (mazeAlgo === "RecursiveDivision") return visualizeDivMaze();
      if (mazeAlgo === "BinaryTreeMaze") return visualizeTree();
      if (mazeAlgo === "RecursiveBacktracking") return visualizeMaze();
    };
    return (
      <div className="ControlPanel">
        <div className="search">
          <p>Search Algorithms</p>
          <select onChange={handleSearchChange}>
            <option value="AStar">AStar</option>
            <option value="Dijkstras">Dijkstras</option>
            <option value="GreedyBFS">GreedyBFS</option>
            <option value="DepthFirstSearch">DepthFirstSearch</option>
            <option value="BreadthFirstSearch">BreadthFirstSearch</option>
          </select>
          <button onClick={handleSearchClick}>Search</button>
        </div>
        <div className="maze">
          <p>Maze Algorithms</p>
          <select onChange={handeMazeChange}>
            <option value="RecursiveDivision">RecursiveDivision</option>
            <option value="BinaryTreeMaze">BinaryTreeMaze</option>
            <option value="RecursiveBacktracking">RecursiveBacktracking</option>
          </select>
          <button onClick={handleMazeClick}>Choose</button>
        </div>
        <div className="reset">
          <button onClick={() => resetField()}>Reset Field</button>
          <button onClick={() => clearSearch()}>Clear Search</button>
        </div>
      </div>
    );
  }
}
export default ControlPanel;
