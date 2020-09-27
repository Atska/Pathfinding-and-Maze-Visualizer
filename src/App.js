import React from "react";
//Components
import Field from "./components/Field.js";
import Navbar from "./components/Navbar.js";
// MaterialUI
import { ThemeProvider } from "@material-ui/core/styles";
// css
import theme from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Field />
      </div>
    </ThemeProvider>
  );
}

export default App;
