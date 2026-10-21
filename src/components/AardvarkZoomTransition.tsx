import React, { createContext, useCallback, useContext, useState, useRef, useEffect } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Register CustomEase and exact Aardvark curves from slater.app/18601/54937.js
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  try {
    CustomEase.create("energy", "M0,0 C0.32,0.72 0,1 1,1");
    CustomEase.create("path-ease", "0.78, 0.18, 0.18, 1");
    CustomEase.create("osmo", "0.625, 0.05, 0, 1");
  } catch {
    // ignore if already registered
  }
}

interface TransitionContextType {
  triggerZoomTransition: (targetPath?: string, callback?: () => void) => void;
  triggerOpeningAnimation: () => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  triggerZoomTransition: () => {},
  triggerOpeningAnimation: () => {},
  isTransitioning: false,
});

export const useAardvarkTransition = () => useContext(TransitionContext);

// Exact SVG Path extracted directly from https://www.aardvarkbookclub.com data-transition-wrap
const TRANSITION_PATH =
  "M66.858-19C57.597 196.452 127.164 482.585 206.5 464.5c125.428-28.592 52.293-293.51 200.001-339 568.234-175-241.425 712.6 15.5 803.02C645 1007 629.398 499 810.5 499c113.398 0 106.54 189.465 164.235 429.52 48.005 199.72 89.415 213.09 105.265 173.78";

// Exact Aardvark transition logo badge paths from aardvarkbookclub.com
function TransitionLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 300 300"
      className="w-full h-full text-white"
    >
      {/* Aardvark Mascot Silhouette */}
      <path
        fill="currentColor"
        d="m199.994 209.658-36.789-82.687c4.7-11.517 16.632-47.147 4.249-91.594a3.17 3.17 0 0 0-2.26-2.25c-1.085-.27-2.26 0-3.073.9-.362.45-9.943 10.167-16.903 23.214-9.672 17.995-9.491 33.2.452 44.177 10.937 11.967 11.479 20.334 10.846 24.113l-2.079.18c-3.705-7.917-16.089-30.231-46.912-51.825-.813-.54-1.807-.63-2.621-.27-.904.36-1.446 1.26-1.536 2.16-1.176 14.395 2.711 42.377 25.851 45.796 14.553 2.16 19.434 6.299 20.97 8.008-.452 3.059-1.536 7.018-3.706 12.147l-27.297 62.442h-.091c-.09.36-.271.72-.452 1.08l-.361.72c-4.339 9.267-19.976 25.373-26.213 31.671-1.537 1.619-2.621 2.699-2.983 3.149-.361.45-1.446 2.159.633 4.409 2.892 3.149 11.931 7.108 16.179 4.139 1.266-.9 1.989-1.8 2.803-2.88 2.35-3.059 15.004-17.095 35.342-34.73 0 0 6.598-8.188 16.631-9.447h6.056c4.52 0 8.135 1.079 10.214 5.668l3.345 7.648c3.163 7.288 3.163 11.247-7.502 12.956v4.859h43.658v-4.679c-8.859-1.619-10.757-6.478-16.451-19.074m-49.624-27.263c-4.7 0-8.587-3.779-8.587-8.547 0-4.679 3.796-8.548 8.587-8.548 4.7 0 8.587 3.779 8.587 8.548 0 4.678-3.887 8.547-8.587 8.547"
      />
      {/* Outer circular badge */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M153.456 0C238.208 0 300 69.006 300 154.128 300 239.251 238.208 300 153.456 300 68.705 300 0 239.251 0 154.128 0 69.006 68.705 0 153.456 0m85.715 58.863c-51.815-50.528-135.876-51.577-186.636 0S7.633 188.921 59.447 239.45c51.814 50.526 138.641 59.833 189.401 8.256s42.137-138.316-9.677-188.843"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface TransitionOverlayProps {
  mode: "full" | "enter-only";
  onMidpoint?: () => void;
  onComplete?: () => void;
}

