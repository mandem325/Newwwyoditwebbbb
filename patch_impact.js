const fs = require("fs");

const path = "src/routes/impact.tsx";
let content = fs.readFileSync(path, "utf8");

content = content.replace(
  /const cards = gsap\.utils\.toArray\("\.stack-card"\) as HTMLElement\[\];[\s\S]*?\/\/ 4\. Horizontal Scroll/,
  `// 3. Stacking Cards Animation (Scale down inner card)
      const wrappers = gsap.utils.toArray(".stack-card-wrapper") as HTMLElement[];
      wrappers.forEach((wrapper, i) => {
        const innerCard = wrapper.querySelector(".stack-card");
        if (i < wrappers.length - 1) {
          gsap.to(innerCard, {
            scale: 0.9 - (wrappers.length - 1 - i) * 0.02,
            opacity: 0.6,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: \`top top+=\${10 + i * 5}vh\`,
              endTrigger: ".stack-container",
              end: "bottom bottom",
              scrub: true,
            },
          });
        }
      });

      // 4. Horizontal Scroll`,
);

content = content
  .replace(
    /<div className="stack-card sticky top-\[10vh\] w-full h-\[70vh\] bg-\[#1a1a1a\]/g,
    `<div className="stack-card-wrapper sticky top-[10vh] pb-[5vh]">
          <div className="stack-card w-full h-[70vh] bg-[#1a1a1a]`,
  )
  .replace(
    /<\/div>\n\n        <div className="stack-card sticky top-\[15vh\] w-full h-\[70vh\] bg-\[#c15c3d\]/g,
    `</div>
        </div>

        <div className="stack-card-wrapper sticky top-[15vh] pb-[5vh]">
          <div className="stack-card w-full h-[70vh] bg-[#c15c3d]`,
  )
  .replace(
    /<\/div>\n\n        <div className="stack-card sticky top-\[20vh\] w-full h-\[70vh\] bg-\[#e6e6e0\]/g,
    `</div>
        </div>

        <div className="stack-card-wrapper sticky top-[20vh] pb-[5vh]">
          <div className="stack-card w-full h-[70vh] bg-[#e6e6e0]`,
  );

// Close the last wrapper
content = content.replace(
  /<\/div>\n      <\/section>/g,
  `</div>
        </div>
      </section>`,
);

content = content.replace(/overflow-x-hidden/g, "overflow-hidden");

fs.writeFileSync(path, content, "utf8");
