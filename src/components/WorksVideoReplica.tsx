import React from "react";
import { motion } from "framer-motion";

export function WorksVideoReplica() {
  return (
    <div
      id="works-video-replica"
      className="w-full bg-[#f4f4f5] text-[#1a1a1a] overflow-hidden relative pt-[36px] md:pt-[52px] pb-0 -mt-[36px] md:-mt-[52px] -mb-2 md:-mb-4 z-10"
    >
      {/* Marquee Section */}
      <div className="pt-0 pb-1 overflow-hidden whitespace-nowrap">
        <div className="inline-flex items-center animate-custom-marquee w-max">
          {/* We duplicate the content block to make it loop seamlessly */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-4">
              <motion.span
                initial={{ opacity: 0, y: 30, letterSpacing: "-0.08em" }}
                whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.05em" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-sans font-medium text-[#1a1a1a] leading-none"
              >
                Yodit Dejene —
              </motion.span>
              <motion.span
                data-butterfly-perch="true"
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-script text-[9rem] md:text-[14rem] lg:text-[17rem] leading-none text-[#1a1a1a] -mt-1 md:-mt-2 select-none inline-block"
              >
                Works
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="font-sans text-xl md:text-3xl font-semibold -mt-12 md:-mt-18 ml-2 tracking-tighter inline-block text-ochre"
              >
                (01)
              </motion.span>
              <img
                data-butterfly-perch="true"
                src={i % 2 === 0 ? "/marquee-art-1.png" : "/marquee-art-2.png"}
                alt="Pensatori Irrazionali artwork"
                className="w-auto h-[170px] md:h-[230px] object-contain mx-6 select-none pointer-events-auto cursor-pointer"
              />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-sans font-medium tracking-tighter text-[#1a1a1a] leading-none inline-block"
              >
                By
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
