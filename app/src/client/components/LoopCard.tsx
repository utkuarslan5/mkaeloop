import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
  Badge,
  Button,
  Box,
  Progress,
  Avatar,
  AvatarGroup,
  useDisclosure,
} from '@chakra-ui/react';
import LoopDetailsCard from './LoopDetailsCard';

interface LoopCardProps {
  name: string;
  description: string;
  createdBy: string;
  remainingTime: number;
  iterations: boolean[];}

const LoopCard: React.FC<LoopCardProps> = ({ name, createdBy, description, remainingTime, iterations }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card p={4} borderRadius='lg' onClick={onOpen}>
        <CardHeader>
          <Flex justifyContent='space-between' alignItems='center'>
            <Box>
              <Heading noOfLines={1}>{name}</Heading>
            </Box>
            <Avatar name={createdBy} />
          </Flex>
        </CardHeader>
        <CardBody>
          <Box pb={4}>
            <Text>{description}</Text>
          </Box>
          {/*
          <Box width='80%'>
            <Text mb={2}>Remaining time</Text>
            <Progress value={remainingTime} size='md' colorScheme='blackAlpha' />
          </Box>
          */}
        </CardBody>
      </Card>

      <LoopDetailsCard
        name={name}
        createdBy={createdBy}
        description={description}
        remainingTime={remainingTime}
        iterations={iterations}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default LoopCard;
