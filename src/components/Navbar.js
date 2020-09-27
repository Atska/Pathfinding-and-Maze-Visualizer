import React, { Component } from "react";
// CSS
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <label id="title">Algorithm Visualizer</label>
          <div className="git-link">Github</div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
