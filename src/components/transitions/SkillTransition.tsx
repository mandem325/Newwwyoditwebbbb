import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "@tanstack/react-router";

export function SkillTransition({ categoryId }: { categoryId: string }) {
  const [isActive, setIsActive] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const isClosingRef = useRef(false);
  const targetHrefRef = useRef<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setIsActive(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleCloseComplete = useCallback(() => {
    if (targetHrefRef.current) {
      const dest = targetHrefRef.current;
      targetHrefRef.current = null;
      try {
        (router.navigate as (opts: { to: string }) => Promise<void>)({ to: dest });
      } catch {
        window.location.href = dest;
      }
    }
  }, [router]);

  const startCloseTransition = useCallback(
    (href: string) => {
      if (isClosingRef.current) return;
      isClosingRef.current = true;
      targetHrefRef.current = href;
      setIsClosing(true);

      setTimeout(() => {
        handleCloseComplete();
      }, 950);
    },
    [handleCloseComplete],
  );

  useEffect(() => {
    const handleCaptureClick = (e: MouseEvent) => {
      if (isClosingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      if (
        link.target === "_blank" ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.endsWith(".pdf") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const currentPath = window.location.pathname;
      const cleanHref = href.split("?")[0].split("#")[0];
      const cleanCurrent = currentPath.split("?")[0].split("#")[0];

      if (
        cleanHref === cleanCurrent ||
        cleanHref === cleanCurrent + "/" ||
        cleanHref + "/" === cleanCurrent
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      startCloseTransition(href);
    };

    window.addEventListener("click", handleCaptureClick, true);
    return () => {
      window.removeEventListener("click", handleCaptureClick, true);
    };
  }, [startCloseTransition]);

  // Hash string to simple number for variation
  const hash = categoryId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variant = hash % 3;

  // Closing Overlay (Exact reverse, no text)
  if (isClosing) {
    if (variant === 0) {
      const rows = 6;
      const cols = 6;
      const blocks = Array.from({ length: rows * cols });
      return (
        <div className="fixed inset-0 z-[99999] pointer-events-auto flex flex-wrap">
          {blocks.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1],
                delay: (cols - 1 - (i % cols) + (rows - 1 - Math.floor(i / cols))) * 0.03,
              }}
              style={{ width: `${100 / cols}%`, height: `${100 / rows}%` }}
              className="bg-[#020202] border-[0.5px] border-[#1a1a1a]"
              onAnimationComplete={i === 0 ? handleCloseComplete : undefined}
            />
          ))}
        </div>
      );
    }

    if (variant === 1) {
      return (
        <div className="fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center overflow-hidden bg-transparent">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-[#020202]"
            onAnimationComplete={handleCloseComplete}
          />
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-[99999] pointer-events-auto flex flex-col">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 }}
            className="flex-1 bg-[#020202] border-b border-[#1a1a1a]"
            onAnimationComplete={i === 7 ? handleCloseComplete : undefined}
          />
        ))}
      </div>
    );
  }

  // Opening Overlay
  if (!isActive) return null;

  if (variant === 0) {
    const rows = 6;
    const cols = 6;
    const blocks = Array.from({ length: rows * cols });
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-wrap">
        {blocks.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1 + ((i % cols) + Math.floor(i / cols)) * 0.05,
            }}
            style={{ width: `${100 / cols}%`, height: `${100 / rows}%` }}
            className="bg-[#020202] border-[0.5px] border-[#1a1a1a]"
          />
        ))}
      </div>
    );
  }

  if (variant === 1) {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-transparent" />
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 1, borderWidth: "100vh" }}
            animate={{ scale: 3, opacity: 0, borderWidth: "0vh" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.15 }}
            className="absolute rounded-full border-[#020202]"
            style={{ width: "100vw", height: "100vw" }}
          />
        ))}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute inset-0 bg-[#020202]"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: i * 0.06 }}
          className="flex-1 bg-[#020202] border-b border-[#1a1a1a]"
        />
      ))}
    </div>
  );
}
