import React from "react";
import {
  User,
  GraduationCap,
  Award,
  Briefcase,
  Sparkles,
  Layers,
  Globe,
  Megaphone,
  BookOpen,
  Image as ImageIcon,
  Phone,
  Quote,
  Palette,
  Crown,
  Users,
  Cpu,
  MessageSquare,
  ShieldCheck,
  Building,
  FileBadge,
  Sparkle,
} from "lucide-react";

/**
 * Returns a fitting contextual icon for each main menu item.
 */
export function NavMenuItemIcon({
  label,
  isHovered,
  className = "w-3 h-3 xl:w-3.5 xl:h-3.5",
}: {
  label: string;
  isHovered?: boolean;
  className?: string;
}) {
  const iconProps = {
    className: `transition-all duration-300 ease-out will-change-transform ${
      isHovered
        ? "text-[#F0DEBE] scale-110 drop-shadow-[0_0_8px_rgba(240,222,190,0.7)]"
        : "text-[#D0C7B9]/70"
    } ${className}`,
    strokeWidth: isHovered ? 2.2 : 1.8,
  };

  const renderIcon = () => {
    switch (label.toLowerCase()) {
      case "about":
        return <User {...iconProps} />;
      case "education":
        return <GraduationCap {...iconProps} />;
      case "certificates":
      case "certificate":
        return <Award {...iconProps} />;
      case "experience":
        return <Briefcase {...iconProps} />;
      case "skills":
      case "skill":
        return <Sparkles {...iconProps} />;
      case "projects":
        return <Layers {...iconProps} />;
      case "impact":
        return <Globe {...iconProps} />;
      case "advocacy":
        return <Megaphone {...iconProps} />;
      case "publications":
        return <BookOpen {...iconProps} />;
      case "gallery":
        return <ImageIcon {...iconProps} />;
      case "contact":
        return <Phone {...iconProps} />;
      case "references":
        return <Quote {...iconProps} />;
      default:
        return <Sparkle {...iconProps} />;
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
        isHovered
          ? "max-w-[20px] opacity-100 scale-100 translate-x-0 mr-1.5"
          : "max-w-0 opacity-0 scale-50 -translate-x-1.5 mr-0 pointer-events-none"
      }`}
      aria-hidden="true"
    >
      {renderIcon()}
    </span>
  );
}

/**
 * Returns a contextual icon for dropdown sub-items.
 */
export function DropdownItemIcon({
  text,
  className = "w-3.5 h-3.5",
}: {
  text: string;
  className?: string;
}) {
  const lower = text.toLowerCase();
  const iconProps = {
    className: `transition-colors duration-300 ${className}`,
    strokeWidth: 1.8,
  };

  if (lower.includes("leadership") || lower.includes("team") || lower.includes("community")) {
    return <Users {...iconProps} />;
  }
  if (
    lower.includes("technical") ||
    lower.includes("system") ||
    lower.includes("data") ||
    lower.includes("code")
  ) {
    return <Cpu {...iconProps} />;
  }
  if (
    lower.includes("communication") ||
    lower.includes("advocacy") ||
    lower.includes("speaking") ||
    lower.includes("media")
  ) {
    return <MessageSquare {...iconProps} />;
  }
  if (
    lower.includes("safeguard") ||
    lower.includes("protection") ||
    lower.includes("psea") ||
    lower.includes("unhcr") ||
    lower.includes("humanitarian")
  ) {
    return <ShieldCheck {...iconProps} />;
  }
  if (
    lower.includes("manager") ||
    lower.includes("coordinator") ||
    lower.includes("officer") ||
    lower.includes("director") ||
    lower.includes("specialist")
  ) {
    return <Briefcase {...iconProps} />;
  }
  if (
    lower.includes("certificate") ||
    lower.includes("certified") ||
    lower.includes("diploma") ||
    lower.includes("credential") ||
    lower.includes("course")
  ) {
    return <FileBadge {...iconProps} />;
  }
  if (lower.includes("organization") || lower.includes("institute") || lower.includes("un")) {
    return <Building {...iconProps} />;
  }

  return <Award {...iconProps} />;
}

interface DropdownItemHoverTextProps {
  text: string;
  isHovered?: boolean;
}

/**
 * Award-winning typography for dropdown menu items using Degular & Plus Jakarta Sans
 * with optical kerning, crisp contrast, and subtle interactive directional drift.
 */
export function DropdownItemHoverText({ text }: DropdownItemHoverTextProps) {
  return (
    <div className="w-full flex items-center justify-between gap-3 select-none">
      <span
        className="text-[13px] sm:text-[13.5px] font-medium tracking-[-0.015em] leading-snug text-stone-800 group-hover/link:text-white transition-all duration-200 block antialiased group-hover/link:translate-x-1"
        style={{
          fontFamily:
            '"Degular", "Plus Jakarta Sans", "Outfit", system-ui, -apple-system, sans-serif',
          fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
        }}
      >
        {text}
      </span>
      <span
        className="opacity-0 -translate-x-1.5 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-stone-400 group-hover/link:text-[#E2CDA4] text-xs font-mono shrink-0 select-none"
        aria-hidden="true"
      >
        →
      </span>
    </div>
  );
}

interface MainMenuItemTextProps {
  label: string;
  isHovered: boolean;
}

/**
 * Distinct award-winning hover animations for each main menu item with
 * individual character animation, signature transitions, and luxury Champagne Silk typography.
 */
export function MainMenuItemText({ label, isHovered }: MainMenuItemTextProps) {
  const chars = label.split("");

  const renderContent = () => {
    switch (label.toLowerCase()) {
      // 1. ABOUT: Kinetic Dual-Layer Character Roll with Champagne Silk Radiance
      case "about":
        return (
          <span className="relative inline-flex items-center overflow-hidden h-[18px] select-none">
            <span className="inline-flex items-center">
              {chars.map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform text-[#D0C7B9]"
                  style={{
                    transform: isHovered ? "translateY(-100%)" : "translateY(0%)",
                    transitionDelay: `${i * 25}ms`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="absolute inset-0 inline-flex items-center">
              {chars.map((char, i) => (
                <span
                  key={i}
                  className="inline-block text-[#F6ECD9] font-semibold transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform drop-shadow-[0_0_10px_rgba(246,236,217,0.7)]"
                  style={{
                    transform: isHovered ? "translateY(0%)" : "translateY(100%)",
                    transitionDelay: `${i * 25}ms`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </span>
        );

      // 2. EDUCATION: 3D Perspective Flip on X-Axis with Champagne Gold Glow
      case "education":
        return (
          <span
            className="inline-flex items-center perspective-[600px] select-none"
            style={{ perspective: "600px" }}
          >
            {chars.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform text-[#D0C7B9]"
                style={{
                  transform: isHovered ? "rotateX(360deg) translateY(-2px)" : "rotateX(0deg)",
                  color: isHovered ? "#F6ECD9" : undefined,
                  textShadow: isHovered ? "0 0 10px rgba(246,236,217,0.8)" : "none",
                  transitionDelay: `${i * 30}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );

      // 3. CERTIFICATES: Dual-Layer Masked Kinetic Character Roll with Gold Glow
      case "certificates":
      case "certificate":
        return (
          <span className="relative inline-flex items-center overflow-hidden h-[18px] select-none">
            <span className="inline-flex items-center">
              {chars.map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform text-[#D0C7B9]"
                  style={{
                    transform: isHovered ? "translateY(-100%)" : "translateY(0%)",
                    transitionDelay: `${i * 18}ms`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="absolute inset-0 inline-flex items-center">
              {chars.map((char, i) => (
                <span
                  key={i}
                  className="inline-block text-[#F6ECD9] font-medium transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform drop-shadow-[0_0_10px_rgba(246,236,217,0.7)]"
                  style={{
                    transform: isHovered ? "translateY(0%)" : "translateY(100%)",
                    transitionDelay: `${i * 18}ms`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </span>
        );

      // 4. EXPERIENCE: Kinetic Spring Jump with Champagne Aura
      case "experience":
        return (
          <span className="inline-flex items-center select-none">
            {chars.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] will-change-transform text-[#D0C7B9]"
                style={{
                  transform: isHovered
                    ? "translateY(-3px) scale(1.12)"
                    : "translateY(0px) scale(1)",
                  color: isHovered ? "#FFFBF2" : undefined,
                  textShadow: isHovered ? "0 2px 12px rgba(240,222,190,0.7)" : "none",
                  transitionDelay: `${i * 22}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );

      // 5. SKILLS: Silky Magnetic Wave Float & Luminous Gold Bloom
      case "skills":
      case "skill":
        return (
          <span className="inline-flex items-center select-none">
            {chars.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform text-[#D0C7B9]"
                style={{
                  transform: isHovered
                    ? "translateY(-3px) scale(1.12)"
                    : "translateY(0px) scale(1)",
                  color: isHovered ? "#F0DEBE" : undefined,
                  textShadow: isHovered
                    ? "0 0 10px rgba(240,222,190,0.85), 0 0 16px rgba(246,236,217,0.5)"
                    : "none",
                  transitionDelay: `${i * 24}ms`,
                  marginRight: isHovered ? "0.5px" : "0px",
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );

      // 6. PROJECTS: Elastic Squash & Stretch with Vivid Champagne Shift
      case "projects":
        return (
          <span className="inline-flex items-center select-none">
            {chars.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform text-[#D0C7B9]"
                style={{
                  transform: isHovered
                    ? "scaleY(1.25) scaleX(0.92) translateY(-2px)"
                    : "scaleY(1) scaleX(1) translateY(0)",
                  color: isHovered ? "#FFFBF2" : undefined,
                  textShadow: isHovered ? "0 0 12px rgba(255,251,242,0.85)" : "none",
                  transitionDelay: `${i * 25}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );

      // 7. IMPACT: Radiant Flare & Champagne Silk Contrast
      case "impact":
        return (
          <span
            className="inline-block transition-all duration-300 ease-out select-none will-change-transform text-[#D0C7B9]"
            style={{
              transform: isHovered ? "scale(1.1) translateY(-1px)" : "scale(1) translateY(0)",
              color: isHovered ? "#FFFBF2" : undefined,
              letterSpacing: isHovered ? "0.06em" : "normal",
              textShadow: isHovered ? "0 0 16px rgba(246,236,217,0.85)" : "none",
            }}
          >
            {label}
          </span>
        );

      // 8. ADVOCACY: Elegant Italic Skew & Pure Champagne Drift
      case "advocacy":
        return (
          <span className="inline-flex items-center select-none">
            {chars.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform text-[#D0C7B9]"
                style={{
                  transform: isHovered
                    ? `skewX(-14deg) translateY(-2px) translateX(${i * 0.5}px)`
                    : "skewX(0deg) translateY(0px)",
                  color: isHovered ? "#F6ECD9" : undefined,
                  fontStyle: isHovered ? "italic" : "normal",
                  textShadow: isHovered ? "0 0 8px rgba(246,236,217,0.6)" : "none",
                  transitionDelay: `${i * 20}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );

      // 9. PUBLICATIONS: Domino Angular Tilt with Champagne Gold Glow
      case "publications":
        return (
          <span className="inline-flex items-center select-none">
            {chars.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform text-[#D0C7B9]"
                style={{
                  transform: isHovered ? "scale(1.15) rotate(-3deg)" : "scale(1) rotate(0deg)",
                  color: isHovered ? "#F0DEBE" : undefined,
                  textShadow: isHovered ? "0 0 10px rgba(240,222,190,0.7)" : "none",
                  transitionDelay: `${i * 18}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );

      // 10. GALLERY: Champagne Silk Radiance & Float
      case "gallery":
        return (
          <span
            className="inline-block transition-all duration-300 select-none will-change-transform text-[#D0C7B9]"
            style={{
              transform: isHovered ? "scale(1.08) translateY(-1.5px)" : "scale(1)",
              color: isHovered ? "#FFFBF2" : undefined,
              textShadow: isHovered ? "0 0 12px rgba(246, 236, 217, 0.75)" : "none",
            }}
          >
            {label}
          </span>
        );

      // 11. CONTACT: Magnetic Spring Glide & Champagne Sparkle
      case "contact":
        return (
          <span
            className="inline-flex items-center gap-1 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] select-none will-change-transform text-[#D0C7B9]"
            style={{
              transform: isHovered ? "translateX(2px) scale(1.06)" : "translateX(0) scale(1)",
              color: isHovered ? "#FFFBF2" : undefined,
              textShadow: isHovered ? "0 0 12px rgba(246,236,217,0.8)" : "none",
            }}
          >
            <span>{label}</span>
            <span
              className="inline-block text-[10px] text-[#F0DEBE] transition-transform duration-300"
              style={{
                transform: isHovered ? "rotate(45deg) scale(1.2)" : "rotate(0deg) scale(0)",
                opacity: isHovered ? 1 : 0,
              }}
            >
              ✦
            </span>
          </span>
        );

      // 12. REFERENCES: Domino Staggered Rotational Tilt with Pearl Glow
      case "references":
        return (
          <span className="inline-flex items-center select-none">
            {chars.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform text-[#D0C7B9]"
                style={{
                  transform: isHovered
                    ? `rotate(${i % 2 === 0 ? "-6deg" : "6deg"}) translateY(-2px)`
                    : "rotate(0deg) translateY(0)",
                  color: isHovered ? "#F6ECD9" : undefined,
                  textShadow: isHovered ? "0 0 8px rgba(246,236,217,0.6)" : "none",
                  transitionDelay: `${i * 18}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );

      // Default fallback
      default:
        return (
          <span className="inline-flex items-center select-none">
            {chars.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-300 ease-out will-change-transform text-[#D0C7B9]"
                style={{
                  transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                  color: isHovered ? "#F6ECD9" : undefined,
                  textShadow: isHovered ? "0 0 8px rgba(246,236,217,0.7)" : "none",
                  transitionDelay: `${i * 20}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );
    }
  };

  return (
    <span className="relative inline-flex flex-col items-center justify-center select-none py-0.5">
      {renderContent()}
      {/* Dynamic Underline on cursor hover */}
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#E2CDA4] via-[#FFFBF2] to-[#C8AF7E] rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-center pointer-events-none shadow-[0_0_8px_rgba(226,205,164,0.6)]"
        style={{
          transform: isHovered ? "scaleX(1)" : "scaleX(0)",
          opacity: isHovered ? 1 : 0,
        }}
      />
    </span>
  );
}
