"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { TarotCardData } from "@/lib/types";

interface TarotCardProps {
  card?: TarotCardData;
  slug?: string;
  isReversed?: boolean;
  isRevealed?: boolean;
  onReveal?: () => void;
}

const SLUG_TO_CODE: Record<string, string> = {
  "the-fool": "m00", "the-magician": "m01", "the-high-priestess": "m02", "the-empress": "m03",
  "the-emperor": "m04", "the-hierophant": "m05", "the-lovers": "m06", "the-chariot": "m07",
  "strength": "m08", "the-hermit": "m09", "wheel-of-fortune": "m10", "justice": "m11",
  "the-hanged-man": "m12", "death": "m13", "temperance": "m14", "the-devil": "m15",
  "the-tower": "m16", "the-star": "m17", "the-moon": "m18", "the-sun": "m19",
  "judgement": "m20", "the-world": "m21",
  "ace-of-wands": "w01", "two-of-wands": "w02", "three-of-wands": "w03", "four-of-wands": "w04",
  "five-of-wands": "w05", "six-of-wands": "w06", "seven-of-wands": "w07", "eight-of-wands": "w08",
  "nine-of-wands": "w09", "ten-of-wands": "w10", "page-of-wands": "w11", "knight-of-wands": "w12",
  "queen-of-wands": "w13", "king-of-wands": "w14",
  "ace-of-cups": "c01", "two-of-cups": "c02", "three-of-cups": "c03", "four-of-cups": "c04",
  "five-of-cups": "c05", "six-of-cups": "c06", "seven-of-cups": "c07", "eight-of-cups": "c08",
  "nine-of-cups": "c09", "ten-of-cups": "c10", "page-of-cups": "c11", "knight-of-cups": "c12",
  "queen-of-cups": "c13", "king-of-cups": "c14",
  "ace-of-swords": "s01", "two-of-swords": "s02", "three-of-swords": "s03", "four-of-swords": "s04",
  "five-of-swords": "s05", "six-of-swords": "s06", "seven-of-swords": "s07", "eight-of-swords": "s08",
  "nine-of-swords": "s09", "ten-of-swords": "s10", "page-of-swords": "s11", "knight-of-swords": "s12",
  "queen-of-swords": "s13", "king-of-swords": "s14",
  "ace-of-pentacles": "p01", "two-of-pentacles": "p02", "three-of-pentacles": "p03", "four-of-pentacles": "p04",
  "five-of-pentacles": "p05", "six-of-pentacles": "p06", "seven-of-pentacles": "p07", "eight-of-pentacles": "p08",
  "nine-of-pentacles": "p09", "ten-of-pentacles": "p10", "page-of-pentacles": "p11", "knight-of-pentacles": "p12",
  "queen-of-pentacles": "p13", "king-of-pentacles": "p14",
};

export function getTarotImageUrl(slug?: string): string | null {
  if (!slug) return null;
  const code = SLUG_TO_CODE[slug];
  return code
    ? `https://raw.githubusercontent.com/lambiengcode/flutter-tarot-card/master/images/${code}.jpg`
    : null;
}

