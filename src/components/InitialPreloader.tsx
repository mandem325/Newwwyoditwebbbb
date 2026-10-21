import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function InitialPreloader() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("preloader_run");
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasRun = sessionStorage.getItem("preloader_run");
    if (hasRun) {
      setShow(false);
      return;
    }
    sessionStorage.setItem("preloader_run", "true");

    const t = setTimeout(() => {
      setShow(false);
    }, 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999999] flex flex-col items-center justify-center bg-[#070709] text-[#ebd5c5] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%", rotate: 10 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="font-display text-6xl md:text-8xl lg:text-[10rem] tracking-tighter leading-none"
            >
              YODIT
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-[-10px] md:mt-[-20px]">
            <motion.h1
              initial={{ y: "100%", rotate: -10 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              className="font-display text-6xl md:text-8xl lg:text-[10rem] tracking-tighter italic leading-none text-transparent"
              style={{ WebkitTextStroke: "1px #ebd5c5" }}
            >
              DEJENE
            </motion.h1>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 1 }}
            className="w-48 md:w-64 h-px bg-[#ebd5c5]/50 mt-8 md:mt-12"
          />
          <div className="overflow-hidden mt-6">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.4 }}
              className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase"
            >
              Award Winning Portfolio
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
