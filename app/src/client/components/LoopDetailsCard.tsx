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
import { type Loop, type User } from 'wasp/entities';
import { useQuery, getIterations } from 'wasp/client/operations';

interface LoopDetailsCardProps {
  loop: Loop;
  isOpen: boolean;
  onClose: () => void;
  username?: string;
}

const LoopDetailsCard: React.FC<LoopDetailsCardProps> = ({ loop, isOpen, onClose, username }) => {
  const { data: iterations } = useQuery(getIterations, { loopId: loop.id });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={['xs', 'sm', 'md', 'lg', 'xl']}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Heading>{loop.name}</Heading>
            <Spacer />
            <Avatar name={username || 'John Doe'} size='md' />
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack align='stretch' spacing={6}>
            <Text>{loop.description}</Text>
            <HStack>
              {iterations?.map((iteration, index) => <IterationPopover key={iteration.id} {...iteration} />)}
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>{/*add footer button here*/}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoopDetailsCard;
