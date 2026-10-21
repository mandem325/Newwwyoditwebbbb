import { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardGradients from "./CardGradients";

interface ExperienceItem {
  n: string;
  year: string;
  chapter: string;
  role: string;
  org: string;
  period: string;
  location: string;
  body: string;
  image?: string;
  bullets?: string[];
  tags?: string[];
}

interface ExperienceCoverflowProps {
  items: ExperienceItem[];
  activeIdx: number;
  onChange: (index: number) => void;
}

export default function ExperienceCoverflow({
  items,
  activeIdx,
  onChange,
}: ExperienceCoverflowProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return (
      <div
        className="relative w-full flex flex-col items-center select-none"
        id="experience-coverflow"
        style={{ height: "300px" }}
      />
    );
  }

  const handlePrev = () => {
    if (activeIdx > 0) {
      onChange(activeIdx - 1);
    }
  };

  const handleNext = () => {
    if (activeIdx < items.length - 1) {
      onChange(activeIdx + 1);
    }
  };

  // Drag handler for swipe gesture
  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    const swipeThreshold = 50; // pixels
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <div
      className="relative w-full flex flex-col items-center select-none"
      id="experience-coverflow"
    >
      {/* 3D Stage */}
      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center overflow-visible"
        style={{
          perspective: isMobile ? 800 : 1200,
          height: isMobile ? "190px" : "300px",
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
          {items.map((item, i) => {
            const diff = i - activeIdx;
            const absDiff = Math.abs(diff);

            // Hide cards that are too far away
            if (absDiff > 2) return null;

            // Calculate responsive spacing and parameters
            const xOffsetMultiplier = isMobile ? 100 : 220;
            const zOffsetMultiplier = isMobile ? -100 : -180;
            const rotateYMultiplier = isMobile ? 30 : 40;

            // Positioning and transforms
            const x = diff * xOffsetMultiplier;
            const z = absDiff * zOffsetMultiplier;
            const rotateY = diff * -rotateYMultiplier;
            const scale = 1 - absDiff * (isMobile ? 0.12 : 0.15);
            const opacity = 1 - absDiff * (isMobile ? 0.45 : 0.55);
            const zIndex = 10 - absDiff;
            const blur = absDiff > 0 ? `${absDiff * (isMobile ? 1 : 2)}px` : "0px";

            const isActive = diff === 0;

            return (
              <motion.div
                key={item.role + i}
                style={{
                  position: "absolute",
                  width: isMobile ? "240px" : "400px",
                  height: isMobile ? "150px" : "250px",
                  zIndex,
                  transformOrigin: "center center",
                  cursor: isActive ? "default" : "pointer",
                }}
                animate={{
                  x,
                  z,
                  rotateY,
                  scale,
                  opacity: Math.max(0, opacity),
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                }}
                onClick={() => {
                  if (!isActive) onChange(i);
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="group/card-cover interactive-card rounded-[24px] md:rounded-[32px] overflow-hidden border border-[#ebd5c5]/15 bg-[#0b0806]/30 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                data-cursor={isActive ? "DRAG" : "VIEW"}
              >
                {/* Photo container */}
                <div className="relative w-full h-full">
                  <motion.img
                    src={item.image}
                    alt={item.role}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    animate={{
                      filter: `blur(${blur})`,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <CardGradients />
                  {/* Gradient bottom overlay for active card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 pointer-events-none transition-opacity duration-300 mix-blend-multiply" />

                  {/* Top-right chapter badge */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[9px] font-mono tracking-wider text-[#ebd5c5]/90 uppercase">
                    {item.chapter}
                  </div>

                  {/* Active Card Label Overlay */}
                  <div className="absolute bottom-4 left-6 right-6 flex items-baseline justify-between pointer-events-none">
                    <span className="text-[10px] font-mono tracking-widest text-[#c15c3d] uppercase">
                      {item.year}
                    </span>
                    <span className="text-[10px] font-mono text-[#ebd5c5]/60 uppercase">
                      {item.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-6 mt-4 md:mt-6 z-10">
        <button
          onClick={handlePrev}
          disabled={activeIdx === 0}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
            activeIdx === 0
              ? "border-white/5 text-white/10 cursor-not-allowed"
              : "border-[#ebd5c5]/20 text-[#ebd5c5]/80 hover:border-[#c15c3d] hover:text-white active:scale-95"
          }`}
          aria-label="Previous experience"
          id="experience-prev-btn"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicator dots */}
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => onChange(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIdx ? "w-6 bg-[#c15c3d]" : "w-1.5 bg-[#ebd5c5]/20 hover:bg-[#ebd5c5]/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              id={`experience-dot-${i}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={activeIdx === items.length - 1}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
            activeIdx === items.length - 1
              ? "border-white/5 text-white/10 cursor-not-allowed"
              : "border-[#ebd5c5]/20 text-[#ebd5c5]/80 hover:border-[#c15c3d] hover:text-white active:scale-95"
          }`}
          aria-label="Next experience"
          id="experience-next-btn"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