function TransitionOverlay({ mode, onMidpoint, onComplete }: TransitionOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const solidBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pathEl = pathRef.current;
    const logoEl = logoRef.current;
    const solidBgEl = solidBgRef.current;
    if (!pathEl || !logoEl) return;

    // Native exact path length calculation matching DrawSVGPlugin
    const totalLength = pathEl.getTotalLength() || 3387.42;

    // Mathematical implementation of DrawSVGPlugin: drawSVG(start%, end%) & strokeWidth%
    const updateDraw = (startPct: number, endPct: number, strokeWidthPct: number) => {
      const s = (Math.max(0, Math.min(100, startPct)) / 100) * totalLength;
      const e = (Math.max(0, Math.min(100, endPct)) / 100) * totalLength;
      const dashLength = Math.max(0, e - s);
      const dashOffset = -s;

      pathEl.style.strokeDasharray = `${dashLength}px ${totalLength * 2}px`;
      pathEl.style.strokeDashoffset = `${dashOffset}px`;

      // 1080 viewBox: stroke width in px
      const px = (strokeWidthPct / 100) * 1080;
      pathEl.style.strokeWidth = `${px}px`;
      pathEl.setAttribute("stroke-width", `${px}px`);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      if (mode === "enter-only") {
        // =========================================================================
        // EXACT REPLICA OF runPageOnceAnimation FROM slater.app/18601/54937.js
        // =========================================================================
        const drawState = {
          start: 0,
          end: 100,
          strokeWidth: 70,
        };

        // 1. Initial State: Screen covered in solid purple, Logo hidden
        updateDraw(0, 100, 70);
        gsap.set(logoEl, {
          scale: 0,
          rotate: -64,
          opacity: 0,
        });
        if (solidBgEl) {
          gsap.set(solidBgEl, { opacity: 1 });
        }

        // 2. Mascot Logo springs in with elastic ease from -64deg to 0deg
        tl.to(
          logoEl,
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            delay: 0.05,
            duration: 0.65,
            ease: "elastic.out(1, 0.72)",
          },
          "start",
        );

        // 3. Mascot Logo spins clockwise to 64deg and shrinks down
        tl.to(
          logoEl,
          {
            scale: 0,
            rotate: 64,
            opacity: 0,
            delay: 0.5,
            duration: 0.6,
            ease: "elastic.in(1, 0.72)",
          },
          "start",
        );

        // 4. Fade solid backing just as stroke sweep starts (at 0.65s)
        if (solidBgEl) {
          tl.to(
            solidBgEl,
            {
              opacity: 0,
              duration: 0.2,
              ease: "power1.out",
            },
            "start+=0.65",
          );
        }

        // 5. Purple snake curve thins to 8% and sweeps off (start: 0% -> 100%)
        tl.to(
          drawState,
          {
            strokeWidth: 8,
            duration: 1.1875, // 95% of 1.25s
            delay: 0.65,
            ease: "circ.out",
            onUpdate: () => updateDraw(drawState.start, drawState.end, drawState.strokeWidth),
          },
          "start",
        );

        tl.to(
          drawState,
          {
            start: 100,
            duration: 1.25,
            delay: 0.65,
            ease: "power2.inOut",
            onUpdate: () => updateDraw(drawState.start, drawState.end, drawState.strokeWidth),
          },
          "start",
        );
      } else {
        // =========================================================================
        // EXACT REPLICA OF runPageLeaveAnimation & runPageEnterAnimation
        // =========================================================================
        const drawState = {
          start: 0,
          end: 0,
          strokeWidth: 8,
        };

        // Initial setup
        updateDraw(0, 0, 8);
        gsap.set(logoEl, {
          scale: 0,
          rotate: -64,
          opacity: 0,
        });
        if (solidBgEl) {
          gsap.set(solidBgEl, { opacity: 0 });
        }

        // --- 1. LEAVE PHASE (Duration: 1.25s) ---
        tl.to(
          drawState,
          {
            end: 100,
            duration: 1.125, // reaches 100% draw around 90% of 1.25s
            ease: "power2.inOut",
            onUpdate: () => updateDraw(drawState.start, drawState.end, drawState.strokeWidth),
          },
          "startLeave",
        );

        tl.to(
          drawState,
          {
            strokeWidth: 70,
            duration: 1.06,
            delay: 0.19,
            ease: "power2.in",
            onUpdate: () => updateDraw(drawState.start, drawState.end, drawState.strokeWidth),
          },
          "startLeave",
        );

        tl.to(
          logoEl,
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            delay: 0.5,
            duration: 0.65,
            ease: "elastic.out(1, 0.72)",
          },
          "startLeave",
        );

        // --- 2. MIDPOINT (Content/Route Swap at 1.25s) ---
        tl.add(() => {
          if (onMidpoint) onMidpoint();
        }, "startLeave+=1.25");

        // --- 3. ENTER PHASE (Duration: 1.25s) ---
        tl.to(
          logoEl,
          {
            scale: 0,
            rotate: 64,
            opacity: 0,
            duration: 0.45,
            ease: "elastic.in(1, 0.72)",
          },
          "startEnter",
        );

        tl.to(
          drawState,
          {
            strokeWidth: 8,
            duration: 1.18,
            ease: "circ.out",
            onUpdate: () => updateDraw(drawState.start, drawState.end, drawState.strokeWidth),
          },
          "startEnter",
        );

        tl.to(
          drawState,
          {
            start: 100,
            duration: 1.25,
            ease: "power2.inOut",
            onUpdate: () => updateDraw(drawState.start, drawState.end, drawState.strokeWidth),
          },
          "startEnter",
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mode, onMidpoint, onComplete]);

  return (
    <div
      ref={containerRef}
      data-transition-wrap=""
      className="transition fixed inset-0 z-[999999] flex items-center justify-center pointer-events-none overflow-hidden"
    >
      {/* Underlying Solid Background to prevent any initial pixel flash */}
      <div
        ref={solidBgRef}
        className="absolute inset-0 w-full h-full bg-[#3b308f]"
        style={{ pointerEvents: "none" }}
      />

      {/* The Iconic Aardvark SVG Snake Shape */}
      <div
        className="transition__shape absolute inset-0 w-full h-full text-[#3b308f]"
        style={{ color: "#3b308f" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1080 1080"
          fill="none"
          preserveAspectRatio="none"
          className="transition__svg absolute top-[-10%] left-[-65%] w-[230%] h-[120%]"
        >
          <path
            ref={pathRef}
            d={TRANSITION_PATH}
            stroke="currentColor"
            strokeWidth="70%"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Center Elastic Rotating Aardvark Mascot Logo */}
      <div
        ref={logoRef}
        data-load-reset=""
        data-transition-logo=""
        className="transition__logo absolute z-10 w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 flex items-center justify-center drop-shadow-2xl"
        style={{
          transformOrigin: "center center",
        }}
      >
        <TransitionLogo />
      </div>
    </div>
  );
}

