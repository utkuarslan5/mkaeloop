import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Progress,
  Avatar,
  Box,
  HStack,
  VStack,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import IterationPopover from './IterationPopover';

interface LoopDetailsCardProps {
  name: string;
  createdBy: string;
  description: string;
  remainingTime: number;
  iterations: boolean[];
  isOpen: boolean;
  onClose: () => void;
}

const LoopDetailsCard: React.FC<LoopDetailsCardProps> = ({
  name,
  createdBy,
  description,
  remainingTime,
  iterations,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={['xs', 'sm', 'md', 'lg', 'xl']}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Heading>{name}</Heading>
            <Spacer />
            <Avatar name={createdBy} size='md' />
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack align='stretch' spacing={6}>
            <Text>{description}</Text>
            {/* <Box>
              <Text>Remaining time:</Text>
              <Progress value={remainingTime} size='md' colorScheme='blackAlpha' />
            </Box> */}
            <Box display='flex' mt={2}> 
              {iterations.map((iteration, index) => (
                <IterationPopover key={index} iteration={iteration} />
              ))}
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>{/*add footer button here*/}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoopDetailsCard;
