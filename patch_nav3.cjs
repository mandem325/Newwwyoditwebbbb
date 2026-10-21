const fs = require("fs");
let content = fs.readFileSync("src/routes/index.tsx", "utf8");

// Ensure pointer-events are correct due to mix-blend on the entire nav.
// The mix-blend-difference is applied to `nav`. We should apply `pointer-events-none` to the nav container so we don't block clicks in the gap spaces,
// and `pointer-events-auto` to the interactable children.
content = content.replace(
  'className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 transition-all duration-300 py-4 mix-blend-difference text-white"',
  'className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 transition-all duration-300 py-4 mix-blend-difference text-white pointer-events-none"',
);

// add pointer-events-auto to logo link
content = content.replace(
  '<a suppressHydrationWarning href="#top" className="flex items-center gap-3">',
  '<a suppressHydrationWarning href="#top" className="flex items-center gap-3 pointer-events-auto">',
);

// add pointer-events-auto to center menu
content = content.replace(
  'className="hidden lg:flex items-center gap-0 lg:gap-0.5 border border-white/20 rounded-full p-1 relative transition-all duration-300"',
  'className="hidden lg:flex items-center gap-0 lg:gap-0.5 border border-white/20 rounded-full p-1 relative transition-all duration-300 pointer-events-auto"',
);

// add pointer-events-auto to right button container
content = content.replace(
  '<div suppressHydrationWarning className="flex items-center gap-3">',
  '<div suppressHydrationWarning className="flex items-center gap-3 pointer-events-auto">',
);

fs.writeFileSync("src/routes/index.tsx", content);
console.log("Nav pointer-events patched");
