import React, { Component } from "react";

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <header>
          <span>
            {this.props.activeTeam === null ? (
              ""
            ) : (
              <h3>{this.props.activeTeam.name}</h3>
            )}
          </span>
        </header>
      </div>
    );
  }
}
