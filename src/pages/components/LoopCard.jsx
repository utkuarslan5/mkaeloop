import React, { useState } from "react";
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
} from "@chakra-ui/react";
import LoopDetailsCard from "./LoopDetailsCard";
import { useQuery, getUsernameFromLoopID } from "wasp/client/operations";

const LoopCard = ({ loop }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: username, isLoading: isLoadingUser } = useQuery(
    getUsernameFromLoopID,
    { id: loop.userId }
  );

  return (
    <>
      <Card p={4} borderRadius="lg" onClick={onOpen}>
        <CardHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Heading noOfLines={1}>{loop.name}</Heading>
            </Box>
            <Avatar name={username || undefined}  />
          </Flex>
        </CardHeader>
        <CardBody>
          <Box pb={4}>
            <Text noOfLines={2}>{loop.description} </Text>
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
        loop={loop}
        isOpen={isOpen}
        onClose={onClose}
        username={username}
      />
    </>
  );
};

export default LoopCard;
