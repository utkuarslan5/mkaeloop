import React from "react";

import LoopForm from "./components/LoopForm";
import LoopList from "./components/LoopList";

const HomePage = () => {

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        MkaeLoop - Show, then Tell.
      </h1>
      <LoopForm />
      <LoopList/>
    </div>
  );
};

export default HomePage;


// import React from 'react'

// import './style.css'
// import Home from './views/home'
// import NotFound from './views/not-found'

// const LandingPage = () => {
//   return (
//     <div>
//       <Home />
//     </div>
//   )
// }

// export default LandingPage;
