import React from "react";
import { motion } from "framer-motion";

export function TitleTextAnimation({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={`group flex ${className}`}
      style={{ perspective: 1000 }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block relative transition-all duration-500 ease-out"
          style={{
            transitionDelay: `${i * 0.03}s`,
            transformStyle: "preserve-3d",
            marginRight: char === " " ? "0.2em" : "0",
          }}
        >
          {/* Main letter */}
          <span
            className="flip-distort-1 inline-block transition-transform duration-500 ease-out"
            style={{
              transitionDelay: `${i * 0.03}s`,
              transformOrigin: "50% 50%",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>

          {/* 3D Flip and Distorted letter */}
          <span
            className="flip-distort-2 absolute top-0 left-0 inline-block opacity-0 transition-all duration-500 ease-out text-[#c15c3d]"
            style={{
              transitionDelay: `${i * 0.03}s`,
              transformOrigin: "50% 50%",
              transform: "rotateX(-180deg) scale(0.5) skewX(20deg)",
              filter: "blur(4px)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </motion.span>
  );
}
