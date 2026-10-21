import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Plus, ArrowRight, ArrowLeftToLine, ArrowLeft } from "lucide-react";
import { certificates } from "@/data";
import { SubpageMenuHeader } from "@/components/SubpageMenuHeader";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/certificates")({
  component: CertificatesPage,
});

function CertificatesPage() {
  return (
    <AwardWinningTransition type="stairs" className="">
      <SubpageMenuHeader
        title="Certificates"
        items={certificates.map((c, i) => ({ label: c.title, href: `/certificates/${i}` }))}
      />
      <CertificatesPageContent />
    </AwardWinningTransition>
  );
}

function CertificatesPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
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
      // Hero Text
      gsap.from(".cert-hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.4,
        delay: 0.6,
        stagger: 0.1,
        ease: "power4.out",
      });

      // Horizontal Scroll
      const wrapper = scrollWrapperRef.current;
      if (wrapper) {
        const cards = gsap.utils.toArray(".cert-horizontal-card");
        const getScrollAmount = () => wrapper.scrollWidth - window.innerWidth;

        const tween = gsap.to(wrapper, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-scroll-container",
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + getScrollAmount(),
            invalidateOnRefresh: true,
          },
        });

        // Animate cards as they enter view
        cards.forEach((card: unknown) => {
          gsap.fromTo(
            card.querySelector(".card-inner"),
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left center+=300",
                end: "left center",
                scrub: 1,
              },
            },
          );
        });
      }
    },
    { scope: containerRef },
  );

  // Ripple Effect Handler
  const handleRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className =
      "absolute rounded-full bg-white/10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height) * 2}px`;

    card.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  return (
    <main
      ref={containerRef}
      className="bg-[#050505] text-[#F3F3F3] font-sans selection:bg-[#F3F3F3] selection:text-[#050505] min-h-screen"
    >
      <nav className="fixed top-0 w-full p-8 flex justify-between z-50 mix-blend-difference text-white pointer-events-none">
        <Link
          to="/"
          className="group relative flex items-center w-12 h-12 hover:w-32 border border-white/30 bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-[0.6s] ease-[cubic-bezier(0.19,1,0.22,1)] shadow-xl rounded-full overflow-hidden pointer-events-auto"
          aria-label="Back to home"
        >
          <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full relative z-10">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-[0.6s] ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[0.6s] ease-[cubic-bezier(0.19,1,0.22,1)] absolute left-10">
            Return
          </span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center px-6 md:px-12 relative overflow-hidden">
        {/* Horizontal Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70 scale-105"
            src="/gloomilygray_1790035774779.mp4"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#050505]/90" />
        </div>

        <div className="max-w-7xl relative z-10">
          <p className="font-mono text-xs uppercase tracking-widest mb-8 opacity-70 cert-hero-text">
            Vol. 04 — Certifications
          </p>
          <div className="overflow-hidden">
            <h1 className="cert-hero-text text-[12vw] font-display font-black uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
              Recognized
            </h1>
          </div>
          <div className="overflow-hidden flex gap-8 items-end">
            <h1
              className="cert-hero-text text-[12vw] font-display font-black uppercase tracking-tighter leading-[0.8] text-transparent drop-shadow-2xl"
              style={{ WebkitTextStroke: "1px #F3F3F3" }}
            >
              Excellence
            </h1>
          </div>
        </div>
        <div className="absolute bottom-12 right-12 text-right hidden md:block cert-hero-text z-10">
          <p className="font-mono text-xs uppercase tracking-widest opacity-60 max-w-xs">
            Scroll to explore 15+ years of strategic qualification.
          </p>
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section className="horizontal-scroll-container h-screen bg-[#0a0a0a] flex items-center overflow-hidden border-y border-[#333]">
        <div
          ref={scrollWrapperRef}
          className="flex h-[85vh] items-center px-[10vw] gap-12 md:gap-24"
        >
          {certificates.map((cert, i) => (
            <div
              key={i}
              className="cert-horizontal-card w-[85vw] md:w-[35vw] h-[70vh] flex-shrink-0"
            >
              <Link
                to="/certificates/$id"
                params={{ id: i.toString() }}
                className="card-inner block w-full h-full relative group cursor-pointer"
              >
                <div className="relative w-full h-full overflow-hidden bg-[#050505] rounded-xl border border-white/5">
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-black z-0" />
                  <img
                    src={cert.image}
                    className="absolute inset-0 w-full h-full object-contain p-4 md:p-8 opacity-75 group-hover:opacity-100 transform scale-100 group-hover:scale-105 transition-all duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] z-10 drop-shadow-2xl"
                    alt={cert.title}
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Meta */}
                  <div className="absolute top-0 w-full p-6 md:p-10 flex justify-between items-start z-30 mix-blend-difference">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#e5e5e5]">
                      {cert.org}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#e5e5e5]">
                      [{cert.year}]
                    </span>
                  </div>

                  {/* Number Overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-40 group-hover:opacity-0 transition-opacity duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    <span className="text-[40vw] md:text-[20vw] font-serif-display italic text-white leading-none">
                      {i + 1}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 w-full p-6 md:p-10 z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent transform translate-y-6 group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-syne font-light uppercase tracking-tighter leading-[0.9] text-white mb-6">
                      {cert.title}
                    </h2>

                    <div className="overflow-hidden">
                      <p className="font-sans text-sm md:text-base font-light text-white/70 leading-relaxed max-w-md transform translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-[1s] delay-[50ms] ease-[cubic-bezier(0.19,1,0.22,1)]">
                        {cert.desc}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center gap-5">
                      <div className="relative flex items-center justify-center w-12 h-12 rounded-full shrink-0 border border-white/20 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:border-white group-hover:scale-110 shadow-lg">
                        <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                        <ArrowRight className="w-5 h-5 text-black absolute z-10 -translate-x-[150%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white relative z-10 transition-transform duration-500 group-hover:scale-0 group-hover:opacity-0" />
                      </div>
                      <div className="relative overflow-hidden h-8 flex items-center min-w-[200px]">
                        <span className="block whitespace-nowrap font-serif italic text-sm md:text-base tracking-[0.15em] text-white/60 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-[150%] group-hover:opacity-0">
                          View Certificate
                        </span>
                        <span className="absolute left-0 whitespace-nowrap block font-serif italic text-sm md:text-base tracking-[0.15em] text-white transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                          Discover Details
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/20 z-20 mix-blend-difference" />
                  <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-white/20 z-20 mix-blend-difference" />
                  <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-white/20 z-20 mix-blend-difference" />
                  <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/20 z-20 mix-blend-difference" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Outro */}
      <section className="h-[80vh] flex flex-col justify-center items-center bg-[#050505] relative z-10">
        <h2 className="text-[6vw] font-display uppercase font-light tracking-tighter text-center leading-none mb-12">
          Continuous <br />
          <span className="italic font-serif font-bold">Growth</span>
        </h2>
        <Link
          to="/contact"
          className="px-12 py-6 rounded-full border border-[#333] uppercase font-mono tracking-widest text-xs hover:bg-white hover:text-black transition-colors duration-500"
        >
          Connect Now
        </Link>
      </section>
    </main>
  );
}
