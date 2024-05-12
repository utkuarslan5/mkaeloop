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
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

interface CheckinFormProps {
  isOpen: boolean;
  onClose: () => void;
  loops: { id: number; name: string }[];
}

const CheckinForm: React.FC<CheckinFormProps> = ({ isOpen, onClose, loops}) => {
  const [selectedLoop, setSelectedLoop] = useState('');
  const [weeklyWork, setWeeklyWork] = useState('');

  const steps = [
    {
      title: 'Select Loop',
      description: '',
      form: (
        <FormControl>
          <FormLabel>Select a loop to check in</FormLabel>
          <Select placeholder='Select a loop' onChange={(e) => setSelectedLoop(e.target.value)}>
            {loops.map((loop) => (
              <option key={loop.id} value={loop.id}>
                {loop.name}
              </option>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      title: 'Weekly Work',
      description: '',
      form: (
        <FormControl>
          <FormLabel>What did you work on this week?</FormLabel>
          <Textarea onChange={(e) => setWeeklyWork(e.target.value)} />
        </FormControl>
      ),
    },
    {
      title: 'Hurray!',
      description: '',
      form: (
        <Box>
          <Heading size='md'>Congratulations!</Heading>
          <Text mt={2}>You have successfully checked in for the week.</Text>
        </Box>
      ),
    },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const resetForm = () => {
    setSelectedLoop('');
    setWeeklyWork('');
    setActiveStep(0);
  };

  const activeStepText = steps[activeStep].description;
  const activeStepForm = steps[activeStep].form;
  const max = steps.length - 1;
  const progressPercent = (activeStep / max) * 100;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={['xs', 'md', 'xl']}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Check-in Form</ModalHeader>
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
            {activeStep !== steps.length - 1 && (
              <Button onClick={() => setActiveStep(activeStep + 1)} isDisabled={activeStep === max}>
                Next
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button
                onClick={() => {
                  onClose();
                  resetForm();
                }}
              >
                Submit
              </Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckinForm;
