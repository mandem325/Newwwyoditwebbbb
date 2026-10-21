import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FlyingButterfliesOverlay } from "@/components/FlyingButterfliesOverlay";
import {
  ResonanceHorizontalReplica,
  TOP_CAROUSEL_EXTENDED,
  BOTTOM_CAROUSEL_EXTENDED,
} from "@/components/ResonanceHorizontalReplica";

gsap.registerPlugin(ScrollTrigger);

interface SlideItem {
  id: number;
  label: string;
  subLabel: string;
  videoSrc: string;
  posterSrc: string;
  alt: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 0,
    label: "TRAINING",
    subLabel: "From",
    videoSrc: "/1056172892_1790119963251319.mp4",
    posterSrc: "",
    alt: "Community Training & Capacity Building Workshops",
  },
  {
    id: 1,
    label: "ADVOCACY",
    subLabel: "to",
    videoSrc: "/888918348_1790118294875269.mp4",
    posterSrc: "",
    alt: "Youth Advocacy & Multi-Agency Policy Consortia",
  },
  {
    id: 2,
    label: "PROTECTION",
    subLabel: "to",
    videoSrc: "/371004925_1790119928020215.mp4",
    posterSrc: "",
    alt: "Adolescent Girls Protection & Community Safeguarding",
  },
];

