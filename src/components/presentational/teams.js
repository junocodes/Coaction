import React, { Component } from "react";

export default class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = { teams: [] };

    // Creating reference for FirebaseDB data.
    this.teamsRef = this.props.firebaseDB.database().ref("teams");
  }

  componentDidMount() {
    this.teamsRef.on("child_added", snapshot => {
      // Destructuring for readibility.
      const { teams } = this.state;

      // Sync FirebaseDB data to state.
      const team = snapshot.val();
      team.key = snapshot.key;
      this.setState({ teams: teams.concat(team) });

      // Reference returned FirebaseDB data as table.
      console.table(teams);
    });
  }

  render() {
    const { teams } = this.state;
    return (
      <ul className="teams">
        {teams.map(team => {
          return <li key={team.key}>{team.name}</li>;
        })}
      </ul>
    );
  }
}
