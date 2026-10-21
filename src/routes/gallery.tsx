import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AwardWinningTransition } from "../components/AwardWinningTransitions";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { ChevronsLeft } from "lucide-react";
import { SubpageMenuHeader } from "@/components/SubpageMenuHeader";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

const GALLERY_IMAGES = [
  {
    url: "/gallery/IMG_20260922_185844_168.jpg",
    title: "Community Assembly",
    subtitle: "Regional Dialogue, 2024",
    category: "Community",
  },
  {
    url: "/gallery/IMG_20260922_185846_438.jpg",
    title: "Leadership Forum",
    subtitle: "Stakeholder Engagement",
    category: "Leadership",
  },
  {
    url: "/gallery/IMG_20260922_185916_101.jpg",
    title: "Field Operations",
    subtitle: "Program Coordination",
    category: "Operations",
  },
  {
    url: "/gallery/IMG_20260922_185849_390.jpg",
    title: "Youth Mentorship",
    subtitle: "Capacity Building",
    category: "Mentorship",
  },
  {
    url: "/gallery/IMG_20260922_185937_614.jpg",
    title: "Strategic Session",
    subtitle: "Advisory & Governance",
    category: "Governance",
  },
  {
    url: "/gallery/IMG_20260922_185940_986.jpg",
    title: "Civic Advocacy",
    subtitle: "Public Parity",
    category: "Advocacy",
  },
  {
    url: "/gallery/IMG_20260922_185951_029.jpg",
    title: "Collaborative Workshop",
    subtitle: "Action Planning",
    category: "Workshops",
  },
  {
    url: "/gallery/IMG_20260922_185957_259.jpg",
    title: "Institutional Dialogue",
    subtitle: "Policy Reform",
    category: "Policy",
  },
  {
    url: "/gallery/IMG_20260922_190021_107.jpg",
    title: "Grassroots Assembly",
    subtitle: "Community Resilience",
    category: "Resilience",
  },
  {
    url: "/gallery/IMG_20260922_190021_344.jpg",
    title: "Empowerment Summit",
    subtitle: "Transformative Vision",
    category: "Impact",
  },
  {
    url: "/gallery/IMG_20260922_185957_399.jpg",
    title: "Field Reflections",
    subtitle: "Lasting Legacy",
    category: "Legacy",
  },
];

const S1_IMAGES = GALLERY_IMAGES;
const S2_IMAGES = GALLERY_IMAGES;
const S3_IMAGE = GALLERY_IMAGES[10];

