import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "@tanstack/react-router";

export function ExpTransition({ index }: { index: number }) {
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

  const variant = index % 3;

  // Closing overlay (in reverse, no text)
  if (isClosing) {
    if (variant === 0) {
      return (
        <div className="fixed inset-0 z-[99999] pointer-events-auto flex">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: i * 0.08 }}
              className="flex-1 bg-[#020202] origin-bottom border-r border-[#1a1a1a]"
              onAnimationComplete={i === 4 ? handleCloseComplete : undefined}
            />
          ))}
        </div>
      );
    }

    if (variant === 1) {
      return (
        <div className="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden">
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#020202]"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#020202]"
            onAnimationComplete={handleCloseComplete}
          />
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center bg-transparent">
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-[#020202]"
          onAnimationComplete={handleCloseComplete}
        />
      </div>
    );
  }

  // Opening overlay
  if (!isActive) return null;

  if (variant === 0) {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none flex">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: i * 0.08 }}
            className="flex-1 bg-[#020202] origin-bottom border-r border-[#1a1a1a]"
          />
        ))}
      </div>
    );
  }

  if (variant === 1) {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 right-0 h-1/2 bg-[#020202]"
        />
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#020202]"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-transparent">
      <motion.div
        initial={{ clipPath: "circle(150% at 50% 50%)" }}
        animate={{ clipPath: "circle(0% at 50% 50%)" }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 bg-[#020202]"
      />
    </div>
  );
}
