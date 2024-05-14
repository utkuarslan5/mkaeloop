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
  Select,
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
import { useAuth } from "wasp/client/auth";
import { addCheckin } from "wasp/client/operations";

const CheckinForm = ({ isOpen, onClose, loops }) => {
  const [selectedLoop, setSelectedLoop] = useState(null);
  const [weeklyWork, setWeeklyWork] = useState("");
  const { data: user } = useAuth();
  const toast = useToast();

  const userLoops = loops.filter((loop) => {
    return loop.userId === user?.id;
  });

  const handleLoopSelect = (e) => {
    const selectedLoopName = e.target.value;
    const loop = userLoops.find((loop) => loop.name === selectedLoopName);
    setSelectedLoop(loop || null);
  };

  const steps = [
    {
      title: "Select Loop",
      description: "",
      form: (
        <FormControl>
          <FormLabel>Select a loop to check in</FormLabel>
          <Select
            placeholder="Select a loop"
            value={selectedLoop?.name || ""}
            onChange={handleLoopSelect}
          >
            {userLoops.map((loop) => (
              <option key={loop.id} value={loop.name}>
                {loop.name}
              </option>
            ))}
          </Select>

          <Box mt={4}>
            <FormLabel>What did you work on this week?</FormLabel>
            <Textarea
              value={weeklyWork}
              onChange={(e) => setWeeklyWork(e.target.value)}
            />
          </Box>
        </FormControl>
      ),
    },
    // {
    //   title: "Confirm Check-in",
    //   description: "",
    //   form: (
    //     <Box>
    //       <FormLabel>{selectedLoop?.name}</FormLabel>
    //       <Text>{weeklyWork}</Text>
    //     </Box>
    //   ),
    // },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const submitForm = () => {
    if (selectedLoop && weeklyWork) {
      addCheckin({
        loopId: selectedLoop.id,
        checkin: weeklyWork,
      })
        .then(() => {
          toast({
            description: "Check-in submitted successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setSelectedLoop(null);
          setWeeklyWork("");
          setActiveStep(0);
          onClose();
        })
        .catch((error) => {
          console.error("Error submitting check-in:", error);
          toast({
            description: "An error occurred while submitting the check-in",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  const activeStepText = steps[activeStep].description;
  const activeStepForm = steps[activeStep].form;
  const max = steps.length - 1;
  const progressPercent = (activeStep / max) * 100;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={["xs", "md", "xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>Check-in</ModalHeader> */}
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
            {activeStep === max && <Button onClick={submitForm}>Submit</Button>}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckinForm;
