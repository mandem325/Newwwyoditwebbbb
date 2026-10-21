import React, { useEffect, useRef, useState } from "react";

// Real butterfly photographic assets created from ultra-sharp macro specimens
const REAL_BUTTERFLIES = {
  monarch: {
    name: "Monarch",
    left: "/monarch_left_opt.png",
    right: "/monarch_right_opt.png",
    body: "/monarch_body_opt.png",
    full: "/monarch_full.png",
    baseSize: 84,
    // Realistic slow, graceful lepidoptera wing kinematics (~4.5 Hz at 60fps)
    flapFreq: 0.065,
    burstMin: 3,
    burstMax: 5,
    liftForce: 1.7,
    glideDurMin: 70,
    glideDurMax: 130,
  },
  blue_morpho: {
    name: "Blue Morpho",
    left: "/blue_morpho_left_opt.png",
    right: "/blue_morpho_right_opt.png",
    body: "/blue_morpho_body_opt.png",
    full: "/blue_morpho_full.png",
    baseSize: 92,
    // Majestic, slow, buoyant flapping of the giant Blue Morpho (~3.5 Hz)
    flapFreq: 0.05,
    burstMin: 2,
    burstMax: 4,
    liftForce: 2.1,
    glideDurMin: 80,
    glideDurMax: 150,
  },
  emerald: {
    name: "Emerald Swallowtail",
    left: "/emerald_left_opt.png",
    right: "/emerald_right_opt.png",
    body: "/emerald_body_opt.png",
    full: "/emerald_left_opt.png",
    baseSize: 82,
    // Agile yet smooth swallowtail flight (~5 Hz)
    flapFreq: 0.075,
    burstMin: 3,
    burstMax: 5,
    liftForce: 1.5,
    glideDurMin: 55,
    glideDurMax: 110,
  },
} as const;

type ButterflySpecies = keyof typeof REAL_BUTTERFLIES;

interface PerchAnchor {
  element: Element;
  offsetX: number;
  offsetY: number;
  name?: string;
  perchPitch: number;
  perchRoll: number;
  perchHeading: number;
  side: "left" | "right";
}

interface ButterflyPhysics {
  id: number;
  species: ButterflySpecies;
  // Position in 2D space (freely navigates inside and outside visible screen)
  x: number;
  y: number;
  // Base velocity vector
  vx: number;
  vy: number;
  // Smooth instantaneous heave (vertical bob) & surge (forward kick)
  heaveY: number;
  surgeX: number;
  // Navigation Target
  targetX: number;
  targetY: number;
  cruiseSpeed: number;
  size: number;
  // 3D Rotations (Degrees)
  heading: number; // Flight trajectory yaw / resting orientation
  bodyPitch: number; // 3D Pitch tilt (rocks in flight, pitches into 3D side view when perched)
  bodyRoll: number; // 3D Roll / Side view bank
  bodyYawWobble: number; // Gentle micro-wobble
  // Wing kinematics
  wingDihedral: number; // Angle of wings relative to horizontal (-22° to +88° vertical fold)
  wingTwist: number; // Chordwise aerofoil camber/twist
  // State Machine: Burst, Glide, Landing, Perched (Resting), Takeoff
  state: "burst" | "glide" | "landing" | "perched" | "takeoff";
  strokeProgress: number;
  flapsInCurrentBurst: number;
  flapsTarget: number;
  glideTimer: number;
  glideDuration: number;
  // Perching & Resting
  perchSpot: PerchAnchor | null;
  perchTimer: number;
  perchDuration: number;
  baskingPhase: number;
  // Altitude / Depth
  altitude: number; // 0.72 (resting/landed) to 1.25 (high flight)
  seed: number;
  // Off-screen lifecycle counter
  offscreenTimer: number;
  // Live visibility opacity
  opacity: number;
}

// Minimum personal separation distance in pixels between any two butterflies
const MIN_SEPARATION_DISTANCE = 280;

// Targeted sections where butterflies are permitted to fly
const TARGET_SELECTORS = ["#essence-of-vero"];

// Sections where butterflies must never fly or land (Hero is strictly excluded)
const EXCLUDED_SELECTORS = ["#top"];

