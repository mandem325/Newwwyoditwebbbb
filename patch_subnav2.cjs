const fs = require("fs");

let content = fs.readFileSync("src/routes/index.tsx", "utf8");

// Replace subnav menu background with bg-white
content = content.replace(
  'className="border rounded-2xl p-2 flex flex-col gap-1 min-w-[220px] shadow-2xl overflow-hidden transform translate-y-2 group-hover/parent:translate-y-0 transition-transform duration-500 bg-black border-white/20"',
  'className="border border-black/10 rounded-2xl p-2 flex flex-col gap-1 min-w-[220px] shadow-2xl overflow-hidden transform translate-y-2 group-hover/parent:translate-y-0 transition-transform duration-500 bg-white"',
);

// Replace subnav items with text-black
content = content.replace(
  /className="px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-widest transition-all duration-300 text-white\/70 hover:text-white hover:bg-white\/20 border border-transparent hover:border-white\/30"/g,
  'className="px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-widest transition-all duration-300 text-black/70 hover:text-black hover:bg-black/10 border border-transparent hover:border-black/20"',
);

fs.writeFileSync("src/routes/index.tsx", content);
console.log("Subnav patched for difference mode");