export function AardvarkTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Disabled initial transition so homepage loads directly without an opening animation
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMode, setTransitionMode] = useState<"full" | "enter-only">("enter-only");
  const [transitionKey, setTransitionKey] = useState(0);
  const pendingCallbackRef = useRef<(() => void) | undefined>(undefined);

  const executeTransition = useCallback((mode: "full" | "enter-only", callback?: () => void) => {
    pendingCallbackRef.current = callback;
    setTransitionMode(mode);
    setIsTransitioning(true);
    setTransitionKey((k) => k + 1);
  }, []);

  const triggerZoomTransition = useCallback(
    (targetPath?: string, callback?: () => void) => {
      if (targetPath && targetPath !== currentPath) {
        executeTransition("full", () => {
          router.navigate({ to: targetPath });
          if (callback) callback();
        });
      } else {
        executeTransition("full", callback);
      }
    },
    [currentPath, router, executeTransition],
  );

  const triggerOpeningAnimation = useCallback(() => {
    executeTransition("enter-only");
  }, [executeTransition]);

  const handleMidpoint = useCallback(() => {
    if (pendingCallbackRef.current) {
      pendingCallbackRef.current();
      pendingCallbackRef.current = undefined;
    }
  }, []);

  const handleComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        triggerZoomTransition,
        triggerOpeningAnimation,
        isTransitioning,
      }}
    >
      {children}
      {isTransitioning && (
        <TransitionOverlay
          key={transitionKey}
          mode={transitionMode}
          onMidpoint={handleMidpoint}
          onComplete={handleComplete}
        />
      )}
    </TransitionContext.Provider>
  );
}
