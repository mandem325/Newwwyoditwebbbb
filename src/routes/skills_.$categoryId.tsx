import { SkillTransition } from "@/components/transitions/SkillTransition";
import { SubpageMenuHeader } from "@/components/SubpageMenuHeader";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { ArrowLeft, Target, Megaphone, Users, Compass, ScanSearch } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategoriesData: Record<
  string,
  {
    category: string;
    skills: { name: string; detail: string }[];
    desc: string;
    color: string;
    images: string[];
    longDesc: string;
  }
> = {
  "program-management": {
    category: "Program Management",
    skills: [
      {
        name: "Strategic Planning",
        detail:
          "Aligning project goals with organizational vision and stakeholder priorities. Developing multi-year roadmaps that anticipate risk and scale effectively.",
      },
      {
        name: "Project Lifecycle Management",
        detail:
          "Overseeing initiatives from concept to execution, monitoring, and closure. Ensuring agile methodologies are applied to adapt to shifting on-the-ground realities.",
      },
      {
        name: "Grant Management",
        detail:
          "Securing, allocating, and tracking funds efficiently to maximize program value while ensuring absolute compliance with international donor regulations.",
      },
      {
        name: "Budget Optimization",
        detail:
          "Maximizing impact while minimizing overhead costs through rigorous financial oversight and continuous resource allocation analysis.",
      },
      {
        name: "Cross-functional Leadership",
        detail:
          "Guiding multidisciplinary teams toward shared objectives in high-stakes environments, fostering collaboration and conflict resolution.",
      },
      {
        name: "Risk Assessment & Mitigation",
        detail:
          "Proactively identifying potential bottlenecks and vulnerabilities in program execution and developing robust contingency frameworks.",
      },
    ],
    desc: "Orchestrating complex initiatives from inception to sustainable impact.",
    color: "#4A5568", // Slate
    images: [
      "/gallery/IMG_20260922_185846_438.jpg",
      "/gallery/IMG_20260922_185937_614.jpg",
      "/gallery/56IMG_20260922_190007_832.jpg",
    ],
    longDesc:
      "Effective program management requires balancing visionary goals with pragmatic execution. It involves aligning stakeholders, securing resources, and navigating complex regulatory landscapes to ensure that every initiative delivers measurable and sustainable value.",
  },
  advocacy: {
    category: "Advocacy",
    skills: [
      {
        name: "Policy Analysis",
        detail:
          "Evaluating legislative proposals and regulatory frameworks to understand their impact on vulnerable populations and strategic objectives.",
      },
      {
        name: "Stakeholder Engagement",
        detail:
          "Building and maintaining critical relationships with government officials, community leaders, and partner organizations to drive shared agendas.",
      },
      {
        name: "Public Speaking & Presentation",
        detail:
          "Delivering compelling narratives and data-driven arguments in high-profile forums to influence public opinion and policy decisions.",
      },
      {
        name: "Campaign Strategy",
        detail:
          "Designing comprehensive advocacy campaigns that integrate grassroots mobilization with targeted high-level lobbying.",
      },
      {
        name: "Strategic Communications",
        detail:
          "Crafting clear, persuasive messaging tailored to diverse audiences across traditional media and digital platforms.",
      },
      {
        name: "Coalition Building",
        detail:
          "Uniting disparate groups under a common cause, leveraging collective strength to amplify advocacy efforts and achieve policy wins.",
      },
    ],
    desc: "Driving systemic change through strategic communication and policy influence.",
    color: "#C53030", // Red
    images: [
      "/gallery/IMG_20260922_185940_986.jpg",
      "/gallery/IMG_20260922_185957_259.jpg",
      "/gallery/444IMG_20260922_190002_684.jpg",
    ],
    longDesc:
      "Advocacy is the engine of systemic change. It requires a deep understanding of policy landscapes, the ability to articulate compelling narratives, and the strategic foresight to build coalitions that can influence decision-makers at every level.",
  },
  "capacity-building": {
    category: "Capacity Building",
    skills: [
      {
        name: "Curriculum Development",
        detail:
          "Designing comprehensive, engaging, and culturally relevant training materials tailored to the specific needs of adult learners and professionals.",
      },
      {
        name: "Training Facilitation",
        detail:
          "Leading interactive workshops and seminars that foster active participation, skill acquisition, and knowledge retention.",
      },
      {
        name: "Mentorship & Coaching",
        detail:
          "Providing one-on-one guidance and constructive feedback to empower individuals and accelerate their professional development.",
      },
      {
        name: "Organizational Assessment",
        detail:
          "Evaluating institutional strengths and weaknesses to identify critical gaps in knowledge, resources, or operational efficiency.",
      },
      {
        name: "Knowledge Transfer",
        detail:
          "Establishing systems and processes to ensure that expertise and institutional memory are effectively shared across teams.",
      },
      {
        name: "Resource Development",
        detail:
          "Creating toolkits, manuals, and digital resources that serve as enduring references for continuous learning and operational support.",
      },
    ],
    desc: "Empowering individuals and organizations to achieve sustainable growth.",
    color: "#2B6CB0", // Blue
    images: [
      "/gallery/IMG_20260922_185849_390.jpg",
      "/gallery/IMG_20260922_185951_029.jpg",
      "/gallery/665IMG_20260922_190007_888.jpg",
    ],
    longDesc:
      "True sustainability relies on empowering local actors. Capacity building focuses on assessing organizational needs and delivering targeted training and mentorship that elevates the skills, efficiency, and long-term resilience of teams and partners.",
  },
  "monitoring-and-evaluation": {
    category: "Monitoring & Evaluation",
    skills: [
      {
        name: "Data Collection & Analysis",
        detail:
          "Designing rigorous methodologies for gathering both qualitative and quantitative data, and applying advanced analytical techniques to extract actionable insights.",
      },
      {
        name: "Performance Metrics Design",
        detail:
          "Establishing clear, measurable Key Performance Indicators (KPIs) that accurately reflect program objectives and track progress over time.",
      },
      {
        name: "Impact Assessment",
        detail:
          "Evaluating the long-term effects of interventions to determine their true value and contribution to systemic change.",
      },
      {
        name: "Report Writing",
        detail:
          "Synthesizing complex data into clear, compelling, and accessible reports tailored for diverse audiences, from community stakeholders to international donors.",
      },
      {
        name: "Continuous Improvement",
        detail:
          "Utilizing real-time data and feedback loops to iteratively refine program strategies, ensuring agility and maximum impact.",
      },
      {
        name: "Database Management",
        detail:
          "Overseeing the secure and efficient storage, retrieval, and organization of program data to support robust analysis and reporting.",
      },
    ],
    desc: "Ensuring accountability and maximizing impact through rigorous analysis.",
    color: "#2F855A", // Green
    images: [
      "/gallery/IMG_20260922_185916_101.jpg",
      "/gallery/IMG_20260922_190021_107.jpg",
      "/gallery/IMG_20260922_190021_344.jpg",
    ],
    longDesc:
      "Data is the foundation of accountability. Monitoring and Evaluation provides the critical feedback loops necessary to understand what works, why it works, and how to optimize resources to achieve the greatest possible impact.",
  },
};

