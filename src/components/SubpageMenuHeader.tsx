import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";

export interface SubpageMenuItem {
  label: string;
  href: string;
}

export interface SubpageMenuHeaderProps {
  title: string;
  items?: SubpageMenuItem[];
}

const GLOBAL_SUBPAGES: SubpageMenuItem[] = [
  { label: "Gallery", href: "/gallery" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Certificates", href: "/certificates" },
  { label: "Projects", href: "/projects" },
  { label: "Impact", href: "/impact" },
  { label: "Publications", href: "/publications" },
  { label: "Contact", href: "/contact" },
];

/**
 * Letter-by-letter Kinetic Roll hover character (pure text-current, no color accents)
 */
function KineticRollChar({
  char,
  delay,
  isHovered,
}: {
  char: string;
  delay: number;
  isHovered: boolean;
}) {
  if (char === " ") {
    return <span>&nbsp;</span>;
  }
  return (
    <span className="relative inline-block overflow-hidden h-[1.3em] leading-[1.3em] align-top select-none">
      <motion.span
        className="inline-block"
        initial={false}
        animate={{ y: isHovered ? "-100%" : "0%" }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {char}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 inline-block text-current"
        initial={false}
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {char}
      </motion.span>
    </span>
  );
}

function KineticRollText({
  text,
  isHovered,
}: {
  text: string;
  isHovered: boolean;
}) {
  return (
    <span className="inline-flex items-center">
      {text.split("").map((ch, idx) => (
        <KineticRollChar
          key={idx}
          char={ch}
          delay={idx * 0.015}
          isHovered={isHovered}
        />
      ))}
    </span>
  );
}

/**
 * Helper to compute luminance from RGB
 */
function getLuminance(r: number, g: number, b: number): number {
  const [lr, lg, lb] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function parseColorToLuminance(colorStr: string): number | null {
  if (!colorStr || colorStr === "transparent" || colorStr === "rgba(0, 0, 0, 0)") {
    return null;
  }
  const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    return getLuminance(
      parseInt(rgbMatch[1], 10),
      parseInt(rgbMatch[2], 10),
      parseInt(rgbMatch[3], 10)
    );
  }
  return null;
}

/**
 * SubpageMenuHeader
 * - Attached directly to upper wall (no line between notch and upper wall).
 * - Zero stray vertical lines at the ears: side contour starts precisely where the shoulder curve ends (top: 12px).
 * - Mathematically tangent continuous curvature: concave shoulder scoop (R=12px) flows into straight flanks,
 *   which transition seamlessly into convex bottom corner arcs (R=20px) and the bottom edge.
 * - Synchronously morphs with the notch expanding and compacting shape.
 * - Laser glow triggers from the bottom center of the notch and parts to both sides on appearance and on click.
 * - Strict opposite colors:
 *    * Light page -> Pure Black Notch (#000000) with crisp white text.
 *    * Dark page  -> Pure White Notch (#ffffff) with bold black text.
 *    * Line color is DIFFERENT to notch:
 *        - Dark page: Neon Electric Cyan (#00f0ff)
 *        - Light page: Vivid Electric Azure Blue (#0ea5e9)
 */
export function SubpageMenuHeader({ title, items = [] }: SubpageMenuHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isPageLight, setIsPageLight] = useState(false);
  const [glowTriggerKey, setGlowTriggerKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Helper to trigger glow on click or interaction
  const triggerGlow = useCallback(() => {
    setGlowTriggerKey((k) => k + 1);
  }, []);

  // Determine if page background is light or dark
  const evaluateBackgroundLuminance = useCallback(() => {
    // If site-wide dark mode is enabled, every page is in dark mode
    if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
      setIsPageLight(false);
      return;
    }

    const path = location.pathname.toLowerCase();

    // Specific detail routes
    if (path.startsWith("/certificates_/") || path.startsWith("/certificates/")) {
      const match = path.match(/\/certificates[_/]+(\d+)/);
      if (match) {
        const id = parseInt(match[1], 10);
        if (id === 0 || id === 2 || id === 3 || id === 5) {
          setIsPageLight(true);
          return;
        }
        setIsPageLight(false);
        return;
      }
    }

    if (path.startsWith("/experience_/") || path.startsWith("/experience/")) {
      const match = path.match(/\/experience[_/]+(\d+)/);
      if (match) {
        const id = parseInt(match[1], 10);
        if (id === 0) {
          setIsPageLight(true);
          return;
        }
        setIsPageLight(false);
        return;
      }
    }

    if (path.startsWith("/skills_/") || path.startsWith("/skills/")) {
      if (
        path.includes("impact") ||
        path.includes("strategic") ||
        path.includes("product") ||
        path.includes("leadership")
      ) {
        setIsPageLight(true);
        return;
      }
    }

    // Explicit light root subpages
    if (
      path.startsWith("/skills") ||
      path.startsWith("/publications") ||
      path.startsWith("/education") ||
      path.startsWith("/about")
    ) {
      setIsPageLight(true);
      return;
    }

    // Explicit dark root subpages
    if (
      path.startsWith("/gallery") ||
      path.startsWith("/certificates") ||
      path.startsWith("/experience") ||
      path.startsWith("/projects") ||
      path.startsWith("/contact") ||
      path === "/"
    ) {
      setIsPageLight(false);
      return;
    }

    // Dynamic runtime fallback by checking elements below the header
    try {
      const points = [
        { x: window.innerWidth * 0.2, y: 30 },
        { x: window.innerWidth * 0.5, y: 70 },
        { x: window.innerWidth * 0.8, y: 30 },
      ];

      for (const pt of points) {
        const el = document.elementFromPoint(pt.x, pt.y);
        if (el && !containerRef.current?.contains(el)) {
          let curr: HTMLElement | null = el as HTMLElement;
          while (curr && curr !== document.body) {
            const bg = window.getComputedStyle(curr).backgroundColor;
            const lum = parseColorToLuminance(bg);
            if (lum !== null) {
              setIsPageLight(lum > 0.45);
              return;
            }
            curr = curr.parentElement;
          }
        }
      }

      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const bodyLum = parseColorToLuminance(bodyBg);
      if (bodyLum !== null) {
        setIsPageLight(bodyLum > 0.45);
        return;
      }
    } catch {
      // Default fallback
    }

    setIsPageLight(false);
  }, [location.pathname]);

  // Evaluate on route changes, theme changes, and trigger initial glow
  useEffect(() => {
    evaluateBackgroundLuminance();
    triggerGlow();

    const handleThemeChange = () => {
      evaluateBackgroundLuminance();
      triggerGlow();
    };
    window.addEventListener("app-theme-change", handleThemeChange);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          evaluateBackgroundLuminance();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const timer = setTimeout(evaluateBackgroundLuminance, 120);
    const timer2 = setTimeout(evaluateBackgroundLuminance, 400);
    window.addEventListener("scroll", evaluateBackgroundLuminance, { passive: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener("scroll", evaluateBackgroundLuminance);
      window.removeEventListener("app-theme-change", handleThemeChange);
      observer.disconnect();
    };
  }, [location.pathname, evaluateBackgroundLuminance, triggerGlow]);

  // Reset dropdown on route navigation
  useEffect(() => {
    setIsOpen(false);
    setIsVisible(true);
    setHoveredItem(null);
  }, [location.pathname]);

  // Show/hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isOpen) return;
      if (currentScrollY > 40 && currentScrollY > lastScrollY.current + 8) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 12 || currentScrollY <= 40) {
        if (!isVisible) {
          triggerGlow();
        }
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, isVisible, triggerGlow]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const displayItems = items && items.length > 0 ? items : GLOBAL_SUBPAGES;

  // STRICT OPPOSITE COLOR THEME:
  // Light page -> Pure Black Notch (#000000) with crisp White text
  // Dark page  -> Pure White Notch (#ffffff) with bold Black text
  const isOppositeBlack = isPageLight;

  // Notch solid fill
  const notchFillHex = isOppositeBlack ? "#000000" : "#ffffff";

  // Pure notch background WITHOUT any CSS border
  const notchBgClass = isOppositeBlack
    ? "bg-black text-white shadow-[0_24px_60px_rgba(0,0,0,0.7),0_4px_16px_rgba(0,0,0,0.4)]"
    : "bg-white text-black shadow-[0_24px_60px_rgba(0,0,0,0.35),0_4px_16px_rgba(0,0,0,0.15)]";

  const drawerDividerColor = isOppositeBlack ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.10)";

  const titleButtonClass = isOppositeBlack
    ? isOpen
      ? "bg-white/20 text-white font-semibold"
      : "text-white/95 hover:text-white hover:bg-white/10"
    : isOpen
      ? "bg-black/12 text-black font-semibold"
      : "text-black/95 hover:text-black hover:bg-black/8";

  const chevronClass = isOppositeBlack
    ? isOpen
      ? "rotate-180 text-white"
      : "text-white/80"
    : isOpen
      ? "rotate-180 text-black"
      : "text-black/80";

  // LINE COLOR MUST BE DIFFERENT TO NOTCH COLOR:
  // - Dark Page (White Notch) -> Vivid Neon Cyan (#00f0ff)
  // - Light Page (Black Notch) -> Vivid Electric Azure Blue (#0ea5e9)
  const lineStrokeColor = isOppositeBlack ? "#0ea5e9" : "#00f0ff";
  const lineGlowColor = isOppositeBlack ? "rgba(14, 165, 233, 0.95)" : "rgba(0, 240, 255, 0.95)";
  const lineAuraColor = isOppositeBlack ? "rgba(2, 132, 199, 0.55)" : "rgba(56, 189, 248, 0.70)";

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
    triggerGlow();
  };

  const handleItemClick = () => {
    setIsOpen(false);
    triggerGlow();
  };

  // Prevent background page from scrolling when the subpage notch drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isOpen]);

  // Dimensional Radii for mathematically tangent curvature
  const earR = 12; // Radius of concave shoulder scoop
  const bottomR = 20; // Radius of convex bottom corners
  const strokeW = 1.8; // Uniform line thickness across all straight lines and corner arcs
  const halfW = strokeW / 2; // 0.9px

  return (
    <header
      ref={containerRef}
      className="fixed top-0 left-0 right-0 w-full z-[100] pointer-events-none select-none hidden md:flex flex-col items-center overflow-x-clip"
      style={{ top: 0 }}
    >
      {/* ========================================================================= */}
      {/* CORNER BLOOMS AT SECTION TIPS (Flashes once when line glow reaches edge) */}
      {/* ========================================================================= */}
      <motion.div
        key={`corner-left-bloom-${glowTriggerKey}`}
        className="absolute top-0 left-0 w-12 h-12 pointer-events-none z-30"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${lineGlowColor} 0%, transparent 75%)`,
          filter: `drop-shadow(0 0 14px ${lineGlowColor})`,
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: isVisible ? [0, 1, 0.85, 0] : 0,
          scale: isVisible ? [0.6, 1.8, 1.3, 0.5] : 0.5,
        }}
        transition={{
          duration: 0.8,
          delay: 0.35,
          ease: "easeOut",
        }}
      />
      <motion.div
        key={`corner-right-bloom-${glowTriggerKey}`}
        className="absolute top-0 right-0 w-12 h-12 pointer-events-none z-30"
        style={{
          background: `radial-gradient(circle at 100% 0%, ${lineGlowColor} 0%, transparent 75%)`,
          filter: `drop-shadow(0 0 14px ${lineGlowColor})`,
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: isVisible ? [0, 1, 0.85, 0] : 0,
          scale: isVisible ? [0.6, 1.8, 1.3, 0.5] : 0.5,
        }}
        transition={{
          duration: 0.8,
          delay: 0.35,
          ease: "easeOut",
        }}
      />

      {/* ========================================================================= */}
      {/* UNIFIED CONTIGUOUS NOTCH: ATTACHED DIRECTLY TO WALL, ZERO UPPER GAP/LINE */}
      {/* Real-time synchronization during expansion & collapse                    */}
      {/* ========================================================================= */}
      <motion.div
        layout
        initial={false}
        animate={{
          y: isVisible ? 0 : -90,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          layout: { type: "spring", stiffness: 440, damping: 36 },
          opacity: { duration: 0.2 },
          y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
        className="pointer-events-auto relative flex flex-col items-center will-change-transform z-30"
        style={{
          marginTop: "0px",
          marginLeft: "-1px",
          marginRight: "-1px",
        }}
      >
        {/* ======================================================================= */}
        {/* LEFT ERGONOMIC SHOULDER EAR & EXTENDING CEILING LINE                    */}
        {/* ======================================================================= */}
        <div
          className="absolute top-0 pointer-events-none select-none z-20"
          style={{
            left: -earR,
            width: earR,
            height: earR,
          }}
        >
          {/* Extended Left Ceiling Line: connects seamlessly from (0,0) of ear to screen edge */}
          <div
            className="absolute top-0 right-full pointer-events-none"
            style={{
              width: "100vw",
              height: strokeW,
              background: lineStrokeColor,
              marginRight: "-1px",
            }}
          />

          {/* Left Traveling Glow Beam along ceiling line: triggered on appearance & click */}
          <motion.div
            key={`beam-left-${glowTriggerKey}`}
            className="absolute top-0 right-full h-[3.6px] origin-right pointer-events-none"
            style={{
              width: "100vw",
              background: `linear-gradient(90deg, transparent, ${lineGlowColor} 80%, #ffffff 100%)`,
              filter: `drop-shadow(0 0 8px ${lineGlowColor}) drop-shadow(0 0 16px ${lineAuraColor})`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: isVisible ? [0, 1] : 0,
              opacity: isVisible ? [0, 1, 0.9, 0] : 0,
            }}
            transition={{
              duration: 0.85,
              times: [0, 0.25, 0.75, 1],
              ease: [0.16, 1, 0.3, 1],
              delay: 0.12,
            }}
          />

          {/* Left Ear SVG: Pure scoop curve tangent at (0, 0) horizontal & (earR, earR) vertical */}
          <svg
            viewBox={`0 0 ${earR} ${earR}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Solid fill blending ceiling into notch */}
            <path
              d={`M 0 0 C ${earR * 0.5523} 0 ${earR} ${earR * 0.4477} ${earR} ${earR} L ${earR} 0 Z`}
              fill={notchFillHex}
            />
            {/* Colored contour stroke connecting ceiling smoothly into notch wall with overlap */}
            <path
              d={`M -1 0 C ${earR * 0.5523} 0 ${earR} ${earR * 0.4477} ${earR} ${earR + 2}`}
              fill="none"
              stroke={lineStrokeColor}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT ERGONOMIC SHOULDER EAR & EXTENDING CEILING LINE                   */}
        {/* ======================================================================= */}
        <div
          className="absolute top-0 pointer-events-none select-none z-20"
          style={{
            right: -earR,
            width: earR,
            height: earR,
          }}
        >
          {/* Extended Right Ceiling Line: connects seamlessly from ear to screen edge */}
          <div
            className="absolute top-0 left-full pointer-events-none"
            style={{
              width: "100vw",
              height: strokeW,
              background: lineStrokeColor,
              marginLeft: "-1px",
            }}
          />

          {/* Right Traveling Glow Beam along ceiling line: triggered on appearance & click */}
          <motion.div
            key={`beam-right-${glowTriggerKey}`}
            className="absolute top-0 left-full h-[3.6px] origin-left pointer-events-none"
            style={{
              width: "100vw",
              background: `linear-gradient(90deg, #ffffff 0%, ${lineGlowColor} 20%, transparent 100%)`,
              filter: `drop-shadow(0 0 8px ${lineGlowColor}) drop-shadow(0 0 16px ${lineAuraColor})`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: isVisible ? [0, 1] : 0,
              opacity: isVisible ? [0, 1, 0.9, 0] : 0,
            }}
            transition={{
              duration: 0.85,
              times: [0, 0.25, 0.75, 1],
              ease: [0.16, 1, 0.3, 1],
              delay: 0.12,
            }}
          />

          {/* Right Ear SVG: Pure scoop curve tangent at (earR, 0) horizontal & (0, earR) vertical */}
          <svg
            viewBox={`0 0 ${earR} ${earR}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Solid fill blending ceiling into notch */}
            <path
              d={`M ${earR} 0 C ${earR * 0.4477} 0 0 ${earR * 0.4477} 0 ${earR} L 0 0 Z`}
              fill={notchFillHex}
            />
            {/* Colored contour stroke connecting ceiling smoothly into notch right wall with overlap */}
            <path
              d={`M 0 ${earR + 2} C 0 ${earR * 0.4477} ${earR * 0.4477} 0 ${earR + 1} 0`}
              fill="none"
              stroke={lineStrokeColor}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ======================================================================= */}
        {/* MAIN NOTCH PILL BODY: ZERO CSS BORDERS TO PREVENT STRAY VERTICAL LINES   */}
        {/* Outline is formed by mathematical contour segments starting at top:earR */}
        {/* ======================================================================= */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 440, damping: 36 }}
          className={`relative ${notchBgClass} backdrop-blur-3xl rounded-b-[20px] overflow-hidden flex flex-col transition-[background-color,color] duration-300 ${
            isOpen
              ? "w-[min(92vw,360px)] px-3.5 sm:px-4 pt-1.5 pb-3.5"
              : "w-auto px-4 pt-1.5 pb-2"
          }`}
          style={{
            border: "none",
            backgroundColor: notchFillHex,
            boxShadow: `0 16px 40px rgba(0,0,0,0.5), 0 0 10px ${lineAuraColor}`,
            marginTop: "0px",
            marginLeft: "-1px",
            marginRight: "-1px",
          }}
        >
          {/* ===================================================================== */}
          {/* CONTINUOUS UNBROKEN NOTCH CONTOUR OUTLINE                             */}
          {/* Single contiguous element: eliminates all subpixel breaks, cuts, or gaps */}
          {/* ===================================================================== */}
          <div
            className="absolute left-0 right-0 bottom-0 pointer-events-none rounded-b-[20px]"
            style={{
              top: earR,
              borderLeft: `${strokeW}px solid ${lineStrokeColor}`,
              borderRight: `${strokeW}px solid ${lineStrokeColor}`,
              borderBottom: `${strokeW}px solid ${lineStrokeColor}`,
              borderTop: "none",
            }}
          />

          {/* ===================================================================== */}
          {/* GLOW PULSE OVERLAYS (Triggered on appearance & click)                */}
          {/* ===================================================================== */}

          {/* Glow spark at bottom center of notch */}
          <motion.div
            key={`bottom-spark-${glowTriggerKey}`}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full pointer-events-none z-40"
            style={{
              background: `radial-gradient(ellipse at center, #ffffff 0%, ${lineGlowColor} 60%, transparent 100%)`,
              filter: `drop-shadow(0 0 10px ${lineGlowColor}) drop-shadow(0 0 20px ${lineAuraColor})`,
            }}
            initial={{ scaleX: 0.2, scaleY: 0.5, opacity: 0 }}
            animate={{
              scaleX: isVisible ? [0.2, 4.5, 0.5] : 0,
              scaleY: isVisible ? [0.5, 2.5, 0] : 0,
              opacity: isVisible ? [0, 1, 0] : 0,
            }}
            transition={{
              duration: 0.65,
              times: [0, 0.35, 1],
              ease: "easeOut",
            }}
          />

          {/* Radiant halo pulse along notch outline on click */}
          <motion.div
            key={`contour-halo-${glowTriggerKey}`}
            className="absolute inset-0 pointer-events-none rounded-b-[20px]"
            style={{
              boxShadow: `inset 0 0 12px ${lineGlowColor}, 0 0 14px ${lineGlowColor}`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isVisible ? [0, 0.9, 0.6, 0] : 0,
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.25, 0.65, 1],
              ease: "easeOut",
            }}
          />

          {/* Top Notch Header Row: Main Page Name perfectly centered */}
          <div className="flex items-center justify-center w-full z-10">
            <button
              type="button"
              onClick={handleToggleOpen}
              aria-expanded={isOpen}
              aria-label={`Toggle ${title} navigation`}
              className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full text-[13px] sm:text-[13.5px] font-semibold tracking-tight transition-all duration-200 cursor-pointer active:scale-95 mx-auto ${titleButtonClass}`}
              style={{
                fontFamily:
                  '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: "-0.015em",
              }}
            >
              <span>{title}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${chevronClass}`} />
            </button>
          </div>

          {/* Unified In-Place Expanding Subpages (Never separated from notch body) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="notch-expanded-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, transition: { duration: 0.16 } }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col pt-2.5 mt-2 border-t z-10"
                style={{ borderColor: drawerDividerColor }}
              >
                {/* Single View (All items visible at once without scrolling) */}
                <div className="flex flex-col gap-1 w-full">
                  {displayItems.map((item) => {
                    const isItemHovered = hoveredItem === item.label;
                    const isCurrent = location.pathname === item.href;

                    // Text is strictly Black or White, with a clean highlight on hover
                    const itemClass = isOppositeBlack
                      ? isCurrent
                        ? "bg-white/20 text-white font-semibold"
                        : isItemHovered
                          ? "bg-white/15 text-white"
                          : "text-white/85 hover:bg-white/15 hover:text-white"
                      : isCurrent
                        ? "bg-black/15 text-black font-semibold"
                        : isItemHovered
                          ? "bg-black/10 text-black"
                          : "text-black/85 hover:bg-black/10 hover:text-black";

                    const arrowClass = isOppositeBlack
                      ? isItemHovered
                        ? "opacity-100 text-white translate-x-0"
                        : "opacity-0 -translate-x-1 text-white/50"
                      : isItemHovered
                        ? "opacity-100 text-black translate-x-0"
                        : "opacity-0 -translate-x-1 text-black/50";

                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={handleItemClick}
                        onMouseEnter={() => setHoveredItem(item.label)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`group flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${itemClass}`}
                        style={{
                          fontFamily:
                            '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          letterSpacing: "-0.015em",
                        }}
                      >
                        <span className="text-[13.5px] font-medium leading-tight truncate text-current">
                          <KineticRollText text={item.label} isHovered={isItemHovered} />
                        </span>

                        <ArrowUpRight className={`w-3.5 h-3.5 transition-all duration-200 shrink-0 ${arrowClass}`} />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </header>
  );
}

export default SubpageMenuHeader;
