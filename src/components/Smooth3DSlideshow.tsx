import { useState, useEffect, useCallback, useRef, type CSSProperties } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export interface Slide {
  image?: { src?: string; srcSet?: string; alt?: string };
  video?: string; // Standard video path or URL (e.g. mp4)
  embedUrl?: string; // YouTube/Vimeo embed url
  title?: string;
  category?: string;
  description?: string;
}

type AutoplayDir = "leftToRight" | "rightToLeft";
type TitleCorner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface Smooth3DSlideshowProps {
  slides?: Slide[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tilt?: number;
  sideTilt?: number;
  gap?: number;
  opacity?: number;
  transition?: {
    type?: string;
    duration?: number;
    delay?: number;
    ease?: number[] | string;
  };
  autoplay?: boolean;
  autoplayDirection?: AutoplayDir;
  showTitle?: boolean;
  titleFont?: CSSProperties;
  titleColor?: string;
  titlePosition?: {
    position?: TitleCorner;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
  style?: CSSProperties;
}

const PERSPECTIVE = 1600;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 240;

function cssTransition(
  t:
    | {
        duration?: number;
        delay?: number;
        ease?: number[] | string;
      }
    | undefined,
): { dur: number; ease: string } {
  const dur = t && typeof t.duration === "number" ? t.duration : 0.6;
  let ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const e = t?.ease;
  if (Array.isArray(e) && e.length === 4) {
    ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
  } else if (typeof e === "string") {
    const map: Record<string, string> = {
      linear: "linear",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
    };
    ease = map[e] || "ease";
  }
  return { dur, ease };
}

export default function Smooth3DSlideshow(props: Smooth3DSlideshowProps) {
  const {
    slides = [],
    cardWidth = 500,
    cardHeight = 340,
    radius = 12,
    tilt = 12,
    sideTilt = 8,
    gap = 8,
    opacity = 60,
    transition = {
      type: "tween",
      duration: 0.6,
      delay: 3.5,
      ease: [0.22, 1, 0.36, 1],
    },
    autoplay = false,
    autoplayDirection = "rightToLeft",
    showTitle = true,
    titleColor = "#ffffff",
    titlePosition,
    style,
  } = props;

  const tp = titlePosition || {};
  const corner: TitleCorner = tp.position || "bottomLeft";
  const isTop = corner === "topLeft" || corner === "topRight";
  const isRight = corner === "topRight" || corner === "bottomRight";
  const padLeft = tp.paddingLeft ?? 24;
  const padRight = tp.paddingRight ?? 24;
  const padTop = tp.paddingTop ?? 24;
  const padBottom = tp.paddingBottom ?? 24;

  const n = slides.length;
  const loop = true;
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({});
  const [isMuted, setIsMuted] = useState(true);

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActive((a) => Math.max(0, Math.min(n - 1, a)));
  }, [n]);

  // Handle playing/pausing of active video slide
  useEffect(() => {
    // Pause all other videos
    Object.keys(videoRefs.current).forEach((key) => {
      const idx = parseInt(key);
      const v = videoRefs.current[idx];
      if (v) {
        if (idx === active) {
          v.play().catch(() => {});
          setIsPlaying((prev) => ({ ...prev, [idx]: true }));
        } else {
          v.pause();
          v.currentTime = 0;
          setIsPlaying((prev) => ({ ...prev, [idx]: false }));
        }
      }
    });
  }, [active]);

  const moveDur = transition?.duration ?? 0.6;
  const lockRef = useRef(false);

  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(
      () => {
        lockRef.current = false;
      },
      Math.max(50, moveDur * 1000),
    );
  }, [moveDur]);

  const step = useCallback(
    (dir: number) => {
      if (lockRef.current) return;
      lock();
      setActive((a) => (((a + dir) % n) + n) % n);
    },
    [n, lock],
  );

  const handleCardClick = useCallback(
    (i: number) => {
      if (autoplay || lockRef.current) return;
      lock();
      setActive((a) => (i === a ? (a + 1) % n : i));
    },
    [autoplay, n, lock],
  );

  // Toggle video play state manually
  const togglePlay = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    const v = videoRefs.current[idx];
    if (v) {
      if (v.paused) {
        v.play().catch(() => {});
        setIsPlaying((prev) => ({ ...prev, [idx]: true }));
      } else {
        v.pause();
        setIsPlaying((prev) => ({ ...prev, [idx]: false }));
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    Object.values(videoRefs.current).forEach((v) => {
      if (v) {
        v.muted = !isMuted;
      }
    });
  };

  const delay = transition?.delay ?? 3.5;
  useEffect(() => {
    if (!autoplay || n < 2) return;
    const ms = Math.max(0.3, delay) * 1000;
    const dir = autoplayDirection === "leftToRight" ? -1 : 1;
    const id = window.setInterval(() => step(dir), ms);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayDirection, delay, n, step]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    },
    [step],
  );

  const { dur, ease } = cssTransition(transition);
  const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`;

  const effectiveRadius = (Math.max(0, Math.min(20, radius)) / 20) * 24;
  const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100;

  const rootStyle: CSSProperties = {
    ...(style || {}),
    position: "relative",
    width: "100%",
    height: "100%",
    minWidth: 320,
    minHeight: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    perspective: `${PERSPECTIVE}px`,
    overflow: "hidden",
    outline: "none",
  };

  if (!mounted) {
    return (
      <div
        style={{
          ...(style || {}),
          position: "relative",
          width: "100%",
          height: "100%",
          minWidth: 320,
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      />
    );
  }

  return (
    <div
      style={rootStyle}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
      className="select-none"
      suppressHydrationWarning={true}
    >
      <div
        style={{
          position: "relative",
          width: cardWidth,
          height: cardHeight,
          transformStyle: "preserve-3d",
        }}
        suppressHydrationWarning={true}
      >
        {slides.map((slide, i) => {
          let rel = i - active;
          if (loop) {
            if (rel > n / 2) rel -= n;
            if (rel < -n / 2) rel += n;
          }
          const ax = Math.abs(rel);
          const visible = ax <= MAX_VISIBLE;
          const isActive = rel === 0;
          const sc = Math.max(0.4, 1 - ax * SCALE_STEP);
          const tx = rel * (gap * 30);
          const tz = -ax * DEPTH;
          const ry = -rel * tilt;
          const rz = rel * sideTilt;
          const src = slide.image?.src || "";
          const videoSrc = slide.video;
          const embedUrl = slide.embedUrl;

          const cardStyle: CSSProperties = {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: cardWidth,
            height: cardHeight,
            borderRadius: effectiveRadius,
            overflow: "hidden",
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
            transition: transitionCss,
            opacity: visible ? 1 : 0,
            cursor: autoplay || isActive ? "default" : "pointer",
            pointerEvents: visible && !autoplay ? "auto" : "none",
            backgroundColor: "#161616",
            boxShadow: isActive
              ? "0 25px 50px -12px rgba(0,0,0,0.8)"
              : "0 4px 6px -1px rgba(0,0,0,0.4)",
          };

          return (
            <div
              key={i}
              style={cardStyle}
              onClick={() => handleCardClick(i)}
              aria-label={slide.title}
              aria-hidden={!visible}
              className="border border-white/5 md:border-white/10 group/card"
              suppressHydrationWarning={true}
            >
              {/* Media Content */}
              {videoSrc ? (
                <div className="absolute inset-0 w-full h-full">
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={videoSrc}
                    playsInline
                    loop
                    muted={isMuted}
                    preload="auto"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {isActive && (
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                      <button
                        onClick={(e) => togglePlay(e, i)}
                        className="w-9 h-9 rounded-full bg-black/60 hover:bg-lime backdrop-blur-md text-white hover:text-black flex items-center justify-center transition-all duration-200"
                      >
                        {isPlaying[i] ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="w-9 h-9 rounded-full bg-black/60 hover:bg-lime backdrop-blur-md text-white hover:text-black flex items-center justify-center transition-all duration-200"
                      >
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      </button>
                    </div>
                  )}
                </div>
              ) : embedUrl ? (
                <div className="absolute inset-0 w-full h-full">
                  {isActive ? (
                    <iframe
                      src={`${embedUrl}?autoplay=1&mute=1&loop=1&controls=0&playlist=${embedUrl.split("/").pop()?.split("?")[0]}`}
                      className="w-full h-full border-none pointer-events-none"
                      allow="autoplay; encrypted-media"
                      referrerPolicy="no-referrer"
                    />
                  ) : src ? (
                    <img
                      src={src}
                      alt={slide.title}
                      draggable={false}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-900 flex items-center justify-center">
                      <Play size={40} className="text-lime/60" />
                    </div>
                  )}
                </div>
              ) : src ? (
                <img
                  src={src}
                  alt={slide.image?.alt || slide.title || ""}
                  draggable={false}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    userSelect: "none",
                  }}
                  referrerPolicy="no-referrer"
                />
              ) : null}

              {/* Text overlays (for active card or on hover) */}
              {showTitle && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isTop
                        ? "linear-gradient(0deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)"
                        : "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
                      pointerEvents: "none",
                    }}
                    className="opacity-90 transition-opacity duration-300"
                    suppressHydrationWarning={true}
                  />

                  <div
                    style={{
                      position: "absolute",
                      left: padLeft,
                      right: padRight,
                      [isTop ? "top" : "bottom"]: isTop ? padTop : padBottom,
                      textAlign: isRight ? "right" : "left",
                      pointerEvents: "none",
                    }}
                    className="z-10"
                    suppressHydrationWarning={true}
                  >
                    {slide.category && (
                      <span className="inline-block text-[9px] font-mono tracking-widest text-lime uppercase mb-1 border border-lime/30 px-2 py-0.5 rounded">
                        {slide.category}
                      </span>
                    )}
                    <h5
                      style={{
                        color: titleColor,
                        textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                      }}
                      className="font-display text-xl md:text-2xl font-semibold tracking-tight leading-tight white-space-pre-line"
                      suppressHydrationWarning={true}
                    >
                      {slide.title}
                    </h5>
                    {slide.description && isActive && (
                      <p className="text-xs text-white/80 mt-1 font-sans line-clamp-2 max-w-sm transition-all duration-300">
                        {slide.description}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Darkening overlay for inactive cards */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#000000",
                  opacity: isActive ? 0 : dim,
                  transition: `opacity ${dur}s ${ease}`,
                  pointerEvents: "none",
                }}
                suppressHydrationWarning={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
