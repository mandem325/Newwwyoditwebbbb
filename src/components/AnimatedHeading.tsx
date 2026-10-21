import { motion, useReducedMotion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

export default function AnimatedHeading({ text, className = "" }: AnimatedHeadingProps) {
  const words = text.split(" ");
  const reduce = useReducedMotion();

  return (
    <h1 className={`${className} flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-1">
          <motion.span
            initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0, rotate: 1.5 }}
            whileInView={reduce ? { opacity: 1 } : { y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.9,
              delay: i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block origin-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
