import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicPreloaderProps {
  onComplete?: () => void;
}

// 100% Verified authentic, vibrant gallery photographs of Yodit and her work
// Removed old first frame and removed yellow certificate scans
const VERIFIED_CONTINUOUS_IMAGES = [
  "/gallery/IMG_20260922_185916_101.jpg",
  "/gallery/IMG_20260922_185940_986.jpg",
  "/gallery/IMG_20260922_185951_029.jpg",
  "/gallery/IMG_20260922_185957_259.jpg",
  "/gallery/IMG_20260922_185957_399.jpg",
  "/gallery/56IMG_20260922_190007_832.jpg",
  "/gallery/665IMG_20260922_190007_888.jpg",
  "/gallery/IMG_20260922_190021_107.jpg",
  "/gallery/IMG_20260922_190021_344.jpg",
  "/gallery/123IMG-20260802-WA0004.jpg",
  "/gallery/222IMG_20260922_185916_033.jpg",
  "/gallery/444IMG_20260922_190002_684.jpg",
  "/gallery/IMG_20260922_185844_168.jpg",
  "/gallery/IMG_20260922_185846_438.jpg",
  "/gallery/IMG_20260922_185937_614.jpg",
];

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isHeroLocked, setIsHeroLocked] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [oOrigin, setOOrigin] = useState<{ x: string; y: string }>({
    x: "33.5%",
    y: "56%",
  });

  const wordRef = useRef<HTMLHeadingElement>(null);
  const oRef = useRef<HTMLSpanElement>(null);
  const lockTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevImageRef = useRef<string>(VERIFIED_CONTINUOUS_IMAGES[0]);

  // Build an extended sequence of verified frames
  const frameSequence = useMemo(() => {
    return [
      ...VERIFIED_CONTINUOUS_IMAGES,
      ...VERIFIED_CONTINUOUS_IMAGES.slice(0, 10),
    ];
  }, []);

  const totalFrames = frameSequence.length;

  // Track previous image so text is NEVER left blank or black between frame swaps
  useEffect(() => {
    if (frameSequence[currentStep]) {
      prevImageRef.current = frameSequence[currentStep];
    }
  }, [currentStep, frameSequence]);

  // Measure exact pixel geometry of the letter "O"'s hole relative to the word "Yodit"
  useEffect(() => {
    const measureO = () => {
      if (wordRef.current && oRef.current) {
        const wordRect = wordRef.current.getBoundingClientRect();
        const oRect = oRef.current.getBoundingClientRect();
        if (wordRect.width > 0 && wordRect.height > 0) {
          const centerX = oRect.left + oRect.width * 0.5;
          const centerY = oRect.top + oRect.height * 0.53; // center of the counter/hole in 'o'
          const pctX = ((centerX - wordRect.left) / wordRect.width) * 100;
          const pctY = ((centerY - wordRect.top) / wordRect.height) * 100;
          setOOrigin({
            x: `${pctX.toFixed(2)}%`,
            y: `${pctY.toFixed(2)}%`,
          });
        }
      }
    };

    measureO();
    const t = setTimeout(measureO, 50);
    window.addEventListener("resize", measureO);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measureO);
    };
  }, []);

  // Pre-cache all verified images into browser memory immediately
  useEffect(() => {
    VERIFIED_CONTINUOUS_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.decode) {
        img.decode().catch(() => {});
      }
    });
  }, []);

  // Frame sequencer: ~140ms per frame
  useEffect(() => {
    if (isHeroLocked || isZooming || isDone) return;

    const FRAME_RATE_MS = 140;
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < totalFrames - 1) {
          return prev + 1;
        }
        clearInterval(timer);
        setIsHeroLocked(true);
        return prev;
      });
    }, FRAME_RATE_MS);

    return () => clearInterval(timer);
  }, [totalFrames, isHeroLocked, isZooming, isDone]);

  // When cycling completes: brief 200ms hold on final gallery frame, then start seamless zoom reveal through "O"
  useEffect(() => {
    if (isHeroLocked && !isZooming && !isDone) {
      lockTimerRef.current = setTimeout(() => {
        setIsZooming(true);

        // Preloader completes right as zoom punches through the camera (850ms)
        // No dead black pause!
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 850);
      }, 200);
    }

    return () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, [isHeroLocked, isZooming, isDone, onComplete]);

  // Instant skip via ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDone(true);
        if (onComplete) onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  if (isDone) return null;

  const activeImage = frameSequence[currentStep] || frameSequence[0];
  const fallbackImage = prevImageRef.current || activeImage;

  return (
    <AnimatePresence>
      <motion.div
        key="continuous-preloader-canvas"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-0 w-screen h-screen z-[99999] pointer-events-auto select-none overflow-hidden bg-black flex items-center justify-center m-0 p-0"
        style={{ contain: "strict" }}
      >
        {/* Word container with transform-origin locked inside the hole of the letter "O" */}
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-20 m-0 p-0"
          style={{ contain: "strict" }}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={
              isZooming
                ? {
                    scale: 60, // Smooth exponential zoom-through into the hole of "O"
                    opacity: [1, 1, 0.85, 0],
                  }
                : {
                    scale: 1,
                    opacity: 1,
                  }
            }
            transition={
              isZooming
                ? {
                    duration: 0.85,
                    ease: [0.76, 0, 0.24, 1],
                  }
                : { duration: 0 }
            }
            className="flex items-center justify-center m-0 p-0 will-change-transform"
            style={{
              transformOrigin: `${oOrigin.x} ${oOrigin.y}`,
              contain: "layout paint",
            }}
          >
            {/* Two-layer ping-pong buffered text:
                - The under-layer always holds the fallback image
                - The active layer sits directly above with the current image
                - Zero black gaps, zero missing frames, zero yellow background */}
            <div className="relative flex items-center justify-center m-0 p-0">
              {/* Stable Under-Layer */}
              <h1
                aria-hidden="true"
                className="absolute inset-0 text-8xl sm:text-[150px] md:text-[200px] lg:text-[260px] xl:text-[320px] 2xl:text-[380px] font-black tracking-tight select-none text-center m-0 p-0 pointer-events-none"
                style={{
                  fontFamily:
                    "'Playfair Display', 'Cormorant Garamond', 'Bodoni Moda', Georgia, serif",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  backgroundColor: "transparent",
                  backgroundImage: `url(${fallbackImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  filter: "contrast(130%) brightness(108%)",
                }}
              >
                <span>Y</span>
                <span>o</span>
                <span>d</span>
                <span>i</span>
                <span>t</span>
              </h1>

              {/* Main Active Layer */}
              <h1
                ref={wordRef}
                className="relative text-8xl sm:text-[150px] md:text-[200px] lg:text-[260px] xl:text-[320px] 2xl:text-[380px] font-black tracking-tight select-none text-center m-0 p-0"
                style={{
                  fontFamily:
                    "'Playfair Display', 'Cormorant Garamond', 'Bodoni Moda', Georgia, serif",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  backgroundColor: "transparent",
                  backgroundImage: `url(${activeImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  filter: "contrast(130%) brightness(108%)",
                  contain: "layout paint",
                }}
              >
                <span className="inline-block">Y</span>
                <span ref={oRef} className="inline-block">
                  o
                </span>
                <span className="inline-block">d</span>
                <span className="inline-block">i</span>
                <span className="inline-block">t</span>
              </h1>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CinematicPreloader;
