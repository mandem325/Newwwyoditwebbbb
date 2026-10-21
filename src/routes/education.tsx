import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Award, ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { education } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/education")({
  component: EducationPage,
});

function EducationPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero Entrance
      gsap.from(".edu-hero-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.6,
        ease: "power4.out",
      });

      gsap.from(".edu-hero-desc", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.85,
        ease: "power3.out",
      });

      // Rotating Icon on scroll
      gsap.to(".edu-icon-rotate", {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Background Art subtle scale & parallax
      gsap.to(".edu-bg-art", {
        yPercent: 8,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Reveal Cards
      const cards = gsap.utils.toArray<HTMLElement>(".edu-card-reveal");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          },
        );
      });

      // Image Unroll Effect
      const images = gsap.utils.toArray<HTMLElement>(".edu-img-unroll");
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            ease: "power3.inOut",
            duration: 1.5,
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top 75%",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <AwardWinningTransition
      type="sweep-right"
      overlayColor="#e8ded4"
      className="relative bg-[#f4ece5] text-[#2c2b29] dark:bg-[#08080a] dark:text-[#f3f4f6] min-h-[200vh] transition-colors duration-300"
      ref={containerRef}
    >
      {/* Video Background - Very subtle */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-[0.03] mix-blend-multiply pointer-events-none"
        src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"
      />

      <nav className="fixed top-0 w-full p-6 md:p-10 flex items-center justify-between z-50 mix-blend-difference text-white pointer-events-none">
        <Link
          to="/"
          className="group relative flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-500 shadow-lg rounded-xl overflow-hidden pointer-events-auto"
          aria-label="Back to home"
        >
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[0.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-[0.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
            <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Back</span>
          </div>
        </Link>
      </nav>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Fixed Left Column */}
        <div className="w-full md:w-5/12 md:fixed top-0 left-0 h-[40vh] md:h-screen p-10 flex flex-col justify-center items-center md:items-start border-r border-[#2c2b29]/10 bg-[#f4ece5] z-10 overflow-hidden relative">
          {/* Background Artwork */}
          <img
            src="/education_bg_art.png"
            alt="Education Background Sculpture"
            className="edu-bg-art absolute inset-0 w-full h-full object-contain md:object-cover object-bottom md:object-right-bottom opacity-25 md:opacity-30 pointer-events-none select-none mix-blend-multiply"
          />

          <div className="relative z-10 flex flex-col items-center md:items-start">
            <div className="mb-10 text-[#c15c3d] edu-icon-rotate">
              <BookOpen size={64} strokeWidth={1} />
            </div>
            <h1 className="text-6xl md:text-8xl font-serif-display leading-[0.9] tracking-tighter text-center md:text-left edu-hero-title">
              The <br /> Foundation <br /> of{" "}
              <span className="italic text-[#c15c3d]">Thought.</span>
            </h1>
            <p className="mt-8 text-sm md:text-base font-mono uppercase tracking-widest text-[#2c2b29]/60 max-w-xs text-center md:text-left edu-hero-desc">
              Rigorous academic training that shapes strategic community leadership.
            </p>
          </div>
        </div>

        {/* Scrolling Right Column */}
        <div className="w-full md:w-7/12 md:ml-auto p-6 md:p-20 pt-20 md:pt-40 pb-40 space-y-32 relative z-10 bg-[#f4ece5]">
          {education.map((edu, i) => (
            <div key={i} className="group edu-card-reveal">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 rounded-full bg-[#2c2b29] text-[#f4ece5] flex items-center justify-center">
                  <GraduationCap size={24} strokeWidth={1.5} />
                </span>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#c15c3d]">
                  {edu.year}
                </span>
              </div>
              <div className="relative overflow-hidden rounded-3xl mb-8 border border-[#2c2b29]/10 dark:border-white/10 shadow-xl group-hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#111219] text-[#2c2b29] dark:text-[#f3f4f6]">
                <div className="edu-img-unroll absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 grayscale" />
                <div className="p-10 md:p-14 relative z-10 backdrop-blur-sm">
                  <h2 className="text-4xl md:text-5xl font-serif-display mb-4 text-[#2c2b29] dark:text-white">{edu.degree}</h2>
                  <h3 className="text-xl font-sans tracking-wide text-[#2c2b29]/70 dark:text-white/70 mb-8 uppercase">
                    {edu.institution}
                  </h3>
                  <div className="h-px w-full bg-[#2c2b29]/10 dark:bg-white/10 mb-8" />
                  <p className="text-lg text-[#2c2b29]/80 dark:text-white/80 font-light leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AwardWinningTransition>
  );
}
