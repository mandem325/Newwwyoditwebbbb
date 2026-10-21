import { createFileRoute, Link } from "@tanstack/react-router";
import { Undo2 } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experiences } from "@/data";
import { SubpageMenuHeader } from "@/components/SubpageMenuHeader";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/experience")({
  component: ExperiencePage,
});

const colors = ["#a3e635", "#c15c3d", "#3b82f6", "#a855f7"];

const exps = experiences.map((e, i) => ({
  title: e.role,
  org: e.org,
  date: e.period,
  img: e.image,
  color: colors[i % colors.length],
  desc: e.body,
  bullets: e.bullets,
}));

function Card({ exp, i }: { exp: (typeof exps)[0]; i: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // The last card should never dim/blur because there is no card after it to cover it
    if (i === exps.length - 1) return;

    // Smooth exit animation when covered (as next card scrolls up)
    // Avoid applying filter: blur(0px) initially because CSS filter switches the GPU layer
    // which causes 1px border glitching/blinking in browsers.
    gsap.fromTo(
      cardRef.current,
      { scale: 1, opacity: 1 },
      {
        scale: 0.93,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -25%",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex items-center justify-center sticky top-0 exp-card-container px-4 py-8"
    >
      <div
        ref={cardRef}
        style={{
          top: `${i * 40}px`,
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
        className="relative w-full max-w-[1100px] h-auto max-h-[85vh] min-h-[60vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-[#0b0806] border border-white/10 flex flex-col md:flex-row origin-top exp-card group will-change-transform"
      >
        <div className="w-full md:w-5/12 h-48 md:h-auto md:min-h-full relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-black/0 z-10 transition-opacity duration-700" />
          <img
            src={exp.img}
            alt={exp.title}
            className="w-full h-full object-cover grayscale-0 opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b0806] z-10 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0806] to-transparent z-10 md:hidden" />
        </div>

        <div className="w-full md:w-7/12 flex-1 p-6 sm:p-8 md:p-6 lg:p-8 flex flex-col relative z-20 overflow-hidden">
          <div className="absolute top-0 right-0 p-6 md:p-6 lg:p-8 opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20 hidden sm:block">
            <span
              className="text-[8rem] md:text-[8rem] lg:text-[12rem] font-bold leading-none font-mono"
              style={{ color: exp.color }}
            >
              0{i + 1}
            </span>
          </div>

          <div className="relative z-10 my-auto flex flex-col justify-center h-full">
            <span
              className="font-mono text-xs md:text-sm tracking-widest uppercase mb-1 md:mb-2 block"
              style={{ color: exp.color }}
            >
              {exp.date}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-display font-light uppercase tracking-tighter leading-tight mb-1 md:mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500 line-clamp-2 md:line-clamp-3">
              {exp.title}
            </h2>
            <div className="text-lg md:text-lg lg:text-xl italic font-serif text-white/60 mb-2 md:mb-4">
              @ {exp.org}
            </div>

            <p className="text-sm md:text-sm lg:text-base text-white/50 leading-relaxed max-w-xl font-light line-clamp-3 md:line-clamp-4">
              {exp.desc}
            </p>
            {exp.bullets && exp.bullets.length > 0 && (
              <div className="mt-3 md:mt-4 lg:mt-6 max-w-xl shrink-0">
                <Link
                  to={`/experience/${i}`}
                  className="text-[10px] md:text-[11px] font-mono tracking-widest text-white/40 uppercase mb-2 md:mb-0 border-b border-white/10 pb-2 flex justify-between items-center hover:text-white hover:border-white transition-colors cursor-pointer"
                >
                  <span>More details</span>
                  <span className="text-white/30 group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperiencePage() {
  return (
    <AwardWinningTransition type="doors" className="">
      <SubpageMenuHeader
        title="Experience"
        items={experiences.map((e, i) => ({ label: e.role, href: `/experience/${i}` }))}
      />
      <ExperiencePageContent />
    </AwardWinningTransition>
  );
}

function ExperiencePageContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.6, ease: "power3.out" },
      );

      // Guiding Principles Animations
      gsap.from(".guiding-text > *", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".guiding-text",
          start: "top 80%",
        },
      });

      gsap.from(".guiding-item", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".guiding-list",
          start: "top 70%",
        },
      });

      // Global Footprint Animations
      gsap.to(".footprint-title-highlight", {
        opacity: 1,
        backgroundPosition: "200% center",
        ease: "none",
        scrollTrigger: {
          trigger: ".footprint-section",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      gsap.from(".footprint-stat", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".footprint-title",
          start: "top 70%",
        },
      });

      gsap.from(".footprint-ring", {
        scale: 0.5,
        opacity: 0,
        rotation: 180,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footprint-section",
          start: "top 60%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="relative bg-[#050505] text-white selection:bg-white selection:text-black"
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-lime-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <nav className="fixed top-0 w-full p-6 md:p-10 flex items-center justify-between z-50 mix-blend-difference pointer-events-none">
        <Link
          to="/"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-lime-500/10 backdrop-blur-md border border-lime-500/30 text-lime-400 hover:bg-lime-400 hover:text-black transition-all duration-300 pointer-events-auto"
          aria-label="Back to home"
        >
          <div className="absolute inset-0 rounded-full border border-lime-400/50 scale-110 group-hover:scale-125 group-hover:opacity-0 transition-all duration-500" />
          <Undo2 className="w-5 h-5 group-hover:-rotate-90 group-hover:scale-110 transition-transform duration-300 relative z-10" />
        </Link>
      </nav>

      <section className="relative w-full min-h-screen flex flex-col justify-center items-center pt-32 pb-24 px-6 md:px-10 z-10 text-center overflow-hidden">
        {/* Horizontal Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70 scale-105 pointer-events-none"
            src="/m236201282_1790035231468.mp4"
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#050505]" />
          {/* Solid bottom gradient feather mask to completely eliminate any video bottom edge scanline/blinking glitch */}
          <div className="absolute inset-x-0 -bottom-1 h-36 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pointer-events-none z-10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto hero-text">
          <h1 className="text-5xl md:text-[8rem] font-display font-bold uppercase tracking-tighter leading-none mb-6 text-white drop-shadow-2xl">
            Career <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
              Trajectory
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto">
            A decade of relentless pursuit of excellence in community development, transforming raw
            potential into systemic impact across the horn of Africa.
          </p>
        </div>
      </section>

      <div className="relative z-10 pb-40">
        {exps.map((exp, i) => (
          <Card key={i} exp={exp} i={i} />
        ))}
      </div>

      {/* New Section 1: Guiding Principles */}
      <section className="relative z-10 py-32 md:py-48 px-6 md:px-12 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-20 lg:gap-32">
          {/* Left Column: Huge typography and intro */}
          <div className="w-full lg:w-5/12 guiding-text lg:sticky lg:top-32">
            <div className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-white/40" />
              01 // Core Philosophy
            </div>

            <h2 className="text-5xl md:text-7xl font-display font-light uppercase tracking-tighter leading-[0.85] text-white mb-12">
              Guiding
              <br />
              <span className="font-serif italic text-white/60">Principles</span>
            </h2>

            <p className="text-lg md:text-xl font-light text-white/50 leading-relaxed max-w-md">
              My approach to program management is rooted in the belief that true impact comes from
              empowering local communities and fostering sustainable systems. Every project is an
              opportunity to learn, adapt, and scale what works.
            </p>
          </div>

          {/* Right Column: Elegant List of principles */}
          <div className="w-full lg:w-7/12 flex flex-col gap-12 mt-12 lg:mt-0 guiding-list">
            {[
              {
                title: "Human-Centered Design",
                desc: "Placing the people we serve at the core of every strategic decision, ensuring that solutions are not just effective but culturally and contextually relevant.",
                img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Data-Driven Decisions",
                desc: "Leveraging rigorous analytics and qualitative insights to navigate ambiguity, optimize resources, and measure true systemic impact.",
                img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Systemic Sustainability",
                desc: "Building resilient infrastructures that outlast individual interventions, creating self-sustaining ecosystems of growth and resilience.",
                img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
              },
            ].map((principle, idx) => (
              <div
                key={idx}
                className="group flex flex-col sm:flex-row gap-8 items-start border-t border-white/10 pt-12 guiding-item"
              >
                <div className="w-full sm:w-1/3 overflow-hidden aspect-[4/3] relative rounded-xl shrink-0">
                  <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-700 group-hover:bg-black/10" />
                  <img
                    src={principle.img}
                    alt={principle.title}
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)]"
                  />
                </div>
                <div className="w-full sm:w-2/3 flex flex-col justify-center">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-white/30 mb-4">
                    Principle 0{idx + 1}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500">
                    {principle.title}
                  </h3>
                  <p className="text-white/50 font-light text-sm md:text-base leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Section 2: Global Footprint */}
      <section className="relative z-10 py-32 px-6 md:px-10 bg-[#050505] overflow-hidden footprint-section">
        <div className="max-w-7xl mx-auto text-center relative z-20">
          <h2 className="text-5xl md:text-[8rem] font-display font-black uppercase tracking-tighter leading-none mb-12 text-white/10 relative footprint-title">
            Global Impact
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 footprint-title-highlight">
              Global Impact
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Countries", value: "12+" },
              { label: "Beneficiaries", value: "2M+" },
              { label: "Partners", value: "50+" },
              { label: "Projects", value: "30+" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="footprint-stat p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-white/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Background Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] border-[1px] border-white/10 rounded-full z-10 footprint-ring" />
      </section>
    </main>
  );
}
