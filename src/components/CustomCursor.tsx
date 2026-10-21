import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch screens
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".interactive-card") ||
        target.classList.contains("clickable") ||
        target.closest(".swiper-button-next") ||
        target.closest(".swiper-button-prev");

      if (isClickable) {
        setHovered(true);
        // Custom text for specific items
        const closestCard = target.closest(".interactive-card");
        if (closestCard && closestCard.getAttribute("data-cursor")) {
          setText(closestCard.getAttribute("data-cursor") || "");
        } else {
          setText("");
        }
      } else {
        setHovered(false);
        setText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer follow circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-ochre/80 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 1.8 : 1,
          backgroundColor: hovered ? "rgba(193, 92, 61, 0.15)" : "rgba(193, 92, 61, 0)",
          borderColor: hovered ? "rgba(193, 92, 61, 0.4)" : "rgba(193, 92, 61, 0.6)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      >
        {text && (
          <span className="absolute inset-0 flex items-center justify-center text-[6px] uppercase tracking-widest text-[#ebd5c5] font-mono font-black scale-75">
            {text}
          </span>
        )}
      </motion.div>

      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-lime pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 0.4 : 1,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
      />
    </>
  );
}
