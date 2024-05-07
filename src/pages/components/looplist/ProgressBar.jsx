import { useState, useEffect } from "react";
import { getRemainingTime } from "./utils.js";

const ProgressBar = ({ currentIteration }) => {
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(currentIteration));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1000;
        const remainingTime = getRemainingTime(currentIteration);
        if (newTime <= 0) {
          clearInterval(interval);
          setProgress(0); // Set progress to 0 when iteration is complete
          return remainingTime; // Set timeLeft to the remaining time for the next iteration
        }
        const progressValue = (newTime / remainingTime) * 100;
        setProgress(progressValue);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIteration]);

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    if (days > 0) {
      return `${days} days ${hours} hours ${minutes} mins`;
    } else {
      return `${hours} hours ${minutes} mins ${seconds} secs`;
    }
  };

  const progressBarColor = progress === 0 ? "#ff0000" : "#000";

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {!isNaN(timeLeft) && <div>{formatTime(timeLeft)}</div>}
      <div style={{ alignItems: "center" }}>
        <div>⌛</div>
        <div
          style={{
            width: "180px",
            height: "15px",
            backgroundColor: "#ddd",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: progressBarColor,
              borderRadius: "4px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
