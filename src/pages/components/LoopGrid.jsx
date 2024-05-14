// LoopGrid.jsx
import {
  Box,
  SimpleGrid,
  GridItem,
  Stack,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tooltip,
  useToast,
  Wrap,
  WrapItem,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import React, { useEffect, useState, useRef } from "react";
import LoopCard from "./LoopCard";
import LoopForm from "./LoopForm";
import CheckinForm from "./CheckinForm";
import { useAuth } from "wasp/client/auth";

const LoopGrid = ({ loops }) => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [isLoopFormOpen, setIsLoopFormOpen] = useState(false);
  const [isCheckinFormOpen, setIsCheckinFormOpen] = useState(false);
  const oneMinute = 60000;
  const { data: user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, oneMinute);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = formatTime(remainingTime);
  const weekRange = getWeekRange();

  const handleCreateClick = () => {
    if (!user) {
      toast({
        description: "You must be logged in to create a new loop",
        status: "warning",
        isClosable: true,
        duration: 2500,
      });
    } else {
      setIsLoopFormOpen(true);
    }
  };

  const handleLoopFormClose = () => {
    setIsLoopFormOpen(false);
  };

  const handleCheckinClick = () => {
    if (!user) {
      toast({
        description: "You must be logged in to check-in",
        status: "warning",
        isClosable: true,
        duration: 2500,
      });
    } else {
      setIsCheckinFormOpen(true);
    }
  };

  const handleCheckinFormClose = () => {
    setIsCheckinFormOpen(false);
  };

  return (
    <Box>
      <Stack
        direction={["row"]}
        // spacing="24px"
        justify="space-between"
        mb={4}
        py={4}
        px={6}
      >
        <Stat>
          <StatNumber fontSize={["2xl", "3xl"]}>{formattedTime}</StatNumber>
          <StatHelpText>{weekRange}</StatHelpText>
        </Stat>
        <Stack direction={["column", "row"]} spacing={[2, 4]} justify="baseline">
          <Tooltip label="Show what you did this week">
            <Button
              leftIcon={<CheckIcon />}
              variant="solid"
              onClick={handleCheckinClick}
              size={["sm", "md"]}
              width="100%"
            >
              Check-in
            </Button>
          </Tooltip>
          <Tooltip label="Start a new project cycle">
            <Button
              leftIcon={<AddIcon />}
              variant="outline"
              onClick={handleCreateClick}
              size={["sm", "md"]}
              width="100%"
            >
              Create
            </Button>
          </Tooltip>
        </Stack>


      </Stack>
      <SimpleGrid minChildWidth="300px" spacing={4}>
        {" "}
        {loops.map((loop, index) => (
          <GridItem key={index}>
            <LoopCard loop={loop} />
          </GridItem>
        ))}
      </SimpleGrid>
      <LoopForm isOpen={isLoopFormOpen} onClose={handleLoopFormClose} />
      <CheckinForm
        isOpen={isCheckinFormOpen}
        onClose={handleCheckinFormClose}
        loops={loops}
      />
    </Box>
  );
};

const getRemainingTime = () => {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setUTCHours(17, 0, 0, 0); // Set target time to 5:00 PM UTC
  targetTime.setUTCDate(
    targetTime.getUTCDate() + ((5 + (7 - targetTime.getUTCDay())) % 7)
  ); // Set target date to the next Friday

  return targetTime.getTime() - now.getTime();
};

const formatTime = (remainingtime) => {
  const days = Math.floor(remainingtime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingtime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingtime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingtime % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m`;
};

const getWeekRange = () => {
  const now = new Date();
  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay() + 1
  );
  const endOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + (7 - now.getDay())
  );

  const options = { month: "short", day: "numeric" };
  const startDate = startOfWeek.toLocaleDateString("en-US", options);
  const endDate = endOfWeek.toLocaleDateString("en-US", options);

  return `${startDate} - ${endDate}`;
};

export default LoopGrid;
