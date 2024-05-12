import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Box,
} from '@chakra-ui/react';

interface IterationPopoverProps {
  iteration: boolean
}

const IterationPopover: React.FC<IterationPopoverProps> = ({ iteration }) => {

  return (
    <Popover>
      <PopoverTrigger>
        <Box
          bg={iteration ? 'green.500' : 'gray.400'}
          borderRadius="md"
          border="2px solid"
          borderColor="gray.400"
          w={4}
          h={4}
          mx={1}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Iteration Details</PopoverHeader>
        <PopoverBody>
          <p>Completed: {iteration ? 'Yes' : 'No'}</p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default IterationPopover;
