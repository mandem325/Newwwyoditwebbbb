import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Copy, CheckCircle2, Navigation } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = "juididejene869@gmail.com";
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(
    () => {
      // Text Reveal Stagger
      gsap.fromTo(
        ".contact-reveal-text",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.6,
          ease: "power4.out",
        },
      );

      // Buttons Reveal
      gsap.fromTo(
        ".contact-magnetic-btn",
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <AwardWinningTransition
      type="split-tilt"
      overlayColor="#e9ecef"
      className="relative min-h-screen bg-[#f8f9fa] text-[#111827] dark:bg-[#08080a] dark:text-[#f3f4f6] overflow-hidden flex flex-col justify-between selection:bg-[#111827] selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300"
      ref={containerRef}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-[0.03] mix-blend-multiply pointer-events-none"
        src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-26801-large.mp4"
      />

      {/* Navigation */}
      <nav className="fixed z-50 w-full p-6 md:p-10 flex items-center justify-between pointer-events-none">
        <Link
          to="/"
          className="group flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-[#14151e] backdrop-blur-md border border-black/10 dark:border-white/10 text-[#111827] dark:text-white hover:bg-[#111827] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-md pointer-events-auto"
          aria-label="Back to home"
        >
          <Navigation className="w-5 h-5 -rotate-90 group-hover:-translate-x-1 group-hover:rotate-[-135deg] transition-all duration-300" />
        </Link>
        <div className="font-mono text-xs tracking-widest uppercase bg-[#111827] text-white dark:bg-white dark:text-black px-4 py-2 rounded-full pointer-events-auto">
          Say Hello
        </div>
      </nav>

      {/* Content */}
      <div className="contact-trigger-zone relative z-10 flex-1 flex flex-col justify-center items-center p-6 md:p-10 pt-32 pb-16">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src="/Pensatori_Irrazionali_07.png"
              alt="Pensatori Irrazionali"
              className="w-full max-w-md lg:max-w-lg object-contain mix-blend-multiply opacity-90 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/10 backdrop-blur-md text-xs font-mono tracking-[0.2em] uppercase mb-12 shadow-sm contact-magnetic-btn dark:text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              Accepting New Collaborations
            </div>

            <h1 className="contact-reveal-text text-6xl md:text-[7rem] lg:text-[8rem] font-syne font-extrabold tracking-tighter leading-[0.9] mb-14 text-transparent bg-clip-text bg-gradient-to-br from-[#111827] dark:from-white to-[#4b5563] dark:to-neutral-400">
              Let's Build <br /> The Future.
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-6">
              <a
                href={`mailto:${email}`}
                className="contact-magnetic-btn group relative inline-flex items-center justify-center gap-6 px-10 py-6 bg-[#111827] text-white dark:bg-white dark:text-black rounded-full text-2xl md:text-4xl font-syne font-bold hover:bg-lime-400 hover:text-[#111827] dark:hover:bg-lime-400 dark:hover:text-black transition-all duration-500 shadow-2xl hover:shadow-lime-400/50 hover:scale-105"
              >
                Send an Email
                <span className="w-12 h-12 bg-white/10 dark:bg-black/10 group-hover:bg-[#111827] group-hover:text-white dark:group-hover:bg-black dark:group-hover:text-white rounded-full flex items-center justify-center transition-colors">
                  <ArrowUpRight size={24} />
                </span>
              </a>

              <button
                onClick={handleCopy}
                className="contact-magnetic-btn group relative inline-flex items-center justify-center gap-4 px-8 py-6 bg-white dark:bg-[#14151e] border border-black/10 dark:border-white/10 text-[#111827] dark:text-white rounded-full text-xl font-mono font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300 shadow-lg cursor-pointer"
              >
                {copied ? (
                  <CheckCircle2 className="text-green-500" />
                ) : (
                  <Copy className="text-[#111827]/50 dark:text-white/60 group-hover:text-[#111827] dark:group-hover:text-white" />
                )}
                {copied ? "Copied!" : "Copy Address"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full p-6 md:p-10 flex flex-col md:flex-row items-center justify-between font-mono text-xs uppercase tracking-widest text-black/40 dark:text-white/40 border-t border-black/5 dark:border-white/10">
        <span>Based in Addis Ababa, Ethiopia</span>
        <span>© {new Date().getFullYear()} Yodit Dejene</span>
      </div>
    </AwardWinningTransition>
  );
}
