import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { ArrowUpLeft, Undo2 } from "lucide-react";
import { SubpageMenuHeader } from "@/components/SubpageMenuHeader";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/skills")({
  component: SkillsPage,
});

const skillCategories = [
  {
    category: "Program Management",
    id: "program-management",
    skills: [
      {
        name: "Strategic Planning",
        detail: "Aligning project goals with organizational vision and stakeholder priorities.",
      },
      {
        name: "Project Lifecycle Management",
        detail: "Overseeing initiatives from concept to execution, monitoring, and closure.",
      },
      {
        name: "Grant Management",
        detail: "Securing, allocating, and tracking funds efficiently to maximize program value.",
      },
      {
        name: "Budget Optimization",
        detail:
          "Maximizing impact while minimizing overhead costs through rigorous financial oversight.",
      },
      {
        name: "Cross-functional Leadership",
        detail:
          "Guiding multidisciplinary teams toward shared objectives in high-stakes environments.",
      },
      {
        name: "Consortium Coordination",
        detail: "Facilitating collaboration and alignment among diverse partners and stakeholders.",
      },
    ],
    desc: "Orchestrating complex, multi-agency programs with precision and strategic foresight.",
    color: "#c15c3d",
  },
  {
    category: "Advocacy & Human Rights",
    id: "advocacy",
    skills: [
      {
        name: "SRHR Advocacy",
        detail:
          "Championing sexual and reproductive health and rights at regional and national levels.",
      },
      {
        name: "Gender-Based Violence Case Management",
        detail: "Providing survivor-centered support, referral pathways, and systemic reform.",
      },
      {
        name: "Policy Formulation",
        detail: "Drafting evidence-based legislation, guidelines, and localized frameworks.",
      },
      {
        name: "Intersectional Vulnerability Analysis",
        detail: "Evaluating overlapping forms of discrimination and structural risks.",
      },
      {
        name: "Community Mobilization",
        detail: "Engaging grassroots groups for collective action and localized capacity building.",
      },
      {
        name: "Stakeholder Engagement",
        detail: "Building impactful coalitions with key decision-makers and policy leaders.",
      },
    ],
    desc: "Championing marginalized voices through systemic policy shifts and grassroots empowerment.",
    color: "#2b4c3f",
  },
  {
    category: "Capacity Building",
    id: "capacity-building",
    skills: [
      {
        name: "Curriculum Development",
        detail: "Designing tailored educational and training materials for diverse audiences.",
      },
      {
        name: "Training Facilitation",
        detail: "Delivering engaging workshops, seminars, and interactive learning sessions.",
      },
      {
        name: "Youth Empowerment",
        detail: "Creating platforms and targeted programs for youth leadership and skills growth.",
      },
      {
        name: "Standard Operating Procedures (SOPs)",
        detail: "Establishing clear protocols for operational excellence and consistency.",
      },
      {
        name: "Knowledge Transfer",
        detail: "Ensuring sustainable sharing of expertise across teams and partner organizations.",
      },
      {
        name: "Mentorship",
        detail: "Guiding emerging leaders and professionals through structured career development.",
      },
    ],
    desc: "Designing and delivering transformative educational modules tailored to diverse cultural contexts.",
    color: "#c94b32",
  },
  {
    category: "Monitoring & Evaluation",
    id: "monitoring-and-evaluation",
    skills: [
      {
        name: "Logical Frameworks",
        detail: "Structuring program objectives, inputs, and measurable outcomes.",
      },
      {
        name: "Data Quality Assurance",
        detail: "Maintaining rigorous standards for data collection, validation, and reporting.",
      },
      {
        name: "Indicator Tracking",
        detail: "Monitoring key metrics to continuously assess ongoing program performance.",
      },
      {
        name: "Outcome Evaluation",
        detail: "Analyzing long-term effects, sustainability, and overarching goal achievement.",
      },
      {
        name: "Impact Reporting",
        detail: "Communicating results effectively to donors, partners, and stakeholders.",
      },
      {
        name: "Quantitative & Qualitative Analysis",
        detail: "Combining statistical data with narrative insights for comprehensive evaluation.",
      },
    ],
    desc: "Ensuring accountability and maximizing impact through rigorous analytical frameworks.",
    color: "#4a4a4a",
  },
];

