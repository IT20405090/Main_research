
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import babyImage from '../images/babyVideo11.jpg';
import babyImage2 from '../images/babyVideo12.jpg';
import babyImage1 from '../images/babyVideo9.jpg';
import './Guidelines.css'; // Import the CSS file



const Guidelines = () => {

  const buttonStyle = {
    backgroundColor: '#007FFF',
    color: 'white',
    marginRight:'20px',
    fontSize:'12px',
    padding: '5px 10px',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: 'bold'
  };


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
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [currentGuidelineIndex]);

  return (
    <div className="page-background">
        <div>
          <center>
            <div  className="">
            <h1 className='titleGuidlines'>
              Infant Video Recording Guidelines
            </h1>
            </div>
    
        <div className="circular-images">
            <img src={babyImage} alt="Baby Image 1" className="circular-image" />
            <img src={babyImage1} alt="Baby Image 2" className="circular-image" />
            <img src={babyImage2} alt="Baby Image 2" className="circular-image" />
            {/* <img src={babyImage3"} alt="Baby Image 3" className="circular-image" /> */}
          </div>
        </center>

        <br/><br/>
     
          <div className="guidelines-container">
          <center>
            <h2>Tips for Recording your baby on Video</h2>
            <ul>
              {guidelines.slice(0, currentGuidelineIndex + 1).map((guideline, index) => (
                <li key={index} className="list-item">
                  {guideline}
                </li>
              ))}
            </ul>
            </center>
            <center style={buttonStyle}>
                  <Link to="/recording" className="button">
                    
                  <i className="fas fa-camera"></i> Record Video
                    
                </Link>
                <br/><br/>
            </center>
          </div>
        </div>
      

      </div>
  
  
  );
};

export default Guidelines;

