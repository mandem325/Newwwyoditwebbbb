import { motion } from "framer-motion";
import { ReactNode, forwardRef, useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "@tanstack/react-router";
import { PageTransitionContext } from "./PageTransitionContext";

const ease = [0.83, 0, 0.17, 1]; // Premium cubic-bezier
const slowEase = [0.76, 0, 0.24, 1]; // Classic Awwwards easing

interface Props {
  children: ReactNode;
  type?: string;
  className?: string;
  overlayColor?: string;
}

const getCloseDuration = (transitionType: string) => {
  switch (transitionType) {
    case "cinematic-pan":
      return 950;
    case "glass-layers":
    case "sweep-right":
    case "glitch":
      return 850;
    case "doors":
    case "stairs":
    case "diagonal":
    case "wave":
    case "split-tilt":
      return 900;
    case "curtain":
    case "studio-curtain":
    case "blinds":
    case "dome-reveal":
    case "iris":
    default:
      return 950;
  }
};

export const AwardWinningTransition = forwardRef<HTMLDivElement, Props>(
  ({ children, type = "curtain", className, overlayColor }, ref) => {
    const [overlayActive, setOverlayActive] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    const isClosingRef = useRef(false);
    const targetHrefRef = useRef<string | null>(null);
    const router = useRouter();

    // Default overlay color if not explicitly provided
    const color = overlayColor || "#0a0a0d";

    const handleOpeningComplete = () => {
      setOverlayActive(false);
    };

    const handleCloseComplete = useCallback(() => {
      if (targetHrefRef.current) {
        const dest = targetHrefRef.current;
        targetHrefRef.current = null;
        try {
          (router.navigate as (opts: { to: string }) => Promise<void>)({ to: dest });
        } catch {
          window.location.href = dest;
        }
      }
    }, [router]);

    const startCloseTransition = useCallback(
      (href: string) => {
        if (isClosingRef.current) return;
        isClosingRef.current = true;
        targetHrefRef.current = href;
        setIsClosing(true);

        const dur = getCloseDuration(type);
        setTimeout(() => {
          handleCloseComplete();
        }, dur + 100);
      },
      [type, handleCloseComplete],
    );

    // Intercept clicks on links across the page to play closing animation first
    useEffect(() => {
      const handleCaptureClick = (e: MouseEvent) => {
        if (isClosingRef.current) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const link = (e.target as HTMLElement).closest("a");
        if (!link) return;

        const href = link.getAttribute("href");
        if (!href) return;

        // Skip non-navigational links
        if (
          link.target === "_blank" ||
          href.startsWith("http://") ||
          href.startsWith("https://") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.startsWith("#") ||
          href.startsWith("javascript:") ||
          href.endsWith(".pdf") ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.altKey
        ) {
          return;
        }

        const currentPath = window.location.pathname;
        const cleanHref = href.split("?")[0].split("#")[0];
        const cleanCurrent = currentPath.split("?")[0].split("#")[0];

        // If clicking link to current page, do nothing
        if (
          cleanHref === cleanCurrent ||
          cleanHref === cleanCurrent + "/" ||
          cleanHref + "/" === cleanCurrent
        ) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        startCloseTransition(href);
      };

      window.addEventListener("click", handleCaptureClick, true);
      return () => {
        window.removeEventListener("click", handleCaptureClick, true);
      };
    }, [startCloseTransition]);

    // ==========================================
    // 1. OPENING OVERLAYS (Page Entrance)
    // ==========================================
    const renderOpeningOverlay = () => {
      if (!overlayActive) return null;

      switch (type) {
        case "blinds":
          return (
            <div className="fixed inset-0 z-[9999] pointer-events-none flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-full flex-1"
                  style={{ backgroundColor: color, transformOrigin: "top" }}
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 0.9, ease, delay: i * 0.08 }}
                  onAnimationComplete={i === 4 ? handleOpeningComplete : undefined}
                />
              ))}
            </div>
          );

        case "curtain":
          return (
            <div className="fixed inset-0 z-[9999] pointer-events-none flex">
              <motion.div
                className="w-1/2 h-full"
                style={{ backgroundColor: color }}
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 1.0, ease: slowEase }}
              />
              <motion.div
                className="w-1/2 h-full"
                style={{ backgroundColor: color }}
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.0, ease: slowEase }}
                onAnimationComplete={handleOpeningComplete}
              />
            </div>
          );

        case "studio-curtain":
          return (
            <div className="fixed inset-0 z-[9999] pointer-events-none flex">
              <motion.div
                className="w-1/2 h-full bg-[#c15c3d]"
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 1.05, ease: slowEase }}
              />
              <motion.div
                className="w-1/2 h-full bg-[#111111] border-l border-[#c15c3d]/20"
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.05, ease: slowEase }}
                onAnimationComplete={handleOpeningComplete}
              />
            </div>
          );

        case "doors":
          return (
            <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
              <motion.div
                className="w-full h-1/2"
                style={{ backgroundColor: color }}
                initial={{ y: "0%" }}
                animate={{ y: "-100%" }}
                transition={{ duration: 0.95, ease: slowEase }}
              />
              <motion.div
                className="w-full h-1/2"
                style={{ backgroundColor: color }}
                initial={{ y: "0%" }}
                animate={{ y: "100%" }}
                transition={{ duration: 0.95, ease: slowEase }}
                onAnimationComplete={handleOpeningComplete}
              />
            </div>
          );

        case "sweep-right":
          return (
            <motion.div
              className="fixed inset-0 z-[9999] pointer-events-none"
              style={{ backgroundColor: color }}
              initial={{ x: "0%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.9, ease }}
              onAnimationComplete={handleOpeningComplete}
            />
          );

        case "stairs":
          return (
            <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-full flex-1"
                  style={{ backgroundColor: color }}
                  initial={{ x: "0%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                  onAnimationComplete={i === 4 ? handleOpeningComplete : undefined}
                />
              ))}
            </div>
          );

        case "diagonal":
          return (
            <motion.div
              className="fixed inset-0 z-[9999] pointer-events-none"
              style={{ backgroundColor: color }}
              initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              animate={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
              transition={{ duration: 0.95, ease: slowEase }}
              onAnimationComplete={handleOpeningComplete}
            />
          );

        case "wave":
          return (
            <div className="fixed inset-0 z-[9999] pointer-events-none flex">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-full flex-1"
                  style={{ backgroundColor: color }}
                  initial={{ y: "0%" }}
                  animate={{ y: "-100%" }}
                  transition={{
                    duration: 0.85,
                    ease: slowEase,
                    delay: Math.sin(i * 0.4) * 0.15,
                  }}
                  onAnimationComplete={i === 7 ? handleOpeningComplete : undefined}
                />
              ))}
            </div>
          );

        case "iris":
          return (
            <motion.div
              className="fixed inset-0 z-[9999] pointer-events-none"
              style={{ backgroundColor: color }}
              initial={{ clipPath: "circle(150% at 50% 50%)" }}
              animate={{ clipPath: "circle(0% at 50% 50%)" }}
              transition={{ duration: 1.0, ease: slowEase }}
              onAnimationComplete={handleOpeningComplete}
            />
          );

        case "dome-reveal":
          return (
            <motion.div
              className="fixed inset-0 z-[9999] pointer-events-none"
              style={{ backgroundColor: color }}
              initial={{ clipPath: "ellipse(150% 150% at 50% 100%)" }}
              animate={{ clipPath: "ellipse(0% 0% at 50% 100%)" }}
              transition={{ duration: 1.0, ease: slowEase }}
              onAnimationComplete={handleOpeningComplete}
            />
          );

        case "split-tilt":
          return (
            <div className="fixed inset-0 z-[9999] pointer-events-none flex overflow-hidden">
              <motion.div
                className="w-1/2 h-full"
                style={{ backgroundColor: color, transformOrigin: "left center" }}
                initial={{ x: "0%", rotateY: 0 }}
                animate={{ x: "-100%", rotateY: -20 }}
                transition={{ duration: 0.95, ease: slowEase }}
              />
              <motion.div
                className="w-1/2 h-full"
                style={{ backgroundColor: color, transformOrigin: "right center" }}
                initial={{ x: "0%", rotateY: 0 }}
                animate={{ x: "100%", rotateY: 20 }}
                transition={{ duration: 0.95, ease: slowEase }}
                onAnimationComplete={handleOpeningComplete}
              />
            </div>
          );

        case "glass-layers":
          return (
            <div className="fixed inset-0 z-[9999] pointer-events-none">
              <motion.div
                className="absolute inset-0 backdrop-blur-md"
                style={{ backgroundColor: `${color}88` }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.9, ease }}
              />
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: color }}
                initial={{ y: "0%" }}
                animate={{ y: "-100%" }}
                transition={{ duration: 0.85, ease: slowEase }}
                onAnimationComplete={handleOpeningComplete}
              />
            </div>
          );

        case "cinematic-pan":
          return (
            <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-[#0d0d10]"
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 0.85, ease: slowEase }}
              />
              <motion.div
                className="absolute inset-0 bg-[#c15c3d]"
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 0.85, ease: slowEase, delay: 0.08 }}
                onAnimationComplete={handleOpeningComplete}
              />
            </div>
          );

        case "glitch":
          return (
            <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-full flex-1"
                  style={{ backgroundColor: color }}
                  initial={{ x: "0%" }}
                  animate={{ x: i % 2 === 0 ? "100%" : "-100%" }}
                  transition={{ duration: 0.8, ease, delay: (i % 3) * 0.07 }}
                  onAnimationComplete={i === 5 ? handleOpeningComplete : undefined}
                />
              ))}
            </div>
          );

        default:
          return null;
      }
    };

    // ==========================================
    // 2. CLOSING OVERLAYS (Page Exit)
    // Exactly matches each respective opening animation
    // Absolutely NO text on it
    // ==========================================
    const renderClosingOverlay = () => {
      switch (type) {
        case "blinds":
          return (
            <div className="fixed inset-0 z-[99999] pointer-events-auto flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-full flex-1"
                  style={{ backgroundColor: color, transformOrigin: "bottom" }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.85, ease, delay: i * 0.08 }}
                  onAnimationComplete={i === 4 ? handleCloseComplete : undefined}
                />
              ))}
            </div>
          );

        case "curtain":
          return (
            <div className="fixed inset-0 z-[99999] pointer-events-auto flex">
              <motion.div
                className="w-1/2 h-full"
                style={{ backgroundColor: color }}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.95, ease: slowEase }}
              />
              <motion.div
                className="w-1/2 h-full"
                style={{ backgroundColor: color }}
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.95, ease: slowEase }}
                onAnimationComplete={handleCloseComplete}
              />
            </div>
          );

        case "studio-curtain":
          return (
            <div className="fixed inset-0 z-[99999] pointer-events-auto flex">
              <motion.div
                className="w-1/2 h-full bg-[#c15c3d]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.95, ease: slowEase }}
              />
              <motion.div
                className="w-1/2 h-full bg-[#111111] border-l border-[#c15c3d]/20"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.95, ease: slowEase }}
                onAnimationComplete={handleCloseComplete}
              />
            </div>
          );

        case "doors":
          return (
            <div className="fixed inset-0 z-[99999] pointer-events-auto flex flex-col">
              <motion.div
                className="w-full h-1/2"
                style={{ backgroundColor: color }}
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: slowEase }}
              />
              <motion.div
                className="w-full h-1/2"
                style={{ backgroundColor: color }}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: slowEase }}
                onAnimationComplete={handleCloseComplete}
              />
            </div>
          );

        case "sweep-right":
          return (
            <motion.div
              className="fixed inset-0 z-[99999] pointer-events-auto"
              style={{ backgroundColor: color }}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.85, ease }}
              onAnimationComplete={handleCloseComplete}
            />
          );

        case "stairs":
          return (
            <div className="fixed inset-0 z-[99999] pointer-events-auto flex flex-col">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-full flex-1"
                  style={{ backgroundColor: color }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                  onAnimationComplete={i === 4 ? handleCloseComplete : undefined}
                />
              ))}
            </div>
          );

        case "diagonal":
          return (
            <motion.div
              className="fixed inset-0 z-[99999] pointer-events-auto"
              style={{ backgroundColor: color }}
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              transition={{ duration: 0.9, ease: slowEase }}
              onAnimationComplete={handleCloseComplete}
            />
          );

        case "wave":
          return (
            <div className="fixed inset-0 z-[99999] pointer-events-auto flex">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-full flex-1"
                  style={{ backgroundColor: color }}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.85,
                    ease: slowEase,
                    delay: Math.sin(i * 0.4) * 0.15,
                  }}
                  onAnimationComplete={i === 7 ? handleCloseComplete : undefined}
                />
              ))}
            </div>
          );

        case "iris":
          return (
            <motion.div
              className="fixed inset-0 z-[99999] pointer-events-auto"
              style={{ backgroundColor: color }}
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(150% at 50% 50%)" }}
              transition={{ duration: 0.95, ease: slowEase }}
              onAnimationComplete={handleCloseComplete}
            />
          );

        case "dome-reveal":
          return (
            <motion.div
              className="fixed inset-0 z-[99999] pointer-events-auto"
              style={{ backgroundColor: color }}
              initial={{ clipPath: "ellipse(0% 0% at 50% 100%)" }}
              animate={{ clipPath: "ellipse(150% 150% at 50% 100%)" }}
              transition={{ duration: 0.95, ease: slowEase }}
              onAnimationComplete={handleCloseComplete}
            />
          );

        case "split-tilt":
          return (
            <div className="fixed inset-0 z-[99999] pointer-events-auto flex overflow-hidden">
              <motion.div
                className="w-1/2 h-full"
                style={{ backgroundColor: color, transformOrigin: "left center" }}
                initial={{ x: "-100%", rotateY: -20 }}
                animate={{ x: "0%", rotateY: 0 }}
                transition={{ duration: 0.9, ease: slowEase }}
              />
              <motion.div
                className="w-1/2 h-full"
                style={{ backgroundColor: color, transformOrigin: "right center" }}
                initial={{ x: "100%", rotateY: 20 }}
                animate={{ x: "0%", rotateY: 0 }}
                transition={{ duration: 0.9, ease: slowEase }}
                onAnimationComplete={handleCloseComplete}
              />
            </div>
          );

        case "glass-layers":
          return (
            <div className="fixed inset-0 z-[99999] pointer-events-auto">
              <motion.div
                className="absolute inset-0 backdrop-blur-md"
                style={{ backgroundColor: `${color}88` }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.85, ease }}
              />
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: color }}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.85, ease: slowEase }}
                onAnimationComplete={handleCloseComplete}
              />
            </div>
          );

        case "cinematic-pan":
          return (
            <div className="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-[#c15c3d]"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.85, ease: slowEase }}
              />
              <motion.div
                className="absolute inset-0 bg-[#0d0d10]"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.85, ease: slowEase, delay: 0.08 }}
                onAnimationComplete={handleCloseComplete}
              />
            </div>
          );

        case "glitch":
          return (
            <div className="fixed inset-0 z-[99999] pointer-events-auto flex flex-col">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-full flex-1"
                  style={{ backgroundColor: color }}
                  initial={{ x: i % 2 === 0 ? "100%" : "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 0.8, ease, delay: (i % 3) * 0.07 }}
                  onAnimationComplete={i === 5 ? handleCloseComplete : undefined}
                />
              ))}
            </div>
          );

        default:
          return null;
      }
    };

    const getContentAnimation = () => {
      switch (type) {
        case "doors":
        case "split-tilt":
          return {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.85, ease: slowEase, delay: 0.15 },
          };
        case "cinematic-pan":
          return {
            initial: { opacity: 0, x: 40, scale: 0.98 },
            animate: { opacity: 1, x: 0, scale: 1 },
            transition: { duration: 0.85, ease: slowEase, delay: 0.12 },
          };
        case "glitch":
          return {
            initial: { opacity: 0, x: -10 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.8, ease: slowEase, delay: 0.15 },
          };
        default:
          return {
            initial: { opacity: 0, y: 25 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.85, ease: slowEase, delay: 0.15 },
          };
      }
    };

    const contentAnim = getContentAnimation();

    return (
      <PageTransitionContext.Provider value={{ triggerClose: startCloseTransition, isClosing }}>
        <div className={`relative ${className || ""}`} ref={ref}>
          {renderOpeningOverlay()}
          {isClosing && renderClosingOverlay()}
          <motion.div
            initial={contentAnim.initial}
            animate={contentAnim.animate}
            transition={contentAnim.transition}
            className="w-full min-h-screen"
          >
            {children}
          </motion.div>
        </div>
      </PageTransitionContext.Provider>
    );
  },
);

AwardWinningTransition.displayName = "AwardWinningTransition";
