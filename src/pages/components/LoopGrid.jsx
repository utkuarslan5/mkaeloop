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
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import React, { useEffect, useState, useRef } from "react";
import LoopCard from "./LoopCard";
import LoopForm from "./LoopForm";
import CheckinForm from "./CheckinForm";

const LoopGrid = ({ loops }) => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [isLoopFormOpen, setIsLoopFormOpen] = useState(false);
  const [isCheckinFormOpen, setIsCheckinFormOpen] = useState(false);
  const oneMinute = 60000;
  const checkinFormRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, oneMinute);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = formatTime(remainingTime);
  const weekRange = getWeekRange();

  const handleCreateClick = () => {
    setIsLoopFormOpen(true);
  };

  const handleLoopFormClose = () => {
    setIsLoopFormOpen(false);
  };

  const handleCheckinClick = () => {
    setIsCheckinFormOpen(true);
  };

  const handleCheckinFormClose = () => {
    setIsCheckinFormOpen(false);
  };

  return (
    <Box>
      <Stack
        direction={["column", "row"]}
        spacing="24px"
        justify="space-between"
        mb={4}
        py={4}
        px={6}
      >
        <Stat>
          <StatLabel>Remaining time</StatLabel>
          <StatNumber>{formattedTime}</StatNumber>
          <StatHelpText>{weekRange}</StatHelpText>
        </Stat>
        <Button
          leftIcon={<CheckIcon />}
          variant="solid"
          onClick={handleCheckinClick}
        >
          Check-in
        </Button>
        <Button
          leftIcon={<AddIcon />}
          variant="outline"
          onClick={handleCreateClick}
        >
          Create
        </Button>
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

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
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