const CHAPTER_2_SCENES = [
  {
    url: "/gallery/000IMG_20260922_185937_614.jpg",
    title: "Executive Counsel",
    description:
      "Steering evidence-based frameworks to ensure long-term program integrity and measurable outcomes.",
    category: "Governance",
    direction: "up",
    textPos: "left",
    anim: "upward",
  },
  {
    url: "/gallery/123IMG-20260802-WA0004.jpg",
    title: "Strategic Alliance",
    description:
      "Aligning institutional partners, policymakers, and civic visionaries toward systemic reform.",
    category: "Partnerships",
    direction: "right",
    textPos: "right",
    anim: "horizontal",
  },
  {
    url: "/gallery/222IMG_20260922_185916_033.jpg",
    title: "Field Deployment",
    description:
      "Leading regional deployment initiatives across peri-urban and rural education ecosystems.",
    category: "Fieldwork",
    direction: "expand",
    textPos: "left",
    anim: "scale",
  },
  {
    url: "/gallery/444IMG_20260922_190002_684.jpg",
    title: "Youth Empowerment",
    description:
      "Cultivating leadership, social-emotional resilience, and academic persistence among young women.",
    category: "Empowerment",
    direction: "left",
    textPos: "right",
    anim: "horizontal",
  },
  {
    url: "/gallery/56IMG_20260922_190007_832.jpg",
    title: "Policy Roundtable",
    description:
      "Fostering multi-sector dialogues that advance gender equality and adolescent health rights.",
    category: "Advocacy",
    direction: "down",
    textPos: "left",
    anim: "downward",
  },
  {
    url: "/gallery/665IMG_20260922_190007_888.jpg",
    title: "Institutional Milestone",
    description:
      "Championing educational equity, adolescent SRHR integration, and structural equality.",
    category: "Impact",
    direction: "diagonal",
    textPos: "right",
    anim: "diagonal",
  },
  {
    url: "/gallery/IMG_20260922_185951_029.jpg",
    title: "Collaborative Workshop",
    description:
      "Fostering interactive working sessions where participants translate strategic vision into community impact.",
    category: "Workshops",
    direction: "3d",
    textPos: "left",
    anim: "perspective",
  },
  {
    url: "/gallery/IMG_20260922_185957_259.jpg",
    title: "Institutional Dialogue",
    description:
      "Bridging grassroots realities with ministerial policy to unlock sustained educational opportunities.",
    category: "Policy",
    direction: "right",
    textPos: "right",
    anim: "horizontal",
  },
  {
    url: "/gallery/IMG_20260922_190021_107.jpg",
    title: "Grassroots Assembly",
    description:
      "Nurturing robust community support networks that withstand socio-economic challenges.",
    category: "Resilience",
    direction: "expand",
    textPos: "left",
    anim: "scale",
  },
  {
    url: "/gallery/IMG_20260922_190021_344.jpg",
    title: "Empowerment Summit",
    description:
      "Celebrating milestone achievements and defining the next horizon for youth-led progress.",
    category: "Impact",
    direction: "3d",
    textPos: "right",
    anim: "perspective",
  },
  {
    url: "/gallery/IMG_20260922_185957_399.jpg",
    title: "Field Reflections",
    description:
      "Reflecting on generational impact: knowledge transferred, barriers dismantled, futures illuminated.",
    category: "Legacy",
    direction: "expand-full",
    textPos: "left",
    anim: "fullscreen",
  },
];

