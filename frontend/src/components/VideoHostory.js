import React, { useState, useEffect } from 'react';

function VideoHistory() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an HTTP request to fetch video details from the API
    fetch('http://localhost:5000/get_videos') // Adjust the URL as needed
      .then((response) => response.json())
      .then((data) => {
        // Format the date and time
        const formattedVideos = data.map((video) => {
          return {
            ...video,
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

  // Function to group videos into rows
  const groupVideosIntoRows = (videos, videosPerRow) => {
    const rows = [];
    for (let i = 0; i < videos.length; i += videosPerRow) {
      rows.push(videos.slice(i, i + videosPerRow));
    }
    return rows;
  };

  return (
    <center>
      <div className="container">
        <h2>Recorded Video History</h2>
        {loading && <p>Loading video history...</p>}
        {!loading && videos.length === 0 && <p>No videos available in history.</p>}
        {!loading && videos.length > 0 && (
          <div>
            <table>
              <thead>
                <tr>
                  
                </tr>
              </thead>
              <tbody>
                {groupVideosIntoRows(videos, 3).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((video, index) => (
                      <td key={index}>
                        {/* <h3>Video Recording {index + 1}</h3> */}
                        <video
                          controls
                          width="320"
                          src={video.video_file_path} // Set the video source to the file path
                        ></video>
                        <p>Start Time: {video.start_time}</p>
                        <p>End Time: {video.end_time}</p>
                        <p>Duration (minutes): {video.duration}</p>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </center>
  );
}

export default VideoHistory;
