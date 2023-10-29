import React, { useState, useEffect } from 'react';
import './VideoHostory.css';

function formatDateTime(dateTimeString) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return new Date(dateTimeString).toLocaleString('en-US', options);
}

function PredictionHistory() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Fetch prediction history data from the backend when the component mounts
    fetch('http://localhost:5000/prediction_history')
      .then((response) => response.json())
      .then((data) => {
        setHistoryData(data);
      })
      .catch((error) => {
        console.error('Error fetching prediction history:', error);
      });
  }, []);

  return (
    <div className='page12-background'>
      <center>
        <div className="titlevideohis">
          <h1>Prediction History</h1>
        </div>
        {historyData.map((entry, index) => (
          <div key={index} className="predictionVideo">
            {entry.video_id && (
              <div className="video-container">
                <video width="260" controls>
                  <source src={`http://localhost:5000/videos/${entry.video_id}`} type="video/mp4" />
                </video>
              </div>
            )}
            <div className="">
              <h3 style={{ color: '#00008B', fontWeight: 'bold' }}>Your Video ID: {entry.video_id}</h3>
              <p style={{ color: '#00008B', fontWeight: 'bold' }}>
                Predicted Date: {formatDateTime(entry.prediction_date)}
              </p>
              <p style={{ color: '#00008B', fontWeight: 'bold' }}>
                File Size (MB): {entry.video_size}
              </p>
              <p style={{ color: 'red', fontWeight: 'bold' }}>
                Predicted Result: {entry.result}
              </p>
            </div>
          </div>
        ))}
        <style>
          {`
            .video-details-row {
              display: flex;
              margin: 10px;
            }
            .video-container {
              width: 50%;
            }
            .details-container {
              width: 50%;
              padding: 0 20px;
              box-sizing: border-box;
            }
            .details-container h3, .details-container p {
              text-align: left;
              color: #00008B;
              font-weight: bold;
            }
          `}
        </style>
      </center>
    </div>
  );
}

export default PredictionHistory;
