import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollSvgTubeProps {
  className?: string;
  variant?: "blue" | "cyan" | "purple";
  /** Optional custom target container ref to track scroll */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Direction or path variant */
  pathPreset?: "multi-section-flow" | "looping-ribbon" | "infinity-curve";
}

/**
 * ScrollSvgTube (AnimatedSnake)
 * Replicates the moving 3D cylindrical SVG tube from Lusion.co (reference video 00:02-00:08 & 00:19-00:26).
 * Propagates seamlessly across multiple sections without clipping at borders.
 * Starts from out-of-screen (only leading tip enters) and disappears on the end section by propagating out of screen.
 */
export function ScrollSvgTube({
  className = "",
  variant = "blue",
  containerRef: externalContainerRef,
  pathPreset = "multi-section-flow",
}: ScrollSvgTubeProps) {
  const localContainerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const echoRef = useRef<SVGPathElement>(null);

  // Smooth serpentine bezier paths that wind seamlessly through sections
  const pathData =
    pathPreset === "multi-section-flow"
      ? `M -200, 220
         C 140, 220 680, 180 1120, 240
         C 1520, 300 1700, 520 1460, 720
         C 1200, 880 680, 720 320, 840
         C 120, 920 60, 1040 240, 1140
         C 440, 1260 920, 1180 1340, 1300
         C 1640, 1400 1680, 1560 1440, 1680
         C 1180, 1800 680, 1720 340, 1840
         C 120, 1920 80, 2060 260, 2180
         C 480, 2320 1020, 2380 1480, 2560`
      : pathPreset === "looping-ribbon"
        ? `M -140, 180
         C 260, 20 620, 90 920, 190
         C 1280, 310 1560, 160 1760, 340
         C 1940, 520 1690, 790 1370, 730
         C 1050, 670 720, 850 430, 770
         C 150, 690 -70, 870 140, 990
         C 400, 1110 960, 950 1340, 1070
         C 1580, 1150 1790, 1110 1900, 1220`
        : `M -120, 260
         C 320, 60 780, 420 1150, 240
         C 1480, 80 1780, 220 1760, 560
         C 1740, 840 1340, 720 1020, 860
         C 680, 1000 320, 760 -80, 960
         C -220, 1040 180, 1160 620, 1120`;

  // Secondary decorative trailing echo spline
  const secondaryPathData =
    pathPreset === "multi-section-flow"
      ? `M -220, 300
         C 120, 300 620, 250 1060, 290
         C 1480, 350 1640, 560 1400, 740
         C 1140, 900 640, 740 280, 860
         C 80, 940 20, 1060 200, 1160
         C 400, 1280 880, 1200 1280, 1320
         C 1580, 1420 1620, 1580 1380, 1700
         C 1120, 1820 640, 1740 300, 1860
         C 80, 1940 40, 2080 220, 2200
         C 440, 2340 980, 2400 1420, 2580`
      : `M -80, 260
         C 310, 100 660, 170 960, 270
         C 1310, 390 1590, 240 1790, 420
         C 1970, 600 1720, 870 1400, 810
         C 1080, 750 750, 930 460, 850
         C 180, 770 -40, 950 170, 1070`;

  // Color schemes matching Lusion.co
  const gradientIds = {
    tube: `lusionTubeGrad-${variant}`,
    shadow: `lusionShadowBlur-${variant}`,
    highlight: `lusionHighlightGrad-${variant}`,
  };

  const viewBox = pathPreset === "multi-section-flow" ? "0 0 1600 2400" : "0 0 1600 1100";

  useEffect(() => {
    const container = localContainerRef.current;
    if (!container) return;

    // Use external container ref or closest parent section / wrapper
    const triggerEl = externalContainerRef?.current || container.parentElement || container;

    const ctx = gsap.context(() => {
      // 1. Primary tube scroll scrubbing
      // Requirement:
      // - Starts from OUT of the screen (top) so the last end (tail) is never visible entering.
      // - Only the leading tip is visible moving forward as user scrolls.
      // - On the end section, it propagates completely out of the screen and disappears.
      if (pathRef.current) {
        const totalLen = pathRef.current.getTotalLength();
        const tubeLen = Math.round(Math.max(totalLen * 0.42, 1400));

        const strokes = container.querySelectorAll<SVGPathElement>(".scroll-tube-stroke");
        if (strokes && strokes.length > 0) {
          strokes.forEach((stroke) => {
            stroke.style.strokeDasharray = `${tubeLen} ${totalLen * 3}`;
            stroke.style.strokeDashoffset = `${tubeLen}`;
          });

          gsap.fromTo(
            strokes,
            { strokeDashoffset: tubeLen },
            {
              strokeDashoffset: -(totalLen + 60),
              ease: "none",
              scrollTrigger: {
                trigger: triggerEl,
                start: "top 90%",
                end: "bottom 10%",
                scrub: 1.0, // Active real-time scroll synchronization
                invalidateOnRefresh: true,
              },
            },
          );
        }
      }

      // 2. Trailing echo ribbon
      if (echoRef.current) {
        const echoLen = echoRef.current.getTotalLength();
        const echoTubeLen = Math.round(Math.max(echoLen * 0.28, 800));
        echoRef.current.style.strokeDasharray = `${echoTubeLen} ${echoLen * 3}`;
        echoRef.current.style.strokeDashoffset = `${echoTubeLen}`;

        gsap.fromTo(
          echoRef.current,
          { strokeDashoffset: echoTubeLen },
          {
            strokeDashoffset: -(echoLen + 60),
            ease: "none",
            scrollTrigger: {
              trigger: triggerEl,
              start: "top 85%",
              end: "bottom 15%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    }, localContainerRef);

    return () => ctx.revert();
  }, [externalContainerRef, pathPreset]);

  return (
    <div
      ref={localContainerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <svg
        className="w-full h-full object-cover pointer-events-none"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Blur filter for realistic volumetric ground shadow */}
          <filter id={gradientIds.shadow} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.08   0 0 0 0 0.12   0 0 0 0 0.35   0 0 0 0.18 0"
            />
          </filter>

          {/* Primary 3D Cylindrical Gradient */}
          {variant === "blue" && (
            <linearGradient id={gradientIds.tube} x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="20%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="78%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          )}

          {variant === "cyan" && (
            <linearGradient id={gradientIds.tube} x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="25%" stopColor="#06b6d4" />
              <stop offset="60%" stopColor="#0891b2" />
              <stop offset="85%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0e7490" />
            </linearGradient>
          )}

          {variant === "purple" && (
            <linearGradient id={gradientIds.tube} x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#4338ca" />
              <stop offset="30%" stopColor="#6366f1" />
              <stop offset="65%" stopColor="#7c3aed" />
              <stop offset="90%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3730a3" />
            </linearGradient>
          )}

          {/* Gloss Specular Highlight Gradient */}
          <linearGradient id={gradientIds.highlight} x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* SECONDARY SUBTLE ECHO TUBE (trailing depth loop)               */}
        {/* ------------------------------------------------------------- */}
        <path
          ref={echoRef}
          d={secondaryPathData}
          fill="none"
          stroke={variant === "blue" ? "#3b82f6" : "#06b6d4"}
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.35}
        />

        {/* ------------------------------------------------------------- */}
        {/* LAYER 1: AMBIENT 3D DROP SHADOW (soft floating ground shadow)  */}
        {/* ------------------------------------------------------------- */}
        <path
          className="scroll-tube-stroke"
          d={pathData}
          fill="none"
          stroke="#0f172a"
          strokeWidth="48"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${gradientIds.shadow})`}
          transform="translate(4, 24)"
        />

        {/* ------------------------------------------------------------- */}
        {/* LAYER 2: MAIN CYLINDRICAL TUBE BODY (segmented & rich gradient) */}
        {/* ------------------------------------------------------------- */}
        <path
          ref={pathRef}
          className="scroll-tube-stroke"
          d={pathData}
          fill="none"
          stroke={`url(#${gradientIds.tube})`}
          strokeWidth="38"
          strokeDasharray="45 18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ------------------------------------------------------------- */}
        {/* LAYER 3: 3D SPECULAR HIGHLIGHT (top curvature reflection)      */}
        {/* ------------------------------------------------------------- */}
        <path
          className="scroll-tube-stroke"
          d={pathData}
          fill="none"
          stroke={`url(#${gradientIds.highlight})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(-2, -3.5)"
        />

        {/* ------------------------------------------------------------- */}
        {/* LAYER 4: PINPOINT SPECULAR HOTSPOT (glossy gleam core)        */}
        {/* ------------------------------------------------------------- */}
        <path
          className="scroll-tube-stroke"
          d={pathData}
          fill="none"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(-3, -5)"
        />
      </svg>
    </div>
  );
}

/**
 * Backward compatibility export for AnimatedSnake
 */
export const AnimatedSnake = ScrollSvgTube;
export default ScrollSvgTube;
