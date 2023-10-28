// Import necessary components and libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Age2Months from "./Components/TwoMonths";
import Age4Months from "./Components/FourMonths";
import Age6Months from "./Components/SixMonths";
import Age9Months from "./Components/NineMonths";
import Age12Months from "./Components/TwelveMonths";
import Age15Months from "./Components/FifteenMonths";
import Age18Months from "./Components/EighteenMonths";
import Age30Months from "./Components/ThirtyMonths";
import Age2Years from "./Components/TwoYears";
import Age3Years from "./Components/ThreeYears";
import Age4Years from "./Components/FourYears";
import Age5Years from "./Components/FiveYears";
import Predict from "./Components/PredictGrowth";
import GrowthGraph from "./Components/Graph";



export default function AppRouter() {
    return (
    <div>
     <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/2months" element={<Age2Months />} />
          <Route path="/4months" element={<Age4Months />} />
          <Route path="/6months" element={<Age6Months />} />
          <Route path="/9months" element={<Age9Months />} />
          <Route path="/12months" element={<Age12Months />} />
          <Route path="/15months" element={<Age15Months />} />
          <Route path="/18months" element={<Age18Months />} />
          <Route path="/30months" element={<Age30Months />} />
          <Route path="/2years" element={<Age2Years />} />
          <Route path="/3years" element={<Age3Years />} />
          <Route path="/4years" element={<Age4Years />} />
          <Route path="/5years" element={<Age5Years />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/graph" element={<GrowthGraph />} />


        </Routes>
    
      </Router>
    </div>
  );
}
