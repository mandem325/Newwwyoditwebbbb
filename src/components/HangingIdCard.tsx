import React, { useEffect, useRef, useState } from "react";

interface HangingIdCardProps {
  imageSrc?: string;
  onCardClick?: () => void;
  onMonogramClick?: () => void;
  className?: string;
}

export const HangingIdCard: React.FC<HangingIdCardProps> = ({
  imageSrc = "/lv_0_20261002185044.jpg",
  onCardClick,
  onMonogramClick,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hangingAssemblyRef = useRef<HTMLDivElement>(null);

  // Height of the lanyard strap in laptop view (from tip-top of section down to the clip)
  const [laptopRopeLength, setLaptopRopeLength] = useState(240);
  const [isLaptop, setIsLaptop] = useState(() => typeof window !== "undefined" && window.innerWidth >= 1024);

  // Mobile shake and tilt physics state
  const mobilePhysics = useRef({
    angle: 0,
    angleVel: 0,
    tiltY: 0,
    lastAccX: 0,
    lastAccY: 0,
    lastTime: performance.now(),
  });

  // Calculate the exact distance from the tip-top of the section to the card clip on laptop
  useEffect(() => {
    const updateMeasurements = () => {
      const laptop = window.innerWidth >= 1024;
      setIsLaptop(laptop);

      if (laptop && containerRef.current) {
        const sectionEl =
          containerRef.current.closest<HTMLElement>("#aardvark-book-club-replica") ||
          containerRef.current.closest<HTMLElement>("[data-custom-scroll]") ||
          containerRef.current.parentElement;

        if (sectionEl) {
          const sectionRect = sectionEl.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          // Distance from section top rim down to where the card clip sits in the container
          const distToContainerTop = Math.max(120, containerRect.top - sectionRect.top);
          // The card sits with its top at 40px inside the container, so clip is at 40px
          setLaptopRopeLength(distToContainerTop + 40);
        } else {
          setLaptopRopeLength(240);
        }
      }
    };

    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);

    return () => {
      window.removeEventListener("resize", updateMeasurements);
    };
  }, []);

  // Stable mobile layout without erratic gyro shaking or continuous reflow
  useEffect(() => {
    if (hangingAssemblyRef.current) {
      hangingAssemblyRef.current.style.transform = "none";
    }
  }, []);

  // Standard rope lengths
  const mobileRopeLength = 70;
  const currentRopeLength = isLaptop ? laptopRopeLength : mobileRopeLength;

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex justify-center select-none overflow-visible ${className}`}
      style={{
        minHeight: isLaptop ? "520px" : "480px",
      }}
    >
      {/* 
        UNIFIED HANGING ASSEMBLY:
        The top anchor, lanyard strap, metallic clip, and ID card all live inside 
        this single physical container. In mobile view, shake motion rotates this 
        entire container around its top center (0, 0), so the rope and card CAN NEVER DETACH!
      */}
      <div
        ref={hangingAssemblyRef}
        className="relative flex flex-col items-center will-change-transform"
        style={{
          transformOrigin: "center 0px",
          marginTop: isLaptop ? `-${laptopRopeLength - 40}px` : "0px",
        }}
      >
        {/* 1. TOP ANCHOR BRACKET (Clamped to section rim in laptop view, container top in mobile) */}
        <div className="relative z-30 flex flex-col items-center pointer-events-none">
          {/* Wall/Header Bracket Anchor */}
          <div className="w-16 h-4 bg-gradient-to-b from-[#1a141a] via-[#2f1c2d] to-[#452842] rounded-b-md shadow-[0_6px_16px_rgba(0,0,0,0.65)] border-t-2 border-amber-300/40 flex items-center justify-around px-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#111] shadow-inner" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#111] shadow-inner" />
          </div>
          {/* Steel Eyelet Ring */}
          <div className="w-5 h-5 -mt-1 rounded-full border-2 border-[#d4af37] bg-gradient-to-br from-[#ffd700] via-[#c59b27] to-[#8a6508] shadow-md flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#1a141a] shadow-inner" />
          </div>
        </div>

        {/* 2. THE LANYARD STRAP (Directly connects the top anchor ring to the metal clip) */}
        <div
          className="relative w-full flex justify-center"
          style={{ height: `${currentRopeLength}px` }}
        >
          <svg
            className="w-8 h-full overflow-visible pointer-events-none"
            style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.45))" }}
          >
            <defs>
              <pattern
                id="lanyardRibbedWeave"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="8" height="4" fill="#8b1856" />
                <rect y="4" width="8" height="4" fill="#6d1042" />
                <line
                  x1="0"
                  y1="0"
                  x2="8"
                  y2="0"
                  stroke="#f472b6"
                  strokeWidth="0.75"
                  opacity="0.6"
                />
              </pattern>
              <linearGradient id="goldHardwareGradUnified" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff2a8" />
                <stop offset="40%" stopColor="#e5b838" />
                <stop offset="80%" stopColor="#9e7412" />
                <stop offset="100%" stopColor="#ffe680" />
              </linearGradient>
            </defs>

            {/* Shadow Ribbon */}
            <line
              x1="16"
              y1="0"
              x2="16"
              y2={currentRopeLength}
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Woven Lanyard Ribbon */}
            <line
              x1="16"
              y1="0"
              x2="16"
              y2={currentRopeLength}
              stroke="url(#lanyardRibbedWeave)"
              strokeWidth="11"
              strokeLinecap="round"
            />

            {/* Golden Stitched Borders */}
            <line
              x1="16"
              y1="0"
              x2="16"
              y2={currentRopeLength}
              stroke="#ffd166"
              strokeWidth="1.2"
              strokeDasharray="4 2"
              opacity="0.85"
            />

            {/* Safety Breakaway Buckle at Mid-Point */}
            <g transform={`translate(16, ${currentRopeLength * 0.45})`}>
              <rect
                x="-7"
                y="-5"
                width="14"
                height="10"
                rx="2.5"
                fill="#18131c"
                stroke="url(#goldHardwareGradUnified)"
                strokeWidth="1.2"
              />
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#fca311" strokeWidth="1" />
            </g>
          </svg>
        </div>

        {/* 3. METALLIC SWIVEL CLIP & ID CARD HOLDER (Physically interconnected seamlessly) */}
        <div className="relative flex flex-col items-center -mt-1">
          {/* THE METALLIC LOBSTER CLAW CLIP (Hooks directly into the vinyl hole) */}
          <div className="relative z-20 flex flex-col items-center -mb-3 pointer-events-none">
            <svg
              width="24"
              height="36"
              viewBox="0 0 24 36"
              className="overflow-visible"
              style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }}
            >
              <defs>
                <linearGradient id="metalChromeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#cbd5e1" />
                  <stop offset="50%" stopColor="#64748b" />
                  <stop offset="75%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>

              {/* Swivel Top Ring connected to Lanyard */}
              <circle
                cx="12"
                cy="6"
                r="5"
                fill="none"
                stroke="url(#metalChromeGrad)"
                strokeWidth="2.5"
              />

              {/* Swivel Collar Body */}
              <path
                d="M 8 7 L 16 7 L 15 13 L 9 13 Z"
                fill="url(#metalChromeGrad)"
                stroke="#1e293b"
                strokeWidth="0.5"
              />

              {/* Lobster Carabiner Claw Body */}
              <path
                d="M 8 13 C 6 18, 7 24, 12 28 C 17 24, 18 18, 16 13 C 14 12, 10 12, 8 13 Z"
                fill="url(#metalChromeGrad)"
                stroke="#0f172a"
                strokeWidth="0.8"
              />

              {/* Spring Gate Lever */}
              <path
                d="M 10.5 17 L 13.5 24"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Hook Tip that visibly loops INTO the slot hole */}
              <path
                d="M 12 26 C 12 30, 10 33, 12 35 C 14 33, 12 30, 12 26 Z"
                fill="#cbd5e1"
                stroke="#334155"
                strokeWidth="0.75"
              />

              {/* Center Rivet */}
              <circle cx="12" cy="19" r="1.8" fill="#f8fafc" stroke="#475569" strokeWidth="0.5" />
            </svg>
          </div>

          {/* THE ID CARD BADGE (Directly held by the clip) */}
          <div
            ref={cardRef}
            className="relative w-[270px] sm:w-[290px] md:w-[310px] z-10 select-none flex flex-col items-center"
          >
            {/* CLEAR VINYL BADGE HOLDER TOP TAB WITH HORIZONTAL SLOT HOLE */}
            <div className="w-[180px] h-[34px] rounded-t-xl bg-white/20 backdrop-blur-md border border-white/40 border-b-0 shadow-sm flex items-center justify-center relative overflow-hidden">
              {/* Gloss reflection on vinyl pouch */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none" />

              {/* THE PUNCH HOLE (The metal hook passes directly through here) */}
              <div className="w-12 h-3.5 rounded-full bg-[#0a080d] border-2 border-white/60 shadow-inner flex items-center justify-center relative">
                {/* The metallic hook loop showing through the hole */}
                <div className="w-4 h-2 rounded-sm bg-gradient-to-r from-slate-200 to-slate-400 border border-slate-600 shadow-sm" />
              </div>

              {/* Left & Right Reinforcement Eyelets */}
              <div className="absolute left-3.5 w-2 h-2 rounded-full border border-white/40 bg-black/20" />
              <div className="absolute right-3.5 w-2 h-2 rounded-full border border-white/40 bg-black/20" />
            </div>

            {/* MAIN ID BADGE CASING & PHOTO CARD (CLEAN WITHOUT ANY TEXT) */}
            <div
              onClick={onCardClick}
              className="relative w-full rounded-2xl bg-[#0f0e14] p-2.5 sm:p-3 shadow-[0_28px_60px_-12px_rgba(0,0,0,0.7),0_12px_24px_-6px_rgba(0,0,0,0.5)] border-2 border-white/30 backdrop-blur-lg group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Vinyl Holder Seam Border */}
              <div className="absolute inset-0 rounded-2xl border border-white/15 pointer-events-none" />

              {/* MAIN IMAGE PHOTO CONTAINER */}
              <div className="relative aspect-[1/1.38] w-full rounded-xl overflow-hidden bg-black shadow-inner border border-white/20">
                <img
                  src={imageSrc}
                  alt="Featured Card"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src =
                      "/Pensatori_Irrazionali_ChatGPT_Image_Aug_12__2026__08_no_bg (2).png";
                  }}
                />

                {/* Static subtle glass reflection overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/20 via-transparent to-white/10 opacity-75" />
              </div>
            </div>

            {/* FLOATING CIRCULAR MONOGRAM EMBLEM */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onMonogramClick?.();
              }}
              className="absolute -bottom-3 -right-3 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center justify-center p-1.5 border-2 border-[#8b1856]/20 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
              title="Overview"
            >
              <div className="w-full h-full rounded-full bg-[#8b1856] text-white flex items-center justify-center font-serif font-black text-sm sm:text-base shadow-inner">
                YD
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
