"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export default function CosmicBackdrop() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const smoothX = useSpring(mouseX, { damping: 35, stiffness: 220, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 35, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const spotlightStyle = useMotionTemplate`radial-gradient(620px circle at ${smoothX}px ${smoothY}px, color-mix(in srgb, var(--primary) 13%, transparent), color-mix(in srgb, var(--secondary) 5%, transparent) 45%, transparent 80%)`;
  const coreRingStyle = useMotionTemplate`radial-gradient(160px circle at ${smoothX}px ${smoothY}px, color-mix(in srgb, var(--secondary) 10%, transparent), transparent 70%)`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Interactive Cursor Astral Aura */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: spotlightStyle }}
      />
      <motion.div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: coreRingStyle }}
      />

      {/* Ambient Sacred Geometry Watermark in Deep Background */}
      <div className="absolute -top-[340px] -right-[340px] h-[880px] w-[880px] opacity-[0.06]">
        <svg viewBox="0 0 400 400" className="h-full w-full text-primary animate-spin-slow">
          <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 6" />
          <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <polygon
            points="200,40 338,280 62,280"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <polygon
            points="200,360 338,120 62,120"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <rect
            x="87"
            y="87"
            width="226"
            height="226"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            transform="rotate(45 200 200)"
          />
        </svg>
      </div>

      <div className="absolute -bottom-[380px] -left-[380px] h-[920px] w-[920px] opacity-[0.05]">
        <svg viewBox="0 0 400 400" className="h-full w-full text-secondary animate-spin-reverse-slow">
          <circle cx="200" cy="200" r="185" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 8" />
          <circle cx="200" cy="200" r="145" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <polygon
            points="200,55 325,272 75,272"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <polygon
            points="200,345 325,128 75,128"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Subtle Vignette & Celestial Horizon Line */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
