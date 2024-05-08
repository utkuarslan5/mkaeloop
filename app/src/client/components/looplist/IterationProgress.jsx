import React from "react";
import ProgressBar from "./ProgressBar";
import { getCurrentIteration } from "./utils.js";
const IterationProgress = ({ loop }) => {
  
  const currentIteration = getCurrentIteration(loop);

  if (!loop || !loop.iterations || loop.iterations.length === 0) {
    return <div>No iterations found.</div>;
  }

  if (!currentIteration) {
    return <div>No current iteration found.</div>;
  }

  return (
    <div>
      <ProgressBar currentIteration={currentIteration} />
    </div>
  );
};

export default IterationProgress;
