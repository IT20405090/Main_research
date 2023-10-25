import React, { useState, useEffect, useRef } from 'react';
import RecordRTC from 'recordrtc';
import imageStyle from '../images/babyVideo1.jpg';
import { Link } from 'react-router-dom';


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
    <div>
      <h1 style={{ textAlign: 'center' }}>Infants Video Recorder</h1>
      <img
          src={imageStyle} // Use the imported image
          alt="Guidelines Image"
          width="100%"
          height="40%"
        />
      <center>
      <video ref={videoRef} autoPlay muted></video>
      </center>
      <div style={{ textAlign: 'center' }}>
        {isRecording ? (
          <button
            onClick={stopRecording}
            style={{
              backgroundColor: 'blue',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Stop Recording
          </button>
        ) : (
          <button
            onClick={startRecording}
            style={{
              backgroundColor: 'blue',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Start Recording
          </button>
        )}

        <br/><br/>
            <Link to="/FileUpload">
            <button
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              >
                Upload Video
              </button>
          </Link>
        
      </div>
    </div>
  );
};

export default VideoRecorder;
