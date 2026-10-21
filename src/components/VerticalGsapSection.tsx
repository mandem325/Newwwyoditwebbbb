import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  Globe,
  Compass,
  ShieldCheck,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface InitiativeCard {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  icon: React.ElementType;
  accent: string;
}

const initiatives: InitiativeCard[] = [
  {
    id: "init-1",
    number: "01",
    category: "Educational Parity",
    title: "Sub-Saharan Gender Equality Frameworks",
    subtitle: "FAWE Regional Leadership",
    description:
      "Spearheading high-impact advocacy campaigns that eliminated barriers to secondary education for over 45,000 young women across East and Central Africa.",
    metrics: [
      { label: "Beneficiaries", value: "45,000+" },
      { label: "Partner Schools", value: "320" },
      { label: "Policy Reforms", value: "12" },
    ],
    tags: ["Gender Equity", "Policy Reform", "Secondary Ed"],
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    icon: Globe,
    accent: "#c15c3d",
  },
  {
    id: "init-2",
    number: "02",
    category: "Civic Empowerment",
    title: "Youth Grassroots Journalism & Media",
    subtitle: "Voice of America Partnership",
    description:
      "Established multi-lingual community broadcasting channels amplifying rural youth voices and fostering critical civic participation in local governance.",
    metrics: [
      { label: "Listeners Reached", value: "2.4M" },
      { label: "Youth Reporters", value: "180+" },
      { label: "Languages", value: "5" },
    ],
    tags: ["Youth Media", "Civic Voice", "Broadcasting"],
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    icon: Compass,
    accent: "#8da100",
  },
  {
    id: "init-3",
    number: "03",
    category: "Humanitarian Relief",
    title: "Displacement Aid & Community Integration",
    subtitle: "IRC Crisis Operations",
    description:
      "Coordinating rapid-deployment logistics and psychosocial support systems across humanitarian corridors to resettle displaced families.",
    metrics: [
      { label: "Families Supported", value: "18,500" },
      { label: "Centers Built", value: "14" },
      { label: "Response Rate", value: "< 24h" },
    ],
    tags: ["Crisis Response", "Psychosocial", "Integration"],
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    icon: ShieldCheck,
    accent: "#dfa000",
  },
  {
    id: "init-4",
    number: "04",
    category: "Institutional Growth",
    title: "Cross-Border Digital Education Hubs",
    subtitle: "Arba Minch Tech Initiative",
    description:
      "Pioneering sustainable digital learning labs equipped with renewable energy micro-grids to connect remote Ethiopian schools to global digital resources.",
    metrics: [
      { label: "Tech Hubs", value: "28" },
      { label: "Teachers Trained", value: "650+" },
      { label: "Uptime", value: "99.4%" },
    ],
    tags: ["EdTech", "Clean Power", "Digital Skills"],
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    icon: Layers,
    accent: "#38bdf8",
  },
  {
    id: "init-5",
    number: "05",
    category: "Global Policy",
    title: "Pan-African Socioeconomic Dialogues",
    subtitle: "International Coalitions",
    description:
      "Unifying regional NGOs, government ministries, and international development agencies to draft resilient sustainable development roadmaps for 2030.",
    metrics: [
      { label: "NGO Coalitions", value: "40+" },
      { label: "Nations Represented", value: "16" },
      { label: "Grants Secured", value: "$14M" },
    ],
    tags: ["Pan-African", "Strategic Policy", "UN SDGs"],
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
    icon: Sparkles,
    accent: "#a855f7",
  },
];

const getTextColorClass = (accent: string) => {
  switch (accent) {
    case "#c15c3d":
      return "text-[#c15c3d]";
    case "#8da100":
      return "text-[#8da100]";
    case "#dfa000":
      return "text-[#dfa000]";
    case "#38bdf8":
      return "text-[#38bdf8]";
    case "#a855f7":
      return "text-[#a855f7]";
    default:
      return "text-white";
  }
};

