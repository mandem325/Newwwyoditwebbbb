import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function MacbookShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const laptopWrapRef = useRef<HTMLDivElement>(null);

  // Screen containers inside the laptop bezel
  const screen1Ref = useRef<HTMLDivElement>(null);
  const screen2Ref = useRef<HTMLDivElement>(null);
  const letters2Ref = useRef<HTMLSpanElement[]>([]);
  const subtext2Ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  // Dedicated Shared Scroll-Driven Element Transition Refs
  const sharedCard1Ref = useRef<HTMLDivElement>(null);
  const sharedCard2Ref = useRef<HTMLDivElement>(null);
  const sharedCard3Ref = useRef<HTMLDivElement>(null);
  const sharedImg1Ref = useRef<HTMLImageElement>(null);
  const sharedImg2Ref = useRef<HTMLImageElement>(null);
  const sharedImg3Ref = useRef<HTMLImageElement>(null);

  const sharedCard1YodOverlayRef = useRef<HTMLDivElement>(null);
  const sharedCard1DejOverlayRef = useRef<HTMLDivElement>(null);
  const sharedCard2YodOverlayRef = useRef<HTMLDivElement>(null);
  const sharedCard2DejOverlayRef = useRef<HTMLDivElement>(null);
  const sharedCard3YodOverlayRef = useRef<HTMLDivElement>(null);
  const sharedCard3DejOverlayRef = useRef<HTMLDivElement>(null);

  // Ambient glows & reflections
  const redGlowRef = useRef<HTMLDivElement>(null);
  const blueGlowRef = useRef<HTMLDivElement>(null);
  const redReflectionRef = useRef<HTMLDivElement>(null);
  const blueReflectionRef = useRef<HTMLDivElement>(null);

  // Active screen index
  const [activeScreenIndex, setActiveScreenIndex] = useState<number>(0);

  // 3D Tilt Dynamics using Framer Motion springs on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 28, stiffness: 100, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["-30%", "130%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!pinContainerRef.current) return;
    const rect = pinContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !pinContainerRef.current ||
        !screen1Ref.current ||
        !screen2Ref.current
      )
        return;

      const totalPinScroll = 2600;

      // Initial positions of the two screens inside the laptop (scroll vertically like slides)
      gsap.set(screen1Ref.current, {
        yPercent: 0,
        opacity: 1,
      });

      gsap.set(screen2Ref.current, {
        yPercent: 100,
        opacity: 1,
      });

      // Starting positions for the 3 shared transitioning image cards in YOD state
      if (sharedCard1Ref.current) {
        gsap.set(sharedCard1Ref.current, {
          top: "22%",
          left: "63%",
          width: "29%",
          aspectRatio: "3 / 4",
          rotate: 0,
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
        });
      }
      if (sharedCard2Ref.current) {
        gsap.set(sharedCard2Ref.current, {
          top: "35%",
          left: "54%",
          width: "23%",
          aspectRatio: "3 / 4",
          rotate: -6,
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
        });
      }
      if (sharedCard3Ref.current) {
        gsap.set(sharedCard3Ref.current, {
          top: "14%",
          left: "53%",
          width: "15%",
          aspectRatio: "1 / 1",
          rotate: 6,
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
        });
      }

      // Overlays starting state
      if (sharedCard1YodOverlayRef.current) {
        gsap.set(sharedCard1YodOverlayRef.current, { opacity: 1 });
      }
      if (sharedCard1DejOverlayRef.current) {
        gsap.set(sharedCard1DejOverlayRef.current, { opacity: 0 });
      }
      if (sharedCard2YodOverlayRef.current) {
        gsap.set(sharedCard2YodOverlayRef.current, { opacity: 1 });
      }
      if (sharedCard2DejOverlayRef.current) {
        gsap.set(sharedCard2DejOverlayRef.current, { opacity: 0 });
      }
      if (sharedCard3YodOverlayRef.current) {
        gsap.set(sharedCard3YodOverlayRef.current, { opacity: 1 });
      }
      if (sharedCard3DejOverlayRef.current) {
        gsap.set(sharedCard3DejOverlayRef.current, { opacity: 0 });
      }

      if (redGlowRef.current) {
        gsap.set(redGlowRef.current, { opacity: 1 });
      }
      if (blueGlowRef.current) {
        gsap.set(blueGlowRef.current, { opacity: 0 });
      }
      if (redReflectionRef.current) {
        gsap.set(redReflectionRef.current, { opacity: 0.55 });
      }
      if (blueReflectionRef.current) {
        gsap.set(blueReflectionRef.current, { opacity: 0 });
      }

      // Master ScrollTrigger timeline that pins pinContainerRef and scrubs ONLY the inner screen content
      const pinTl = gsap.timeline({
        scrollTrigger: {
          id: "macbook-pinned-showcase",
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalPinScroll}`,
          pin: pinContainerRef.current,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActiveScreenIndex(self.progress < 0.5 ? 0 : 1);
          },
        },
      });

      // -------------------------------------------------------------
      // PINNED SCROLL TIMELINE:
      // Pinned viewport stays stationary.
      // Screen 1 (Red YOD) & Screen 2 (Blue DEJ) scroll vertically like the original.
      // THE SELECTED IMAGES PERFORM A SCROLL-DRIVEN ELEMENT TRANSITION:
      // They physically move DOWN with animation and appear into the DEJ component!
      // -------------------------------------------------------------

      // 1. Screen 1 (Red YOD™) scrolls UP and out
      pinTl.to(
        screen1Ref.current,
        {
          yPercent: -100,
          ease: "power2.inOut",
          duration: 2.0,
        },
        0.8,
      );

      // 2. Screen 2 (Blue DEJ™) scrolls UP and into view from the bottom
      pinTl.to(
        screen2Ref.current,
        {
          yPercent: 0,
          ease: "power2.inOut",
          duration: 2.0,
        },
        0.8,
      );

      // 3. SCROLL-DRIVEN SHARED ELEMENT TRANSITIONS OF THE 3 IMAGES:
      // Card 1: Primary Selected Portrait (/madelyn-designer.jpg)
      // Swoops DOWN and across into DEJ Quadrant 1 (CAM-01 Surveillance Viewport)
      if (sharedCard1Ref.current) {
        pinTl.to(
          sharedCard1Ref.current,
          {
            top: "23%",
            left: "4.5%",
            width: "27%",
            aspectRatio: "4 / 3",
            rotate: 0,
            ease: "power2.inOut",
            duration: 1.8,
          },
          0.8,
        );

        // Fluid downward motion arc emphasizing downward travel
        pinTl.to(
          sharedCard1Ref.current,
          {
            y: 45,
            ease: "sine.inOut",
            duration: 0.9,
          },
          0.8,
        );
        pinTl.to(
          sharedCard1Ref.current,
          {
            y: 0,
            ease: "power2.out",
            duration: 0.9,
          },
          1.7,
        );
      }

      // Card 1 Overlays (YOD fashion badge fades, DEJ telemetry HUD illuminates)
      if (sharedCard1YodOverlayRef.current) {
        pinTl.to(
          sharedCard1YodOverlayRef.current,
          { opacity: 0, ease: "power1.out", duration: 0.8 },
          0.9,
        );
      }
      if (sharedCard1DejOverlayRef.current) {
        pinTl.to(
          sharedCard1DejOverlayRef.current,
          { opacity: 1, ease: "power2.in", duration: 0.9 },
          1.6,
        );
      }

      // Card 2: (/vero-dress.jpg)
      // Moves DOWN from top: 35% to top: 58%, un-tilting from -6deg to 0deg,
      // and docking right into the Panoramic Center Matrix in DEJ!
      if (sharedCard2Ref.current) {
        pinTl.to(
          sharedCard2Ref.current,
          {
            top: "58%",
            left: "34%",
            width: "32%",
            aspectRatio: "340 / 62",
            rotate: 0,
            ease: "power2.inOut",
            duration: 1.8,
          },
          0.8,
        );
      }

      if (sharedCard2YodOverlayRef.current) {
        pinTl.to(
          sharedCard2YodOverlayRef.current,
          { opacity: 0, ease: "power1.out", duration: 0.8 },
          0.9,
        );
      }
      if (sharedCard2DejOverlayRef.current) {
        pinTl.to(
          sharedCard2DejOverlayRef.current,
          { opacity: 1, ease: "power2.in", duration: 0.9 },
          1.6,
        );
      }

      // Card 3: (/slide1-highres.jpg)
      // Moves DOWN from top: 14% to top: 23%, un-tilting from 6deg to 0deg,
      // expanding and docking into the right Telemetry Slide in DEJ!
      if (sharedCard3Ref.current) {
        pinTl.to(
          sharedCard3Ref.current,
          {
            top: "23%",
            left: "68.5%",
            width: "27%",
            aspectRatio: "4 / 3",
            rotate: 0,
            ease: "power2.inOut",
            duration: 1.8,
          },
          0.8,
        );

        // Fluid downward motion arc
        pinTl.to(
          sharedCard3Ref.current,
          {
            y: 35,
            ease: "sine.inOut",
            duration: 0.9,
          },
          0.8,
        );
        pinTl.to(
          sharedCard3Ref.current,
          {
            y: 0,
            ease: "power2.out",
            duration: 0.9,
          },
          1.7,
        );
      }

      if (sharedCard3YodOverlayRef.current) {
        pinTl.to(
          sharedCard3YodOverlayRef.current,
          { opacity: 0, ease: "power1.out", duration: 0.8 },
          0.9,
        );
      }
      if (sharedCard3DejOverlayRef.current) {
        pinTl.to(
          sharedCard3DejOverlayRef.current,
          { opacity: 1, ease: "power2.in", duration: 0.9 },
          1.6,
        );
      }

      // Subtle inner parallax shift
      if (sharedImg1Ref.current) {
        pinTl.fromTo(
          sharedImg1Ref.current,
          { scale: 1 },
          { scale: 1.05, ease: "power2.inOut", duration: 1.8 },
          0.8,
        );
      }
      if (sharedImg2Ref.current) {
        pinTl.fromTo(
          sharedImg2Ref.current,
          { scale: 1 },
          { scale: 1.06, ease: "power2.inOut", duration: 1.8 },
          0.8,
        );
      }
      if (sharedImg3Ref.current) {
        pinTl.fromTo(
          sharedImg3Ref.current,
          { scale: 1 },
          { scale: 1.05, ease: "power2.inOut", duration: 1.8 },
          0.8,
        );
      }

      // 4. Letters "D", "E", "J" stagger into place on Screen 2
      if (letters2Ref.current.length > 0) {
        pinTl.fromTo(
          letters2Ref.current,
          { yPercent: 40, opacity: 0.3 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "power3.out",
            duration: 1.2,
          },
          1.4,
        );
      }

      // 5. Subtitle on Screen 2 glides up into place
      if (subtext2Ref.current) {
        pinTl.fromTo(
          subtext2Ref.current,
          { y: 24, opacity: 0.2 },
          { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 },
          1.5,
        );
      }

      // 6. Specular screen glare sweep during screen transition
      if (glareRef.current) {
        pinTl.fromTo(
          glareRef.current,
          { xPercent: -120 },
          { xPercent: 120, ease: "power2.inOut", duration: 1.8 },
          1.0,
        );
      }

      // 7. Ambient stage glows morph smoothly from warm red to electric blue
      if (redGlowRef.current && blueGlowRef.current) {
        pinTl.to(redGlowRef.current, { opacity: 0, ease: "power2.inOut", duration: 1.8 }, 1.0);
        pinTl.to(blueGlowRef.current, { opacity: 1, ease: "power2.inOut", duration: 1.8 }, 1.2);
      }

      // 8. Floor reflections transition from red to blue
      if (redReflectionRef.current && blueReflectionRef.current) {
        pinTl.to(
          redReflectionRef.current,
          { opacity: 0, ease: "power2.inOut", duration: 1.6 },
          1.0,
        );
        pinTl.to(
          blueReflectionRef.current,
          { opacity: 0.55, ease: "power2.inOut", duration: 1.6 },
          1.2,
        );
      }

      // 9. End buffer hold so Screen 2 stays locked before pin release
      pinTl.to({}, { duration: 1.0 }, 3.0);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="lam-mockup-showcase"
      data-custom-scroll="true"
      className="relative z-30 w-full bg-[#050507] text-white"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 select-none m-0 pt-10 sm:pt-12 md:pt-14 pb-2 sm:pb-3"
        style={{ perspective: "1400px" }}
      >
        {/* Background Atmosphere & Radial Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top Dark Infinite Void */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-black via-[#070709] to-[#0d0d12]" />

          {/* Ambient Warm Red Radial Glow (Active for Screen 1) */}
          <div
            ref={redGlowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1000px] h-[85vw] max-h-[1000px] rounded-full bg-[radial-gradient(circle,rgba(235,36,0,0.2)_0%,rgba(235,36,0,0.05)_45%,transparent_70%)] blur-3xl pointer-events-none will-change-opacity"
          />

          {/* Ambient Electric Cobalt Blue Radial Glow (Active for Screen 2) */}
          <div
            ref={blueGlowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1000px] h-[85vw] max-h-[1000px] rounded-full bg-[radial-gradient(circle,rgba(0,71,255,0.22)_0%,rgba(0,71,255,0.06)_45%,transparent_70%)] blur-3xl pointer-events-none will-change-opacity"
          />

          {/* Studio Top Spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[50vh] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_75%)] pointer-events-none" />

          {/* Luxury Film Grain Texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* 3D LAPTOP HARDWARE (EXACT ORIGINAL SIZE) */}
        {/* ========================================================================= */}
        <motion.div
          ref={laptopWrapRef}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative z-20 w-full max-w-[1060px] flex flex-col items-center will-change-transform"
        >
          {/* 1. LAPTOP SCREEN LID FRAME */}
          <div
            data-butterfly-perch="true"
            className="relative w-[92vw] sm:w-[86vw] md:w-[760px] lg:w-[860px] aspect-[16/10.2] rounded-t-[20px] sm:rounded-t-[24px] bg-[#1a1a1d] p-[8px] sm:p-[12px] md:p-[14px] shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-t border-x border-[#3a3a40] z-20"
            style={{
              boxShadow: "0 -2px 10px rgba(255,255,255,0.08) inset, 0 30px 90px rgba(0,0,0,0.9)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Top Webcam Notch & Micro-indicator */}
            <div className="absolute top-[5px] sm:top-[7px] left-1/2 -translate-x-1/2 z-40 flex items-center gap-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0a0a0c] border border-white/20 flex items-center justify-center">
                <div
                  className="w-[3px] h-[3px] rounded-full transition-colors duration-500"
                  style={{
                    backgroundColor: activeScreenIndex === 0 ? "#1b3b5a" : "#00e5ff",
                  }}
                />
              </div>
            </div>

            {/* SCREEN BEZEL INNER CONTAINER (CHANGES ON SCROLL) */}
            <div
              id="laptop-screen-viewport"
              className="relative w-full h-full rounded-t-[14px] sm:rounded-t-[16px] overflow-hidden select-none"
            >
              {/* Specular Glass Sheen / Glare Sweep Overlay */}
              <motion.div
                ref={glareRef}
                style={{ x: glareX }}
                className="absolute -inset-y-1/2 -left-1/2 w-full h-[200%] bg-gradient-to-r from-transparent via-white/18 to-transparent rotate-[28deg] pointer-events-none z-30 mix-blend-overlay"
              />

              {/* SCREEN 1: RED YOD™ SHOWCASE (AWARD-WINNING HAUTE EDITORIAL MAGAZINE) */}
              <div
                ref={screen1Ref}
                data-screen="yod"
                className="absolute inset-0 w-full h-full flex flex-col justify-between bg-[#eb2400] overflow-hidden will-change-transform"
              >
                {/* Vibrant Screen Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#ff350d] via-[#eb2400] to-[#dc2000]" />

                {/* Subtle Editorial Grain / Scanline Texture */}
                <div
                  className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-multiply"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, black 1px, transparent 0)",
                    backgroundSize: "6px 6px",
                  }}
                />

                {/* Inject Scoped Maximalist Keyframe Animations */}
                <style>{`
                  @keyframes yodSpinBadge {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  @keyframes yodMarquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                  }
                  @keyframes dejMarquee {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                  }
                  @keyframes dejEq1 { 0%, 100% { height: 4px; } 50% { height: 15px; } }
                  @keyframes dejEq2 { 0%, 100% { height: 14px; } 50% { height: 5px; } }
                  @keyframes dejEq3 { 0%, 100% { height: 7px; } 50% { height: 18px; } }
                  @keyframes dejEq4 { 0%, 100% { height: 16px; } 50% { height: 6px; } }
                `}</style>

                {/* 1. TOP EDITORIAL MASTHEAD (Dense Archival Header) */}
                <div className="relative z-20 w-full px-3 sm:px-6 md:px-7 pt-2 sm:pt-3 pb-1.5 flex items-center justify-between border-b border-black/30 text-black">
                  {/* Left: Issue, Edition & Category */}
                  <div className="flex items-center gap-2 font-mono text-[8.5px] sm:text-[10px] font-black tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                    <span>YOD™ // ARCHIVE N° 26</span>
                    <span className="hidden sm:inline text-black/60">• SALON D'AUTOMNE</span>
                    <span className="hidden md:inline px-1 py-0.2 bg-black text-[#eb2400] text-[7.5px] font-black rounded-xs">
                      LIVE EXHIBIT
                    </span>
                  </div>

                  {/* Center: Editorial Micro-Index */}
                  <div className="hidden sm:flex items-center gap-3 text-[9px] font-mono font-bold tracking-widest uppercase">
                    <span className="cursor-pointer hover:underline underline-offset-2">
                      [01 ARCHIVE]
                    </span>
                    <span className="cursor-pointer hover:underline underline-offset-2">
                      [02 ESSAYS]
                    </span>
                    <span className="cursor-pointer hover:underline underline-offset-2">
                      [03 SALON]
                    </span>
                    <span className="cursor-pointer hover:underline underline-offset-2">
                      [04 MANIFESTO]
                    </span>
                  </div>

                  {/* Right: Location & Fidelity Spec */}
                  <div className="flex items-center gap-1.5 sm:gap-2.5 font-mono text-[8.5px] sm:text-[10px] font-black tracking-wider uppercase">
                    <span className="hidden sm:inline">ADDIS ABABA / 09:41</span>
                    <span className="px-1.5 py-0.5 rounded-xs bg-black text-[#eb2400] font-black text-[7.5px] sm:text-[8.5px]">
                      STEREO 24-BIT
                    </span>
                  </div>
                </div>

                {/* 1B. MAXIMALIST RUNNING TICKER TAPE (Top Editorial Ribbon) */}
                <div className="relative z-20 w-full bg-black text-[#eb2400] py-0.5 sm:py-1 overflow-hidden flex items-center border-b border-black/40">
                  <div
                    className="flex whitespace-nowrap text-[7.5px] sm:text-[8.5px] font-mono font-black uppercase tracking-widest gap-4"
                    style={{
                      animation: "yodMarquee 18s linear infinite",
                      width: "max-content",
                    }}
                  >
                    <span>★ THE LIVING ARCHIVE // VOL. 26</span>
                    <span>★ HAUTE ADVOCACY & TRANSFORMATION</span>
                    <span>★ ADDIS ABABA × NAIROBI × GENEVA</span>
                    <span>★ GRASSROOTS REVOLUTION</span>
                    <span>★ YODIT DEJENE LIVING CURATION</span>
                    <span>★ CULTURE AS ARCHITECTURE</span>
                    {/* Duplicate for seamless infinite loop */}
                    <span>★ THE LIVING ARCHIVE // VOL. 26</span>
                    <span>★ HAUTE ADVOCACY & TRANSFORMATION</span>
                    <span>★ ADDIS ABABA × NAIROBI × GENEVA</span>
                    <span>★ GRASSROOTS REVOLUTION</span>
                    <span>★ YODIT DEJENE LIVING CURATION</span>
                    <span>★ CULTURE AS ARCHITECTURE</span>
                  </div>
                </div>

                {/* 2. MAIN EDITORIAL HERO STAGE (Maximalist Archival Salon Collage) */}
                <div className="relative z-20 w-full flex-1 px-3 sm:px-6 md:px-7 py-2 sm:py-3 flex items-center justify-between gap-3 sm:gap-6 overflow-hidden">
                  {/* Left Hero Composition: Monumental Typography, Stamps & Marginalia */}
                  <div className="flex-1 flex flex-col justify-center max-w-[58%] sm:max-w-[54%] relative z-10">
                    {/* Ghost Outline Behind Display Type */}
                    <div className="relative select-none">
                      {/* Huge Ghost Typographic Shadow Layer */}
                      <span
                        aria-hidden="true"
                        className="absolute -top-3 -left-2 font-black text-[22vw] sm:text-[18vw] md:text-[115px] lg:text-[136px] leading-[0.72] tracking-[-0.06em] uppercase opacity-20 pointer-events-none"
                        style={{
                          fontFamily:
                            "'Impact', 'Arial Black', 'Haas Grot Text', -apple-system, sans-serif",
                          WebkitTextStroke: "2px black",
                          color: "transparent",
                        }}
                      >
                        YOD
                      </span>

                      {/* Foreground Display Title */}
                      <div className="relative flex items-start">
                        <h1
                          className="font-black text-[21vw] sm:text-[17vw] md:text-[110px] lg:text-[130px] leading-[0.72] text-black tracking-[-0.06em] uppercase flex"
                          style={{
                            fontFamily:
                              "'Impact', 'Arial Black', 'Haas Grot Text', -apple-system, sans-serif",
                          }}
                        >
                          {["Y", "O", "D"].map((char, index) => (
                            <span
                              key={index}
                              className="inline-block transition-transform duration-300 hover:-translate-y-1"
                            >
                              {char}
                            </span>
                          ))}
                        </h1>

                        {/* Trademark Emblem Pill */}
                        <span
                          className="font-black text-[3vw] sm:text-[2vw] md:text-[17px] lg:text-[19px] text-black tracking-tight leading-none mt-1 ml-1 select-none"
                          style={{
                            fontFamily: "'Impact', 'Arial Black', -apple-system, sans-serif",
                          }}
                        >
                          TM
                        </span>
                      </div>
                    </div>

                    {/* Rich Archival Metadata, Stamps & Editorial Notes */}
                    <div className="mt-1 sm:mt-2 flex flex-col gap-1 sm:gap-1.5 text-black">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="px-1.5 py-0.5 bg-black text-[#eb2400] font-mono text-[8px] sm:text-[9.5px] font-black uppercase tracking-widest shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                          MANIFESTO 01
                        </span>
                        <span className="px-1.5 py-0.5 border border-black font-mono text-[7.5px] sm:text-[9px] font-bold uppercase tracking-wider bg-black/10">
                          HAUTE ADVOCACY
                        </span>
                        <span className="hidden sm:inline font-mono text-[8px] font-bold uppercase text-black/80">
                          EDITION: 2026-ET
                        </span>
                      </div>

                      <p className="font-mono text-[8px] sm:text-[10.5px] leading-[1.25] text-black font-semibold max-w-[340px] line-clamp-2 sm:line-clamp-3">
                        Bridging grassroots community resilience with global policy frameworks
                        across East Africa and international consortia.
                      </p>

                      {/* Archival Barcode & Serial Registry */}
                      <div className="flex items-center gap-3 pt-1 border-t border-black/30 mt-0.5 sm:mt-1">
                        {/* Miniature Barcode Graphic */}
                        <div className="flex items-end gap-[1.5px] h-3.5 sm:h-4">
                          <span className="w-[1.5px] h-full bg-black" />
                          <span className="w-[1px] h-full bg-black" />
                          <span className="w-[3px] h-full bg-black" />
                          <span className="w-[1.5px] h-2.5 bg-black" />
                          <span className="w-[2px] h-full bg-black" />
                          <span className="w-[1px] h-3 bg-black" />
                          <span className="w-[2.5px] h-full bg-black" />
                          <span className="w-[1px] h-2 bg-black" />
                          <span className="w-[1.5px] h-full bg-black" />
                          <span className="w-[3px] h-full bg-black" />
                          <span className="w-[1px] h-full bg-black" />
                          <span className="w-[2px] h-full bg-black" />
                        </div>
                        <div className="flex flex-col font-mono text-[7px] sm:text-[8px] font-black text-black tracking-widest leading-none">
                          <span>CAT. N° YOD-2026-ET</span>
                          <span className="text-[6.5px] text-black/70 mt-0.5">
                            ROOM 04 // ACCESSION 8492
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Hero Composition: Layered Multi-Image Haute Fashion Collage Base */}
                  <div className="relative w-[42%] sm:w-[46%] max-w-[310px] aspect-[4/4.8] flex items-center justify-center">
                    {/* Layer 0: Rotating Circular Graphic Seal (Award-Winning Emblem) */}
                    <div
                      className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 sm:w-20 h-16 sm:h-20 pointer-events-none z-30"
                      style={{ animation: "yodSpinBadge 20s linear infinite" }}
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                          id="yodCirclePath"
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                          fill="none"
                        />
                        <text className="font-mono text-[9px] font-black uppercase tracking-[2px] fill-black">
                          <textPath href="#yodCirclePath" startOffset="0%">
                            ★ YODIT DEJENE ★ LIVING ARCHIVE ★ 2026 ★
                          </textPath>
                        </text>
                      </svg>
                      {/* Center Star of Emblem */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-black text-xs font-black">★</span>
                      </div>
                    </div>

                    {/* Accession Mounting Frame (Cards sit directly above this via Shared Transition Layer) */}
                    <div className="w-[84%] sm:w-[82%] aspect-[3/4] rounded-xs border border-dashed border-black/35 bg-black/[0.04] p-2 flex flex-col justify-between select-none">
                      <div className="flex justify-between items-center text-[7px] font-mono text-black font-bold">
                        <span>REF. ACC-2026</span>
                        <span>PLATE 01</span>
                      </div>
                      <div className="text-center font-mono text-[7.5px] uppercase tracking-widest text-black/60">
                        [ LIVING ARCHIVE SALON SPECIMEN ]
                      </div>
                      <div className="flex justify-between items-center text-[6.5px] font-mono text-black/70">
                        <span>CURATED EXHIBIT</span>
                        <span className="text-[#eb2400] font-bold">SCROLL DOWN ↓</span>
                      </div>
                    </div>

                    {/* Interactive Floating Pill Tag */}
                    <div className="absolute -bottom-1 -right-2 z-30 pointer-events-none flex items-center gap-1 bg-black text-white px-2 py-0.5 rounded-full shadow-[3px_3px_0px_rgba(0,0,0,0.8)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#eb2400] animate-ping" />
                      <span className="font-mono text-[7.5px] sm:text-[8.5px] font-black tracking-wider uppercase text-[#eb2400]">
                        EXPLORE SPECIMEN ↗
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. SCREEN BOTTOM: SUBTITLE & MANIFESTO FOOTER */}
                <div className="relative z-20 w-full px-3 sm:px-6 md:px-7 pb-2.5 sm:pb-3.5 pt-2 border-t border-black/30 flex flex-col sm:flex-row sm:items-end justify-between gap-1 sm:gap-2">
                  <div className="max-w-[480px]">
                    <p
                      className="font-black text-[3.2vw] sm:text-[2.3vw] md:text-[17px] lg:text-[20px] uppercase tracking-[-0.02em] text-black leading-[1.06]"
                      style={{
                        fontFamily: "'Impact', 'Arial Black', 'Helvetica Neue', sans-serif",
                      }}
                    >
                      COMMUNITY ADVOCACY IS
                      <br />
                      NOT WHAT YOU THINK IT IS*
                    </p>
                  </div>

                  {/* Micro Metadata & Page Indicator */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 font-mono text-[8px] sm:text-[9.5px] font-black uppercase text-black">
                    <span className="tracking-wider hidden sm:inline">*01 / FIELD DIALOGUE</span>
                    <span className="px-2 py-0.5 rounded-xs bg-black text-white font-mono text-[8px] font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.7)]">
                      SCROLL TO DEPLOY DEJ™ ↓
                    </span>
                  </div>
                </div>

                {/* Inner Bezel Ambient Shadow */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.35)]" />
              </div>

              {/* SCREEN 2: BLUE DEJ™ SHOWCASE (MAXIMALIST CYBER-BRUTALIST SWISS TELEMETRY MATRIX) */}
              <div
                ref={screen2Ref}
                data-screen="dej"
                className="absolute inset-0 w-full h-full flex flex-col justify-between bg-[#0047ff] overflow-hidden will-change-transform"
              >
                {/* Vibrant Cobalt Blue Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a5cff] via-[#0047ff] to-[#002bb5]" />

                {/* Swiss Grid Overlay / Metric Coordinates Texture */}
                <div
                  className="absolute inset-0 opacity-[0.09] pointer-events-none mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                {/* 1. TOP TECHNICAL MASTHEAD (Swiss Data Laboratory Header) */}
                <div className="relative z-20 w-full px-3 sm:px-6 md:px-7 pt-2 sm:pt-3 pb-1.5 flex items-center justify-between border-b border-black/30 text-black">
                  {/* Left: Lab Name, Status & Pulse */}
                  <div className="flex items-center gap-2 font-mono text-[8.5px] sm:text-[10px] font-black tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                    <span>DEJ™ // KINETIC METRICS LAB</span>
                    <span className="hidden sm:inline text-black/70">• SATELLITE TELEMETRY</span>
                  </div>

                  {/* Center: Live Audio Equalizer & Uplink */}
                  <div className="flex items-center gap-2 font-mono text-[8.5px] font-black tracking-widest text-black uppercase">
                    <div className="flex items-end gap-[2px] h-3.5">
                      <span
                        className="w-1 bg-black rounded-xs"
                        style={{ animation: "dejEq1 0.8s ease-in-out infinite" }}
                      />
                      <span
                        className="w-1 bg-black rounded-xs"
                        style={{ animation: "dejEq2 0.6s ease-in-out infinite" }}
                      />
                      <span
                        className="w-1 bg-black rounded-xs"
                        style={{ animation: "dejEq3 0.9s ease-in-out infinite" }}
                      />
                      <span
                        className="w-1 bg-black rounded-xs"
                        style={{ animation: "dejEq4 0.7s ease-in-out infinite" }}
                      />
                    </div>
                    <span className="hidden md:inline">UPLINK: 142.85 MHz</span>
                  </div>

                  {/* Right: GPS & Live Tag */}
                  <div className="flex items-center gap-1.5 sm:gap-2.5 font-mono text-[8.5px] sm:text-[10px] font-black tracking-wider uppercase">
                    <span className="hidden sm:inline">09°01'N • 38°44'E</span>
                    <span className="px-1.5 py-0.5 rounded-xs bg-black text-[#0047ff] font-black text-[7.5px] sm:text-[8.5px]">
                      LIVE FEED
                    </span>
                  </div>
                </div>

                {/* 1B. MAXIMALIST RUNNING DATA STREAM TICKER */}
                <div className="relative z-20 w-full bg-black text-[#0047ff] py-0.5 sm:py-1 overflow-hidden flex items-center border-b border-black/40">
                  <div
                    className="flex whitespace-nowrap text-[7.5px] sm:text-[8.5px] font-mono font-black uppercase tracking-widest gap-4"
                    style={{
                      animation: "dejMarquee 16s linear infinite",
                      width: "max-content",
                    }}
                  >
                    <span>▲ GLOBAL CIVIC MATRIX</span>
                    <span>▲ 42 REGIONAL ADVOCACY MISSIONS</span>
                    <span>▲ 100K+ COMMUNITY POPULATION IMPACT</span>
                    <span>▲ EAST AFRICA STRATEGY CORRIDOR</span>
                    <span>▲ 99.8% VERIFIED DATA ACCURACY</span>
                    <span>▲ ISO 14001 COMPLIANT FRAMEWORK</span>
                    {/* Duplicate for infinite loop */}
                    <span>▲ GLOBAL CIVIC MATRIX</span>
                    <span>▲ 42 REGIONAL ADVOCACY MISSIONS</span>
                    <span>▲ 100K+ COMMUNITY POPULATION IMPACT</span>
                    <span>▲ EAST AFRICA STRATEGY CORRIDOR</span>
                    <span>▲ 99.8% VERIFIED DATA ACCURACY</span>
                    <span>▲ ISO 14001 COMPLIANT FRAMEWORK</span>
                  </div>
                </div>

                {/* 2. MAIN TECHNICAL BENTO STAGE (Maximalist 4-Quadrant Surveillance & Data Grid) */}
                <div className="relative z-20 w-full flex-1 px-3 sm:px-6 md:px-7 py-2 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-4 overflow-hidden">
                  {/* Quadrant 1: Left Technical Field Feed & Reticle Docking Target */}
                  <div className="flex flex-col justify-between w-[28%] h-full py-0.5 border-r border-black/25 pr-2.5">
                    {/* Viewport Docking Frame */}
                    <div className="relative w-full aspect-[4/3] rounded-xs border border-dashed border-black/35 bg-black/[0.04] p-1 flex flex-col justify-between">
                      <div className="flex justify-between items-center font-mono text-[6px] sm:text-[7px] text-black font-bold">
                        <span>+ CORNER</span>
                        <span>CAM-01</span>
                      </div>
                      <div className="text-center font-mono text-[6.5px] sm:text-[7.5px] text-black/60 font-black uppercase">
                        [ DOCK TARGET 01 ]
                      </div>
                      <div className="flex justify-between items-center font-mono text-[6px] text-black/50">
                        <span>L/R 1080</span>
                        <span>+</span>
                      </div>
                    </div>

                    {/* Sensor Metric Readout */}
                    <div className="flex flex-col gap-0.5 font-mono text-[7.5px] sm:text-[8px] text-black pt-1">
                      <div className="flex justify-between font-bold border-b border-black/20 pb-0.5">
                        <span>CONSENSUS</span>
                        <span>98.4%</span>
                      </div>
                      <div className="flex justify-between text-black/80 font-bold">
                        <span>CALIBRATION</span>
                        <span>CONFIRMED</span>
                      </div>
                      <div className="flex justify-between text-black/70 text-[7px]">
                        <span>SPEC PROTOCOL</span>
                        <span>ISO-2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Quadrant 2: Center Monolithic DEJ™ & Panoramic Matrix Viewport */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-1 sm:px-2 relative z-10">
                    {/* Ghost Outline Behind Display Type */}
                    <div className="relative select-none flex items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="absolute -top-3 font-black text-[22vw] sm:text-[18vw] md:text-[115px] lg:text-[136px] leading-[0.72] tracking-[-0.06em] uppercase opacity-20 pointer-events-none"
                        style={{
                          fontFamily:
                            "'Impact', 'Arial Black', 'Haas Grot Text', -apple-system, sans-serif",
                          WebkitTextStroke: "2px black",
                          color: "transparent",
                        }}
                      >
                        DEJ
                      </span>

                      {/* Primary Display Title with Animated Letters */}
                      <div className="relative flex items-start justify-center">
                        <h1
                          className="font-black text-[21vw] sm:text-[17vw] md:text-[110px] lg:text-[130px] leading-[0.72] text-black tracking-[-0.06em] uppercase flex"
                          style={{
                            fontFamily:
                              "'Impact', 'Arial Black', 'Haas Grot Text', -apple-system, sans-serif",
                          }}
                        >
                          {["D", "E", "J"].map((char, index) => (
                            <span
                              key={index}
                              ref={(el) => {
                                if (el) letters2Ref.current[index] = el;
                              }}
                              className="inline-block transition-transform duration-300 hover:-translate-y-1"
                            >
                              {char}
                            </span>
                          ))}
                        </h1>

                        {/* Trademark Badge */}
                        <span
                          className="font-black text-[3vw] sm:text-[2vw] md:text-[17px] lg:text-[19px] text-black tracking-tight leading-none mt-1 ml-1 select-none"
                          style={{
                            fontFamily: "'Impact', 'Arial Black', -apple-system, sans-serif",
                          }}
                        >
                          TM
                        </span>
                      </div>
                    </div>

                    {/* Technical Panoramic Center Data Matrix Docking Frame */}
                    <div className="w-full max-w-[340px] h-[52px] sm:h-[62px] mt-1 sm:mt-2 rounded-xs border border-dashed border-black/35 bg-black/[0.04] flex items-center justify-center">
                      <span className="font-mono text-[7px] sm:text-[8px] text-black/60 font-bold uppercase tracking-wider">
                        [ DOCK TARGET 02 // MATRIX ]
                      </span>
                    </div>

                    {/* Metric Badges Row */}
                    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 mt-1.5 font-mono text-[7px] sm:text-[8.5px] font-black uppercase text-black">
                      <span className="px-1.5 py-0.5 border border-black rounded-xs bg-black/10">
                        [01 STRATEGY]
                      </span>
                      <span className="px-1.5 py-0.5 border border-black rounded-xs bg-black/10">
                        [02 GOVERNANCE]
                      </span>
                      <span className="px-1.5 py-0.5 border border-black rounded-xs bg-black text-[#0047ff]">
                        [03 IMPACT]
                      </span>
                      <span className="hidden sm:inline px-1.5 py-0.5 border border-black rounded-xs bg-black/10">
                        [04 COALITIONS]
                      </span>
                    </div>
                  </div>

                  {/* Quadrant 3 & 4: Right Technical Documentary & Telemetry Graph */}
                  <div className="w-[30%] sm:w-[28%] h-full flex flex-col justify-between py-0.5 border-l border-black/25 pl-2 sm:pl-2.5">
                    {/* Viewport Frame with Camera Metadata Docking Frame */}
                    <div className="relative w-full aspect-[4/3] rounded-xs border border-dashed border-black/35 bg-black/[0.04] p-1 flex flex-col justify-between">
                      <div className="flex justify-between items-center font-mono text-[6px] sm:text-[7px] text-black font-bold">
                        <span>SLIDE // TIFF</span>
                        <span>+</span>
                      </div>
                      <div className="text-center font-mono text-[6.5px] sm:text-[7.5px] text-black/60 font-black uppercase">
                        [ DOCK TARGET 03 ]
                      </div>
                      <div className="flex justify-between items-center font-mono text-[6px] text-black/50">
                        <span>24-BIT</span>
                        <span>ISO 200</span>
                      </div>
                    </div>

                    {/* Technical Bar Graph & Civic Reach */}
                    <div className="flex flex-col gap-1 font-mono text-[7.5px] sm:text-[8px] text-black pt-1">
                      <div className="flex justify-between items-center font-bold">
                        <span>CIVIC REACH</span>
                        <span className="font-black">+184%</span>
                      </div>
                      <div className="w-full h-2 bg-black/15 rounded-xs overflow-hidden flex gap-[2px]">
                        <span className="w-1/3 h-full bg-black" />
                        <span className="w-1/3 h-full bg-black" />
                        <span className="w-1/4 h-full bg-black" />
                        <span className="w-1/12 h-full bg-black/40" />
                      </div>
                      <div className="flex items-center justify-between text-[6.5px] sm:text-[7px] text-black font-bold uppercase">
                        <span>VERIFIED COHORT</span>
                        <span className="px-1 bg-black text-[#0047ff] rounded-xs">99.8%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. SCREEN BOTTOM: SUBTITLE & SWISS FOOTER */}
                <div
                  ref={subtext2Ref}
                  className="relative z-20 w-full px-3 sm:px-6 md:px-7 pb-2.5 sm:pb-3.5 pt-2 border-t border-black/30 flex flex-col sm:flex-row sm:items-end justify-between gap-1 sm:gap-2"
                >
                  <div className="max-w-[480px]">
                    <p
                      className="font-black text-[3.2vw] sm:text-[2.3vw] md:text-[17px] lg:text-[20px] uppercase tracking-[-0.02em] text-black leading-[1.06]"
                      style={{
                        fontFamily: "'Impact', 'Arial Black', 'Helvetica Neue', sans-serif",
                      }}
                    >
                      SUSTAINABLE LEADERSHIP IS
                      <br />
                      NOT WHAT YOU THINK IT IS*
                    </p>
                  </div>

                  {/* Micro Data Spec & Status Badge */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 font-mono text-[8px] sm:text-[9.5px] font-black uppercase text-black">
                    <span className="tracking-wider hidden sm:inline">
                      *02 / SYSTEM ARCHITECTURE
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-black text-[#0047ff] font-mono text-[8px] font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.7)]">
                      PROTOCOL ACTIVE ✓
                    </span>
                  </div>
                </div>

                {/* Inner Bezel Ambient Shadow */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.35)]" />
              </div>

              {/* 4. DEDICATED SCROLL-DRIVEN SHARED ELEMENT TRANSITION STAGE */}
              {/* Continuous viewport layer: The 3 images physically travel down from YOD to DEJ */}
              <div
                id="shared-transition-stage"
                className="absolute inset-0 z-25 pointer-events-none overflow-hidden"
              >
                {/* Image Card 1: Primary Selected Portrait (/madelyn-designer.jpg) */}
                <div
                  ref={sharedCard1Ref}
                  className="absolute bg-black p-[2px] rounded-xs shadow-[5px_6px_0px_rgba(0,0,0,0.95)] overflow-hidden will-change-transform"
                >
                  <img
                    ref={sharedImg1Ref}
                    src="/madelyn-designer.jpg"
                    alt="Living Archive Selected Specimen"
                    referrerPolicy="no-referrer"
                    className="no-parallax w-full h-full object-cover grayscale contrast-130 brightness-95 will-change-transform"
                  />

                  {/* YOD Editorial Badges Overlay */}
                  <div
                    ref={sharedCard1YodOverlayRef}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div className="absolute top-1.5 left-1.5 bg-black/85 backdrop-blur-xs px-1.5 py-0.5 rounded-xs font-mono text-[7px] sm:text-[8px] font-black text-white uppercase tracking-wider">
                      FIG. 1.0 — LIVING ARCHIVE
                    </div>
                    <div className="absolute bottom-1.5 inset-x-1.5 flex items-center justify-between bg-black/80 backdrop-blur-xs px-1.5 py-0.5 rounded-xs font-mono text-[7px] sm:text-[8px] text-white">
                      <span className="font-black text-[#eb2400]">CURATED</span>
                      <span className="tracking-widest">SALON 2026</span>
                    </div>
                  </div>

                  {/* DEJ Surveillance Reticle & Telemetry Overlay */}
                  <div
                    ref={sharedCard1DejOverlayRef}
                    className="absolute inset-0 pointer-events-none opacity-0"
                  >
                    {/* Corner Target Crosshairs */}
                    <span className="absolute top-1 left-1 text-[8px] font-mono text-white font-bold leading-none">
                      +
                    </span>
                    <span className="absolute top-1 right-1 text-[8px] font-mono text-white font-bold leading-none">
                      +
                    </span>
                    <span className="absolute bottom-1 left-1 text-[8px] font-mono text-white font-bold leading-none">
                      +
                    </span>
                    <span className="absolute bottom-1 right-1 text-[8px] font-mono text-white font-bold leading-none">
                      +
                    </span>
                    {/* Rec Blip */}
                    <div className="absolute top-1 left-3 bg-red-600 px-1 py-0.2 rounded-xs font-mono text-[6px] text-white font-black uppercase flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                      REC
                    </div>
                    <div className="absolute bottom-1 inset-x-1 bg-black/90 px-1 py-0.5 font-mono text-[6.5px] text-white uppercase text-center font-bold">
                      CAM-01 // ARCHIVE SPECIMEN
                    </div>
                  </div>
                </div>

                {/* Image Card 2: (/vero-dress.jpg) - Dives down into Panoramic Center Matrix */}
                <div
                  ref={sharedCard2Ref}
                  className="absolute bg-black p-[2px] rounded-xs shadow-[4px_4px_0px_rgba(0,0,0,0.9)] overflow-hidden will-change-transform"
                >
                  <img
                    ref={sharedImg2Ref}
                    src="/vero-dress.jpg"
                    alt="Textile Architecture Specimen"
                    referrerPolicy="no-referrer"
                    className="no-parallax w-full h-full object-cover grayscale contrast-130 brightness-95 will-change-transform"
                  />

                  {/* YOD Accession Specimen 02 Overlay */}
                  <div
                    ref={sharedCard2YodOverlayRef}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div className="absolute top-1 left-1 bg-black text-[6.5px] font-mono text-white px-1 py-0.2 font-black uppercase">
                      SPECIMEN 02
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/90 text-[6px] font-mono text-white px-1 py-0.2">
                      TEXTILE HERITAGE
                    </div>
                  </div>

                  {/* DEJ Panoramic Scanning Matrix Overlay */}
                  <div
                    ref={sharedCard2DejOverlayRef}
                    className="absolute inset-0 pointer-events-none opacity-0 bg-gradient-to-r from-black/85 via-transparent to-black/85 flex items-center justify-between px-2 text-white font-mono text-[7px] sm:text-[8px] font-black uppercase"
                  >
                    <span className="text-[#0047ff] bg-white px-1 py-0.2 rounded-xs">
                      SPECIMEN 02
                    </span>
                    <span className="tracking-widest">TEXTILE SPECIFICATION</span>
                    <span>INDEX 8492</span>
                  </div>
                </div>

                {/* Image Card 3: (/slide1-highres.jpg) - Slides down into Right Telemetry Viewport */}
                <div
                  ref={sharedCard3Ref}
                  className="absolute bg-black p-[1.5px] rounded-xs shadow-[3px_3px_0px_rgba(0,0,0,0.85)] overflow-hidden will-change-transform"
                >
                  <img
                    ref={sharedImg3Ref}
                    src="/slide1-highres.jpg"
                    alt="Archival Slide Specimen"
                    referrerPolicy="no-referrer"
                    className="no-parallax w-full h-full object-cover grayscale contrast-125 will-change-transform"
                  />

                  {/* YOD Slide Tag Overlay */}
                  <div
                    ref={sharedCard3YodOverlayRef}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div className="absolute bottom-0.5 inset-x-0.5 bg-black text-[5.5px] font-mono text-white text-center font-bold">
                      TIFF // 24-BIT
                    </div>
                  </div>

                  {/* DEJ Telemetry Slide Overlay */}
                  <div
                    ref={sharedCard3DejOverlayRef}
                    className="absolute inset-0 pointer-events-none opacity-0"
                  >
                    <div className="absolute top-1 left-1 bg-black text-[6.5px] font-mono text-white px-1 py-0.2 font-black">
                      SLIDE // TIFF
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/90 text-[6px] font-mono text-white px-1 py-0.2">
                      24-BIT • ISO 200
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. LAPTOP CHASSIS BASE & KEYBOARD DECK (STATIONARY) */}
          <div
            data-butterfly-perch="true"
            className="relative w-[98vw] sm:w-[92vw] md:w-[820px] lg:w-[930px] h-[26px] sm:h-[34px] md:h-[38px] bg-gradient-to-b from-[#b8b8be] via-[#8c8c93] to-[#595960] rounded-b-[14px] sm:rounded-b-[18px] border-t border-[#d8d8de] shadow-[0_15px_40px_rgba(0,0,0,0.95)] z-30 -mt-[1px] flex flex-col justify-between overflow-hidden"
            style={{
              boxShadow: "0 4px 12px rgba(255,255,255,0.2) inset, 0 20px 45px rgba(0,0,0,0.95)",
            }}
          >
            {/* Top Keyboard Deck Lip & Hinge Gap */}
            <div className="w-full h-[6px] sm:h-[8px] bg-[#1a1a1c] border-b border-black/40 flex items-center justify-center">
              <div className="w-16 sm:w-24 h-[4px] sm:h-[5px] bg-[#0c0c0e] rounded-b-md border-b border-white/10" />
            </div>

            {/* Front Lip / Aluminum Edge with Center Thumb Notch */}
            <div className="w-full h-[18px] sm:h-[22px] flex items-center justify-center relative px-6">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="w-16 sm:w-20 h-[5px] sm:h-[6px] bg-[#222226] rounded-b-sm border-t border-black/80 shadow-inner" />
              <div
                className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    activeScreenIndex === 0
                      ? "linear-gradient(to bottom, rgba(235,36,0,0.25), transparent)"
                      : "linear-gradient(to bottom, rgba(0,71,255,0.25), transparent)",
                }}
              />
            </div>

            {/* Bottom Edge Rim */}
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-black/60" />
          </div>

          {/* 3. LAPTOP BASE FEET */}
          <div className="relative w-[94vw] sm:w-[88vw] md:w-[780px] lg:w-[890px] h-[6px] flex justify-between px-8 sm:px-14 pointer-events-none">
            <div className="w-8 sm:w-12 h-1.5 bg-[#0a0a0c] rounded-b-md shadow-md border-t border-white/5" />
            <div className="w-8 sm:w-12 h-1.5 bg-[#0a0a0c] rounded-b-md shadow-md border-t border-white/5" />
          </div>

          {/* 4. HIGH-END STUDIO FLOOR MIRROR REFLECTIONS */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-[98vw] sm:w-[92vw] md:w-[820px] lg:w-[930px] h-[140px] sm:h-[180px] md:h-[210px] mt-1 overflow-hidden pointer-events-none select-none flex flex-col items-center"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 95%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 95%)",
            }}
          >
            <div className="w-full h-[28px] sm:h-[34px] bg-gradient-to-t from-[#b8b8be] via-[#8c8c93] to-[#595960] rounded-t-[14px] opacity-75 blur-[0.8px] scale-y-[-1]" />

            {/* Red Ambient Cast for Screen 1 */}
            <div
              ref={redReflectionRef}
              className="absolute top-[28px] w-[88%] h-[120px] sm:h-[180px] bg-gradient-to-b from-[#eb2400]/45 via-[#eb2400]/15 to-transparent blur-md rounded-b-2xl will-change-opacity"
            />

            {/* Blue Ambient Cast for Screen 2 */}
            <div
              ref={blueReflectionRef}
              className="absolute top-[28px] w-[88%] h-[120px] sm:h-[180px] bg-gradient-to-b from-[#0047ff]/45 via-[#0047ff]/15 to-transparent blur-md rounded-b-2xl will-change-opacity"
            />

            {/* Specular Floor Horizon */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