interface FlightZone {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

// Helper to query currently active bounding client rects in viewport
function getActiveFlightZones(curW: number, curH: number): FlightZone[] {
  return [
    {
      top: 0,
      bottom: curH,
      left: 0,
      right: curW,
      width: curW,
      height: curH,
    },
  ];
}

// Helper to get excluded zones (Hero and the expanded video horizontal scroll)
function getExcludedFlightZones(curW: number, curH: number): FlightZone[] {
  return [];
}

function isInsideExcluded(x: number, y: number, excludedZones: FlightZone[]) {
  for (const z of excludedZones) {
    if (x >= z.left && x <= z.right && y >= z.top && y <= z.bottom) {
      return true;
    }
  }
  return false;
}

// Candidate perch spot discovered on components or text
interface PerchCandidate {
  element: Element;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  name?: string;
  perchPitch: number;
  perchRoll: number;
  perchHeading: number;
  side: "left" | "right";
}

// Helper to find visible perch spots on text headings, laptop, books, stickers, etc.
function getVisiblePerchSpots(
  curW: number,
  curH: number,
  occupiedElements: Set<Element>,
): PerchCandidate[] {
  if (typeof document === "undefined") return [];
  const spots: PerchCandidate[] = [];
  const seenElements = new Set<Element>();

  // 1. Check explicit perch targets (Laptop, books, badges, etc.)
  const perchElements = document.querySelectorAll('[data-butterfly-perch="true"]');
  perchElements.forEach((el, elIdx) => {
    if (occupiedElements.has(el) || seenElements.has(el)) return;
    if (el.closest(EXCLUDED_SELECTORS.join(","))) return;
    seenElements.add(el);

    const rect = el.getBoundingClientRect();
    if (
      rect.bottom > 60 &&
      rect.top < curH - 60 &&
      rect.right > 40 &&
      rect.left < curW - 40 &&
      rect.width > 24 &&
      rect.height > 16
    ) {
      const isLaptopLid = el.getAttribute("data-butterfly-perch") === "lid" || rect.width > 600;
      const side: "left" | "right" = elIdx % 2 === 0 ? "right" : "left";

      // 3D side-view angles: tilted forward in 3D (pitch: 54°-64°) and rotated sideways (roll: 38°-52°)
      const perchPitch = 58;
      const perchRoll = side === "right" ? 44 : -44;
      const perchHeading = side === "right" ? 18 : -18;

      const posX = isLaptopLid
        ? rect.left + rect.width * (0.25 + (elIdx % 3) * 0.25)
        : rect.left + rect.width * 0.5;
      const posY = isLaptopLid ? rect.top + 6 : rect.top + rect.height * 0.15;

      spots.push({
        element: el,
        x: posX,
        y: posY,
        offsetX: posX - rect.left,
        offsetY: posY - rect.top,
        name: "component",
        perchPitch,
        perchRoll,
        perchHeading,
        side,
      });
    }
  });

  // 2. Discover visible text headings & strong text in active sections
  const textSelectors = [
    "h1",
    "h2",
    "h3",
    ".interactive-card", // 3D object
    ".macbook-mockup", // 3D object
    "[data-3d-object]", // 3D object
  ];

  const excludedZones = getExcludedFlightZones(curW, curH);

  for (const sel of textSelectors) {
    try {
      const textEls = document.querySelectorAll(sel);
      textEls.forEach((el, tIdx) => {
        if (occupiedElements.has(el) || seenElements.has(el)) return;

        // Skip elements inside excluded sections
        if (el.closest(EXCLUDED_SELECTORS.join(","))) return;

        seenElements.add(el);

        const rect = el.getBoundingClientRect();

        // Ensure element itself isn't completely inside an excluded zone (fallback)
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        if (isInsideExcluded(centerX, centerY, excludedZones)) return;

        if (
          rect.bottom > 80 &&
          rect.top < curH - 80 &&
          rect.right > 40 &&
          rect.left < curW - 40 &&
          rect.width > 40 &&
          rect.height > 16
        ) {
          const side: "left" | "right" = tIdx % 2 === 0 ? "right" : "left";
          const perchPitch = 56;
          const perchRoll = side === "right" ? 42 : -42;
          const perchHeading = side === "right" ? 15 : -15;

          // Land directly on top of letters/words of the heading, or top edge of 3D object
          const wordOffsetFraction = 0.25 + (tIdx % 3) * 0.22;
          const posX = rect.left + rect.width * wordOffsetFraction;
          const posY = rect.top + (sel.includes("card") || sel.includes("mockup") ? 20 : 3);

          spots.push({
            element: el,
            x: posX,
            y: posY,
            offsetX: posX - rect.left,
            offsetY: posY - rect.top,
            name: "text",
            perchPitch,
            perchRoll,
            perchHeading,
            side,
          });
        }
      });
    } catch {
      // Ignore
    }
  }

  return spots;
}

// Spawns or recycles a butterfly heading into an active visible zone
function spawnFromOffscreen(
  b: ButterflyPhysics,
  butterflies: ButterflyPhysics[],
  curW: number,
  curH: number,
  zones: FlightZone[],
  excludedZones: FlightZone[],
  side?: "left" | "right" | "top" | "bottom",
) {
  if (zones.length === 0) {
    b.x = -300;
    b.y = -300;
    b.targetX = -300;
    b.targetY = -300;
    b.opacity = 0;
    return;
  }

  const chosenZone = zones[Math.floor(Math.random() * zones.length)];
  const sides: Array<"left" | "right" | "top" | "bottom"> = ["left", "right", "top", "bottom"];
  const chosenSide = side || sides[Math.floor(Math.random() * sides.length)];
  const padding = 120 + Math.random() * 80;

  const target = pickSeparatedTarget(b, butterflies, curW, curH, zones, excludedZones);
  b.targetX = target.targetX;
  b.targetY = target.targetY;

  const zoneHeight = Math.max(80, chosenZone.bottom - chosenZone.top);
  const zoneWidth = Math.max(80, chosenZone.right - chosenZone.left);

  if (chosenSide === "left") {
    b.x = -padding;
    b.y = chosenZone.top + Math.random() * zoneHeight;
    b.vx = Math.abs(b.vx || 1.7);
    b.vy = (Math.random() - 0.5) * 1.2;
  } else if (chosenSide === "right") {
    b.x = curW + padding;
    b.y = chosenZone.top + Math.random() * zoneHeight;
    b.vx = -Math.abs(b.vx || 1.7);
    b.vy = (Math.random() - 0.5) * 1.2;
  } else if (chosenSide === "top") {
    b.x = chosenZone.left + Math.random() * zoneWidth;
    b.y = Math.max(-padding, chosenZone.top - padding);
    b.vx = (Math.random() - 0.5) * 1.2;
    b.vy = Math.abs(b.vy || 1.4);
  } else {
    b.x = chosenZone.left + Math.random() * zoneWidth;
    b.y = Math.min(curH + padding, chosenZone.bottom + padding);
    b.vx = (Math.random() - 0.5) * 1.2;
    b.vy = -Math.abs(b.vy || 1.4);
  }

  const angle = Math.atan2(b.targetY - b.y, b.targetX - b.x) * (180 / Math.PI);
  b.heading = angle;
  b.bodyPitch = 0;
  b.bodyRoll = 0;
  b.offscreenTimer = 0;
  b.state = "burst";
  b.perchSpot = null;
  b.strokeProgress = Math.random() * 0.5;
  b.flapsInCurrentBurst = 0;
  b.flapsTarget = 4;
  b.altitude = 1.0;
  b.opacity = 1;
}

// Picks a target position strictly inside the visible active allowed zones
function pickSeparatedTarget(
  b: ButterflyPhysics,
  butterflies: ButterflyPhysics[],
  curW: number,
  curH: number,
  zones: FlightZone[],
  excludedZones: FlightZone[],
) {
  if (zones.length === 0) {
    return { targetX: -300, targetY: -300 };
  }

  let bestX = curW * 0.5;
  let bestY = curH * 0.5;
  let maxMinDist = -1;

  for (let attempt = 0; attempt < 12; attempt++) {
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const padX = Math.min(50, (zone.right - zone.left) * 0.12);
    const padY = Math.min(50, (zone.bottom - zone.top) * 0.12);

    const minX = Math.max(20, zone.left + padX);
    const maxX = Math.min(curW - 20, zone.right - padX);
    const minY = Math.max(20, zone.top + padY);
    const maxY = Math.min(curH - 20, zone.bottom - padY);

    const candX = minX < maxX ? minX + Math.random() * (maxX - minX) : (zone.left + zone.right) / 2;
    const candY = minY < maxY ? minY + Math.random() * (maxY - minY) : (zone.top + zone.bottom) / 2;

    if (isInsideExcluded(candX, candY, excludedZones)) {
      continue; // Skip this candidate if it's inside an excluded zone
    }

    let minDist = Infinity;
    butterflies.forEach((other) => {
      if (other.id === b.id) return;
      const d = Math.hypot(candX - other.x, candY - other.y);
      if (d < minDist) minDist = d;
    });

    if (minDist > maxMinDist) {
      maxMinDist = minDist;
      bestX = candX;
      bestY = candY;
    }
  }

  return { targetX: bestX, targetY: bestY };
}

export function FlyingButterfliesOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const butterfliesRef = useRef<ButterflyPhysics[]>([]);
  const [, setFrame] = useState(0);
  const mousePos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const animFrameId = useRef<number | null>(null);
  const cachedZonesRef = useRef<FlightZone[]>([]);
  const cachedExcludedZonesRef = useRef<FlightZone[]>([]);
  const lastScrollTimeRef = useRef<number>(Date.now());
  const isScrollingRef = useRef<boolean>(false);