export default function TarotCard({
  card,
  slug,
  isReversed,
  isRevealed = false,
  onReveal,
}: TarotCardProps) {
  const [revealedState, setRevealedState] = useState(isRevealed);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const revealed = isRevealed || revealedState;

  // 3D Tilt & Holographic Glare Motion Values
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const smoothX = useSpring(pointerX, { stiffness: 260, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 260, damping: 22 });

  const tiltX = useTransform(smoothY, [0, 1], [13, -13]);
  const tiltY = useTransform(smoothX, [0, 1], [-13, 13]);
  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);

  const holoSheen = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.34) 0%, color-mix(in srgb, var(--secondary) 28%, transparent) 26%, color-mix(in srgb, var(--primary) 24%, transparent) 52%, transparent 78%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    pointerX.set(x);
    pointerY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const handleFlip = () => {
    if (!revealed) {
      setRevealedState(true);
    }
    if (onReveal) onReveal();
  };

  const imageUrl = !imageError ? getTarotImageUrl(slug) : null;

  const getSuitSymbol = () => {
    if (!card || card.arcana === "major") return "✧";
    switch (card.suit) {
      case "cups":
        return "🜄";
      case "swords":
        return "🜁";
      case "wands":
        return "🜂";
      case "pentacles":
        return "🜃";
      default:
        return "✧";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={handleFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      style={{
        perspective: 1200,
        rotateX: tiltX,
        rotateY: tiltY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-80 w-48 cursor-pointer select-none"
    >
      {/* Ambient Aura Behind Card */}
      <div
        className={`pointer-events-none absolute -inset-2 rounded-[30px] bg-gradient-to-tr from-primary/30 via-secondary/20 to-tertiary/30 blur-xl transition-opacity duration-500 ${
          isHovered || revealed ? "opacity-80" : "opacity-30"
        }`}
      />

      {/* Flipping Container */}
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{
          duration: 0.75,
          type: "spring",
          stiffness: 120,
          damping: 16,
        }}
      >
        {/* ================= CARD BACK (SACRED GEOMETRY MANDALA) ================= */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden rounded-[26px] border border-primary/40 bg-gradient-to-b from-surface-container-high via-surface-dim to-surface-container p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Holographic Glare on Back */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-90"
            style={{ background: holoSheen, mixBlendMode: "screen" }}
          />

          {/* Outer Ornate Filigree Frame */}
          <div className="relative flex h-full w-full flex-col items-center justify-between rounded-[20px] border border-primary/30 bg-[radial-gradient(circle_at_center,rgba(193,142,255,0.14),transparent_70%)] p-2.5">
            {/* Inner Gold Hairline Frame */}
            <div className="pointer-events-none absolute inset-1.5 rounded-[16px] border border-secondary/20" />

            {/* Top Celestial Corner Ornaments */}
            <div className="flex w-full items-center justify-between px-1 text-[10px] text-primary/70">
              <span>✦</span>
              <span className="tracking-[0.35em] text-[8px] uppercase text-secondary/75 font-semibold">
                ARCANA
              </span>
              <span>✦</span>
            </div>

            {/* Sacred Geometry Centerpiece */}
            <div className="relative flex h-44 w-44 items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className="h-full w-full text-primary/75 transition-transform duration-700 group-hover:rotate-45"
              >
                <defs>
                  <radialGradient id="cardBackGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="82" fill="url(#cardBackGlow)" />
                <circle
                  cx="100"
                  cy="100"
                  r="78"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                {/* Octagram (8-Pointed Alchemical Star) */}
                <rect
                  x="55"
                  y="55"
                  width="90"
                  height="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.9"
                />
                <rect
                  x="55"
                  y="55"
                  width="90"
                  height="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.9"
                  transform="rotate(45 100 100)"
                />
                {/* Hexagram */}
                <polygon
                  points="100,36 154,132 46,132"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  opacity="0.7"
                />
                <polygon
                  points="100,164 154,68 46,68"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  opacity="0.7"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Central Mystic Eye / Star */}
              <div className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-secondary/40 bg-surface-dim/90 shadow-[0_0_25px_rgba(193,142,255,0.5)]">
                <span className="text-2xl text-primary transition-transform duration-500 group-hover:scale-125">
                  ✧
                </span>
              </div>
            </div>

            {/* Bottom Corner Ornaments */}
            <div className="flex w-full items-center justify-between px-1 text-[10px] text-primary/70">
              <span>✦</span>
              <span className="tracking-[0.3em] text-[8px] uppercase text-primary/70 font-semibold">
                MYSTICA
              </span>
              <span>✦</span>
            </div>
          </div>
        </div>

        {/* ================= CARD FRONT (ILLUMINATED HOLOGRAPHIC TAROT) ================= */}
        <div
          className="absolute inset-0 flex flex-col items-center overflow-hidden rounded-[26px] border border-primary/45 bg-gradient-to-b from-surface-container via-surface-dim to-surface-container-low p-2.5 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.85)]"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Dynamic Holographic Foil Overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: holoSheen, mixBlendMode: "overlay" }}
          />

          {card ? (
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-primary/25 bg-surface-container-lowest">
              {/* Top Roman Numeral / Suit Bar */}
              <div className="relative z-20 flex items-center justify-between border-b border-primary/20 bg-surface-dim/90 px-3 py-1.5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase">
                  #{card.number}
                </span>
                <span className="text-xs text-primary">{getSuitSymbol()}</span>
                {isReversed && (
                  <span className="rounded-full border border-tertiary/40 bg-tertiary/15 px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider text-tertiary">
                    REV
                  </span>
                )}
              </div>

              {/* Artwork Viewport (Rotates 180deg when Reversed, keeping title readable below!) */}
              <div className="relative flex-1 w-full overflow-hidden bg-surface-bright">
                <div
                  className={`relative h-full w-full transition-transform duration-500 ${
                    isReversed ? "rotate-180" : ""
                  }`}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={card.name}
                      fill
                      sizes="192px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-surface via-surface-dim to-surface-container p-4 text-center">
                      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-4xl text-primary shadow-[0_0_30px_rgba(193,142,255,0.3)]">
                        {getSuitSymbol()}
                      </div>
                      <div className="font-serif text-base font-semibold leading-snug text-on-background">
                        {card.name}
                      </div>
                    </div>
                  )}
                </div>

                {/* Inner Vignette Shadow */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_24px_rgba(0,0,0,0.65)]" />
              </div>

              {/* Ornate Bottom Nameplate */}
              <div className="relative z-20 flex flex-col items-center justify-center border-t border-primary/25 bg-gradient-to-t from-surface-dim via-surface-dim/95 to-surface-container/90 px-2.5 py-2 text-center">
                <p className="line-clamp-1 font-serif text-xs font-bold tracking-[0.08em] text-on-background group-hover:text-primary transition-colors">
                  {card.name}
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.26em] text-on-surface-variant/75">
                  {card.arcana === "major" ? "Major Arcana" : card.suit || "Minor Arcana"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs tracking-widest uppercase text-on-background/50">
              Loading...
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
