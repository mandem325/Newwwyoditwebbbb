import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect, Suspense, useLayoutEffect } from "react";
import { AudioPlayer } from "../components/AudioPlayer";
import {
  Award,
  Upload,
  Image,
  Trash2,
  Plus,
  X,
  Check,
  Video,
  Film,
  Download,
  ArrowRight,
  ChevronDown,
  Phone,
  Mail,
  Menu,
} from "lucide-react";
import Lenis from "lenis";

declare global {
  interface Window {
    lenis: Lenis;
  }
}
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { FlyingButterfliesOverlay } from "@/components/FlyingButterfliesOverlay";
import AnimatedNumber from "@/components/AnimatedNumber";
import ExperienceCoverflow from "@/components/ExperienceCoverflow";
import CustomCursor from "@/components/CustomCursor";
import PremiumBackground3D from "@/components/PremiumBackground3D";
import InteractiveCard from "@/components/InteractiveCard";
import CardGradients from "@/components/CardGradients";
import AnimatedImage from "@/components/AnimatedImage";
import AnimatedButton from "@/components/AnimatedButton";
import AnimatedHeading from "@/components/AnimatedHeading";
import { TitleTextAnimation } from "@/components/TitleTextAnimation";
import {
  DropdownItemHoverText,
  MainMenuItemText,
  NavMenuItemIcon,
} from "@/components/AwardWinningNavText";
import { ModernDropdownMenu, DropdownSectionData } from "@/components/ModernDropdownMenu";
import { AnodeMobileMenu } from "@/components/AnodeMobileMenu";
import { CinematicPreloader } from "@/components/CinematicPreloader";
import {
  experiences,
  capabilities,
  languages,
  stats,
  education,
  references,
  certificates,
} from "@/data";
import ContactModal from "@/components/ContactModal";
import { QRCodeFloatingCard } from "@/components/QRCodeFloatingCard";
import { WorksVideoReplica } from "@/components/WorksVideoReplica";
import { PhilosophyBuildSection } from "@/components/PhilosophyBuildSection";
import { VeroEssenceSection } from "@/components/VeroEssenceSection";
import { AmbitiousBrandsSection } from "@/components/AmbitiousBrandsSection";
import { TransparentArtSection } from "@/components/TransparentArtSection";
import { AardvarkBookClubSection } from "@/components/AardvarkBookClubSection";
import { EraResidenceSection } from "@/components/EraResidenceSection";
import { Footer } from "@/components/Footer";
import heroPortrait from "@/assets/hero-portrait.jpg";
import heroScene from "@/assets/hero-scene.png";

export const Route = createFileRoute("/")({
  ssr: false,
  component: Portfolio,
});

/* ---------------- DATA ---------------- */

const NEON_COLORS = [
  "#ccff00",
  "#ff00ff",
  "#00ffff",
  "#ff3300",
  "#00ff33",
  "#ff0099",
  "#ffff00",
  "#ff0055",
];

// Track across SPA page transitions so navigating between pages or returning to homepage never triggers preloader again
let hasPreloaderPlayedInSession = false;

const shouldPlayPreloaderOnMount = (): boolean => {
  if (typeof window === "undefined") return false;
  if (hasPreloaderPlayedInSession) return false;
  try {
    if (sessionStorage.getItem("yodit_preloader_seen") === "true") {
      hasPreloaderPlayedInSession = true;
      return false;
    }
  } catch {
    // sessionStorage not available
  }
  return true;
};

