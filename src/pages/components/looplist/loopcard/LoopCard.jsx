import React, { useState } from "react";
import LoopHeader from "./LoopHeader";
import LoopActions from "./LoopActions";
import LoopDetails from "./LoopDetails";
import IterationProgress from "../IterationProgress";


const LoopCard = ({ loop, refetch }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-gray-100 p-4 rounded-lg relative mt-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LoopHeader loop={loop} />
      <LoopActions loop={loop} isHovered={isHovered} refetch={refetch} />
      <LoopDetails loop={loop} />
      <IterationProgress loop={loop} />
    </div>
  );
};

export default LoopCard;