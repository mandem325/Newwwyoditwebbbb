import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export default function AnimatedImage({
  src,
  alt,
  className = "",
  containerClassName = "",
}: AnimatedImageProps) {
  const reduce = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <motion.div
        initial={reduce ? { opacity: 0 } : { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
        whileInView={
          reduce ? { opacity: 1 } : { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
        }
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          initial={reduce ? {} : { scale: 1.15, filter: "blur(10px)" }}
          animate={
            isLoaded ? { scale: 1, filter: "blur(0px)" } : { scale: 1.15, filter: "blur(10px)" }
          }
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full h-full object-cover ${className}`}
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Elegant shimmer reflection effect */}
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#ebd5c5]/10 to-transparent pointer-events-none skew-x-12 z-10"
      />
    </div>
  );
}
