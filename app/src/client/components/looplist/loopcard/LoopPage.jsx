import React from "react";
import LoopHeader from "./LoopHeader";
import LoopActions from "./LoopActions";
import LoopDetails from "./LoopDetails";
import IterationProgress from "../IterationProgress";
import PreviousIterationsProofs from "./PreviousIterationProofs"; // New component import

const LoopPage = ({ loop, isOpen, closeModal }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-12 max-w-screen-xl relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <LoopHeader loop={loop} showDetails={true} />
          <LoopDetails loop={loop} />
          <IterationProgress loop={loop} />
          <PreviousIterationsProofs loop={loop} />{" "}
        </div>
      </div>
    )
  );
};

export default LoopPage;
