import React from "react";
import { Timers } from "../../components/Timers";
import "./index.css"

export default function HomeScreen() {
  return (
    <div className="timers-wrapper">
      <h1>Timers</h1>
      <Timers />
    </div>
  );
}