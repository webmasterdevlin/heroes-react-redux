import React, { Component } from "react";

import "./App.css";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import HeaderNav from "./common-components/HeaderNav";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <HeaderNav />
          <div className="container">
            <Router />
          </div>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
