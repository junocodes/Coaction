import React from "react";
import Teams from "../presentational/Teams";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <Teams firebaseDB={props.firebaseDB} />
    </div>
  );
}
