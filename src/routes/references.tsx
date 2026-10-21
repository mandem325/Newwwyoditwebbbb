import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Quote } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { references } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/references")({
  component: ReferencesPage,
});

function ReferencesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero Title Entrance
      gsap.from(".ref-hero-title", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        delay: 0.6,
        ease: "power4.out",
      });

      gsap.from(".ref-hero-quote-icon", {
        scale: 0.3,
        opacity: 0,
        duration: 1,
        delay: 0.45,
        ease: "back.out(1.7)",
      });

      // Split text reveal for quotes
      const quoteElements = gsap.utils.toArray<HTMLElement>(".ref-quote-text");

      quoteElements.forEach((el) => {
        const split = new SplitType(el, { types: "lines,words" });

        gsap.from(split.words, {
          opacity: 0.1,
          stagger: 0.05,
          duration: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
        });
      });

      // Reveal Cards
      const cards = gsap.utils.toArray<HTMLElement>(".ref-contact-card");
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          x: card.classList.contains("reverse-card") ? -100 : 100,
          rotation: card.classList.contains("reverse-card") ? -5 : 5,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <AwardWinningTransition
      type="dome-reveal"
      overlayColor="#8a3e26"
      className="relative min-h-screen bg-[#c15c3d] text-[#f4ece5] dark:bg-[#120a06] dark:text-[#f4ece5] overflow-hidden selection:bg-[#f4ece5] selection:text-[#c15c3d] transition-colors duration-300"
      ref={containerRef}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-20 mix-blend-color-burn pointer-events-none"
        src="https://assets.mixkit.co/videos/preview/mixkit-liquid-paint-background-in-blue-and-pink-40090-large.mp4"
      />
      <div className="fixed inset-0 bg-gradient-to-br from-[#c15c3d] to-[#8a3e26]/80 dark:from-[#120a06] dark:to-[#090503]/90 pointer-events-none transition-colors duration-300" />

      {/* Navigation */}
      <nav className="fixed z-50 w-full p-6 md:p-10 flex items-center justify-between pointer-events-none">
        <Link
          to="/"
          className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0b0806] border border-white/20 text-[#f4ece5] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl pointer-events-auto"
          aria-label="Back to home"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 group-hover:scale-90 transition-transform duration-300" />
        </Link>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-32 flex flex-col items-center">
        <div className="text-center mb-40 pt-20">
          <Quote size={48} className="mx-auto mb-8 text-[#f4ece5]/50 ref-hero-quote-icon" />
          <h1 className="text-6xl md:text-[8rem] font-quote leading-none mb-6 text-[#f4ece5] ref-hero-title">
            Voices of <br /> <span className="italic">Impact.</span>
          </h1>
        </div>

        <div className="w-full space-y-40 pb-32">
          {references.map((ref, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row gap-10 md:gap-20 items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="w-full md:w-7/12 relative">
                <Quote size={120} className="absolute -top-10 -left-10 text-black/5" />
                <p className="ref-quote-text text-3xl md:text-5xl font-quote leading-tight relative z-10">
                  "{ref.quote}"
                </p>
              </div>

              <div
                className={`ref-contact-card w-full md:w-5/12 bg-[#0b0806] text-[#f4ece5] p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden group ${i % 2 !== 0 ? "reverse-card" : ""}`}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-3xl font-bold mb-2 font-sans tracking-tight">{ref.name}</h3>
                <p className="text-[#c15c3d] font-mono text-sm tracking-widest uppercase mb-4">
                  {ref.role}
                </p>
                <p className="text-white/60 mb-10">{ref.org}</p>

                <div className="space-y-4 pt-8 border-t border-white/10">
                  <a
                    href={`tel:${ref.phone}`}
                    className="flex items-center gap-3 font-mono text-sm hover:text-[#c15c3d] transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#c15c3d]" /> {ref.phone}
                  </a>
                  <a
                    href={`mailto:${ref.email}`}
                    className="flex items-center gap-3 font-mono text-sm hover:text-[#c15c3d] transition-colors break-all"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#c15c3d]" /> {ref.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AwardWinningTransition>
  );
}
