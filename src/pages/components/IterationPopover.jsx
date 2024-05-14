import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Box,
} from "@chakra-ui/react";

const IterationPopover = (iteration) => {
  const weeksAgo = getWeeksAgo(new Date(iteration.endTime), new Date());

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Box
          bg={iteration.isComplete ? "green.500" : "red.400"}
          borderRadius="md"
          border="2px solid"
          borderColor="gray.400"
          w={4}
          h={4}
          mx={1}
        />
      </PopoverTrigger>
      <PopoverContent maxW="md">
        <PopoverHeader>
          {!iteration.isComplete && weeksAgo <= 0
            ? `Active`
            : `${weeksAgo} weeks ago`}
        </PopoverHeader>
        <PopoverBody>
          <p>{iteration.checkin}</p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const getWeeksAgo = (startTime, endTime) => {
  const oneWeek = 604800000; // milliseconds in a week
  const diffTime = startTime.getTime() - endTime.getTime();
  const diffWeeks = Math.ceil(diffTime / oneWeek);
  return diffWeeks;
};

export default IterationPopover;
