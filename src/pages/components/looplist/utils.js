export const getCurrentIteration = (iterationsData) => {
    return iterationsData.find(
      (iteration) =>
        !iteration.completed &&
        iteration.startTime <= new Date() &&
        iteration.endTime >= new Date()
    );
  };
  
  export const getRemainingTime = (currentIteration) => {
    return currentIteration && currentIteration.endTime
      ? Math.max(0, currentIteration.endTime.getTime() - new Date().getTime())
      : undefined;
  };
  