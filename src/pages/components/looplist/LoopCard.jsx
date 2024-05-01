import React, { useState } from "react";
import IterationProgress from "./IterationProgress";
import LoopDetails from "./LoopDetails";

const LoopCard = ({
  loop,
  onRemove,
  onJoin,
  onLeave,
  onWatch,
  onUnwatch,
  user,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isCreator = user && loop.createdById === user.id;
  const isParticipant = loop.participants?.some(
    (participant) => participant.id === user?.id
  );
  const isWatcher = loop.watchers?.some((watcher) => watcher.id === user?.id);

  return (
    <div
      className="bg-gray-100 p-4 rounded-lg relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center mb-4">
        <img
          src={
            loop.imageUrl || "https://randomuser.me/api/portraits/lego/0.jpg"
          }
          alt={loop.name}
          className="w-16 h-16 rounded-full"
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          {loop.name ||
            `${loop.projectType} loop for ${loop.numIterations} projects`}
        </div>
        <div className="flex items-center">
          <span className="mr-2">
            <i className="fas fa-user-friends mr-1"></i>
            {loop.participants?.length || 0} 🤗
          </span>
          <span>
            <i className="fas fa-eye mr-1"></i>
            {loop.watchers?.length || 0} 👁️
          </span>
        </div>
      </div>
      {isHovered && user && (
        <div className="absolute top-2 right-2 flex">
          {isCreator && (
            <button
              className="bg-red-500 text-white px-1 py-1 rounded mr-1"
              onClick={() => onRemove(loop, user)}
            >
              Remove
            </button>
          )}
          {!isCreator && (
            <div>
              {isParticipant ? (
                <button
                  className="bg-red-500 text-white px-1 py-1 rounded mr-1"
                  onClick={() => onLeave(loop, user)}
                >
                  Leave
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white px-1 py-1 rounded mr-1"
                  onClick={() => onJoin(loop, user)}
                >
                  Join
                </button>
              )}
              {isWatcher ? (
                <button
                  className="bg-blue-500 text-white px-1 py-1 rounded"
                  onClick={() => onUnwatch(loop, user)}
                >
                  Unwatch
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white px-1 py-1 rounded"
                  onClick={() => onWatch(loop, user)}
                >
                  ️ Watch
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <LoopDetails loop={loop} />
      <IterationProgress loop={loop} />
    </div>
  );
};

export default LoopCard;
