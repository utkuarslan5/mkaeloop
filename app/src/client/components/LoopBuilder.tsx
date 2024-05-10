import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  Step,
  Text,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepStatus,
  Stepper,
  useSteps,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const LoopBuilder = () => {
  const [userEntries, setUserEntries] = useState(['', '', '', '']);
  const [shareUrl, setShareUrl] = useState('');
  const steps = [
    {
      title: 'First',
      description: '',
      form: (
        <FormControl>
          <FormLabel>What will you make</FormLabel>
          <Input type='text' onChange={(e) => setUserEntries([e.target.value, ...userEntries.slice(1)])} />
          <FormLabel>What will it do/look-like in the end?</FormLabel>
          <Textarea onChange={(e) => setUserEntries([userEntries[0], e.target.value, ...userEntries.slice(2)])} />
        </FormControl>
      ),
    },
    {
      title: 'Second',
      description: '',
      form: (
        <FormControl>
          <FormLabel>How many weeks will it take?</FormLabel>
          <NumberInput>
            <NumberInputField
              onChange={(e) => setUserEntries([userEntries[0], userEntries[1], e.target.value, userEntries[3]])}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel>Who will be your accountability partner?</FormLabel>
          <Input
            type='text'
            onChange={(e) => setUserEntries([userEntries[0], userEntries[1], userEntries[2], e.target.value])}
          />
        </FormControl>
      ),
    },
    {
      title: 'Confirm',
      description: '',
      form: (
        <Box>
          <Heading size='md'>{userEntries[0]}</Heading>
          <Box mt={2}>
            <Text>What will it do/look-like in the end: {userEntries[1]}</Text>
            <Text>How many weeks will it take: {userEntries[2]}</Text>
            <Text>Who will be your accountability partner: {userEntries[3]}</Text>
          </Box>
        </Box>
      ),
    },
    {
      title: 'Share',
      description: '',
      form: (
        <Box position='relative' height='100%'>
          <Heading size='md'>Share your loop</Heading>
          <Text mt={2}>Copy and share this URL with your friends and accountability partner:</Text>
          <Input value={shareUrl} isReadOnly mt={2} />
          <Flex mt={4} justify='center' align='center'>
            <Button onClick={() => (window.location.href = '/dashboard')}>Go to Dashboard</Button>
          </Flex>
        </Box>
      ),
    },
  ];

  const generateShareUrl = () => {
    const dummyUrl = 'https://example.com/share/loop';
    setShareUrl(dummyUrl);
  };
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const activeStepText = steps[activeStep].description;
  const activeStepForm = steps[activeStep].form;
  const max = steps.length - 1;
  const progressPercent = (activeStep / max) * 100;

  return (
    <Flex height='100vh' alignItems='center' justifyContent='center'>
      <Box maxW='md' mx='auto'>
        <Box position='relative'>
          <Stepper size='sm' index={activeStep} gap='0'>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator bg='white'>
                  <StepStatus complete={<StepIcon />} />
                </StepIndicator>
              </Step>
            ))}
          </Stepper>
          <Progress value={progressPercent} position='absolute' height='3px' width='full' top='10px' zIndex={-1} />
        </Box>

        <Box mt={6}>{activeStepText}</Box>
        <Box mt={6}>{activeStepForm}</Box>
        <Flex mt={6} justify='flex-end' gap={4}>
          {activeStep !== steps.length - 1 && (
            <Button onClick={() => setActiveStep(activeStep - 1)} isDisabled={activeStep === 0}>
              Previous
            </Button>
          )}
          {activeStep === steps.length - 2 && <Button onClick={() => setActiveStep(activeStep + 1)}>Confirm</Button>}
          {activeStep !== steps.length - 1 && activeStep !== steps.length - 2 && (
            <Button onClick={() => setActiveStep(activeStep + 1)} isDisabled={activeStep === max}>
              Next
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default LoopBuilder;
