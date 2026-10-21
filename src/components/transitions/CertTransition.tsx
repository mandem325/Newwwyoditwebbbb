import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "@tanstack/react-router";

export function CertTransition({ index }: { index: number }) {
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

  const variant = index % 7;

  // Closing Overlay (Exact reverse, no text)
  if (isClosing) {
    if (variant === 0) {
      const colors = ["#020202", "#2a2a2a", "#1a1a1a"];
      return (
        <div className="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden">
          {colors.map((color, i) => (
            <motion.div
              key={i}
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 }}
              className="absolute inset-0"
              style={{ backgroundColor: color }}
              onAnimationComplete={i === 2 ? handleCloseComplete : undefined}
            />
          ))}
        </div>
      );
    }

    if (variant === 1) {
      return (
        <div className="fixed inset-0 z-[99999] pointer-events-auto flex flex-col">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.07 }}
              className="flex-1 bg-[#020202] origin-top border-b border-[#1a1a1a]"
              onAnimationComplete={i === 5 ? handleCloseComplete : undefined}
            />
          ))}
        </div>
      );
    }

    if (variant === 2) {
      return (
        <div className="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#020202]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#020202]"
            onAnimationComplete={handleCloseComplete}
          />
        </div>
      );
    }

    if (variant === 3) {
      return (
        <div className="fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center">
          <motion.div
            initial={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-[#020202]"
            onAnimationComplete={handleCloseComplete}
          />
        </div>
      );
    }

    if (variant === 4) {
      const tiles = Array.from({ length: 9 });
      const delayOrder = [4, 5, 6, 3, 8, 7, 2, 1, 0];
      return (
        <div className="fixed inset-0 z-[99999] pointer-events-auto grid grid-cols-3 grid-rows-3">
          {tiles.map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: delayOrder[i] * 0.08 }}
              className="bg-[#020202]"
              onAnimationComplete={i === 0 ? handleCloseComplete : undefined}
            />
          ))}
        </div>
      );
    }

    if (variant === 5) {
      return (
        <div className="fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center overflow-hidden bg-transparent">
          <motion.div
            initial={{ scale: 5, rotate: 45, opacity: 0 }}
            animate={{ scale: 0.9, rotate: 45, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bg-[#020202] w-[150vw] h-[150vw]"
            onAnimationComplete={handleCloseComplete}
          />
        </div>
      );
    }

    // Variant 6
    return (
      <div className="fixed inset-0 z-[99999] pointer-events-auto flex">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: i % 2 === 0 ? "-100%" : "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: i * 0.04 }}
            className="flex-1 bg-[#020202] border-r border-[#1a1a1a]"
            onAnimationComplete={i === 9 ? handleCloseComplete : undefined}
          />
        ))}
      </div>
    );
  }

  // Opening Overlay
  if (!isActive) return null;

  if (variant === 0) {
    const colors = ["#1a1a1a", "#2a2a2a", "#020202"];
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
        {colors.map((color, i) => (
          <motion.div
            key={i}
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: i * 0.15 }}
            className="absolute inset-0"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    );
  }

  if (variant === 1) {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: i * 0.08 }}
            className="flex-1 bg-[#020202] origin-top border-b border-[#1a1a1a]"
          />
        ))}
      </div>
    );
  }

  if (variant === 2) {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#020202]"
        />
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#020202]"
        />
      </div>
    );
  }

  if (variant === 3) {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          animate={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-[#020202]"
        />
      </div>
    );
  }

  if (variant === 4) {
    const tiles = Array.from({ length: 9 });
    const delayOrder = [0, 1, 2, 7, 8, 3, 6, 5, 4];
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none grid grid-cols-3 grid-rows-3">
        {tiles.map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: delayOrder[i] * 0.1 }}
            className="bg-[#020202]"
          />
        ))}
      </div>
    );
  }

  if (variant === 5) {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden bg-transparent">
        <motion.div
          initial={{ scale: 0, rotate: 45, opacity: 1 }}
          animate={{ scale: 5, rotate: 45, opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bg-[#020202] w-[100vw] h-[100vw]"
        />
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute inset-0 bg-[#020202]"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: i % 2 === 0 ? "-100%" : "100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 }}
          className="flex-1 bg-[#020202] border-r border-[#1a1a1a]"
        />
      ))}
    </div>
  );
}
