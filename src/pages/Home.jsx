import React from "react";
import { useQuery } from "wasp/client/operations";
import { getLoops } from "wasp/client/operations";
import LoopForm from "./components/LoopForm";
import LoopList from "./components/LoopList";

const HomePage = () => {
  const { data: loops, isLoading, error } = useQuery(getLoops);

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        MkaeLoop - Dare together. Deliver accountable.
      </h1>
      <LoopForm />
      <LoopList loops={loops} />
    </div>
  );
};

export default HomePage;
