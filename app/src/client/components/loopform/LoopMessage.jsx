import React from 'react';
import { Box, Text, Heading, Select } from '@chakra-ui/react';

const LoopMessage = ({ projectType, frequency, iterations }) => (
  <Box bg='primary' p={8} rounded='md' mb={4} textAlign='center'>
    <Text fontSize='xl' mb={2} textAlign='left'>
      📺 Your Mission, If You Choose to Accept:
    </Text>
    <Heading fontSize='2xl' fontWeight='bold'>
      📝 Create {iterations}{' '}
      {projectType === 'app'
        ? '📱 Apps'
        : projectType === 'design'
          ? '🎨 Designs'
          : projectType === 'song'
            ? '🎵 Songs'
            : projectType === 'writing'
              ? '✍️ Writings'
              : '🤔 What?'}{' '}
      in {iterations}{' '}
      {frequency === 'daily'
        ? '🌞 Days'
        : frequency === 'weekly'
          ? '🗓 Weeks'
          : frequency === 'monthly'
            ? '📆 Months'
            : '⏱️ How long?'}
      .
    </Heading>
    <Select>
      <option value='option1'>Option 1</option>
      <option value='option2'>Option 2</option>
      <option value='option3'>Option 3</option>
    </Select>
  </Box>
);

export default LoopMessage;
