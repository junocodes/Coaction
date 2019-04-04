import React, { Component } from "react";

export default class User extends Component {
  componentDidMount() {
    // Event handler for handling change in auth state.
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    // Call Firebase sign in method
    var provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    // Call Firebase sign out method
    this.props.firebase.auth().signOut();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="user">
        <strong>Hello, {user ? user.displayName : "Guest"}!</strong>
        {user ? (
          <button onClick={this.signOut.bind(this)}>Sign Out</button>
        ) : (
          <>
            <small>Please sign in and start chatting.</small>
            <button onClick={this.signIn.bind(this)}>Sign In</button>
          </>
        )}
      </div>
    );
  }
}
