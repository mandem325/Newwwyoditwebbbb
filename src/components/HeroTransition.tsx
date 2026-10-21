import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroTransition() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.refresh();

      gsap.fromTo(
        ".ht-line",
        { width: "0%" },
        {
          width: "100%",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".ht-text-1",
        { x: "-10vw", opacity: 0 },
        {
          x: "0vw",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 90%",
            end: "center center",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".ht-text-2",
        { x: "10vw", opacity: 0 },
        {
          x: "0vw",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 90%",
            end: "center center",
            scrub: 1,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative w-full h-[40vh] md:h-[50vh] bg-[#0b0806] flex flex-col items-center justify-center overflow-hidden z-20 pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0806] via-[#0b0806] to-[#0b0806] z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center">
        <h2 className="ht-text-1 text-[8vw] md:text-[5vw] font-playfair italic text-[#c15c3d] font-light leading-none w-full text-left md:pl-[10%]">
          Explore the
        </h2>
        <div className="w-full h-[1px] bg-[#ebd5c5]/10 my-4 md:my-6 relative">
          <div className="ht-line absolute top-0 left-0 h-full bg-[#ebd5c5]/60 origin-left" />
        </div>
        <h2 className="ht-text-2 text-[8vw] md:text-[5vw] font-display font-black text-[#ebd5c5] uppercase tracking-tighter leading-none w-full text-right md:pr-[10%]">
          Visual Archive
        </h2>
      </div>
    </div>
  );
}
