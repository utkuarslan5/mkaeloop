import React from "react";
import { Box } from "@chakra-ui/react";
import LoopGrid from "../components/LoopGrid";
import { useQuery, getActiveLoops } from "wasp/client/operations";

const HomePage = () => {
  const { data: loops, isLoading, error } = useQuery(getActiveLoops);

  return (
    <Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <LoopGrid loops={loops} />
      )}
    </Box>
  );
};

export default HomePage;
