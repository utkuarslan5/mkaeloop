import React, { useState, useEffect } from "react";
import { useAction } from "wasp/client/operations";
import { createLoop } from "wasp/client/operations";
import LoopBuilder from "./LoopBuilder";
import { useAuth } from "wasp/client/auth";
import LoginPopUp from "../auth/LoginPopUp";

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
      {frequency === "Days"
        ? "Days ⏳"
        : frequency === "Weeks"
        ? " Weeks 🗓"
        : frequency === "Months"
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

const LoopForm = () => {
  const { data: user } = useAuth();
  const createLoopFn = useAction(createLoop);
  const [projectType, setProjectType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [iterations, setIterations] = useState(1);
  const [showLoginPopUp, setShowLoginPopUp] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("Step 1: Check if user is logged in");
    if (user) {
      console.log("User is logged in, retrieving stored loop data");
      const storedProjectType = localStorage.getItem("projectType");
      const storedFrequency = localStorage.getItem("frequency");
      const storedIterations = localStorage.getItem("iterations");

      if (storedProjectType) {
        console.log(
          "Setting projectType from localStorage:",
          storedProjectType
        );
        setProjectType(storedProjectType);
      }
      if (storedFrequency) {
        console.log("Setting frequency from localStorage:", storedFrequency);
        setFrequency(storedFrequency);
      }
      if (storedIterations) {
        console.log("Setting iterations from localStorage:", storedIterations);
        setIterations(parseInt(storedIterations));
      }
    } else {
      console.log("User is not logged in");
    }
  }, [user]);

  const handleAcceptLoop = () => {
    console.log("Step 1: Store loop data in localStorage");
    localStorage.setItem("projectType", projectType);
    localStorage.setItem("frequency", JSON.stringify(frequency));
    localStorage.setItem("iterations", iterations);

    console.log("Step 2: Check if user is logged in");
    if (!user) {
      console.log("User not logged in, showing login popup");
      setShowLoginPopUp(true);
      return;
    }

    console.log("Step 3: Validate loop data");
    if (projectType && frequency && iterations > 0) {
      console.log(
        "Creating loop with projectType:",
        projectType,
        "frequency:",
        frequency,
        "iterations:",
        iterations
      );
      const args = {
        projectType,
        startDate: new Date(), // Set start date to today
        numIterations: iterations,
        frequency: frequency,
        name: `${user.username} ${iterations} ${projectType} in ${frequency}`,
      };
      console.log("Step 4: Create loop with args:", args);
      createLoopFn(args);
      console.log("Step 5: Reset form fields");
      setProjectType("");
      setFrequency("");
      setIterations(1);
    } else {
      console.log("Missing fields, showing alert");
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

export default LoopForm;
