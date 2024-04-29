import React, { useState } from "react";
import { useQuery } from "wasp/client/operations";
import {
  getLoops,
  deleteLoop,
  getLoopById,
  getIterationsByLoopId,
} from "wasp/client/operations";

const LoopList = () => {
  const { data: loops, error, isLoading, refetch } = useQuery(getLoops);

  const handleDelete = async (loopId) => {
    try {
      await deleteLoop({ id: loopId });
      refetch();
    } catch (error) {
      console.error("Error deleting loop:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      {loops.map((loop) => (
        <LoopItem key={loop.id} loop={loop} onDelete={handleDelete} />
      ))}
    </div>
  );
};

const LoopItem = ({ loop, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    data: loopData,
    error: loopError,
    isLoading: isLoopLoading,
  } = useQuery(getLoopById, { id: loop.id });
  const {
    data: iterationsData,
    error: iterationsError,
    isLoading: isIterationsLoading,
  } = useQuery(getIterationsByLoopId, { loopId: loop.id });

  if (isLoopLoading || isIterationsLoading) {
    return <div>Loading...</div>;
  }

  if (loopError || iterationsError) {
    return <div>Error: {loopError?.message || iterationsError?.message}</div>;
  }

  const currentIteration = iterationsData.find(
    (iteration) =>
      !iteration.completed &&
      iteration.startTime <= new Date() &&
      iteration.endTime >= new Date()
  );
  const remainingTime =
    currentIteration && currentIteration.endTime
      ? Math.max(0, currentIteration.endTime.getTime() - new Date().getTime())
      : undefined;

  return (
    <div
      className="bg-gray-100 p-4 rounded-lg relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => onDelete(loop.id)}
        >
          Delete
        </button>
      )}
      <div>
        {loopData.name ||
          `${loopData.projectType} loop for ${loopData.numIterations} projects`}
      </div>
      <div>
        {Array.from({ length: loopData.numIterations }, (_, i) => (
          <span key={i}>{i < loopData.completedIterations ? "⭐" : "☆"}</span>
        ))}
      </div>
      <div>
        {loopData.numIterations}{" "}
        {loopData.projectType === "app"
          ? "App📱"
          : loopData.projectType === "design"
          ? "Design🎨"
          : loopData.projectType === "song"
          ? "Song🎵"
          : loopData.projectType === "writing"
          ? "✍️ Writing"
          : "What?🤔"}{" "}
        in {loopData.numIterations}{" "}
        {loopData.frequency === "daily"
          ? "Days �"
          : loopData.frequency === "weekly"
          ? "Weeks 📆"
          : loopData.frequency === "monthly"
          ? "Months 🗓"
          : "How often? ⏱️"}{" "}
      </div>
      <div>
        Remaining time:{" "}
        {remainingTime !== undefined
          ? `${Math.floor(
              remainingTime / (1000 * 60 * 60 * 24)
            )} days, ${Math.floor(
              (remainingTime / (1000 * 60 * 60)) % 24
            )} hours, ${Math.floor((remainingTime / (1000 * 60)) % 60)} minutes`
          : "No incomplete iteration"}
      </div>
    </div>
  );
};

export default LoopList;
