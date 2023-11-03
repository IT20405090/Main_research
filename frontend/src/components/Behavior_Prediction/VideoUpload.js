import React, { useState, useEffect, useRef } from 'react';
import RecordRTC from 'recordrtc';
import imageStyle from '../images/babyVideo1.jpg';
import { Link } from 'react-router-dom';
import audio from '../images/audio2.png';
import videorecording from '../images/video4.png';
import upload from '../images/upload.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import './VideoUpload.css'; 


const VideoRecorder = () => {
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);
  const mediaStream = useRef(null);

  const startTimeRef = useRef(null); // To store the start time

  const startRecording = () => {
    const mediaConstraints = { video: true, audio: true };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then((stream) => {
        if (stream) {
          mediaStream.current = stream; // Store the media stream for later use
          videoRef.current.srcObject = stream;
          const rec = RecordRTC(stream, { type: 'video' });
          rec.startRecording();
          setRecorder(rec);
          setIsRecording(true);

          // Capture the start time when recording starts
          startTimeRef.current = new Date();
        } else {
          console.error('Stream is not available.');
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        setIsRecording(false);

        // Calculate duration based on start and end times
        const endTime = new Date();
        const duration = (endTime - startTimeRef.current) / 60000; // Duration in minutes

        // Set the video_file_path to the desired location
        const video_file_path = 'D:/python/ReactResearch/recorded_videos/video.mp4'; // Change to the actual path

        // Send video details to your Flask backend
        const videoDetails = {
          start_time: startTimeRef.current.toISOString(),
          end_time: endTime.toISOString(),
          duration: duration.toFixed(2), // Round to 2 decimal places
          video_file_path,
        };

        // Your existing fetch code for saving video details
        fetch('http://127.0.0.1:5000/save_video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(videoDetails),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error('Error saving video details:', error);
          });

        // Save or handle the recorded video blob as needed
        saveRecordedVideo(blob);

        // Stop the media stream to turn off the camera
        if (mediaStream.current) {
          mediaStream.current.getTracks().forEach((track) => track.stop());
        }
      });
    }
  };

  const saveRecordedVideo = (blob) => {
    // Create an object URL for the recorded video blob
    const videoUrl = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = videoUrl;

    // Set the download attribute with a suggested filename for the video
    downloadLink.download = 'recorded-video.mp4'; // Change the filename as needed

    // Trigger a click event on the download link to start the download
    downloadLink.click();

    // Clean up: Remove the anchor element and revoke the object URL
    URL.revokeObjectURL(videoUrl);
  };

  useEffect(() => {
    videoRef.current.src = videoSrc;
  }, [videoSrc]);

  return (
    <div className='page2-background'>

      <div  className="">
        <center>
            <h1 className='titlevideo'>
              Infant Video Recorder
            </h1>
            </center>
            </div>
            <br/>
            <div className="instructions-container">
            <div className="instructions">
              <h2>How to  Video Recording:</h2>
              <ul>
                <li>Click the "Start Recording" button to begin video recording.</li>
                <li>Interact naturally with your child during recording to capture genuine behavior.</li>
                <li>Ensure the baby's face is in focus and not blurry.</li> 
                <li>Click the "Stop Recording" button to finish recording.</li>
                <li>The video file will be downloaded to your device. If you are using a laptop or computer, check the download folder.</li> 
              </ul>
            </div>
          </div>

          <br/><br/>
          <div className="circular-images-audio">
            <img src={audio} alt="Baby Image 1" className="circular-image-audio" />
            <p className='destext'>Capture precious audio moments of your little one with our audio recording feature. 
              Record baby's giggles, coos, and more.</p>
        
            <img src={videorecording} alt="Baby Image 2" className="circular-image-audio" />
            <p className='destext'>Record high-quality videos to cherish your baby's milestones. 
              Capture those first steps, heartwarming smiles, and all the special moments.</p>
            {/* <img src={upload} alt="Baby Image 2" className="circular-image-audio" /> */}
            {/* <img src={babyImage3"} alt="Baby Image 3" className="circular-image" /> */}
          </div>
         
      <center>
        <br/>
      <div
          id="video-placeholder"
          style={{
            width: '640px', // Adjust the width and height as needed
            height: '480px',
            border: '6px solid #ccc',
            backgroundColor:'#ffd8eb',
            display: isRecording ? 'none' : 'block', // Hide when recording
          }}
        ></div>
      <video ref={videoRef} autoPlay muted style={{ display: isRecording ? 'block' : 'none',width: '800px', height: '600px' }}></video>
     
      </center>
      <br/>
      <div style={{ textAlign: 'center' }}>
        {isRecording ? (
          
          <button
            onClick={stopRecording}
            style={{
              backgroundColor: '#007FFF',
              color: 'white',
              padding: '20px 40px', 
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Stop Recording
          </button>
          
        ) : (
          <button
            onClick={startRecording}
            style={{
              backgroundColor: '#007FFF',
              color: 'white',
              padding: '20px 40px', 
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Start Recording
          </button>
          
        )}

    
        <Link to="/FileUpload">
  <button
    style={{
      backgroundColor: '#007FFF',
      color: 'white',
      padding: '20px 40px', 
      border: 'none',
      borderRadius: '5px',
      marginRight:'20px',
      marginLeft:'40px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }}
  >
    <FontAwesomeIcon icon={faUpload} /> Upload Video
  </button>
</Link>
        <br/>  <br/>  <br/>

        <Link to="/VideoHistory">
  <button
    style={{
      backgroundColor: '#007FFF',
      color: 'white',
      padding: '20px 40px', 
      border: 'none',
      borderRadius: '5px',
      marginRight:'20px',
      marginLeft:'40px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }}
  > Video History
  </button>
</Link>
      </div>
     
         
    </div>
  );
};

export default VideoRecorder;
