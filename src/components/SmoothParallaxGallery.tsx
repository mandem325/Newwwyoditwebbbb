import React from "react";

const data = [
  {
    title: "Green Cityscape",
    text: "Vibrant streets with vertical gardens and solar buildings. This oasis thrives on renewable energy, smart transport, and green spaces for biodiversity.",
    img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200",
    bg: "bg-[#f4f7ee]",
    btn: "bg-[#d1f4a9]",
  },
  {
    title: "Blue Urban Oasis",
    text: "Avenues with azure facades and eco-structures. This hub uses clean energy, smart transit, and parks for urban wildlife.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    bg: "bg-[#eaf4fc]",
    btn: "bg-[#bae1ff]",
  },
  {
    title: "Fluid Architecture",
    text: "Desert refuge with fluid architecture and glowing interiors. This sanctuary harnesses solar power, sustainable design, and natural harmony for resilient living.",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
    bg: "bg-[#fbe9e7]",
    btn: "bg-[#ffcccb]",
  },
  {
    title: "Martian Arches",
    text: "Ethereal structures arc over tranquil waters, bathed in the glow of a setting Martian sun. This desolate beauty showcases the stark, captivating landscape of the red planet.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
    bg: "bg-[#fdf3e7]",
    btn: "bg-[#fed8b1]",
  },
];

export default function SmoothParallaxGallery() {
  return (
    <div className="w-full">
      {data.map((item, i) => (
        <div key={i} className={`flex flex-col md:flex-row w-full ${item.bg}`}>
          {/* Left Text (Sticky) */}
          <div className="w-full md:w-1/2 relative">
            <div className="md:sticky md:top-0 h-auto md:h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 md:py-0">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#111] mb-6 tracking-tight leading-[1.1]">
                {item.title}
              </h2>
              <p className="text-base md:text-lg text-[#333] mb-8 max-w-md leading-relaxed">
                {item.text}
              </p>
              <button
                className={`w-fit px-6 py-3 rounded-full flex items-center gap-3 text-[#111] font-semibold text-sm transition-transform hover:scale-105 ${item.btn}`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#111]"></span> Learn More
              </button>
            </div>
          </div>

          {/* Right Image (Scrolling) */}
          <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-24 flex items-center justify-center">
            <div className="w-full h-[60vh] md:h-[120vh] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl">
              <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
