import React from "react";

const LoopHeader = ({ loop }) => {
  return (
    <div className="flex justify-center mb-4">
      <img
        src={loop.imageUrl || "/shipit.jpg"}
        alt={loop.name}
        className="w-16 h-16 rounded-full"
      />
      <div className="ml-4">
        <div>👥 {loop.participants.length} </div>
        <div>👀 {loop.watchers.length} </div>
      </div>
    </div>
  );
};

export default LoopHeader;
