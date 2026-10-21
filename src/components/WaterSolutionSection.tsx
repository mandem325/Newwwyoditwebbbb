import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WaterSolutionSection() {
  const container = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const sec2TextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 0 to 4: Curtain effect
      tl.to(textRef.current, { opacity: 1, ease: "none", duration: 0.5 }, 0);
      tl.to(
        { val: 15 },
        {
          val: 95,
          duration: 4,
          ease: "none",
          onUpdate: function () {
            if (numberRef.current) {
              numberRef.current.innerText = Math.round(this.targets()[0].val) + "%";
            }
          },
        },
        0,
      );
      tl.to(numberRef.current, { color: "#5b7a3a", duration: 4, ease: "none" }, 0);

      tl.to(
        imageWrapperRef.current,
        { clipPath: "inset(0% 0% 0% 50%)", ease: "none", duration: 1 },
        0,
      );
      tl.to(
        imageWrapperRef.current,
        { clipPath: "inset(50% 0% 0% 50%)", ease: "none", duration: 1 },
        1,
      );
      tl.to(
        imageWrapperRef.current,
        { clipPath: "inset(50% 0% 0% 75%)", ease: "none", duration: 1 },
        2,
      );
      tl.to(
        imageWrapperRef.current,
        { clipPath: "inset(50% 0% 25% 75%)", ease: "none", duration: 1 },
        3,
      );

      // Phase 2: Expand (4 to 5)
      tl.to(
        imageWrapperRef.current,
        { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 1 },
        4,
      );
      tl.to(textRef.current, { opacity: 0, ease: "none", duration: 0.5 }, 4);
      tl.fromTo(
        sec2TextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 1 },
        4,
      );

      // Phase 3: Hold the full image and text for the ENTIRE duration of the overlap
      // This ensures the Flourish image and text stay visible behind the mechanical section
      tl.to({}, { duration: 5.0 }, 5);
    },
    { scope: container },
  );

  return (
    <div ref={container} className="relative w-full h-[1000vh] bg-white ">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-white">
        {/* SEC 1 Text Layer */}
        <div className="absolute inset-0 flex items-center justify-start z-20 pointer-events-none">
          <div
            ref={textRef}
            className="w-full md:w-[50vw] pl-6 md:pl-[10vw] pr-8 flex flex-col justify-center opacity-0"
          >
            <p className="text-[#333] text-base md:text-lg font-medium mb-1">Our solutions use</p>
            <h2 className="leading-[0.9] tracking-tighter mb-6 flex flex-col">
              <span
                ref={numberRef}
                className="text-[#111] text-[20vw] md:text-[10vw] font-medium transition-colors"
              >
                15%
              </span>
              <span className="text-[#111] text-[12vw] md:text-[6vw] font-light">less water</span>
            </h2>
            <p className="text-[#666] text-sm md:text-base leading-relaxed max-w-sm pointer-events-auto">
              Over 600 gallons of water is wasted every minute by using outdated methods. Our
              improved technology reduce both water waste and land needed to grow.
            </p>
          </div>
        </div>

        {/* SEC 2 Text Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
          <div ref={sec2TextRef} className="flex flex-col items-center opacity-0">
            <h1 className="text-white text-[12vw] md:text-[8vw] font-display uppercase tracking-widest mix-blend-overlay drop-shadow-2xl">
              Flourish
            </h1>
            <p className="text-white/90 mt-4 text-xl md:text-2xl font-light mix-blend-overlay text-center px-4">
              Next generation sustainable growth.
            </p>
          </div>
        </div>

        {/* Image Layer (Curtain Masked) */}
        <div
          ref={imageWrapperRef}
          className="absolute inset-0 w-full h-full z-10 will-change-[clip-path,transform,filter]"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2560"
            alt="Agriculture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
