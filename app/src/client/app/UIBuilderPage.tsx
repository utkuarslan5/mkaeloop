import React from 'react';
import { Box } from '@chakra-ui/react';
import LoopCard from '../components/LoopCard';

const UIBuilder = () => {
  const loopData = [
    {
      name: 'Loop 1',
      description: 'This is the first loop',
      createdBy: 'John Doe',
      remainingTime: 20,
    },
    // Add more loop data as needed
  ];

  return (
    <Box>
      {loopData.map((loop, index) => (
        <LoopCard
          key={index}
          name={loop.name}
          description={loop.description}
          createdBy={loop.createdBy}
          remainingTime={loop.remainingTime}
        />
      ))}
    </Box>
  );
};

export default UIBuilder;
