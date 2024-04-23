import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getChallenges } from 'wasp/client/operations';
import ChallengeForm from './components/ChallengeForm';
import ChallengeList from './components/ChallengeList';

const HomePage = () => {
  const { data: challenges, isLoading, error } = useQuery(getChallenges);

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        MkaeLoop - Commit to Create. Dare to Deliver.
      </h1>
      <ChallengeForm />
      <ChallengeList challenges={challenges} />
    </div>
  );
};

export default HomePage;