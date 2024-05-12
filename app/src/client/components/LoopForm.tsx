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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { createLoop } from 'wasp/client/operations';
interface LoopFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoopForm: React.FC<LoopFormProps> = ({ isOpen, onClose }) => {
  const [userEntries, setUserEntries] = useState(['', '', '']);

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
          <FormLabel>Who will be your accountability partner?</FormLabel>
          <Input type='text' onChange={(e) => setUserEntries([userEntries[0], userEntries[1], e.target.value])} />
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
            <Text>Who will be your accountability partner: {userEntries[2]}</Text>
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
          {/* Add share functionality here */}
          {/* <Flex mt={4} justify='center' align='center'>
            <Button onClick={() => (window.location.href = '/dashboard')}>Go to Dashboard</Button>
          </Flex> */}
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

  const handleConfirm = async () => {
    try {
      const loopData = {
        name: userEntries[0],
        description: userEntries[1],
        accountabilityPartner: userEntries[2],
      };
      await createLoop(loopData);
      setActiveStep(activeStep + 1);
      setUserEntries(['', '', '']); // Reset form after confirmation
    } catch (error) {
      console.error('Error creating loop:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={['xs', 'md', 'xl']}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Loop Form</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
        </ModalBody>

        <ModalFooter>
          <Flex justify='flex-end' gap={4}>
            {activeStep !== steps.length - 1 && (
              <Button onClick={() => setActiveStep(activeStep - 1)} isDisabled={activeStep === 0}>
                Previous
              </Button>
            )}
            {activeStep === steps.length - 2 && <Button onClick={handleConfirm}>Confirm</Button>}
            {activeStep !== steps.length - 1 && activeStep !== steps.length - 2 && (
              <Button onClick={() => setActiveStep(activeStep + 1)} isDisabled={activeStep === max}>
                Next
              </Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoopForm;
