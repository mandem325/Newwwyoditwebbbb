import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  cursorText?: string;
  id?: string;
  onClick?: () => void;
  disableFloat?: boolean;
}

import CardGradients from "./CardGradients";

export default function InteractiveCard({
  children,
  className = "",
  cursorText,
  id,
  onClick,
  disableFloat = false,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || disableFloat || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse position from card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);

    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: reduce || disableFloat ? 0 : rotateX,
        rotateY: reduce || disableFloat ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isHovered && !reduce && !disableFloat ? 1.01 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`interactive-card relative overflow-hidden transition-all duration-500 backdrop-blur-2xl border ${
        isHovered
          ? "shadow-[0_20px_50px_rgba(255,255,255,0.45),0_15px_35px_rgba(0,0,0,0.04)] border-white/50"
          : "shadow-[0_8px_32px_rgba(0,0,0,0.02)] border-white/25"
      } ${className}`}
      data-cursor={cursorText}
    >
      <CardGradients />

      {/* Glow highlight */}
      {!reduce && !disableFloat && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-inherit opacity-100 transition duration-300 z-0"
          style={{
            background: `radial-gradient(350px circle at ${glowPos.x}px ${glowPos.y}px, rgba(193,92,61,0.15), transparent 80%)`,
          }}
        />
      )}
      <div
        className="relative z-10 w-full h-full"
        style={{
          transform: isHovered && !reduce && !disableFloat ? "translateZ(10px)" : "translateZ(0px)",
          transition: "transform 0.3s ease",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
