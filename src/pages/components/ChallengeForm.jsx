import React, { useState } from "react";
import { useAction } from "wasp/client/operations";
import { createChallenge } from "wasp/client/operations";

const ProjectTypeSelect = ({ value, onChange }) => (
  <select
    className="border rounded px-2 py-1"
    value={value}
    onChange={onChange}
  >
    <option value="">Select Project Type</option>
    <option value="App">App</option>
    <option value="Design">Design</option>
    <option value="Song">Song</option>
    <option value="Writing">Writing</option>
  </select>
);

const TimeframeSelect = ({ value, onChange }) => (
  <select
    className="border rounded px-2 py-1"
    value={value}
    onChange={onChange}
  >
    <option value="">Select Timeframe</option>
    <option value="1 Day">1 Day</option>
    <option value="3 Weeks">3 Weeks</option>
    <option value="2 Months">2 Months</option>
  </select>
);

const ChallengeForm = () => {
  const createChallengeFn = useAction(createChallenge);
  const [projectType, setProjectType] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [name, setName] = useState("");

  const handleAcceptChallenge = () => {
    createChallengeFn({ projectType, timeframe, name });
    setProjectType("");
    setTimeframe("");
    setName("");
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <ProjectTypeSelect
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        />
        <TimeframeSelect
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        />
      </div>
      <input
        type="text"
        placeholder="Name"
        className="border rounded px-2 py-1 mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleAcceptChallenge}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        I Accept the Challenge
      </button>
    </div>
  );
};

export default ChallengeForm;
