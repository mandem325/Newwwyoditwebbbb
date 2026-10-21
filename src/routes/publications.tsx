import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { CornerDownLeft } from "lucide-react";
import { SubpageMenuHeader } from "@/components/SubpageMenuHeader";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/publications")({
  component: PublicationsPage,
});

const publications = [
  {
    title: "Gender Rights & SRHR Training Materials",
    type: "Curriculum & Training Module",
    org: "FAWE Ethiopia",
    desc: "Developed comprehensive training materials used to increase community awareness on gender rights and youth health issues, tailored for local cultural contexts.",
    year: "2020 - 2021",
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Youth Entrepreneurship Modules",
    type: "Training Module",
    org: "Voice of Africa",
    desc: "Designed and implemented interactive training modules aimed at enhancing community engagement, advocacy skills, and entrepreneurship among marginalized youth in Ethiopia.",
    year: "2022 - Present",
    img: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Health Worker Training Protocols",
    type: "Standard Operating Procedure & Protocol",
    org: "International Rescue Committee",
    desc: "Developed and delivered training frameworks for local health extension workers focusing on comprehensive adolescent and youth SRHR strategies within refugee camps.",
    year: "2018 - 2019",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
  },
];

function PublicationsPage() {
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
      // Hero
      gsap.from(".pub-title-line", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        delay: 0.6,
        ease: "power4.out",
      });

      // Hero Background Artwork Reveal & Parallax
      gsap.fromTo(
        ".pub-bg-art",
        { opacity: 0, scale: 0.95 },
        { opacity: 0.85, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.3 },
      );
      gsap.to(".pub-bg-art", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".pub-bg-art",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Sticky Reveal
      ScrollTrigger.create({
        trigger: ".sticky-wrapper",
        start: "top top",
        end: "bottom bottom",
        pin: ".sticky-image-container",
      });

      // Text Fade in sticky side
      gsap.from(".sticky-text-block", {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: ".sticky-text-block",
          start: "top 80%",
        },
      });

      // Marquee
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Accordions
      const accordions = gsap.utils.toArray(".accordion-item") as HTMLElement[];
      accordions.forEach((acc) => {
        gsap.fromTo(
          acc,
          { scaleY: 0, transformOrigin: "bottom center" },
          {
            scaleY: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: acc,
              start: "top 90%",
            },
          },
        );
      });

      // Outro Circle
      gsap.fromTo(
        ".outro-circle",
        { scale: 0 },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".outro-section",
            start: "top 50%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <AwardWinningTransition
      type="iris"
      overlayColor="#e2dcd0"
      className="bg-[#f0ece1] text-[#1a1a1a] dark:bg-[#0a0a0d] dark:text-[#f3f4f6] font-serif overflow-x-hidden min-h-screen transition-colors duration-300"
      ref={containerRef}
    >
      <SubpageMenuHeader
        title="Publications"
        items={[
          { label: "Curricula & Modules", href: "/publications" },
          { label: "SRHR Training Protocols", href: "/publications" },
          { label: "Policy Guidelines", href: "/publications" },
        ]}
      />
      <nav className="fixed top-0 w-full p-8 flex justify-between z-50 mix-blend-difference text-white pointer-events-none">
        <Link
          to="/"
          className="group flex items-center justify-center w-12 h-12 bg-black/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#c94b32] hover:border-[#c94b32] transition-all duration-300 shadow-xl rounded-[10px] pointer-events-auto"
          aria-label="Back to home"
        >
          <CornerDownLeft className="w-5 h-5 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </Link>
      </nav>

      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 overflow-hidden">
        {/* Background Artwork - Pensatori Irrazionali Transparent Art */}
        <div
          className="pub-bg-art absolute inset-0 bg-no-repeat bg-[length:auto_65vh] md:bg-contain bg-right-bottom md:bg-right opacity-80 md:opacity-90 pointer-events-none z-0"
          style={{
            backgroundImage:
              "url('/Pensatori_Irrazionali_ChatGPT_Image_Aug_12__2026__08_no_bg.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f0ece1] dark:from-[#0a0a0d] via-[#f0ece1]/20 dark:via-[#0a0a0d]/20 to-transparent pointer-events-none z-0" />
        <div className="max-w-6xl relative z-10">
          <p className="font-mono text-xs uppercase tracking-widest mb-12 pub-title-line">
            Vol. 01 — Documentation & Research
          </p>
          <div className="overflow-hidden">
            <h1 className="text-7xl md:text-[10vw] leading-[0.85] tracking-tighter uppercase font-black pub-title-line">
              Structured
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-7xl md:text-[10vw] leading-[0.85] tracking-tighter uppercase font-black italic text-[#c94b32] pub-title-line">
              Logic
            </h1>
          </div>
        </div>
      </section>

      {/* Section 2: Sticky Section */}
      <section className="sticky-wrapper relative min-h-[150vh] flex flex-col md:flex-row border-t border-[#1a1a1a]/10 dark:border-white/10">
        <div className="w-full md:w-1/2 p-6 md:p-12 border-r border-[#1a1a1a]/10 dark:border-white/10">
          <div className="sticky-image-container h-[60vh] md:h-[80vh] overflow-hidden top-[10vh] rounded-2xl bg-[#e5dfd2]/60 dark:bg-white/5 border border-[#1a1a1a]/10 dark:border-white/10 shadow-lg flex items-center justify-center p-3 md:p-6 backdrop-blur-sm">
            <img
              src={publications[0].img}
              alt="Publication 1"
              className="w-full h-full object-cover object-center rounded-xl grayscale mix-blend-multiply transition-all duration-500 hover:grayscale-0"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-20 sticky-text-block">
          <div className="font-mono text-xs uppercase tracking-widest mb-6 opacity-50">
            {publications[0].year} — {publications[0].type}
          </div>
          <h2 className="text-5xl md:text-7xl leading-[0.9] tracking-tighter uppercase font-black mb-8">
            {publications[0].title}
          </h2>
          <div className="font-mono text-sm uppercase tracking-widest mb-8 text-[#c94b32]">
            {publications[0].org}
          </div>
          <p className="text-xl md:text-2xl font-sans font-light leading-relaxed max-w-md text-emerald-600">
            {publications[0].desc}
          </p>
        </div>
      </section>

      {/* Section 3: Marquee */}
      <section className="marquee-section py-20 bg-[#c94b32] text-[#f0ece1] overflow-hidden">
        <div className="marquee-track whitespace-nowrap text-[8vw] font-black uppercase tracking-tighter leading-none">
          KNOWLEDGE TRANSFER • CAPACITY BUILDING • EMPOWERMENT • KNOWLEDGE TRANSFER • CAPACITY
          BUILDING • EMPOWERMENT •
        </div>
      </section>

      {/* Section 4: Accordions */}
      <section className="py-32 px-6 md:px-12 bg-[#1a1a1a] text-[#f0ece1]">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest mb-16 opacity-50 border-b border-[#f0ece1]/20 pb-4">
            Further Readings
          </div>
          {publications.slice(1).map((pub, i) => (
            <div
              key={i}
              className="accordion-item bg-[#f0ece1] text-[#1a1a1a] p-8 md:p-16 mb-8 flex flex-col md:flex-row gap-12 overflow-hidden rounded-2xl"
            >
              <div className="md:w-1/3 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">
                    {pub.year}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest text-[#c94b32] font-bold">
                    {pub.type}
                  </div>
                </div>
                <div className="hidden md:block font-black text-8xl opacity-10 leading-none">
                  0{i + 2}
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                  {pub.title}
                </h3>
                <div className="font-mono text-sm uppercase tracking-widest mb-6 opacity-50">
                  {pub.org}
                </div>
                <p className="font-sans text-xl font-light leading-relaxed opacity-80">
                  {pub.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Outro Circle */}
      <section className="outro-section h-[80vh] flex items-center justify-center relative overflow-hidden bg-[#f0ece1]">
        <div className="outro-circle absolute w-[150vw] md:w-[80vw] aspect-square rounded-full bg-[#1a1a1a] flex flex-col items-center justify-center text-[#f0ece1] z-10">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8">
            Ready to read?
          </h2>
          <Link
            to="/advocacy"
            className="px-10 py-5 rounded-full border border-[#f0ece1]/30 font-mono text-xs uppercase tracking-widest hover:bg-[#f0ece1] hover:text-[#1a1a1a] transition-colors duration-500"
          >
            Next: Advocacy
          </Link>
        </div>
      </section>
    </AwardWinningTransition>
  );
}
