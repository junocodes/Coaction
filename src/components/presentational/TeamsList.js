import React, { Component } from "react";

export default class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.state = { teams: [], isCreatingTeam: false, value: "" };

    // Creating reference for Firebase data.
    this.teamsRef = this.props.firebase.database().ref("teams");

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
    // Define and push new team to firebase.
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

      // Sync Firebase data to state.
      const team = snapshot.val();
      team.key = snapshot.key;
      this.setState({ teams: teams.concat(team) });

      // Reference returned Firebase teams as table.
      console.table(teams);
    });
  }

  render() {
    const { teams, isCreatingTeam } = this.state;
    const { user } = this.props;
    return (
      <div className="teams">
        <h2>Team Channels:</h2>
        <ul>
          {teams.map(team => {
            return (
              <li key={team.key} onClick={() => this.props.setActiveTeam(team)}>
                {team.name}
              </li>
            );
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
            <>
              {user !== null && (
                <button onClick={() => this.handleCreatingTeamToggle()}>
                  Create Team
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
