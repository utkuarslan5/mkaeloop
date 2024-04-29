import React from "react";

const IterationProgress = ({ loop }) => {
  return (
    <div>
      {Array.from({ length: loop.numIterations }, (_, i) => (
        <span key={i}>{i < loop.completedIterations ? "⭐" : "☆"}</span>
      ))}
    </div>
  );
};

export default IterationProgress;