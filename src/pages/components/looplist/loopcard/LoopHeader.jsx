import React from "react";

const LoopHeader = ({ loop, showDetails }) => {
  return (
    <div className="flex justify-center mb-4">
      <img
        src={loop.imageUrl || "/shipit.jpg"}
        alt={loop.name}
        className="w-16 h-16 rounded-full"
      />
      <div className="ml-4">
        <div>
          <a href={`/${loop.createdBy.username}`}>@{loop.createdBy.username}</a>
        </div>
        <div>
          🫂{loop.participants.length}
          {showDetails ? (
            <ul>
              {loop.participants.map((participant) => (
                <li key={participant.id}>
                  <a href={`/${participant.username}`}>
                    @{participant.username}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div>
          👁️‍🗨{loop.watchers.length}
          {showDetails ? (
            <ul>
              {loop.watchers.map((watcher) => (
                <li key={watcher.id}>
                  <a href={`/${watcher.username}`}>@{watcher.username}</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LoopHeader;
