import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imageStyle from '../images/babyVideo1.jpg';

const guidelineStyle = {
  backgroundColor: 'lightblue',
  padding: '10px',
  borderRadius: '5px',
  width: '1000px',
};

const textStyle = {
  fontWeight: 'bold',
  color: 'darkblue',
};

const liStyle = {
  marginBottom: '10px', // Add margin to create a gap between guidelines
  listStyleType: 'none', // Remove bullets
  textAlign: 'left', // Align text to the left
};
const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-block',
  };
  

const Guidelines = () => {
  const guidelines = [
    "Use a good quality camera or smartphone with a high-resolution camera.",
    "Record in well-lit areas to ensure clear visibility of the baby's face and actions.",
    "Record videos in landscape mode (horizontal) for a wider frame.",
    "Position the camera at an optimal distance to capture the baby's entire body or relevant actions.",
    "Ensure the baby is in focus and not blurry.",
    "Record clear audio to capture any sounds or vocalizations.",
    "Record videos that are at least a few minutes long to capture a variety of baby behaviors.",
    "Interact naturally with the baby, as you typically would, to capture their genuine reactions and behaviors.",
    "Maintain consistent recording conditions over time to enable accurate tracking of changes in the baby's behavior.",
    "Respect the baby's privacy and obtain consent from the appropriate guardians if needed.",
    "Ensure you have enough storage space on your device.",
    "Always prioritize the safety and comfort of the baby during recording.",
    "Note the date, time, and any relevant details about the baby's condition or surroundings during recording.",
    "Provide contact information or resources for technical support or troubleshooting.",
  ];

  const [currentGuidelineIndex, setCurrentGuidelineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentGuidelineIndex < guidelines.length - 1) {
        setCurrentGuidelineIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(timer); // Stop the timer when all guidelines are displayed
      }
    }, 2000); // Change the delay (in milliseconds) between guidelines as needed

    return () => {
      clearInterval(timer); // Cleanup the timer on component unmount
    };
  }, [currentGuidelineIndex]);

  return (
    <div>
      <center>
        <h1>Infant Video Recording Guidelines</h1>
        <img
          src={imageStyle} // Use the imported image
          alt="Guidelines Image"
          width="100%"
          height="40%"
        />
        <div>
          <h2>Tips for Recording your baby on Video</h2>
          {/* Add a button to navigate to the recording page */}
          <Link to="/recording" style={buttonStyle}>
            Start Recording
          </Link>
        </div>
        <ul>
          {guidelines.slice(0, currentGuidelineIndex + 1).map((guideline, index) => (
            <li key={index} style={{ ...guidelineStyle, ...liStyle }}>
              <span style={textStyle}>{guideline}</span>
            </li>
          ))}
           </ul>
      </center>
    </div>
  );
};
export default Guidelines;
