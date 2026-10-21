import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Activity,
  ChevronRight,
  CornerUpLeft,
  LineChart,
  Target,
  BarChart2,
  Briefcase,
  Radar,
  BookOpen,
  Terminal,
} from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { certificates } from "@/data";
import { CertTransition } from "@/components/transitions/CertTransition";
import { SubpageMenuHeader } from "@/components/SubpageMenuHeader";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/certificates_/$id")({
  component: CertificateDetail,
  loader: ({ params }) => {
    const id = parseInt(params.id, 10);
    const cert = certificates[id];
    if (!cert) {
      throw notFound();
    }
    return { cert, index: id };
  },
});

function useLenisScroll(
  duration = 1.2,
  easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
) {
  useEffect(() => {
    const lenis = new Lenis({
      duration,
      easing,
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
  }, [duration, easing]);
}

type CertData = (typeof certificates)[0];

// CERT 0: Clean, Architectural, Split Layout (Corporate)
function Cert0({ cert }: { cert: CertData }) {
  useLenisScroll(1.5, (t) => 1 - Math.pow(1 - t, 4));
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(container.current, {
      opacity: 0,
      y: 30,
      scale: 0.98,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => navigate({ to: "/certificates" }),
    });
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".c0-text", { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
      tl.from(".c0-img", { scale: 1.1, opacity: 0, duration: 1.5, ease: "expo.out" }, "-=0.8");

      gsap.to(".c0-img-inner", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".c0-img",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <main ref={container} className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <Link
          to="/certificates"
          onClick={handleClose}
          className="group flex items-center gap-4 pointer-events-auto"
        >
          <div className="relative flex items-center justify-center w-12 h-12">
            <div className="absolute inset-0 border border-white/20 rounded-full scale-100 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <div className="absolute inset-0 border border-white rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <div className="w-full h-[1px] bg-white absolute top-1/2 left-0 -translate-y-1/2 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 delay-100 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </div>
          <span className="font-sans font-light text-[11px] tracking-[0.4em] uppercase overflow-hidden relative">
            <span className="inline-block transition-transform duration-700 group-hover:-translate-y-full ease-[cubic-bezier(0.19,1,0.22,1)]">
              Back
            </span>
            <span className="inline-block absolute top-0 left-0 translate-y-full transition-transform duration-700 group-hover:translate-y-0 ease-[cubic-bezier(0.19,1,0.22,1)]">
              Back
            </span>
          </span>
        </Link>
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-50 pointer-events-auto">
          {cert.year}
        </span>
      </nav>
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 md:p-12 gap-12 lg:gap-24 max-w-[1400px] mx-auto pt-32">
        <div className="flex-1 w-full max-w-xl">
          <div className="c0-text text-sm font-mono text-zinc-500 mb-6 uppercase tracking-widest">
            {cert.org}
          </div>
          <h1 className="c0-text text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            {cert.title}
          </h1>
          <p className="c0-text text-xl md:text-2xl text-zinc-600 mb-8 leading-relaxed">
            {cert.desc}
          </p>
          <div className="c0-text w-full h-px bg-zinc-200 mb-8" />
          <p className="c0-text text-base text-zinc-500 mb-10 leading-loose">{cert.details}</p>
          <div className="c0-text flex flex-wrap gap-2">
            {cert.skills?.map((skill: string) => (
              <span
                key={skill}
                className="px-4 py-2 bg-zinc-100 border border-zinc-200 text-xs font-mono uppercase tracking-wider rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <div className="c0-img w-full aspect-[1.414/1] overflow-hidden rounded-3xl bg-zinc-200 relative">
            <img
              src={cert.image}
              className="c0-img-inner w-full h-full absolute top-0 left-0 object-contain"
              alt={cert.title}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// CERT 1: Humanitarian, Solid Blue, Centered Grid (UNHCR style)
function Cert1({ cert }: { cert: CertData }) {
  useLenisScroll(1.2);
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(container.current, {
      opacity: 0,
      y: 30,
      scale: 0.98,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => navigate({ to: "/certificates" }),
    });
  };

  useGSAP(
    () => {
      gsap.from(".c1-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });
    },
    { scope: container },
  );

  return (
    <main ref={container} className="min-h-screen bg-[#0a192f] text-slate-300 font-serif">
      <nav className="p-8 md:p-12 flex justify-between items-center mix-blend-difference text-white pointer-events-none absolute top-0 w-full z-50">
        <Link
          to="/certificates"
          onClick={handleClose}
          className="group flex items-center gap-6 pointer-events-auto cursor-pointer"
        >
          <div className="w-16 h-[1px] bg-white/30 relative overflow-hidden group-hover:w-24 transition-all duration-700 ease-out">
            <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          </div>
          <span className="font-serif text-xl md:text-2xl italic opacity-50 group-hover:opacity-100 transition-opacity duration-700">
            Return
          </span>
        </Link>
      </nav>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="c1-reveal text-center mb-16">
          <span className="inline-block py-1 px-3 border border-blue-500/30 text-blue-400 font-sans text-xs tracking-[0.2em] uppercase rounded-full mb-6">
            {cert.org} | {cert.year}
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-slate-100 leading-tight">
            {cert.title}
          </h1>
        </div>
        <div className="c1-reveal w-full max-w-2xl mx-auto aspect-[1.414/1] overflow-hidden rounded-2xl shadow-2xl shadow-black/50 border border-slate-800 mb-16 relative group">
          <img
            src={cert.image}
            className="w-full h-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[2s]"
          />
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply pointer-events-none" />
        </div>
        <div className="grid md:grid-cols-2 gap-12 c1-reveal font-sans">
          <div>
            <h3 className="text-2xl text-slate-200 mb-6 font-serif">{cert.desc}</h3>
            <div className="flex flex-wrap gap-2">
              {cert.skills?.map((skill: string) => (
                <span
                  key={skill}
                  className="text-xs font-mono text-blue-300 bg-blue-900/30 px-3 py-1.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-slate-400 leading-loose">{cert.details}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

// CERT 2: Warm, Empathetic, Asymmetrical offset (GBV Case Mgmt)
function Cert2({ cert }: { cert: CertData }) {
  useLenisScroll(2.0, (t) => 1 - Math.pow(1 - t, 5)); // Very smooth and floaty
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(container.current, {
      opacity: 0,
      y: 30,
      scale: 0.98,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => navigate({ to: "/certificates" }),
    });
  };

  useGSAP(
    () => {
      gsap.from(".c2-img", {
        scale: 0.8,
        opacity: 0,
        rotation: -5,
        duration: 1.5,
        ease: "back.out(1.2)",
      });
      gsap.from(".c2-text", {
        x: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
    },
    { scope: container },
  );

  return (
    <main
      ref={container}
      className="min-h-screen bg-[#F5F2EB] text-[#2C2A25] dark:bg-[#08080a] dark:text-[#f3f4f6] font-serif overflow-hidden relative transition-colors duration-300"
    >
      <nav className="absolute top-0 w-full p-8 z-10 pointer-events-none">
        <Link
          to="/certificates"
          onClick={handleClose}
          className="group flex items-center gap-4 cursor-pointer pointer-events-auto text-[#2C2A25]"
        >
          <div className="relative w-12 h-12 rounded-full border-2 border-[#2C2A25]/20 flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover:border-transparent">
            <div className="absolute inset-0 bg-[#2C2A25] scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom" />
            <ArrowLeft className="relative z-10 w-5 h-5 group-hover:text-[#F5F2EB] group-hover:-translate-x-1 transition-all duration-500" />
          </div>
          <span className="font-sans font-bold text-xs uppercase tracking-widest opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
            Go Back
          </span>
        </Link>
      </nav>
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center max-w-[1200px] mx-auto px-6 py-24 gap-12">
        <div className="md:w-1/2 relative z-10 c2-img flex justify-center">
          <div className="w-full max-w-md aspect-[1.414/1] bg-stone-300 rounded-[2rem] overflow-hidden shadow-xl transform md:translate-x-12">
            <img src={cert.image} className="w-full h-full object-contain sepia-[0.2]" />
          </div>
        </div>
        <div className="md:w-1/2 md:pl-16 z-20 bg-[#F5F2EB]/80 backdrop-blur-sm p-8 rounded-3xl mt-12 md:mt-0">
          <div className="c2-text text-sm uppercase tracking-widest text-amber-700 font-sans mb-4">
            {cert.org} — {cert.year}
          </div>
          <h1 className="c2-text text-5xl md:text-6xl font-medium leading-[1.1] mb-6 text-[#1A1814]">
            {cert.title}
          </h1>
          <p className="c2-text text-2xl italic text-stone-600 mb-8">{cert.desc}</p>
          <p className="c2-text text-base font-sans text-stone-700 leading-relaxed mb-8">
            {cert.details}
          </p>
          <div className="c2-text flex flex-wrap gap-3 font-sans">
            {cert.skills?.map((skill: string) => (
              <span
                key={skill}
                className="border border-stone-300 px-4 py-2 rounded-full text-xs tracking-wider"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// CERT 3: Technical, Data-Oriented, Matrix Bento (Monitoring & Eval)
function Cert3({ cert }: { cert: CertData }) {
  useLenisScroll(1.0);
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(container.current, {
      opacity: 0,
      y: 30,
      scale: 0.98,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => navigate({ to: "/certificates" }),
    });
  };
  const imgContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.6 },
      });

      tl.from(".c3-bg", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 1.2,
      })
        .from(
          ".c3-line",
          {
            scaleX: 0,
            transformOrigin: "left",
            stagger: 0.1,
          },
          "-=0.8",
        )
        .from(
          ".c3-text-mask span",
          {
            yPercent: 120,
            stagger: 0.05,
            duration: 1.2,
          },
          "-=1.2",
        )
        .from(
          ".c3-fade",
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
          },
          "-=1",
        );

      // Magnetic Image Effect
      if (imgContainer.current) {
        const xTo = gsap.quickTo(".c3-img-inner", "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(".c3-img-inner", "y", { duration: 0.8, ease: "power3.out" });

        imgContainer.current?.addEventListener("mousemove", (e) => {
          const rect = imgContainer.current!.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
          xTo(x);
          yTo(y);
        });

        imgContainer.current?.addEventListener("mouseleave", () => {
          xTo(0);
          yTo(0);
        });
      }

      // Parallax on scroll
      gsap.to(".c3-parallax", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <main
      ref={container}
      className="relative min-h-screen bg-[#F0EFEB] text-[#1A1A1A] dark:bg-[#08080a] dark:text-[#f3f4f6] font-sans selection:bg-[#1A1A1A] selection:text-[#F0EFEB] dark:selection:bg-white dark:selection:text-black transition-colors duration-300"
    >
      {/* Background reveal element */}
      <div className="c3-bg absolute inset-0 bg-[#E8E6E1] dark:bg-[#0a0a0d] pointer-events-none z-0 transition-colors duration-300" />

      {/* Subtle Noise */}
      <div
        className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <nav className="fixed top-0 w-full p-8 md:p-12 z-40 flex items-center justify-between pointer-events-none mix-blend-difference text-white">
        <Link
          to="/certificates"
          onClick={handleClose}
          className="group flex flex-col items-start gap-1 pointer-events-auto text-red-500"
        >
          <span className="font-sans font-bold text-[10px] uppercase tracking-[0.5em] overflow-hidden relative">
            <span className="block transition-transform duration-500 group-hover:-translate-y-full">
              Exit
            </span>
            <span className="block absolute top-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
              Exit
            </span>
          </span>
          <div className="w-4 h-[2px] bg-red-500 group-hover:w-16 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
        </Link>
        <div className="font-sans font-light text-[10px] uppercase tracking-[0.4em]">
          Vol. {cert.year}
        </div>
      </nav>

      <div className="relative z-10 pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto min-h-screen flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 flex-1">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-8 md:mb-16">
              <div className="c3-fade flex items-center gap-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] mb-8 text-[#1A1A1A]/50">
                <span>{cert.org}</span>
                <span className="w-4 h-[1px] bg-current" />
                <span>Certification</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-serif font-light leading-[0.9] tracking-tight mb-12">
                {cert.title.split(" ").map((word: string, i: number) => (
                  <span key={i} className="c3-text-mask inline-block overflow-hidden mr-4 py-2">
                    <span className="inline-block transform-gpu">{word}</span>
                  </span>
                ))}
              </h1>

              <div className="c3-line w-full h-[1px] bg-[#1A1A1A]/10 mb-12" />

              <div className="grid md:grid-cols-2 gap-12">
                <p className="c3-fade text-xl md:text-2xl font-light leading-snug text-[#1A1A1A]/80">
                  {cert.desc}
                </p>
                <div className="c3-fade text-sm md:text-base text-[#1A1A1A]/60 font-light leading-relaxed">
                  {cert.details}
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="c3-line w-full h-[1px] bg-[#1A1A1A]/10 mb-8" />
              <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between c3-fade">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/40">
                  Competencies Evaluated
                </span>
                <div className="flex flex-wrap gap-4">
                  {cert.skills?.map((skill: string) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] md:text-xs uppercase tracking-[0.1em] border border-[#1A1A1A]/10 px-4 py-2 rounded-full hover:bg-[#1A1A1A] hover:text-[#F0EFEB] transition-colors duration-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 h-[50vh] lg:h-auto w-full relative">
            <div
              ref={imgContainer}
              className="w-full h-full relative overflow-hidden group rounded-sm"
            >
              <div className="absolute inset-0 bg-[#1A1A1A]/5 z-10 group-hover:bg-transparent transition-colors duration-700" />
              <img
                src={cert.image}
                alt={cert.title}
                className="c3-img-inner c3-parallax absolute inset-[-10%] w-[120%] h-full object-contain grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// CERT 4: Brutalist, Huge Text, Hard cuts (Leadership/Data)
function Cert4({ cert }: { cert: CertData }) {
  useLenisScroll(0.8);
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(container.current, {
      opacity: 0,
      y: 30,
      scale: 0.98,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => navigate({ to: "/certificates" }),
    });
  };

  useGSAP(
    () => {
      gsap.from(".c4-block", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1,
        stagger: 0.2,
        ease: "power4.inOut",
      });
      gsap.to(".c4-marquee", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <main ref={container} className="min-h-screen bg-black text-white font-sans uppercase">
      <nav className="p-6 border-b-4 border-white flex justify-between items-center bg-black z-50 relative pointer-events-none">
        <Link
          to="/certificates"
          onClick={handleClose}
          className="group font-black text-xl md:text-2xl uppercase tracking-tighter cursor-pointer text-white mix-blend-difference flex items-center gap-4 pointer-events-auto"
        >
          <div className="w-12 h-12 bg-white flex items-center justify-center group-hover:bg-black border-4 border-transparent group-hover:border-white transition-colors duration-300">
            <ArrowLeft className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
          </div>
          <span className="group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_white] transition-all duration-300">
            Retreat
          </span>
        </Link>
        <span className="font-bold text-xl text-white pointer-events-auto">{cert.year}</span>
      </nav>

      <div className="c4-block border-b-4 border-white p-6 md:p-12">
        <h1 className="text-[10vw] font-black leading-[0.8] tracking-tighter mix-blend-difference">
          {cert.title}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 border-b-4 border-white">
        <div className="c4-block p-6 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-white flex flex-col justify-between gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              ISSUED BY:
              <br />
              {cert.org}
            </h2>
            <p className="text-xl md:text-2xl font-medium leading-tight mb-8">{cert.desc}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {cert.skills?.map((skill: string) => (
              <span
                key={skill}
                className="bg-white text-black px-4 py-2 font-black text-sm md:text-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="c4-block aspect-[1.414/1] relative overflow-hidden bg-zinc-900 border-b-4 md:border-b-0 border-white">
          <img
            src={cert.image}
            className="w-full h-full object-contain scale-110 hover:scale-100 transition-transform duration-500 grayscale hover:grayscale-0"
          />
          <div className="absolute inset-0 border-[16px] border-white pointer-events-none" />
        </div>
      </div>

      <div className="c4-block p-6 md:p-12 max-w-5xl">
        <p className="text-2xl md:text-4xl font-bold leading-tight lowercase">{cert.details}</p>
      </div>

      <div className="overflow-hidden border-t-4 border-white py-4 bg-white text-black whitespace-nowrap">
        <div className="c4-marquee inline-block text-6xl font-black">
          {Array(10).fill(`${cert.title} /// ${cert.org} /// `).join("")}
        </div>
      </div>
    </main>
  );
}

// CERT 5: Elegant, Editorial, Serif typography
function Cert5({ cert }: { cert: CertData }) {
  useLenisScroll(1.5, (t) => 1 - Math.pow(1 - t, 4));
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(container.current, {
      opacity: 0,
      y: 30,
      scale: 0.98,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => navigate({ to: "/certificates" }),
    });
  };

  useGSAP(
    () => {
      gsap.from(".c5-text", {
        opacity: 0,
        y: 30,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
      });
      gsap.to(".c5-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".c5-img-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <main ref={container} className="min-h-screen bg-[#F0EBE1] text-[#222] dark:bg-[#08080a] dark:text-[#f3f4f6] font-serif relative transition-colors duration-300">
      <nav className="p-8 md:p-12 flex justify-between items-center absolute top-0 w-full z-10 mix-blend-multiply text-zinc-900 pointer-events-none">
        <Link
          to="/certificates"
          onClick={handleClose}
          className="group flex flex-col pointer-events-auto"
        >
          <span className="font-serif italic text-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 mb-2">
            Back
          </span>
          <div className="w-16 h-[2px] bg-zinc-900/30 origin-left group-hover:w-24 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] relative flex items-center">
            <div className="absolute left-0 top-0 w-full h-full bg-zinc-900 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 delay-100" />
            <ArrowLeft className="absolute -left-2 w-4 h-4 text-zinc-900 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-200" />
          </div>
        </Link>
        <span className="text-sm tracking-[0.2em] uppercase text-zinc-900">{cert.org}</span>
      </nav>

      <div className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-24 items-center">
        <div className="md:col-span-5 c5-img-container relative w-full aspect-[1.414/1] overflow-hidden rounded-sm">
          <img
            src={cert.image}
            className="c5-img w-full h-full absolute top-0 left-0 object-contain sepia-[0.3]"
          />
        </div>
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="c5-text text-sm tracking-[0.3em] uppercase text-black/50 mb-6">
            {cert.year}
          </div>
          <h1 className="c5-text text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.1] tracking-tight mb-8">
            {cert.title}
          </h1>
          <p className="c5-text text-2xl italic text-black/70 mb-10">{cert.desc}</p>
          <p className="c5-text text-base leading-relaxed text-black/60 mb-12 max-w-xl">
            {cert.details}
          </p>
          <div className="c5-text grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            {cert.skills?.map((skill: string) => (
              <div
                key={skill}
                className="text-xs uppercase tracking-widest text-black/80 border-l border-black/20 pl-3 py-1"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// CERT 6: Awwwards Winning WebGL-esque / High-End Interactive
function Cert6({ cert }: { cert: CertData }) {
  useLenisScroll(1.5, (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)));
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(container.current, {
      opacity: 0,
      y: 30,
      scale: 0.98,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => navigate({ to: "/certificates" }),
    });
  };

  useGSAP(
    () => {
      // Intro animations
      const tl = gsap.timeline();

      tl.to(".c6-overlay", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "expo.inOut",
      })
        .from(
          ".c6-title-char",
          {
            y: 100,
            opacity: 0,
            rotateX: -90,
            stagger: 0.05,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.5",
        )
        .from(
          ".c6-img-container",
          {
            scale: 0.8,
            opacity: 0,
            filter: "blur(20px)",
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1",
        )
        .from(
          ".c6-text-reveal",
          {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
          },
          "-=1",
        );

      // Parallax text
      gsap.to(".c6-bg-text", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Image subtle parallax
      gsap.to(".c6-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".c6-img-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Mouse interactive magnetic effect on the image
      const imgWrap = document.querySelector(".c6-img-container") as HTMLElement;
      if (imgWrap) {
        const xTo = gsap.quickTo(".c6-img-inner", "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(".c6-img-inner", "y", { duration: 0.8, ease: "power3.out" });
        const scaleTo = gsap.quickTo(".c6-img-inner", "scale", {
          duration: 0.5,
          ease: "power2.out",
        });

        imgWrap.addEventListener("mousemove", (e) => {
          const rect = imgWrap.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
          xTo(x);
          yTo(y);
          scaleTo(1.05);
        });

        imgWrap.addEventListener("mouseleave", () => {
          xTo(0);
          yTo(0);
          scaleTo(1);
        });
      }
    },
    { scope: container },
  );

  return (
    <main
      ref={container}
      className="relative min-h-screen bg-[#050505] text-[#e0e0e0] font-sans overflow-x-hidden selection:bg-[#00ff9d] selection:text-[#050505]"
    >
      {/* Intro Overlay */}
      <div className="c6-overlay absolute inset-0 bg-[#00ff9d] z-[100] pointer-events-none" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <nav className="fixed top-0 w-full p-8 md:p-12 z-50 mix-blend-difference flex justify-between items-center pointer-events-none">
        <Link
          to="/certificates"
          onClick={handleClose}
          className="group flex items-center gap-6 pointer-events-auto text-[#00ff9d]"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute w-full h-[1px] bg-[#00ff9d] group-hover:-rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <div className="absolute w-full h-[1px] bg-[#00ff9d] rotate-90 group-hover:rotate-[-45deg] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </div>
          <span className="font-sans font-medium text-[10px] uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            Return
          </span>
        </Link>
        <div className="font-sans font-medium text-[10px] uppercase tracking-[0.3em] pointer-events-auto flex gap-4 items-center text-white">
          <span className="w-2 h-2 rounded-full bg-[#00ff9d]" />
          {cert.year}
        </div>
      </nav>

      <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center">
        {/* Massive Background Text */}
        <div className="absolute top-1/4 left-0 w-[200vw] overflow-hidden pointer-events-none z-0 opacity-[0.03]">
          <h1 className="c6-bg-text text-[25vw] font-display font-black uppercase leading-[0.8] tracking-tighter whitespace-nowrap">
            {cert.title} — {cert.org}
          </h1>
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Typography & Content */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <div className="c6-text-reveal flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] text-[#00ff9d] border border-[#00ff9d]/30 px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                {cert.org}
              </span>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
                CERTIFICATE
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-black uppercase leading-[0.9] tracking-tighter mb-10 text-white"
              style={{ perspective: "1000px" }}
            >
              {cert.title.split(" ").map((word: string, i: number) => (
                <span key={i} className="inline-block mr-4 overflow-hidden py-2">
                  <span className="c6-title-char inline-block transform-gpu origin-bottom">
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p className="c6-text-reveal text-xl md:text-3xl font-light font-serif text-white/80 leading-snug mb-10 max-w-2xl">
              {cert.desc}
            </p>

            <div className="c6-text-reveal w-12 h-px bg-[#00ff9d]/50 mb-10" />

            <p className="c6-text-reveal text-sm md:text-base text-white/50 font-sans font-light leading-loose max-w-2xl mb-16">
              {cert.details}
            </p>

            <div className="c6-text-reveal">
              <h3 className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] mb-6">
                Competencies Acquired
              </h3>
              <div className="flex flex-wrap gap-3">
                {cert.skills?.map((skill: string) => (
                  <div
                    key={skill}
                    className="px-5 py-2.5 bg-white/[0.02] hover:bg-[#00ff9d]/10 transition-colors duration-500 border border-white/10 hover:border-[#00ff9d]/30 rounded-full font-mono text-[10px] uppercase tracking-[0.1em] text-white/70 hover:text-[#00ff9d]"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="lg:col-span-5 order-1 lg:order-2 w-full flex justify-center lg:justify-end">
            <div className="c6-img-container relative w-full max-w-[500px] aspect-[1.414/1] overflow-hidden rounded-2xl bg-[#111]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff9d]/20 to-transparent mix-blend-overlay z-10" />
              <img
                src={cert.image}
                className="c6-img c6-img-inner absolute inset-0 w-full h-full object-contain grayscale contrast-125 opacity-70 mix-blend-luminosity"
                alt={cert.title}
              />
              <div className="absolute inset-0 border border-white/10 rounded-2xl z-20 pointer-events-none" />

              {/* Corner Accents */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#00ff9d]/50 z-20" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#00ff9d]/50 z-20" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CertificateDetail() {
  const { cert, index } = Route.useLoaderData();

  const renderContent = () => {
    const layout = index % 7;
    if (layout === 0) return <Cert0 cert={cert} />;
    if (layout === 1) return <Cert1 cert={cert} />;
    if (layout === 2) return <Cert2 cert={cert} />;
    if (layout === 3) return <Cert3 cert={cert} />;
    if (layout === 4) return <Cert4 cert={cert} />;
    if (layout === 5) return <Cert5 cert={cert} />;
    if (layout === 6) return <Cert6 cert={cert} />;
    return <Cert0 cert={cert} />;
  };

  return (
    <>
      <CertTransition key={index} index={index} />
      <SubpageMenuHeader
        title="Certificates"
        items={certificates.map((c, i) => ({ label: c.title, href: `/certificates/${i}` }))}
      />
      {renderContent()}
    </>
  );
}
