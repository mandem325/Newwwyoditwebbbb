import React, { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";

const NEON_COLORS = [
  "#ccff00",
  "#ff00ff",
  "#00ffff",
  "#ff3300",
  "#00ff33",
  "#ff0099",
  "#ffff00",
  "#ff0055",
];

export function FooterClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Addis_Ababa",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setTime(now.toLocaleTimeString("en-US", options) + " EAT");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[10px] font-mono text-[#ebd5c5]/40 mt-4 tracking-widest uppercase">
      {time || "12:00:00 EAT"}
    </div>
  );
}

export function Footer() {
  const [yoditColor, setYoditColor] = useState("#ccff00");
  const containerRef = useRef<HTMLElement>(null);

  // Native Framer Motion values:
  // Updates DOM attributes directly without triggering React re-renders on every scroll tick.
  // This eliminates all re-render thrashing, CSS transition fighting, and Framer Motion viewport stutter.
  const scrollProgress = useMotionValue(0);
  const contentY = useTransform(scrollProgress, [0, 1], ["-10%", "0%"]);
  const pathLength = useTransform(scrollProgress, [0, 0.8], [0, 1]);
  const yoditY = useTransform(scrollProgress, [0.6, 1], ["60%", "0%"]);
  const yoditScale = useTransform(scrollProgress, [0.6, 1], [0.8, 1]);
  const yoditOpacity = useTransform(scrollProgress, [0.6, 1], [0.2, 1]);

  useEffect(() => {
    const footerEl = containerRef.current;
    if (!footerEl) return;

    let ticking = false;
    let lastP = -1;

    const calculateProgress = () => {
      if (!footerEl) return;
      const rect = footerEl.getBoundingClientRect();
      const winHeight = window.innerHeight;
      const total = rect.height || 1;

      // When the top of the footer enters from the bottom of viewport: progress = 0
      // When the bottom of the footer reaches the bottom of the viewport: progress = 1
      const current = winHeight - rect.top;
      const p = Math.max(0, Math.min(1, current / total));

      if (Math.abs(p - lastP) > 0.0002) {
        lastP = p;
        scrollProgress.set(p);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (window.lenis) {
      window.lenis.on("scroll", handleScroll);
    }
    gsap.ticker.add(handleScroll);
    calculateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (window.lenis) {
        window.lenis.off("scroll", handleScroll);
      }
      gsap.ticker.remove(handleScroll);
    };
  }, [scrollProgress]);

  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={containerRef}
      id="site-footer"
      className="relative text-[#ebd5c5] bg-[#0b0806] overflow-visible pt-24 md:pt-32 pb-4 md:pb-6 px-6 md:px-12 z-50 min-h-screen min-h-[100dvh] flex flex-col justify-between"
    >
      {/* Top gradient to bridge section seam */}
      <div className="absolute top-0 left-0 w-full h-64 -translate-y-full bg-gradient-to-b from-transparent via-[#0b0806]/60 to-[#0b0806] pointer-events-none z-0" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />

      {/* The 1:1 SVG Glowing Tube (Starting right below the top corner) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-50 mix-blend-screen">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          suppressHydrationWarning
        >
          <defs>
            <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ccff00" stopOpacity="0" />
              <stop offset="30%" stopColor="#ccff00" stopOpacity="1" />
              <stop offset="70%" stopColor="#ccff00" stopOpacity="1" />
              <stop offset="100%" stopColor="#ebd5c5" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Base Background Path */}
          <path
            d="M 94, 18 C 68, 32 22, 22 10, 60 C 0, 100 90, 70 100, 120"
            fill="none"
            stroke="#ebd5c5"
            strokeOpacity="0.05"
            vectorEffect="non-scaling-stroke"
            strokeWidth="80"
            strokeLinecap="round"
          />

          {/* Glowing Green Segmented Tube */}
          <motion.path
            d="M 94, 18 C 68, 32 22, 22 10, 60 C 0, 100 90, 70 100, 120"
            fill="none"
            stroke="url(#snakeGrad)"
            vectorEffect="non-scaling-stroke"
            strokeWidth="80"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ pathLength }}
          />

          {/* White Gloss Specular Center Spine */}
          <motion.path
            d="M 94, 18 C 68, 32 22, 22 10, 60 C 0, 100 90, 70 100, 120"
            fill="none"
            stroke="#ffffff"
            vectorEffect="non-scaling-stroke"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
      </div>

      <motion.div
        style={{ y: contentY }}
        className="flex-1 flex flex-col justify-between max-w-[1600px] mx-auto w-full relative z-10"
      >
        <div className="w-full flex flex-col pt-12 pb-16">
          <div className="flex flex-col relative pb-20 border-b border-[#ebd5c5]/10">
            <div className="flex flex-col z-10 w-full mb-8">
              <h3 className="footer-reveal-heading font-display text-[12vw] md:text-[9vw] font-black leading-[0.85] tracking-tighter uppercase text-[#ebd5c5] flex flex-col group cursor-pointer relative z-20 will-change-transform">
                <div className="absolute top-1/2 left-1/4 w-[40vw] h-[40vw] -translate-x-1/2 -translate-y-1/2 bg-lime opacity-0 group-hover:opacity-15 blur-[80px] md:blur-[120px] rounded-full scale-50 group-hover:scale-150 transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none" />
                <motion.span
                  initial={{ opacity: 0, y: 48, rotateX: -18 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 md:gap-8 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[3vw] group-hover:-skew-x-[4deg] group-hover:scale-[1.02] origin-left relative z-10"
                >
                  <span className="group-hover:text-transparent group-hover:[-webkit-text-stroke:3px_rgba(204,255,0,1)] transition-all duration-500 drop-shadow-none group-hover:drop-shadow-[0_0_25px_rgba(204,255,0,0.4)]">
                    LET'S BUILD
                  </span>
                  <span className="block flex-1 max-w-[100px] md:max-w-[250px] h-[4px] md:h-[6px] bg-lime origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -36, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#ebd5c5]/80 italic font-light lowercase tracking-normal pl-[10vw] md:pl-[20vw] mt-2 md:mt-4 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] delay-75 group-hover:translate-x-[5vw] group-hover:text-lime group-hover:skew-x-[4deg] origin-left flex items-center gap-4 md:gap-6 relative z-10"
                >
                  systems of care
                  <span className="inline-block opacity-0 -translate-x-12 rotate-[-90deg] group-hover:opacity-100 group-hover:translate-x-0 group-hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] delay-150">
                    <ArrowRight className="w-[8vw] h-[8vw] md:w-[5vw] md:h-[5vw] text-lime" />
                  </span>
                </motion.span>
              </h3>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 w-full mt-8 md:mt-12">
              <div className="max-w-2xl pl-0 relative">
                <motion.p
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="footer-reveal-para text-[#ebd5c5] text-2xl md:text-5xl font-light leading-[1.2] tracking-tight text-balance group cursor-default will-change-transform"
                >
                  <span className="text-lime font-mono text-xs tracking-widest uppercase mr-6 align-top block md:inline-block mb-4 md:mb-0 pt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    [ ADDIS ABABA ]
                  </span>
                  Working with partners across Africa to drive sustainable community impact through
                  <span className="relative inline-block mx-2">
                    <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-ochre/30" />
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-ochre group-hover:w-full transition-all duration-700 ease-out-expo" />
                    <em className="font-serif italic text-ochre">design</em>
                  </span>
                  and
                  <span className="relative inline-block mx-2">
                    <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-ochre/30" />
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-ochre group-hover:w-full transition-all duration-700 delay-100 ease-out-expo" />
                    <em className="font-serif italic text-ochre">strategy</em>
                  </span>
                  .
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.75, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0"
              >
                <Link
                  to="/contact"
                  className="footer-reveal-cta group relative flex items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full border border-lime/20 bg-transparent hover:border-lime/0 transition-colors duration-700 overflow-hidden shrink-0 will-change-transform"
                >
                  <div className="absolute inset-0 bg-lime scale-0 group-hover:scale-[1.02] transition-transform duration-500 ease-out-expo rounded-full origin-center" />
                  <div className="absolute inset-2 animate-[spin_12s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full fill-[#ebd5c5]/40 group-hover:fill-black/60 transition-colors duration-500 font-mono text-[10px] uppercase tracking-[0.3em]"
                    >
                      <path
                        id="circlePath"
                        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                        fill="none"
                      />
                      <text>
                        <textPath href="#circlePath" startOffset="0%">
                          start a project • start a project •{" "}
                        </textPath>
                      </text>
                    </svg>
                  </div>
                  <div className="relative z-10 flex items-center justify-center text-lime group-hover:text-black transition-colors duration-500">
                    <ArrowRight className="w-10 h-10 md:w-12 md:h-12 -rotate-45 group-hover:rotate-0 group-hover:scale-125 transition-all duration-500 ease-out-expo" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pt-24 border-t border-[#ebd5c5]/20 mt-16 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="footer-reveal-col md:col-span-3 flex flex-col gap-8 will-change-transform"
            >
              <div className="flex items-center gap-4 border-b border-[#ebd5c5]/10 pb-4 mb-2">
                <span className="text-lime font-serif italic text-sm">01</span>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#ebd5c5]/70">
                  Location
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#ebd5c5]/80 text-sm font-light leading-relaxed">
                  Addis Ababa, Ethiopia
                  <br />
                  East Africa
                </p>
                <FooterClock />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="footer-reveal-col md:col-span-6 flex flex-col gap-8 will-change-transform"
            >
              <div className="flex items-center gap-4 border-b border-[#ebd5c5]/10 pb-4 mb-2">
                <span className="text-lime font-serif italic text-sm">02</span>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#ebd5c5]/70">
                  Directory
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { l: "Home", h: "/" },
                  { l: "Projects", h: "/projects" },
                  { l: "Experience", h: "/experience" },
                  { l: "Impact", h: "/impact" },
                  { l: "Gallery", h: "/gallery" },
                  { l: "Contact", h: "/contact" },
                ].map((g, x) => (
                  <motion.div
                    key={g.l}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 + x * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={g.h}
                      className="group/link relative flex items-center w-fit py-2 overflow-visible"
                    >
                      <ArrowRight className="absolute left-0 w-5 h-5 opacity-0 -translate-x-6 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-500 ease-out-expo text-lime" />
                      <span className="text-[#ebd5c5]/70 group-hover/link:text-white text-xl md:text-2xl font-light tracking-tight transition-all duration-500 ease-out-expo group-hover/link:translate-x-8">
                        {g.l}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="footer-reveal-col md:col-span-3 flex flex-col gap-8 will-change-transform"
            >
              <div className="flex items-center gap-4 border-b border-[#ebd5c5]/10 pb-4 mb-2">
                <span className="text-lime font-serif italic text-sm">03</span>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#ebd5c5]/70">
                  Socials
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {["LinkedIn", "Twitter", "Instagram", "Read.cv"].map((g, x) => (
                  <motion.div
                    key={g}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.35 + x * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={g === "Read.cv" ? "/Yodit_Resume_Safeguarding_Manager-Ethiopia__1_.pdf" : "#"}
                      download={g === "Read.cv" ? "Yodit_Resume_Safeguarding_Manager-Ethiopia__1_.pdf" : undefined}
                      target={g !== "Read.cv" ? "_blank" : undefined}
                      rel={g !== "Read.cv" ? "noreferrer" : undefined}
                      className="group/social relative flex items-center w-fit py-2 overflow-visible"
                    >
                      <ArrowRight className="absolute left-0 w-5 h-5 opacity-0 -translate-x-6 group-hover/social:opacity-100 group-hover/social:translate-x-0 transition-all duration-500 ease-out-expo text-lime -rotate-45" />
                      <span className="text-[#ebd5c5]/70 group-hover/social:text-white text-xl md:text-2xl font-light tracking-tight transition-all duration-500 ease-out-expo group-hover/social:translate-x-8">
                        {g}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* YODIT Giant Heading with Changing LED Glow */}
      <div className="w-full pt-8 flex flex-col items-center relative z-10 mt-auto border-t border-[#ebd5c5]/10 group cursor-crosshair">
        <motion.h1
          style={{
            y: yoditY,
            scale: yoditScale,
            opacity: yoditOpacity,
            "--hover-color": yoditColor,
            "--hover-shadow1": yoditColor + "cc",
            "--hover-shadow2": yoditColor + "80",
          } as React.CSSProperties}
          onMouseEnter={() => {
            const g = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
            setYoditColor(g);
          }}
          className="font-display text-[22vw] leading-[0.8] font-black tracking-tighter uppercase text-center w-full origin-bottom select-none will-change-transform text-transparent bg-clip-text bg-gradient-to-b from-[#ebd5c5] via-[#ebd5c5]/90 to-[#ebd5c5]/60 group-hover:!bg-none"
        >
          <span className="transition-all duration-300 group-hover:!text-[var(--hover-color)] group-hover:[text-shadow:0_0_20px_var(--hover-shadow1),0_0_60px_var(--hover-shadow2)]">
            YODIT
          </span>
        </motion.h1>
      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="w-full pt-6 pb-2 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.15em] uppercase font-sans font-medium text-[#ebd5c5]/60 z-20 border-t border-[#ebd5c5]/5">
        <div>
          © {new Date().getFullYear()} Yodit Dejene.
        </div>
        <div className="flex gap-8">
          <a
            href="#top"
            onClick={handleBackToTop}
            className="hover:text-white transition-colors flex items-center gap-3 cursor-pointer"
          >
            Back to Top
            <span className="w-5 h-5 rounded-full border border-[#ebd5c5]/60 flex items-center justify-center text-[9px]">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
