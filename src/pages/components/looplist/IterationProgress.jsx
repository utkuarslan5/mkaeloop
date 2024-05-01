import React from "react";
import ProgressBar from "./ProgressBar";

const IterationProgress = ({ loop }) => {
  const getCurrentIteration = (iterations) => {
    const currentIteration = iterations.find((iteration) => {
      const isNotCompleted = !iteration.completed;
      const isStarted = iteration.startTime <= new Date();
      const isNotEnded = iteration.endTime >= new Date();
      return isNotCompleted && isStarted && isNotEnded;
    });
    return currentIteration;
  };

  const currentIteration = getCurrentIteration(loop.iterations);
  return (
    <div>
      {Array.from({ length: loop.numIterations }, (_, i) => (
        <span key={i}>{i < loop.completedIterations ? "⭐" : "☆"}</span>
      ))}
      <ProgressBar currentIteration={currentIteration} />
    </div>
  );
};

export default IterationProgress;