function Portfolio() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(() => shouldPlayPreloaderOnMount());

  useEffect(() => {
    if (window.lenis) {
      window.lenis.stop();
    }
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      window.lenis.start();
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  }, []);

  const mainRef = useRef<HTMLElement>(null);
  const homeContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Vertical GSAP scroll reveals for sections (reveals on scroll, locks at full opacity to prevent ghosting)
      const sections = gsap.utils.toArray<HTMLElement>(
        "section:not([data-custom-scroll]):not(#top)",
      );
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0.15, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // 2. Parallax effect on background images within sections (excluding custom scroll stages)
      const parallaxImgs = gsap.utils.toArray<HTMLElement>(
        "section:not([data-custom-scroll]) img:not(.no-parallax)",
      );
      parallaxImgs.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.04 },
          {
            yPercent: 8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: mainRef },
  );

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    // Only apply premium snapping on desktop and large tablets for optimal, non-buggy UX
    mm.add("(min-width: 1024px)", () => {
      const targets = ["#education", "#references", "#contact"];
      const triggers: ScrollTrigger[] = [];

      targets.forEach((id) => {
        const el = document.querySelector(id);
        if (!el) return;

        // Custom style & snap trigger
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 25%",
          end: "top -25%",
          snap: {
            snapTo: 0, // Snap directly to the start of this trigger
            duration: { min: 0.6, max: 1.2 }, // Luxurious slow glide
            delay: 0.01,
            ease: "power4.out", // Luxurious smooth decay
          },
          onToggle: (self) => {
            if (self.isActive) {
              // Highlight active snapped page
              gsap.to(el, {
                borderColor: "rgba(163, 230, 53, 0.35)",
                boxShadow: "inset 0 0 80px rgba(163, 230, 53, 0.015)",
                duration: 1.0,
                ease: "power3.out",
              });

              // Zoom video/image elements on active snap (Animmaster Parallax Scale concept)
              const media = el.querySelectorAll("video, img");
              if (media.length > 0) {
                gsap.to(media, {
                  scale: 1.12,
                  duration: 1.4,
                  ease: "power2.out",
                });
              }

              // Intensify specific ambient glows inside this section
              const glows = el.querySelectorAll("div[class*='rounded-full']");
              if (glows.length > 0) {
                gsap.to(glows, {
                  scale: 1.2,
                  opacity: 0.8,
                  duration: 1.4,
                  ease: "power2.out",
                });
              }
            } else {
              // Reset to original elegant silent state
              gsap.to(el, {
                borderColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: "none",
                duration: 1.0,
                ease: "power3.out",
              });

              const media = el.querySelectorAll("video, img");
              if (media.length > 0) {
                gsap.to(media, {
                  scale: 1.0,
                  duration: 1.2,
                  ease: "power2.out",
                });
              }

              const glows = el.querySelectorAll("div[class*='rounded-full']");
              if (glows.length > 0) {
                gsap.to(glows, {
                  scale: 1.0,
                  opacity: 0.4,
                  duration: 1.4,
                  ease: "power2.out",
                });
              }
            }
          },
        });

        triggers.push(st);
      });

      return () => {
        triggers.forEach((st) => st.kill());
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative overflow-x-clip bg-[#0b0806] text-foreground"
      suppressHydrationWarning
    >
      {/* 1:1 Cinematic Preloading Animation from Attached Videos */}
      {isPreloaderActive && (
        <CinematicPreloader
          onComplete={() => {
            hasPreloaderPlayedInSession = true;
            try {
              sessionStorage.setItem("yodit_preloader_seen", "true");
            } catch {
              // ignore
            }
            setIsPreloaderActive(false);
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 60);
          }}
        />
      )}

      <div ref={homeContentRef} className="relative z-30 origin-top bg-[#0b0806]">
        <CustomCursor />
        <Nav openContact={() => setIsContactOpen(true)} />
        <Hero openContact={() => setIsContactOpen(true)} />

        <WorksVideoReplica />

        <PhilosophyBuildSection />

        <VeroEssenceSection />

        <AmbitiousBrandsSection />

        <TransparentArtSection />

        <AardvarkBookClubSection />

        <EraResidenceSection />

        <Footer />

        <QRCodeFloatingCard />

        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </main>
  );
}

/* ---------------- NAV ---------------- */

