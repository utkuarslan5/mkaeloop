import React, { useState } from "react";
import { useQuery } from "wasp/client/operations";
import {
  getActiveLoops,
  deleteLoop,
  deactivateLoop,
  joinLoop,
  watchLoop,
  leaveLoop,
  unwatchLoop,
} from "wasp/client/operations";
import LoopCard from "../components/looplist/LoopCard";
import { useAuth } from "wasp/client/auth";

const LoopList = () => {
  const { data: loops, error, isLoading, refetch } = useQuery(getActiveLoops);
  const { data: user } = useAuth();

  const handleDelete = async (loop, user) => {
    try {
      const deletedLoop = await deleteLoop({ loop, user });
      setTimeout(() => {
        refetch();
      }, 1000);
    } catch (error) {
      console.error("Error deleting loop:", error);
    }
  };

  const handleDeactivate = async (loop, user) => {
    try {
      const deactivatedLoop = await deactivateLoop({ loop, user });
      setTimeout(() => {
        refetch();
      }, 1000);
    } catch (error) {
      console.error("Error deactivating loop:", error);
    }
  };

  const handleJoinLoop = async (loop, user) => {
    try {
      const updatedLoop = await joinLoop({ loop, user });
      setTimeout(() => {
        refetch();
      }, 1000);
    } catch (error) {
      console.error("Error joining loop:", error);
    }
  };

  const handleWatchLoop = async (loop, user) => {
    try {
      const updatedLoop = await watchLoop({ loop, user });
      setTimeout(() => {
        refetch();
      }, 1000);
    } catch (error) {
      console.error("Error watching loop:", error);
    }
  };

  const handleLeaveLoop = async (loop, user) => {
    try {
      const updatedLoop = await leaveLoop({ loop, user });
      setTimeout(() => {
        refetch();
      }, 1000);
    } catch (error) {
      console.error("Error leaving loop:", error);
    }
  };

  const handleUnwatchLoop = async (loop, user) => {
    try {
      const updatedLoop = await unwatchLoop({ loop, user });
      setTimeout(() => {
        refetch();
      }, 1000);
    } catch (error) {
      console.error("Error unwatching loop:", error);
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
          <LoopCard
            key={loop.id}
            loop={loop}
            onRemove={handleDeactivate}
            onJoin={handleJoinLoop}
            onLeave={handleLeaveLoop}
            onWatch={handleWatchLoop}
            onUnwatch={handleUnwatchLoop}
            user={user}
          />
        ))}
    </div>
  );
};

export default LoopList;
