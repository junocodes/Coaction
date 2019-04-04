import React, { Component } from "react";
import moment from "moment";

export default class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };

    // Creating reference for Firebase data.
    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      // Destructuring for readibility.
      const { messages } = this.state;

      // Sync Firebase data to state.
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: messages.concat(message) });

      // Reference returned Firebase teams as table.
      console.table(messages);
    });
  }

  render() {
    const { messages } = this.state;
    const { activeTeam } = this.props;
    return (
      <>
        {activeTeam === null ? (
          ""
        ) : (
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
        )}
      </>
    );
  }
}
