import React, { Component } from "react";
// CSS
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <label id="title">Algorithm Visualizer</label>
          <button className="git-link">Github</button>
        </nav>
      </div>
    );
  }
}

export default Navbar;
