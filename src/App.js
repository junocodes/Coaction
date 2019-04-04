import React, { Component } from "react";
import * as firebase from "firebase";
import Main from "./components/wrapper/Main";
import Sidebar from "./components/wrapper/Sidebar";
import User from "./components/presentational/User";
import TeamsList from "./components/presentational/TeamsList";
import MessagesList from "./components/presentational/MessagesList";

// Initializing Firebase's realtime database.
var config = {
  apiKey: "AIzaSyCFf7aVJtapvJ8uZaYC1WfyuCt9SHQL9i0",
  authDomain: "coaction-db.firebaseapp.com",
  databaseURL: "https://coaction-db.firebaseio.com",
  projectId: "coaction-db",
  storageBucket: "coaction-db.appspot.com",
  messagingSenderId: "38505436483"
};
firebase.initializeApp(config);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTeam: null, user: null };
  }

  setActiveTeam(team) {
    this.setState({ activeTeam: team });
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    const { activeTeam, user } = this.state;
    return (
      <div className="layout">
        <Main activeTeam={activeTeam} user={user}>
          <MessagesList activeTeam={activeTeam} firebase={firebase} />
        </Main>
        <Sidebar>
          <TeamsList
            firebase={firebase}
            activeTeam={activeTeam}
            setActiveTeam={this.setActiveTeam.bind(this)}
          />
          <User
            firebase={firebase}
            user={user}
            setUser={this.setUser.bind(this)}
          />
        </Sidebar>
      </div>
    );
  }
}