export function VeroEssenceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const eyebrowTopRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const letterOAnchorRef = useRef<HTMLSpanElement>(null);
  const oBorderRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);
  const media1Ref = useRef<HTMLDivElement>(null);
  const media2Ref = useRef<HTMLDivElement>(null);
  const media3Ref = useRef<HTMLDivElement>(null);
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const overlay3Ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const carouselsBgRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);

  useGSAP(
    () => {
      if (!containerRef.current || !pinWrapperRef.current || !cardWrapperRef.current) return;

      const computeAnchor = () => {
        if (!pinWrapperRef.current || !letterOAnchorRef.current) {
          const fallbackW = Math.min(130, Math.max(60, window.innerWidth * 0.08));
          const fallbackH = fallbackW * 1.28;
          return {
            left: (window.innerWidth - fallbackW) / 2,
            top: window.innerHeight * 0.44 - fallbackH / 2,
            width: fallbackW,
            height: fallbackH,
          };
        }
        const pinRect = pinWrapperRef.current.getBoundingClientRect();
        const oRect = letterOAnchorRef.current.getBoundingClientRect();
        const width = oRect.width > 15 ? oRect.width : 90;
        const height = oRect.height > 15 ? oRect.height : 120;
        return {
          left: oRect.left - pinRect.left,
          top: oRect.top - pinRect.top,
          width,
          height,
        };
      };

      const initialAnchor = computeAnchor();

      // Initial placement: cardWrapper is an elegant oval exactly overlaying the letter "O"
      gsap.set(cardWrapperRef.current, {
        position: "absolute",
        left: initialAnchor.left,
        top: initialAnchor.top,
        width: initialAnchor.width,
        height: initialAnchor.height,
        borderRadius: "50%",
        xPercent: 0,
        yPercent: 0,
        x: 0,
        y: 0,
        transformOrigin: "center center",
      });

      if (oBorderRef.current) {
        gsap.set(oBorderRef.current, { opacity: 1 });
      }

      if (trackRef.current) {
        gsap.set(trackRef.current, { xPercent: 0 });
      }

      if (media1Ref.current) {
        gsap.set(media1Ref.current, { xPercent: 0, scale: 1 });
      }
      if (media2Ref.current) {
        gsap.set(media2Ref.current, { xPercent: -45, scale: 1.15 });
      }
      if (media3Ref.current) {
        gsap.set(media3Ref.current, { xPercent: -45, scale: 1.15 });
      }
      if (overlay1Ref.current) {
        gsap.set(overlay1Ref.current, { xPercent: 0, opacity: 0 });
      }
      if (overlay2Ref.current) {
        gsap.set(overlay2Ref.current, { xPercent: 60, opacity: 0 });
      }
      if (overlay3Ref.current) {
        gsap.set(overlay3Ref.current, { xPercent: 60, opacity: 0 });
      }

      const totalScroll = 3400; // Optimal scroll track for smooth scrub

      // Master ScrollTrigger timeline that controls the sequence exactly matching the reference video
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "essence-of-vero-st",
          trigger: pinWrapperRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: pinWrapperRef.current,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            // 0 -> 0.48: Emergence from letter O + Fullscreen Slide 1 (Dress)
            // 0.48 -> 0.80: Transition to & Fullscreen Slide 2 (Data)
            // 0.80 -> 1.0: Transition to & Fullscreen Slide 3 (Sculpture)
            if (p < 0.48) {
              setActiveSlide(0);
            } else if (p < 0.8) {
              setActiveSlide(1);
            } else {
              setActiveSlide(2);
            }

            // Mark when the horizontal video track is actively expanded and scrolling
            if (cardWrapperRef.current) {
              if (p > 0.12 && p < 0.99) {
                cardWrapperRef.current.setAttribute("data-video-scroll-active", "true");
              } else {
                cardWrapperRef.current.removeAttribute("data-video-scroll-active");
              }
            }
          },
        },
      });

      // -------------------------------------------------------------------
      // PHASE 1 (0 to 1.0 in timeline):
      // The video EMERGES from the letter "O" in "INNOVATION":
      // It morphs from the letter O (oval, border-radius 50%, matching anchor position)
      // into fullscreen (100vw x 100vh, border-radius 0px).
      // The background headline text and top eyebrow scale up slightly and fade to 0.
      // The letter O hairline ring fades out immediately.
      // The navigation dots and bottom caption fade in.
      // -------------------------------------------------------------------
      tl.fromTo(
        cardWrapperRef.current,
        {
          left: () => computeAnchor().left,
          top: () => computeAnchor().top,
          width: () => computeAnchor().width,
          height: () => computeAnchor().height,
          borderRadius: "50%",
        },
        {
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          duration: 1.0,
          ease: "power2.inOut",
        },
        0,
      )
        .to(
          oBorderRef.current,
          {
            opacity: 0,
            duration: 0.25,
            ease: "power1.out",
          },
          0,
        )
        .to(
          textLayerRef.current,
          {
            scale: 1.12,
            opacity: 0,
            duration: 0.65,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          carouselsBgRef.current,
          {
            opacity: 0,
            duration: 0.55,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          eyebrowTopRef.current,
          {
            opacity: 0,
            y: -15,
            duration: 0.5,
            ease: "power2.out",
          },
          0,
        )
        // Reveal navigation diamond dots on left
        .fromTo(
          dotsRef.current,
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
          0.65,
        )
        // Reveal bottom editorial caption
        .fromTo(
          captionRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.65,
        );

      // Reveal Slide 1 editorial watermark as it reaches fullscreen
      if (overlay1Ref.current) {
        tl.fromTo(
          overlay1Ref.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.85,
        );
      }

      // Refresh listener to update letter O anchor on layout changes
      const handleRefreshInit = () => {
        const st = ScrollTrigger.getById("essence-of-vero-st");
        if (st && cardWrapperRef.current) {
          if (st.progress === 0) {
            const a = computeAnchor();
            gsap.set(cardWrapperRef.current, {
              left: a.left,
              top: a.top,
              width: a.width,
              height: a.height,
              borderRadius: "50%",
            });
            if (trackRef.current) gsap.set(trackRef.current, { xPercent: 0 });
            if (media1Ref.current) gsap.set(media1Ref.current, { xPercent: 0, scale: 1 });
            if (media2Ref.current) gsap.set(media2Ref.current, { xPercent: -45, scale: 1.15 });
            if (media3Ref.current) gsap.set(media3Ref.current, { xPercent: -45, scale: 1.15 });
          } else if (st.progress >= 0.25) {
            gsap.set(cardWrapperRef.current, {
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              borderRadius: "0px",
            });
          }
        }
      };

      // HOLD Slide 1 (Dress) fully fullscreen for viewing (1.2 to 1.6)
      tl.to({}, { duration: 0.4 }, 1.2);

      // -------------------------------------------------------------------
      // PHASE 2 (1.6 to 2.6 in timeline):
      // Horizontal slide from DRESS (Slide 1) to DATA (Slide 2) with PARALLAX
      // -------------------------------------------------------------------
      tl.to(
        trackRef.current,
        {
          xPercent: -33.333333,
          duration: 1.0,
          ease: "none",
        },
        1.6,
      );

      // Parallax for Slide 1 (Dress exiting to left): media counter-moves to right (moves slower)
      if (media1Ref.current) {
        tl.to(
          media1Ref.current,
          {
            xPercent: 45,
            scale: 1.15,
            duration: 1.0,
            ease: "none",
          },
          1.6,
        );
      }
      if (overlay1Ref.current) {
        tl.to(
          overlay1Ref.current,
          {
            xPercent: -65,
            opacity: 0,
            duration: 0.8,
            ease: "none",
          },
          1.6,
        );
      }

      // Parallax for Slide 2 (Data entering from right): media glides from left offset to center
      if (media2Ref.current) {
        tl.to(
          media2Ref.current,
          {
            xPercent: 0,
            scale: 1.0,
            duration: 1.0,
            ease: "none",
          },
          1.6,
        );
      }
      if (overlay2Ref.current) {
        tl.to(
          overlay2Ref.current,
          {
            xPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: "none",
          },
          1.6,
        );
      }

      // HOLD Slide 2 (Data) for viewing (2.6 to 3.0)
      tl.to({}, { duration: 0.4 }, 2.6);

      // -------------------------------------------------------------------
      // PHASE 3 (3.0 to 4.0 in timeline):
      // Horizontal slide from DATA (Slide 2) to SCULPTURE (Slide 3) with PARALLAX
      // -------------------------------------------------------------------
      tl.to(
        trackRef.current,
        {
          xPercent: -66.666667,
          duration: 1.0,
          ease: "none",
        },
        3.0,
      );

      // Parallax for Slide 2 (Data exiting to left): media counter-moves to right
      if (media2Ref.current) {
        tl.to(
          media2Ref.current,
          {
            xPercent: 45,
            scale: 1.15,
            duration: 1.0,
            ease: "none",
          },
          3.0,
        );
      }
      if (overlay2Ref.current) {
        tl.to(
          overlay2Ref.current,
          {
            xPercent: -65,
            opacity: 0,
            duration: 0.8,
            ease: "none",
          },
          3.0,
        );
      }

      // Parallax for Slide 3 (Sculpture entering from right): media glides from left offset to center
      if (media3Ref.current) {
        tl.to(
          media3Ref.current,
          {
            xPercent: 0,
            scale: 1.0,
            duration: 1.0,
            ease: "none",
          },
          3.0,
        );
      }
      if (overlay3Ref.current) {
        tl.to(
          overlay3Ref.current,
          {
            xPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: "none",
          },
          3.0,
        );
      }

      // HOLD Slide 3 (Sculpture) before unpinning (4.0 to 4.4)
      tl.to({}, { duration: 0.4 }, 4.0);

      ScrollTrigger.addEventListener("refreshInit", handleRefreshInit);
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", handleRefreshInit);
      };
    },
    { scope: containerRef },
  );
  const handleDotClick = (index: number) => {
    if (!containerRef.current) return;
    const st = ScrollTrigger.getById("essence-of-vero-st");
    if (!st) return;

    // Target positions in the timeline (progress 0 to 1):
    // 0: Fullscreen DRESS hold (progress ~0.31)
    // 1: Fullscreen DATA hold (progress ~0.64)
    // 2: Fullscreen SCULPTURE hold (progress ~0.95)
    const targetProgress = index === 0 ? 0.31 : index === 1 ? 0.64 : 0.95;
    window.scrollTo({
      top: st.start + (st.end - st.start) * targetProgress,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="essence-of-vero"
      data-butterfly-zone="true"
      data-custom-scroll="true"
      className="relative w-full min-h-screen bg-[#f4f4f5] dark:bg-[#08080a] text-[#181615] m-0 p-0 overflow-hidden"
      style={{
        border: "none",
        outline: "none",
        boxShadow: "none",
        fontFamily: "'Louize Display', 'Playfair Display', Georgia, serif",
      }}
    >
      {/* ========================================================================= */}
      {/* PINNED HERO VIEWPORT: Contains initial centered card + full-bleed slideshow */}
      {/* ========================================================================= */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-screen h-[100dvh] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#f4f4f5] dark:bg-[#08080a] text-[#181615] dark:text-[#f3f4f6] transition-colors duration-300"
        style={{ border: "none" }}
      >
        {/* Soft luxury beige background */}
        <div className="absolute inset-0 bg-[#f4f4f5] dark:bg-[#08080a] pointer-events-none -z-[10] transition-colors duration-300" />

        {/* Background Curving Carousels: Top (downward arc) and Repeated Bottom (upward arc) */}
        <div
          ref={carouselsBgRef}
          className="absolute inset-0 pointer-events-none z-[1] overflow-hidden select-none will-change-transform"
        >
          {/* Top Carousel: Arches downward with distinct gallery photographs */}
          <div className="absolute top-0 left-0 right-0 w-full overflow-visible">
            <ResonanceHorizontalReplica
              arcDirection="down"
              initialPosition={0}
              items={TOP_CAROUSEL_EXTENDED}
            />
          </div>

          {/* Repeated Bottom Carousel: Arches upward with different distinct gallery photographs */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-visible">
            <ResonanceHorizontalReplica
              arcDirection="up"
              initialPosition={5}
              reverseDrift={true}
              items={BOTTOM_CAROUSEL_EXTENDED}
            />
          </div>
        </div>

        {/* 1. TOP EYEBROW: the ESSENCE of VERO */}
        <div
          ref={eyebrowTopRef}
          className="absolute top-8 sm:top-12 md:top-14 left-0 right-0 z-[10] flex justify-center items-center pointer-events-none select-none px-4"
        >
          <p
            className="text-[14px] sm:text-[15px] md:text-[16px] tracking-[0.2em] text-[#181615] uppercase font-normal"
            style={{ fontFamily: "'Louize Display', Georgia, serif" }}
          >
            <span
              className="mr-1.5 font-normal"
              style={{
                fontFamily: "'Louize Display', Georgia, serif",
                fontStyle: "italic",
                textTransform: "none",
              }}
            >
              the
            </span>
            <span className="tracking-[0.14em]">ESSENCE</span>
            <span
              className="mx-1.5 font-normal"
              style={{
                fontFamily: "'Louize Display', Georgia, serif",
                fontStyle: "italic",
                textTransform: "none",
              }}
            >
              of
            </span>
            <span className="tracking-[0.18em]">ADVOCACY</span>
          </p>
        </div>

        {/* 2. GIANT HEADLINE TYPOGRAPHY LAYER */}
        <div
          ref={textLayerRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center pointer-events-none z-[10] select-none will-change-transform"
        >
          {/* Line 1: where INNOVATION */}
          <div className="w-full flex items-baseline justify-center gap-3 sm:gap-6 md:gap-8 leading-[0.92] mb-3 sm:mb-6 md:mb-8">
            <span
              className="text-[12vw] md:text-[9.5vw] lg:text-[9vw] font-normal text-[#181615] tracking-tight"
              style={{
                fontFamily: "'Louize Display', Georgia, serif",
                fontStyle: "italic",
                textTransform: "none",
              }}
            >
              where
            </span>
            <div
              className="flex items-baseline uppercase tracking-[-0.02em] text-[11vw] md:text-[9.5vw] lg:text-[9vw] font-normal text-[#181615]"
              style={{ fontFamily: "'Louize Display', Georgia, serif" }}
            >
              <span>INNOVATI</span>
              {/* Letter O placeholder anchor: exact sizing & alignment */}
              <span
                ref={letterOAnchorRef}
                className="relative inline-flex items-center justify-center w-[0.74em] h-[0.96em] mx-[0.01em] align-middle -translate-y-[0.05em] select-none"
              >
                <span className="opacity-0">O</span>
              </span>
              <span>N</span>
            </div>
          </div>

          {/* Line 2: meets LEADERSHIP */}
          <div className="w-full flex items-baseline justify-center gap-3 sm:gap-6 md:gap-8 leading-[0.92]">
            <span
              className="text-[12vw] md:text-[9.5vw] lg:text-[9vw] font-normal text-[#181615] tracking-tight"
              style={{
                fontFamily: "'Louize Display', Georgia, serif",
                fontStyle: "italic",
                textTransform: "none",
              }}
            >
              meets
            </span>
            <span
              className="text-[9.5vw] md:text-[8.5vw] lg:text-[8vw] font-normal text-[#181615] uppercase tracking-[-0.03em]"
              style={{ fontFamily: "'Louize Display', Georgia, serif" }}
            >
              LEADERSHIP
            </span>
          </div>
        </div>

        {/* 3D Butterfly Overlay: Placed in the stacking context so it naturally falls BEHIND the z-[20] video but ABOVE the text */}
        <FlyingButterfliesOverlay />

        {/* 3. INTERACTIVE EXPANDING CARD (Emerges from the letter "O" -> Fullscreen 100vw x 100vh) */}
        <div
          id="vero-essence-video-track"
          data-video-scroll-track="true"
          ref={cardWrapperRef}
          onClick={() => {
            if (!containerRef.current) return;
            const st = ScrollTrigger.getById("essence-of-vero-st");
            if (!st) return;
            if (st.progress < 0.25) {
              window.scrollTo({
                top: st.start + (st.end - st.start) * 0.31,
                behavior: "smooth",
              });
            }
          }}
          className="absolute z-[20] overflow-hidden bg-transparent will-change-[width,height,transform,left,top,border-radius] cursor-pointer group"
          style={{
            transformOrigin: "center center",
          }}
        >
          {/* Hairline editorial contour ring matching the Louize Display letter O */}
          <div
            ref={oBorderRef}
            className="absolute inset-0 rounded-[50%] pointer-events-none border border-[#181615]/30 z-40"
          />

          {/* CONTINUOUS HORIZONTAL FLEX TRACK (300% width, sliding between Dress, Data, Sculpture) */}
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{ width: "300%", height: "100%" }}
          >
            {/* SLIDE 1: DRESS */}
            <div
              ref={slide1Ref}
              className="relative w-1/3 h-full shrink-0 overflow-hidden bg-[#b44b24]"
            >
              {/* Parallax Media Wrapper */}
              <div
                ref={media1Ref}
                className="absolute inset-y-0 -left-[18%] w-[136%] h-full will-change-transform"
              >
                <video
                  src="/1056172892_1790119963251319.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-center select-none"
                />
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
              </div>

              {/* Parallax Floating Typographic Watermark */}
              <div
                ref={overlay1Ref}
                className="absolute top-16 md:top-24 right-10 md:right-20 z-20 pointer-events-none select-none flex flex-col items-end will-change-transform"
              >
                <span
                  className="text-white/20 text-6xl md:text-8xl lg:text-9xl font-normal tracking-wider leading-none"
                  style={{ fontFamily: "'Louize Display', Georgia, serif" }}
                >
                  01
                </span>
                <span className="text-white/30 text-xs md:text-sm tracking-[0.3em] uppercase mt-2 font-mono">
                  COMMUNITY TRAINING
                </span>
              </div>
            </div>

            {/* SLIDE 2: ADVOCACY */}
            <div
              ref={slide2Ref}
              className="relative w-1/3 h-full shrink-0 overflow-hidden bg-[#242426]"
            >
              {/* Soft Edge Depth Shadow */}
              <div className="absolute inset-y-0 left-0 w-28 md:w-52 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none z-25" />

              {/* Parallax Media Wrapper */}
              <div
                ref={media2Ref}
                className="absolute inset-y-0 -left-[18%] w-[136%] h-full will-change-transform"
              >
                <video
                  src="/888918348_1790118294875269.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-center select-none"
                />
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
              </div>

              {/* Parallax Floating Typographic Watermark */}
              <div
                ref={overlay2Ref}
                className="absolute top-16 md:top-24 right-10 md:right-20 z-20 pointer-events-none select-none flex flex-col items-end will-change-transform"
              >
                <span
                  className="text-white/20 text-6xl md:text-8xl lg:text-9xl font-normal tracking-wider leading-none"
                  style={{ fontFamily: "'Louize Display', Georgia, serif" }}
                >
                  02
                </span>
                <span className="text-white/30 text-xs md:text-sm tracking-[0.3em] uppercase mt-2 font-mono">
                  YOUTH ADVOCACY
                </span>
              </div>
            </div>

            {/* SLIDE 3: PROTECTION */}
            <div
              ref={slide3Ref}
              className="relative w-1/3 h-full shrink-0 overflow-hidden bg-[#a6421c]"
            >
              {/* Soft Edge Depth Shadow */}
              <div className="absolute inset-y-0 left-0 w-28 md:w-52 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none z-25" />

              {/* Parallax Media Wrapper */}
              <div
                ref={media3Ref}
                className="absolute inset-y-0 -left-[18%] w-[136%] h-full will-change-transform"
              >
                <video
                  src="/371004925_1790119928020215.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover object-center select-none"
                />
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />
              </div>

              {/* Parallax Floating Typographic Watermark */}
              <div
                ref={overlay3Ref}
                className="absolute top-16 md:top-24 right-10 md:right-20 z-20 pointer-events-none select-none flex flex-col items-end will-change-transform"
              >
                <span
                  className="text-white/20 text-6xl md:text-8xl lg:text-9xl font-normal tracking-wider leading-none"
                  style={{ fontFamily: "'Louize Display', Georgia, serif" }}
                >
                  03
                </span>
                <span className="text-white/30 text-xs md:text-sm tracking-[0.3em] uppercase mt-2 font-mono">
                  REFUGEE PROTECTION
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. LEFT DIAMOND NAVIGATION (Visible once fullscreen) */}
        <div
          ref={dotsRef}
          className="absolute left-6 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-5 select-none"
          style={{ opacity: 0 }}
        >
          {SLIDES.map((slide, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to Slide ${idx + 1}: ${slide.label}`}
                className="group relative flex items-center justify-center p-2 cursor-pointer bg-transparent border-0 outline-none"
                onClick={() => handleDotClick(idx)}
              >
                {/* 45-degree Rotated Diamond Shape */}
                <div
                  className={`w-2.5 h-2.5 rotate-45 transition-all duration-300 ease-out ${
                    isActive
                      ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                      : "border border-white/60 bg-transparent group-hover:border-white group-hover:scale-110 opacity-70"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* 5. BOTTOM EDITORIAL CAPTION: "From DRESS, to DATA, to SCULPTURE." */}
        <div
          ref={captionRef}
          className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-0 right-0 z-40 flex items-center justify-center pointer-events-none px-6 text-center select-none"
          style={{ opacity: 0 }}
        >
          <div
            className="text-white text-base sm:text-xl md:text-2xl lg:text-[26px] font-normal tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
            style={{ fontFamily: "'Louize Display', Georgia, serif" }}
          >
            {/* From TRAINING */}
            <span
              className={`transition-opacity duration-300 ${
                activeSlide === 0 ? "opacity-100 text-white" : "opacity-45 text-white/70"
              }`}
            >
              <span
                className="mr-1.5 font-normal"
                style={{
                  fontFamily: "'Louize Display', Georgia, serif",
                  fontStyle: "italic",
                  textTransform: "none",
                }}
              >
                From
              </span>
              <span className="uppercase tracking-[0.14em]">TRAINING</span>
            </span>
            <span className="opacity-45 mx-1.5">,</span>

            {/* to ADVOCACY */}
            <span
              className={`ml-1.5 transition-opacity duration-300 ${
                activeSlide === 1 ? "opacity-100 text-white" : "opacity-45 text-white/70"
              }`}
            >
              <span
                className="mr-1.5 font-normal"
                style={{
                  fontFamily: "'Louize Display', Georgia, serif",
                  fontStyle: "italic",
                  textTransform: "none",
                }}
              >
                to
              </span>
              <span className="uppercase tracking-[0.14em]">ADVOCACY</span>
            </span>
            <span className="opacity-45 mx-1.5">,</span>

            {/* to PROTECTION. */}
            <span
              className={`ml-1.5 transition-opacity duration-300 ${
                activeSlide === 2 ? "opacity-100 text-white" : "opacity-45 text-white/70"
              }`}
            >
              <span
                className="mr-1.5 font-normal"
                style={{
                  fontFamily: "'Louize Display', Georgia, serif",
                  fontStyle: "italic",
                  textTransform: "none",
                }}
              >
                to
              </span>
              <span className="uppercase tracking-[0.14em]">PROTECTION</span>
              <span>.</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