function Nav({ openContact }: { openContact: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeDropdownTab, setActiveDropdownTab] = useState<string | null>(null);
  const [caretOffsetPercent, setCaretOffsetPercent] = useState(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navPillRef = useRef<HTMLDivElement>(null);
  const isPinnedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isTabletOrLaptop = window.innerWidth >= 768; // tablet and laptop view
      setIsScrolled(currentScrollY > 40);

      // On mobile view (< 768px): do NOT hide the homepage menu on scroll
      if (!isTabletOrLaptop) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // On laptop and tablet view: hide as soon as scrolling starts
      if (currentScrollY > 30 && currentScrollY > lastScrollY.current + 5) {
        setIsVisible(false);
        setActiveDropdownTab(null);
        isPinnedRef.current = false;
      } else if (currentScrollY < lastScrollY.current - 15 || currentScrollY <= 30) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (navPillRef.current && !navPillRef.current.contains(e.target as Node)) {
        setActiveDropdownTab(null);
        isPinnedRef.current = false;
      }
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const handleTabMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    label: string,
    hasSublinks: boolean
  ) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (hasSublinks) {
      setActiveDropdownTab(label);
    } else if (!isPinnedRef.current) {
      setActiveDropdownTab(null);
    }
  };

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    label: string,
    hasSublinks: boolean
  ) => {
    if (hasSublinks) {
      e.preventDefault();
      e.stopPropagation();
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      // If already pinned on this label, toggle off; otherwise pin open!
      if (activeDropdownTab === label && isPinnedRef.current) {
        setActiveDropdownTab(null);
        isPinnedRef.current = false;
      } else {
        setActiveDropdownTab(label);
        isPinnedRef.current = true;
      }
    } else {
      setActiveDropdownTab(null);
      isPinnedRef.current = false;
      setHoveredIdx(null);
    }
  };

  const handleTabMouseLeave = () => {
    if (isPinnedRef.current) return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdownTab(null);
    }, 250);
  };

  const handleNavMouseLeave = () => {
    if (isPinnedRef.current) return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdownTab(null);
    }, 250);
  };

  const handleDropdownMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    if (isPinnedRef.current) return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdownTab(null);
    }, 250);
  };

  const certItems = certificates.map((c, i) => ({
    label: c.title,
    href: `/certificates/${i}`,
    org: c.org,
    year: c.year,
    desc: c.desc,
    image: c.image,
    badge: c.year ? `VERIFIED • ${c.year}` : "VERIFIED",
  }));

  const expItems = experiences.map((e, i) => ({
    label: e.role,
    href: `/experience/${i}`,
    org: e.org,
    year: e.year,
    desc: e.period,
    image: e.image,
    badge: `${e.chapter.toUpperCase()} • ${e.year}`,
  }));

  const megaDropdownData: Record<string, DropdownSectionData> = {
    Certificates: {
      categoryTitle: "OUR ACCREDITATIONS",
      column1: certItems.slice(0, Math.ceil(certItems.length / 2)),
      column2: certItems.slice(Math.ceil(certItems.length / 2)),
      featured: {
        badge: "VERIFIED",
        title: "Global Safeguarding & Protection",
        subtitle: "UNHCR, UNICEF & Humanitarian Leadership Academy",
        image: "/Safeguarding_Essentials_Completion_certificate.jpg",
        href: "/certificates",
      },
    },
    Experience: {
      categoryTitle: "ROLES & TRACK RECORD",
      column1: expItems.slice(0, Math.ceil(expItems.length / 2)),
      column2: expItems.slice(Math.ceil(expItems.length / 2)),
      featured: {
        badge: "LEADERSHIP",
        title: "Youth & Gender Programs",
        subtitle: "Over a decade directing regional empowerment curricula",
        image: "/gallery/IMG_20260922_185844_168.jpg",
        href: "/experience",
      },
    },
    Skills: {
      categoryTitle: "STRATEGIC DOMAINS",
      column1: [
        {
          label: "Program Management",
          href: "/skills/program-management",
          org: "Strategic planning & grant execution",
          image: "/certificate_Project_Management_Essentials.jpg",
          badge: "STRATEGY",
        },
        {
          label: "Community Development",
          href: "/skills/community-development",
          org: "Grassroots empowerment & capacity building",
          image: "/gallery/IMG_20260922_185844_168.jpg",
          badge: "FIELDWORK",
        },
      ],
      column2: [
        {
          label: "Gender Advocacy",
          href: "/skills/gender-advocacy",
          org: "Intersectional SRHR equity & policy",
          image: "/intersectional_SRHR.jpg",
          badge: "ADVOCACY",
        },
        {
          label: "Communication",
          href: "/skills/communication",
          org: "Cross-cultural diplomacy & stakeholder reporting",
          image: "/English_certificate.jpg",
          badge: "DIPLOMACY",
        },
      ],
      featured: {
        badge: "METHODOLOGY",
        title: "Intersectional SRHR Frameworks",
        subtitle: "Grassroots mobilization & institutional policy integration",
        image: "/intersectional_SRHR.jpg",
        href: "/skills",
      },
    },
  };

  const links = [
    { label: "About", href: "/about" },
    { label: "Education", href: "/education" },
    {
      label: "Certificates",
      href: "/certificates",
      sublinks: certificates.map((c, i) => ({ label: c.title, href: `/certificates/${i}` })),
    },
    {
      label: "Experience",
      href: "/experience",
      sublinks: experiences.map((e, i) => ({ label: e.role, href: `/experience/${i}` })),
    },
    {
      label: "Skills",
      href: "/skills",
      sublinks: [
        { label: "Program Management", href: "/skills/program-management" },
        { label: "Community Development", href: "/skills/community-development" },
        { label: "Gender Advocacy", href: "/skills/gender-advocacy" },
        { label: "Communication", href: "/skills/communication" },
      ],
    },
    { label: "Projects", href: "/projects" },
    { label: "Impact", href: "/impact" },
    { label: "Advocacy", href: "/advocacy" },
    { label: "Publications", href: "/publications" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "References", href: "/references" },
  ];
  return (
    <>
      <motion.nav
        suppressHydrationWarning
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 md:py-4 transition-colors duration-300 text-white pointer-events-none"
      >
        <div
          suppressHydrationWarning
          className="max-w-[1500px] mx-auto flex items-center justify-between"
        >
          <a
            suppressHydrationWarning
            href="#top"
            className="flex items-center gap-3 pointer-events-auto transition-transform duration-300 hover:scale-[1.02]"
          >
            <motion.span
              suppressHydrationWarning
              initial={{ scale: 0.6, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-9 h-9 rounded-full border border-white/30 bg-[#0a0a0c]/60 backdrop-blur-md flex items-center justify-center font-display italic text-lg text-white"
            >
              y
            </motion.span>
            <div suppressHydrationWarning className="hidden sm:block leading-tight">
              <motion.div
                suppressHydrationWarning
                initial={{ opacity: 0, letterSpacing: "0.4em", y: -4 }}
                animate={{ opacity: 1, letterSpacing: "0.2em", y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-[11px] font-medium text-white"
              >
                YODIT
              </motion.div>
            </div>
          </a>

          <div
            ref={navPillRef}
            suppressHydrationWarning
            onMouseLeave={handleNavMouseLeave}
            className="hidden lg:flex items-center gap-0.5 border border-white/15 bg-[#0a0a0c]/75 backdrop-blur-xl rounded-full p-1 relative pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          >
            {links.map((l, i) => (
              <div
                key={l.label}
                className="relative group/parent"
                onMouseEnter={(e) => {
                  setHoveredIdx(i);
                  handleTabMouseEnter(e, l.label, !!l.sublinks);
                }}
                onMouseLeave={() => {
                  setHoveredIdx(null);
                  handleTabMouseLeave();
                }}
              >
                <Link
                  to={l.href}
                  onClick={(e) => handleItemClick(e, l.label, !!l.sublinks)}
                  className="group flex items-center px-2.5 py-1 xl:px-3 xl:py-1.5 rounded-full text-[10px] xl:text-[11px] 2xl:text-xs transition-colors duration-200 relative z-10 whitespace-nowrap font-medium select-none cursor-pointer"
                >
                  <span
                    className={`absolute inset-0 rounded-full -z-10 bg-[#F6ECD9]/[0.09] border border-[#E2CDA4]/25 shadow-[0_2px_15px_rgba(226,205,164,0.12)] pointer-events-none transition-opacity duration-200 ${
                      hoveredIdx === i || activeDropdownTab === l.label ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <NavMenuItemIcon
                    label={l.label}
                    isHovered={hoveredIdx === i || activeDropdownTab === l.label}
                    className="w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0"
                  />
                  <MainMenuItemText
                    label={l.label}
                    isHovered={hoveredIdx === i || activeDropdownTab === l.label}
                  />
                  {l.sublinks && (
                    <ChevronDown
                      size={10}
                      className={`ml-1 transition-transform duration-200 opacity-60 ${
                        activeDropdownTab === l.label ? "rotate-180 opacity-100 text-amber-200" : ""
                      }`}
                    />
                  )}
                </Link>
              </div>
            ))}

            {/* Video-matched Morphing Mega Dropdown Menu */}
            <ModernDropdownMenu
              activeLabel={activeDropdownTab}
              data={megaDropdownData}
              onClose={() => {
                setActiveDropdownTab(null);
                isPinnedRef.current = false;
                setHoveredIdx(null);
              }}
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            />
          </div>

          <div
            suppressHydrationWarning
            className="flex items-center gap-3 pointer-events-auto transition-all duration-300"
          >
            <div className="md:hidden">
              <AudioPlayer isScrolled={isScrolled} />
            </div>
            <motion.button
              suppressHydrationWarning
              onClick={openContact}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group hidden md:flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-white text-black text-xs font-medium tracking-wider uppercase cursor-pointer"
            >
              Let's talk
              <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                ↗
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={openContact}
                className="md:hidden px-3 py-1.5 rounded-full bg-[#00e575] hover:bg-[#00c966] text-black text-xs font-bold tracking-wide transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                Contact me
              </button>
              <button
                suppressHydrationWarning
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-black/60 border border-white/20 text-white hover:border-white/40 active:scale-95 transition-all cursor-pointer"
              >
                <div className="flex flex-col gap-1 w-3.5 items-end">
                  <span className="w-full h-0.5 bg-white rounded-full" />
                  <span className="w-2.5 h-0.5 bg-white rounded-full" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile/Tablet Exact 1:1 Replica Menu from Video */}
      <AnodeMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        openContact={openContact}
        links={links}
      />
    </>
  );
}

/* ---------------- HERO ---------------- */

function Hero({ openContact }: { openContact: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const reduce = useReducedMotion();

  // Mouse 3D tilt motion values
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(mY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    mX.set(mouseX / width);
    mY.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    mX.set(0);
    mY.set(0);
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[calc(100svh+36px)] md:min-h-[calc(100svh+52px)] w-full flex items-center justify-center overflow-hidden pt-14 md:pt-0 pb-[36px] md:pb-[52px] rounded-b-[36px] md:rounded-b-[52px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] z-20 isolate"
      style={{
        transform: "translateZ(0)",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
    >
      {/* Background Image Parallax Wrapper */}
      <motion.div
        style={{ scale: reduce ? 1 : scale }}
        className="absolute inset-0 z-0 rounded-b-[36px] md:rounded-b-[52px] overflow-hidden will-change-transform"
      >
        {/* Mobile View Hero Portrait - focused, centered, and optimized for narrow aspect ratios */}
        <img
          src={heroPortrait}
          alt="Yodit Dejene Hero Portrait"
          className="block md:hidden w-full h-full object-cover object-center opacity-95 rounded-b-[36px] md:rounded-b-[52px]"
          referrerPolicy="no-referrer"
        />
        {/* Tablet / Desktop View Hero Scene - full-width landscape composition */}
        <img
          src={heroScene}
          alt="Yodit Dejene Hero Scene"
          className="hidden md:block w-full h-full object-cover object-right opacity-95 md:opacity-100 rounded-b-[36px] md:rounded-b-[52px]"
          referrerPolicy="no-referrer"
        />
        <Suspense fallback={null}>
          <PremiumBackground3D />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/30 rounded-b-[36px] md:rounded-b-[52px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent rounded-b-[36px] md:rounded-b-[52px]" />
      </motion.div>

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(193,92,61,0.06)_0%,transparent_70%)] pointer-events-none rounded-b-[36px] md:rounded-b-[52px]" />

      <Embers />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full h-full flex flex-col justify-center"
      >
        {/* Title & Credentials */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: reduce ? 0 : rotateX,
            rotateY: reduce ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="flex flex-col items-start text-left max-w-3xl relative z-10 mt-20 sm:mt-24 md:mt-28 my-auto py-4 sm:py-6 transition-transform duration-300"
        >
          {/* Bold typography headers */}
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.4rem] tracking-[-0.03em] leading-[0.88] uppercase text-[#ebd5c5] flex flex-col gap-1">
            <TitleTextAnimation text="BUILDING" delay={0.2} className="block" />
            <TitleTextAnimation text="BRIDGES TO" delay={0.35} className="block text-[#ebd5c5]" />
            <TitleTextAnimation text="INSPIRE" delay={0.5} className="block text-[#c15c3d]" />
          </h1>

          {/* Description and Signature */}
          <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col items-start">
            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.7, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm md:text-base text-[#ebd5c5]/80 leading-relaxed max-w-md"
            >
              I craft resilient structures, community programs, and advocacy networks that connect
              grassroots community voices with systemic global change.
            </motion.p>

            {/* Elegant handwritten tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, x: -20, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 sm:mt-3 font-serif italic text-2xl sm:text-3xl text-[#c15c3d] tracking-wide font-light select-none origin-left"
            >
              Yodit Dejene
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedButton
                href="/experience"
                variant="primary"
                className="pl-5 pr-1.5 py-1.5 text-[#0b0806] hover:text-[#0b0806] transition-colors duration-300"
              >
                View experience
                <span className="w-8 h-8 rounded-full bg-[#0b0806] group-hover:bg-[#c15c3d] text-[#ebd5c5] flex items-center justify-center group-hover:rotate-45 transition-all duration-300 text-xs">
                  ↗
                </span>
              </AnimatedButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.18, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedButton
                onClick={openContact}
                variant="outline"
                className="px-5 py-3 text-[#ebd5c5] hover:text-white border-[#ebd5c5]/30 hover:border-[#ebd5c5]/80 transition-colors duration-300"
              >
                Get in touch
              </AnimatedButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.28, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedButton
                href="/Yodit_Resume_Safeguarding_Manager-Ethiopia__1_.pdf"
                download="Yodit_Resume_Safeguarding_Manager-Ethiopia__1_.pdf"
                variant="outline"
                className="px-5 py-3 border-[#ebd5c5]/30 hover:border-[#ebd5c5]/80 text-[#ebd5c5] hover:text-white flex items-center gap-2 transition-all duration-300 cursor-pointer"
              >
                <Download className="w-4 h-4 text-lime shrink-0" suppressHydrationWarning />
                <span>Download CV</span>
              </AnimatedButton>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SplitLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}

function Embers() {
  const dots = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const size = 2 + ((i * 7) % 5);
        const delay = (i * 0.7) % 8;
        const dur = 8 + ((i * 3) % 10);
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-ochre/60 blur-[1px]"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animation: `ember ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------------- SECTION LABEL ---------------- */

function SectionLabel({ n, name, kicker }: { n: string; name: string; kicker?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-muted-foreground border-b border-border/40 pb-4 w-full overflow-hidden">
      <motion.span
        initial={reduce ? {} : { opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono"
      >
        № {n}
      </motion.span>
      <motion.span
        initial={reduce ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        / {name}
      </motion.span>
      {kicker && (
        <motion.span
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-foreground/70"
        >
          · {kicker}
        </motion.span>
      )}
      <motion.span
        initial={reduce ? {} : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="flex-1 h-[1px] bg-border/40 origin-left"
      />
    </div>
  );
}

/* ---------------- ABOUT ---------------- */

