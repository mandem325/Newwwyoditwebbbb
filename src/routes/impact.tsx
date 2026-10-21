import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { ArrowBigLeft } from "lucide-react";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import { SubpageMenuHeader } from "@/components/SubpageMenuHeader";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/impact")({
  component: ImpactPage,
});

function ImpactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
      // 0. Hero Text Entrance Reveal
      gsap.from(".hero-text h1, .hero-text p", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        delay: 0.6,
        ease: "power4.out",
      });

      // 1. Hero Text Parallax
      gsap.fromTo(
        ".hero-text",
        { yPercent: 0, opacity: 1 },
        {
          yPercent: 40,
          opacity: 0,
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // 2. Video Scale Down
      gsap.fromTo(
        ".hero-video",
        { scale: 1, borderRadius: "0rem" },
        {
          scale: 0.85,
          borderRadius: "2rem",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // 3. Stacking Cards Pinning & Animation (Desktop only - mobile uses native smooth CSS sticky stacking)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray(".stack-card") as HTMLElement[];
        const stackContainer = document.querySelector(".stack-container");

        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: `top top+=${70 + i * 25}`, // Stack them slightly offset vertically
            endTrigger: stackContainer,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
          });

          // Create the scale down animation when subsequent cards overlap
          if (i < cards.length - 1) {
            gsap.to(card, {
              scale: 0.94 - (cards.length - 2 - i) * 0.03,
              opacity: 0.65,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top bottom",
                end: `top top+=${70 + (i + 1) * 25}`,
                scrub: true,
              },
            });
          }
        });
      });

      // 4. Bento Grid Reveal Animation
      gsap.from(".bento-card", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-card",
          start: "top 85%",
        },
      });

      // 5. Massive Typography Parallax Section & Text Reveal
      gsap.fromTo(
        ".parallax-bg-img",
        { scale: 1 },
        {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: ".parallax-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        ".v-sec-text span",
        {
          y: 60,
          opacity: 0,
          rotate: 6,
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".parallax-section",
            start: "top 80%",
            end: "center 45%",
            scrub: 1,
          },
        },
      );

      // 8. Award Section 2: 3D Rotate
      gsap.from(".award-3d-card", {
        rotateX: 45,
        y: 60,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".award-sec-2",
          start: "top 90%",
          end: "top 45%",
          scrub: 1,
        },
      });

      // 9. Massive Text Scroll
      gsap.to(".massive-text-1", {
        xPercent: -50,
        scrollTrigger: {
          trigger: ".massive-text-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".massive-text-2", {
        xPercent: 20,
        scrollTrigger: {
          trigger: ".massive-text-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <AwardWinningTransition type="cinematic-pan">
      <div className="relative bg-[#08080a] text-white overflow-x-hidden" ref={containerRef}>
        <SubpageMenuHeader
          title="Impact"
          items={[
            { label: "Community Scale", href: "/impact" },
            { label: "Institutional Governance", href: "/impact" },
            { label: "Measurable Reach", href: "/impact" },
          ]}
        />
        <nav className="fixed top-0 w-full p-8 flex items-center justify-between z-50 mix-blend-difference text-white pointer-events-none">
          <Link
            to="/"
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-[#c15c3d] hover:text-white transition-all duration-300 shadow-xl pointer-events-auto"
            aria-label="Back to home"
          >
            <ArrowBigLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="hero-section relative h-screen">
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="hero-video absolute inset-0 w-full h-full object-cover opacity-60 scale-105 pointer-events-none"
              src="/Kkseniiya_1790035893460.mp4"
            />
            <div className="hero-text relative z-10 text-center text-[#f4f4f0] px-4">
              <h1 className="text-[12vw] md:text-[10vw] font-anton uppercase leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                Measurable <br /> Impact
              </h1>
              <p className="mt-8 font-inter text-xl md:text-2xl font-light text-white/70 max-w-2xl mx-auto">
                Measurable impact across communities. Scroll to discover the statistics behind the
                strategy.
              </p>
            </div>
          </div>
        </section>

        {/* Stacking Cards Section */}
        <section className="stack-container relative pt-8 md:pt-14 pb-[40vh] md:pb-[50vh] px-4 md:px-10 max-w-[1200px] mx-auto min-h-0">
          {/* Card 1 */}
          <div
            style={{ top: "70px" }}
            className="stack-card sticky md:relative z-10 w-full min-h-[480px] md:h-[70vh] bg-[#141416] text-[#f4f4f0] rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl mb-8 md:mb-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 origin-top overflow-hidden border border-white/10"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="text-5xl sm:text-7xl md:text-9xl font-anton text-[#c15c3d] mb-2 sm:mb-4">40%</div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-anton uppercase tracking-tighter mb-2 sm:mb-4">
                Reduction in Early Pregnancies
              </h2>
              <p className="font-inter text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
                Through comprehensive SRHR education integration in regional schools across 3
                districts.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
                alt="Students in classroom"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{ top: "95px" }}
            className="stack-card sticky md:relative z-20 w-full min-h-[480px] md:h-[70vh] bg-[#c15c3d] text-[#f4f4f0] rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl mb-8 md:mb-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 origin-top overflow-hidden border border-white/10"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="text-5xl sm:text-7xl md:text-9xl font-anton text-[#1a1a1a] mb-2 sm:mb-4">5,000+</div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-anton uppercase tracking-tighter mb-2 sm:mb-4 text-[#1a1a1a]">
                Women Empowered
              </h2>
              <p className="font-inter text-sm sm:text-base md:text-lg text-white/95 leading-relaxed">
                Via newly established micro-finance networks, giving rural women the capital to
                start their own local businesses.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full rounded-2xl overflow-hidden shrink-0 border border-black/10 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80"
                alt="Women Empowered"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{ top: "120px" }}
            className="stack-card sticky md:relative z-30 w-full min-h-[480px] md:h-[70vh] bg-[#1a1a1e] text-[#f4f4f0] rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl mb-8 md:mb-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 origin-top border border-white/10 overflow-hidden"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="text-5xl sm:text-7xl md:text-9xl font-anton text-[#c15c3d] mb-2 sm:mb-4">20K</div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-anton uppercase tracking-tighter mb-2 sm:mb-4 text-white">
                Refugees Supported
              </h2>
              <p className="font-inter text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
                Overseeing camp management and ensuring sanitary, safe, and empowering environments
                for displaced populations.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
                alt="Refugee Community Support"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Interactive Bento Grid Section */}
        <section className="relative py-20 md:py-28 px-4 md:px-10 max-w-[1200px] mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-anton uppercase tracking-tighter text-white mb-4">
              Global Footprint
            </h2>
            <p className="text-xl text-white/60 max-w-2xl font-inter">
              Our initiatives span across multiple continents, bringing sustainable development and
              educational reform to the communities that need it most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Card 1 */}
            <div className="bento-card relative md:col-span-2 rounded-[2rem] overflow-hidden group border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
                alt="Community"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-5xl font-anton text-[#c15c3d] mb-2">12+</div>
                <h3 className="text-2xl font-anton uppercase text-[#f4f4f0]">Nations Reached</h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bento-card relative bg-[#141416] rounded-[2rem] p-8 flex flex-col justify-end text-[#f4f4f0] overflow-hidden group border border-white/10">
              <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:rotate-12 transition-transform duration-500">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="text-5xl font-anton text-[#c15c3d] mb-2">$5M+</div>
              <h3 className="text-2xl font-anton uppercase">Capital Deployed</h3>
            </div>

            {/* Card 3 */}
            <div className="bento-card relative bg-[#c15c3d] rounded-[2rem] p-8 flex flex-col justify-end text-white overflow-hidden group border border-white/10">
              <div className="text-5xl font-anton text-[#1a1a1a] mb-2">100K</div>
              <h3 className="text-2xl font-anton uppercase text-[#1a1a1a]">Lives Impacted</h3>
            </div>

            {/* Card 4 */}
            <div className="bento-card relative md:col-span-2 rounded-[2rem] overflow-hidden group border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80"
                alt="Education"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-5xl font-anton text-[#c15c3d] mb-2">300+</div>
                <h3 className="text-2xl font-anton uppercase text-[#f4f4f0]">Schools Built</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Massive Typography Parallax Section - Full Screen Image Coverage */}
        <section className="parallax-section relative min-h-[70vh] md:min-h-[80vh] w-full overflow-hidden flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=2400&q=85"
            alt="People"
            className="parallax-bg-img absolute inset-0 w-full h-full min-w-full min-h-full object-cover object-center will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 flex items-center justify-center pointer-events-none py-16 px-4">
            <h2 className="v-sec-text text-5xl md:text-8xl font-anton uppercase text-[#f4f4f0] text-center max-w-6xl leading-[1.1] overflow-hidden drop-shadow-2xl">
              <span className="inline-block mr-4 md:mr-6">WE</span>
              <span className="inline-block mr-4 md:mr-6 text-[#c15c3d]">DO</span>
              <span className="inline-block mr-4 md:mr-6">NOT</span>
              <span className="inline-block mr-4 md:mr-6">JUST</span>
              <span className="inline-block mr-4 md:mr-6">ADAPT.</span>
              <br className="hidden md:block" />
              <span className="inline-block mr-4 md:mr-6 mt-4 md:mt-0">WE</span>
              <span className="inline-block mr-4 md:mr-6 text-[#c15c3d]">LEAD</span>
              <span className="inline-block mr-4 md:mr-6">THE</span>
              <span className="inline-block mr-4 md:mr-6">CHANGE.</span>
            </h2>
          </div>
        </section>

        {/* Award Winning 3D Cards Section */}
        <section className="award-sec-2 relative w-full bg-[#1a1a1a] pt-6 pb-8 md:pt-10 md:pb-12 px-4 md:px-10 flex items-center justify-center">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 perspective-[1000px]">
            <div className="award-3d-card bg-[#2a2a2a] p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col justify-between min-h-[300px] md:min-h-[340px]">
              <div className="text-[#c15c3d] text-5xl md:text-6xl font-anton">01</div>
              <div>
                <h3 className="text-xl md:text-2xl text-white font-anton uppercase mb-3">
                  SRHR & Youth Empowerment
                </h3>
                <p className="text-white/60 font-inter text-sm md:text-base leading-relaxed">
                  Leading comprehensive education integration and establishing governance frameworks
                  for adolescent youth programs across multiple districts.
                </p>
              </div>
            </div>

            <div className="award-3d-card bg-[#2a2a2a] p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col justify-between min-h-[300px] md:min-h-[340px]">
              <div className="text-[#c15c3d] text-5xl md:text-6xl font-anton">02</div>
              <div>
                <h3 className="text-xl md:text-2xl text-white font-anton uppercase mb-3">
                  Protection & Safeguarding
                </h3>
                <p className="text-white/60 font-inter text-sm md:text-base leading-relaxed">
                  Enforcing strict PSEA protocols and delivering trauma-informed GBV case management
                  within complex humanitarian contexts.
                </p>
              </div>
            </div>

            <div className="award-3d-card bg-[#2a2a2a] p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col justify-between min-h-[300px] md:min-h-[340px]">
              <div className="text-[#c15c3d] text-5xl md:text-6xl font-anton">03</div>
              <div>
                <h3 className="text-xl md:text-2xl text-white font-anton uppercase mb-3">Capacity Building</h3>
                <p className="text-white/60 font-inter text-sm md:text-base leading-relaxed">
                  Designing and delivering targeted training modules to enhance community
                  participation, foster social cohesion, and ensure sustainable livelihoods.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Massive Scroll Text */}
        <section className="massive-text-container py-6 md:py-10 flex flex-col justify-center overflow-hidden bg-[#1a1a1a] text-[#f4f4f0]">
          <div className="massive-text-1 whitespace-nowrap text-[15vw] font-anton uppercase leading-none tracking-tighter text-[#c15c3d]">
            EMPOWER EDUCATE ELEVATE EMPOWER EDUCATE ELEVATE
          </div>
          <div
            className="massive-text-2 whitespace-nowrap text-[15vw] font-anton uppercase leading-none tracking-tighter text-transparent"
            style={{ WebkitTextStroke: "2px #f4f4f0", transform: "translateX(-40%)" }}
          >
            CHANGE THE WORLD CHANGE THE WORLD CHANGE THE WORLD
          </div>
        </section>

        {/* Next page link */}
        <section className="py-24 flex items-center justify-center bg-[#1a1a1a] border-t border-white/10">
          <Link
            to="/projects"
            className="group relative inline-flex items-center gap-6 text-3xl md:text-5xl font-anton uppercase tracking-tighter text-white hover:text-[#c15c3d] transition-colors"
          >
            View Projects
            <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:bg-[#c15c3d] group-hover:rotate-45 group-hover:scale-110 transition-all duration-500">
              ↗
            </span>
          </Link>
        </section>
      </div>
    </AwardWinningTransition>
  );
}
