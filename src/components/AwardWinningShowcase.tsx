import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const works = [
  {
    id: "01",
    title: "ABOUT",
    category: "THE VISION",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200",
    link: "/about",
  },
  {
    id: "02",
    title: "EDUCATION",
    category: "ACADEMIC",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200",
    link: "/education",
  },
  {
    id: "03",
    title: "CERTIFICATES",
    category: "",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
    link: "/certificates",
  },
  {
    id: "04",
    title: "EXPERIENCE",
    category: "PROFESSIONAL",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200",
    link: "/experience",
  },
  {
    id: "05",
    title: "SKILLS",
    category: "",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
    link: "/skills",
  },
  {
    id: "06",
    title: "PROJECTS",
    category: "",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200",
    link: "/projects",
  },
  {
    id: "07",
    title: "IMPACT",
    category: "GLOBAL REACH",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200",
    link: "/impact",
  },
  {
    id: "08",
    title: "ADVOCACY",
    category: "SOCIAL IMPACT",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
    link: "/advocacy",
  },
  {
    id: "09",
    title: "PUBLICATIONS",
    category: "WRITTEN WORK",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
    link: "/publications",
  },
  {
    id: "10",
    title: "GALLERY",
    category: "VISUAL ARCHIVE",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
    link: "/gallery",
  },
  {
    id: "11",
    title: "CONTACT",
    category: "GET IN TOUCH",
    img: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd28?q=80&w=1200",
    link: "/contact",
  },
  {
    id: "12",
    title: "REFERENCES",
    category: "TESTIMONIALS",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
    link: "/references",
  },
];

export function AwardWinningShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Calculate total horizontal scroll distance based on the track's full width minus the viewport
      const scrollWidth = track.scrollWidth - window.innerWidth;

      // The main timeline that pins the section and drives the horizontal animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=" + scrollWidth, // The user scrolls down by the exact width of the horizontal track
          pin: true,
          scrub: 1, // Smooth catch-up
        },
      });

      // Move the track to the left
      tl.to(
        track,
        {
          x: -scrollWidth,
          ease: "none",
        },
        0,
      );

      // Parallax the massive background text in the opposite direction
      tl.to(
        ".bg-marquee",
        {
          x: "35%",
          ease: "none",
        },
        0,
      );

      // Inner image parallax (counter-movement inside the card boundaries)
      gsap.utils.toArray<HTMLElement>(".aw-card-img").forEach((img) => {
        gsap.fromTo(
          img,
          { x: "-40%", scale: 1.15 },
          {
            x: "40%",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=" + scrollWidth,
              scrub: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center"
    >
      {/* Background Marquee Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vw] pointer-events-none z-0">
        <h1 className="bg-marquee font-display font-extrabold text-[25vw] leading-[0.8] tracking-tighter text-[#151515] whitespace-nowrap">
          CREATIVE DIRECTION — VISIONARY — AESTHETIC
        </h1>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="flex gap-[15vw] md:gap-[10vw] px-[50vw] items-center h-full relative z-10 w-max"
      >
        {works.map((work) => (
          <Link
            key={work.id}
            to={work.link}
            className="group relative flex flex-col items-center justify-center shrink-0 w-[75vw] md:w-[35vw] cursor-pointer"
          >
            {/* Image Container with strict bounds */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm group-hover:shadow-[0_0_80px_rgba(204,255,0,0.15)] transition-shadow duration-700">
              <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-700" />

              <img
                src={work.img}
                alt={work.title}
                className="aw-card-img absolute inset-0 w-[140%] h-full object-cover filter grayscale-[100%] contrast-125 group-hover:grayscale-0 group-hover:scale-[1.1] transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
              />

              {/* Floating Action Button on Hover */}
            </div>

            {/* Typography escaping the box */}
            <div className="absolute -left-8 md:-left-16 top-1/2 -translate-y-1/2 mix-blend-difference z-20 pointer-events-none">
              <h2 className="font-display font-bold text-6xl md:text-9xl text-white tracking-tighter opacity-30 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
                {work.id}
              </h2>
            </div>

            <div className="absolute -bottom-8 md:-bottom-12 left-0 w-full flex justify-between items-end z-20 mix-blend-difference pointer-events-none pl-4 md:pl-0">
              <h3 className="font-display text-4xl md:text-6xl text-white tracking-tighter uppercase group-hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
                {work.title}
              </h3>
              <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-lime uppercase group-hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] delay-75">
                {work.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
