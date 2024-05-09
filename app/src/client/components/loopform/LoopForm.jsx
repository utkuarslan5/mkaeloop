import React, { useState, useEffect } from 'react';
import { useAction } from 'wasp/client/operations';
import { createLoop, createIterations } from 'wasp/client/operations';
import LoopBuilder from './LoopBuilder';
import { useAuth } from 'wasp/client/auth';
import LoginPopUp from '../../auth/LoginPopUp';
import LoopMessage from './LoopMessage';
import AcceptLoopButton from './AcceptLoopButton';
import { Box } from '@chakra-ui/react';

const LoopForm = () => {
  const { data: user } = useAuth();
  const createLoopFn = useAction(createLoop);
  const createIterationsFn = useAction(createIterations);
  const [projectType, setProjectType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [iterations, setIterations] = useState(1);
  const [showLoginPopUp, setShowLoginPopUp] = useState(false);

  useEffect(() => {
    if (user) {
      const storedProjectType = localStorage.getItem('projectType');
      const storedFrequency = localStorage.getItem('frequency');
      const storedIterations = localStorage.getItem('iterations');

      if (storedProjectType) {
        setProjectType(storedProjectType);
      }
      if (storedFrequency) {
        setFrequency(storedFrequency);
      }
      if (storedIterations) {
        setIterations(parseInt(storedIterations));
      }
    }
  }, [user]);

  const handleAcceptLoop = async () => {
    localStorage.setItem('projectType', projectType);
    localStorage.setItem('frequency', frequency);
    localStorage.setItem('iterations', iterations);

    if (!user) {
      setShowLoginPopUp(true);
      return;
    }

    if (projectType && frequency && iterations > 0) {
      const args = {
        name: `${user.username} ${iterations} ${projectType} in ${frequency}`,
        projectType: projectType.toLowerCase(),
        numIterations: iterations,
        frequency: frequency,
        isActive: true,
        createdById: user.id,
      };

      const loop = await createLoopFn(args);
      const updatedLoop = await createIterationsFn({ loop });
      setProjectType('');
      setFrequency('');
      setIterations(1);
    } else {
      alert('Please fill in all fields before accepting the loop.');
    }
  };

  return (
    <Box maxW='4xl' mx='auto'>
      <LoopBuilder
        projectType={projectType}
        frequency={frequency}
        iterations={iterations}
        setIterations={setIterations}
        setProjectType={setProjectType}
        setFrequency={setFrequency}
      />
      {projectType && frequency && iterations ? (
        <LoopMessage projectType={projectType} frequency={frequency} iterations={iterations} />
      ) : null}
      <AcceptLoopButton onClick={handleAcceptLoop} />
      {showLoginPopUp && <LoginPopUp setShowLoginPopUp={setShowLoginPopUp} />}
    </Box>
  );
};

export default LoopForm;
