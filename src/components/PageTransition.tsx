import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PageTransition() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // 3 seconds for full animation, then unmount
    const t = setTimeout(() => setIsActive(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto flex flex-col justify-center items-center overflow-hidden">
      {/* Core Background Panels */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1.0 }}
        className="absolute top-0 w-full h-1/2 bg-[#090909] origin-top"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1.0 }}
        className="absolute bottom-0 w-full h-1/2 bg-[#090909] origin-bottom"
      />

      {/* Center Cinematic Opening Line */}
      <div className="w-full h-[1px] absolute top-1/2 -translate-y-1/2 flex justify-center overflow-hidden mix-blend-difference">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%", "100%", "0%"] }}
          transition={{
            duration: 1.5,
            times: [0, 0.4, 0.7, 1],
            ease: [0.76, 0, 0.24, 1],
            delay: 0.6,
          }}
          className="h-full bg-white"
        />
      </div>

      {/* Floating Geometric Reveal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1, 1.3], opacity: [0, 1, 0] }}
        transition={{ duration: 1.4, times: [0, 0.4, 1], ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="absolute z-10 flex items-center justify-center mix-blend-difference"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Diamond Outline */}
          <motion.div
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 180, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="absolute w-12 h-12 border border-white/60 rotate-45"
          />
          {/* Tiny center dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{ duration: 1, times: [0, 0.5, 1], ease: "easeInOut", delay: 0.3 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>

      {/* Noise/Grain texture overlay during transition */}
      <motion.div
        initial={{ opacity: 0.15 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
