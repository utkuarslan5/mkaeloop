import React from "react";
import {getIterationsStatus} from "../utils";

const LoopDetails = ({ loop }) => {
  return (
    <div style={{ textAlign: "center" }}>
      {loop.numIterations}{" "}
      {loop.projectType === "app"
        ? "Apps📱"
        : loop.projectType === "design"
        ? "Designs🎨"
        : loop.projectType === "song"
        ? "Songs🎵"
        : loop.projectType === "writing"
        ? "✍️ Writings"
        : "What?🤔"}{" "}
      in {loop.numIterations}{" "}
      {loop.frequency === "daily"
        ? "Days 🌞"
        : loop.frequency === "weekly"
        ? "Weeks 📆"
        : loop.frequency === "monthly"
        ? "Months 🗓"
        : "How often? ⏱️"}{" "}
      <br />
      {getIterationsStatus(loop).map((status, i) => (
        <span key={i}>{status}</span>
      ))}
    </div>
  );
};

export default LoopDetails;
