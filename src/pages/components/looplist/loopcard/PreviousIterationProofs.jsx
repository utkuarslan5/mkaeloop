import React from "react";
import { useQuery, getIterationsByLoopId } from "wasp/client/operations";

const PreviousIterationsProofs = ({ loop }) => {
  const {
    data: iterations,
    isLoading,
    error,
  } = useQuery(getIterationsByLoopId, { loopId: loop.id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-4">
        {iterations.map((iteration, index) => (
          <div key={index} className="mb-4">
            <ul className="list-disc list-inside">
              {iteration.checkins.map((checkin, checkinIndex) => (
                <li key={checkinIndex}>
                  <ul className="list-disc list-inside">
                    {checkin.proofOfWork}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousIterationsProofs;
