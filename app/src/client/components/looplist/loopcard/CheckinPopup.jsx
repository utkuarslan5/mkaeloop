// CheckinPopup.jsx
import React, { useState } from "react";
import { createCheckin } from "wasp/client/operations";
import { getCurrentIteration } from "../utils";
import JSConfetti from "js-confetti";

const CheckinPopup = ({ loop, user, refetch, onClose }) => {
  const [proofOfWork, setProofOfWork] = useState("");
  const [faithfullyDone, setFaithfullyDone] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const jsConfetti = new JSConfetti();

  const handleCheckin = async () => {
    try {
      if (proofOfWork === "") {
        setError("Proof of work cannot be empty");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }
      await createCheckin({
        iterationId: getCurrentIteration(loop).id,
        userId: user?.id,
        proofOfWork,
      });
      onClose();
      setProofOfWork("");
      setFaithfullyDone(false);
      refetch();
      jsConfetti.addConfetti({
        emojis: ["🎉", "⚡️", '💫', '🌸', "🦄", "🌟"],
      });
    } catch (error) {
      setError(error.message);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };
  // TODO: remove checkin if all iterations complete
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <div>
          <h2 className="text-lg font-bold mb-2">Checkin</h2>
          <input
            type="text"
            placeholder="Enter URL of your work"
            value={proofOfWork}
            onChange={(e) => setProofOfWork(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 mb-2"
          />
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={faithfullyDone}
              onChange={(e) => setFaithfullyDone(e.target.checked)}
              className="mr-2"
            />
            <label>I have done it faithfully</label>
          </div>
          {showError && <div className="text-red-500 mb-2">{error}</div>}
          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              onClick={handleCheckin}
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckinPopup;
