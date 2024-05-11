// LoopGrid.tsx
import { Box, SimpleGrid, GridItem, Stack, Button, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import LoopCard from './LoopCard';

interface LoopData {
  name: string;
  description: string;
  createdBy: string;
  remainingTime: number;
  iterations: boolean[];
}

interface LoopGridProps {
  loopData: LoopData[];
}

const LoopGrid: React.FC<LoopGridProps> = ({ loopData }) => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 60000); // Update every minute (60000 milliseconds)

    return () => clearInterval(interval);
  }, []);

  const formattedTime = formatTime(remainingTime);
  const weekRange = getWeekRange();

  return (
    <Box>
      <Stack direction={['column', 'row']} spacing='24px' justify='space-between' mb={4} py={4} px={6}>
        <Stat>
          <StatLabel>Time Remaining</StatLabel>
          <StatNumber>{formattedTime}</StatNumber>
          <StatHelpText>{weekRange}</StatHelpText>
        </Stat>
        <Button leftIcon={<AddIcon />}  variant='solid'>
          Create
        </Button>
      </Stack>
      <SimpleGrid minChildWidth='300px' spacing={6}>
        {loopData.map((loop, index) => (
          <GridItem key={index}>
            <LoopCard
              name={loop.name}
              description={loop.description}
              createdBy={loop.createdBy}
              remainingTime={loop.remainingTime}
              iterations={loop.iterations}
            />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};

const getRemainingTime = () => {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setUTCHours(17, 0, 0, 0); // Set target time to 5:00 PM UTC
  targetTime.setUTCDate(targetTime.getUTCDate() + ((5 + (7 - targetTime.getUTCDay())) % 7)); // Set target date to the next Friday

  return targetTime.getTime() - now.getTime();
};

const formatTime = (remainingtime: number) => {
  const days = Math.floor(remainingtime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingtime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingtime / (1000 * 60)) % 60);

  return `${days} days ${hours} hours ${minutes} mins`;
};

const getWeekRange = () => {
  const today = new Date();
  const lastFriday = new Date(today.setDate(today.getDate() - ((today.getDay() + 2) % 7)));
  const nextFriday = new Date(lastFriday.setDate(lastFriday.getDate() + 7));
  const prevFriday = new Date(lastFriday.setDate(lastFriday.getDate() - 7));

  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  const startDate = prevFriday.toLocaleDateString('en-US', options);
  const endDate = nextFriday.toLocaleDateString('en-US', options);

  return `${startDate} - ${endDate}`;
};

export default LoopGrid;
