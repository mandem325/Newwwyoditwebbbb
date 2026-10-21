import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TestTransition() {
  const [animStage, setAnimStage] = useState("enter");
  useEffect(() => {
    setTimeout(() => setAnimStage("exit"), 2000);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      <svg
        viewBox="0 0 1080 1080"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full text-blue-900"
      >
        <motion.path
          d="M66.858-19C57.597 196.452 127.164 482.585 206.5 464.5c125.428-28.592 52.293-293.51 200.001-339 568.234-175-241.425 712.6 15.5 803.02C645 1007 629.398 499 810.5 499c113.398 0 106.54 189.465 164.235 429.52 48.005 199.72 89.415 213.09 105.265 173.78"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, pathOffset: 0, strokeWidth: "8%" }}
          animate={
            animStage === "enter"
              ? {
                  pathLength: [0, 0, 1, 1],
                  strokeWidth: ["8%", "8%", "8%", "70%"],
                }
              : {
                  pathLength: [1, 1, 0, 0],
                  pathOffset: [0, 0, 1, 1],
                  strokeWidth: ["70%", "70%", "8%", "8%"],
                }
          }
          transition={{
            duration: 1.25,
            times: [0, 0.15, 0.9, 1],
            ease: "circOut",
          }}
        />
      </svg>
    </div>
  );
}
