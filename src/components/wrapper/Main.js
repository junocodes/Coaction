import React from "react";

export default function Main(props) {
  return (
    <div className="main">
      <header>
        <span>
          {props.activeTeam === null ? "" : <h3>{props.activeTeam.name}</h3>}
        </span>
      </header>
      <main class="messages">{props.children}</main>
    </div>
  );
}
