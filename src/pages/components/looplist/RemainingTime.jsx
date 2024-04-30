import React, { useState, useEffect } from "react";

const RemainingTime = ({ remainingTime }) => {
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(remainingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1000;
        setProgress((newTime / remainingTime) * 100);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    if (days > 0) {
      return `${days} days ${hours} hours ${minutes} minutes`;
    } else {
      return `${hours} hours ${minutes} minutes ${seconds} seconds`;
    }
  };

  return (
    <div>
      ⌛Remaining time:{" "}
      {remainingTime !== undefined ? (
        <>
          <div>{formatTime(timeLeft)}</div>
          <div
            style={{
              width: "100%",
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
        </>
      ) : (
        "No incomplete iteration"
      )}
    </div>
  );
};

export default RemainingTime;
