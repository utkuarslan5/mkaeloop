import React, { useState } from "react";
import LoopHeader from "./LoopHeader";
import LoopActions from "./LoopActions";
import LoopDetails from "./LoopDetails";
import IterationProgress from "../IterationProgress";
import LoopPage from "./LoopPage";

const LoopCard = ({ loop, refetch }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = (e) => {
    if (e.target.closest(".action-button")) return;
    setShowDetails(!showDetails);
  };

  return (
    <div
      className="bg-gray-100 p-4 rounded-lg relative mt-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <LoopHeader loop={loop} />
      <LoopActions loop={loop} isHovered={isHovered} refetch={refetch} />
      <LoopDetails loop={loop} />
      <IterationProgress loop={loop} />
      {/* <LoopPage loop={loop} isOpen={showDetails} closeModal={handleClick} /> */}
    </div>
  );
};

export default LoopCard;