import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";

interface SublinkItem {
  label: string;
  href: string;
}

interface NavLinkItem {
  label: string;
  href: string;
  sublinks?: SublinkItem[];
}

interface AnodeMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  openContact: () => void;
  links: NavLinkItem[];
}

// Sophisticated fluid motion physics curves with seamless reveal & closing animation
const overlayVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    WebkitBackdropFilter: "blur(0px)",
    transition: {
      duration: 0.35,
      ease: [0.32, 0, 0.67, 0], // Smooth fast-out on exit
    },
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1], // Award-winning expo-out spring
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
    WebkitBackdropFilter: "blur(0px)",
    transition: {
      duration: 0.32,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.94,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -36,
    scale: 0.95,
    filter: "blur(6px)",
    transition: {
      duration: 0.3,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
      duration: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(3px)",
    transition: {
      duration: 0.2,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

export const AnodeMobileMenu: React.FC<AnodeMobileMenuProps> = ({
  isOpen,
  onClose,
  openContact,
  links,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll and pause smooth scroll while menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
      }
    };
  }, [isOpen]);

  // Split links into Column 1 and Column 2
  const col1Links = links.slice(0, 6);
  const col2Links = links.slice(6);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="anode-mobile-menu-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100] bg-black/80 flex flex-col p-3 sm:p-5 md:p-8 overflow-y-auto select-none"
        >
          {/* Main Card Unfolding Container with Fluid Physics */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            className="w-full max-w-5xl mx-auto my-auto bg-[#0c0d10] text-white rounded-[22px] md:rounded-[26px] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-6 sm:p-8 md:p-10 flex flex-col justify-between will-change-transform"
          >
            {/* Top Bar inside Menu: Logo on Left + Contact Pill & [X] Close on Right */}
            <motion.div
              variants={headerVariants}
              className="flex items-center justify-between pb-6 md:pb-8 border-b border-white/10"
            >
              {/* Brand Logo */}
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3 group"
              >
                <span className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center font-display italic text-base text-white group-hover:scale-105 transition-transform">
                  y
                </span>
                <div className="leading-tight text-left">
                  <div className="text-[11px] font-bold tracking-[0.2em] text-white font-mono uppercase">
                    YODIT
                  </div>
                </div>
              </Link>

              {/* Action Buttons: Contact Me Pill + Close Button with Rotation */}
              <div className="flex items-center gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    onClose();
                    openContact();
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#00e575] hover:bg-[#00c966] text-black text-xs font-bold tracking-wide transition-colors shadow-sm cursor-pointer"
                >
                  Contact me
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  aria-label="Close menu"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </motion.div>

            {/* Menu Body: 2-Column Responsive Layout with Staggered Kinetic Link Entrance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 pb-4">
              {/* Left Column 1: Primary Links with Staggered Cascading Reveal */}
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-stone-500 font-semibold mb-5 select-none">
                  MENU
                </span>
                <motion.div
                  variants={listContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-1.5"
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {col1Links.map((l) => {
                    const isHovered = hoveredItem === l.label;
                    const isOtherHovered =
                      hoveredItem !== null && hoveredItem !== l.label;

                    return (
                      <motion.div
                        key={l.label}
                        variants={itemVariants}
                        className="flex flex-col"
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            to={l.href}
                            onClick={onClose}
                            onMouseEnter={() => setHoveredItem(l.label)}
                            className={`group flex items-center gap-3 text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight py-1 transition-all duration-200 select-none ${
                              isHovered
                                ? "text-white translate-x-2 opacity-100"
                                : isOtherHovered
                                  ? "text-white/35 opacity-40"
                                  : "text-white opacity-100"
                            }`}
                            style={{
                              fontFamily:
                                "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
                            }}
                          >
                            <span>{l.label}</span>

                            {/* Superscript badge for items with counts */}
                            {l.sublinks && (
                              <span className="text-[11px] font-mono tracking-widest text-[#00e575] font-semibold">
                                [{String(l.sublinks.length).padStart(2, "0")}]
                              </span>
                            )}

                            {/* Arrow sliding in on hover */}
                            <motion.span
                              animate={{
                                opacity: isHovered ? 1 : 0,
                                x: isHovered ? 0 : -8,
                              }}
                              transition={{ duration: 0.18 }}
                              className="text-white text-lg font-light shrink-0"
                            >
                              →
                            </motion.span>
                          </Link>

                          {/* Expand chevron for categories with sublinks */}
                          {l.sublinks && (
                            <button
                              onClick={() =>
                                setExpandedCategory((prev) =>
                                  prev === l.label ? null : l.label
                                )
                              }
                              className="p-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                              aria-label={`Toggle ${l.label} options`}
                            >
                              <ChevronDown
                                size={18}
                                className={`transition-transform duration-200 ${
                                  expandedCategory === l.label
                                    ? "rotate-180 text-[#00e575]"
                                    : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Collapsible Sublinks if category is expanded */}
                        <AnimatePresence>
                          {l.sublinks && expandedCategory === l.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.25,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="flex flex-col gap-2 pl-4 py-2 mt-1 border-l border-white/10"
                            >
                              <Link
                                to={l.href}
                                onClick={onClose}
                                className="text-xs font-mono uppercase tracking-wider text-[#00e575] hover:underline"
                              >
                                View full {l.label.toLowerCase()} overview →
                              </Link>
                              {l.sublinks.map((sub) => (
                                <Link
                                  key={sub.label}
                                  to={sub.href}
                                  onClick={onClose}
                                  className="text-sm font-medium text-stone-300 hover:text-white transition-colors py-0.5 truncate"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Column 2: Secondary Links with Staggered Cascading Reveal */}
              <div className="flex flex-col md:pt-8">
                <motion.div
                  variants={listContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-1.5"
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {col2Links.map((l) => {
                    const isHovered = hoveredItem === l.label;
                    const isOtherHovered =
                      hoveredItem !== null && hoveredItem !== l.label;

                    return (
                      <motion.div key={l.label} variants={itemVariants}>
                        <Link
                          to={l.href}
                          onClick={onClose}
                          onMouseEnter={() => setHoveredItem(l.label)}
                          className={`group flex items-center gap-3 text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight py-1 transition-all duration-200 select-none ${
                            isHovered
                              ? "text-white translate-x-2 opacity-100"
                              : isOtherHovered
                                ? "text-white/35 opacity-40"
                                : "text-white opacity-100"
                          }`}
                          style={{
                            fontFamily:
                              "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
                          }}
                        >
                          <span>{l.label}</span>
                          {/* Arrow sliding in on hover */}
                          <motion.span
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              x: isHovered ? 0 : -8,
                            }}
                            transition={{ duration: 0.18 }}
                            className="text-white text-lg font-light shrink-0"
                          >
                            →
                          </motion.span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
