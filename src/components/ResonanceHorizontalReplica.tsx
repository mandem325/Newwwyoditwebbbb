import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * Authentic Gallery Items for the 3D Arced Carousels
 * Featuring real photography of Yodit Dejene's humanitarian, advocacy, and community leadership work.
 */
export interface BitePortfolioItem {
  image: string;
  title: string;
  desc?: string;
  slug: string;
}

// 9 Unique authentic gallery photographs for Top Carousel (downward arc)
export const TOP_GALLERY_ITEMS: BitePortfolioItem[] = [
  {
    image: "/gallery/IMG_20260922_185844_168.jpg",
    title: "COMMUNITY ASSEMBLY",
    desc: "Regional Dialogue & Strategic Civic Cohesion",
    slug: "top-community-assembly",
  },
  {
    image: "/gallery/IMG_20260922_185846_438.jpg",
    title: "LEADERSHIP FORUM",
    desc: "Multi-Stakeholder High-Level Engagement",
    slug: "top-leadership-forum",
  },
  {
    image: "/gallery/IMG_20260922_185849_390.jpg",
    title: "YOUTH MENTORSHIP",
    desc: "Adolescent Empowerment & Capacity Building",
    slug: "top-youth-mentorship",
  },
  {
    image: "/gallery/IMG_20260922_185916_101.jpg",
    title: "FIELD OPERATIONS",
    desc: "Integrated Program Delivery & Coordination",
    slug: "top-field-operations",
  },
  {
    image: "/gallery/IMG_20260922_185937_614.jpg",
    title: "STRATEGIC SESSION",
    desc: "Executive Advisory & Governance Frameworks",
    slug: "top-strategic-session",
  },
  {
    image: "/gallery/IMG_20260922_185940_986.jpg",
    title: "CIVIC ADVOCACY",
    desc: "Grassroots Parity & Institutional Voice",
    slug: "top-civic-advocacy",
  },
  {
    image: "/gallery/IMG_20260922_185951_029.jpg",
    title: "COLLABORATIVE WORKSHOP",
    desc: "Participatory Systems & Action Design",
    slug: "top-collaborative-workshop",
  },
  {
    image: "/gallery/IMG_20260922_185957_259.jpg",
    title: "INSTITUTIONAL DIALOGUE",
    desc: "Cross-Sector Policy & Reform Coalitions",
    slug: "top-institutional-dialogue",
  },
  {
    image: "/gallery/IMG_20260922_190021_107.jpg",
    title: "GRASSROOTS ASSEMBLY",
    desc: "Community Resilience & Local Ownership",
    slug: "top-grassroots-assembly",
  },
];

// 8 Completely different unique gallery photographs for Bottom Carousel (upward arc)
export const BOTTOM_GALLERY_ITEMS: BitePortfolioItem[] = [
  {
    image: "/gallery/IMG_20260922_190021_344.jpg",
    title: "EMPOWERMENT SUMMIT",
    desc: "Transformative Vision & Societal Impact",
    slug: "bottom-empowerment-summit",
  },
  {
    image: "/gallery/IMG_20260922_185957_399.jpg",
    title: "FIELD REFLECTIONS",
    desc: "Sustainable Progress & Long-Term Legacy",
    slug: "bottom-field-reflections",
  },
  {
    image: "/gallery/000IMG_20260922_185937_614.jpg",
    title: "EXECUTIVE COUNSEL",
    desc: "Evidence-Based Frameworks & Analytics",
    slug: "bottom-executive-counsel",
  },
  {
    image: "/gallery/123IMG-20260802-WA0004.jpg",
    title: "STRATEGIC ALLIANCE",
    desc: "Global Partnerships & Multi-Sector Coalitions",
    slug: "bottom-strategic-alliance",
  },
  {
    image: "/gallery/222IMG_20260922_185916_033.jpg",
    title: "FIELD DEPLOYMENT",
    desc: "Regional Program Execution & Ecosystem Support",
    slug: "bottom-field-deployment",
  },
  {
    image: "/gallery/444IMG_20260922_190002_684.jpg",
    title: "YOUTH EMPOWERMENT",
    desc: "Social-Emotional Resilience & Educational Rights",
    slug: "bottom-youth-empowerment",
  },
  {
    image: "/gallery/56IMG_20260922_190007_832.jpg",
    title: "POLICY ROUNDTABLE",
    desc: "Multilateral SRHR Integration & Gender Equity",
    slug: "bottom-policy-roundtable",
  },
  {
    image: "/gallery/665IMG_20260922_190007_888.jpg",
    title: "INSTITUTIONAL MILESTONE",
    desc: "Pioneering Systemic Standards & Community Impact",
    slug: "bottom-institutional-milestone",
  },
];

