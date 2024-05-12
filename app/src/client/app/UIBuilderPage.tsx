import React from 'react';
import { Box } from '@chakra-ui/react';
import LoopGrid from '../components/LoopGrid';

const UIBuilderPage: React.FC = () => {
  const loops = [
    {
      id: 1,
      name: 'Loop 1 Lorem Ipsum',
      description:
        'This is the first loop. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.',
      createdBy: 'John Doe',
      remainingTime: 20,
      iterations: [true, false, true, true, false],
    },
    {
      id: 2,
      name: 'Loop 2 Lorem Ipsum',
      description: 'This is the second loop. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      createdBy: 'Jane Smith',
      remainingTime: 30,
      iterations: [false, true, false, true, true],
    },
    {
      id: 3,
      name: 'Loop 3 Lorem Ipsum',
      description:
        'This is the third loop. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.',
      createdBy: 'Bob Johnson',
      remainingTime: 15,
      iterations: [true, true, false, false, true],
    },
    {
      id: 4,
      name: 'Loop 4 Lorem Ipsum',
      description: 'This is the fourth loop. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      createdBy: 'Alice Williams',
      remainingTime: 25,
      iterations: [false, true, true, false, true],
    },
    {
      id: 5,
      name: 'Loop 5 Lorem Ipsum',
      description:
        'This is the fifth loop. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.',
      createdBy: 'Tom Davis',
      remainingTime: 18,
      iterations: [true, false, false, true, false],
    },
  ];

  return (
    <Box>
      <LoopGrid loops={loops} />
    </Box>
  );
};

export default UIBuilderPage;
