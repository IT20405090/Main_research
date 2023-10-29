import React, { useState } from 'react';
import babyImage from '../images/babyVideo2.jpeg';
import babyImage1 from '../images/babyVideo20.webp';
import babyImage2 from '../images/babyVideo16.avif';
import upload from '../images/upload1.png'
import './InfantBehaviorPrediction.css'; 
import { Link } from 'react-router-dom';



const buttonStyle = {
  backgroundColor: '#007FFF',
  color: 'white',
  marginRight:'20px',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  display: 'inline-block',
  fontWeight: 'bold'
};

function InfantBehaviorPrediction() {
  const [video, setVideo] = useState(null);
  const [videoId, setVideoId] = useState(''); // New state for video ID
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoSize, setVideoSize] = useState('');

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideo(file);

    const videoSizeInBytes = file.size;
    const videoSizeInMB = (videoSizeInBytes / (1024 * 1024)).toFixed(2);
    setVideoSize(videoSizeInMB);

    // Generate a unique video ID (e.g., based on the current timestamp)
    const timestamp = new Date().getTime();
    setVideoId(`video_${timestamp}`);
  };

  const sendVideoForProcessing = async () => {
    if (video) {
      setLoading(true);
      setPrediction(''); // Reset previous predictions

      const formData = new FormData();
      formData.append('video', video);
      formData.append('videoId', videoId); // Include video ID in the request

      try {
        const response = await fetch('http://localhost:5000/process_video', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setPrediction(data.prediction);

          // Additional data to be saved to the database
          const videoDetails = {
            videoId: videoId, // Send the generated video ID to the backend
            result: data.prediction,
            videoSize: videoSize,
            predictionDate: new Date().toISOString(),
          };

          // Send a request to save video details to the database
          await saveVideoDetailsToDatabase(videoDetails);
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

  // Function to save video details to the database
  const saveVideoDetailsToDatabase = async (videoDetails) => {
    try {
      const response = await fetch('http://localhost:5000/save_video_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoDetails),
      });

      if (response.ok) {
        console.log('Video details saved to the database.');
      } else {
        console.error('Error saving video details to the database.');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="page3-background">
        <div  className="titleAnalysis">
          <center>
             <h1 className='titletext'>
            Infant Behavior Analyze
          </h1>
          </center>
          </div>
          <br/>
          <div className="circular-images12">
            <img src={babyImage} alt="Baby Image 1" className="circular-image12" />
            <img src={babyImage1} alt="Baby Image 2" className="circular-image12" />
            <img src={babyImage2} alt="Baby Image 2" className="circular-image12" />
            {/* <img src={babyImage3"} alt="Baby Image 3" className="circular-image" /> */}
          </div>
          <br/>
          <div className="instructions-analysis">
          <div className="instructionA">
            <h2>How to Analyze a Video</h2>
            <ul>
              <li>Select the video file you want to analyze.</li>
              <li>The video file size will be displayed.</li>
              <li>Make sure to upload a video file that is at least 2MB or larger.</li>
              <li>Click the "Upload & Analyze" button to start the video analysis.</li>
              <li>The predicted result will be displayed after analysis is complete.</li>
            </ul>
          </div>
        </div>

        
          <br/>

          <div className='uploadImgae'>
          <img src={upload} alt="Baby Image 2" className="circular-upload" />
          <p className='destextupload'>Easily upload and analyze your recorded videos.
             Our system can help you understand your child's behavior and development.</p>
          </div>
      <center>

        <br/><br/>
      <input
        type="file"
        accept=".mp4, .avi, .webm"
        onChange={handleVideoUpload}
        style={{
          backgroundColor: '#ffd8eb',
          color: 'black',
          padding: '15px 20px',
          borderRadius: '5px',
          width: '550px',
          height: '70px',
        }}
      />
      </center>
      <br />
      <br />
      <center>
      <button
        onClick={sendVideoForProcessing}
        disabled={!video || loading}
        style={buttonStyle}
      >
        Upload & Analyze Video
      </button>


  <Link to="/PredictionHistory">
  <button
    style={buttonStyle}
  >
   Results
  </button>
</Link>
     
      {videoSize && <p>Video Size: {videoSize} MB</p>}
      {loading && <p>Processing...</p>} </center>
      <center>
      {prediction && (
        <div className={prediction === 'Abnormal' ? 'abnormal' : 'normal'}>
          Prediction: {prediction}
        </div>
        
        
      
      )}
      </center>
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
