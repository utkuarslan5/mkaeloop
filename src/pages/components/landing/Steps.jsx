import React from "react";

const Steps = () => (
  <div className="home-container02">
    <StepComponent
      icon={
        <path d="M634 558q92-64 92-174 0-88-63-151t-151-63-151 63-63 151q0 46 27 96t65 78l36 26v98h172v-98zM512 86q124 0 211 87t87 211q0 156-128 244v98q0 18-12 30t-30 12h-256q-18 0-30-12t-12-30v-98q-128-88-128-244 0-124 87-211t211-87zM384 896v-42h256v42q0 18-12 30t-30 12h-172q-18 0-30-12t-12-30z"></path>
      }
      heading="Set up a Loop"
      text={["e.g. I will mkae 3 songs in 3 weeks"]}
    />
    <StepComponent
      icon={
        <path d="M746 512q26 0 45-18t19-46-19-46-45-18-45 18-19 46 19 46 45 18zM618 342q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zM406 342q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zM278 512q26 0 45-18t19-46-19-46-45-18-45 18-19 46 19 46 45 18zM512 128q158 0 271 100t113 242q0 88-63 150t-151 62h-74q-28 0-46 19t-18 45q0 22 16 42t16 44q0 28-18 46t-46 18q-160 0-272-112t-112-272 112-272 272-112z"></path>
      }
      heading="Start Iterating"
      text={["Every week check-in and", "show your Proof of Work"]}
    />
    <StepComponent
      icon={
        <>
          <path d="M576 736l96 96 320-320-320-320-96 96 224 224z"></path>
          <path d="M448 288l-96-96-320 320 320 320 96-96-224-224z"></path>
        </>
      }
      heading="Receive feedback"
      text={["Get feedback from your accountbalilty", "buddy and community"]}
    />
    <StepComponent
      icon={
        <path d="M512 768v-128l170 170-170 172v-128q-140 0-241-101t-101-241q0-100 54-182l62 62q-30 54-30 120 0 106 75 181t181 75zM512 170q140 0 241 101t101 241q0 100-54 182l-62-62q30-54 30-120 0-106-75-181t-181-75v128l-170-170 170-172v128z"></path>
      }
      heading="Refine and Iterate"
      text={[
        "Develop your personal portfolio",
        "as you iterate your creations",
      ]}
    />
  </div>
);

const StepComponent = ({ icon, heading, text }) => (
  <div className="home-step">
    <div className="home-container03">
      <div className="home-line"></div>
      <div className="home-container04">
        <svg viewBox="0 0 1024 1024" className="home-icon10">
          {icon}
        </svg>
      </div>
      <div className="home-line1"></div>
    </div>
    <div className="home-container05">
      <h1 className="home-text014">{heading}</h1>
      <span className="home-text015">
        {text.map((line, index) => (
          <React.Fragment key={index}>
            <span>{line}</span>
            <br />
          </React.Fragment>
        ))}
      </span>
    </div>
  </div>
);


export default Steps;
