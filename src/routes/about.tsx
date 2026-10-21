import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { ArrowRight, MoveLeft } from "lucide-react";
import heroPortrait from "../assets/hero-portrait.png";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const stats = [
  { n: "01", k: "Years Exp", v: "15", suffix: "+" },
  { n: "02", k: "Programs led", v: "40", suffix: "+" },
  { n: "03", k: "Consortiums", v: "5", suffix: "" },
  { n: "04", k: "Impact reach", v: "1M", suffix: "+" },
];

function AboutPage() {
  return (
    <>
      <AboutPageContent />
    </>
  );
}

function AboutPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
    });
    let reqId: number;
    function raf(time: number) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }
    reqId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      // Initial Reveal
      gsap.from(".hero-word", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.08,
        duration: 1.2,
        delay: 0.6,
        ease: "power4.out",
      });

      gsap.from(".hero-desc", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        delay: 0.85,
        ease: "power2.out",
      });

      // Background Art Scroll Parallax
      gsap.to(".about-bg-art", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero-wrap",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Subtle Image Scroll Effect
      gsap.to(".about-portrait", {
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-img-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text Reveal on Scroll
      const textBlocks = gsap.utils.toArray(".text-reveal") as HTMLElement[];
      textBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
            },
          },
        );
      });

      // Horizontal Stats
      const statsContainer = document.querySelector(".stats-wrapper") as HTMLElement;
      if (statsContainer) {
        gsap.to(".stats-track", {
          xPercent: -100,
          x: () => window.innerWidth,
          ease: "none",
          scrollTrigger: {
            trigger: statsContainer,
            pin: true,
            start: "center center",
            end: () => "+=" + statsContainer.offsetWidth,
            scrub: 1,
          },
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <AwardWinningTransition
      type="blinds"
      className="bg-[#111] text-[#EBEBEB] dark:bg-[#070709] dark:text-[#f3f4f6] font-sans selection:bg-[#EBEBEB] selection:text-[#111] dark:selection:bg-white dark:selection:text-black overflow-x-hidden min-h-screen transition-colors duration-300"
      ref={containerRef}
    >
      <nav className="fixed top-0 w-full p-8 flex justify-between z-50 mix-blend-difference text-white pointer-events-none">
        <Link
          to="/"
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-white hover:bg-orange-500 hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(249,115,22,0.2)] pointer-events-auto"
          aria-label="Back to home"
        >
          <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 group-hover:-rotate-12 transition-transform duration-300" />
        </Link>
      </nav>

      {/* Background Wrapper for Hero & Intro */}
      <div className="about-hero-wrap relative bg-[#111] overflow-hidden">
        {/* Background Artwork - Pensatori Irrazionali Transparent Art */}
        <div
          className="about-bg-art absolute inset-0 bg-no-repeat bg-[length:auto_75vh] md:bg-contain bg-right-top opacity-90 md:opacity-95 pointer-events-none z-0"
          style={{
            backgroundImage:
              "url('/Pensatori_Irrazionali_ChatGPT_Image_Aug_12__2026__08_no_bg.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/20 via-transparent to-[#111] pointer-events-none z-0" />

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 overflow-hidden z-10">
          <div className="max-w-7xl relative z-10">
            <p className="font-mono text-xs uppercase tracking-widest mb-12 opacity-50 hero-desc">
              The Architect of Change
            </p>
            <div className="overflow-hidden">
              <h1 className="text-[12vw] leading-[0.85] font-display font-black uppercase tracking-tighter hero-word">
                Yodit
              </h1>
            </div>
            <div className="overflow-hidden flex gap-4 md:gap-8 items-end">
              <h1
                className="text-[12vw] leading-[0.85] font-display font-black uppercase tracking-tighter text-transparent hero-word"
                style={{ WebkitTextStroke: "1px #EBEBEB" }}
              >
                Dejene
              </h1>
              <p className="hidden md:block max-w-sm text-lg font-light opacity-70 mb-4 hero-desc">
                Bridging the gap between high-level policy and localized, community-driven realities
                in Sub-Saharan Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Image & Intro */}
        <section className="relative py-20 md:py-32 px-6 md:px-12 border-t border-[#333]/30 z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-5/12 md:sticky md:top-28 self-start">
              <div className="about-img-container w-full aspect-[1047/1501] max-h-[75vh] md:max-h-[82vh] overflow-hidden rounded-2xl relative border border-white/10 shadow-2xl bg-[#141414] flex items-center justify-center">
                <img
                  src={heroPortrait}
                  alt="Yodit Dejene"
                  className="about-portrait w-full h-full object-cover object-center rounded-2xl opacity-100 transition-all duration-500"
                />
              </div>
            </div>
            <div className="md:w-7/12 flex flex-col justify-center gap-16">
              <div className="text-reveal">
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-6">
                  A Foundation in Resilience
                </h2>
                <p className="font-sans text-xl font-light opacity-70 leading-relaxed">
                  Starting my journey in Ethiopia, I witnessed firsthand the intricate dynamics of
                  gender disparity and community resilience. Earning a Master's in Business
                  Administration provided the structural framework, but my passion for human rights
                  fueled the engine.
                </p>
              </div>
              <div className="text-reveal">
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-6 text-[#c15c3d]">
                  Leading with Empathy
                </h2>
                <p className="font-sans text-xl font-light opacity-70 leading-relaxed">
                  For over a decade, I've designed and directed intersectional sexual and
                  reproductive health and rights (SRHR) programs, managed large-scale consortia, and
                  established community training programs. My work is anchored in translating
                  high-level policy into practical, local realities that prioritize the safety,
                  empowerment, and voices of marginalized young women.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* The Methodology - Explanation Style */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-[#333]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 text-reveal">
            <p className="font-mono text-xs uppercase tracking-widest mb-6 opacity-50">
              Methodology
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-tight mb-8">
              The Architecture <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px #EBEBEB" }}>
                of Impact
              </span>
            </h2>
            <p className="font-sans text-lg font-light opacity-70 leading-relaxed">
              Sustainable change requires a structured approach that balances high-level vision with
              grassroots execution. Here is how I approach complex program management.
            </p>
          </div>

          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-x-12 gap-y-16">
            <div className="text-reveal border-t border-[#333] pt-6">
              <div className="text-4xl font-display font-black text-[#c15c3d] mb-4">01</div>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-4">
                Contextual Analysis
              </h3>
              <p className="font-sans font-light opacity-70 leading-relaxed text-sm">
                Before any action is taken, deep research into the cultural, economic, and social
                dynamics of the target community ensures that interventions are relevant and
                respectful.
              </p>
            </div>
            <div className="text-reveal border-t border-[#333] pt-6">
              <div className="text-4xl font-display font-black text-[#c15c3d] mb-4">02</div>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-4">
                Strategic Design
              </h3>
              <p className="font-sans font-light opacity-70 leading-relaxed text-sm">
                Developing comprehensive roadmaps that align donor objectives with community needs,
                creating actionable frameworks that guide every phase of implementation.
              </p>
            </div>
            <div className="text-reveal border-t border-[#333] pt-6">
              <div className="text-4xl font-display font-black text-[#c15c3d] mb-4">03</div>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-4">
                Capacity Building
              </h3>
              <p className="font-sans font-light opacity-70 leading-relaxed text-sm">
                Empowering local actors by transferring skills and knowledge, ensuring that the
                community possesses the tools required to sustain the initiative long-term.
              </p>
            </div>
            <div className="text-reveal border-t border-[#333] pt-6">
              <div className="text-4xl font-display font-black text-[#c15c3d] mb-4">04</div>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-4">
                Iterative Evaluation
              </h3>
              <p className="font-sans font-light opacity-70 leading-relaxed text-sm">
                Continuous monitoring allows for agile adjustments. By analyzing both quantitative
                data and qualitative feedback, programs remain responsive and effective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Horizontal Scroll */}
      <section className="stats-wrapper h-screen bg-[#EBEBEB] text-[#111] dark:bg-[#0a0a0d] dark:text-[#f3f4f6] flex items-center overflow-hidden border-y border-[#333] dark:border-white/10 transition-colors duration-300">
        <div className="stats-track flex h-full items-center px-12 md:px-32 w-[200vw]">
          {stats.map((s, i) => (
            <div key={i} className="flex-shrink-0 w-[50vw] md:w-[30vw]">
              <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">
                {s.n} / {s.k}
              </div>
              <div className="text-[15vw] md:text-[8vw] font-display font-black tracking-tighter leading-none text-[#c15c3d]">
                {s.v}
                <span className="text-[#111] dark:text-white/40 opacity-20">{s.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Collaboration */}
      <section className="py-32 px-6 md:px-12 border-t border-[#333] dark:border-white/10 relative overflow-hidden bg-[#111] dark:bg-[#070709] transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <p className="font-mono text-xs uppercase tracking-widest mb-8 opacity-50 text-reveal">
            Vision & Collaboration
          </p>
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.9] mb-12 text-reveal">
            Catalyzing <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px #c15c3d" }}>
              Sustainable
            </span>{" "}
            <br />
            Change
          </h2>
          <p className="max-w-2xl text-xl font-light opacity-70 mb-16 text-reveal leading-relaxed">
            True impact is born from the intersection of strategic foresight and grassroots action.
            I am constantly seeking partnerships with visionaries who are ready to dismantle
            barriers and build equitable futures.
          </p>

          <div className="text-reveal">
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-[#EBEBEB] text-[#111] dark:bg-white dark:text-black rounded-full overflow-hidden transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-[#c15c3d] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-mono uppercase tracking-widest text-sm font-bold group-hover:text-white transition-colors duration-500">
                Let's Work Together
              </span>
              <ArrowRight
                className="relative z-10 group-hover:text-white transition-colors duration-500 group-hover:translate-x-1"
                size={18}
              />
            </Link>
          </div>
        </div>

        {/* Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#c15c3d]/5 rounded-full blur-3xl -z-0 pointer-events-none" />
      </section>
    </AwardWinningTransition>
  );
}
