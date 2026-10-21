const fs = require("fs");

let content = fs.readFileSync("src/routes/index.tsx", "utf8");

// Replace nav class
content = content.replace(
  /className=\{`fixed top-0 left-0 right-0 z-50 px-5 md:px-8 transition-all duration-300 \$\{[\s\S]*?\}`\}/,
  'className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 transition-all duration-300 py-4 mix-blend-difference text-white"',
);

// Replace logo border
content = content.replace(
  /className=\{`w-9 h-9 rounded-full border backdrop-blur-md flex items-center justify-center font-display italic text-lg transition-all duration-300 \$\{[\s\S]*?\}`\}/,
  'className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center font-display italic text-lg transition-all duration-300"',
);

// Replace logo YODIT text
content = content.replace(
  /className=\{`text-\[11px\] tracking-\[0.2em\] font-medium transition-colors \$\{[\s\S]*?\}`\}/,
  'className="text-[11px] tracking-[0.2em] font-medium text-white"',
);

// Replace logo COMMUNITY STUDIO text
content = content.replace(
  /className=\{`text-\[10px\] tracking-\[0.25em\] transition-colors \$\{[\s\S]*?\}`\}/,
  'className="text-[10px] tracking-[0.25em] text-white/50"',
);

// Replace menu background
content = content.replace(
  /className=\{`hidden lg:flex items-center gap-0 lg:gap-0.5 backdrop-blur-xl border rounded-full p-1 relative transition-all duration-300 \$\{[\s\S]*?\}`\}/,
  'className="hidden lg:flex items-center gap-0 lg:gap-0.5 border border-white/20 rounded-full p-1 relative transition-all duration-300"',
);

// Replace active menu span
content = content.replace(
  /className=\{`absolute inset-0 rounded-full -z-10 \$\{[\s\S]*?\}`\}/,
  'className="absolute inset-0 rounded-full -z-10 bg-white/20"',
);

// Replace menu number (01, 02)
content = content.replace(
  /className=\{`hidden xl:inline font-mono text-\[10px\] transition-colors duration-200 \$\{[\s\S]*?\}`\}/,
  'className={`hidden xl:inline font-mono text-[10px] transition-colors duration-200 ${hoveredIdx === i ? "text-white" : "text-white/40"}`}',
);

// Replace menu text
content = content.replace(
  /className=\{`transition-colors duration-200 \$\{[\s\S]*?\}`\}/,
  'className={`transition-colors duration-200 ${hoveredIdx === i ? "text-white font-semibold" : "text-white/80"}`}',
);

// Replace Let's talk button
content = content.replace(
  /className="group flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-foreground text-background text-xs font-medium tracking-wider uppercase cursor-pointer"/,
  'className="group flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-white text-black text-xs font-medium tracking-wider uppercase cursor-pointer"',
);

// Replace Let's talk arrow
content = content.replace(
  /className="w-7 h-7 rounded-full bg-lime text-primary-foreground flex items-center justify-center group-hover:rotate-45 transition-transform"/,
  'className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform"',
);

// Replace Mobile menu button
content = content.replace(
  /className=\{`lg:hidden flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 cursor-pointer \$\{[\s\S]*?\}`\}/,
  'className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white transition-all duration-300 cursor-pointer"',
);

// Write back
fs.writeFileSync("src/routes/index.tsx", content);
console.log("Nav patched");
