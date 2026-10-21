import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { ArrowUpRight, CornerUpLeft } from "lucide-react";
import { experiences } from "@/data";
import { SubpageMenuHeader } from "@/components/SubpageMenuHeader";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});

const PROJECT_THEMES = [
  {
    bg: "#111613",
    text: "#F8F3ED",
    font: "'Playfair Display', serif",
    sans: "'Outfit', sans-serif",
  },
  {
    bg: "#E3DFD6",
    text: "#111613",
    font: "'Cormorant Garamond', serif",
    sans: "'Outfit', sans-serif",
  },
  { bg: "#7A3E2D", text: "#F8F3ED", font: "'Syne', sans-serif", sans: "'Outfit', sans-serif" },
  {
    bg: "#1F2937",
    text: "#F8F3ED",
    font: "'Space Grotesk', sans-serif",
    sans: "'Outfit', sans-serif",
  },
];

function ProjectsPage() {
  return (
    <AwardWinningTransition type="diagonal" className="">
      <ProjectsContent />
    </AwardWinningTransition>
  );
}

function ProjectsContent() {
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useGSAP(
    () => {
      // 1. Hero Reveal
      gsap.from(".hero-word", {
        y: "120%",
        rotate: 5,
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.6,
      });

      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.85,
        ease: "power3.out",
      });

      // 1.5 Hero to Horizontal Premium Transition
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".horizontal-trigger",
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      heroTl.to(
        ".hero-content",
        {
          scale: 0.9,
          y: -100,
          opacity: 0,
          ease: "none",
        },
        0,
      );

      heroTl.fromTo(
        ".horizontal-trigger",
        { borderTopLeftRadius: "10vw", borderTopRightRadius: "10vw" },
        { borderTopLeftRadius: "0vw", borderTopRightRadius: "0vw", ease: "none" },
        0,
      );

      // 2. Horizontal Scroll Setup (using native GSAP pin)
      const sections = gsap.utils.toArray(".horizontal-item");

      const horizontalTween = gsap.to(".horizontal-track", {
        x: () => -(window.innerWidth * (sections.length - 1)) + "px",
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-trigger",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + window.innerWidth * (sections.length - 1),
          invalidateOnRefresh: true,
        },
      });

      // 3. Parallax inside Horizontal
      sections.forEach((sec: Element, index: number) => {
        const img = sec.querySelector(".proj-img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.4, xPercent: index === 0 ? 0 : -35 },
            {
              scale: 1.05,
              xPercent: index === 0 ? 0 : 35,
              ease: "none",
              scrollTrigger:
                index === 0
                  ? {
                      trigger: ".horizontal-trigger",
                      start: "top bottom",
                      end: "top top",
                      scrub: true,
                    }
                  : {
                      trigger: sec,
                      containerAnimation: horizontalTween,
                      start: "left right",
                      end: "right left",
                      scrub: true,
                    },
            },
          );
        }

        const textEls = sec.querySelectorAll(".proj-text");
        if (textEls.length > 0) {
          if (index === 0) {
            // First item animates in vertically as the track rises
            gsap.from(textEls, {
              y: 50,
              opacity: 0,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".horizontal-trigger",
                start: "top 60%",
                end: "top 20%",
                scrub: 1,
              },
            });
          } else {
            // Other items animate in horizontally
            gsap.from(textEls, {
              y: 50,
              opacity: 0,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sec,
                containerAnimation: horizontalTween,
                start: "left 80%",
                end: "left 20%",
                scrub: 1,
              },
            });
          }
        }
      });

      // 4. Outro Award-Winning Reveal
      const outroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".outro-trigger",
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      });

      outroTl.fromTo(
        ".outro-bg",
        { clipPath: "inset(10% 10% 10% 10% round 2rem)", opacity: 0.5 },
        { clipPath: "inset(0% 0% 0% 0% round 0rem)", opacity: 1, ease: "power2.inOut" },
      );

      outroTl.fromTo(
        ".outro-img",
        { scale: 1.3, filter: "blur(10px)" },
        { scale: 1, filter: "blur(0px)", ease: "power2.inOut" },
        "<",
      );

      gsap.fromTo(
        ".outro-text",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".outro-trigger",
            start: "top 60%", // Triggers when the section reaches 60% of viewport height
          },
        },
      );
    },
    { scope: mainRef },
  );

  return (
    <main ref={mainRef} className="relative min-h-screen bg-[#111613] text-[#e8e6e1]">
      <SubpageMenuHeader
        title="Projects"
        items={[
          { label: "Impact & Scale", href: "/impact" },
          { label: "Global Programs", href: "/projects" },
        ]}
      />
      <nav className="fixed top-0 w-full p-8 flex items-center justify-between z-50 mix-blend-difference text-white pointer-events-none">
        <Link
          to="/"
          className="group flex items-center justify-center w-12 h-12 rounded-xl bg-[#b39573]/20 backdrop-blur-md border border-[#b39573]/40 text-white hover:bg-[#b39573] hover:text-[#111613] transition-all duration-300 shadow-[0_0_15px_rgba(179,149,115,0.2)] pointer-events-auto"
          aria-label="Back to home"
        >
          <CornerUpLeft className="w-5 h-5 group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </nav>

      <div ref={scrollWrapperRef} className="relative z-0">
        {/* Hero Section */}
        <section className="hero-section sticky top-0 h-screen w-full flex flex-col justify-center px-4 md:px-12 pb-20 bg-[#E3DFD6] text-[#111613] dark:bg-[#0a0a0d] dark:text-[#f3f4f6] overflow-hidden z-0 transition-colors duration-300">
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="hero-content flex-1">
              <h1 className="text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] tracking-tight font-playfair font-medium mb-6">
                <div className="clip-text-mask">
                  <span className="hero-word inline-block">Experience</span>
                </div>
                <br />
                <div className="clip-text-mask">
                  <span className="hero-word inline-block text-[#b39573] italic">&</span>
                </div>
                <div className="clip-text-mask">
                  <span className="hero-word inline-block ml-4 md:ml-8">Projects</span>
                </div>
              </h1>
              <p className="hero-sub font-sans text-lg md:text-xl max-w-xl font-light opacity-70">
                A curated selection of strategic interventions and community-driven initiatives
                spanning over a decade of dedication.
              </p>
            </div>

            <div className="hidden md:flex flex-1 justify-end opacity-90 hover:scale-105 transition-transform duration-700 ease-out relative">
              <img
                src="/projects_hero_art.png"
                alt="Experience and Projects Art"
                className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl mix-blend-multiply"
              />
            </div>
          </div>
        </section>

        {/* Horizontal Scroll Section */}
        <section className="horizontal-trigger w-full overflow-hidden relative z-10 bg-[#111613]">
          <div className="horizontal-track h-screen w-[max-content] flex flex-nowrap">
            {experiences.map((exp, idx) => {
              const theme = PROJECT_THEMES[idx % PROJECT_THEMES.length];
              return (
                <div
                  key={idx}
                  className="horizontal-item w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 lg:px-24 relative overflow-hidden"
                  style={{ backgroundColor: theme.bg, color: theme.text }}
                >
                  {/* BEAUTIFUL BACKGROUND */}
                  <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    <img
                      src={exp.image}
                      className="w-full h-full object-cover opacity-20 scale-110 blur-xl mix-blend-overlay"
                      alt="bg"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
                    {/* Image */}
                    <div className="w-full h-[40vh] md:h-[45vh] lg:h-[55vh] rounded-[2rem] overflow-hidden relative shadow-2xl">
                      <img
                        src={exp.image}
                        alt={exp.org}
                        className="proj-img w-full h-full object-cover grayscale mix-blend-luminosity opacity-90"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="w-full flex flex-col justify-center py-2 lg:py-0">
                      <div className="flex items-baseline gap-4 mb-2 lg:mb-4">
                        <div
                          className="proj-text text-5xl md:text-6xl lg:text-7xl opacity-40 tracking-tighter"
                          style={{ fontFamily: theme.font, fontWeight: 700 }}
                        >
                          {exp.n}
                        </div>
                        <div className="proj-text h-[2px] w-8 md:w-12 bg-current opacity-30 self-center" />
                      </div>
                      <h2
                        className="proj-text text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-4"
                        style={{ fontFamily: theme.font, fontWeight: 500 }}
                      >
                        {exp.org}
                      </h2>
                      <h3
                        className="proj-text text-base md:text-lg lg:text-xl opacity-80 mb-3 uppercase tracking-wider"
                        style={{ fontFamily: theme.sans, fontWeight: 400 }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="proj-text opacity-60 mb-5 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed"
                        style={{ fontFamily: theme.sans, fontWeight: 300 }}
                      >
                        {exp.body}
                      </p>
                      <div className="proj-text flex flex-wrap gap-2">
                        {exp.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 md:px-4 md:py-1.5 border border-current rounded-full text-[10px] md:text-xs font-mono uppercase opacity-60 tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Outro Section */}
        <section className="outro-trigger relative h-screen w-full overflow-hidden bg-[#111613]">
          <div className="outro-bg absolute inset-0 w-full h-full overflow-hidden">
            <img
              src="/gallery/IMG_20260922_185957_399.jpg"
              alt="Background"
              className="outro-img w-full h-full object-cover grayscale opacity-30 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-[#b39573] mix-blend-multiply opacity-80" />
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-[#e8e6e1] px-4">
            <h2 className="outro-text text-5xl md:text-7xl lg:text-9xl font-playfair italic mb-10">
              Ready to <br /> scale impact?
            </h2>
            <div className="outro-text clip-text-mask">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-[#e8e6e1] text-[#111613] font-sans font-bold uppercase tracking-widest text-sm hover:bg-white transition-all rounded-full hover:scale-105"
              >
                Get In Touch
                <ArrowUpRight
                  size={20}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
