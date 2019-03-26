import React, { Component } from "react";
import Main from "./components/wrapper/Main";
import Sidebar from "./components/wrapper/Sidebar";

export default class App extends Component {
  render() {
    return (
      <div className="layout">
        <Main />
        <Sidebar />
      </div>
    );
  }
}
