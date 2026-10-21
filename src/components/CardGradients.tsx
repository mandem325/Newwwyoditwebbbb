export default function CardGradients() {
  return (
    <>
      {/* Luxurious Translucent Gradient Background Layers (Field, Mesh, Cropped Radial, Conic/Type) */}
      {/* Field Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/45 via-white/20 to-stone-100/10 z-0" />
      <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/[0.08] via-transparent to-ochre-500/[0.08] z-0 pointer-events-none mix-blend-multiply" />

      {/* Meshy Gradients (multiple overlapping radials) */}
      <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_20%_30%,rgba(163,230,53,0.1),transparent_40%)] z-0 pointer-events-none mix-blend-overlay" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_80%_70%,rgba(193,92,61,0.1),transparent_40%)] z-0 pointer-events-none mix-blend-overlay" />

      {/* Cropped Radials (positioned out of bounds) */}
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.15)_0%,transparent_70%)] blur-3xl z-0 pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[radial-gradient(ellipse,rgba(193,92,61,0.15)_0%,transparent_70%)] blur-3xl z-0 pointer-events-none" />

      {/* Type Gradients (Conic/Linear overlays) */}
      <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%,rgba(255,255,255,0.1)_100%)] z-0 pointer-events-none opacity-40 mix-blend-overlay" />
    </>
  );
}
