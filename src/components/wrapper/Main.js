import React from "react";

export default function Main(props) {
  return (
    <div className="main">
      <header>
        <span>
          {props.activeTeam !== null ? (
            <h3>{props.activeTeam.name}</h3>
          ) : (
            <h3>Click on a team to view the conversation.</h3>
          )}
        </span>
      </header>
      <main className="messages">{props.children}</main>
    </div>
  );
}
