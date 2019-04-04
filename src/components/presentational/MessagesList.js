import React, { Component } from "react";
import moment from "moment";

export default class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], message: "" };

    // Creating reference for Firebase data.
    this.messagesRef = this.props.firebase.database().ref("messages");

    // Binding form values for team creation.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ message: e.target.value });

    // Verify state is updating in console
    console.log(this.state.message);
  }

  handleSubmit(e) {
    e.preventDefault();
    // Define and push new message to firebase.
    let newMessage = this.state.message;
    this.messagesRef.push({
      content: newMessage,
      sentAt: Math.round(new Date().getTime() / 1000),
      teamId: this.props.activeTeam.key,
      username: this.props.user.displayName
    });

    // Clear message input after submission.
    this.setState({ message: "" });
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      // Destructuring for readibility.
      const { messages } = this.state;

      // Sync Firebase data to state.
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: messages.concat(message)
      });

      // Reference returned Firebase teams as table.
      console.table(messages);
    });
  }

  render() {
    const { messages } = this.state;
    const { activeTeam, user } = this.props;
    return (
      <>
        {activeTeam === null ? (
          ""
        ) : (
          <>
            <ul>
              {messages
                .filter(message => message.teamId === activeTeam.key)
                .map(message => {
                  return (
                    <li key={message.key}>
                      <div>
                        <span className="message">
                          <strong>{message.username}</strong>
                          {message.content}
                        </span>
                        <span className="time">
                          {moment.unix(message.sentAt).format("h:mm A")}
                        </span>
                      </div>
                    </li>
                  );
                })}
            </ul>
            {user !== null && (
              <form onSubmit={this.handleSubmit}>
                <input
                  type="textarea"
                  value={this.state.message}
                  onChange={this.handleChange}
                />
                <button>Submit</button>
              </form>
            )}
          </>
        )}
      </>
    );
  }
}
