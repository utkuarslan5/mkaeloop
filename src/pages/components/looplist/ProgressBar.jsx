import { useState, useEffect } from "react";

const ProgressBar = ({ currentIteration }) => {
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(currentIteration));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime <= 0) {
          clearInterval(interval);
          setProgress(0);
          return 0;
        }
        const progressValue =
          (newTime / getRemainingTime(currentIteration)) * 100;
        setProgress(100 - progressValue);
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
              backgroundColor: "#000",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const getRemainingTime = (currentIteration) => {
  const remainingTime =
    currentIteration && currentIteration.endTime
      ? Math.max(0, currentIteration.endTime.getTime() - new Date().getTime())
      : undefined;
  return remainingTime;
};

export default ProgressBar;
