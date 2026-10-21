import React from "react";
import { ArrowRight, Compass } from "lucide-react";

export interface Destination {
  id: number;
  location: string;
  title: string;
  desc: string;
  image: string;
}

export const destinations: Destination[] = [
  {
    id: 1,
    location: "Switzerland Alps",
    title: "SAINT ANTÖNIEN",
    desc: "Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2560",
  },
  {
    id: 2,
    location: "Japan Alps",
    title: "NAGANO PREFECTURE",
    desc: "Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2560",
  },
  {
    id: 3,
    location: "Sahara Desert · Morocco",
    title: "MARRAKECH MERZOUGA",
    desc: "Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero.",
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?q=80&w=2560",
  },
];

// Carousel queue showing remaining cards that slide to the left
export const queueCards = [
  { ...destinations[1], queueId: "q-1-0", targetIndex: 1 }, // Nagano
  { ...destinations[2], queueId: "q-2-0", targetIndex: 2 }, // Marrakech
  { ...destinations[0], queueId: "q-0-1", targetIndex: 0 }, // Saint Antönien
  { ...destinations[1], queueId: "q-1-1", targetIndex: 1 }, // Nagano
  { ...destinations[2], queueId: "q-2-1", targetIndex: 2 }, // Marrakech
];

interface DestinationSliderProps {
  onNavigateToDestination?: (index: number) => void;
  onCardHover?: (index: number) => void;
}

export default function DestinationSlider({
  onNavigateToDestination,
  onCardHover,
}: DestinationSliderProps) {
  return (
    <div className="relative w-full h-[100svh] bg-[#050505] overflow-hidden font-sans select-none">
      {/* ========================================== */}
      {/* LAYER 1: Base Background (Destination 0) */}
      {/* ========================================== */}
      <div
        className="dest-bg-0 absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <img
          src={destinations[0].image}
          alt={destinations[0].title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
      </div>

      {/* ========================================== */}
      {/* LAYER 2: Rectangular Card Zoom Layers (1 to 5) */}
      {/* ========================================== */}
      {destinations.slice(1).map((item, i) => {
        const destIndex = i + 1; // 1 to 5
        return (
          <div
            key={item.id}
            className={`dest-zoom-${destIndex} absolute overflow-hidden shadow-2xl pointer-events-none will-change-transform`}
            style={{
              zIndex: destIndex + 2,
              left: "52vw",
              top: "50%",
              transform: "translate(0, -50%)",
              width: "200px",
              height: "280px",
              borderRadius: "20px",
              opacity: 0,
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Cinematic dark overlay that fades in as it becomes the full-screen background */}
            <div
              className={`dest-overlay-${destIndex} absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/20 opacity-0 pointer-events-none`}
            />
            <div
              className={`dest-overlay2-${destIndex} absolute inset-0 bg-black/20 mix-blend-multiply opacity-0 pointer-events-none`}
            />

            {/* The exact content of the queue card, which will fade out as the card zooms to full screen */}
            <div className={`dest-zoom-content-${destIndex} absolute inset-0 pointer-events-none`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white/80">
                0{destIndex + 1}
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/70 text-[9px] tracking-[0.15em] uppercase font-mono mb-1 line-clamp-1">
                  {item.location.split("·")[0]}
                </p>
                <h4 className="text-white text-xs md:text-sm font-bold leading-tight line-clamp-2 uppercase">
                  {item.title}
                </h4>
              </div>
            </div>
          </div>
        );
      })}

      {/* ========================================== */}
      {/* LAYER 3: Left Typography Stack */}
      {/* ========================================== */}
      <div className="absolute inset-0 z-20 flex items-center px-6 md:px-[6vw] pointer-events-none">
        <div className="w-full md:w-[48vw] max-w-xl relative h-[450px]">
          {destinations.map((item, index) => (
            <div
              key={item.id}
              className={`dest-text dest-text-${index} absolute top-1/2 -translate-y-1/2 left-0 w-full pointer-events-auto transition-opacity duration-300`}
              style={{
                opacity: index === 0 ? 1 : 0,
                transform: index === 0 ? "translateY(0px)" : "translateY(30px)",
                pointerEvents: index === 0 ? "auto" : "none",
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono mb-4">
                <Compass className="w-3.5 h-3.5 text-[#e07a5f]" />
                <span>{item.location}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5vw] font-display font-bold leading-[0.88] uppercase text-white tracking-tight drop-shadow-2xl mb-6">
                {item.title}
              </h1>

              <p className="text-stone-300/90 text-sm md:text-base leading-relaxed max-w-md font-light mb-8 drop-shadow">
                {item.desc}
              </p>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const nextIndex = (index + 1) % destinations.length;
                    onNavigateToDestination?.(nextIndex);
                  }}
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/40 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 text-xs tracking-[0.2em] uppercase font-semibold group cursor-pointer shadow-lg hover:shadow-white/10"
                >
                  <span>Discover Location</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-[11px] font-mono tracking-widest text-white/50 uppercase">
                  № 0{index + 1} / 0{destinations.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* LAYER 4: Interactive Carousel Queue (Right Side) */}
      {/* ========================================== */}
      <div className="dest-carousel-container absolute top-1/2 -translate-y-1/2 left-[46vw] md:left-[52vw] right-0 z-30 pointer-events-auto overflow-visible">
        <div className="dest-carousel-track flex items-center gap-4 md:gap-6 will-change-transform">
          {queueCards.map((card, queueIdx) => (
            <div
              key={card.queueId}
              onClick={() => onNavigateToDestination?.(card.targetIndex)}
              onMouseEnter={() => onCardHover?.(card.targetIndex)}
              className={`dest-queue-card dest-queue-card-${queueIdx} relative w-[160px] h-[230px] md:w-[200px] md:h-[280px] rounded-[20px] overflow-hidden shrink-0 shadow-2xl border border-white/20 bg-stone-900 cursor-pointer group hover:scale-[1.05] hover:border-white/80 transition-all duration-300`}
              style={{
                borderRadius: "20px",
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark gradient on the card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

              {/* Badge */}
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white/80">
                0{card.targetIndex + 1}
              </div>

              {/* Info on Card */}
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <p className="text-white/70 text-[9px] tracking-[0.15em] uppercase font-mono mb-1 line-clamp-1">
                  {card.location.split("·")[0]}
                </p>
                <h4 className="text-white text-xs md:text-sm font-bold leading-tight line-clamp-2 uppercase">
                  {card.title}
                </h4>
              </div>

              {/* Hover indicator overlay */}
              <div className="absolute inset-0 rounded-[20px] ring-1 ring-white/20 group-hover:ring-white/90 transition-all pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
