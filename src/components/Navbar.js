import React, { Component } from "react";
// CSS
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <nav>
          <label id="title">Algorithm Visualizer</label>
          <a className="git-link" href="https://github.com/Atska/visualizer">
            Github
          </a>
        </nav>
      </div>
    );
  }
}

export default Navbar;