export const Route = createFileRoute("/skills_/$categoryId")({
  component: SkillDetail,
});

function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
}

type SkillCategoryData = (typeof skillCategoriesData)[string];

// ----------------------------------------------------------------------
// 1. Program Management Layout - Corporate / Editorial Split
// ----------------------------------------------------------------------
function ProgramManagementLayout({ data }: { data: SkillCategoryData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".pm-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
      gsap.to(".pm-parallax", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="bg-[#EBEBEB] text-[#111] dark:bg-[#08080a] dark:text-[#f3f4f6] font-sans pb-32 pt-32 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Sticky Left Column */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32">
            <h1 className="pm-reveal text-6xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.9] mb-8">
              {data.category}
            </h1>
            <p className="pm-reveal text-xl md:text-2xl font-serif italic text-[#111]/70 mb-12">
              {data.desc}
            </p>
            <div className="pm-reveal w-full aspect-[4/5] overflow-hidden bg-zinc-300">
              <img
                src={data.images[0]}
                className="w-full h-full object-cover pm-parallax scale-125 grayscale contrast-125"
                alt="Program Management"
              />
            </div>
          </div>
        </div>

        {/* Scrollable Right Column */}
        <div className="lg:col-span-7 pt-12 lg:pt-32">
          <div className="pm-reveal mb-24">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] mb-6 text-[#111]/50 border-b border-[#111]/20 pb-4">
              Overview
            </h3>
            <p className="text-2xl leading-relaxed font-light">{data.longDesc}</p>
          </div>

          <div className="space-y-12">
            <h3 className="pm-reveal font-mono text-xs uppercase tracking-[0.2em] mb-12 text-[#111]/50 border-b border-[#111]/20 pb-4">
              Core Competencies
            </h3>
            {data.skills.map((skill: any, idx: number) => (
              <div key={idx} className="pm-reveal group">
                <div className="flex gap-6 items-start">
                  <span className="font-mono text-xs opacity-40 pt-2">0{idx + 1}</span>
                  <div>
                    <h4 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-amber-700 transition-colors">
                      {skill.name}
                    </h4>
                    <p className="text-lg text-[#111]/70 leading-relaxed font-serif max-w-2xl">
                      {skill.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pm-reveal grid grid-cols-2 gap-6 mt-32">
            <div className="aspect-square overflow-hidden bg-zinc-300">
              <img
                src={data.images[1]}
                className="w-full h-full object-cover grayscale"
                alt="Detail"
              />
            </div>
            <div className="aspect-square overflow-hidden bg-zinc-300 mt-12">
              <img
                src={data.images[2]}
                className="w-full h-full object-cover grayscale"
                alt="Detail"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. Advocacy Layout - Brutalist / Bold / Large Text
// ----------------------------------------------------------------------
function AdvocacyLayout({ data }: { data: SkillCategoryData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".adv-text",
        { opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="bg-[#111] text-[#EBEBEB] font-sans pb-32">
      <div className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={data.images[0]}
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-luminosity"
          />
        </div>
        <div className="relative z-10 w-full text-center px-6">
          <h1 className="adv-text text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-[#C53030]">
            {data.category}
          </h1>
          <p className="adv-text text-2xl md:text-4xl mt-12 font-medium max-w-4xl mx-auto">
            {data.desc}
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-32">
        <p className="adv-text text-3xl md:text-5xl leading-tight font-bold mb-32 border-l-8 border-[#C53030] pl-8">
          {data.longDesc}
        </p>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
          {data.skills.map((skill: any, idx: number) => (
            <div key={idx} className="adv-text border-t-2 border-white/20 pt-8">
              <h4 className="text-4xl font-black uppercase tracking-tight text-[#C53030] mb-6">
                {skill.name}
              </h4>
              <p className="text-xl leading-relaxed text-white/80">{skill.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-32 grid md:grid-cols-2 gap-4 adv-text">
          <img src={data.images[1]} className="w-full h-[60vh] object-cover grayscale" />
          <img src={data.images[2]} className="w-full h-[60vh] object-cover grayscale" />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. Capacity Building Layout - Elegant / Flowing / Pastel
// ----------------------------------------------------------------------
function CapacityBuildingLayout({ data }: { data: SkillCategoryData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cap-fade",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="bg-[#F0F4F8] text-[#2C3E50] dark:bg-[#08080a] dark:text-[#f3f4f6] font-serif pb-32 transition-colors duration-300">
      <div className="max-w-[1000px] mx-auto px-6 pt-40 md:pt-56 text-center">
        <h1 className="cap-fade text-6xl md:text-8xl font-light italic mb-8">{data.category}</h1>
        <p className="cap-fade text-xl md:text-2xl text-[#2C3E50]/70 font-sans tracking-wide uppercase max-w-2xl mx-auto">
          {data.desc}
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mt-32 cap-fade">
        <div className="w-full h-[60vh] md:h-[80vh] rounded-[3rem] overflow-hidden shadow-2xl">
          <img src={data.images[0]} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 mt-32 text-center cap-fade">
        <p className="text-2xl md:text-3xl leading-relaxed font-light">{data.longDesc}</p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {data.skills.map((skill: any, idx: number) => (
            <div
              key={idx}
              className="cap-fade bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <h4 className="text-2xl font-semibold mb-6 font-sans text-[#2B6CB0]">{skill.name}</h4>
              <p className="text-lg leading-relaxed text-[#2C3E50]/80">{skill.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. Monitoring & Evaluation Layout - Technical / Grid / Data-driven
// ----------------------------------------------------------------------
function MonitoringEvaluationLayout({ data }: { data: SkillCategoryData }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".me-data",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="bg-[#050505] text-[#00ff41] font-mono pb-32 selection:bg-[#00ff41] selection:text-black"
    >
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      <div className="relative z-10 pt-40 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="me-data border border-[#00ff41]/30 p-8 md:p-12 mb-12 bg-black/50 backdrop-blur-sm">
          <div className="text-xs uppercase tracking-widest mb-4 opacity-70">
            [ SYS.MODULE_INIT : {data.category.toUpperCase()} ]
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
            {data.category}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed">{data.longDesc}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            {data.skills.map((skill: any, idx: number) => (
              <div
                key={idx}
                className="me-data border border-[#00ff41]/30 p-8 hover:bg-[#00ff41]/10 transition-colors bg-black/50 backdrop-blur-sm"
              >
                <div className="text-xs opacity-50 mb-4">IDX: 00{idx + 1}</div>
                <h4 className="text-xl font-bold uppercase tracking-tight mb-4">{skill.name}</h4>
                <p className="text-sm leading-relaxed opacity-80">{skill.detail}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="me-data border border-[#00ff41]/30 h-[400px] p-2 bg-black/50 backdrop-blur-sm">
              <img
                src={data.images[0]}
                className="w-full h-full object-cover grayscale brightness-75 contrast-125 sepia-[0.3] hue-rotate-[70deg]"
              />
            </div>
            <div className="me-data border border-[#00ff41]/30 h-[300px] p-2 bg-black/50 backdrop-blur-sm">
              <img
                src={data.images[1]}
                className="w-full h-full object-cover grayscale brightness-75 contrast-125 sepia-[0.3] hue-rotate-[70deg]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillDetail() {
  const { categoryId } = Route.useParams();
  useLenisScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const data = skillCategoriesData[categoryId as keyof typeof skillCategoriesData];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EBEBEB] text-[#111]">
        <h1 className="text-4xl font-display uppercase font-black">Category Not Found</h1>
        <Link to="/skills" className="mt-8 underline">
          Return to Capabilities
        </Link>
      </div>
    );
  }

  let Layout = ProgramManagementLayout;
  if (categoryId === "advocacy") Layout = AdvocacyLayout;
  else if (categoryId === "capacity-building") Layout = CapacityBuildingLayout;
  else if (categoryId === "monitoring-and-evaluation") Layout = MonitoringEvaluationLayout;

  return (
    <>
      <SkillTransition key={categoryId} categoryId={categoryId as string} />
      <SubpageMenuHeader
        title="Skills"
        items={Object.entries(skillCategoriesData).map(([id, cat]) => ({
          label: cat.category,
          href: `/skills/${id}`,
        }))}
      />
      <main
        ref={containerRef}
        className="overflow-x-hidden min-h-screen selection:bg-[#111] selection:text-[#EBEBEB]"
      >
        <nav className="fixed top-0 w-full p-8 flex justify-between z-50 mix-blend-difference text-white pointer-events-none">
          {categoryId === "advocacy" ? (
            <Link
              to="/skills"
              className="group relative flex items-center gap-4 pointer-events-auto mix-blend-difference"
            >
              <div className="w-16 h-16 border-2 border-white/20 flex items-center justify-center bg-transparent group-hover:border-white transition-colors duration-500">
                <ArrowLeft className="w-6 h-6 text-white group-hover:-translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              </div>
              <span className="font-mono font-bold uppercase tracking-[0.3em] text-sm overflow-hidden">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                  BACK
                </span>
                <span className="block absolute top-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                  BACK
                </span>
              </span>
            </Link>
          ) : categoryId === "capacity-building" ? (
            <Link
              to="/skills"
              className="group cursor-pointer flex flex-col gap-2 pointer-events-auto mix-blend-difference text-white items-start"
            >
              <div className="w-12 h-[2px] bg-white/30 group-hover:bg-white transition-colors duration-500 relative overflow-hidden flex items-center">
                <div className="absolute top-0 left-0 h-full w-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              </div>
              <div className="flex items-center gap-3">
                <ArrowLeft className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-500" />
                <span className="font-serif italic text-2xl tracking-wide opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  Back
                </span>
              </div>
            </Link>
          ) : categoryId === "monitoring-and-evaluation" ? (
            <Link
              to="/skills"
              className="group relative cursor-pointer flex items-center gap-6 pointer-events-auto mix-blend-difference text-[#00ff41]"
            >
              <div className="w-16 h-16 relative flex items-center justify-center">
                <div className="absolute inset-0 border border-[#00ff41]/30 rounded-full group-hover:scale-75 transition-transform duration-500" />
                <div className="absolute inset-0 border border-[#00ff41] rounded-full scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700" />
                <ArrowLeft className="w-6 h-6 text-[#00ff41] opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-500 z-10" />
              </div>
              <span className="font-mono text-sm font-bold uppercase tracking-[0.4em] text-[#00ff41] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                Return
              </span>
            </Link>
          ) : (
            <Link
              to="/skills"
              className="group cursor-pointer flex items-center gap-6 pointer-events-auto mix-blend-difference text-white relative"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                <ArrowLeft className="w-5 h-5 text-white group-hover:text-black group-hover:-translate-x-1 transition-all duration-500" />
              </div>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700">
                Back
              </span>
            </Link>
          )}
          <div className="font-mono uppercase tracking-widest text-xs hidden md:block">
            {categoryId}
          </div>
        </nav>
        <Layout data={data} />

        {/* Universal Footer Nav for all layouts */}
        <section className="h-[40vh] flex flex-col items-center justify-center bg-[#111] text-[#EBEBEB] px-6 text-center z-20 relative">
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter mb-12">
            Explore Other Competencies
          </h2>
          <Link
            to="/skills"
            className="px-10 py-5 rounded-full border border-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-[#111] transition-colors duration-500 pointer-events-auto"
          >
            Return to Capabilities
          </Link>
        </section>
      </main>
    </>
  );
}
