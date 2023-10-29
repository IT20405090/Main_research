// export default Graph;
import React from 'react';
import HWGraph from './HeightWeight';
import './LightGraph.css'; // Create a new CSS file for the light theme
import AgeGrowthGraph from './AgeGrowth';
import PredictionDateGraph from './PredictionDateGraph';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { useNavigate } from 'react-router-dom';


function Graph() {
  const navigate = useNavigate();
  const showDidYouKnowMessage = () => {
    toast.info(
      'You can learn more about BMI to be healthy, It is a value derived from an individual\'s height and weight.'
    );
  };

  const chartRefs = [];

  const destroyAllCharts = () => {
    chartRefs.forEach((chartRef) => {
      if (chartRef?.chartInstance) {
        chartRef.chartInstance.destroy();
      }
    });
    navigate('/');
  };

  return (
    <div className="BackgroundImage">
    <div className="LightApp"> {/* Create a new CSS class for the light theme */}

     <div className="transparent2-container">
    <center><h1 className="LightTopic">Child Growth Graphs</h1>
    <h2 style={{color: 'black'}}>These graphs depict a record of predictions derived from your given input measurements of the baby</h2></center>
  </div>
  &nbsp;
  <div className="LightDidYouKnowContainer">
  <h3 className="DidYouKnowTitle">Did you know?</h3>
  <p className="DidYouKnowText">
    Body Mass Index (BMI) is not a reliable measurement for infants due to several factors. Infants undergo rapid and dynamic growth during their early years, making the BMI's weight-to-height ratio calculation inaccurate for this age group. Growth rates in infants can vary significantly, and there is a broad range of what is considered healthy growth, further complicating the use of BMI. Unlike adults, there is no standardized BMI calculation for infants, making it challenging for healthcare professionals to apply a uniform measurement.
  </p>
  <button onClick={showDidYouKnowMessage} className="DidYouKnowButton">Learn More</button>
</div>


&nbsp;
<center>
 {/* Apply the new class to the parent container */}
  <div className="LightGraphContainer">
    <h4>Representation of Height and Weight</h4>
    <HWGraph ref={(ref) => (chartRefs[0] = ref)} />
  </div>

  <div className="LightGraphContainer">
    <AgeGrowthGraph ref={(ref) => (chartRefs[1] = ref)} />
  </div>

  <div className="LightGraphContainer">
    <PredictionDateGraph ref={(ref) => (chartRefs[2] = ref)} />
  </div>
  </center>
  <button onClick={destroyAllCharts} className="blockButton">Back To Home Page</button>
  <br/>
      <ToastContainer />
    </div>
    </div>
  );
}

export default Graph;
