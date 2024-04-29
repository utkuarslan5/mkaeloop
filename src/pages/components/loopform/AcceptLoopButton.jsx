import React from 'react';

const AcceptLoopButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
  >
    I Accept the Loop
  </button>
);

export default AcceptLoopButton;