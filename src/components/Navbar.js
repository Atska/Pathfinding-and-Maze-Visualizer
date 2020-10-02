import React, { Component } from "react";
// CSS
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <label id="title">Algorithm Visualizer</label>
          <a href="https://github.com/Atska/visualizer">
            <div className="git-link">Github</div>
          </a>
        </nav>
      </div>
    );
  }
}

export default Navbar;
