import gsap from "gsap";
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function GlobalHeroAnimator() {
  const { location } = useRouterState();

  useEffect(() => {
    // Skip homepage
    if (location.pathname === "/") return;

    // Small delay to ensure DOM is ready and page transition is rendering
    const t = setTimeout(() => {
      const h1s = document.querySelectorAll("h1");

      h1s.forEach((h1, index) => {
        // Only target the primary h1s
        if (index > 2) return;

        // Apply a dramatic title text animation (blur, scale, y-axis)
        gsap.fromTo(
          h1,
          { opacity: 0, y: 60, scale: 0.9, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "expo.out",
            delay: 0.1,
          },
        );

        // Animate the hero section background/container
        const heroSection = h1.closest("section") || h1.closest("header");
        if (heroSection) {
          // Find background elements (images, videos, or absolutely positioned overlays)
          const bgElements = heroSection.querySelectorAll("img, video, .absolute");
          if (bgElements.length > 0) {
            gsap.fromTo(
              bgElements,
              { scale: 1.15, filter: "blur(15px) brightness(0.2)" },
              {
                scale: 1,
                filter: "blur(0px) brightness(1)",
                duration: 2.2,
                ease: "power3.out",
                stagger: 0.05,
              },
            );
          } else {
            // Fallback for solid backgrounds
            gsap.fromTo(
              heroSection,
              { opacity: 0 },
              { opacity: 1, duration: 1.5, ease: "power2.out" },
            );
          }
        }
      });
    }, 100);

    return () => clearTimeout(t);
  }, [location.pathname]);

  return null;
}
