import React from 'react';
import { Card, CardBody, CardFooter, Flex, Heading, Text, Badge, Button, Stack, Progress } from '@chakra-ui/react';

interface LoopCardProps {
  name: string;
  description: string;
  createdBy: string;
  remainingTime: number;
}

const LoopCard: React.FC<LoopCardProps> = ({ name, description, createdBy, remainingTime }) => {
  return (
    <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
      <Stack>
        <CardBody>
          <Heading size='md' color='blackAlpha.800'>
            {name}
          </Heading>
          <Text py='2' color='blackAlpha.800'>
            {description}
          </Text>
        </CardBody>
        <CardFooter>
          <Flex alignItems='center' mb={2}>
            <Text fontWeight='bold' mr={2} color='blackAlpha.800'>
              Created by:
            </Text>
            <Badge colorScheme='blackAlpha'>{createdBy}</Badge>
          </Flex>
          <Flex alignItems='center' mb={2}>
            <Text fontWeight='bold' mr={2} color='blackAlpha.800'>
              Remaining time:
            </Text>
            <Progress value={remainingTime} size='sm' colorScheme='blackAlpha' />
          </Flex>
          <Button variant='solid' colorScheme='blackAlpha'>
            Join Loop
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default LoopCard;