// Dual-cycled lists to ensure infinite smooth 360 ribbon loop across ultra-wide viewports
export const TOP_CAROUSEL_EXTENDED: BitePortfolioItem[] = [
  ...TOP_GALLERY_ITEMS,
  ...TOP_GALLERY_ITEMS.map((item, idx) => ({
    ...item,
    slug: `${item.slug}-cycle2-${idx}`,
  })),
];

export const BOTTOM_CAROUSEL_EXTENDED: BitePortfolioItem[] = [
  ...BOTTOM_GALLERY_ITEMS,
  ...BOTTOM_GALLERY_ITEMS.map((item, idx) => ({
    ...item,
    slug: `${item.slug}-cycle2-${idx}`,
  })),
];

// Legacy fallback export
export const THE_BITE_ITEMS = TOP_CAROUSEL_EXTENDED;

interface CardProps {
  item: BitePortfolioItem;
  i: number;
  position: any;
  len: number;
  cardW: number;
  cardH: number;
  isMobile: boolean;
  arcDirection: "down" | "up";
  onSelect: (index: number) => void;
}

function BiteCarouselCard({
  item,
  i,
  position,
  len,
  cardW,
  cardH,
  isMobile,
  arcDirection,
  onSelect,
}: CardProps) {
  // Wrapped circular distance: continuous looping index relative to active position
  const v = useTransform(position, (pos: number) => {
    let p = i - pos;
    while (p > len / 2) p -= len;
    while (p < -len / 2) p += len;
    return p;
  });

  // 1. HORIZONTAL X COORDINATE: Pure cylinder projection
  // Continuous C-infinity function with uniform velocity across center (no kinks, no breaks in the middle)
  const x = useTransform(v, (p: number) => {
    const theta = p * (isMobile ? 0.17 : 0.155);
    const R = isMobile ? 850 : 1450;
    return R * Math.sin(theta);
  });

  // 2. VERTICAL Y TRAJECTORY: True smooth cosine apex arch
  // Horizontal tangent at apex (derivative is 0 at center), smooth downward or upward arc
  const y = useTransform(v, (p: number) => {
    const sagMax = isMobile ? 240 : 360;
    const offset = sagMax * (1 - Math.cos(p * (isMobile ? 0.22 : 0.20)));
    return arcDirection === "up" ? -offset : offset;
  });

  // 3. 2D TANGENTIAL ROTATION (rotateZ) ALONG THE ARCH
  const rotateZ = useTransform(v, (p: number) => {
    const tiltPerStep = isMobile ? 6.2 : 7.0;
    return arcDirection === "up" ? -p * tiltPerStep : p * tiltPerStep;
  });

  // 4. 3D CYLINDRICAL ROTATION (rotateY)
  const rotateY = useTransform(v, (p: number) => {
    const yawDeg = isMobile ? 9.5 : 10.5;
    return -p * yawDeg;
  });

  // 5. 3D Z-DEPTH (translateZ)
  const z = useTransform(v, (p: number) => {
    const abs = Math.abs(p);
    return 20 - Math.pow(abs, 1.45) * (isMobile ? 24 : 35);
  });

  // 6. SCALE CURVE ALONG THE ARC (GPU composite-only scaling)
  const scale = useTransform(v, (p: number) => {
    const abs = Math.abs(p);
    return Math.max(0.68, 1.08 - abs * 0.10);
  });

  // 7. OPACITY CURVE ALONG THE ARC
  // Smoothly fades to 0 before the wrap boundary, eliminating visual popping
  const opacity = useTransform(v, (p: number) => {
    const abs = Math.abs(p);
    if (abs > 4.2) return 0;
    if (abs > 3.0) return 1 - (abs - 3.0) / 1.2;
    return 1;
  });

  const zIndex = useTransform(v, (p: number) => Math.round(30 - Math.abs(p) * 3));

  return (
    <motion.div
      onClick={() => onSelect(i)}
      className={`absolute select-none will-change-transform cursor-pointer ${
        arcDirection === "up" ? "bottom-0" : "top-0"
      }`}
      style={{
        x,
        y,
        z,
        width: cardW,
        height: cardH,
        opacity,
        scale,
        rotateZ,
        rotateY,
        zIndex,
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Arc Card with lush drop shadow and rounded corners (no CSS transition-all to ensure buttery 120 FPS) */}
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.22),0_8px_18px_rgba(0,0,0,0.12)] bg-[#eceae6] border border-black/10 relative group">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
          loading="eager"
        />
        {/* Subtle glass reflection highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/20 pointer-events-none" />

        {/* Soft active card rim light */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-2xl pointer-events-none" />
      </div>
    </motion.div>
  );
}

export interface ResonanceHorizontalReplicaProps {
  arcDirection?: "down" | "up";
  initialPosition?: number;
  reverseDrift?: boolean;
  items?: BitePortfolioItem[];
}

/**
 * ResonanceHorizontalReplica
 * Exact 1:1 replica of the video carousel:
 * Arranged along a true 3D curved arc horizontally in the background
 * behind "where innovation meets leadership", supporting both top downward and bottom upward curvature.
 * Glides smoothly and continuously, responds to mouse/touch drag and scroll wheel.
 */
export function ResonanceHorizontalReplica({
  arcDirection = "down",
  initialPosition = 0,
  reverseDrift = false,
  items,
}: ResonanceHorizontalReplicaProps) {
  // Use custom items if supplied; otherwise use distinct gallery sets for top vs bottom
  const activeItems =
    items && items.length > 0
      ? items
      : arcDirection === "up"
      ? BOTTOM_CAROUSEL_EXTENDED
      : TOP_CAROUSEL_EXTENDED;

  const containerRef = useRef<HTMLDivElement>(null);
  const position = useMotionValue(initialPosition);
  const [isMobile, setIsMobile] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const velocityRef = useRef(0);

  const driftSpeed = reverseDrift ? -0.12 : 0.12;

  // Handle responsive card dimensions
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Continuous fluid autonomous motion loop with smooth exponential velocity blending
  useEffect(() => {
    let animId: number;
    let lastTs = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      if (!isDraggingRef.current) {
        // Seamlessly blend any flick/scroll velocity into the steady ambient driftSpeed
        const blend = Math.min(1, dt * 2.8);
        velocityRef.current += (driftSpeed - velocityRef.current) * blend;
        position.set(position.get() + velocityRef.current * dt);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [position, driftSpeed]);

  // Wheel interaction (horizontal or vertical mouse scroll)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 1) {
        // Smoothly adjust position with dampening
        velocityRef.current = delta * 0.0025;
        position.set(position.get() + delta * 0.0018);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [position]);

  // Mouse & Touch Dragging Handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDraggingRef.current = true;
      dragStartRef.current = e.clientX;
      lastXRef.current = e.clientX;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
      (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const now = performance.now();
      const dt = Math.max((now - lastTimeRef.current) / 1000, 0.001);
      const deltaX = e.clientX - lastXRef.current;

      const sensitivity = isMobile ? 0.0055 : 0.0035;
      const shift = -deltaX * sensitivity;
      position.set(position.get() + shift);

      velocityRef.current = shift / dt;
      lastXRef.current = e.clientX;
      lastTimeRef.current = now;
    },
    [isMobile, position]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      try {
        (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
      } catch {
        // ignored
      }
      // Limit max throw velocity
      velocityRef.current = Math.max(-1.8, Math.min(1.8, velocityRef.current));
    },
    []
  );

  // Click a card to center it smoothly
  const handleCardSelect = useCallback(
    (index: number) => {
      if (isDraggingRef.current) return;
      const current = position.get();
      let diff = index - (current % activeItems.length);
      while (diff > activeItems.length / 2) diff -= activeItems.length;
      while (diff < -activeItems.length / 2) diff += activeItems.length;
      velocityRef.current = diff * 1.8;
    },
    [position, activeItems.length]
  );

  // Exact card dimensions proportional to original design
  const cardW = isMobile ? 135 : 230;
  const cardH = isMobile ? 185 : 315;

  // Extra height to accommodate the curved arch
  const totalHeight = cardH + (isMobile ? 80 : 130);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full flex justify-center select-none overflow-visible cursor-grab active:cursor-grabbing pointer-events-auto touch-pan-y ${
        arcDirection === "up" ? "items-end" : "items-start"
      }`}
      style={{
        height: totalHeight,
        paddingTop: arcDirection === "down" ? (isMobile ? 10 : 18) : 0,
        paddingBottom: arcDirection === "up" ? (isMobile ? 10 : 18) : 0,
        perspective: isMobile ? "900px" : "1300px",
        perspectiveOrigin: arcDirection === "up" ? "50% 70%" : "50% 30%",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Soft atmospheric radial gradient behind the arc */}
      <div className="absolute inset-0 bg-radial from-black/[0.04] via-transparent to-transparent pointer-events-none" />

      {/* Render all items horizontally along the genuine 3D curved arc */}
      <div
        className={`relative w-full h-full flex justify-center ${
          arcDirection === "up" ? "items-end" : "items-start"
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {activeItems.map((item, i) => (
          <BiteCarouselCard
            key={item.slug}
            item={item}
            i={i}
            position={position}
            len={activeItems.length}
            cardW={cardW}
            cardH={cardH}
            isMobile={isMobile}
            arcDirection={arcDirection}
            onSelect={handleCardSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default ResonanceHorizontalReplica;
