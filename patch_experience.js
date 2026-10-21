const fs = require("fs");
const content = fs.readFileSync("src/routes/experience.tsx", "utf8");

const replacement = `            <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-xl font-light">
              {exp.desc}
            </p>
            {exp.bullets && exp.bullets.length > 0 && (
              <div className="mt-8 max-w-xl">
                <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-4 border-b border-white/10 pb-2">Key Initiatives & Impact</div>
                <ul className="space-y-4">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-3 text-white/70 font-light text-sm">
                      <span style={{color: exp.color}} className="mt-1">●</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}`;

let newContent = content.replace(
  /            <p className="text-base md:text-lg text-white\/50 leading-relaxed max-w-xl font-light">\s+{exp\.desc}\s+<\/p>\s+<\/div>\s+<\/div>\s+<\/div>\s+<\/div>\s+\);\s+}/,
  replacement,
);

newContent = newContent.replace(
  /const exps = experiences.map\(\(e, i\) => \(\{\s+title: e\.role,\s+org: e\.org,\s+date: e\.period,\s+img: e\.image,\s+color: colors\[i % colors\.length\],\s+desc: e\.body,\s+\}\)\);/,
  `const exps = experiences.map((e, i) => ({
  title: e.role,
  org: e.org,
  date: e.period,
  img: e.image,
  color: colors[i % colors.length],
  desc: e.body,
  bullets: e.bullets,
}));`,
);

fs.writeFileSync("src/routes/experience.tsx", newContent);
