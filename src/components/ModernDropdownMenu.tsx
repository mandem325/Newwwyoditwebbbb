import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

export interface SublinkItem {
  label: string;
  href: string;
  org?: string;
  year?: string;
  desc?: string;
  image?: string;
  badge?: string;
}

export interface DropdownSectionData {
  categoryTitle: string;
  column1: SublinkItem[];
  column2?: SublinkItem[];
  featured: {
    badge: string;
    title: string;
    subtitle: string;
    image: string;
    href: string;
  };
}

interface ModernDropdownMenuProps {
  activeLabel: string | null;
  data: Record<string, DropdownSectionData>;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const ModernDropdownMenu: React.FC<ModernDropdownMenuProps> = ({
  activeLabel,
  data,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const currentData = activeLabel ? data[activeLabel] : null;
  const [hoveredSublink, setHoveredSublink] = useState<SublinkItem | null>(null);

  // Reset hovered item whenever the active dropdown tab switches
  useEffect(() => {
    setHoveredSublink(null);
  }, [activeLabel]);

  // Compute active preview data: dynamically surfaces the hovered menu item's image & details
  const activeFeatured = hoveredSublink
    ? {
        badge:
          hoveredSublink.badge ||
          (hoveredSublink.year ? `ACCREDITED • ${hoveredSublink.year}` : "PREVIEW"),
        title: hoveredSublink.label,
        subtitle:
          hoveredSublink.org ||
          hoveredSublink.desc ||
          currentData?.featured.subtitle ||
          "",
        image: hoveredSublink.image || currentData?.featured.image || "",
        href: hoveredSublink.href,
      }
    : currentData?.featured;

  return (
    <AnimatePresence>
      {activeLabel && currentData && activeFeatured && (
        <motion.div
          key="exact-video-dropdown-wrapper"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 pointer-events-auto"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Invisible Bridge to guarantee hover continuity between nav and dropdown */}
          <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />

          {/* Morphing White Popover Card - Exact 1:1 Replica from Attached Video */}
          <motion.div
            layout
            data-lenis-prevent="true"
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 34,
            }}
            className="relative bg-white text-stone-900 rounded-[22px] border border-black/[0.08] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.22),0_8px_20px_-4px_rgba(0,0,0,0.06)] overflow-hidden"
            style={{
              width:
                activeLabel === "Certificates"
                  ? "700px"
                  : activeLabel === "Experience"
                    ? "660px"
                    : "560px",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLabel}
                initial={{ opacity: 0, x: -6, filter: "blur(3px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 6, filter: "blur(3px)" }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="p-7"
              >
                <div className="flex items-stretch justify-between gap-8">
                  {/* Left Column(s): Links identical to Rise at Seven video layout */}
                  <div
                    className="flex-1 flex flex-col justify-between"
                    onMouseLeave={() => setHoveredSublink(null)}
                  >
                    <div>
                      {/* Uppercase Category Header (Exact styling from video) */}
                      <span
                        className="text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#888888] select-none block mb-4"
                        style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                      >
                        {currentData.categoryTitle}
                      </span>

                      {/* Columns of clean text links without boxy borders */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                        {/* Column 1 */}
                        <div className="flex flex-col">
                          {currentData.column1.map((item) => {
                            const isItemHovered =
                              hoveredSublink?.label === item.label;
                            const isOtherHovered =
                              hoveredSublink !== null && !isItemHovered;

                            return (
                              <Link
                                key={item.label}
                                to={item.href}
                                onClick={onClose}
                                onMouseEnter={() => setHoveredSublink(item)}
                                className={`group/link py-1.5 transition-all duration-200 block text-left ${
                                  isItemHovered
                                    ? "translate-x-1"
                                    : isOtherHovered
                                      ? "opacity-55"
                                      : "opacity-100"
                                }`}
                              >
                                <span
                                  className={`text-[14.5px] font-bold leading-snug block transition-colors ${
                                    isItemHovered
                                      ? "text-[#c15c3d]"
                                      : "text-[#141414] group-hover/link:text-stone-500"
                                  }`}
                                  style={{
                                    fontFamily:
                                      "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
                                    letterSpacing: "-0.012em",
                                  }}
                                >
                                  {item.label}
                                </span>
                                {item.org && (
                                  <span className="text-[11px] font-medium text-[#888888] block mt-0.5 truncate">
                                    {item.org}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>

                        {/* Column 2 (if present) */}
                        {currentData.column2 && currentData.column2.length > 0 && (
                          <div className="flex flex-col">
                            {currentData.column2.map((item) => {
                              const isItemHovered =
                                hoveredSublink?.label === item.label;
                              const isOtherHovered =
                                hoveredSublink !== null && !isItemHovered;

                              return (
                                <Link
                                  key={item.label}
                                  to={item.href}
                                  onClick={onClose}
                                  onMouseEnter={() => setHoveredSublink(item)}
                                  className={`group/link py-1.5 transition-all duration-200 block text-left ${
                                    isItemHovered
                                      ? "translate-x-1"
                                      : isOtherHovered
                                        ? "opacity-55"
                                        : "opacity-100"
                                  }`}
                                >
                                  <span
                                    className={`text-[14.5px] font-bold leading-snug block transition-colors ${
                                      isItemHovered
                                        ? "text-[#c15c3d]"
                                        : "text-[#141414] group-hover/link:text-stone-500"
                                    }`}
                                    style={{
                                      fontFamily:
                                        "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
                                      letterSpacing: "-0.012em",
                                    }}
                                  >
                                    {item.label}
                                  </span>
                                  {item.org && (
                                    <span className="text-[11px] font-medium text-[#888888] block mt-0.5 truncate">
                                      {item.org}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Featured Visual Card with clean image display (no text on image) */}
                  <div className="w-[210px] md:w-[230px] shrink-0 flex flex-col">
                    <Link
                      to={activeFeatured.href}
                      onClick={onClose}
                      className="group/card relative rounded-2xl overflow-hidden bg-stone-100 border border-black/5 shadow-sm block h-full min-h-[195px] select-none cursor-pointer"
                    >
                      {/* Dynamic Photo Asset that smoothly transforms as cursor moves over each menu item */}
                      <div className="absolute inset-0 overflow-hidden">
                        <AnimatePresence mode="popLayout">
                          <motion.img
                            key={activeFeatured.image}
                            src={activeFeatured.image}
                            alt={activeFeatured.title}
                            referrerPolicy="no-referrer"
                            initial={{ opacity: 0, scale: 1.06 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-700 ease-out"
                          />
                        </AnimatePresence>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