  // Trigger lifelike startled takeoff for a specific resting butterfly
  const triggerTakeoff = (b: ButterflyPhysics) => {
    b.state = "takeoff";
    b.perchSpot = null;
    b.wingDihedral = -12;
    b.vy = -3.8 - Math.random() * 1.5;
    b.vx = (Math.random() - 0.5) * 3.4;
    b.flapsTarget = 5;
    b.flapsInCurrentBurst = 0;
    b.strokeProgress = 0;
    b.altitude = 1.0;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    cachedZonesRef.current = getActiveFlightZones(w, h);
    cachedExcludedZonesRef.current = getExcludedFlightZones(w, h);

    const initialButterflies: ButterflyPhysics[] = [
      {
        id: 1,
        species: "monarch",
        x: w * 0.25,
        y: h * 0.94,
        vx: 1.5,
        vy: 0.3,
        heaveY: 0,
        surgeX: 0,
        targetX: w * 0.42,
        targetY: h * 1.05,
        cruiseSpeed: 1.65,
        size: REAL_BUTTERFLIES.monarch.baseSize,
        heading: 25,
        bodyPitch: 0,
        bodyRoll: 0,
        bodyYawWobble: 0,
        wingDihedral: 18,
        wingTwist: 0,
        state: "burst",
        strokeProgress: 0.1,
        flapsInCurrentBurst: 0,
        flapsTarget: 4,
        glideTimer: 0,
        glideDuration: 110,
        perchSpot: null,
        perchTimer: 0,
        perchDuration: 300,
        baskingPhase: 0,
        altitude: 1.05,
        seed: 1.42,
        offscreenTimer: 0,
        opacity: 1,
      },
      {
        id: 2,
        species: "blue_morpho",
        x: w * 0.72,
        y: h * 0.97,
        vx: -1.4,
        vy: 0.25,
        heaveY: 0,
        surgeX: 0,
        targetX: w * 0.55,
        targetY: h * 1.12,
        cruiseSpeed: 1.5,
        size: REAL_BUTTERFLIES.blue_morpho.baseSize,
        heading: 175,
        bodyPitch: 0,
        bodyRoll: 0,
        bodyYawWobble: 0,
        wingDihedral: 24,
        wingTwist: 0,
        state: "burst",
        strokeProgress: 0.6,
        flapsInCurrentBurst: 0,
        flapsTarget: 3,
        glideTimer: 0,
        glideDuration: 140,
        perchSpot: null,
        perchTimer: 0,
        perchDuration: 360,
        baskingPhase: 1.8,
        altitude: 1.15,
        seed: 4.88,
        offscreenTimer: 0,
        opacity: 1,
      },
      {
        id: 3,
        species: "emerald",
        x: w * 0.48,
        y: h * 0.91,
        vx: 0.6,
        vy: 0.7,
        heaveY: 0,
        surgeX: 0,
        targetX: w * 0.5,
        targetY: h * 1.18,
        cruiseSpeed: 1.75,
        size: REAL_BUTTERFLIES.emerald.baseSize,
        heading: 60,
        bodyPitch: 0,
        bodyRoll: 0,
        bodyYawWobble: 0,
        wingDihedral: 15,
        wingTwist: 0,
        state: "burst",
        strokeProgress: 0.35,
        flapsInCurrentBurst: 0,
        flapsTarget: 5,
        glideTimer: 0,
        glideDuration: 85,
        perchSpot: null,
        perchTimer: 0,
        perchDuration: 280,
        baskingPhase: 3.2,
        altitude: 0.95,
        seed: 7.63,
        offscreenTimer: 0,
        opacity: 1,
      },
    ];

    butterfliesRef.current = initialButterflies;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    let scrollTimeoutId: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      lastScrollTimeRef.current = Date.now();
      isScrollingRef.current = true;

      // Startled takeoff for all resting butterflies immediately when scroll starts
      butterfliesRef.current.forEach((b) => {
        if (b.state === "perched" || b.state === "landing") {
          triggerTakeoff(b);
        }
      });

      if (scrollTimeoutId) clearTimeout(scrollTimeoutId);
      // Quickly detect when user stops scrolling (~180ms pause)
      scrollTimeoutId = setTimeout(() => {
        isScrollingRef.current = false;
      }, 180);
    };