const languages = [
  { lang: "Amharic", level: "Native", code: "AM" },
  { lang: "English", level: "Advanced Professional", code: "EN" },
];

function SkillsPage() {
  return (
    <AwardWinningTransition type="glass-layers" className="">
      <SubpageMenuHeader
        title="Skills"
        items={skillCategories.map((cat) => ({ label: cat.category, href: `/skills/${cat.id}` }))}
      />
      <SkillsPageContent />
    </AwardWinningTransition>
  );
}

function SkillsPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
      gsap.from(".skill-hero-word", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        delay: 0.6,
        ease: "power4.out",
      });

      gsap.from(".skill-hero-image", {
        opacity: 0,
        scale: 0.95,
        duration: 1.4,
        delay: 0.8,
        ease: "power3.out",
      });

      // Sticky wrapper for categories
      const categories = gsap.utils.toArray(".skill-category-block") as HTMLElement[];
      categories.forEach((cat) => {
        const skills = gsap.utils.toArray(cat.querySelectorAll(".skill-item"));

        gsap.fromTo(
          skills,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.05,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cat,
              start: "top 70%",
            },
          },
        );

        gsap.fromTo(
          cat.querySelector(".cat-desc"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: cat,
              start: "top 70%",
            },
          },
        );
      });

      // Languages Animation
      gsap.fromTo(
        ".lang-block",
        { scale: 0.8, opacity: 0, rotationY: 45 },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          stagger: 0.2,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".languages-section",
            start: "top 70%",
          },
        },
      );

      // Marquee
      gsap.to(".skills-marquee-track", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".skills-marquee-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="bg-[#EBEBEB] text-[#111] dark:bg-[#08080a] dark:text-[#f3f4f6] font-sans overflow-x-hidden min-h-screen selection:bg-[#111] selection:text-[#EBEBEB] dark:selection:bg-white dark:selection:text-black transition-colors duration-300"
    >
      <nav className="fixed top-0 w-full p-8 flex justify-between z-50 mix-blend-difference text-white pointer-events-none">
        <Link
          to="/"
          className="group relative flex items-center justify-center w-12 h-12 bg-[#c15c3d]/20 backdrop-blur-xl border border-[#c15c3d]/40 text-[#c15c3d] overflow-hidden rounded-xl shadow-xl pointer-events-auto"
          aria-label="Back to home"
        >
          <div className="absolute inset-0 bg-[#c15c3d] translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
          <Undo2 className="w-5 h-5 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-0 group-hover:-rotate-180 group-hover:scale-0" />
          <span className="absolute z-10 font-mono text-[10px] text-[#EBEBEB] uppercase tracking-widest opacity-0 scale-50 -rotate-12 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0">
            Exit
          </span>
        </Link>
      </nav>

      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 relative overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Typography - Placed behind the resting figure */}
          <div className="relative z-10">
            <p className="font-mono text-xs uppercase tracking-widest mb-6 md:mb-12 opacity-60 skill-hero-word">
              Area of Expertise
            </p>
            <div className="overflow-hidden">
              <h1 className="text-[14vw] md:text-[11vw] leading-[0.82] font-display uppercase font-black tracking-tighter skill-hero-word pt-6 md:pt-[58px] mt-12 md:mt-[111px]">
                Core
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1
                className="text-[14vw] md:text-[11vw] leading-[0.82] font-display uppercase font-black tracking-tighter text-transparent skill-hero-word -mt-16 md:-mt-[141px] mb-[2px] pt-16 md:pt-[142px]"
                style={{ WebkitTextStroke: "1.5px #111" }}
              >
                Competencies
              </h1>
            </div>
          </div>

          {/* Resting Artwork - Rendered ON TOP of the text with responsive scaling and mobile alignment */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center -translate-y-8 sm:-translate-y-10 md:-translate-y-20 lg:-translate-y-28">
            <img
              src="/core_competencies_hero.png"
              alt="Core Competencies Visual"
              className="skill-hero-image w-full max-w-[92vw] sm:max-w-lg md:max-w-2xl lg:max-w-3xl h-auto object-contain select-none drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 border-t border-[#111]/20 dark:border-white/10 relative z-10 bg-[#EBEBEB] dark:bg-[#08080a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {skillCategories.map((cat, i) => (
            <div
              key={i}
              className="skill-category-block flex flex-col md:flex-row gap-12 md:gap-24 mb-32 relative"
            >
              <div className="md:w-1/3 md:sticky top-32 h-fit">
                <div className="font-mono text-xs uppercase tracking-widest mb-4 opacity-50">
                  0{i + 1} // {cat.category}
                </div>
                <h2
                  className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none mb-6"
                  style={{ color: cat.color }}
                >
                  {cat.category}
                </h2>
                <p className="cat-desc text-lg font-light opacity-80 leading-relaxed max-w-sm">
                  {cat.desc}
                </p>
              </div>
              <div className="md:w-2/3 flex flex-col gap-6">
                {cat.skills.map((skill, j) => (
                  <div
                    key={j}
                    className="skill-item text-2xl md:text-5xl font-display uppercase tracking-tight leading-none pb-6 border-b border-[#111]/10 dark:border-white/10 hover:text-[#c15c3d] md:hover:pl-8 transition-all duration-500 cursor-default"
                  >
                    {skill.name}
                  </div>
                ))}
                <div className="mt-8">
                  <Link
                    to={`/skills/${cat.id}`}
                    className="inline-block px-8 py-4 rounded-full border border-[#111] dark:border-white/40 font-mono text-xs uppercase tracking-widest hover:bg-[#111] hover:text-[#EBEBEB] dark:hover:bg-white dark:hover:text-[#111] transition-colors duration-500"
                  >
                    View Detailed Breakdown
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Distinct Languages Section */}
      <section
        className="languages-section py-32 px-6 md:px-12 bg-[#111] text-[#EBEBEB] border-t border-[#333] relative overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-[10vw] md:text-[6vw] font-display font-black uppercase tracking-tighter leading-none">
              Linguistics
            </h2>
            <p className="font-mono text-sm uppercase tracking-widest opacity-50 mt-6 max-w-xl mx-auto">
              Seamless cross-cultural communication and international delegation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {languages.map((l, i) => (
              <div
                key={i}
                className="lang-block bg-[#1a1a1a] rounded-[2rem] p-12 md:p-20 relative overflow-hidden group border border-white/5 hover:border-white/20 transition-colors duration-700"
              >
                <div className="absolute -bottom-10 -right-10 text-[15rem] leading-none font-display font-black opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  {l.code}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-12 font-mono text-sm">
                    0{i + 1}
                  </div>
                  <h3 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter mb-4 text-[#c15c3d] group-hover:text-white transition-colors duration-500">
                    {l.lang}
                  </h3>
                  <p className="text-xl font-light opacity-70 uppercase tracking-widest font-mono text-xs">
                    {l.level}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-marquee-section py-24 bg-[#c15c3d] text-[#111] overflow-hidden">
        <div className="skills-marquee-track whitespace-nowrap text-[6vw] font-black uppercase tracking-tighter leading-none">
          STRATEGY • EXECUTION • IMPACT • STRATEGY • EXECUTION • IMPACT • STRATEGY • EXECUTION •
          IMPACT •
        </div>
      </section>

      <section className="h-[60vh] flex flex-col items-center justify-center bg-[#EBEBEB] px-6 text-center border-t border-[#111]/20">
        <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-12">
          Let's build together
        </h2>
        <Link
          to="/contact"
          className="px-10 py-5 rounded-full border border-[#111] font-mono text-xs uppercase tracking-widest hover:bg-[#111] hover:text-[#EBEBEB] transition-colors duration-500"
        >
          Initiate Contact
        </Link>
      </section>
    </main>
  );
}
