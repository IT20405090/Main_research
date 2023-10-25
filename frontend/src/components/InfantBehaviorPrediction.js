import React, { useState } from 'react';
import imageStyle from '../images/babyVideo1.jpg';
import { Link } from 'react-router-dom';

const buttonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  display: 'inline-block',
};

function InfantBehaviorPrediction() {
  const [video, setVideo] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoSize, setVideoSize] = useState('')

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideo(file);

    const videoSizeInBytes = file.size;
    const videoSizeInMB = (videoSizeInBytes / (1024 * 1024)).toFixed(2);
    setVideoSize(videoSizeInMB); // Set the video size in MB
  };

  const sendVideoForProcessing = async () => {
    if (video) {
      setLoading(true);
      setPrediction(''); // Reset previous predictions

      const formData = new FormData();
      formData.append('video', video);

      try {
        const response = await fetch('http://localhost:5000/process_video', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setPrediction(data.prediction);
        } else {
          console.error('Error processing video.');
        }
      } catch (error) {
        console.error('Network error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <h1>Infant Behavior Prediction</h1>
      <img
          src={imageStyle} // Use the imported image
          alt="Guidelines Image"
          width="100%"
          height="40%"
        />
      <input type="file" accept=".mp4, .avi, .webm" onChange={handleVideoUpload} 
     
      style={{
      backgroundColor: '#B9D9EB', 
      color: 'black', 
      padding: '15px 20px', 
      borderRadius: '5px', 
      width:'500px',
      height:'70px'
  }} />
  <br/><br/>
      <button
        onClick={sendVideoForProcessing}
        disabled={!video || loading} // Disable the button when video is not selected or during processing
        style={buttonStyle} // Apply the buttonStyle
      >
        Upload & Analyze Video
    </button>
    {videoSize && (
      <p>Video Size: {videoSize} MB</p>
    )}
      {loading && <p>Processing...</p>}
    {prediction && (
      <div className={prediction === 'Abnormal' ? 'abnormal' : 'normal'}>
        Prediction: {prediction}
      </div>
    )}
      <style>
        {`
          .container {
            text-align: center;
          }
          .abnormal {
            color: white;
            background-color: red;
            padding: 10px;
            border-radius: 10px;
          }
          .normal {
            color: white;
            background-color: blue;
            padding: 10px;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
}

export default InfantBehaviorPrediction;
