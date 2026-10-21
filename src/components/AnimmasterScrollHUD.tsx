import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail } from "lucide-react";
import InteractiveCard from "@/components/InteractiveCard";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedButton from "@/components/AnimatedButton";

import experienceVoa from "@/assets/images/experience_voa_1784121463045.jpg";
import experienceFawe from "@/assets/images/experience_fawe_1784121477876.jpg";
import experienceIrc from "@/assets/images/experience_irc_1784121492656.jpg";
import experienceArbaminch from "@/assets/images/experience_arbaminch_1784121507498.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MinimapItem {
  num: string;
  title: string;
  category: string;
  year: string;
  image: string;
}

export function AnimmasterScrollHUD() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Static Data matching Academics, Endorsements, and Connect sections
  const items: MinimapItem[] = [
    {
      num: "01",
      title: "Academics",
      category: "Higher Education",
      year: "2013 - 2022",
      image: experienceArbaminch,
    },
    {
      num: "02",
      title: "",
      category: "Professional Backers",
      year: "Strategic Networks",
      image: experienceVoa,
    },
    {
      num: "03",
      title: "Connect",
      category: "Partnerships & Contact",
      year: "Available Now",
      image: experienceFawe,
    },
  ];

  // Academics Data
  const education = [
    {
      degree: "Master of Arts in Gender Studies",
      institution: "Bahir Dar University",
      location: "Bahir Dar",
      year: "2020 — 2022",
      gpa: "CGPA: 3.76",
      details:
        "Advanced research on intersectional gender frameworks, institutional capacity building, and feminist policy advocacy across regional programs.",
    },
    {
      degree: "Bachelor of Arts in Disaster Risk Management",
      institution: "Bahir Dar University",
      location: "Bahir Dar",
      year: "2010 — 2013",
      gpa: "CGPA: 3.65",
      details:
        "Comprehensive study of humanitarian crisis intervention, community resilience building, policy formulation, and vulnerability mapping.",
    },
  ];

  // References Data
  const references = [
    {
      name: "Helen Yosef",
      role: "Strategic Adviser",
      org: "FAWE Ethiopia Chapter",
      phone: "+251 911 234 567",
      email: "helen.yosef@fawe.org",
    },
    {
      name: "Tadesse Muluneh",
      role: "Consortium Director",
      org: "IRC Horn of Africa",
      phone: "+251 922 987 654",
      email: "tadesse.muluneh@rescue.org",
    },
    {
      name: "Almaz Kebede",
      role: "National Coordinator",
      org: "Voice of Africa Org",
      phone: "+251 933 456 789",
      email: "almaz.kebede@voiceofafrica.org",
    },
    {
      name: "Dr. Birhanu Mengistu",
      role: "Academic Dean",
      org: "Bahir Dar University",
      phone: "+251 944 123 456",
      email: "birhanu.m@bdu.edu.et",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create ScrollTrigger to lock and animate this section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Calculate active section index (0, 1, or 2)
          const activeIdx = Math.min(Math.floor(progress * 3), items.length - 1);
          setActiveIndex(activeIdx);

          // Background project slides translation (each slides has height of 100vh)
          const bgY = -progress * 2 * window.innerHeight;
          gsap.to(".project-bg-list", {
            y: bgY,
            duration: 0.4,
            overwrite: "auto",
            ease: "power3.out",
          });

          // Apply continuous parallax scale and offset update to images inside background slides
          const imgs = document.querySelectorAll(".project-bg-img");
          imgs.forEach((img, idx) => {
            const targetY = (-progress * 2 * window.innerHeight - idx * window.innerHeight) * 0.25;
            gsap.to(img, {
              y: targetY,
              scale: 1.35,
              duration: 0.5,
              overwrite: "auto",
              ease: "power2.out",
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#030303] select-none"
      id="premium-scroller"
    >
      {/* Tall Scroll Trigger Track to drive the animation (3 full screen lengths) */}
      <div className="relative w-full h-[300vh]">
        {/* Invisible Scroll Anchors for Navbar links to target */}
        <div id="education" className="absolute top-0 left-0 w-0 h-0" />
        <div id="references" className="absolute top-[33.3%] left-0 w-0 h-0" />
        <div id="contact" className="absolute top-[66.6%] left-0 w-0 h-0" />

        {/* Sticky viewport container (remains fixed on screen as the track is scrolled) */}
        <div
          ref={stickyRef}
          className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between"
        >
          {/* Background projects layer (sliding lists of full-page images) */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <div className="project-bg-list w-full h-full will-change-transform">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="absolute w-full h-screen overflow-hidden"
                  style={{ top: `${idx * 100}vh` }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="project-bg-img w-full h-full object-cover opacity-20 filter saturate-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] opacity-80" />
                </div>
              ))}
            </div>
          </div>

          {/* Foreground UI Components overlaying the background slides */}
          <div className="relative w-full h-full z-10 flex flex-col justify-between p-6 md:p-10 pointer-events-none">
            {/* Header / Section Indicator */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-lime tracking-widest uppercase">
                  № 0{activeIndex + 4} / {items[activeIndex].title.toUpperCase()}
                </span>
                <span className="text-white/40 font-mono text-[10px]">
                  PINNED SPEC LEVEL SCROLL
                </span>
              </div>
              <span className="font-mono text-xs text-white/50">0{activeIndex + 4}</span>
            </div>

            {/* Main Centered Layout */}
            <div className="flex-1 w-full flex items-center justify-center py-6">
              {/* Content Panels (centered) */}
              <div className="pointer-events-auto w-full max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                  {activeIndex === 0 && (
                    <motion.div
                      key="edu-panel"
                      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 w-full"
                    >
                      <div className="space-y-1 text-center md:text-left">
                        <span className="font-mono text-xs text-lime uppercase tracking-widest">
                          № 04 / ACADEMICS
                        </span>
                        <h3 className="font-display text-4xl font-light text-white tracking-tight uppercase">
                          Academic Foundations
                        </h3>
                        <p className="text-sm text-white/50">
                          Higher education background and official records.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {education.map((edu, idx) => (
                          <InteractiveCard
                            key={idx}
                            className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md"
                          >
                            <div className="flex justify-between items-baseline mb-2">
                              <span className="font-mono text-xs text-lime">{edu.year}</span>
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10">
                                {edu.gpa}
                              </span>
                            </div>
                            <h4 className="font-display text-lg font-medium bg-clip-text text-transparent bg-gradient-to-br from-white via-white/80 to-white/50">
                              {edu.degree}
                            </h4>
                            <p className="font-mono text-xs text-white/60 mt-0.5">
                              {edu.institution} · {edu.location}
                            </p>
                            <p className="text-xs text-white/40 mt-3 leading-relaxed">
                              {edu.details}
                            </p>
                          </InteractiveCard>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeIndex === 1 && (
                    <motion.div
                      key="ref-panel"
                      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 w-full"
                    >


                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {references.map((ref, idx) => (
                          <InteractiveCard
                            key={idx}
                            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col justify-between"
                          >
                            <div>
                              <span className="font-mono text-[10px] text-white/40">
                                REF / 0{idx + 1}
                              </span>
                              <h4 className="font-display text-base font-medium mt-1 bg-clip-text text-transparent bg-gradient-to-br from-white via-white/80 to-white/50">
                                {ref.name}
                              </h4>
                              <p className="font-mono text-[11px] text-lime uppercase tracking-wider">
                                {ref.role}
                              </p>
                              <p className="text-[10px] text-white/60">{ref.org}</p>
                            </div>
                            <div
                              className="mt-4 pt-3 border-t border-white/5 space-y-1"
                              suppressHydrationWarning
                            >
                              <a
                                href={`tel:${ref.phone}`}
                                className="flex items-center gap-1.5 text-[11px] font-mono text-white/40 hover:text-white transition-colors"
                                suppressHydrationWarning
                              >
                                <Phone size={10} className="text-lime" suppressHydrationWarning />{" "}
                                {ref.phone}
                              </a>
                              <a
                                href={`mailto:${ref.email}`}
                                className="flex items-center gap-1.5 text-[11px] font-mono text-white/40 hover:text-white transition-colors break-all"
                                suppressHydrationWarning
                              >
                                <Mail size={10} className="text-ochre" suppressHydrationWarning />{" "}
                                {ref.email}
                              </a>
                            </div>
                          </InteractiveCard>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeIndex === 2 && (
                    <motion.div
                      key="contact-panel"
                      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 w-full"
                    >
                      <div className="space-y-1 text-center md:text-left">
                        <span className="font-mono text-xs text-lime uppercase tracking-widest">
                          № 07 / CONNECT
                        </span>
                        <h3 className="font-display text-4xl font-light text-white tracking-tight uppercase">
                          Get In Touch
                        </h3>
                        <p className="text-sm text-white/50">
                          Let's work together to create real community impact.
                        </p>
                      </div>

                      <InteractiveCard className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md relative overflow-hidden">
                        <div
                          className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full opacity-40 pointer-events-none"
                          style={{
                            background: "radial-gradient(circle, var(--lime), transparent 65%)",
                            filter: "blur(60px)",
                          }}
                        />
                        <div className="space-y-4">
                          <p className="text-sm text-white/70 leading-relaxed">
                            {
                              "I accept a small number of selective consultations and program design roles each season. Let's see if we fit."
                            }
                          </p>
                          <div className="space-y-2 border-t border-white/10 pt-4">
                            <a
                              href="mailto:juididejene869@gmail.com"
                              className="group flex flex-wrap items-baseline gap-1 font-display text-2xl font-light text-[#ebd5c5]"
                            >
                              juididejene
                              <em className="italic text-ochre">869</em>
                              <span className="text-white/70">@gmail</span>
                              <em className="italic text-lime">.com</em>
                              <span className="ml-2 text-sm text-white border border-white/20 w-6 h-6 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                                ↗
                              </span>
                            </a>
                            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                              Direct Correspondence
                            </p>
                          </div>
                          <AnimatedButton
                            href="mailto:juididejene869@gmail.com"
                            variant="primary"
                            className="w-full mt-2"
                          >
                            Send Correspondence
                          </AnimatedButton>
                        </div>
                      </InteractiveCard>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom metadata HUD bar */}
            <div className="flex justify-between items-center border-t border-white/10 pt-4 text-[10px] font-mono text-white/40">
              <div className="flex items-center gap-4">
                <span>SCROLL PROGRESS</span>
                <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-lime transition-all duration-100"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
                <span>{Math.round(scrollProgress * 100)}%</span>
              </div>
              <span className="text-right">INFINITY SCROLL METRIC (0{activeIndex + 4})</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
