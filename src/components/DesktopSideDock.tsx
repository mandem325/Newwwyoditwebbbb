import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { getIsDarkMode, applyTheme } from "../lib/theme";
import { subscribeAmbientAudio, toggleAmbientAudio } from "../lib/audioManager";

export function DesktopSideDock() {
  // Live clock
  const [timeStr, setTimeStr] = useState({ time: "08:33", ampm: "PM" });

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return getIsDarkMode();
  });

  // Background Ambient Music state synchronized with the navbar player
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return subscribeAmbientAudio((playing) => {
      setIsPlaying(playing);
    });
  }, []);

  // Keep dark mode state in sync with any external theme triggers
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDark: boolean }>;
      if (typeof customEvent.detail?.isDark === "boolean") {
        setIsDarkMode(customEvent.detail.isDark);
      } else {
        setIsDarkMode(getIsDarkMode());
      }
    };
    window.addEventListener("app-theme-change", handleThemeChange);
    return () => window.removeEventListener("app-theme-change", handleThemeChange);
  }, []);

  // Scroll tracking physics for the dock
  const { scrollYProgress } = useScroll();
  // Moves from top (12vh) down to near bottom (72vh) as user scrolls page
  const yRange = useTransform(scrollYProgress, [0, 1], ["12vh", "72vh"]);
  const smoothY = useSpring(yRange, { stiffness: 140, damping: 24, mass: 0.6 });

  // Clock timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setTimeStr({
        time: `${hours.toString().padStart(2, "0")}:${minutes}`,
        ampm,
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync dark mode class across whole app
  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    applyTheme(nextMode);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP-ONLY SIDE MOVING DOCK (Hidden on mobile/tablet: hidden lg:flex)     */}
      {/* Moves dynamically as user scrolls down the page                            */}
      {/* ========================================================================= */}
      <motion.aside
        style={{ top: smoothY }}
        className="hidden lg:flex fixed right-2 z-[90] flex-col items-center pointer-events-auto select-none"
      >
        {/* Vertical Capsule Pill */}
        <div className="w-[44px] py-2 px-1 bg-[#0c0d12]/92 backdrop-blur-2xl border border-white/15 rounded-full flex flex-col items-center gap-3 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_12px_rgba(0,0,0,0.5)] transition-all duration-300">
          {/* 1. Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 active:scale-90 transition-all duration-200 cursor-pointer relative overflow-hidden"
          >
            <motion.div
              key={isDarkMode ? "dark" : "light"}
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              {isDarkMode ? (
                <Moon className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.85)]" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.85)]" />
              )}
            </motion.div>
          </button>

          {/* Subtle Divider Line */}
          <div className="w-4 h-[1px] bg-white/10 my-0.5" />

          {/* 3. Live Digital Clock */}
          <div className="flex flex-col items-center justify-center text-center select-none pt-0.5">
            <span className="text-[10px] font-bold font-mono tracking-tighter text-white/90 leading-none">
              {timeStr.time}
            </span>
            <span className="text-[8px] font-semibold tracking-wider text-white/50 uppercase mt-0.5 leading-none">
              {timeStr.ampm}
            </span>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default DesktopSideDock;
