import React, { Component } from "react";
import firebaseDB from "./data/firebase";
import Main from "./components/wrapper/Main";
import Sidebar from "./components/wrapper/Sidebar";
import TeamsList from "./components/presentational/TeamsList";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTeam: null };
  }

  setActiveTeam(team) {
    this.setState({ activeTeam: team });
  }

  render() {
    const { activeTeam } = this.state;
    return (
      <div className="layout">
        <Main activeTeam={activeTeam} />
        <Sidebar>
          <TeamsList
            firebaseDB={firebaseDB}
            activeTeam={activeTeam}
            setActiveTeam={this.setActiveTeam.bind(this)}
          />
        </Sidebar>
      </div>
    );
  }
}
