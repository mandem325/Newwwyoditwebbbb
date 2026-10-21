const fs = require("fs");

let content = fs.readFileSync("src/routes/index.tsx", "utf8");

// Replace bg-[#0b0806] in Hero
content = content.replace(
  'className="relative min-h-[calc(100svh+24px)] md:min-h-[calc(100svh+40px)] w-full flex items-center justify-center overflow-hidden bg-[#0b0806] pt-14 md:pt-0 pb-[24px] md:pb-[40px] rounded-b-[24px] md:rounded-b-[40px] z-10"',
  'className="relative min-h-[calc(100svh+24px)] md:min-h-[calc(100svh+40px)] w-full flex items-center justify-center overflow-hidden pt-14 md:pt-0 pb-[24px] md:pb-[40px] rounded-b-[24px] md:rounded-b-[40px] z-10"',
);

// Replace bg-[#0b0806] in Footer
content = content.replace(
  'className="relative bg-[#0b0806] text-[#ebd5c5] overflow-visible pt-32 pb-8 px-6 md:px-12 z-50 min-h-[90vh] flex flex-col justify-between"',
  'className="relative text-[#ebd5c5] overflow-visible pt-32 pb-8 px-6 md:px-12 z-50 min-h-[90vh] flex flex-col justify-between"',
);

fs.writeFileSync("src/routes/index.tsx", content);
console.log("Patched background colors to make them transparent where needed.");