export default function VerticalGsapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nextPanelRef = useRef<HTMLDivElement>(null);
  const nextInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // 1. Pin the left panel while vertical right panel scrolls on desktop
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftPanelRef.current,
          scrub: true,
        });

        // Text reveal effect on the left panel heading
        gsap.fromTo(
          ".v-title-word",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          },
        );

        // 2. Horizontal GSAP Pinned Track attached right inside the component
        const track = trackRef.current;
        if (track && horizontalRef.current) {
          const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

          const hTween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: horizontalRef.current,
              start: "top top",
              end: () => `+=${track.scrollWidth - window.innerWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // Animate individual horizontal cards during the horizontal scrub
          const panels = gsap.utils.toArray<HTMLElement>(".attached-h-panel");
          panels.forEach((panel) => {
            const cardInner = panel.querySelector(".attached-h-inner");
            if (cardInner) {
              gsap.fromTo(
                cardInner,
                { scale: 0.88, opacity: 0.4, y: 40 },
                {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: hTween,
                    start: "left 90%",
                    end: "left 25%",
                    scrub: true,
                  },
                },
              );
            }
          });

          // Expand the Transition Portal at the end of the stream
          if (nextInnerRef.current && nextPanelRef.current) {
            gsap.fromTo(
              nextInnerRef.current,
              { scale: 0.8, borderRadius: "3rem", filter: "brightness(0.6)" },
              {
                scale: 1,
                borderRadius: "1.5rem",
                filter: "brightness(1)",
                scrollTrigger: {
                  trigger: nextPanelRef.current,
                  containerAnimation: hTween,
                  start: "left 80%",
                  end: "left 15%",
                  scrub: true,
                },
              },
            );
          }
        }
      });

      // Animate vertical cards in the right panel
      const cards = gsap.utils.toArray<HTMLElement>(".gsap-v-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 120, scale: 0.92, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 30%",
              scrub: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  const values = [
    {
      title: "Visionary Strategy",
      desc: "Architecting frameworks that translate localized grassroots efforts into sustainable, global-scale impact. By analyzing long-term metrics, we shape policies that endure.",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Community Resilience",
      desc: "Equipping individuals with the financial and educational tools they need to architect their own futures. Cultivating independence over dependence.",
      img: "https://images.unsplash.com/photo-1593113565694-c6c73950b719?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Global Collaboration",
      desc: "Bridging diverse cultural groups and forging partnerships that break boundaries and establish lasting peace through shared socioeconomic goals.",
      img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Data-Driven Action",
      desc: "Harnessing real-time demographics and field reports to rapidly deploy resources where they create the highest possible leverage.",
      img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="relative w-full bg-[#0a0a0a]" suppressHydrationWarning>
      {/* ---------------- STAGE 1: VERTICAL SPLIT-SCREEN ---------------- */}
      <section
        ref={containerRef}
        className="relative w-full bg-[#0a0a0a] text-white flex flex-col md:flex-row border-t border-white/5"
        suppressHydrationWarning
      >
        {/* Left Pinned Panel */}
        <div
          ref={leftPanelRef}
          className="w-full md:w-5/12 min-h-screen md:h-screen flex flex-col justify-center px-10 md:px-20 border-r border-white/5 relative z-10 py-20 md:py-0 overflow-hidden"
          suppressHydrationWarning
        >
          {/* Dynamic Video Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" suppressHydrationWarning>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale mix-blend-screen"
              src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-26801-large.mp4"
              suppressHydrationWarning
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-transparent to-[#0a0a0a]"
            suppressHydrationWarning
          />

          <div className="relative z-10" suppressHydrationWarning>
            <div className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] uppercase text-[#c15c3d] mb-8 border border-[#c15c3d]/30 px-4 py-2 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#c15c3d] animate-pulse" /> Core Philosophy
            </div>

            <h2 className="text-5xl md:text-7xl font-cinzel leading-tight mb-8">
              <div className="overflow-hidden">
                <span className="v-title-word inline-block">The</span>{" "}
                <span className="v-title-word inline-block">Pillars</span>
              </div>
              <div className="overflow-hidden">
                <span className="v-title-word inline-block">of</span>{" "}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c15c3d] v-title-word inline-block">
                  Change.
                </span>
              </div>
            </h2>
            <p className="text-xl text-white/50 font-light leading-relaxed max-w-md mb-12">
              True transformation requires a multi-faceted approach. These are the underlying
              principles that guide our highest impact initiatives across the continent.
            </p>

            <div className="flex items-center gap-4 text-white/30" suppressHydrationWarning>
              <ArrowDownRight size={40} className="animate-bounce" suppressHydrationWarning />
              <span className="font-mono text-xs uppercase tracking-widest">Scroll to explore</span>
            </div>
          </div>
        </div>

        {/* Right Vertical Cards Panel */}
        <div
          ref={rightPanelRef}
          className="w-full md:w-7/12 min-h-screen py-20 md:py-[20vh] px-6 md:px-20 space-y-20 md:space-y-[30vh] bg-[#0d0d0d]"
          suppressHydrationWarning
        >
          {values.map((val, i) => (
            <div
              key={i}
              className="gsap-v-card bg-[#111] p-10 md:p-14 rounded-[2.5rem] border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[#c15c3d]/30 transition-colors duration-700"
              suppressHydrationWarning
            >
              {/* Image Reveal */}
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
                suppressHydrationWarning
              >
                <img
                  src={val.img}
                  alt={val.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  suppressHydrationWarning
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[#111] via-[#111]/80 to-transparent"
                suppressHydrationWarning
              />

              <div
                className="relative z-10 flex flex-col h-full justify-end"
                suppressHydrationWarning
              >
                <div className="flex items-center justify-between mb-12" suppressHydrationWarning>
                  <div className="text-[#c15c3d] font-mono text-4xl font-light">0{i + 1}</div>
                  <div
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500"
                    suppressHydrationWarning
                  >
                    <ArrowDownRight size={20} className="-rotate-45" suppressHydrationWarning />
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl font-cinzel mb-6 group-hover:text-[#c15c3d] transition-colors duration-500">
                  {val.title}
                </h3>
                <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- STAGE 2: ATTACHED HORIZONTAL GSAP TRACK ---------------- */}
      <section
        ref={horizontalRef}
        className="relative w-full bg-[#08080a] text-white overflow-hidden border-t border-white/10"
        suppressHydrationWarning
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(193,92,61,0.12),transparent_70%)] pointer-events-none"
          suppressHydrationWarning
        />

        <div
          className="w-full md:h-screen md:flex md:flex-col md:justify-center relative z-10 py-12 md:py-0"
          suppressHydrationWarning
        >
          {/* Section Header Bar */}
          <div
            className="px-6 md:px-20 pb-6 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 max-w-[1800px] mx-auto w-full"
            suppressHydrationWarning
          >
            <div suppressHydrationWarning>
              <div
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase text-[#c15c3d] mb-3 bg-[#c15c3d]/10 px-4 py-1.5 rounded-full border border-[#c15c3d]/30"
                suppressHydrationWarning
              >
                <Sparkles className="w-3.5 h-3.5" suppressHydrationWarning />
                <span>Horizontal Execution Stream</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-cinzel leading-tight text-white">
                Strategic <span className="italic text-[#c15c3d]">Initiatives</span> & Impact
              </h2>
            </div>

            <div
              className="mt-4 md:mt-0 flex items-center gap-4 text-white/40 text-xs font-mono uppercase tracking-widest"
              suppressHydrationWarning
            >
              <span className="hidden md:inline">Scroll down to traverse timeline</span>
              <div
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-[#c15c3d]/40 animate-pulse text-[#c15c3d]"
                suppressHydrationWarning
              >
                <ArrowRight size={16} suppressHydrationWarning />
              </div>
            </div>
          </div>

          {/* Horizontal Track Container */}
          <div className="overflow-hidden w-full py-8 md:py-10" suppressHydrationWarning>
            <div
              ref={trackRef}
              className="flex flex-col md:flex-row gap-8 md:gap-12 px-6 md:px-20 w-full md:w-max"
              suppressHydrationWarning
            >
              {initiatives.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.id}
                    className="attached-h-panel w-full md:w-[680px] lg:w-[760px] shrink-0"
                    suppressHydrationWarning
                  >
                    <div
                      className="attached-h-inner bg-[#111116] border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:border-[#c15c3d]/40 transition-all duration-700 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[480px] md:min-h-[540px]"
                      suppressHydrationWarning
                    >
                      {/* Parallax Background Photo */}
                      <div
                        className="absolute inset-0 opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 ease-out"
                        suppressHydrationWarning
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover grayscale mix-blend-luminosity"
                          suppressHydrationWarning
                        />
                      </div>

                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/90 to-transparent pointer-events-none"
                        suppressHydrationWarning
                      />

                      {/* Top Header Row */}
                      <div
                        className="relative z-10 flex items-center justify-between mb-8"
                        suppressHydrationWarning
                      >
                        <div className="flex items-center gap-3.5" suppressHydrationWarning>
                          <div
                            className={`p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${getTextColorClass(item.accent)}`}
                            suppressHydrationWarning
                          >
                            <IconComp size={22} suppressHydrationWarning />
                          </div>
                          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                            {item.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-4" suppressHydrationWarning>
                          <span
                            className={`font-mono text-3xl font-light tracking-tight ${getTextColorClass(item.accent)}`}
                          >
                            {item.number}
                          </span>
                          <div
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-[#c15c3d] group-hover:border-[#c15c3d] group-hover:text-white transition-all duration-500"
                            suppressHydrationWarning
                          >
                            <ArrowUpRight size={18} suppressHydrationWarning />
                          </div>
                        </div>
                      </div>

                      {/* Middle Content */}
                      <div className="relative z-10 space-y-3 mb-8" suppressHydrationWarning>
                        <div
                          className="text-xs font-mono tracking-widest uppercase text-[#c15c3d]"
                          suppressHydrationWarning
                        >
                          {item.subtitle}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-cinzel text-white group-hover:text-[#f8f8f8] transition-colors leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-base md:text-lg text-white/65 font-light leading-relaxed max-w-2xl">
                          {item.description}
                        </p>
                      </div>

                      {/* Statistics / Metrics Grid */}
                      <div
                        className="relative z-10 grid grid-cols-3 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 backdrop-blur-md"
                        suppressHydrationWarning
                      >
                        {item.metrics.map((m, idx) => (
                          <div key={idx} suppressHydrationWarning>
                            <div
                              className={`text-xl md:text-2xl font-mono font-medium ${getTextColorClass(item.accent)}`}
                            >
                              {m.value}
                            </div>
                            <div className="text-[10px] md:text-xs text-white/40 uppercase font-mono tracking-wider mt-1">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Tags */}
                      <div
                        className="relative z-10 flex flex-wrap items-center gap-2 pt-3 border-t border-white/5"
                        suppressHydrationWarning
                      >
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs font-mono px-3.5 py-1 rounded-full bg-white/5 text-white/70 border border-white/10"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ---------------- EXPANDING TRANSITION PORTAL TO NEXT CHAPTER ---------------- */}
              <div
                ref={nextPanelRef}
                className="transition-next-panel w-full md:w-[720px] lg:w-[840px] shrink-0"
                suppressHydrationWarning
              >
                <div
                  ref={nextInnerRef}
                  className="transition-next-inner bg-gradient-to-br from-[#120e10] via-[#1a1215] to-[#0d0d12] border border-[#c15c3d]/40 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden group shadow-[0_0_80px_rgba(193,92,61,0.25)] flex flex-col justify-between min-h-[480px] md:min-h-[540px] transition-all duration-700"
                  suppressHydrationWarning
                >
                  {/* Background Ambient Glow & Particles */}
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(193,92,61,0.25),transparent_60%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.15),transparent_60%)] pointer-events-none"
                    suppressHydrationWarning
                  />
                  <div
                    className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#c15c3d]/20 rounded-full blur-3xl pointer-events-none animate-pulse"
                    suppressHydrationWarning
                  />

                  {/* Header Row */}
                  <div
                    className="relative z-10 flex items-center justify-between"
                    suppressHydrationWarning
                  >
                    <div
                      className="inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.3em] uppercase text-[#c15c3d] bg-[#c15c3d]/15 px-4 py-2 rounded-full border border-[#c15c3d]/30 backdrop-blur-md"
                      suppressHydrationWarning
                    >
                      <Sparkles className="w-3.5 h-3.5" suppressHydrationWarning />
                      <span>Next Phase Unlocked</span>
                    </div>

                    <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                      Chapter 02
                    </span>
                  </div>

                  {/* Middle Content Expansion */}
                  <div className="relative z-10 space-y-4 my-6" suppressHydrationWarning>
                    <div
                      className="text-xs font-mono tracking-[0.25em] uppercase text-white/50"
                      suppressHydrationWarning
                    >
                      Seamless Transition
                    </div>
                    <h3 className="text-3xl md:text-5xl font-cinzel text-white leading-tight">
                      Experience, Leadership <br />
                      <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#c15c3d] to-[#e88162]">
                        & Institutional Impact
                      </span>
                    </h3>
                    <p className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-2xl">
                      Having explored our core philosophy and strategic initiatives, transition to
                      the comprehensive career archive detailing 10+ years of pan-African
                      leadership, measurable field outcomes, and formal citations.
                    </p>
                  </div>

                  {/* Page Transition Action Buttons */}
                  <div
                    className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-white/10"
                    suppressHydrationWarning
                  >
                    <Link
                      to="/experience"
                      className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#c15c3d] text-white font-mono text-xs uppercase tracking-wider font-medium hover:bg-[#d46a4a] transition-all shadow-lg hover:shadow-[#c15c3d]/40 group/btn"
                      suppressHydrationWarning
                    >
                      <span>Full Experience Page</span>
                      <ChevronRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                        suppressHydrationWarning
                      />
                    </Link>

                    <Link
                      to="/impact"
                      className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider font-medium transition-all"
                      suppressHydrationWarning
                    >
                      <span>Impact Matrix</span>
                      <ExternalLink size={14} className="text-white/60" suppressHydrationWarning />
                    </Link>

                    <a
                      href="#journey"
                      className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-white/60 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors ml-auto"
                      suppressHydrationWarning
                    >
                      <span>Scroll Down</span>
                      <ArrowDownRight
                        size={14}
                        className="animate-bounce"
                        suppressHydrationWarning
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