    const handleResize = () => {
      const curW = window.innerWidth;
      const curH = window.innerHeight;
      cachedZonesRef.current = getActiveFlightZones(curW, curH);
      cachedExcludedZonesRef.current = getExcludedFlightZones(curW, curH);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    let tick = 0;

    const updatePhysics = () => {
      tick++;
      const curW = window.innerWidth;
      const curH = window.innerHeight;

      if (tick % 3 === 0) {
        cachedZonesRef.current = getActiveFlightZones(curW, curH);
        cachedExcludedZonesRef.current = getExcludedFlightZones(curW, curH);
      }
      const zones = cachedZonesRef.current;
      const excludedZones = cachedExcludedZonesRef.current;
      const hasActiveZones = zones.length > 0;

      // Stopped scrolling check: idle for > 200ms
      const isScrollIdle = Date.now() - lastScrollTimeRef.current > 200;

      const occupiedElements = new Set<Element>();
      butterfliesRef.current.forEach((b) => {
        if ((b.state === "perched" || b.state === "landing") && b.perchSpot?.element) {
          occupiedElements.add(b.perchSpot.element);
        }
      });

      butterfliesRef.current.forEach((b) => {
        const spec = REAL_BUTTERFLIES[b.species];

        let isInsideAnyTarget = false;
        for (let i = 0; i < zones.length; i++) {
          const z = zones[i];
          if (
            b.x >= z.left - 80 &&
            b.x <= z.right + 80 &&
            b.y >= z.top - 80 &&
            b.y <= z.bottom + 80
          ) {
            isInsideAnyTarget = true;
            break;
          }
        }

        // If butterfly is flying deep behind the hero (high up above hero's bottom curve), fade it out
        const heroEl = document.querySelector("#top");
        const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : -9999;
        const isDeepBehindHero = heroBottom > 100 && b.y < heroBottom - 100;

        const isExcluded = isInsideExcluded(b.x, b.y, excludedZones);
        const targetOpacity =
          hasActiveZones && isInsideAnyTarget && !isDeepBehindHero && !isExcluded ? 1 : 0;
        b.opacity += (targetOpacity - b.opacity) * (hasActiveZones && !isExcluded ? 0.15 : 0.3);

        // =========================================================================
        // PERPETUAL FLIGHT: BUTTERFLIES NEVER REST OR LAND
        // =========================================================================
        if (b.state === "perched" || b.state === "landing") {
          triggerTakeoff(b);
          return;
        }

        // =========================================================================
        // CONTINUOUS FREE FLIGHT & FLIGHT DYNAMICS (NO PERCHING)
        // =========================================================================

        // 1. MUTUAL REPULSION & TERRITORIAL SEPARATION
        let repulseX = 0;
        let repulseY = 0;

        butterfliesRef.current.forEach((other) => {
          if (other.id === b.id) return;
          const dist = Math.hypot(b.x - other.x, b.y - other.y);
          if (dist < MIN_SEPARATION_DISTANCE && dist > 0) {
            const normalizedOverlap = (MIN_SEPARATION_DISTANCE - dist) / MIN_SEPARATION_DISTANCE;
            const pushMagnitude = normalizedOverlap * normalizedOverlap * 4.5;
            repulseX += ((b.x - other.x) / dist) * pushMagnitude;
            repulseY += ((b.y - other.y) / dist) * pushMagnitude;
          }
        });

        // 2. NAVIGATION
        const distToTarget = Math.hypot(b.targetX - b.x, b.targetY - b.y);
        const isOffscreen = b.x < -80 || b.x > curW + 80 || b.y < -80 || b.y > curH + 80;

        if (isOffscreen) {
          b.offscreenTimer++;
          const isFarOut = b.x < -240 || b.x > curW + 240 || b.y < -240 || b.y > curH + 240;

          if ((isFarOut || b.offscreenTimer > 160) && hasActiveZones) {
            spawnFromOffscreen(b, butterfliesRef.current, curW, curH, zones, excludedZones);
          }
        } else {
          b.offscreenTimer = 0;
          if (
            distToTarget < 90 ||
            Math.random() < 0.008 ||
            !isInsideAnyTarget ||
            isInsideExcluded(b.targetX, b.targetY, excludedZones)
          ) {
            if (hasActiveZones) {
              const { targetX, targetY } = pickSeparatedTarget(
                b,
                butterfliesRef.current,
                curW,
                curH,
                zones,
                excludedZones,
              );
              b.targetX = targetX;
              b.targetY = targetY;
            }
          }
        }

        const dx = b.targetX - b.x;
        const dy = b.targetY - b.y;
        const targetHeading = Math.atan2(dy, dx) * (180 / Math.PI);

        // 3. LIVING CURSOR EVASION
        const mDist = Math.hypot(b.x - mousePos.current.x, b.y - mousePos.current.y);
        let fleeVx = 0;
        let fleeVy = 0;
        if (mDist < 120 && mDist > 0) {
          const fleeStrength = ((120 - mDist) / 120) * 3.2;
          fleeVx = ((b.x - mousePos.current.x) / mDist) * fleeStrength;
          fleeVy = ((b.y - mousePos.current.y) / mDist) * fleeStrength;
          if (b.state === "glide") {
            b.state = "burst";
            b.flapsTarget = spec.burstMax + 1;
            b.flapsInCurrentBurst = 0;
          }
        }

        // 4. FLIGHT STATE MACHINE
        if (b.state === "burst" || b.state === "takeoff") {
          b.altitude += (1.0 - b.altitude) * 0.08;
          b.strokeProgress += spec.flapFreq;

          if (b.strokeProgress >= 1.0) {
            b.strokeProgress = 0;
            b.flapsInCurrentBurst++;

            if (b.flapsInCurrentBurst >= b.flapsTarget) {
              b.state = "glide";
              b.glideTimer = 0;
              b.glideDuration = Math.floor(
                spec.glideDurMin + Math.random() * (spec.glideDurMax - spec.glideDurMin),
              );
            }
          }

          const p = b.strokeProgress;
          if (p < 0.46) {
            const downT = p / 0.46;
            const easeDown = (1 - Math.cos(downT * Math.PI)) / 2;
            b.wingDihedral = 68 - easeDown * 90; // 68° -> -22°

            const liftImpulse = Math.sin(downT * Math.PI) * spec.liftForce;
            b.heaveY = -liftImpulse * 1.1;
            b.surgeX = liftImpulse * 0.65;

            b.bodyPitch = Math.sin(downT * Math.PI) * 10;
            b.wingTwist = -Math.sin(downT * Math.PI) * 8;
          } else {
            const upT = (p - 0.46) / 0.54;
            const easeUp = (1 - Math.cos(upT * Math.PI)) / 2;
            b.wingDihedral = -22 + easeUp * 90; // -22° -> 68°

            b.heaveY = upT * 0.8;
            b.surgeX = -upT * 0.35;

            b.bodyPitch = -Math.sin(upT * Math.PI) * 6;
            b.wingTwist = Math.sin(upT * Math.PI) * 6;
          }

          b.bodyYawWobble = Math.sin(p * Math.PI * 2) * 3;
        } else if (b.state === "glide") {
          b.altitude += (1.05 - b.altitude) * 0.05;
          b.glideTimer++;
          const glideTargetDihedral = 19 + Math.sin(tick * 0.05 + b.seed) * 3;
          b.wingDihedral += (glideTargetDihedral - b.wingDihedral) * 0.08;
          b.wingTwist += (0 - b.wingTwist) * 0.08;

          b.heaveY = 0.2 + Math.sin(b.seed * 1.8) * 0.3;
          b.surgeX = 0;
          b.bodyPitch += (-2.5 - b.bodyPitch) * 0.06;
          b.bodyYawWobble *= 0.9;

          if (b.glideTimer >= b.glideDuration) {
            b.state = "burst";
            b.strokeProgress = 0;
            b.flapsInCurrentBurst = 0;
            b.flapsTarget = Math.floor(
              spec.burstMin + Math.random() * (spec.burstMax - spec.burstMin + 1),
            );
          }
        }

        // 5. ORGANIC AIR DRIFT & DISPLACEMENT
        const airDriftX = Math.cos(b.seed * 2.8 + tick * 0.015) * 0.7;
        const airDriftY = Math.sin(b.seed * 2.4 + tick * 0.012) * 0.8;

        const desiredVx =
          Math.cos((targetHeading * Math.PI) / 180) * b.cruiseSpeed + fleeVx + repulseX;
        const desiredVy =
          Math.sin((targetHeading * Math.PI) / 180) * b.cruiseSpeed + fleeVy + repulseY;

        b.vx += (desiredVx - b.vx) * 0.04;
        b.vy += (desiredVy - b.vy) * 0.04;

        const radHeading = (b.heading * Math.PI) / 180;
        const surgeDx = Math.cos(radHeading) * b.surgeX;
        const surgeDy = Math.sin(radHeading) * b.surgeX;

        b.x += b.vx + surgeDx + airDriftX;
        b.y += b.vy + surgeDy + b.heaveY + airDriftY;

        const instantMoveHeading =
          Math.atan2(b.vy + surgeDy + b.heaveY, b.vx + surgeDx + airDriftX) * (180 / Math.PI);

        let headingDiff = instantMoveHeading - b.heading;
        while (headingDiff < -180) headingDiff += 360;
        while (headingDiff > 180) headingDiff -= 360;
        b.heading += headingDiff * 0.08;

        const targetRoll = Math.max(-26, Math.min(26, headingDiff * 1.6));
        b.bodyRoll += (targetRoll - b.bodyRoll) * 0.09;
      });

      setFrame(tick);
      animFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animFrameId.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollTimeoutId) clearTimeout(scrollTimeoutId);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-[15] overflow-hidden select-none"
      style={{
        perspective: "1200px",
      }}
    >
      {butterfliesRef.current.map((b) => {
        if (b.opacity <= 0.01) return null;
        const config = REAL_BUTTERFLIES[b.species];
        const isPerched = b.state === "perched";
        const isLanding = b.state === "landing";
        const scaledSize = b.size * b.altitude;

        // Ground contact shadow in 3D perspective
        const wingSpanRatio = Math.max(0.18, Math.cos((b.wingDihedral * Math.PI) / 180));
        const shadowDist = isPerched ? 2 : 18 * b.altitude;
        const shadowBlur = isPerched ? 1.5 : Math.round(6 * b.altitude);
        const shadowOpacity = isPerched ? 0.55 * b.opacity : 0.28 * b.opacity;

        return (
          <div
            key={b.id}
            onClick={() => {
              if (isPerched || isLanding) {
                triggerTakeoff(b);
              }
            }}
            className={`absolute top-0 left-0 will-change-transform transition-opacity duration-150 ${
              isPerched ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
            }`}
            style={{
              transform: `translate3d(${b.x - scaledSize / 2}px, ${b.y - scaledSize / 2}px, 0)`,
              width: `${scaledSize}px`,
              height: `${scaledSize}px`,
              opacity: b.opacity,
            }}
          >
            {/* 3D CONTACT SHADOW: Anchors butterfly tightly onto text or component */}
            <div
              className="absolute inset-0 pointer-events-none will-change-transform"
              style={{
                transform: isPerched
                  ? `translate3d(2px, 8px, 0) rotate(${b.heading + 90}deg) scaleX(0.24) scaleY(0.7)`
                  : `translate3d(${shadowDist * 0.65}px, ${shadowDist * 1.1}px, 0) rotate(${b.heading + 90}deg) scaleX(${wingSpanRatio * 0.85}) scaleY(0.85)`,
                opacity: shadowOpacity,
                filter: `blur(${shadowBlur}px)`,
              }}
            >
              <img
                src={config.full}
                alt=""
                className="w-full h-full object-contain brightness-0 contrast-200"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* 3D BUTTERFLY BODY & ARTICULATED REAL PHOTOGRAPHIC WINGS */}
            <div
              className="relative w-full h-full flex items-center justify-center pointer-events-none will-change-transform"
              style={{
                transform: `rotate(${b.heading + 90 + b.bodyYawWobble}deg) rotateX(${b.bodyPitch}deg) rotateY(${b.bodyRoll}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* 3D ARTICULATED THORACIC LEGS (Visible in 3D side view when perched) */}
              {isPerched && (
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  style={{
                    transform: "translateZ(-3px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Left Leg Grip */}
                  <div
                    className="absolute w-[1.5px] h-[7px] bg-[#1a1815] rounded-full"
                    style={{
                      top: "52%",
                      left: "46%",
                      transform: "rotate(32deg)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.6)",
                    }}
                  />
                  {/* Right Leg Grip */}
                  <div
                    className="absolute w-[1.5px] h-[7px] bg-[#1a1815] rounded-full"
                    style={{
                      top: "52%",
                      left: "54%",
                      transform: "rotate(-32deg)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.6)",
                    }}
                  />
                  {/* Rear Support Leg */}
                  <div
                    className="absolute w-[1.2px] h-[8px] bg-[#221f1a] rounded-full"
                    style={{
                      top: "58%",
                      left: "50%",
                      transform: "rotate(18deg)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.6)",
                    }}
                  />
                </div>
              )}

              {/* REAL SPECIMEN BODY (Head, Thorax, Abdomen, Antennae) */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                style={{
                  transformStyle: "preserve-3d",
                  filter: isPerched ? "drop-shadow(0 2px 3px rgba(0,0,0,0.5))" : undefined,
                }}
              >
                <img
                  src={config.body}
                  alt={config.name}
                  className="w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* REAL LEFT WING: Smooth 3D dihedral, side-view lighting and aerodynamic camber */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  transformOrigin: "50% 50%",
                  transform: `rotateY(${b.wingDihedral}deg) rotateZ(${b.wingDihedral * 0.07}deg) rotateX(${b.wingTwist}deg)`,
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  filter:
                    isPerched && b.perchSpot?.side === "left"
                      ? "brightness(0.92) contrast(1.05)"
                      : undefined,
                }}
              >
                <img
                  src={config.left}
                  alt=""
                  className="w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* REAL RIGHT WING: Symmetrical 3D dihedral & 3D side profile lighting */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  transformOrigin: "50% 50%",
                  transform: `rotateY(${-b.wingDihedral}deg) rotateZ(${-b.wingDihedral * 0.07}deg) rotateX(${b.wingTwist}deg)`,
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  filter:
                    isPerched && b.perchSpot?.side === "right"
                      ? "brightness(1.08) contrast(1.05)"
                      : isPerched
                        ? "brightness(0.88)"
                        : undefined,
                }}
              >
                <img
                  src={config.right}
                  alt=""
                  className="w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
