import React, { useState } from "react";
import { useQuery } from "wasp/client/operations";
import {
  getActiveLoops,
  deleteLoop,
  deactivateLoop,
} from "wasp/client/operations";
import LoopItem from "../components/looplist/LoopItem";
import { useAuth } from "wasp/client/auth";

const LoopList = () => {
  const { data: loops, error, isLoading, refetch } = useQuery(getActiveLoops);
  const { data: user } = useAuth();

  const handleDelete = async (loop, user) => {
    try {
      const deletedLoop = await deleteLoop({ loop, user });
      refetch();
    } catch (error) {
      console.error("Error deleting loop:", error);
    }
  };

  const handleDeactivate = async (loop, user) => {
    try {
      const deactivatedLoop = await deactivateLoop({ loop, user });
      refetch();
    } catch (error) {
      console.error("Error deactivating loop:", error);
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
            onRemove={handleDeactivate}
            user={user}
          />
        ))}
    </div>
  );
};

export default LoopList;
