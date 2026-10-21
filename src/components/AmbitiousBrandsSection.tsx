import React, { useEffect, useState, useRef } from "react";
import { motion, useTime, useTransform, MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Orbit configuration matching the video - smooth diagonal 3D tilted orbit
const DURATION = 24000; // 24s for a complete 360-degree orbit

interface BubbleConfig {
  id: string;
  angle: number; // in degrees (0 - 360)
  size: number;
  bg: string;
  color: string;
  border?: string;
  content: React.ReactNode;
}

function OrbitalBubble({
  config,
  time,
  rx,
  ry,
  verticalOffset,
  tiltAngle = -18,
  scaleFactor = 1,
}: {
  config: BubbleConfig;
  time: MotionValue<number>;
  rx: number;
  ry: number;
  verticalOffset: number;
  tiltAngle?: number;
  scaleFactor?: number;
}) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const startRad = (config.angle * Math.PI) / 180;
  const tiltRad = (tiltAngle * Math.PI) / 180;
  const cosTilt = Math.cos(tiltRad);
  const sinTilt = Math.sin(tiltRad);

  // As time progresses, angle increases:
  // In the front (Z > 0), circles sweep diagonally across from TOP-RIGHT towards BOTTOM-LEFT.
  // In the back (Z < 0), circles sweep diagonally behind from BOTTOM-LEFT towards TOP-RIGHT.
  const currentAngle = useTransform(time, (t) => {
    const progress = (t % DURATION) / DURATION;
    return startRad + progress * Math.PI * 2;
  });

  // Calculate 3D coordinates along diagonal tilted elliptical orbit (matching the video's diagonal revolution)
  const x = useTransform(currentAngle, (a) => {
    const x0 = Math.cos(a) * rx;
    const y0 = Math.sin(a) * ry;
    return x0 * cosTilt - y0 * sinTilt;
  });

  const z = useTransform(currentAngle, (a) => Math.sin(a)); // -1 (back) to +1 (front)

  const y = useTransform(currentAngle, (a) => {
    const x0 = Math.cos(a) * rx;
    const y0 = Math.sin(a) * ry;
    return x0 * sinTilt + y0 * cosTilt + verticalOffset;
  });

  const translateZ = useTransform(z, [-1, 1], [-190, 190]);

  // Subtle diagonal pitch & roll matching the diagonal orbit plane
  const rotateZ = useTransform(currentAngle, (a) => {
    return tiltAngle * 0.65 + Math.sin(a) * 3;
  });
  const rotateX = useTransform(z, [-1, 1], [-7, 7]);
  const rotateY = useTransform(currentAngle, (a) => -Math.sin(a) * 8);

  // Guaranteed physical layering:
  // When z > 0 (front arc, crossing in front of the text), z-index is set to 50 (strictly in front of text at 20).
  // When z <= 0 (back arc, crossing behind the text), z-index is set to 10 (strictly behind text at 20).
  useEffect(() => {
    const updateZIndex = (currentZ: number) => {
      if (bubbleRef.current) {
        const isFront = currentZ > 0;
        const target = isFront ? "50" : "10";
        if (bubbleRef.current.style.zIndex !== target) {
          bubbleRef.current.style.zIndex = target;
        }
      }
    };
    updateZIndex(z.get());
    return z.on("change", updateZIndex);
  }, [z]);

  // Back of the text fade away:
  // At z = -1 (deep back), opacity is 0.22 (dim and atmospheric).
  // As it approaches the sides (z = 0), opacity reaches 0.75.
  // In the foreground (z > 0), opacity is 1.0 (crisp and high-contrast).
  const opacity = useTransform(z, [-1, -0.4, 0, 0.4, 1], [0.22, 0.4, 0.75, 0.95, 1.0]);

  // Perspective scaling:
  // Circles in back shrink to ~0.65, circles in front scale to ~1.08.
  const scale = useTransform(
    z,
    [-1, 0, 1],
    [0.65 * scaleFactor, 0.88 * scaleFactor, 1.08 * scaleFactor],
  );

  const initialZ = Math.sin(startRad);

  return (
    <motion.div
      ref={bubbleRef}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        x,
        y,
        z: translateZ,
        rotateZ,
        rotateX,
        rotateY,
        opacity,
        scale,
        width: config.size,
        height: config.size,
        marginLeft: -config.size / 2,
        marginTop: -config.size / 2,
        backgroundColor: config.bg,
        color: config.color,
        border: config.border || "none",
        zIndex: initialZ > 0 ? 50 : 10,
      }}
      className="rounded-full flex flex-col items-center justify-center p-2.5 text-center shadow-2xl overflow-hidden select-none pointer-events-none will-change-transform"
    >
      <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none">
        {config.content}
      </div>
    </motion.div>
  );
}

