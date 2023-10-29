import React, { useState, useEffect } from "react";
import axios from "axios";
import "./predict.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";

function Predict({ age }) {
  const [prediction, setPrediction] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({
    age: 3,
    height: 30,
    weight: 15,
    gross_motor: "good",
    fine_motor: "good",
    communication: "good",
    problem_solving: "good",
    emotional_dev: "good",
    attention: "good",
    overactivity: "good",
    passivity: "good",
    planning: "good",
    perception: "good",
    perception_vf: "good",
    memory: "good",
    spoken: "good",
    reading: "good",
    social_skills: "good",
    emotional_prob: "good",
  });

  const mapTextToValue = (textValue) => {
    switch (textValue) {
      case "poor":
        return 1;
      case "fair":
        return 2;
      case "good":
        return 3;
      case "excellent":
        return 4;
      default:
        // Handle any unexpected values
        return 0; // You can choose another default value or handle the error accordingly
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = () => {
    // Validate age, weight, and height
    if (formData.age < 0 || formData.weight <= 0 || formData.height <= 0) {
      toast.error("Age, weight, and height must be positive values.", {
        position: "top-center",
        autoClose: 3000, // Close the notification after 3 seconds
      });
      return;
    }

    // Adjust the data format to match what your Flask backend expects
    const adjustedData = {
      age: [formData.age],
      height: [formData.height],
      weight: [formData.weight],
      gross_motor: [mapTextToValue(formData.gross_motor)],
      fine_motor: [mapTextToValue(formData.fine_motor)],
      communication: [mapTextToValue(formData.communication)],
      problem_solving: [mapTextToValue(formData.problem_solving)],
      emotional_dev: [mapTextToValue(formData.emotional_dev)],
      attention: [mapTextToValue(formData.attention)],
      overactivity: [mapTextToValue(formData.overactivity)],
      passivity: [mapTextToValue(formData.passivity)],
      planning: [mapTextToValue(formData.planning)],
      perception: [mapTextToValue(formData.perception)],
      perception_vf: [mapTextToValue(formData.perception_vf)],
      memory: [mapTextToValue(formData.memory)],
      spoken: [mapTextToValue(formData.spoken)],
      reading: [mapTextToValue(formData.reading)],
      social_skills: [mapTextToValue(formData.social_skills)],
      emotional_prob: [formData.emotional_prob === "good" ? 3 : 5], // Adjust as needed
    };

    console.log("Sending request with data:", adjustedData);
    axios
      .post("http://localhost:5000/predict", adjustedData)
      .then((response) => {
        console.log("Response received:", response.data);
        const category = response.data.prediction;

        // Map the category to the appropriate text
        let categoryText = "";
        switch (category) {
          case 1:
            categoryText = "Under Growth";
            break;
          case 2:
            categoryText = "Normal";
            break;
          case 3:
            categoryText = "Over Growth";
            break;
          default:
            categoryText = "Unknown"; // Handle other values if necessary
        }
        setTimeout(() => {
          setPrediction(categoryText);
          setShowPrediction(true);
          setShowConfetti(true); // Set showConfetti to true
        }, 1000); // Adjust the delay as needed
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  };

  return (
    <div className="BackgroundImage">
      <ToastContainer />
      <div className="TopicContainer">
        <center>
          <h1 className="Topic">Child Growth Predictor</h1>
        </center>
      </div>

      <center>
        <div className="input-container">
          <br />
          <div className="row">
          <h1>Step 01:</h1>
          
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          /><img
          src="/images/cloud.gif"
          alt="Child Growth Icon"
          className="image-icon"
        />
        <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
         
         
          </div>
          <div className="InfoTextContainer">
          <p>
            It is important to look and compare weight and height measurements
            to get a full picture of the growth of the child according to the
            age. So, as the first step fill the <b>age, height and weight</b>{" "}
            measurements of the child.
          </p>
        </div>
          <br />
          <h2>
            <label style={{ color: "black" }}>
              Age (use the slider to enter the age):{" "}
              <span className="slider-value"> &nbsp;{formData.age}&nbsp;years</span>
            </label>
          </h2>
          <input
            type="range"
            name="age"
            value={formData.age}
            min="0"
            max="5"
            step="1"
            onChange={handleInputChange}
            className="slider-label"
          />
          <br />
          <div className="input-row">
          <b><label>Height (to the nearest number in centimeters):</label></b>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b><label>Weight (to the nearest number in kilograms):</label></b>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
          </div>
          <br/>
          <div className="row">
          <h1>Step 02:</h1>
          
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          /><img
          src="/images/cloud.gif"
          alt="Child Growth Icon"
          className="image-icon"
        />
        <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
         
          </div>
          <div className="InfoTextContainer">
          <p>
            The milestone checklists may be helpful for parents to be sure that
            a child is growing in healthy ways. But always keep in mind that not
            all children are same, yet every child progresses at their own pace.
          </p>
          </div>
          <div className="column">
            <div className="row">
              <div className="input-container3">
                <h3><u>Physical Development</u></h3>
                <div className="column">
                  <b>
                    <label>Gross Motor Development Status:</label>
                  </b>
                  &nbsp;
                  <i>
                    This refers to the child's ability to control and coordinate
                    large muscle movements, such as crawling, walking, and
                    running. This value can be similar to the value that comes
                    under Physical development milestone under the
                    age-appropriate milestones page in the sidebar.
                  </i>

                  &nbsp;&nbsp;
                  <br />
                  <select
                    name="gross_motor"
                    value={formData.gross_motor}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                </div>

                <div className="column">
                  <label>
                    <b>Fine Motor Development Status:</b>
                  </label>
                  &nbsp;
                  <i>
                    This refers to the child's ability to control and coordinate
                    small muscle movements, such as using their fingers to pick
                    up small objects, hold a pencil, or button clothes. Fine
                    motor skills are essential for activities that require
                    precision and dexterity.
                  </i>
                   <select
                    name="fine_motor"
                    value={formData.fine_motor}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;
              <div className="row">
                <div className="column">
                  <div className="input-container2">
                    <h3><u>Social And Emotional Development</u></h3>
                    <label><b>Emotional Development Status:</b></label>
                    <select
                    name="emotional_dev"
                    value={formData.emotional_dev}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                    <h3><u>Cognitive Development</u></h3>
                    <label><b>How Good At Solving Problems?</b></label>
                    <select
                    name="problem_solving"
                    value={formData.problem_solving}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>

                    <h3><u>Language Development</u></h3>
                    <label><b>How Good At Communication?</b></label>
                    <select
                    name="communication"
                    value={formData.communication}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                </div>
              </div>
              <div className="column"></div>
            </div>
          </div>
          &nbsp;<div className="row">
          <h1>Step 03:</h1>
          
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
          <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          /><img
          src="/images/cloud.gif"
          alt="Child Growth Icon"
          className="image-icon"
        />
        <img
            src="/images/cloud.gif"
            alt="Child Growth Icon"
            className="image-icon"
          />
         
         
          </div>
          <div className="InfoTextContainer">
          <p>
            As the last step, we have some simple questions for you. As you
            observe your child daily, this task might be the easiest for you.
            Children develop new skills and abilities in a steady progression as
            they get older, where every child develops at an individual pace.
            Please answer the questions below as the final step to predict your
            child's growth.
          </p>
          </div>
          <center>
            <div className="input-container4">
              <div className="row">
                <div className="column">
                  <div className="input-pair">
                    <label>Attention And Concentration:</label>
                    <select
                    name="attention"
                    value={formData.attention}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                  &nbsp;
                  <div className="input-pair">
                    <label>Problem Solving:</label>
                    <select
                    name="problem_solving"
                    value={formData.problem_solving}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="column">
                  <div className="input-pair">
                    <label>Overactivity and Impulsivity:</label>
                    <select
                    name="overactivity"
                    value={formData.overactivity}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                  &nbsp;
                  <div className="input-pair">
                    <label>Passivity Or Inactivity:</label>
                    <select
                    name="passivity"
                    value={formData.passivity}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <div className="input-pair">
                    <label>How Organized And Planned?</label>
                    <select
                    name="planning"
                    value={formData.planning}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                  &nbsp;&nbsp;
                  <div className="input-pair">
                    <label>How Good At Perception Of Directions?</label>
                    <select
                    name="perception"
                    value={formData.perception}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                </div>
                &nbsp;&nbsp;
                <div className="column">
                  <div className="input-pair">
                    <label>How Good At Perception Of Visual Figures?</label>
                    <select
                    name="perception_vf"
                    value={formData.perception_vf}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                  &nbsp;
                  <div className="input-pair">
                    <label>How Good Is The Memory?</label>
                    <select
                    name="memory"
                    value={formData.memory}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="column">
                  <div className="input-pair">
                    <label>How About Speaking Skills?</label>
                    <select
                    name="spoken"
                    value={formData.spoken}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                  &nbsp;&nbsp;
                  <div className="input-pair">
                    <label>How Good At Reading Skills?</label>
                    <select
                    name="reading"
                    value={formData.reading}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className="column">
                  <div className="input-pair">
                    <label>Social Skills Status:</label>
                    <select
                    name="social_skills"
                    value={formData.social_skills}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                  </div>
                  &nbsp;
                  &nbsp;
                  <div className="input-pair">
                    <label>Emotional State (Condition):</label>
                    <select
                    name="emotional_prob"
                    value={formData.emotional_prob}
                    onChange={handleInputChange}
                    className="select-input"
                  >
                    <option value="good">Good</option>
                    <option value="bad">Bad</option>
                    
                  </select>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <button onClick={handlePredict} className="predict-button">Predict</button>
          </center>
        </div>
      </center>
     {/* Add emphasis to the prediction */}
      {/* Add emphasis to the prediction */}
      <center className={`predicted-category ${showPrediction ? 'show-prediction' : ''}`}>
        {prediction && (
          <div className="prediction-container">
            <h2>Predicted Growth Category:</h2>
            <p className="predicted-text">{prediction}</p>
          </div>
        )}
      </center>

      {showConfetti && (
        <Confetti
          numberOfPieces={200} // Adjust the number of confetti pieces
          recycle={false} // Whether confetti should be recycled or not
        />
      )}
    </div>
  );
}

export default Predict;
