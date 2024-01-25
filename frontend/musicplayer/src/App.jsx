// YourComponent.jsx
import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function AudioPlayer({ audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="player-card">
      {/* Your cover image */}
      <img src="https://picsum.photos/300/200" alt="Cover Image" />

      {/* Seek bar */}
      <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />

      {/* Audio element */}
      <audio ref={audioRef} src={audioSrc} />

      {/* Track duration */}
      <div className="track-duration">
        <p>{formatDuration(currentTime)}</p>
        <p>{formatDuration(duration)}</p>
      </div>

      {/* Play/Pause button */}
      <button onClick={handlePlayPause}>
        {isPlaying ? (
          <i className="bi bi-pause-circle-fill"></i>
        ) : (
          <i className="bi bi-play-circle-fill"></i>
        )}
      </button>
    </div>
  );
}

function App() {
  const AUDIO_FILE = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  return (
    <div className="container">
      <AudioPlayer audioSrc={AUDIO_FILE} />
    </div>
  );
}

export default App;