const CHAPTER_3_TRACKS = [
  {
    speed: 0.35,
    dir: 1,
    items: [
      {
        url: GALLERY_IMAGES[0].url,
        type: "w-[50vw] md:w-[40vw] aspect-[16/9]",
      },
      {
        url: GALLERY_IMAGES[1].url,
        type: "w-[40vw] md:w-[30vw] aspect-[4/3]",
      },
      {
        url: GALLERY_IMAGES[2].url,
        type: "w-[60vw] md:w-[50vw] aspect-[21/9]",
      },
      {
        url: GALLERY_IMAGES[3].url,
        type: "w-[30vw] md:w-[25vw] aspect-square",
      },
      {
        url: GALLERY_IMAGES[4].url,
        type: "w-[45vw] md:w-[35vw] aspect-[16/9]",
      },
      {
        url: GALLERY_IMAGES[5].url,
        type: "w-[55vw] md:w-[45vw] aspect-[3/2]",
      },
      {
        url: GALLERY_IMAGES[6].url,
        type: "w-[40vw] md:w-[30vw] aspect-[4/5]",
      },
    ],
  },
  {
    speed: 0.75,
    dir: -1,
    items: [
      {
        url: GALLERY_IMAGES[3].url,
        type: "w-[35vw] md:w-[20vw] aspect-[3/4]",
      },
      {
        url: GALLERY_IMAGES[4].url,
        type: "w-[40vw] md:w-[25vw] aspect-[4/5]",
      },
      {
        url: GALLERY_IMAGES[7].url,
        type: "w-[45vw] md:w-[30vw] aspect-[3/2]",
      },
      {
        url: GALLERY_IMAGES[8].url,
        type: "w-[30vw] md:w-[15vw] aspect-[2/3]",
      },
      {
        url: GALLERY_IMAGES[9].url,
        type: "w-[40vw] md:w-[25vw] aspect-[4/5]",
      },
      {
        url: GALLERY_IMAGES[10].url,
        type: "w-[35vw] md:w-[22vw] aspect-square",
      },
      {
        url: GALLERY_IMAGES[2].url,
        type: "w-[45vw] md:w-[28vw] aspect-[3/4]",
      },
    ],
  },
  {
    speed: 0.5,
    dir: 1,
    items: [
      {
        url: GALLERY_IMAGES[5].url,
        type: "w-[40vw] md:w-[25vw] aspect-[4/3] -translate-y-12",
      },
      {
        url: GALLERY_IMAGES[6].url,
        type: "w-[30vw] md:w-[20vw] aspect-square translate-y-8",
      },
      {
        url: GALLERY_IMAGES[7].url,
        type: "w-[35vw] md:w-[22vw] aspect-[3/4] -translate-y-4",
      },
      {
        url: GALLERY_IMAGES[8].url,
        type: "w-[50vw] md:w-[35vw] aspect-[16/9] translate-y-12",
      },
      {
        url: GALLERY_IMAGES[9].url,
        type: "w-[45vw] md:w-[30vw] aspect-[4/3] -translate-y-8",
      },
      {
        url: GALLERY_IMAGES[10].url,
        type: "w-[38vw] md:w-[25vw] aspect-[3/2] translate-y-6",
      },
      {
        url: GALLERY_IMAGES[0].url,
        type: "w-[35vw] md:w-[20vw] aspect-square -translate-y-10",
      },
    ],
  },
  {
    speed: 0.25,
    dir: -1,
    items: [
      {
        url: GALLERY_IMAGES[1].url,
        type: "w-[20vw] md:w-[15vw] aspect-[4/3] opacity-60",
      },
      {
        url: GALLERY_IMAGES[2].url,
        type: "w-[15vw] md:w-[10vw] aspect-square opacity-60 -translate-y-20",
      },
      {
        url: GALLERY_IMAGES[3].url,
        type: "w-[25vw] md:w-[12vw] aspect-[3/4] opacity-60 translate-y-16",
      },
      {
        url: GALLERY_IMAGES[4].url,
        type: "w-[18vw] md:w-[14vw] aspect-[4/5] opacity-60 -translate-y-10",
      },
      {
        url: GALLERY_IMAGES[5].url,
        type: "w-[22vw] md:w-[16vw] aspect-[16/9] opacity-60 translate-y-12",
      },
      {
        url: GALLERY_IMAGES[6].url,
        type: "w-[15vw] md:w-[12vw] aspect-square opacity-60 -translate-y-15",
      },
      {
        url: GALLERY_IMAGES[7].url,
        type: "w-[28vw] md:w-[18vw] aspect-[3/2] opacity-60 translate-y-8",
      },
    ],
  },
];

