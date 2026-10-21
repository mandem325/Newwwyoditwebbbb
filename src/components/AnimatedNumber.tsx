import { useEffect, useState, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedNumberProps {
  value: string;
}

export default function AnimatedNumber({ value }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const target = parseInt(value, 10) || 0;
      const controls = animate(0, target, {
        duration: 2.0,
        ease: [0.22, 1, 0.36, 1], // Elegant ease-out curves
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  // Keep the leading-zero style formatting if the target number has it
  const isPadded = value.startsWith("0");
  const formatted = isPadded && displayValue < 10 ? `0${displayValue}` : `${displayValue}`;

  return <span ref={ref}>{formatted}</span>;
}
