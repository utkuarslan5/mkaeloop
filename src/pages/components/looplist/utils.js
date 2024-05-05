export const getCurrentIteration = (loop) => {
  const currentIteration = loop.iterations.find((iteration) => {
    const isNotCompleted = !iteration.completed;
    const isNotEnded = iteration.endTime >= new Date();
    return isNotCompleted && isNotEnded;
  });
  return currentIteration;
};

export const getRemainingTime = (currentIteration) => {
    const remainingTime =
      currentIteration && currentIteration.endTime
        ? Math.max(0, currentIteration.endTime.getTime() - new Date().getTime())
        : undefined;
    return remainingTime;
};

export const getIterationsStatus = (loop) => {
  return loop.iterations.map((iteration) => {
    if (iteration.completed) {
      return "✅";
    } else if (iteration.endTime < new Date()) {
      return "❌";
    } else {
      return "❔";
    }
  });
};
