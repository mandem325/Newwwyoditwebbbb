import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function PhilosophyBuildSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Section refs
  const imacRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const guidePathRef = useRef<SVGPathElement>(null);
  const echoPathRef = useRef<SVGPathElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const userMutedRef = useRef(false);
  const isInViewRef = useRef(false);

  useEffect(() => {
    const target = containerRef.current || imacRef.current;
    const video = videoRef.current;
    if (!target || !video) return;

    // IntersectionObserver to ensure playback and sound only occur when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInViewRef.current = true;
            video.muted = userMutedRef.current;
            video.volume = 1.0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // If unmuted autoplay fails due to browser policy, fallback to muted
                video.muted = true;
                video.play().catch(() => {});
              });
            }
          } else {
            isInViewRef.current = false;
            // Instantly pause and mute when leaving the section
            video.pause();
            video.muted = true;
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "100px 0px 100px 0px",
      },
    );

    observer.observe(target);

    // Pause when switching tabs / losing visibility
    const handleVisibilityChange = () => {
      if (!videoRef.current) return;
      if (document.hidden) {
        videoRef.current.pause();
      } else if (isInViewRef.current) {
        videoRef.current.muted = userMutedRef.current;
        videoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Unmute on first user interaction if in view and user has not muted
    const handleFirstInteraction = () => {
      if (videoRef.current && isInViewRef.current && !userMutedRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch(() => {});
        setIsMuted(false);
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    const videoEl = videoRef.current;
    const handleExtMuted = () => {
      userMutedRef.current = true;
      setIsMuted(true);
    };
    if (videoEl) {
      videoEl.addEventListener("media-externally-muted", handleExtMuted);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      if (videoEl) {
        videoEl.removeEventListener("media-externally-muted", handleExtMuted);
      }
    };
  }, []);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || isMuted) {
      userMutedRef.current = false;
      video.muted = false;
      video.volume = 1.0;
      video.play().catch(() => {});
      setIsMuted(false);
    } else {
      userMutedRef.current = true;
      video.muted = true;
      setIsMuted(true);
    }
  };

  useGSAP(
    () => {
      // 1. Desktop slides in from right side of screen as user scrolls from hero into this section
      if (desktopRef.current && imacRef.current) {
        gsap.fromTo(
          desktopRef.current,
          {
            x: () => {
              if (typeof window !== "undefined") {
                return window.innerWidth > 768 ? Math.max(window.innerWidth * 0.85, 750) : "100vw";
              }
              return "100vw";
            },
            opacity: 0.1,
            rotateY: -16,
            rotateZ: 2.5,
            scale: 0.9,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imacRef.current,
              start: "top bottom", // Starts as soon as section top enters viewport bottom (scrolling down from hero/marquee)
              end: "center 55%", // Seamlessly arrives at center position
              scrub: 1.2, // Continuous smooth scrubbing as user scrolls up or down!
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // 2. Text revealing animation for each line
      const lines = containerRef.current?.querySelectorAll(".philosophy-line");
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // 3. Header replica reveals on scroll up/down
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      // 4. Moving Snake 3D Tube (Replicating Lusion.co scroll-driven tube on white background)
      if (guidePathRef.current && imacRef.current) {
        const path = guidePathRef.current;
        const totalLen = path.getTotalLength();
        const tubeLen = Math.max(totalLen * 0.32, 600);

        const tubeElements = containerRef.current?.querySelectorAll(".lusion-snake-tube-stroke");
        if (tubeElements && tubeElements.length > 0) {
          tubeElements.forEach((el) => {
            const svgPath = el as SVGPathElement;
            svgPath.style.strokeDasharray = `${tubeLen} ${totalLen * 2}`;
            svgPath.style.strokeDashoffset = `${tubeLen}`;
          });

          gsap.fromTo(
            tubeElements,
            {
              strokeDashoffset: tubeLen * 1.08,
            },
            {
              strokeDashoffset: -totalLen * 0.88,
              ease: "none",
              scrollTrigger: {
                trigger: imacRef.current,
                start: "top bottom", // Starts as soon as white section enters
                end: "bottom top", // Finishes as white section exits
                scrub: 1.0, // Smooth, direct scroll scrubbing (reverses on scroll up)
                invalidateOnRefresh: true,
              },
            },
          );
        }

        // Secondary subtle trailing echo ribbon
        if (echoPathRef.current) {
          const echoLen = echoPathRef.current.getTotalLength();
          const echoTubeLen = Math.max(echoLen * 0.2, 380);
          echoPathRef.current.style.strokeDasharray = `${echoTubeLen} ${echoLen * 2}`;
          echoPathRef.current.style.strokeDashoffset = `${echoTubeLen}`;

          gsap.fromTo(
            echoPathRef.current,
            {
              strokeDashoffset: echoTubeLen * 1.25,
            },
            {
              strokeDashoffset: -echoLen * 0.92,
              ease: "none",
              scrollTrigger: {
                trigger: imacRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        // ScrollTrigger life-cycle to ensure video only plays and sounds when inside this section
        if (imacRef.current) {
          ScrollTrigger.create({
            trigger: imacRef.current,
            start: "top bottom-=100",
            end: "bottom top+=100",
            onEnter: () => {
              isInViewRef.current = true;
              if (videoRef.current) {
                videoRef.current.muted = userMutedRef.current;
                videoRef.current.play().catch(() => {});
              }
            },
            onEnterBack: () => {
              isInViewRef.current = true;
              if (videoRef.current) {
                videoRef.current.muted = userMutedRef.current;
                videoRef.current.play().catch(() => {});
              }
            },
            onLeave: () => {
              isInViewRef.current = false;
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.muted = true;
              }
            },
            onLeaveBack: () => {
              isInViewRef.current = false;
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.muted = true;
              }
            },
          });
        }
      }
    },
    { scope: containerRef },
  );

  return (
    <div
      id="philosophy-build-section"
      ref={containerRef}
      className="w-full bg-[#f4f4f5] overflow-x-clip overflow-y-visible relative z-10"
    >
      {/* HEADER / NAVBAR Replica */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 pointer-events-none"
      >
        {/* Logo Crest */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 bg-contain bg-no-repeat bg-center mix-blend-multiply"
            style={{
              backgroundImage:
                "url(https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lion_rampant_-_Heraldry.svg/150px-Lion_rampant_-_Heraldry.svg.png)",
              filter: "grayscale(100%)",
            }}
          />
          <div className="flex flex-col">
            <motion.span
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif-elegant font-bold text-[#111] leading-none text-lg"
            >
              YODIT
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif-elegant font-bold text-[#111] leading-none text-lg"
            >
              DEJENE
            </motion.span>
            <div className="w-6 h-0.5 mt-1 flex">
              <div className="flex-1 bg-green-600" />
              <div className="flex-1 bg-yellow-500" />
              <div className="flex-1 bg-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. IMAGERY TEXT & IMAC SECTION */}
      <section
        ref={imacRef}
        data-custom-scroll="true"
        className="relative w-full pt-0 pb-16 md:pb-24 px-6 md:px-12 bg-[#f4f4f5] dark:bg-[#08080a] text-[#111] dark:text-[#f3f4f6] flex flex-col justify-start overflow-x-clip overflow-y-visible transition-colors duration-300"
      >
        {/* Moving 3D SVG Snake Tube (Lusion.co Replica - moves dynamically on scroll from hero through white section) */}
        <div
          className="absolute -top-48 md:-top-80 inset-x-0 bottom-0 pointer-events-none overflow-visible select-none z-0"
          aria-hidden="true"
        >
          <svg
            className="w-full h-full object-cover overflow-visible"
            viewBox="0 -240 1600 1500"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Volumetric ambient contact shadow filter */}
              <filter id="lusionSectionShadow" x="-20%" y="-20%" width="150%" height="150%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="18" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.08   0 0 0 0 0.12   0 0 0 0 0.35   0 0 0 0.22 0"
                />
              </filter>

              {/* Cylindrical 3D Tube Body Gradient */}
              <linearGradient id="lusionBlueTubeGrad" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="20%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#1d4ed8" />
                <stop offset="78%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>

              {/* Top Curvature Specular Highlight */}
              <linearGradient id="lusionGlossGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="80%" stopColor="#ffffff" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Echo ribbon: subtle trailing cyan guide loop originating from hero */}
            <path
              ref={echoPathRef}
              d="M 760, -220
                 C 760, -70 480, 70 300, 170
                 C 120, 270 -20, 490 200, 630
                 C 420, 770 900, 570 1220, 490
                 C 1540, 410 1760, 590 1640, 770
                 C 1520, 950 1060, 930 720, 1030
                 C 380, 1130 160, 1170 0, 1270"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
            />

            {/* Layer 1: Ambient 3D Drop Shadow */}
            <path
              className="lusion-snake-tube-stroke"
              d="M 720, -240
                 C 720, -80 440, 60 260, 160
                 C 80, 260 -60, 480 160, 620
                 C 380, 760 860, 560 1180, 480
                 C 1500, 400 1720, 580 1600, 760
                 C 1480, 940 1020, 920 680, 1020
                 C 340, 1120 120, 1160 -40, 1260"
              fill="none"
              stroke="#0f172a"
              strokeWidth="52"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#lusionSectionShadow)"
              transform="translate(6, 26)"
            />

            {/* Layer 2: Main Cylindrical Tube Body (Rich 3D Electric Blue) originating from Hero */}
            <path
              ref={guidePathRef}
              className="lusion-snake-tube-stroke"
              d="M 720, -240
                 C 720, -80 440, 60 260, 160
                 C 80, 260 -60, 480 160, 620
                 C 380, 760 860, 560 1180, 480
                 C 1500, 400 1720, 580 1600, 760
                 C 1480, 940 1020, 920 680, 1020
                 C 340, 1120 120, 1160 -40, 1260"
              fill="none"
              stroke="url(#lusionBlueTubeGrad)"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Layer 3: Cylindrical Specular Highlight */}
            <path
              className="lusion-snake-tube-stroke"
              d="M 720, -240
                 C 720, -80 440, 60 260, 160
                 C 80, 260 -60, 480 160, 620
                 C 380, 760 860, 560 1180, 480
                 C 1500, 400 1720, 580 1600, 760
                 C 1480, 940 1020, 920 680, 1020
                 C 340, 1120 120, 1160 -40, 1260"
              fill="none"
              stroke="url(#lusionGlossGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-2, -3.5)"
            />

            {/* Layer 4: Gleam Hotspot Core */}
            <path
              className="lusion-snake-tube-stroke"
              d="M 720, -240
                 C 720, -80 440, 60 260, 160
                 C 80, 260 -60, 480 160, 620
                 C 380, 760 860, 560 1180, 480
                 C 1500, 400 1720, 580 1600, 760
                 C 1480, 940 1020, 920 680, 1020
                 C 340, 1120 120, 1160 -40, 1260"
              fill="none"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-3, -5)"
            />
          </svg>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 w-full">
          <h2
            ref={textContainerRef}
            className="flex-1 font-build text-[8.2vw] sm:text-[6.2vw] md:text-[3.5vw] lg:text-[3.5vw] font-medium leading-[1.08] md:leading-[1.0] tracking-tight text-[#333] lowercase text-left w-full max-w-full flex flex-col"
          >
            <span className="overflow-hidden block py-0.5">
              <span className="philosophy-line block will-change-transform text-[#111] font-semibold">
                let's build.
              </span>
            </span>
            <span className="overflow-hidden block py-0.5">
              <span className="philosophy-line block will-change-transform">
                we help resilient communities flourish
              </span>
            </span>
            <span className="overflow-hidden block py-0.5">
              <span className="philosophy-line block will-change-transform">
                by crafting strategic programs that let
              </span>
            </span>
            <span className="overflow-hidden block py-0.5">
              <span className="philosophy-line block will-change-transform">
                marginalized youth and women lead with
              </span>
            </span>
            <span className="overflow-hidden block py-0.5">
              <span className="philosophy-line block will-change-transform">
                capacity, dignity, and sustainable power.
              </span>
            </span>
          </h2>

          <div className="flex-1 w-full flex justify-center overflow-visible">
            {/* iMac Hardware - sliding from out of the screen from right side */}
            <div
              ref={desktopRef}
              className="relative z-10 w-full max-w-[700px] aspect-[16/10] flex flex-col items-center will-change-transform"
            >
              {/* Body */}
              <div className="w-full h-full bg-[#f4f4f4] rounded-t-3xl rounded-b-xl border-[10px] md:border-[16px] border-[#111] shadow-2xl flex flex-col overflow-hidden relative">
                {/* Screen Container */}
                <div className="w-full flex-1 relative bg-black overflow-hidden shadow-[inset_0_5px_15px_rgba(0,0,0,0.5)]">
                  <video
                    ref={videoRef}
                    src="/10609067_1789747951297129.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Subtle vignette/overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                  {/* Sound toggle button */}
                  <button
                    type="button"
                    onClick={toggleSound}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 md:w-11 md:h-11 rounded-full border border-white/25 bg-black/40 hover:bg-black/60 flex items-center justify-center backdrop-blur-md cursor-pointer transition-all z-20 shadow-lg pointer-events-auto active:scale-95"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-white/90" />
                    ) : (
                      <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white/90" />
                    )}
                  </button>



                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-4 h-0.5 flex z-20">
                    <div className="flex-1 bg-green-600" />
                    <div className="flex-1 bg-yellow-500" />
                    <div className="flex-1 bg-red-600" />
                  </div>
                </div>

                {/* Bottom Chin */}
                <div className="w-full h-[15%] bg-gradient-to-b from-[#e5e5e5] to-[#c5c5c5] flex flex-col items-center justify-center relative border-t border-[#111]">
                  <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-black/10" />
                </div>
              </div>

              {/* iMac Stand */}
              <div
                className="w-[16%] h-[20%] bg-gradient-to-b from-[#d1d1d1] to-[#999] rounded-b -mt-1 md:-mt-2 z-[-1]"
                style={{ clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0% 100%)" }}
              />
              <div className="w-[30%] h-[6px] md:h-[10px] bg-gradient-to-r from-[#888] via-[#aaa] to-[#888] rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
