import React from "react";

const AcceptLoopButton = ({ onClick }) => (
  <div className="flex justify-center mb-8">
    <button
      onClick={onClick}
      className="bg-secondary hover:bg-primarydark text-white font-bold py-2 px-48 rounded"
    >
      I Accept the Loop
    </button>
  </div>
);

export default AcceptLoopButton;
