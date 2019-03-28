import React, { Component } from "react";

export default class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = { teams: [], isCreatingTeam: false, value: "" };

    // Creating reference for FirebaseDB data.
    this.teamsRef = this.props.firebaseDB.database().ref("teams");

    // Binding form values for team creation.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCreatingTeamToggle() {
    // Toggling visibility for creating team form.
    this.setState({ isCreatingTeam: !this.state.isCreatingTeam });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });

    // Verify state is updating in console
    console.log(this.state.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    // Define and push new team to FirebaseDB.
    let newTeam = this.state.value;
    this.teamsRef.push({
      name: newTeam
    });

    // Clearing form input and toggle back to original view.
    this.setState({ value: "" });
    this.handleCreatingTeamToggle();
  }

  componentDidMount() {
    this.teamsRef.on("child_added", snapshot => {
      // Destructuring for readibility.
      const { teams } = this.state;

      // Sync FirebaseDB data to state.
      const team = snapshot.val();
      team.key = snapshot.key;
      this.setState({ teams: teams.concat(team) });

      // Reference returned FirebaseDB teams as table.
      console.table(teams);
    });
  }

  render() {
    const { teams, isCreatingTeam } = this.state;
    return (
      <>
        <ul className="teams">
          {teams.map(team => {
            return <li key={team.key}>{team.name}</li>;
          })}
        </ul>
        <div className="create-team">
          {isCreatingTeam ? (
            <>
              <h3>Add Your Team</h3>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <button>Submit</button>
              </form>
              <small onClick={() => this.handleCreatingTeamToggle()}>
                Cancel
              </small>
            </>
          ) : (
            <button onClick={() => this.handleCreatingTeamToggle()}>
              Create Team
            </button>
          )}
        </div>
      </>
    );
  }
}
