import React from "react";

const LoopList = ({ loops }) => {
  return (
    <div className="mt-4">
      {loops.map((loop) => (
        <div key={loop.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
          <div>
            {loop.name ||
              `${loop.projectType} loop for ${loop.numIterations} projects`}
          </div>
          <div>
            {loop.numIterations}{" "}
            {loop.projectType === "App"
              ? "App📱"
              : loop.projectType === "Design"
              ? "Design🎨"
              : loop.projectType === "Song"
              ? "Song🎵"
              : loop.projectType === "Writing"
              ? "✍️ Writing"
              : "What?🤔"}{" "}
            in{" "}
            {loop.frequency === "Days"
              ? "Days ⏳"
              : loop.frequency === "Weeks"
              ? "Weeks 🗓"
              : loop.frequency === "Months"
              ? "Months 📆"
              : "How long? ⏱️"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoopList;
