const fs = require("fs");

let content = fs.readFileSync("src/routes/index.tsx", "utf8");

// Replace subnav menu background
content = content.replace(
  /className=\{`backdrop-blur-xl border rounded-2xl p-2 flex flex-col gap-1 min-w-\[220px\] shadow-2xl overflow-hidden transform translate-y-2 group-hover\/parent:translate-y-0 transition-transform duration-500 \$\{[\s\S]*?\}`\}/,
  'className="border rounded-2xl p-2 flex flex-col gap-1 min-w-[220px] shadow-2xl overflow-hidden transform translate-y-2 group-hover/parent:translate-y-0 transition-transform duration-500 bg-black border-white/20"',
);

// Replace subnav items
content = content.replace(
  /className=\{`px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-widest transition-all duration-300 \$\{[\s\S]*?\}`\}/,
  'className="px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-widest transition-all duration-300 text-white/70 hover:text-white hover:bg-white/20 border border-transparent hover:border-white/30"',
);

fs.writeFileSync("src/routes/index.tsx", content);
console.log("Subnav patched");
