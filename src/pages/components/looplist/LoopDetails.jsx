import React from "react";

const LoopDetails = ({ loop }) => {
  return (
    <div>
      {loop.numIterations}{" "}
      {loop.projectType === "app"
        ? "App📱"
        : loop.projectType === "design"
        ? "Design🎨"
        : loop.projectType === "song"
        ? "Song🎵"
        : loop.projectType === "writing"
        ? "✍️ Writing"
        : "What?🤔"}{" "}
      in {loop.numIterations}{" "}
      {loop.frequency === "daily"
        ? "Days 🌞"
        : loop.frequency === "weekly"
        ? "Weeks 📆"
        : loop.frequency === "monthly"
        ? "Months 🗓"
        : "How often? ⏱️"}{" "}
    </div>
  );
};

export default LoopDetails;