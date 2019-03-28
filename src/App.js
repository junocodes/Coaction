import React, { Component } from "react";
import firebaseDB from "./data/firebase";
import Main from "./components/wrapper/Main";
import Sidebar from "./components/wrapper/Sidebar";

export default class App extends Component {
  render() {
    return (
      <div className="layout">
        <Main />
        <Sidebar firebaseDB={firebaseDB} />
      </div>
    );
  }
}
