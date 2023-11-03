import React, { useState, useEffect } from 'react';
import './VideoHostory.css'; // Adjust the CSS file path
import videoHistory from '../images/videoHistory.png';

function VideoHostory() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an HTTP request to fetch video details from the API
    fetch('http://localhost:5000/get_videos') // Adjust the URL as needed
      .then((response) => response.json())
      .then((data) => {
        // Format the date and time
        const formattedVideos = data.map((video, index) => {
          return {
            ...video,
            index: index, // Add the index property
            start_time: formatDateTime(video.start_time),
            end_time: formatDateTime(video.end_time),
          };
        });

        setVideos(formattedVideos);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching video history:', error);
        setLoading(false);
      });
  }, []);

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options);
  };

  const handleDeleteVideo = (index) => {
    // Retrieve the video based on the index
    const videoToDelete = videos[index];
    
    // Make an HTTP request to delete the video by its index
    fetch(`http://localhost:5000/delete_video/${index}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Video deleted successfully") {
          // Update the video list by removing the deleted video
          setVideos((prevVideos) => prevVideos.filter((video, idx) => idx !== index));
           // Reload the page
          window.location.reload();
        } else {
          console.error('Error deleting video:', data.message);
           // Reload the page
        window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error deleting video:', error);
         // Reload the page
         window.location.reload();
      });
  };
  
  return (
    <div className='page12-background'>
      <div className="">
        <h1 className="titlevideohis">Video Recording History</h1>
      </div>

      <div className="circular-imagesvhistory">
        <img src={videoHistory} alt="Baby Image 1" className="circular-imagevhistory" />
        <p className="historytext">
          This is where you can revisit and relive those precious moments you've captured with your little one.
          Our video recording history feature allows you to access and manage all the videos you've recorded.
        </p>
      </div>
      {loading && <p>Loading video history...</p>}
      {!loading && videos.length === 0 && <p>No videos available in history.</p>}
      {!loading && videos.length > 0 && (
        <div className="video-list">
          {videos.map((video, index) => (
            <div key={index} className="video-entry">
              <video controls width="250" src={video.video_file_path}></video>
              <div className="video-details">
                <p style={{ color: 'darkblue', fontWeight: 'bold' }}>Start Time: {video.start_time}</p>
                <p style={{ color: 'darkblue', fontWeight: 'bold' }}>End Time: {video.end_time}</p>
                <p style={{ color: 'darkblue', fontWeight: 'bold' }}>Duration (minutes): {video.duration}</p>
                <button
                  onClick={() => handleDeleteVideo(index)}
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    width: '200px',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    marginTop: '10px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoHostory;
