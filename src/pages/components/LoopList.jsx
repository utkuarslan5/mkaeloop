import React, { useState } from "react";
import { useQuery } from "wasp/client/operations";
import { getLoops, deleteLoop } from "wasp/client/operations";
import LoopItem from "./looplist/LoopItem";
import { useAuth } from "wasp/client/auth";

const LoopList = () => {
  const { data: loops, error, isLoading, refetch } = useQuery(getLoops);
  const { data: user } = useAuth();

  const handleDelete = async (loopId) => {
    try {
      await deleteLoop({ id: loopId });
      refetch();
    } catch (error) {
      console.error("Error deleting loop:", error);
    }
  };

  if (isLoading) {
    return <div>Waiting for the loops to jump through the hoops... 🐰🔄</div>;
  }

  if (error) {
    return <div>Oops, the loops got tangled! 🥴🌀 {error.message}</div>;
  }

  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      {loops
        .filter((loop) => !loop.isDeleted)
        .map((loop) => (
          <LoopItem
            key={loop.id}
            loop={loop}
            onDelete={handleDelete}
            user={user}
          />
        ))}
    </div>
  );
};

export default LoopList;
