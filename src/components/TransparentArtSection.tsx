import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function TransparentArtSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !imageWrapperRef.current) return;

      // Single continuous timeline: eliminates conflicting tweens and double-damping wobble.
      // scrub: true ensures 1:1 rock-solid sync with Lenis smooth scroll.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        imageWrapperRef.current,
        {
          y: 60,
          scale: 0.98,
        },
        {
          y: 0,
          scale: 1,
          ease: "none",
          duration: 0.45,
        },
      ).to(imageWrapperRef.current, {
        y: -220,
        scale: 0.94,
        ease: "none",
        duration: 0.55,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="art-sculpture-overlap"
      data-custom-scroll="true"
      className="relative w-full flex items-center justify-center select-none z-20 overflow-visible bg-transparent pointer-events-none pt-2 md:pt-4 pb-0 -mb-6 sm:-mb-10 md:-mb-14"
    >
      <div
        ref={imageWrapperRef}
        className="relative flex items-center justify-center max-w-5xl mx-auto px-4 sm:px-8 w-full will-change-transform [transform:translateZ(0)] [backface-visibility:hidden] pointer-events-auto"
      >
        <div className="relative flex items-center justify-center [transform:translateZ(0)]">
          <img
            src="/education_bg_art.png"
            alt="Education Background Sculpture"
            referrerPolicy="no-referrer"
            className="w-auto h-auto max-h-[75vh] md:max-h-[82vh] max-w-[90vw] md:max-w-[78vw] object-contain drop-shadow-[0_25px_65px_rgba(0,0,0,0.9)] filter select-none pointer-events-none opacity-100"
            loading="eager"
            decoding="async"
            style={{ opacity: 1 }}
          />
        </div>
      </div>
    </section>
  );
}
