import React from "react";
import TeamsList from "../presentational/TeamsList";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <TeamsList firebaseDB={props.firebaseDB} />
    </div>
  );
}
