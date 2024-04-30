import React from "react";

import LoopForm from "./LoopForm";
import LoopList from "./LoopList";

const HomePage = () => {

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        MkaeLoop - Show & Tell.
      </h1>
      <LoopForm />
      <LoopList/>
    </div>
  );
};

export default HomePage;