export function AmbitiousBrandsSection() {
  const time = useTime();
  const sectionRef = useRef<HTMLElement>(null);

  // Responsive diagonal orbit sizing matching the video
  const [dimensions, setDimensions] = useState({
    rx: 540,
    ry: 210,
    verticalOffset: 35,
    tiltAngle: -18,
    scaleFactor: 1,
  });

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        // Mobile: adjusted radius, vertical offset, and slightly milder diagonal tilt
        setDimensions({
          rx: Math.min(215, w * 0.44),
          ry: 130,
          verticalOffset: 20,
          tiltAngle: -15,
          scaleFactor: 0.72,
        });
      } else if (w < 1024) {
        // Tablet: proportioned radius and diagonal tilt
        setDimensions({
          rx: Math.min(390, w * 0.44),
          ry: 175,
          verticalOffset: 30,
          tiltAngle: -17,
          scaleFactor: 0.88,
        });
      } else {
        // Desktop: wide, commanding diagonal orbit sweeping across the frame
        setDimensions({
          rx: 540,
          ry: 210,
          verticalOffset: 35,
          tiltAngle: -18,
          scaleFactor: 1,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const artSection = sectionRef.current.nextElementSibling as HTMLElement | null;
      const aardvarkSection =
        (document.getElementById("aardvark-book-club-replica") as HTMLElement | null) ||
        artSection?.nextElementSibling;

      const finalEndTrigger = aardvarkSection || artSection;

      if (finalEndTrigger) {
        // Pin the revolving section so both the image and yellow section slide up over it
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          endTrigger: finalEndTrigger,
          end: "top top",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        // Depth perspective pushback as incoming sections overlap the revolving section
        if (artSection) {
          gsap.to(sectionRef.current, {
            scale: 0.94,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: artSection,
              start: "top bottom",
              endTrigger: finalEndTrigger,
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    },
    { scope: sectionRef },
  );

  // 15 Distinct Partner & Leadership Badges relating to Yodit Dejene's programs and institutions
  const bubbles: BubbleConfig[] = [
    // --- FRONT SECTOR (Prominent, crisp white circles along the front arc) ---
    {
      id: "fawe",
      angle: 90, // Front center: overlapping "to Work With Me."
      size: 126,
      bg: "#FFFFFF",
      color: "#000000",
      content: (
        <div className="flex flex-col items-center justify-center w-full px-2">
          {/* FAWE Educational Laurel Crest */}
          <svg viewBox="0 0 32 32" className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor">
            <circle cx="16" cy="11" r="3.5" strokeWidth="1.5" />
            <path d="M 10 24 C 10 18 22 18 22 24" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M 7 26 L 16 23 L 25 26 L 25 29 L 16 26 L 7 29 Z" strokeWidth="1.2" />
          </svg>
          <div className="font-serif font-black text-base tracking-widest leading-none">FAWE</div>
          <div className="text-[6.5px] uppercase tracking-[0.2em] mt-0.5 font-bold opacity-85">
            ETHIOPIA CHAPTER
          </div>
          <div className="text-[5.5px] uppercase tracking-[0.14em] opacity-60">
            SRHR & Youth Lead
          </div>
        </div>
      ),
    },
    {
      id: "tvoa",
      angle: 114, // Front left-center
      size: 124,
      bg: "#FFFFFF",
      color: "#000000",
      content: (
        <div className="flex flex-col items-center justify-center w-full px-2">
          {/* Voice of Africa Broadcast Arcs */}
          <svg viewBox="0 0 36 36" className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor">
            <circle cx="18" cy="18" r="3.5" fill="currentColor" />
            <path d="M 12 12 A 8.5 8.5 0 0 0 12 24" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 24 12 A 8.5 8.5 0 0 1 24 24" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 7 7 A 15.5 15.5 0 0 0 7 29" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 29 7 A 15.5 15.5 0 0 1 29 29" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <div className="font-sans font-bold text-xs tracking-wider leading-tight text-center">
            VOICE OF AFRICA
          </div>
          <div className="text-[6px] uppercase tracking-[0.18em] mt-0.5 font-semibold opacity-70">
            Community Training
          </div>
        </div>
      ),
    },
    {
      id: "irc",
      angle: 138, // Front left
      size: 130,
      bg: "#FFFFFF",
      color: "#000000",
      content: (
        <div className="flex flex-col items-center justify-center w-full px-2">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-4 h-4 bg-black flex items-center justify-center rounded-[2px]">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-[#FFFFFF]">
                <path d="M 6 4 L 18 4 L 18 16 L 14 16 L 14 10 L 8 16 L 4 12 L 10 6 L 6 6 Z" />
              </svg>
            </div>
            <span className="font-sans font-black text-sm tracking-tight">IRC</span>
          </div>
          <div className="w-full border-t border-black/70 my-0.5"></div>
          <div className="font-sans font-bold text-[7.5px] tracking-widest uppercase">
            INTERNATIONAL RESCUE
          </div>
          <div className="text-[6px] uppercase tracking-wider opacity-70">Assosa · Sherkole</div>
        </div>
      ),
    },
    {
      id: "unhcr",
      angle: 66, // Front right-center
      size: 122,
      bg: "#FFFFFF",
      color: "#000000",
      content: (
        <div className="flex flex-col items-center justify-center w-full px-1">
          {/* UNHCR Protective Canopy Emblem */}
          <svg viewBox="0 0 36 36" className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor">
            <circle cx="18" cy="18" r="15" strokeWidth="1.4" opacity="0.35" />
            <path d="M 10 25 C 10 16 26 16 26 25" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="18" cy="12.5" r="3.2" fill="currentColor" />
          </svg>
          <div className="font-sans font-black text-xs tracking-wider">UNHCR</div>
          <div className="text-[6px] uppercase tracking-widest opacity-80 mt-0.5 font-semibold">
            PSEA & Safeguarding
          </div>
          <div className="text-[5.5px] uppercase tracking-wider opacity-60">Refugee Protection</div>
        </div>
      ),
    },
    {
      id: "unicef",
      angle: 42, // Front right
      size: 122,
      bg: "#FFFFFF",
      color: "#000000",
      content: (
        <div className="flex flex-col items-center justify-center font-sans">
          <span className="text-base font-black tracking-tighter leading-none lowercase">
            unicef
          </span>
          <span className="w-7 h-[1px] bg-black my-1 opacity-70"></span>
          <span className="text-[6.5px] uppercase tracking-[0.18em] font-bold opacity-85">
            Child Protection
          </span>
          <span className="text-[5.5px] uppercase tracking-widest opacity-60">
            Adolescent Health
          </span>
        </div>
      ),
    },

    // --- TRANSITION FLANKS & BACKGROUND (Charcoal, dark slate, certifications, and institutions) ---
    {
      id: "usaid",
      angle: 162, // Moving along the left flank
      size: 120,
      bg: "#7D7973",
      color: "#FFFFFF",
      content: (
        <div className="flex flex-col items-center justify-center text-white">
          <div className="flex items-center justify-center space-x-1 mb-0.5">
            <div className="w-2 h-2 bg-[#E53935] rounded-full"></div>
            <div className="w-2 h-2 bg-[#1E88E5] rounded-full"></div>
            <div className="w-2 h-2 bg-[#FDD835] rounded-full"></div>
          </div>
          <div className="font-sans font-black text-lg tracking-tighter leading-none">USAID</div>
          <div className="text-[7px] font-bold uppercase tracking-widest mt-0.5 opacity-90">
            FANTA · MEL
          </div>
          <div className="text-[5.5px] uppercase tracking-wider opacity-75">
            Evaluation Frameworks
          </div>
        </div>
      ),
    },
    {
      id: "ippf",
      angle: 186, // Outer left flank
      size: 124,
      bg: "#222222",
      color: "#FFFFFF",
      content: (
        <div className="flex flex-col items-center justify-center">
          <div className="text-xl font-serif leading-none mb-0.5 font-bold tracking-widest">
            IPPF
          </div>
          <div className="text-[7.5px] tracking-[0.2em] uppercase font-sans opacity-90">
            SRHR Advocacy
          </div>
          <div className="text-[6px] tracking-widest uppercase opacity-60 mt-0.5">Human Rights</div>
        </div>
      ),
    },
    {
      id: "pmi-pmp",
      angle: 210, // Back left
      size: 126,
      bg: "#3C3A35",
      color: "#FFFFFF",
      content: (
        <div className="flex flex-col items-center justify-center px-1">
          <div className="font-serif italic text-[8px] opacity-75 mb-0.5">PMI Certified</div>
          <div className="font-sans font-black text-sm tracking-wider">PMP® 2023</div>
          <div className="w-12 h-[1px] bg-white/40 my-1"></div>
          <div className="text-[6.5px] uppercase tracking-widest opacity-80">
            Project Leadership
          </div>
        </div>
      ),
    },
    {
      id: "bahir-dar",
      angle: 234, // Deep back left
      size: 116,
      bg: "#262626",
      color: "#D8D8D8",
      content: (
        <div className="flex flex-col items-center justify-center">
          <div className="text-base font-serif italic mb-0.5 leading-none">BDU</div>
          <div className="font-sans font-bold tracking-wider uppercase text-[7.5px]">BAHIR DAR</div>
          <div className="text-[6px] uppercase tracking-widest opacity-60 mt-0.5">
            Rural Dev. BSc
          </div>
        </div>
      ),
    },
    {
      id: "maryland-mba",
      angle: 258, // Back left-center
      size: 104,
      bg: "#121212",
      color: "#FFFFFF",
      border: "1px solid rgba(255,255,255,0.15)",
      content: (
        <div className="flex flex-col items-center justify-center">
          <div className="font-serif font-black text-lg tracking-widest">MBA</div>
          <div className="text-[6.5px] uppercase tracking-widest opacity-70 mt-0.5">Leadership</div>
        </div>
      ),
    },
    {
      id: "sherkole",
      angle: 282, // Back center: passes behind headline
      size: 128,
      bg: "#0A0A0A",
      color: "#FFFFFF",
      border: "1px solid rgba(255,255,255,0.2)",
      content: (
        <div className="flex flex-col items-center justify-center">
          <div className="font-sans font-black text-base tracking-tight leading-none">SHERKOLE</div>
          <svg viewBox="0 0 60 8" className="w-10 h-1.5 my-0.5" fill="none">
            <path d="M 0 2 Q 30 8 60 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <div className="text-[6.5px] tracking-[0.2em] text-white/70 uppercase">
            GIRLS SAFE SPACES
          </div>
        </div>
      ),
    },
    {
      id: "gbv-pathways",
      angle: 306, // Back right
      size: 118,
      bg: "#C5C3BC",
      color: "#222222",
      content: (
        <div className="flex flex-col items-center justify-center p-1 text-[#222]">
          <svg viewBox="0 0 60 60" className="w-7 h-7 mb-0.5" fill="none" stroke="currentColor">
            <path
              d="M 30 6 L 46 14 L 46 32 C 46 44 30 52 30 52 C 30 52 14 44 14 32 L 14 14 Z"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="30" cy="24" r="4" fill="currentColor" />
            <path d="M 24 38 C 24 32 36 32 36 38" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="font-sans font-bold text-[8px] uppercase tracking-wider">
            GBV Pathways
          </div>
          <div className="text-[6px] tracking-widest opacity-70 uppercase">Survivor Support</div>
        </div>
      ),
    },
    {
      id: "yd-consortium",
      angle: 330, // Outer right flank
      size: 114,
      bg: "#2C2C2C",
      color: "#FFFFFF",
      content: (
        <div className="w-full h-full flex items-center justify-center p-1">
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.6"
            />
            <circle
              cx="40"
              cy="40"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
            <text
              x="40"
              y="45"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="serif"
              fontWeight="bold"
              fontSize="16"
              letterSpacing="1"
            >
              YD
            </text>
            <text
              x="40"
              y="56"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="sans-serif"
              fontSize="5.5"
              letterSpacing="1.5"
              opacity="0.8"
            >
              CONSORTIA
            </text>
          </svg>
        </div>
      ),
    },
    {
      id: "peer-education",
      angle: 354, // Far right edge
      size: 110,
      bg: "#1C1C1C",
      color: "#777777",
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center p-1">
          <svg viewBox="0 0 60 60" className="w-7 h-7 mb-0.5" stroke="currentColor" fill="none">
            <polygon points="30,5 55,30 30,55 5,30" strokeWidth="1.2" />
            <polygon points="30,12 48,30 30,48 12,30" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="30" cy="30" r="4" strokeWidth="1.2" fill="currentColor" opacity="0.3" />
          </svg>
          <div className="text-[6.5px] uppercase tracking-widest font-semibold text-neutral-400">
            PEER-TO-PEER
          </div>
          <div className="text-[5.5px] uppercase tracking-wider text-neutral-500">Facilitation</div>
        </div>
      ),
    },
    {
      id: "srhr-alliance",
      angle: 18, // Transitioning into front right
      size: 96,
      bg: "#161616",
      color: "#333333",
      content: (
        <div className="w-full h-full rounded-full border border-white/10 flex flex-col items-center justify-center">
          <div className="text-[7.5px] font-bold text-white/50 tracking-wider">SRHR</div>
          <div className="w-3 h-[1px] bg-white/20 my-0.5"></div>
          <div className="text-[5px] uppercase text-white/30 tracking-widest">Alliance</div>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      data-custom-scroll="true"
      className="relative w-full min-h-screen bg-[#000000] overflow-hidden flex items-center justify-center py-0 z-10"
    >
      {/* 
        Stage Container:
        Houses both the animated 3D orbital bubbles and the central headline with true CSS 3D depth and zIndex sorting.
      */}
      <div
        style={{
          perspective: 1200,
          transformStyle: "preserve-3d",
          transform: "scale(min(1, calc(100vh / 950)))",
          transformOrigin: "center center",
        }}
        className="relative w-full max-w-7xl mx-auto flex items-center justify-center min-h-screen px-4"
      >
        {/* Animated Brand Bubbles revolving in a continuous diagonal 3D tilted orbit */}
        <div
          className="absolute inset-0 pointer-events-none -translate-y-16 sm:-translate-y-24 md:-translate-y-32"
          style={{ transformStyle: "preserve-3d" }}
        >
          {bubbles.map((b) => (
            <OrbitalBubble
              key={b.id}
              config={b}
              time={time}
              rx={dimensions.rx}
              ry={dimensions.ry}
              verticalOffset={dimensions.verticalOffset}
              tiltAngle={dimensions.tiltAngle}
              scaleFactor={dimensions.scaleFactor}
            />
          ))}
        </div>

        {/* 
          Central Headline:
          Set strictly at zIndex: 20 with translateZ(0px).
          Bubbles in front (z > 0) have dynamic zIndex: 50 and translateZ(+180px) (render strictly IN FRONT of the text).
          Bubbles in back (z <= 0) have dynamic zIndex: 10 and translateZ(-180px) (render strictly BEHIND the text).
        */}
        <div
          style={{ zIndex: 20, transform: "translateZ(0px)" }}
          className="relative pointer-events-none text-center select-none max-w-5xl mx-auto"
        >
          <h2
            className="text-[#FFFFFF] text-center leading-[0.88] tracking-[-0.035em] flex flex-col items-center justify-center drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]"
            style={{
              fontFamily: "'Champ', 'Playfair Display', Georgia, serif",
              fontSize: "clamp(3.5rem, 7.5vw, 7.5rem)",
              fontWeight: 900,
            }}
          >
            <span className="block">The</span>
            <span className="block">World's Most</span>
            <span className="block">Ambitious</span>
            <span className="block">Brands</span>
            <span className="block">Choose</span>
            <span className="block">to Work With</span>
            <span className="block">Me.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
