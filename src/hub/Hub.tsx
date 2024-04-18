import React from "react";
import "./Hub.css";
import { googleId } from "../login/Login";

function Hub() {
  return <div className="hubApp">Welcome {googleId}</div>;
}

export default Hub;
