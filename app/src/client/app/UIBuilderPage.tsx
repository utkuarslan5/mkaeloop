import React from 'react';
import { Box } from '@chakra-ui/react';
import LoopGrid from '../components/LoopGrid';

const UIBuilderPage: React.FC = () => {
  const loopData = [
    {
      name: 'Loop 1 Lorem Ipsum',
      description:
        'This is the first loop. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.',
      createdBy: 'John Doe',
      remainingTime: 20,
      iterations: [true, false, true, true, false],
    },
    {
      name: 'Loop 2 Lorem Ipsum',
      description: 'This is the second loop. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      createdBy: 'Jane Smith',
      remainingTime: 30,
      iterations: [false, true, false, true, true],
    },
    {
      name: 'Loop 3 Lorem Ipsum',
      description:
        'This is the third loop. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.',
      createdBy: 'Bob Johnson',
      remainingTime: 15,
      iterations: [true, true, false, false, true],
    },
    // Add more loop data as needed
  ];

  return (
    <Box>
      <LoopGrid loopData={loopData} />
    </Box>
  );
};

export default UIBuilderPage;
