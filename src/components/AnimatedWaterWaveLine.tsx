import React from "react";
import { motion } from "framer-motion";

interface AnimatedWaterWaveLineProps {
  className?: string;
  fillColor?: string;
  heightClass?: string;
  children?: React.ReactNode;
}

/**
 * AnimatedWaterWaveLine:
 * Animates the organic bottom fluid wave line that transitions
 * from the dark painterly section into Section 6 (White).
 * Moves continuously like fluid water with smooth traveling wave crests.
 * Only the single organic white wave line and its white transition fill are rendered.
 */

// Generate a mathematically seamless repeating wave path across 3200 units (2 full 1600px loops)
function createSeamlessWave(amplitude: number, baseHeight: number, wavelength: number, totalWidth: number): string {
  const cycles = totalWidth / wavelength;
  let d = `M 0 ${baseHeight}`;
  const k = 0.18; // optimal tangent factor for sine wave approximation
  for (let i = 0; i < cycles; i++) {
    const x0 = i * wavelength;
    const midx = x0 + wavelength * 0.5;
    const endx = x0 + wavelength;

    // Crest arch (upward curve)
    const cp1x = x0 + wavelength * k;
    const cp1y = baseHeight - amplitude;
    const cp2x = midx - wavelength * k;
    const cp2y = baseHeight - amplitude;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${midx.toFixed(1)} ${baseHeight.toFixed(1)}`;

    // Trough arch (downward curve)
    const cp3x = midx + wavelength * k;
    const cp3y = baseHeight + amplitude;
    const cp4x = endx - wavelength * k;
    const cp4y = baseHeight + amplitude;
    d += ` C ${cp3x.toFixed(1)} ${cp3y.toFixed(1)}, ${cp4x.toFixed(1)} ${cp4y.toFixed(1)}, ${endx.toFixed(1)} ${baseHeight.toFixed(1)}`;
  }
  return d;
}

// Seamless wave path with organic liquid amplitude (28 units), baseHeight at 62 units out of 140
const WAVE_STROKE = createSeamlessWave(28, 62, 800, 3200);
const WAVE_FILL = `${WAVE_STROKE} L 3200 180 L 0 180 Z`;

export function AnimatedWaterWaveLine({
  className = "",
  fillColor = "#ffffff",
  heightClass = "h-28 sm:h-32 md:h-36",
  children,
}: AnimatedWaterWaveLineProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-none select-none ${className}`}>
      {/* 
        Container SVG: 
        ViewBox 0 0 1600 140 with preserveAspectRatio="none" stretches across any screen width.
        The single organic fluid wave moves infinitely using translate3d on the GPU.
      */}
      <svg
        viewBox="0 0 1600 140"
        preserveAspectRatio="none"
        className={`w-full max-w-none ${heightClass} block pointer-events-none`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Static white bed below the wave troughs to guarantee zero gap above the next section */}
        <rect x="0" y="90" width="1600" height="50" fill={fillColor} />

        {/* 
          The Organic Fluid Moving Wave:
          Native SVG animateTransform guarantees 100% visible, continuous, buttery-smooth fluid water motion
          in every browser on the GPU without depending on JavaScript frame loop.
        */}
        <g className="will-change-transform">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="-1600 0"
            dur="8.5s"
            repeatCount="indefinite"
          />

          {/* Solid White Foundation Fill transitioning smoothly into Section 6 */}
          <path d={WAVE_FILL} fill={fillColor} />

          {/* Crisp, clean organic liquid wave crest line along the top of the white fill */}
          <path
            d={WAVE_STROKE}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
        </g>
      </svg>

      {/* Children: Centered Interactive Monogram Button (YD Medallion) */}
      {children}
    </div>
  );
}

export default AnimatedWaterWaveLine;
