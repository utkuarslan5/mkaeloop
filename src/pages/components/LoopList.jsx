import React, { useState } from "react";
import { useQuery } from "wasp/client/operations";
import { getLoops, deleteLoop } from "wasp/client/operations";

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
        {loop.name ||
          `${loop.projectType} loop for ${loop.numIterations} projects`}
      </div>
      <div>
        {Array.from({ length: loop.numIterations }, (_, i) => (
          <span key={i}>{i < loop.completedIterations ? "⭐" : "☆"}</span>
        ))}
      </div>
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
          ? "Days �"
          : loop.frequency === "weekly"
          ? "Weeks 📆"
          : loop.frequency === "monthly"
          ? "Months 🗓"
          : "How often? ⏱️"}{" "}
      </div>
      <div>Remaining time: {/* Add timer component here */}</div>
    </div>
  );
};

export default LoopList;
