import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Globe2, Shield, Landmark } from "lucide-react";
import { useRef, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { experiences } from "@/data";
import { ExpTransition } from "@/components/transitions/ExpTransition";
import { SubpageMenuHeader } from "@/components/SubpageMenuHeader";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/experience_/$id")({
  component: ExperienceDetail,
  loader: ({ params }) => {
    const id = parseInt(params.id, 10);
    const exp = experiences[id];
    if (!exp) {
      throw notFound();
    }
    return { exp, index: id };
  },
});

type ExpData = (typeof experiences)[0] & { gallery?: string[] };

// ==========================================
// 1. MINIMALIST MUSEUM / EDITORIAL (Index 0)
// ==========================================
function ExperienceZero({ exp }: { exp: ExpData }) {
  const container = useRef<HTMLDivElement>(null);
  const gallery = exp.gallery || [exp.image, exp.image, exp.image, exp.image];

  useGSAP(
    () => {
      const titles = new SplitType(".split-title", { types: "chars" });
      gsap.from(titles.chars, {
        y: 100,
        opacity: 0,
        rotationZ: 10,
        stagger: 0.02,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.utils.toArray(".fade-up-0").forEach((el: unknown) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".gal-0-img").forEach((el: unknown) => {
        gsap.fromTo(
          el,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
        const img = el.querySelector("img");
        if (img) {
          gsap.to(img, { yPercent: 20, ease: "none", scrollTrigger: { trigger: el, scrub: true } });
        }
      });
    },
    { scope: container },
  );

  return (
    <main
      ref={container}
      className="min-h-screen bg-[#F2F0E9] text-[#1A1A1A] dark:bg-[#08080a] dark:text-[#f3f4f6] selection:bg-[#1A1A1A] selection:text-[#F2F0E9] dark:selection:bg-white dark:selection:text-black transition-colors duration-300"
    >
      <nav className="fixed top-0 w-full p-8 md:p-12 flex items-center justify-between z-50 mix-blend-difference text-white pointer-events-none">
        <Link
          to="/experience"
          className="group pointer-events-auto flex items-center gap-4 text-white"
        >
          <div className="flex flex-col gap-2 items-start overflow-hidden relative">
            <span className="font-sans font-light text-[11px] uppercase tracking-[0.4em] opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              Exit
            </span>
            <div className="w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </div>
        </Link>
      </nav>

      <header className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="fade-up-0 font-mono text-xs tracking-[0.3em] uppercase mb-8 border border-black/10 px-6 py-2 rounded-full">
          {exp.period}
        </div>
        <h1 className="split-title text-5xl md:text-7xl lg:text-[7rem] font-serif font-light leading-[1.1] tracking-tight mb-8">
          {exp.role}
        </h1>
        <div className="fade-up-0 text-xl md:text-3xl font-light text-black/60 italic font-serif">
          @ {exp.org}{" "}
          <span className="not-italic font-sans text-sm tracking-widest uppercase ml-4">
            {exp.location}
          </span>
        </div>
      </header>

      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
        <div className="gal-0-img relative w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-sm">
          <img
            src={exp.image}
            alt={exp.role}
            className="w-full h-[120%] object-cover -top-[10%] absolute grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center mb-32">
        <h2 className="fade-up-0 text-xs font-mono uppercase tracking-[0.4em] text-black/40 mb-12">
          01 — The Mission
        </h2>
        <p className="fade-up-0 text-3xl md:text-5xl font-serif font-light leading-relaxed text-black/90">
          "{exp.body}"
        </p>
      </section>

      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-40">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mb-10">
          <div className="md:col-span-5 md:mt-24 gal-0-img relative h-[50vh] md:h-[70vh] overflow-hidden">
            <img
              src={gallery[1]}
              className="w-full h-[120%] object-cover -top-[10%] absolute grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="md:col-span-7 gal-0-img relative h-[50vh] md:h-[85vh] overflow-hidden">
            <img
              src={gallery[2]}
              className="w-full h-[120%] object-cover -top-[10%] absolute grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>
        <div className="gal-0-img relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
          <img
            src={gallery[3]}
            className="w-full h-[120%] object-cover -top-[10%] absolute grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>
      </section>

      <section className="py-32 bg-[#E9E7E0] px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="fade-up-0 text-xs font-mono uppercase tracking-[0.4em] text-black/40 mb-20 border-b border-black/10 pb-8">
            03 — Strategic Impact
          </h2>
          {exp.bullets.map((b: string, i: number) => (
            <div
              key={i}
              className="fade-up-0 flex flex-col md:flex-row md:items-baseline gap-6 mb-16 group cursor-default"
            >
              <div className="font-mono text-sm tracking-widest text-black/30 w-16 group-hover:text-black/80 transition-colors">
                / 0{i + 1}
              </div>
              <p className="text-xl md:text-3xl font-light text-black/70 leading-relaxed font-serif group-hover:text-black transition-colors">
                {b}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <h2 className="fade-up-0 text-xs font-mono uppercase tracking-[0.4em] text-black/40 mb-12">
          04 — Competencies
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {exp.tags.map((tag: string, i: number) => (
            <div
              key={i}
              className="fade-up-0 px-8 py-4 rounded-full border border-black/10 bg-transparent font-mono text-xs tracking-widest uppercase hover:bg-black hover:text-[#F2F0E9] transition-colors duration-500 cursor-default"
            >
              {tag}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ==========================================
// 2. TECH BENTO / GLASSMORPHISM (Index 1)
// ==========================================
function ExperienceOne({ exp }: { exp: ExpData }) {
  const container = useRef<HTMLDivElement>(null);
  const gallery = exp.gallery || [exp.image, exp.image, exp.image, exp.image];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  useGSAP(
    () => {
      gsap.from(".exp1-reveal", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
      });

      gsap.from(".exp1-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power3.out",
      });

      gsap.from(".exp1-img", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".exp1-gallery",
          start: "top 80%",
        },
      });

      gsap.from(".exp1-bullet", {
        x: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".exp1-bullets-container",
          start: "top 75%",
        },
      });

      gsap.to(".exp1-hero-img-inner", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".exp1-hero-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray(".exp1-gallery-img").forEach((img: unknown) => {
        gsap.to(img, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <main
      ref={container}
      className="min-h-screen bg-[#050505] text-[#F3F3F3] font-sans selection:bg-amber-500/30 overflow-x-hidden"
    >
      <nav className="fixed top-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <Link to="/experience" className="group pointer-events-auto flex items-center gap-6">
          <div className="w-12 h-[2px] bg-amber-500/30 relative overflow-hidden group-hover:w-20 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
            <div className="absolute inset-0 bg-amber-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </div>
          <span className="font-sans font-light text-[11px] uppercase tracking-[0.3em] text-amber-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            Return
          </span>
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-end">
        <div className="flex-1">
          <div className="exp1-reveal font-mono text-xs tracking-[0.2em] uppercase text-amber-500 mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-amber-500/50" />
            {exp.period}
          </div>
          <h1 className="exp1-reveal text-5xl md:text-7xl lg:text-[5.5rem] font-syne font-light tracking-tighter leading-[1.05] text-white flex items-center flex-wrap gap-4 md:gap-6">
            {exp.role}
            <span className="inline-block w-24 h-16 md:w-32 md:h-20 lg:w-48 lg:h-24 rounded-full overflow-hidden border border-white/20 align-middle ml-2 mt-2">
              <img
                src={exp.image}
                alt="Role showcase"
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
            </span>
          </h1>
        </div>
        <div className="md:w-[35%] pb-4">
          <div className="exp1-reveal text-xl font-light text-white/60 mb-2">{exp.org}</div>
          <div className="exp1-reveal text-sm font-mono tracking-widest uppercase text-white/30">
            {exp.location}
          </div>
        </div>
      </header>

      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
        <div className="exp1-line w-full h-px bg-white/10" />
      </div>

      {/* Abstract Mission Statement */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-4 exp1-reveal">
          <h2 className="font-mono text-xs tracking-widest uppercase text-white/40 mb-6">
            Overview
          </h2>
          <p className="text-sm font-mono leading-relaxed text-white/30">
            Strategic execution and operational excellence mapped across key performance indicators.
          </p>
        </div>
        <div className="md:col-span-8 exp1-reveal">
          <p className="text-2xl md:text-4xl font-light leading-[1.4] text-white/90">{exp.body}</p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 exp1-hero-container">
        <div className="exp1-img w-full h-[60vh] lg:h-[80vh] rounded-2xl overflow-hidden border border-white/5 relative group bg-[#111]">
          <img
            src={exp.image}
            alt={exp.role}
            className="exp1-hero-img-inner absolute top-[-15%] left-0 w-full h-[130%] object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-8 right-8 bg-black/50 backdrop-blur-md border border-white/10 rounded-full w-24 h-24 flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-700">
            <ArrowRight size={32} className="text-white font-light" />
          </div>
        </div>
      </section>

      {/* Execution Details & Tags */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 grid md:grid-cols-12 gap-16 lg:gap-24 exp1-bullets-container">
        {/* Left Column: Bullets */}
        <div className="md:col-span-8 flex flex-col gap-12">
          <div>
            <h2 className="font-mono text-xs tracking-widest uppercase text-amber-500 mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-amber-500/50" />
              Key Initiatives
            </h2>
            <div className="flex flex-col gap-6">
              {exp.bullets.map((bullet: string, idx: number) => (
                <div key={idx} className="exp1-bullet flex gap-6 items-start group">
                  <div className="font-mono text-xs text-white/30 mt-2">
                    {(idx + 1).toString().padStart(2, "0")}
                  </div>
                  <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tags */}
        <div className="md:col-span-4">
          <div className="sticky top-32">
            <h2 className="font-mono text-xs tracking-widest uppercase text-white/40 mb-8">
              Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="exp1-bullet px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-white/70 uppercase hover:bg-white/10 hover:text-white transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mini Gallery / Visuals */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 exp1-gallery">
        <h2 className="font-mono text-xs tracking-widest uppercase text-white/40 mb-8 border-b border-white/10 pb-4">
          Visual Documentation
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.slice(0, 4).map((img: string, idx: number) => (
            <div
              key={idx}
              className="exp1-img aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 bg-[#111] relative group"
            >
              <img
                src={img}
                className="exp1-gallery-img absolute top-[-10%] left-0 w-full h-[120%] object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-amber-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ==========================================
// 3. BRUTALIST CINEMATIC (Index 2)
// ==========================================
function ExperienceTwo({ exp }: { exp: ExpData }) {
  const container = useRef<HTMLDivElement>(null);
  const gallery = exp.gallery || [exp.image, exp.image, exp.image, exp.image];

  useGSAP(
    () => {
      gsap.from(".brutal-text", {
        x: -150,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".brutal-hero", start: "top 80%" },
      });

      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: { trigger: ".marquee", scrub: true },
      });

      gsap.utils.toArray(".film-strip img").forEach((img: unknown) => {
        gsap.fromTo(
          img,
          { filter: "grayscale(100%) contrast(1.5)" },
          {
            filter: "grayscale(0%) contrast(1)",
            duration: 1,
            scrollTrigger: { trigger: img, start: "top 60%", end: "top 30%", scrub: true },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <main ref={container} className="min-h-screen bg-[#050505] text-[#F3F3F3] overflow-x-hidden">
      <nav className="fixed top-0 w-full p-8 md:p-12 flex justify-between z-50 mix-blend-difference text-white pointer-events-none">
        <Link to="/experience" className="group pointer-events-auto flex items-center gap-4">
          <div className="w-8 h-8 border border-white/30 flex items-center justify-center group-hover:rotate-90 group-hover:border-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
            <div className="w-1 h-1 bg-white opacity-50 group-hover:scale-150 group-hover:opacity-100 transition-all duration-500" />
          </div>
          <span className="font-sans font-medium text-[10px] uppercase tracking-[0.4em] opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
            Back
          </span>
        </Link>
        <span className="font-sans font-light text-[10px] uppercase tracking-[0.2em] opacity-50 pointer-events-auto">
          {exp.period}
        </span>
      </nav>

      <header className="brutal-hero relative h-[90vh] flex flex-col justify-end p-6 md:p-12 pb-24 border-b-8 border-white">
        <div className="absolute inset-0 bg-black z-0">
          <img
            src={exp.image}
            className="w-full h-full object-cover opacity-50 grayscale contrast-125"
          />
        </div>
        <div className="relative z-10 pointer-events-none">
          <h1 className="brutal-text text-[15vw] md:text-[12vw] font-black uppercase leading-[0.8] tracking-tighter text-white mix-blend-overlay">
            {exp.role}
          </h1>
          <h1
            className="brutal-text text-[15vw] md:text-[12vw] font-black uppercase leading-[0.8] tracking-tighter text-transparent absolute top-0 left-0"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
          >
            {exp.role}
          </h1>
        </div>
      </header>

      <div className="marquee w-full overflow-hidden whitespace-nowrap bg-white text-black dark:bg-[#0f1118] dark:text-white py-4 border-b-8 border-black dark:border-white/20 transition-colors duration-300">
        <div className="marquee-inner inline-block font-black uppercase text-4xl md:text-6xl tracking-tighter">
          {Array(10).fill(`${exp.org} /// ${exp.location} /// `).join("")}
        </div>
      </div>

      <section className="py-32 md:py-48 px-6 md:px-12 max-w-6xl mx-auto">
        <p className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9] text-white">
          {exp.body}
        </p>
      </section>

      <section className="py-20 film-strip">
        <div className="flex flex-col gap-10 md:gap-20">
          <div className="w-[90vw] md:w-[70vw] h-[60vh] md:h-[80vh] border-[10px] md:border-[20px] border-white/10 p-2 md:p-4 ml-[5vw] hover:border-white transition-colors duration-700 bg-black">
            <img src={gallery[0]} className="w-full h-full object-cover grayscale" />
          </div>
          <div className="w-[85vw] md:w-[60vw] h-[50vh] md:h-[70vh] border-[10px] md:border-[20px] border-white/10 p-2 md:p-4 ml-auto mr-[5vw] hover:border-white transition-colors duration-700 bg-black relative z-10 md:-mt-[15vh]">
            <img src={gallery[1]} className="w-full h-full object-cover grayscale" />
          </div>
          <div className="w-[95vw] md:w-[80vw] h-[40vh] md:h-[60vh] border-[10px] md:border-[20px] border-white/10 p-2 md:p-4 mx-auto hover:border-white transition-colors duration-700 bg-black">
            <img src={gallery[2]} className="w-full h-full object-cover grayscale" />
          </div>
          <div className="w-[90vw] md:w-[65vw] h-[60vh] md:h-[80vh] border-[10px] md:border-[20px] border-white/10 p-2 md:p-4 ml-[10vw] hover:border-white transition-colors duration-700 bg-black relative z-10 md:-mt-[10vh]">
            <img src={gallery[3]} className="w-full h-full object-cover grayscale" />
          </div>
        </div>
      </section>

      <section className="py-32 md:py-48 px-6 md:px-12 bg-white text-black dark:bg-[#08080a] dark:text-[#f3f4f6] transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[12vw] md:text-9xl font-black uppercase tracking-tighter mb-20 md:mb-32">
            IMPACT_
          </h2>
          <div className="space-y-16 md:space-y-32">
            {exp.bullets.map((b: string, i: number) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-6 md:gap-16 group border-b-[4px] border-black dark:border-white/20 pb-16 transition-colors duration-300"
              >
                <div
                  className="text-7xl md:text-9xl font-black text-transparent group-hover:text-black dark:group-hover:text-white transition-colors"
                  style={{ WebkitTextStroke: "2px currentColor" }}
                >
                  0{i + 1}
                </div>
                <p className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-none max-w-4xl pt-4">
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto bg-[#050505]">
        <div className="flex flex-wrap gap-4 md:gap-6">
          {exp.tags.map((tag: string, i: number) => (
            <div
              key={i}
              className="px-6 py-4 md:px-10 md:py-6 border-4 border-white font-bold text-xl md:text-3xl uppercase tracking-tighter hover:bg-white hover:text-black transition-colors duration-300"
            >
              {tag}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ==========================================
// ROUTER COMPONENT
// ==========================================
function ExperienceDetail() {
  const { exp, index } = Route.useLoaderData();

  const renderContent = () => {
    if (index === 0) return <ExperienceZero exp={exp} />;
    if (index === 1) return <ExperienceOne exp={exp} />;
    if (index === 2) return <ExperienceTwo exp={exp} />;
    return <ExperienceZero exp={exp} />;
  };

  return (
    <>
      <ExpTransition key={index} index={index} />
      <SubpageMenuHeader
        title="Experience"
        items={experiences.map((e, i) => ({ label: e.role, href: `/experience/${i}` }))}
      />
      {renderContent()}
    </>
  );
}
