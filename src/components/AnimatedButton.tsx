import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  download?: boolean | string;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  download,
}: AnimatedButtonProps) {
  const reduce = useReducedMotion();

  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300 overflow-hidden";

  const variantClasses = {
    primary: "bg-[#ebd5c5] text-[#0b0806] font-semibold shadow-md",
    secondary: "bg-[#c15c3d] text-[#ebd5c5] font-semibold shadow-md",
    outline: "border border-[#ebd5c5]/30 text-[#ebd5c5] hover:border-[#ebd5c5]/80",
  };

  const isRouteLink = href && href.startsWith("/") && !download;

  const motionProps = reduce
    ? {}
    : {
        whileHover: {
          y: -3,
          scale: 1.025,
          boxShadow:
            variant === "outline"
              ? "0 10px 20px -10px rgba(235, 213, 197, 0.2)"
              : "0 15px 30px -10px rgba(193, 92, 61, 0.35)",
        },
        whileTap: { scale: 0.975, y: -1 },
      };

  const sharedClasses = `${baseClasses} ${variantClasses[variant]} ${className} group`;

  const InnerContent = () => (
    <>
      {/* Animated Gradient Sweep Overlay */}
      {!reduce && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#ebd5c5]/25 to-transparent -translate-x-full group-hover:animate-[marquee_2s_infinite] pointer-events-none" />
      )}

      {/* Animated Radial Soft Glow on primary/secondary button */}
      {!reduce && (variant === "primary" || variant === "secondary") && (
        <span className="absolute -inset-4 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  return (
    <motion.div {...motionProps} className="inline-block">
      {isRouteLink ? (
        <Link to={href} onClick={onClick} className={sharedClasses}>
          <InnerContent />
        </Link>
      ) : (
        <a href={href} onClick={onClick} download={download} className={sharedClasses}>
          <InnerContent />
        </a>
      )}
    </motion.div>
  );
}
