import React from "react";

const Steps = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    }}
  >
    <h1>How Does It Work?</h1>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <StepComponent
        heading="Start your Loop"
        text={["Something you will deliver every time period."]}
      />
      <StepComponent
        heading="Deliver Iteration"
        text={["Becasue you know what to do, focus on delivering it."]}
      />
      <StepComponent
        heading="Share your Work"
        text={["Post your Proof of Work."]}
      />
      <StepComponent
        heading="Loop"
        text={["Get feedback early, iterate quickly, and get better."]}
      />
    </div>
  </div>
);

const StepComponent = ({ heading, text }) => (
  <div>
    <h1>{heading}</h1>
    <span>
      {text.map((line, index) => (
        <React.Fragment key={index}>
          <span>{line}</span>
          <br />
        </React.Fragment>
      ))}
    </span>
  </div>
);

export default Steps;
