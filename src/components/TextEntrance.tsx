import React, { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type EntranceVariant =
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "blur-reveal"
  | "tilt-rise"
  | "clip-unfold"
  | "scale-pop"
  | "rotate-in"
  | "tracking-expand";

interface TextEntranceProps {
  children: ReactNode;
  variant?: EntranceVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const VARIANTS_MAP = {
  "fade-up": {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 },
  },
  "blur-reveal": {
    hidden: { opacity: 0, filter: "blur(10px)", scale: 0.95 },
    visible: { opacity: 1, filter: "blur(0px)", scale: 1 },
  },
  "tilt-rise": {
    hidden: { opacity: 0, rotateX: 25, y: 28 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
  "clip-unfold": {
    hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)", y: 16 },
    visible: { opacity: 1, clipPath: "inset(0% 0 0 0)", y: 0 },
  },
  "scale-pop": {
    hidden: { opacity: 0, scale: 0.88, y: 14 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  "rotate-in": {
    hidden: { opacity: 0, rotate: -3, y: 24 },
    visible: { opacity: 1, rotate: 0, y: 0 },
  },
  "tracking-expand": {
    hidden: { opacity: 0, letterSpacing: "0.15em", y: 20 },
    visible: { opacity: 1, letterSpacing: "inherit", y: 0 },
  },
};

export function TextEntrance({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.85,
  className = "",
  as = "div",
}: TextEntranceProps) {
  const reduce = useReducedMotion();
  const selected = VARIANTS_MAP[variant] || VARIANTS_MAP["fade-up"];

  const Component = (motion[as] || motion.div) as typeof motion.div;

  return (
    <Component
      initial={reduce ? { opacity: 0 } : selected.hidden}
      whileInView={reduce ? { opacity: 1 } : selected.visible}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: reduce ? 0.01 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
