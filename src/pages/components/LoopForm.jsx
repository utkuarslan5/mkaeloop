import React, { useState, useEffect } from "react";
import { useAction } from "wasp/client/operations";
import { createLoop, createIterations } from "wasp/client/operations";
import LoopBuilder from "./LoopBuilder";
import { useAuth } from "wasp/client/auth";
import LoginPopUp from "../auth/LoginPopUp";

const LoopForm = () => {
  const { data: user } = useAuth();
  const createLoopFn = useAction(createLoop);
  const createIterationsFn = useAction(createIterations);
  const [projectType, setProjectType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [iterations, setIterations] = useState(1);
  const [showLoginPopUp, setShowLoginPopUp] = useState(false);

  useEffect(() => {
    if (user) {
      const storedProjectType = localStorage.getItem("projectType");
      const storedFrequency = localStorage.getItem("frequency");
      const storedIterations = localStorage.getItem("iterations");

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
    localStorage.setItem("projectType", projectType);
    localStorage.setItem("frequency", frequency);
    localStorage.setItem("iterations", iterations);

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
      console.log("Final updated loop:", updatedLoop);
      setProjectType("");
      setFrequency("");
      setIterations(1);
    } else {
      alert("Please fill in all fields before accepting the loop.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <LoopBuilder
        projectType={projectType}
        frequency={frequency}
        iterations={iterations}
        setIterations={setIterations}
        setProjectType={setProjectType}
        setFrequency={setFrequency}
      />
      {projectType && frequency && iterations ? (
        <LoopMessage
          projectType={projectType}
          frequency={frequency}
          iterations={iterations}
        />
      ) : null}
      <AcceptLoopButton onClick={handleAcceptLoop} />
      {showLoginPopUp && <LoginPopUp />}
    </div>
  );
};

const LoopMessage = ({ projectType, frequency, iterations }) => (
  <div className="bg-blue-100 p-4 rounded mb-4">
    <p className="text-xl mb-2">
      Your Mission, Should You Choose to Accept It:
    </p>
    <h2 className="text-2xl font-bold">
      Create {iterations}{" "}
      {projectType === "App"
        ? " App📱"
        : projectType === "Design"
        ? " Design🎨"
        : projectType === "Song"
        ? " Song🎵"
        : projectType === "Writing"
        ? "✍️ Writing"
        : " What?🤔"}{" "}
      in {iterations}{" "}
      {frequency === "daily"
        ? "Days ⏳"
        : frequency === "weekly"
        ? " Weeks 🗓"
        : frequency === "monthly"
        ? "Months 📆"
        : "How long? ⏱️"}
      .
    </h2>
  </div>
);

const AcceptLoopButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
  >
    I Accept the Loop
  </button>
);

export default LoopForm;
