import React from 'react';

const ChallengeList = ({ challenges }) => {
  return (
    <div className="mt-4">
      {challenges.map((challenge) => (
        <div key={challenge.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
          <div>{challenge.projectType}</div>
          <div>{challenge.timeframe}</div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeList;