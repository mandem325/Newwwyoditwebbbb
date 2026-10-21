import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const data = [
  {
    num: "NO. 1",
    title: "Grassroots Foundation",
    text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200",
    bg: "bg-[#e3d1ce]",
  },
  {
    num: "NO. 2",
    title: "Community Mobilization",
    text: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200",
    bg: "bg-[#c6d4d9]",
  },
  {
    num: "NO. 3",
    title: "Strategic Impact",
    text: "Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200",
    bg: "bg-[#e8cbb1]",
  },
  {
    num: "NO. 4",
    title: "Resilient Systems",
    text: "Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200",
    bg: "bg-[#d0dbd3]",
  },
  {
    num: "NO. 5",
    title: "Global Vision",
    text: "Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200",
    bg: "bg-[#cbe3e5]",
  },
];

export default function PinnedSplitMask() {
  const container = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const details = gsap.utils.toArray<HTMLElement>(".split-detail", container.current);
        const photos = gsap.utils.toArray<HTMLElement>(".split-photo", container.current);
        const photoImgs = gsap.utils.toArray<HTMLElement>(".split-photo-img", container.current);

        if (!details.length || !photos.length) return;

        // Set initial state: NO. 1 is fully visible, others slide up from below
        gsap.set(photos[0], { yPercent: 0, zIndex: 10 });
        gsap.set(photoImgs[0], { scale: 1, yPercent: 0 });

        for (let i = 1; i < photos.length; i++) {
          gsap.set(photos[i], {
            yPercent: 100,
            zIndex: 10 + i,
          });
          gsap.set(photoImgs[i], { scale: 1, yPercent: 0 });
        }

        // Use a single master timeline mapped to the whole container's scroll distance.
        // This completely eliminates trigger calculation bugs for NO.3, NO.4, and NO.5.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // Sequentially slide up each photo as we scroll through the 4 remaining sections
        for (let i = 1; i < photos.length; i++) {
          tl.to(
            photos[i],
            {
              yPercent: 0,
              ease: "none",
            },
            i - 1, // staggered start times: 0, 1, 2, 3
          );
        }

        // Force a recalculation just to be safe
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      });

      return () => mm.revert();
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative flex flex-col md:flex-row w-full bg-[#0b0806] items-start"
    >
      {/* Left Column (Scrolling Details) */}
      <div className="w-full md:w-1/2 flex flex-col relative z-10">
        {data.map((item, i) => (
          <div
            key={i}
            className={`split-detail min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 ${item.bg}`}
          >
            <span className="text-xs font-mono tracking-widest uppercase text-[#555] mb-2">
              {item.title}
            </span>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-playfair font-normal text-[#111] mb-6">
              {item.num}
            </h2>
            <div className="flex gap-4 md:gap-6 max-w-sm">
              <div className="w-8 md:w-12 h-[1px] bg-[#111] mt-2 md:mt-3 shrink-0" />
              <p className="text-sm md:text-base text-[#444] leading-relaxed">{item.text}</p>
            </div>

            {/* Mobile-only image preview */}
            <div className="md:hidden mt-8 w-full h-[40vh] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={item.img}
                alt={item.num}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Right Column (Sticky Pinned Photos with sliding reveal) */}
      <div
        ref={rightColRef}
        className="hidden md:block w-1/2 h-screen sticky top-0 overflow-hidden z-20 pointer-events-none self-start"
      >
        {data.map((item, i) => (
          <div key={i} className="split-photo absolute inset-0 w-full h-full will-change-transform">
            <img
              src={item.img}
              className="split-photo-img w-full h-full object-cover"
              alt={item.num}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
