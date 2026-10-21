import React, { useState, useEffect } from "react";
import { subscribeAmbientAudio, toggleAmbientAudio } from "../lib/audioManager";

interface AudioPlayerProps {
  isScrolled?: boolean;
}

export function AudioPlayer({ isScrolled }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return subscribeAmbientAudio((playing) => {
      setIsPlaying(playing);
    });
  }, []);

  return (
    <button
      onClick={toggleAmbientAudio}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white transition-all duration-300 cursor-pointer hover:scale-105 pointer-events-auto"
      aria-label="Toggle background music"
      title={isPlaying ? "Pause background music" : "Play background music"}
    >
      {/* Animated Icon */}
      <div className="flex items-end gap-[2px] h-3">
        <div
          className={`w-[2px] rounded-full transition-all duration-300 ${isPlaying ? "bg-[#FF3B30] animate-music-bar" : "bg-current h-1"}`}
          style={{ animationDuration: "1s", animationDelay: "0.0s" }}
        />
        <div
          className={`w-[2px] rounded-full transition-all duration-300 ${isPlaying ? "bg-[#FF9500] animate-music-bar" : "bg-current h-2"}`}
          style={{ animationDuration: "1.2s", animationDelay: "0.2s" }}
        />
        <div
          className={`w-[2px] rounded-full transition-all duration-300 ${isPlaying ? "bg-[#4CD964] animate-music-bar" : "bg-current h-[2px]"}`}
          style={{ animationDuration: "0.8s", animationDelay: "0.4s" }}
        />
        <div
          className={`w-[2px] rounded-full transition-all duration-300 ${isPlaying ? "bg-[#007AFF] animate-music-bar" : "bg-current h-1.5"}`}
          style={{ animationDuration: "1.1s", animationDelay: "0.1s" }}
        />
      </div>
    </button>
  );
}

export default AudioPlayer;