function ParticleBackground() {
  const ref = useRef<THREE.Points>(null!);
  const count = 1000;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40;
      p[i * 3 + 1] = (Math.random() - 0.5) * 40;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

function TransitionBlock({ num: _num, title }: { num: string; title: string }) {
  return (
    <div className="transition-block relative w-full h-[50vh] flex flex-col items-center justify-center z-20">
      <div className="line-anim w-[1px] h-24 bg-gradient-to-b from-transparent to-white/50 origin-top scale-y-0" />
      <p className="text-anim my-8 font-mono text-xs tracking-[0.4em] uppercase text-white/70 opacity-0 translate-y-4 text-center px-4">
        {title}
      </p>
      <div className="line-anim-2 w-[1px] h-24 bg-gradient-to-t from-transparent to-white/50 origin-bottom scale-y-0" />
    </div>
  );
}

function GalleryPage() {
  return <GalleryContent />;
}

function GalleryContent() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeTitleRef = useRef<HTMLHeadingElement>(null);
  const activeSubRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  useGSAP(
    () => {
      // 1. Hero Animation
      const tlHero = gsap.timeline();
      tlHero
        .to(".hero-text span", {
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.6,
          stagger: 0.05,
        })
        .to(".hero-sub", { opacity: 1, duration: 1 }, "-=0.6");

      gsap.to(".hero-section", {
        opacity: 0,
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Transition Blocks
      const transitions = gsap.utils.toArray(".transition-block") as HTMLElement[];
      transitions.forEach((block) => {
        const l1 = block.querySelector(".line-anim");
        const t1 = block.querySelector(".text-anim");
        const l2 = block.querySelector(".line-anim-2");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        });
        tl.to(l1, { scaleY: 1, duration: 1 })
          .to(t1, { opacity: 1, y: 0, duration: 0.5 }, "-=0.5")
          .to(l2, { scaleY: 1, duration: 1 });
      });

      // 3. Coverflow
      const track = trackRef.current;
      if (track) {
        const cards = gsap.utils.toArray(".gallery-card") as HTMLElement[];
        const totalScroll = track.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".pin-wrapper",
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 4,
            invalidateOnRefresh: true,
            onUpdate: () => {
              let closestIndex = 0;
              let minDistance = Infinity;

              cards.forEach((card, i) => {
                const bounds = card.getBoundingClientRect();
                const cardCenter = bounds.left + bounds.width / 2;
                const screenCenter = window.innerWidth / 2;
                const distFromCenter = cardCenter - screenCenter;

                if (Math.abs(distFromCenter) < minDistance) {
                  minDistance = Math.abs(distFromCenter);
                  closestIndex = i;
                }

                const normalized = distFromCenter / (window.innerWidth / 1.5);
                const rotationY = normalized * 50;
                const z = -Math.abs(normalized) * 500;
                const scale = Math.max(0.6, 1 - Math.abs(normalized) * 0.2);
                const opacity = Math.max(0.1, 1 - Math.abs(normalized) * 0.7);

                gsap.set(card, { rotationY, z, scale, opacity });
              });

              // Performant DOM update without React state rerenders
              if (activeTitleRef.current && activeSubRef.current) {
                const currentTitle = S1_IMAGES[closestIndex]?.title;
                if (currentTitle && activeTitleRef.current.innerText !== currentTitle) {
                  activeTitleRef.current.innerText = currentTitle;
                  activeSubRef.current.innerText = `${String(closestIndex + 1).padStart(2, "0")} — ${S1_IMAGES[closestIndex].subtitle}`;

                  gsap.fromTo(
                    [activeTitleRef.current, activeSubRef.current],
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
                  );
                }
              }
            },
          },
        });

        // Step 1: Scroll horizontally
        tl.to(track, {
          x: () => -totalScroll,
          ease: "none",
          duration: 1,
        });

        // Step 2: Expansion transition during the final part of horizontal scroll
        tl.to(
          ".pin-wrapper",
          {
            scale: 4,
            opacity: 0,
            filter: "blur(20px)",
            ease: "power3.in",
            duration: 0.2,
          },
          0.8,
        );
      }

      // 4. Cinematic Chapter 02
      const ch2Wrapper = document.querySelector(".ch2-wrapper") as HTMLElement;
      if (ch2Wrapper) {
        const ch2Tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".ch2-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        let currentTime = 0;
        const enterDur = 2;
        const activeDur = 1.5;
        const exitDur = 2;
        const overlap = 1.5;

        // Initial setup to ensure GSAP fully controls visibility and opacity
        CHAPTER_2_SCENES.forEach((scene, i) => {
          const sceneEl = `.ch2-scene-${i}`;
          ch2Tl.set(sceneEl, { autoAlpha: 0 }, 0);
        });

        CHAPTER_2_SCENES.forEach((scene, i) => {
          const isLast = i === CHAPTER_2_SCENES.length - 1;
          const sceneEl = `.ch2-scene-${i}`;
          const textEl = `.ch2-scene-${i} .ch2-text`;
          const imgEl = `.ch2-scene-${i} .ch2-img-container`;
          const titleEl = `.ch2-scene-${i} .ch2-title`;
          const descEl = `.ch2-scene-${i} .ch2-desc`;
          const metaEl = `.ch2-scene-${i} .ch2-meta`;

          let startProps: unknown = {};
          let exitProps: unknown = {};

          switch (scene.anim) {
            case "upward":
              startProps = { y: "40vh" };
              exitProps = { y: "-40vh" };
              break;
            case "horizontal": {
              const dir = scene.direction === "right" ? -1 : 1;
              startProps = { x: `${dir * 40}vw` };
              exitProps = { x: `${-dir * 40}vw` };
              break;
            }
            case "scale":
              startProps = { scale: 0.8 };
              exitProps = { scale: 1.2 };
              break;
            case "downward":
              startProps = { y: "-40vh" };
              exitProps = { y: "40vh" };
              break;
            case "diagonal":
              startProps = { x: "40vw", y: "-40vh" };
              exitProps = { x: "-40vw", y: "40vh" };
              break;
            case "perspective":
              startProps = { z: -800, rotationY: 15 };
              exitProps = { z: 500, rotationY: -15 };
              break;
            case "fullscreen":
              startProps = { scale: 0.8, y: "20vh" };
              exitProps = { scale: 1.1, y: "-20vh" };
              break;
          }

          // 1. Scene Entrance (Container + Image move mostly together)
          ch2Tl.fromTo(
            sceneEl,
            { ...startProps, autoAlpha: 0 },
            {
              x: 0,
              y: 0,
              scale: 1,
              z: 0,
              rotationY: 0,
              autoAlpha: 1,
              duration: enterDur,
              ease: "power2.inOut",
            },
            currentTime,
          );

          // Subtle internal stagger for text
          ch2Tl.fromTo(
            metaEl,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: enterDur * 0.8, ease: "power2.out" },
            currentTime + 0.2,
          );
          ch2Tl.fromTo(
            titleEl,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: enterDur * 0.8, ease: "power2.out" },
            currentTime + 0.3,
          );
          ch2Tl.fromTo(
            descEl,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: enterDur * 0.8, ease: "power2.out" },
            currentTime + 0.4,
          );

          // 2. Active Phase (Slow drift to feel alive)
          ch2Tl.to(
            sceneEl,
            {
              scale: scene.anim === "scale" || scene.anim === "fullscreen" ? 1.05 : 1.02,
              duration: activeDur,
              ease: "none",
            },
            currentTime + enterDur,
          );

          // 3. Scene Exit
          if (!isLast) {
            ch2Tl.to(
              sceneEl,
              { ...exitProps, autoAlpha: 0, duration: exitDur, ease: "power2.inOut" },
              currentTime + enterDur + activeDur,
            );
          } else {
            ch2Tl.to(
              sceneEl,
              {
                autoAlpha: 0,
                y: "-20vh",
                duration: exitDur,
                ease: "power2.inOut",
              },
              currentTime + enterDur + activeDur,
            );
          }

          currentTime += enterDur + activeDur + exitDur - overlap;
        });
      }

      // 5. Cinematic Chapter 03
      const ch3Wrapper = document.querySelector(".ch3-wrapper") as HTMLElement;
      if (ch3Wrapper) {
        const ch3Tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".ch3-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        CHAPTER_3_TRACKS.forEach((track, i) => {
          const trackEl = `.ch3-track-${i}`;
          const moveAmount = 100 * track.speed * track.dir; // vw to move

          ch3Tl.fromTo(
            trackEl,
            { x: `${-moveAmount}vw` },
            { x: `${moveAmount}vw`, ease: "none", duration: 1 },
            0,
          );

          // Internal parallax for the images in the track
          const imgs = document.querySelectorAll(`.ch3-track-${i} .ch3-img`);
          imgs.forEach((img) => {
            ch3Tl.fromTo(
              img,
              { xPercent: -15 * track.dir, scale: 1.1 },
              { xPercent: 15 * track.dir, scale: 1.1, ease: "none", duration: 1 },
              0,
            );
          });
        });
      }

      // 6. Finale (Chapter 04)
      gsap.fromTo(
        ".finale-img-container",
        { scale: 0.6, borderRadius: "20vw", filter: "grayscale(100%)" },
        {
          scale: 1,
          borderRadius: "0vw",
          filter: "grayscale(0%)",
          ease: "none",
          scrollTrigger: {
            trigger: ".finale-section",
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        ".finale-text span",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".finale-section",
            start: "top center",
            end: "center center",
            scrub: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <AwardWinningTransition
      type="curtain"
      className="relative bg-transparent text-white font-sans overflow-x-clip selection:bg-white/20"
      ref={containerRef}
    >
      <SubpageMenuHeader
        title="Gallery"
        items={[
          { label: "The Collection", href: "/gallery" },
          { label: "Perspectives", href: "/gallery" },
          { label: "Cinematic Scenes", href: "/gallery" },
          { label: "Epilogue", href: "/gallery" },
        ]}
      />
      {/* Background Layer - Spans entire page */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
        {hasWebGL && (
          <Canvas
            camera={{ position: [0, 0, 10], fov: 60 }}
            gl={{
              alpha: true,
              antialias: false,
              powerPreference: "low-power",
              failIfMajorPerformanceCaveat: true,
            }}
          >
            <ParticleBackground />
          </Canvas>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-8 flex items-center justify-between z-50 mix-blend-difference pointer-events-none">
        <Link
          to="/"
          className="group relative flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 shadow-xl pointer-events-auto"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          aria-label="Back to home"
        >
          <ChevronsLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        </Link>
      </nav>

      {/* SECTION 1: PROLOGUE */}
      <section className="hero-section relative h-screen w-full flex flex-col items-center justify-center z-10 overflow-hidden">
        {/* Horizontal Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 scale-105"
            src="/uni__agency_1790035402415.mp4"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
        </div>

        <h1 className="hero-text relative z-10 flex text-6xl md:text-[8rem] lg:text-[10rem] font-display font-light uppercase tracking-tighter leading-none overflow-hidden mix-blend-difference drop-shadow-2xl">
          <span className="inline-block translate-y-full">E</span>
          <span className="inline-block translate-y-full">x</span>
          <span className="inline-block translate-y-full">h</span>
          <span className="inline-block translate-y-full">i</span>
          <span className="inline-block translate-y-full">b</span>
          <span className="inline-block translate-y-full">i</span>
          <span className="inline-block translate-y-full">t</span>
          <span className="inline-block translate-y-full">i</span>
          <span className="inline-block translate-y-full">o</span>
          <span className="inline-block translate-y-full">n</span>
        </h1>
        <p className="hero-sub relative z-10 mt-8 font-mono text-sm md:text-base tracking-[0.4em] uppercase text-white/70 opacity-0 mix-blend-difference">
          A Four-Part Journey
        </p>
      </section>

      <TransitionBlock num="Chapter 01" title="The Collection" />

      {/* SECTION 2: COVERFLOW */}
      <section className="relative w-full z-10">
        <div
          className="pin-wrapper h-screen w-full flex flex-col justify-center overflow-hidden relative"
          style={{ perspective: "1500px" }}
        >
          <div className="absolute bottom-12 left-8 md:left-12 z-40 pointer-events-none mix-blend-difference">
            <h2
              ref={activeTitleRef}
              className="text-4xl md:text-7xl font-display font-light uppercase tracking-tighter mb-2"
            >
              {S1_IMAGES[0].title}
            </h2>
            <p
              ref={activeSubRef}
              className="font-mono text-xs tracking-[0.2em] uppercase text-white/50"
            >
              01 — {S1_IMAGES[0].subtitle}
            </p>
          </div>

          <div
            ref={trackRef}
            className="flex items-center gap-8 md:gap-16 w-max h-full"
            style={{ transformStyle: "preserve-3d", padding: "0 50vw" }}
          >
            {S1_IMAGES.map((img, i) => (
              <div
                key={i}
                className="gallery-card relative w-[300px] md:w-[45vw] md:max-w-[500px] aspect-[4/5] flex-shrink-0"
                style={{ transformOrigin: "center center" }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                />
                <div
                  className="absolute top-full left-0 w-full h-1/2 pointer-events-none mt-2 opacity-30"
                  style={{
                    backgroundImage: `url(${img.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    transform: "scaleY(-1)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="post-coverflow-content w-full relative z-20">
        <TransitionBlock num="Chapter 02" title="Perspectives" />

        {/* SECTION 3: CINEMATIC SCENES (Chapter 02) */}
        <section
          className="ch2-wrapper relative w-full z-10"
          style={{ height: `${CHAPTER_2_SCENES.length * 200}vh` }}
        >
          <div
            className="ch2-pin h-screen w-full sticky top-0 overflow-hidden flex items-center justify-center"
            style={{ perspective: "2000px" }}
          >
            {CHAPTER_2_SCENES.map((scene, i) => (
              <div
                key={i}
                className={`ch2-scene ch2-scene-${i} absolute inset-0 w-full h-full flex opacity-0 items-center justify-center p-6 md:p-16`}
              >
                <div
                  className={`flex flex-col-reverse ${scene.textPos === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-center gap-8 md:gap-24 w-full max-w-7xl h-full`}
                >
                  <div
                    className="ch2-text flex-1 flex flex-col justify-center max-w-md w-full relative z-10"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="ch2-meta font-mono text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(CHAPTER_2_SCENES.length).padStart(2, "0")} — {scene.category}
                    </div>
                    <h3 className="ch2-title font-display text-4xl md:text-6xl uppercase tracking-tighter mb-4">
                      {scene.title}
                    </h3>
                    <p className="ch2-desc font-sans text-sm md:text-base text-white/70 leading-relaxed">
                      {scene.description}
                    </p>
                  </div>
                  <div
                    className="ch2-img-container flex-1 relative aspect-[4/5] md:aspect-[3/4] w-full max-w-[500px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden z-0"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <img
                      src={scene.url}
                      className="ch2-img w-full h-full object-cover origin-center"
                      alt={scene.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <TransitionBlock num="Chapter 03" title="Different Directions" />

        {/* SECTION 4: MULTI-DIRECTIONAL GALLERY (Chapter 03) */}
        <section
          className="ch3-wrapper relative w-full z-10 bg-[#050505]"
          style={{ height: "600vh" }}
        >
          <div className="h-screen w-full sticky top-0 overflow-hidden flex flex-col justify-center gap-10 md:gap-16 pb-20 pt-20">
            {/* Minimal Editorial Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center mix-blend-difference pointer-events-none">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
                03 / 04
              </div>
              <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-4 text-white">
                Different
                <br />
                Directions
              </h2>
              <p className="font-sans text-sm md:text-base text-white/70 max-w-sm mx-auto leading-relaxed">
                A collection moving beyond one perspective.
              </p>
            </div>

            {CHAPTER_3_TRACKS.map((track, i) => (
              <div
                key={i}
                className={`ch3-track ch3-track-${i} flex items-center justify-center gap-6 md:gap-12 w-max mx-auto`}
              >
                {track.items.map((item, j) => (
                  <div
                    key={j}
                    className={`relative overflow-hidden group rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex-shrink-0 ${item.type}`}
                  >
                    <img
                      src={item.url}
                      className="ch3-img w-full h-full object-cover origin-center transition-transform duration-700 ease-out group-hover:scale-105"
                      alt="Gallery"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <TransitionBlock num="Chapter 04" title="Finale" />

        {/* SECTION 5: FINALE */}
        <section className="finale-section relative h-[150vh] w-full z-10">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden p-4 md:p-8">
            <div className="finale-img-container w-full h-full overflow-hidden relative">
              <img src={S3_IMAGE.url} alt="Finale" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="finale-text flex text-6xl md:text-[10rem] font-display font-light uppercase tracking-tighter text-white overflow-hidden mix-blend-difference">
                  <span className="inline-block">T</span>
                  <span className="inline-block">h</span>
                  <span className="inline-block">e</span>
                  <span className="inline-block mr-4 md:mr-8"></span>
                  <span className="inline-block">E</span>
                  <span className="inline-block">n</span>
                  <span className="inline-block">d</span>
                </h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AwardWinningTransition>
  );
}
