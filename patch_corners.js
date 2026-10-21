const fs = require("fs");
let code = fs.readFileSync("src/components/MechanicalScrollSection.tsx", "utf8");

// Front face
code = code.replace("rounded-br-[3rem] lg:rounded-br-[4rem]", "");

// Back face
code = code.replace("rounded-tr-[3rem] lg:rounded-tr-[4rem]", "");

// Left panel container
code = code.replace("rounded-r-[3rem] lg:rounded-r-[4rem] ", "");

// Static top
code = code.replace("rounded-tr-[3rem] lg:rounded-tr-[4rem]", "");

// Static bottom
code = code.replace("rounded-br-[3rem] lg:rounded-br-[4rem]", "");

// Right panel
code = code.replace("rounded-tr-[40px] md:rounded-tr-[80px]", "");

fs.writeFileSync("src/components/MechanicalScrollSection.tsx", code);
console.log("Corners squared off!");
