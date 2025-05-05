import React, { useState, useEffect } from 'react';
import './YouTubeVideos.css'; // Styling file

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('date'); // Default to 'Latest'

  // Replace with your API key
  const API_KEY = 'AIzaSyA8u1397cSNB4V0SsA-lqbP3B6KgWEOKEA'; // Replace with your Google API key
  const CHANNEL_ID = 'UCE_M8A5yxnLfW0KghEeajjw'; // Apple's YouTube channel ID
  const MAX_RESULTS = 9; // Number of videos to fetch

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        // Fetch videos with selected sorting order
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${MAX_RESULTS}&type=video&order=${sortOption}&key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        
        // Check if items exist in the response
        if (!data.items || data.items.length === 0) {
          throw new Error('No videos found');
        }

        // Update videos state
        setVideos(data.items);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [sortOption]); // Re-run when sortOption changes

  // Handle dropdown change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  if (isLoading) {
    return <div className="youtube-loading">Loading videos...</div>;
  }

  if (error) {
    return <div className="youtube-error">Error: {error}</div>;
  }

  return (
    <section className="youtube-videos-section">
      <h2 className="youtube-videos-title">Latest from Apple</h2>
      <div className="youtube-sort-container">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="youtube-sort-select"
        >
          <option value="date">Latest</option>
          <option value="viewCount">Most Viewed</option>
        </select>
      </div>
      <div className="youtube-videos-grid">
        {videos.map((video) => (
          <div key={video.id.videoId} className="youtube-video-card">
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-video-link"
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="youtube-video-thumbnail"
              />
              <h3 className="youtube-video-title">{video.snippet.title}</h3>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YouTubeVideos;