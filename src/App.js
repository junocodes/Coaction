import React, { Component } from "react";
import firebaseDB from "./data/firebase";
import Main from "./components/wrapper/Main";
import Sidebar from "./components/wrapper/Sidebar";
import TeamsList from "./components/presentational/TeamsList";
import MessagesList from "./components/presentational/MessagesList";

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
        <Main activeTeam={activeTeam}>
          <MessagesList activeTeam={activeTeam} firebaseDB={firebaseDB} />
        </Main>
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
