const fs = require("fs");
let code = fs.readFileSync("src/routes/gallery.tsx", "utf8");

const startStr = "// 4. Cinematic Chapter 02";
const endStr = "// 5. Cinematic Chapter 03";

const startIdx = code.indexOf(startStr);
const endIdx = code.indexOf(endStr);

if (startIdx === -1 || endIdx === -1) {
  console.log("Could not find delimiters.");
  process.exit(1);
}

const replacement = `// 4. Cinematic Chapter 02
    const ch2Wrapper = document.querySelector('.ch2-wrapper') as HTMLElement;
    if (ch2Wrapper) {
      const ch2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".ch2-wrapper",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      let currentTime = 0;
      const enterDur = 2; 
      const activeDur = 1.5; 
      const exitDur = 2;
      const overlap = 1.5;

      // Initial setup to ensure GSAP fully controls visibility and opacity
      CHAPTER_2_SCENES.forEach((scene, i) => {
        const sceneEl = \`.ch2-scene-\${i}\`;
        ch2Tl.set(sceneEl, { autoAlpha: 0 }, 0); 
      });

      CHAPTER_2_SCENES.forEach((scene, i) => {
        const isLast = i === CHAPTER_2_SCENES.length - 1;
        const sceneEl = \`.ch2-scene-\${i}\`;
        const textEl = \`.ch2-scene-\${i} .ch2-text\`;
        const imgEl = \`.ch2-scene-\${i} .ch2-img-container\`;
        const titleEl = \`.ch2-scene-\${i} .ch2-title\`;
        const descEl = \`.ch2-scene-\${i} .ch2-desc\`;
        const metaEl = \`.ch2-scene-\${i} .ch2-meta\`;

        let startProps: any = {};
        let exitProps: any = {};

        switch(scene.anim) {
          case "upward":
            startProps = { y: "40vh" };
            exitProps = { y: "-40vh" };
            break;
          case "horizontal":
            const dir = scene.direction === "right" ? -1 : 1;
            startProps = { x: \`\${dir * 40}vw\` };
            exitProps = { x: \`\${-dir * 40}vw\` };
            break;
          case "scale":
            startProps = { scale: 0.8 };
            exitProps = { scale: 1.2 };
            break;
          case "downward":
            startProps = { y: "-40vh" };
            exitProps = { y: "40vh" };
            break;
          case "diagonal":
            startProps = { x: "40vw", y: "-40vh" };
            exitProps = { x: "-40vw", y: "40vh" };
            break;
          case "perspective":
            startProps = { z: -800, rotationY: 15 };
            exitProps = { z: 500, rotationY: -15 };
            break;
          case "fullscreen":
            startProps = { scale: 0.8, y: "20vh" };
            exitProps = { scale: 1.1, y: "-20vh" };
            break;
        }

        // 1. Scene Entrance (Container + Image move mostly together)
        ch2Tl.fromTo(sceneEl, 
          { ...startProps, autoAlpha: 0 },
          { x: 0, y: 0, scale: 1, z: 0, rotationY: 0, autoAlpha: 1, duration: enterDur, ease: "power2.inOut" },
          currentTime
        );

        // Subtle internal stagger for text 
        ch2Tl.fromTo(metaEl, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: enterDur * 0.8, ease: "power2.out" }, currentTime + 0.2);
        ch2Tl.fromTo(titleEl, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: enterDur * 0.8, ease: "power2.out" }, currentTime + 0.3);
        ch2Tl.fromTo(descEl, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: enterDur * 0.8, ease: "power2.out" }, currentTime + 0.4);

        // 2. Active Phase (Slow drift to feel alive)
        ch2Tl.to(sceneEl, { 
           scale: scene.anim === 'scale' || scene.anim === 'fullscreen' ? 1.05 : 1.02, 
           duration: activeDur, 
           ease: "none" 
        }, currentTime + enterDur);

        // 3. Scene Exit
        if (!isLast) {
          ch2Tl.to(sceneEl, 
            { ...exitProps, autoAlpha: 0, duration: exitDur, ease: "power2.inOut" },
            currentTime + enterDur + activeDur
          );
        } else {
          ch2Tl.to(sceneEl, { 
             autoAlpha: 0, y: "-20vh", duration: exitDur, ease: "power2.inOut" 
          }, currentTime + enterDur + activeDur);
        }

        currentTime += (enterDur + activeDur + exitDur) - overlap;
      });
    }

    `;

code = code.substring(0, startIdx) + replacement + code.substring(endIdx);
fs.writeFileSync("src/routes/gallery.tsx", code);
console.log("Done");
