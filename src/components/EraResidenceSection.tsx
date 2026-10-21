import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ApartmentUnit {
  id: string;
  name: string;
  tier: string;
  sqm: number;
  bedrooms: number;
  bathrooms: number;
  orientation: string;
  floor: string;
  features: string[];
  price: string;
  image: string;
}

const APARTMENTS_DATA: ApartmentUnit[] = [
  {
    id: "safe-spaces-a",
    name: "Adolescent Girls Safe Spaces",
    tier: "Initiative 01 · Refugee & Host Communities",
    sqm: 12000,
    bedrooms: 12,
    bathrooms: 4,
    orientation: "Gambella & Benishangul-Gumuz",
    floor: "Field Phase I",
    features: [
      "Adolescent SRHR & Menstrual Hygiene Management",
      "Peer-to-Peer Life Skills Facilitation",
      "GBV Survivor Safe Referrals & Psychosocial Support",
      "Community Elder & Religious Leader Engagement",
    ],
    price: "12,000+ Girls Reached",
    image: "/gallery/IMG_20260922_185916_101.jpg",
  },
  {
    id: "youth-empowerment-b",
    name: "Youth Economic Livelihoods",
    tier: "Initiative 02 · Urban Skills & Mentorship",
    sqm: 4500,
    bedrooms: 8,
    bathrooms: 3,
    orientation: "Addis Ababa & Regional Hubs",
    floor: "Field Phase II",
    features: [
      "Vocational Mentorship & Financial Literacy",
      "Seed Capital Grants for Young Women Entrepreneurs",
      "FAWE Alumni Network Leadership Circles",
      "Digital Skills & Market Linkage Platforms",
    ],
    price: "4,500+ Youth Mentored",
    image: "/gallery/IMG_20260922_185849_390.jpg",
  },
  {
    id: "safeguarding-psea-c",
    name: "Institutional Safeguarding & PSEA",
    tier: "Initiative 03 · Consortia Governance",
    sqm: 35,
    bedrooms: 6,
    bathrooms: 2,
    orientation: "National Consortia",
    floor: "National Scale",
    features: [
      "UNHCR & INGO PSEA Compliance Audits",
      "Multi-Agency Coordination & Policy Frameworks",
      "Community Accountability Feedback Mechanisms",
      "Training for Field Staff & Camp Coordinators",
    ],
    price: "35+ Partner Agencies",
    image: "/gallery/IMG_20260922_185937_614.jpg",
  },
];

