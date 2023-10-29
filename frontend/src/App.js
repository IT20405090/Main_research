import React, { Profiler, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import VideoRecorder from "./components/VideoUpload"
import InfantBehaviorPrediction from "./components/InfantBehaviorPrediction"  
import Guidelines from "./components/Guidelines"    
import VideoHistory from "./components/VideoHostory"

export default function App() {
  return (
    <div>
      <Router>
    
        <Routes>
          <Route  exact path="/" element={<Guidelines />} />
          <Route  path="/recording" element={<VideoRecorder />} />
          <Route  path="/FileUpload" element={<InfantBehaviorPrediction />} />  
          <Route  path="/VideoHistory" element={<VideoHistory />} />  
         
         
         



            
           

          
        </Routes>
    
      </Router>
    </div>
  );
}


//disni and ramons changes
// import React from "react";
// import "./App.css";
// import Router from "./Router";


// export default function App() {
// 	return (
// 			<div className="App">
// 				<Router/>
// 			</div>
// 	);
// }
