import React, { useState } from "react";
import { useQuery } from "wasp/client/operations";
import { getLoopById, getIterationsByLoopId } from "wasp/client/operations";
import IterationProgress from "./IterationProgress";
import LoopDetails from "./LoopDetails";
import RemainingTime from "./RemainingTime";
import { getCurrentIteration, getRemainingTime } from "../../utils";

const LoopItem = ({ loop, onDelete, user }) => {
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

  console.log(loop);

  if (isLoopLoading || isIterationsLoading) {
    return <div>Waiting for the loops to jump through the hoops... 🐰🔄</div>;
  }

  if (loopError || iterationsError) {
    return (
      <div>
        Oops, the loops got tangled! 🥴🌀{" "}
        {loopError?.message || iterationsError?.message}
      </div>
    );
  }

  const currentIteration = getCurrentIteration(iterationsData);
  const remainingTime = getRemainingTime(currentIteration);

  return (
    <LoopItemContent
      loop={loopData}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      onDelete={() => onDelete(loop.id, user)}
      currentIteration={currentIteration}
      remainingTime={remainingTime}
      user={user}
    />
  );
};

// @TODO: check here ids dont match
const LoopItemContent = ({
  loop,
  isHovered,
  setIsHovered,
  onDelete,
  currentIteration,
  remainingTime,
  user,
}) => {
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && user && (
        <div className="absolute top-2 right-2 flex">
          <button
            className="bg-red-500 text-white px-1 py-1 rounded mr-1"
            onClick={() => onDelete(loop.id, user)}
          >
            Delete 
          </button>
          <button className="bg-green-500 text-white px-1 py-1 rounded">
            Join
          </button>
        </div>
      )}
      <div>
        {loop.name ||
          `${loop.projectType} loop for ${loop.numIterations} projects`}
      </div>
      <IterationProgress loop={loop} />
      <LoopDetails loop={loop} />
      <RemainingTime remainingTime={remainingTime} />
    </div>
  );
};

export default LoopItem;
