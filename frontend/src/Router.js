// Import necessary components and libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import Home from "./components/Growth_Predictor/Home";
import Age2Months from "./components/Growth_Predictor/TwoMonths";
import Age4Months from "./components/Growth_Predictor/FourMonths";
import Age6Months from "./components/Growth_Predictor/SixMonths";
import Age9Months from "./components/Growth_Predictor/NineMonths";
import Age12Months from "./components/Growth_Predictor/TwelveMonths";
import Age15Months from "./components/Growth_Predictor/FifteenMonths";
import Age18Months from "./components/Growth_Predictor/EighteenMonths";
import Age30Months from "./components/Growth_Predictor/ThirtyMonths";
import Age2Years from "./components/Growth_Predictor/TwoYears";
import Age3Years from "./components/Growth_Predictor/ThreeYears";
import Age4Years from "./components/Growth_Predictor/FourYears";
import Age5Years from "./components/Growth_Predictor/FiveYears";
import Predict from "./components/Growth_Predictor/PredictGrowth";
import GrowthGraph from "./components/Growth_Predictor/Graph";


// Disni
import Chatbot from './components/Chatbot_SkinRash/Chatbot';
import ViewChat from './components/Chatbot_SkinRash/ViewChat'; // Import your ViewChat component

import ImageUploadForm from "./components/Chatbot_SkinRash/ImageUplaodForm";
import PredictionResultRashType from "./components/Chatbot_SkinRash/PredictionResultRashType"
import PredictionResultNormalAbnormal from "./components/Chatbot_SkinRash/PredictionResultNormalAbnormal";
import UploadedImagesViewer from "./components/Chatbot_SkinRash/UploadedImagesViewer";


import HomeMain from "./components/Chatbot_SkinRash/HomeMain"


//Anodya

import VideoRecorder from "./components/Behavior_Prediction/VideoUpload"
import InfantBehaviorPrediction from "./components/Behavior_Prediction/InfantBehaviorPrediction"  
import Guidelines from "./components/Behavior_Prediction/Guidelines"    
import VideoHistory from "./components/Behavior_Prediction/VideoHostory"




export default function AppRouter() {
    return (
    <div>
     <Router>

        <Routes>
          <Route path="/home" element={<Home />} />
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

          {/* disni */}
          <Route exact path="/" element={<HomeMain />} />
          <Route path="/upload" element={<ImageUploadForm />} />
          <Route path="/result-rash-type" element={<PredictionResultRashType />} />
          <Route path="/result-normal-abnormal" element={<PredictionResultNormalAbnormal />} />
          <Route path="/view-images" element={<UploadedImagesViewer />} />

          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/viewchat" element={<ViewChat />} />


          {/* Anodya */}
          <Route  path="/abc" element={<Guidelines />} />
          <Route  path="/recording" element={<VideoRecorder />} />
          <Route  path="/FileUpload" element={<InfantBehaviorPrediction />} />  
          <Route  path="/VideoHistory" element={<VideoHistory />} />  

        

        </Routes>
    
      </Router>
      <ToastContainer />
    </div>
  );
}