export function EraResidenceSection({ children }: { children?: React.ReactNode } = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const heroCaptionRef = useRef<HTMLDivElement>(null);
  const darkLayerRef = useRef<HTMLDivElement>(null);
  const titleStageRef = useRef<HTMLDivElement>(null);
  const editorialStageRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const card1ImgRef = useRef<HTMLImageElement>(null);
  const card2ImgRef = useRef<HTMLImageElement>(null);
  const editorialHeadingRef = useRef<HTMLHeadingElement>(null);
  const editorialParagraphRef = useRef<HTMLParagraphElement>(null);
  const magneticCircleRef = useRef<HTMLButtonElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  const [activeCounter, setActiveCounter] = useState<string>("00");
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [selectedApartment, setSelectedApartment] = useState<ApartmentUnit | null>(null);
  const [isApartmentDrawerOpen, setIsApartmentDrawerOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Magnetic button motion
  const [circleOffset, setCircleOffset] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    setCircleOffset({ x, y });
  };

  const handleMagneticLeave = () => {
    setCircleOffset({ x: 0, y: 0 });
  };

  useGSAP(
    () => {
      if (!containerRef.current || !pinContainerRef.current || !darkLayerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Master scroll timeline with pinned viewport
        // Total scroll distance gives ample time to first view the hero image completely
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () =>
              `+=${darkLayerRef.current?.offsetHeight || 1800}`,
            pin: pinContainerRef.current,
            scrub: 0.8,
            anticipatePin: 0,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (progressBarRef.current) {
                progressBarRef.current.style.height = `${Math.min(100, Math.max(12, p * 100))}%`;
              }

              // Update dynamic left rail counter only when changing phase
              const nextCounter =
                p < 0.18
                  ? "00"
                  : p < 0.32
                    ? "01"
                    : p < 0.45
                      ? "02"
                      : p < 0.56
                        ? "03"
                        : p < 0.70
                          ? "04"
                          : p < 0.84
                            ? "05"
                            : "06";

              setActiveCounter((prev) => (prev !== nextCounter ? nextCounter : prev));
            },
          },
        });

        // Ensure the dark layer starts completely below the pinned viewport
        gsap.set(darkLayerRef.current, { y: () => window.innerHeight + 120 });
        if (heroLayerRef.current) gsap.set(heroLayerRef.current, { opacity: 1 });
        if (heroCaptionRef.current) gsap.set(heroCaptionRef.current, { opacity: 1, y: 0 });
        if (hudRef.current) gsap.set(hudRef.current, { opacity: 1 });

        // PHASE 1: HERO IMAGE IS FULLY SEEN (0 to 1.5)
        // The hero pool villa image is completely unobstructed, 100% static, and held in full view.
        // The dark layer is firmly held off-screen below the viewport throughout Phase 1.
        masterTl.fromTo(
          darkLayerRef.current,
          { y: () => window.innerHeight + 150 },
          { y: () => window.innerHeight + 150, duration: 1.5, ease: "none" },
          0,
        );

        // PHASE 2: DIV COMPONENT OVERLAPS HERO IMAGE (1.5 to 3.7)
        // Only AFTER the image has been fully viewed does the dark curved dome slide up over it.
        masterTl.to(
          darkLayerRef.current,
          {
            y: 0,
            duration: 2.2,
            ease: "none",
          },
          1.5,
        );

        // Gracefully fade out hero caption as the dark dome ascends
        if (heroCaptionRef.current) {
          masterTl.to(
            heroCaptionRef.current,
            {
              opacity: 0,
              y: -30,
              duration: 1.2,
              ease: "power2.out",
            },
            1.5,
          );
        }

        // Seamlessly fade out hero image only AFTER the curved dome has fully scrolled past the top
        if (heroLayerRef.current) {
          masterTl.to(
            heroLayerRef.current,
            {
              opacity: 0,
              duration: 0.5,
              ease: "power1.out",
            },
            4.6,
          );
        }

        // PHASE 3: EDITORIAL SHOWCASE & FOOTER SCROLL UP (3.7 to 7.2)
        // Continuous, single-gesture scroll with ZERO border or breaks
        masterTl
          .to(
            darkLayerRef.current,
            {
              y: () => {
                const darkHeight = darkLayerRef.current?.offsetHeight || window.innerHeight;
                return -(darkHeight - window.innerHeight);
              },
              duration: 3.5,
              ease: "none",
            },
            3.7,
          )
          .fromTo(leftCardRef.current, { y: 80 }, { y: -40, duration: 2.2, ease: "none" }, 3.7)
          .fromTo(rightCardRef.current, { y: 40 }, { y: -25, duration: 2.2, ease: "none" }, 3.7);

        // Parallax animation for Image 1 & Image 2 (active during editorial showcase scroll)
        if (card1ImgRef.current) {
          masterTl.fromTo(
            card1ImgRef.current,
            { yPercent: -18 },
            { yPercent: 18, duration: 2.2, ease: "none" },
            3.7,
          );
        }
        if (card2ImgRef.current) {
          masterTl.fromTo(
            card2ImgRef.current,
            { yPercent: -15 },
            { yPercent: 15, duration: 2.2, ease: "none" },
            3.7,
          );
        }

        // Kinetic text reveal animation for Editorial Statement as it scrolls into view
        const edLines = containerRef.current?.querySelectorAll(".editorial-line");
        if (edLines && edLines.length > 0) {
          masterTl.fromTo(
            edLines,
            { yPercent: 115, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: "power3.out" },
            4.1,
          );
        }
        if (editorialParagraphRef.current) {
          masterTl.fromTo(
            editorialParagraphRef.current,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
            4.4,
          );
        }

        // Smoothly fade out HUD elements as the page approaches the footer
        if (hudRef.current) {
          masterTl.to(
            hudRef.current,
            {
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            5.4,
          );
        }

      });

      mm.add("(max-width: 767px)", () => {
        // Mobile smooth scroll timeline with pinning
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () =>
              `+=${darkLayerRef.current?.offsetHeight || 1600}`,
            pin: pinContainerRef.current,
            scrub: 0.8,
            anticipatePin: 0,
            fastScrollEnd: true,
            preventOverlaps: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (progressBarRef.current) {
                progressBarRef.current.style.height = `${Math.min(100, Math.max(12, p * 100))}%`;
              }
              const step = Math.min(8, Math.floor(p * 9));
              setActiveCounter(step.toString().padStart(2, "0"));
            },
          },
        });

        // Ensure the dark layer starts completely below the viewport
        gsap.set(darkLayerRef.current, { y: () => window.innerHeight + 120 });
        if (heroLayerRef.current) gsap.set(heroLayerRef.current, { opacity: 1 });
        if (heroCaptionRef.current) gsap.set(heroCaptionRef.current, { opacity: 1, y: 0 });
        if (hudRef.current) gsap.set(hudRef.current, { opacity: 1 });

        // Phase 1: Hero image fully seen and static
        mobileTl.fromTo(
          darkLayerRef.current,
          { y: () => window.innerHeight + 150 },
          { y: () => window.innerHeight + 150, duration: 1.3, ease: "none" },
          0,
        );

        // Phase 2: Dark div overlaps hero image
        mobileTl.to(darkLayerRef.current, { y: 0, duration: 2.2, ease: "none" }, 1.3);

        if (heroCaptionRef.current) {
          mobileTl.to(
            heroCaptionRef.current,
            {
              opacity: 0,
              y: -20,
              duration: 1.0,
              ease: "power2.out",
            },
            1.3,
          );
        }

        // Seamlessly fade out hero image only AFTER the curved dome has fully scrolled past the top
        if (heroLayerRef.current) {
          mobileTl.to(
            heroLayerRef.current,
            {
              opacity: 0,
              duration: 0.5,
              ease: "power1.out",
            },
            4.5,
          );
        }

        // Phase 3: Editorial content & footer
        mobileTl.to(
          darkLayerRef.current,
          {
            y: () => {
              const darkHeight = darkLayerRef.current?.offsetHeight || window.innerHeight;
              return -(darkHeight - window.innerHeight);
            },
            duration: 3.5,
            ease: "none",
          },
          3.5,
        );

        if (card1ImgRef.current) {
          mobileTl.fromTo(
            card1ImgRef.current,
            { yPercent: -15 },
            { yPercent: 15, duration: 2.2, ease: "none" },
            3.5,
          );
        }
        if (card2ImgRef.current) {
          mobileTl.fromTo(
            card2ImgRef.current,
            { yPercent: -12 },
            { yPercent: 12, duration: 2.2, ease: "none" },
            3.5,
          );
        }
        const mobileEdLines = containerRef.current?.querySelectorAll(".editorial-line");
        if (mobileEdLines && mobileEdLines.length > 0) {
          mobileTl.fromTo(
            mobileEdLines,
            { yPercent: 115, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: "power3.out" },
            4.0,
          );
        }
        if (editorialParagraphRef.current) {
          mobileTl.fromTo(
            editorialParagraphRef.current,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            4.3,
          );
        }

        if (hudRef.current) {
          mobileTl.to(
            hudRef.current,
            {
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            5.0,
          );
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      data-custom-scroll="true"
      id="era-residence"
      className="relative w-full bg-[#0b0806] text-[#ebd5c5] overflow-hidden select-none z-30 border-none outline-none shadow-none"
    >
      {/* Top white background extension matching the section above to seamlessly frame rounded corners */}
      <div className="absolute top-0 left-0 w-full h-32 bg-white z-0 pointer-events-none" />

      {/* ---------------- PINNED VIEWPORT STAGE ---------------- */}
      <div
        ref={pinContainerRef}
        className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#0b0806] z-20 border-none outline-none rounded-t-[32px] sm:rounded-t-[48px] md:rounded-t-[64px]"
      >
        {/* ================= PERSISTENT FIXED-RAIL HUD OVERLAY ================= */}
        <div ref={hudRef} className="pointer-events-none transition-opacity duration-500">
          {/* Top Left: Rotating Circular Logo Badge */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 z-40 flex items-center gap-4 pointer-events-auto">
            <div className="relative w-14 h-14 md:w-18 md:h-18 flex items-center justify-center group cursor-pointer">
              {/* Rotating Text Ring */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite] group-hover:animate-[spin_8s_linear_infinite] transition-all duration-700"
              >
                <path
                  id="eraCirclePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[7.5px] uppercase tracking-[0.28em] fill-[#ebd5c5]/85 font-sans font-medium">
                  <textPath href="#eraCirclePath" startOffset="0%">
                    YODIT DEJENE • ADVOCACY & SRHR •
                  </textPath>
                </text>
              </svg>

              {/* Center Floral / 4-petal Star Icon */}
              <div className="relative z-10 w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-[#ebd5c5] group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current opacity-90">
                  <path d="M12 2C12 7.523 7.523 12 2 12C7.523 12 12 16.477 12 22C12 16.477 16.477 12 22 12C16.477 12 12 7.523 12 2Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Far Left Vertical Rail: Dynamic Counter and SCROLL Indicator */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-4 pointer-events-none"
          >
            {/* Dynamic Counter */}
            <div className="text-xs md:text-sm font-mono tracking-widest text-[#ebd5c5]/90 font-medium">
              {activeCounter}
            </div>

            {/* Vertical Track Line */}
            <div className="w-[1px] h-16 md:h-24 bg-[#ebd5c5]/25 relative overflow-hidden">
              <div
                ref={progressBarRef}
                className="w-full bg-[#ebd5c5] transition-all duration-150 ease-out"
                style={{ height: "12%" }}
              />
            </div>

            {/* Vertical SCROLL label */}
            <div className="text-[9px] md:text-[10px] uppercase font-mono tracking-[0.35em] text-[#ebd5c5]/60 [writing-mode:vertical-rl] rotate-180">
              Scroll
            </div>
          </motion.div>
        </div>

        {/* ================= LAYER 1: DUSK POOL VILLA HERO ================= */}
        <div
          ref={heroLayerRef}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden flex items-center justify-center bg-[#0b0806] rounded-t-[32px] sm:rounded-t-[48px] md:rounded-t-[64px]"
        >
          <img
            ref={heroBgRef}
            src="/fwip-textured-1000407779.png"
            alt="Era Residence Luxury Mediterranean Architecture with Pool at Dusk"
            referrerPolicy="no-referrer"
            className="era-residence-stretch-img w-full h-full object-cover object-center sm:object-fill rounded-t-[32px] sm:rounded-t-[48px] md:rounded-t-[64px]"
          />
          {/* Maintained ref without text overlay */}
          <div ref={heroCaptionRef} className="hidden" aria-hidden="true" />

          {/* Top-Left Corner Curve with white background matching above section */}
          <div className="absolute top-0 left-0 z-20 pointer-events-none select-none">
            <svg
              className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white fill-current block"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <path d="M 0,0 L 64,0 A 64 64 0 0 0 0,64 Z" fill="white" />
            </svg>
          </div>

          {/* Top-Right Corner Curve with white background matching above section */}
          <div className="absolute top-0 right-0 z-20 pointer-events-none select-none">
            <svg
              className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white fill-current block"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <path d="M 64,0 L 0,0 A 64 64 0 0 1 64,64 Z" fill="white" />
            </svg>
          </div>

          {/* Top Architectural White Notch matching the white background of the above section */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-start justify-center pointer-events-none select-none">
            <svg
              className="w-48 sm:w-56 md:w-64 h-6 sm:h-7 md:h-8 text-white fill-current block"
              viewBox="0 -2 170 30"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 0,-2 L 0,0 A 13 13 0 0 1 13,13 A 13 13 0 0 0 26,26 L 144,26 A 13 13 0 0 0 157,13 A 13 13 0 0 1 170,0 L 170,-2 Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* ================= LAYER 2: THE CURVED DARK SECTION ================= */}
        {/* This layer translates up over the hero. Its top forms a perfect semicircle dome that frames the text. */}
        {/* As you continue scrolling, the dome naturally slides up and out of the viewport, filling the screen with the dark background. */}
        <div
          ref={darkLayerRef}
          style={{ transform: "translateY(calc(100vh + 150px))" }}
          className="absolute top-0 left-0 w-full z-20 will-change-transform pointer-events-auto rounded-t-[100vw] sm:rounded-t-[50vw] md:rounded-t-[800px] rounded-b-none overflow-hidden [backface-visibility:hidden] border-none outline-none shadow-none"
        >
          {/* Solid Dark Container Body */}
          <div className="w-full bg-[#0b0806] text-[#ebd5c5] relative border-none outline-none">
            {/* Fine luxury noise grain texture */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
              style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
            />

            {/* Ambient Warm Glow (Radial Gradient avoids Safari blur bounding-box bugs) */}
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(235, 213, 197, 0.04) 0%, transparent 60%)",
              }}
            />

            {/* ---------------- SUB-STAGE 1: "THE SPACE TO Live in" ---------------- */}
            {/* Sits right below the arch dome curve, occupying a full viewport height */}
            <div
              ref={titleStageRef}
              className="relative z-10 w-full h-screen min-h-[640px] flex flex-col items-center justify-center text-center px-6 select-none"
            >
              {/* "THE" */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-editorial text-[16vw] sm:text-[14vw] md:text-[11vw] lg:text-[9.5vw] font-normal tracking-[-0.01em] uppercase leading-[0.84] text-[#ebd5c5] scale-y-[1.12]"
              >
                THE
              </motion.h1>

              {/* "SPACE" */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="font-editorial text-[16vw] sm:text-[14vw] md:text-[11vw] lg:text-[9.5vw] font-normal tracking-[-0.01em] uppercase leading-[0.84] text-[#ebd5c5] scale-y-[1.12]"
              >
                SPACE
              </motion.h1>

              {/* "TO" */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="font-editorial text-[16vw] sm:text-[14vw] md:text-[11vw] lg:text-[9.5vw] font-normal tracking-[-0.01em] uppercase leading-[0.84] text-[#ebd5c5] scale-y-[1.12]"
              >
                TO
              </motion.h1>

              {/* "Empower" in exquisite calligraphic script */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -8 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3.5 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-script text-[18vw] sm:text-[16vw] md:text-[13vw] lg:text-[11.5vw] text-[#ebd5c5] font-normal leading-[0.75] mt-1 md:mt-2 tracking-normal drop-shadow-[0_4px_30px_rgba(235,213,197,0.18)]"
              >
                Empower
              </motion.div>
            </div>

            {/* ---------------- SUB-STAGE 2: EDITORIAL ARCHITECTURE SHOWCASE ---------------- */}
            {/* Directly follows "THE SPACE TO Live in" in continuous scroll */}
            <div
              ref={editorialStageRef}
              className="relative z-10 w-full min-h-screen flex flex-col justify-center pt-8 pb-16 md:pb-24 px-6 sm:px-12 md:px-20 lg:px-28 max-w-[1700px] mx-auto border-none outline-none"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-8 items-center w-full my-auto relative">
                {/* Left: Main Vertical Image & Text */}
                <div className="lg:col-span-5 flex flex-col relative z-10" ref={leftCardRef}>
                  {/* Elegant Numbering */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6, y: 15 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#ebd5c5]/40 font-serif italic text-4xl mb-6"
                  >
                    01
                  </motion.div>

                  {/* Photo Card 1 */}
                  <div className="group relative w-full aspect-[4/5] overflow-hidden bg-[#0b0806] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    <img
                      ref={card1ImgRef}
                      src="/gallery/IMG_20260922_185849_390.jpg"
                      alt="Field Operations"
                      referrerPolicy="no-referrer"
                      className="absolute -top-[20%] left-0 w-full h-[140%] object-cover object-center will-change-transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />
                    <div className="absolute top-6 left-6 flex flex-col gap-1 text-white mix-blend-overlay pointer-events-none z-10">
                      <motion.span
                        initial={{ opacity: 0, y: -10, letterSpacing: "0.5em" }}
                        whileInView={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-mono text-[9px] uppercase inline-block"
                      >
                        Field Ops
                      </motion.span>
                    </div>
                  </div>

                  {/* Elegant specification list */}
                  <div className="mt-10 flex flex-col gap-6">
                    <div className="h-[1px] w-full bg-gradient-to-r from-[#ebd5c5]/20 to-transparent" />
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                      <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[10px] font-mono tracking-[0.25em] text-[#ebd5c5]/50 uppercase"
                      >
                        Core Pillars
                      </motion.div>
                      <div className="sm:text-right">
                        <ul className="text-[11px] md:text-xs font-mono font-light tracking-widest uppercase flex flex-col gap-2 text-[#ebd5c5]/80">
                          <motion.li
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            Adolescent SRHR Education
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                          >
                            Gender Equality & Safeguarding
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            Youth Leadership Dialogues
                          </motion.li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Typography & Horizontal Image */}
                <div
                  className="lg:col-span-7 flex flex-col justify-center h-full pt-0 lg:pt-12 relative z-20"
                  ref={rightCardRef}
                >
                  {/* Editorial Statement overlapping left column */}
                  <div className="flex flex-col gap-8 lg:-ml-20 xl:-ml-32 z-20 relative">
                    <h3
                      ref={editorialHeadingRef}
                      className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-light leading-[1.08] tracking-tight text-[#ebd5c5] max-w-[900px] drop-shadow-lg flex flex-col gap-1 overflow-visible"
                      style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
                    >
                      <span className="overflow-hidden block py-0.5">
                        <span className="editorial-line block will-change-transform">
                          EVERY INITIATIVE IS DESIGNED
                        </span>
                      </span>
                      <span className="overflow-hidden block py-0.5">
                        <span className="editorial-line block will-change-transform">
                          TO CREATE COMMUNITIES THAT ARE
                        </span>
                      </span>
                      <span className="overflow-hidden block py-0.5">
                        <span className="editorial-line block will-change-transform">
                          <span className="italic font-normal text-white">RESILIENT</span>,
                          EQUITABLE AND{" "}
                          <span className="italic font-normal text-white">EMPOWERED TO LEAD.</span>
                        </span>
                      </span>
                    </h3>
                    <div className="overflow-hidden">
                      <p
                        ref={editorialParagraphRef}
                        className="text-sm md:text-base font-sans font-light leading-[1.8] text-[#ebd5c5]/70 max-w-md lg:ml-auto lg:mr-12 xl:mr-24 will-change-transform"
                      >
                        Evidence-based capacity building modules. Standardized case management and
                        PSEA safeguarding protocols. Multi-agency alignment across UNHCR, USAID, and
                        local civil society organizations.
                      </p>
                    </div>
                  </div>

                  {/* Photo Card 2 */}
                  <div className="group relative w-full lg:w-[85%] ml-auto aspect-[16/9] overflow-hidden bg-[#0b0806] shadow-[0_30px_60px_rgba(0,0,0,0.6)] mt-12 lg:mt-16">
                    <img
                      ref={card2ImgRef}
                      src="/gallery/IMG_20260922_185916_101.jpg"
                      alt="Panoramic Balcony Deck"
                      referrerPolicy="no-referrer"
                      className="absolute -top-[20%] left-0 w-full h-[140%] object-cover object-center will-change-transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none" />

                    {/* Floating number */}
                    <div className="absolute bottom-6 left-6 text-white/90 pointer-events-none z-10">
                      <motion.span
                        initial={{ opacity: 0, y: 15, letterSpacing: "0.5em" }}
                        whileInView={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-mono text-[9px] uppercase inline-block"
                      >
                        Policy & Consortia
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL 1: APARTMENT SELECTOR DRAWER ================= */}
      <AnimatePresence>
        {isApartmentDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsApartmentDrawerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#161713] border border-white/15 rounded-xs p-6 md:p-10 text-[#ebd5c5] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#ebd5c5]/60">
                    Yodit Dejene · Strategic Portfolios
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-tight text-white">
                    Featured Core Initiatives
                  </h2>
                </div>
                <button
                  onClick={() => setIsApartmentDrawerOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 overflow-y-auto flex-1">
                {APARTMENTS_DATA.map((apt) => (
                  <div
                    key={apt.id}
                    className="group flex flex-col justify-between border border-white/10 bg-[#1a1c16] p-5 rounded-xs hover:border-white/40 transition-all duration-300"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xs border border-white/10">
                        <img
                          src={apt.image}
                          alt={apt.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-white border border-white/10">
                          {apt.floor}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#ebd5c5]/60">
                          {apt.tier}
                        </span>
                        <h4 className="font-serif text-lg text-white font-medium">{apt.name}</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono py-2 border-y border-white/10 text-[#ebd5c5]/80">
                        <div>Size: {apt.sqm} m²</div>
                        <div>Bedrooms: {apt.bedrooms}</div>
                        <div>Baths: {apt.bathrooms}</div>
                        <div>{apt.orientation}</div>
                      </div>

                      <ul className="text-[10px] font-sans text-[#ebd5c5]/70 flex flex-col gap-1">
                        {apt.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-white">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="font-serif text-lg text-white font-medium">{apt.price}</div>
                      <button
                        onClick={() => {
                          setSelectedApartment(apt);
                          setIsApartmentDrawerOpen(false);
                          setIsBookingModalOpen(true);
                        }}
                        className="text-[10px] font-mono uppercase tracking-widest px-3 py-2 border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all cursor-pointer"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL 2: BOOK A CALL / INQUIRY ================= */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsBookingModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#161713] border border-white/15 rounded-xs p-8 text-[#ebd5c5] flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#ebd5c5]/60">
                    Concierge & Sales Office
                  </span>
                  <h3 className="font-serif text-2xl font-light uppercase tracking-tight text-white">
                    Book A Private Consultation
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setBookingSubmitted(false);
                  }}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {bookingSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white">
                    <Check size={28} />
                  </div>
                  <h4 className="font-serif text-xl text-white">Consultation Request Received</h4>
                  <p className="text-xs text-[#ebd5c5]/75 max-w-sm font-sans leading-relaxed">
                    Our sales concierge will reach out within 2 hours to confirm your private
                    appointment and share the comprehensive architectural dossier.
                  </p>
                  <button
                    onClick={() => {
                      setIsBookingModalOpen(false);
                      setBookingSubmitted(false);
                    }}
                    className="mt-4 text-[10px] font-mono uppercase tracking-widest px-6 py-2.5 bg-white text-black font-medium hover:bg-[#ebd5c5] transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingSubmitted(true);
                  }}
                  className="flex flex-col gap-4 pt-6"
                >
                  {selectedApartment && (
                    <div className="p-3 bg-white/5 border border-white/10 text-xs font-mono text-white/90 rounded-xs flex items-center justify-between">
                      <span>Inquiring about: {selectedApartment.name}</span>
                      <span className="text-[#ebd5c5]">{selectedApartment.price}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#ebd5c5]/70">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Yodit Dejene"
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/15 focus:border-white rounded-xs text-sm text-white placeholder:text-white/20 outline-hidden transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#ebd5c5]/70">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="name@residence.com"
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/15 focus:border-white rounded-xs text-sm text-white placeholder:text-white/20 outline-hidden transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#ebd5c5]/70">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+251 ..."
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/15 focus:border-white rounded-xs text-sm text-white placeholder:text-white/20 outline-hidden transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#ebd5c5]/70">
                      Preferred Date & Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Preferred time for a call or private site tour..."
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/15 focus:border-white rounded-xs text-sm text-white placeholder:text-white/20 outline-hidden transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-3 w-full py-3 bg-white text-black hover:bg-[#ebd5c5] font-mono text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
                  >
                    Confirm Consultation Request
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
