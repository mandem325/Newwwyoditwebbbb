const fs = require("fs");

let content = fs.readFileSync("src/routes/index.tsx", "utf8");

// Remove from Nav
content = content.replace(/<AnimatedSnake \/>\s*<motion\.nav/g, "<motion.nav");

// Inject into homeContentRef
content = content.replace(
  /<div ref={homeContentRef} className="relative z-30 origin-top bg-\[#0b0806\]">/,
  '<div ref={homeContentRef} className="relative z-30 origin-top bg-[#0b0806]">\n        <AnimatedSnake />',
);

fs.writeFileSync("src/routes/index.tsx", content);
console.log("Injected snake into homeContentRef.");
