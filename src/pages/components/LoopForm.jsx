import React, { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { createLoop } from "wasp/client/operations";

const LoopForm = ({ isOpen, onClose }) => {
  const [userEntries, setUserEntries] = useState(["", ""]);
  const toast = useToast();
  const steps = [
    {
      title: "First",
      description: "",
      form: (
        <FormControl>
          <FormLabel>Name of your project</FormLabel>
          <Input
            type="text"
            value={userEntries[0]}
            onChange={(e) => setUserEntries([e.target.value, userEntries[1]])}
          />
          <Box mt={4}>
            <FormLabel>What does it solve? Describe it</FormLabel>
            <Textarea
              value={userEntries[1]}
              onChange={(e) => setUserEntries([userEntries[0], e.target.value])}
            />
          </Box>
        </FormControl>

      ),
    },
  ];

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
      };
      await createLoop(loopData);
      setActiveStep(0);
      setUserEntries(["", ""]);
      onClose();
      toast({
        description: "Loop created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating loop:", error);
      toast({
        description: "An error occurred while creating the loop",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={["xs", "md", "xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>Loop Form</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody>
          {/* <Box position="relative">
            <Stepper size="sm" index={activeStep} gap="0">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator bg="white">
                    <StepStatus complete={<StepIcon />} />
                  </StepIndicator>
                </Step>
              ))}
            </Stepper>
            <Progress
              value={progressPercent}
              position="absolute"
              height="3px"
              width="full"
              top="10px"
              zIndex={-1}
            />
          </Box> */}

          <Box mt={6}>{activeStepText}</Box>
          <Box mt={6}>{activeStepForm}</Box>
        </ModalBody>

        <ModalFooter>
          <Flex justify="flex-end" gap={4}>
            {/* <Button
              onClick={() => setActiveStep(activeStep - 1)}
              isDisabled={activeStep === 0}
            >
              Previous
            </Button>
            {activeStep !== max && (
              <Button
                onClick={() => setActiveStep(activeStep + 1)}
                isDisabled={activeStep === max}
              >
                Next
              </Button>
            )} */}
            {activeStep === max && (
              <Button onClick={handleConfirm}>Submit</Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoopForm;
