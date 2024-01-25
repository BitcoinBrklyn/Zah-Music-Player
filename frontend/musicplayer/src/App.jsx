// YourComponent.jsx
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./App.css";
import { Button } from "react-bootstrap";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    audioRef.current.src = fileUrl;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setSelectedFile(file);
  };

  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      // Cleanup: remove the event listener when the component is unmounted
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []); // Empty dependency array to run this effect only once on mount

  return (
    <div className="player-card">
      {/* Your cover image */}
      <img src="https://picsum.photos/300/200" alt="Cover Image" />

      {/* Seek bar */}
      <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} />

      {/* Audio element */}
      <audio ref={audioRef} />

      {/* Display file name if a file is selected */}
      {selectedFile && <p>{selectedFile.name}</p>}

      {/* File input for selecting local music */}
      {!selectedFile && <input type="file" accept="audio/*" onChange={handleFileChange} />}

      {/* Track duration */}
      <div className="track-duration">
        <p>{formatDuration(currentTime)}</p>
        <p>{formatDuration(duration)}</p>
      </div>

      {/* Play/Pause button */}
      <Button variant="success" size="lg" onClick={handlePlayPause}>
        {isPlaying ? <i className="bi bi-pause"></i> : <i className="bi bi-play-fill"></i>}
        <span className="visually-hidden">Play</span> {/* Accessible text for screen readers */}
      </Button>
    </div>
  );
}

export default AudioPlayer;
