import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Reply } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/advocacy")({
  component: AdvocacyPage,
});

const advocacyWork = [
  {
    title: "Intersectional SRHR Advocacy",
    org: "Make Way SRHR Program",
    desc: "Conducted intersectional SRHR advocacy at regional and national levels. Led capacity-building workshops on intersecting vulnerabilities.",
  },
  {
    title: "Community Mobilization",
    org: "FAWE Ethiopia",
    desc: "Organized advocacy training. Held bilateral meetings with government agencies to embed community priorities into broader policy frameworks.",
  },
  {
    title: "Youth Capacity Building",
    org: "Voice of Africa",
    desc: "Coordinated advocacy-related training and workshops. Empowered local youth leaders to engage directly with policymakers.",
  },
];

function AdvocacyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
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
      gsap.fromTo(
        ".adv-hero-text",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, delay: 0.6, stagger: 0.1, ease: "power4.out" },
      );

      gsap.to(".adv-marquee", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".adv-marquee-sec",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const cards = gsap.utils.toArray(".adv-card") as HTMLElement[];
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.2,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          },
        );
      });

      gsap.fromTo(
        ".adv-parallax",
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".adv-parallax-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <AwardWinningTransition
      type="wave"
      overlayColor="#e02500"
      className="relative bg-[#FF2A00] text-[#0d0d0d] overflow-x-hidden font-sans selection:bg-[#0d0d0d] selection:text-[#FF2A00]"
      ref={containerRef}
    >
      <nav className="fixed top-0 w-full p-6 md:p-10 flex items-center justify-between z-50 mix-blend-difference text-white pointer-events-none">
        <Link
          to="/"
          className="group flex items-center justify-center w-12 h-12 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto"
          aria-label="Back to home"
        >
          <Reply className="w-5 h-5 group-hover:-translate-x-1 group-hover:-rotate-12 transition-transform duration-300" />
        </Link>
      </nav>

      <section className="relative min-h-screen flex flex-col justify-end p-6 md:p-12 pb-24 z-10 overflow-hidden bg-[#FF2A00]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/ChatGPT_Image_Sep_18_2026_12_49_17_AM.png"
            alt="Systemic Change Art"
            className="absolute inset-0 w-full h-full object-cover object-right-bottom md:object-right"
          />
        </div>

        <div className="relative z-10 mt-0 mb-[132px]">
          <div className="overflow-hidden">
            <h1 className="adv-hero-text text-[14vw] md:text-[12vw] font-display uppercase font-black leading-[0.8] tracking-tighter">
              SYSTEMIC
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="adv-hero-text text-[14vw] md:text-[12vw] font-display uppercase font-black leading-[0.8] tracking-tighter text-[#0d0d0d] flex items-center gap-4">
              CHANGE
              <span className="w-16 h-16 md:w-32 md:h-32 bg-[#0d0d0d] rounded-full inline-block shrink-0" />
            </h1>
          </div>
          <div className="mt-12 overflow-hidden">
            <p className="adv-hero-text font-mono text-sm md:text-xl uppercase tracking-widest max-w-xl font-bold">
              Policy work, community mobilization, and strategic bilateral engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="adv-marquee-sec -mt-[4px] overflow-hidden py-12 bg-[#0d0d0d] text-[#FF2A00] border-y-2 border-[#FF2A00]">
        <div className="adv-marquee whitespace-nowrap text-[6vw] font-display uppercase font-black tracking-tighter leading-none">
          VOICES TURNED ACTION • VOICES TURNED ACTION • VOICES TURNED ACTION • VOICES TURNED ACTION
          •
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-[#FF2A00]">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {advocacyWork.map((work, idx) => (
            <div
              key={idx}
              className="adv-card bg-[#0d0d0d] text-[#f4f4f4] p-10 md:p-20 rounded-2xl flex flex-col md:flex-row gap-12 items-start shadow-2xl"
            >
              <div className="md:w-1/3">
                <div className="font-mono text-xl md:text-2xl font-bold tracking-tight text-[#FF2A00] mb-4">
                  0{idx + 1}
                </div>
                <div className="font-mono text-sm tracking-widest uppercase border border-[#f4f4f4]/20 px-4 py-2 inline-block rounded-full">
                  {work.org}
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-8 leading-none">
                  {work.title}
                </h3>
                <p className="text-xl md:text-2xl font-sans font-light leading-snug opacity-80">
                  {work.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="adv-parallax-container relative h-screen w-full overflow-hidden bg-[#0d0d0d]">
        <img
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=2000&q=80"
          alt="Advocacy"
          className="adv-parallax absolute inset-0 w-full h-[120%] object-cover grayscale mix-blend-luminosity opacity-40"
        />
        <div className="absolute inset-0 bg-[#FF2A00] mix-blend-color opacity-30" />
        <div className="relative z-10 flex items-center justify-center h-full p-6 text-center">
          <h2 className="text-[7vw] font-display font-black uppercase tracking-tighter text-[#f4f4f4] max-w-5xl leading-[0.9]">
            EMPOWERING YOUTH TO VOICE THEIR HEALTH RIGHTS.
          </h2>
        </div>
      </section>

      <section className="min-h-[50vh] flex flex-col items-center justify-center bg-[#FF2A00] text-[#0d0d0d] px-6">
        <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter mb-12">
          JOIN THE MOVEMENT
        </h2>
        <Link
          to="/contact"
          className="px-12 py-6 bg-[#0d0d0d] text-[#FF2A00] font-mono text-xl tracking-widest uppercase font-bold hover:bg-white hover:text-black transition-colors duration-300 rounded-full"
        >
          Connect
        </Link>
      </section>
    </AwardWinningTransition>
  );
}
