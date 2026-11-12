"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Compass,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { UI_STRINGS } from "@/lib/translations";
import { getTarotImageUrl } from "@/components/TarotCard";

interface HeroPreviewCard {
  slug: string;
  number: string;
  name: string;
  arcanaLabel: string;
  whisperId: string;
  whisperEn: string;
}

interface CelestialBody {
  id: string;
  nameId: string;
  nameEn: string;
  glyph: string;
  tarotSlug: string;
  tarotNumeral: string;
  tarotName: string;
  rulingId: string;
  rulingEn: string;
  elementId: string;
  elementEn: string;
  orbit: number;
  size: string;
  color: string;
  hasRing?: boolean;
  duration: number;
  initialAngle: number;
  meaningId: string;
  meaningEn: string;
}

const HERO_ARCANA_POOL: HeroPreviewCard[] = [
  {
    slug: "the-star",
    number: "XVII",
    name: "The Star",
    arcanaLabel: "Major Arcana",
    whisperId: "Harapan baru dan kejernihan batin sedang menyinari langkahmu.",
    whisperEn: "Renewed hope and inner clarity are illuminating your path.",
  },
  {
    slug: "the-magician",
    number: "I",
    name: "The Magician",
    arcanaLabel: "Major Arcana",
    whisperId: "Semua alat manifestasi sudah ada di tanganmu saat ini.",
    whisperEn: "All the tools of manifestation are already in your hands.",
  },
  {
    slug: "the-moon",
    number: "XVIII",
    name: "The Moon",
    arcanaLabel: "Major Arcana",
    whisperId: "Dengarkan bisikan intuisi di balik kabut ketidaktahuan.",
    whisperEn: "Listen to the whisper of intuition behind the veil of mystery.",
  },
  {
    slug: "wheel-of-fortune",
    number: "X",
    name: "Wheel of Fortune",
    arcanaLabel: "Major Arcana",
    whisperId: "Roda takdir berputar membawa kejutan yang mengubah arah.",
    whisperEn: "The wheel of destiny turns, bringing a transformative shift.",
  },
  {
    slug: "the-sun",
    number: "XIX",
    name: "The Sun",
    arcanaLabel: "Major Arcana",
    whisperId: "Kehangatan, sukacita, dan keberhasilan bersinar tanpa ragu.",
    whisperEn: "Warmth, vitality, and radiant truth shine without shadow.",
  },
  {
    slug: "the-high-priestess",
    number: "II",
    name: "The High Priestess",
    arcanaLabel: "Major Arcana",
    whisperId: "Jawaban yang kamu cari tersimpan di dalam keheningan batin.",
    whisperEn: "The answer you seek rests within sacred inner silence.",
  },
];

const CELESTIAL_BODIES: CelestialBody[] = [
  {
    id: "sun",
    nameId: "Matahari (Sol)",
    nameEn: "The Sun (Sol)",
    glyph: "☉",
    tarotSlug: "the-sun",
    tarotNumeral: "XIX",
    tarotName: "The Sun",
    rulingId: "Leo · Pusat Kesadaran",
    rulingEn: "Leo · Core Consciousness",
    elementId: "Api Murni",
    elementEn: "Pure Fire",
    orbit: 0,
    size: "h-20 w-20",
    color: "from-amber-200 via-amber-400 to-orange-500",
    duration: 0,
    initialAngle: 0,
    meaningId:
      "Sumber vitalitas, kejernihan sejati, dan pencerahan sadar yang menyinari seluruh arketipe di sekelilingnya.",
    meaningEn:
      "The source of vitality, sovereign truth, and conscious illumination that animates every archetype around it.",
  },
  {
    id: "mercury",
    nameId: "Merkurius",
    nameEn: "Mercury",
    glyph: "☿",
    tarotSlug: "the-magician",
    tarotNumeral: "I",
    tarotName: "The Magician",
    rulingId: "Gemini & Virgo",
    rulingEn: "Gemini & Virgo",
    elementId: "Udara & Tanah",
    elementEn: "Air & Earth",
    orbit: 130,
    size: "h-4 w-4",
    color: "from-slate-200 via-cyan-200 to-slate-400",
    duration: 14,
    initialAngle: 25,
    meaningId:
      "Sang pembawa pesan kosmik—mengatur kejernihan logika, bahasa simbol, dan kemampuan memanifestasikan niat menjadi kenyataan.",
    meaningEn:
      "The cosmic messenger—governing intellect, symbolic language, and the power to channel intention into reality.",
  },
  {
    id: "venus",
    nameId: "Venus",
    nameEn: "Venus",
    glyph: "♀",
    tarotSlug: "the-empress",
    tarotNumeral: "III",
    tarotName: "The Empress",
    rulingId: "Taurus & Libra",
    rulingEn: "Taurus & Libra",
    elementId: "Tanah & Udara",
    elementEn: "Earth & Air",
    orbit: 185,
    size: "h-5 w-5",
    color: "from-amber-200 via-rose-300 to-amber-500",
    duration: 20,
    initialAngle: 110,
    meaningId:
      "Getaran daya tarik, keindahan artistik, empati, dan kelimpahan yang menyatukan dua jiwa dalam harmoni.",
    meaningEn:
      "The vibration of attraction, aesthetic grace, empathy, and fertile abundance that binds souls in harmony.",
  },
  {
    id: "earth",
    nameId: "Bumi (Terra)",
    nameEn: "Earth (Terra)",
    glyph: "⊕",
    tarotSlug: "the-world",
    tarotNumeral: "XXI",
    tarotName: "The World",
    rulingId: "Titik Pijak Empat Elemen",
    rulingEn: "Nexus of the Four Elements",
    elementId: "Tanah, Air, Api, Udara",
    elementEn: "Earth, Water, Fire, Air",
    orbit: 245,
    size: "h-6 w-6",
    color: "from-emerald-300 via-teal-400 to-blue-600",
    duration: 28,
    initialAngle: 205,
    meaningId:
      "Tempat bertemunya roh dan materi—melambangkan penggenapan siklus, keutuhan perjalanan, dan kehadiran utuh di saat ini.",
    meaningEn:
      "Where spirit meets matter—symbolizing completion of the great cycle, wholeness, and grounded presence.",
  },
  {
    id: "mars",
    nameId: "Mars",
    nameEn: "Mars",
    glyph: "♂",
    tarotSlug: "the-tower",
    tarotNumeral: "XVI",
    tarotName: "The Tower",
    rulingId: "Aries",
    rulingEn: "Aries",
    elementId: "Api",
    elementEn: "Fire",
    orbit: 305,
    size: "h-5 w-5",
    color: "from-orange-400 via-red-500 to-rose-800",
    duration: 36,
    initialAngle: 300,
    meaningId:
      "Energi keberanian, kehendak tajam, dan daya dobrak yang meruntuhkan ilusi demi kebenaran yang membebaskan.",
    meaningEn:
      "Fierce courage, iron willpower, and the breakthrough force that shatters illusion for liberating truth.",
  },
  {
    id: "jupiter",
    nameId: "Jupiter",
    nameEn: "Jupiter",
    glyph: "♃",
    tarotSlug: "wheel-of-fortune",
    tarotNumeral: "X",
    tarotName: "Wheel of Fortune",
    rulingId: "Sagittarius",
    rulingEn: "Sagittarius",
    elementId: "Api",
    elementEn: "Fire",
    orbit: 375,
    size: "h-8 w-8",
    color: "from-orange-200 via-amber-400 to-yellow-700",
    duration: 48,
    initialAngle: 60,
    meaningId:
      "Sang pemutar roda keberuntungan, perluasan cakrawala filosofis, kebijaksanaan tinggi, dan berkah sinkronisitas.",
    meaningEn:
      "Turner of the great wheel of fortune, philosophical expansion, higher wisdom, and synchronicity.",
  },
  {
    id: "saturn",
    nameId: "Saturnus",
    nameEn: "Saturn",
    glyph: "♄",
    tarotSlug: "the-hermit",
    tarotNumeral: "IX",
    tarotName: "The Hermit",
    rulingId: "Capricorn",
    rulingEn: "Capricorn",
    elementId: "Tanah",
    elementEn: "Earth",
    orbit: 450,
    size: "h-7 w-7",
    color: "from-yellow-100 via-amber-300 to-stone-500",
    hasRing: true,
    duration: 64,
    initialAngle: 155,
    meaningId:
      "Penjaga waktu, disiplin batin, struktur karma, dan kematangan jiwa yang ditempa melalui kesabaran.",
    meaningEn:
      "Keeper of time, sacred discipline, karmic structure, and the soul maturity forged through patience.",
  },
  {
    id: "uranus",
    nameId: "Uranus",
    nameEn: "Uranus",
    glyph: "♅",
    tarotSlug: "the-fool",
    tarotNumeral: "0",
    tarotName: "The Fool",
    rulingId: "Aquarius",
    rulingEn: "Aquarius",
    elementId: "Udara",
    elementEn: "Air",
    orbit: 525,
    size: "h-6 w-6",
    color: "from-cyan-200 via-sky-400 to-indigo-500",
    duration: 82,
    initialAngle: 245,
    meaningId:
      "Kilat kebebasan murni, lompatan iman melampaui batas lama, dan intuisi visioner yang tak terduga.",
    meaningEn:
      "The lightning of pure freedom, a leap of faith beyond old boundaries, and visionary awakening.",
  },
  {
    id: "neptune",
    nameId: "Neptunus",
    nameEn: "Neptune",
    glyph: "♆",
    tarotSlug: "the-hanged-man",
    tarotNumeral: "XII",
    tarotName: "The Hanged Man",
    rulingId: "Pisces",
    rulingEn: "Pisces",
    elementId: "Air",
    elementEn: "Water",
    orbit: 595,
    size: "h-6 w-6",
    color: "from-blue-400 via-indigo-500 to-violet-800",
    duration: 100,
    initialAngle: 335,
    meaningId:
      "Samudra mimpi, kepasrahan mistis, pembubaran ego, dan pembalikan sudut pandang menuju kesadaran transenden.",
    meaningEn:
      "The ocean of dreams, mystical surrender, ego dissolution, and the inverted perspective of transcendence.",
  },
];

export default function Home() {
  const { lang } = useSettings();
  const t = UI_STRINGS[lang].home;

  const [mounted, setMounted] = useState(false);
  const [starsData, setStarsData] = useState<
    { top: string; left: string; duration: number; delay: number; size: number }[]
  >([]);

  // Interactive Hero Portal State
  const [portalCards, setPortalCards] = useState<HeroPreviewCard[]>(
    HERO_ARCANA_POOL.slice(0, 3)
  );
  const [flippedIndices, setFlippedIndices] = useState<number[]>([1]);
  const [activePortalIdx, setActivePortalIdx] = useState<number>(1);

  // Interactive Orrery State
  const [selectedBodyId, setSelectedBodyId] = useState<string>("saturn");
  const [isOrbitPaused, setIsOrbitPaused] = useState<boolean>(false);
  const [isAlignedSyzygy, setIsAlignedSyzygy] = useState<boolean>(false);

  // 3D Parallax for Hero Astrolabe Stage
  const stageX = useMotionValue(0);
  const stageY = useMotionValue(0);
  const smoothStageX = useSpring(stageX, { stiffness: 150, damping: 24 });
  const smoothStageY = useSpring(stageY, { stiffness: 150, damping: 24 });

  const stageRotateX = useTransform(smoothStageY, [-0.5, 0.5], [10, -10]);
  const stageRotateY = useTransform(smoothStageX, [-0.5, 0.5], [-12, 12]);

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stageX.set(x);
    stageY.set(y);
  };

  const handleStageMouseLeave = () => {
    stageX.set(0);
    stageY.set(0);
  };

  const togglePortalCard = (idx: number) => {
    setActivePortalIdx(idx);
    setFlippedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const shufflePortalCards = () => {
    setFlippedIndices([]);
    setTimeout(() => {
      const shuffled = [...HERO_ARCANA_POOL].sort(() => Math.random() - 0.5);
      setPortalCards(shuffled.slice(0, 3));
      setActivePortalIdx(1);
      setTimeout(() => setFlippedIndices([1]), 280);
    }, 220);
  };

  const zodiacSigns = [
    { name: "Aries", symbol: "♈", element: lang === "id" ? "Api" : "Fire", path: "M 20 60 L 40 30 L 70 35 L 85 60", description: lang === "id" ? "Sang Ram" : "The Ram", stars: [[20, 60], [40, 30], [70, 35], [85, 60]], imageUrl: "/images/zodiac/aries.png" },
    { name: "Taurus", symbol: "♉", element: lang === "id" ? "Tanah" : "Earth", path: "M 80 20 L 60 45 L 40 50 L 20 30 M 40 50 L 35 80 L 60 85", description: lang === "id" ? "Sang Banteng" : "The Bull", stars: [[80, 20], [60, 45], [40, 50], [20, 30], [35, 80], [60, 85]], imageUrl: "/images/zodiac/taurus.png" },
    { name: "Gemini", symbol: "♊", element: lang === "id" ? "Udara" : "Air", path: "M 30 20 L 30 80 M 70 20 L 70 80 M 30 30 L 70 30 M 30 70 L 70 70", description: lang === "id" ? "Sang Kembar" : "The Twins", stars: [[30, 20], [30, 80], [70, 20], [70, 80], [30, 30], [70, 30], [30, 70], [70, 70]], imageUrl: "/images/zodiac/gemini.png" },
    { name: "Cancer", symbol: "♋", element: lang === "id" ? "Air" : "Water", path: "M 50 20 L 50 50 L 20 80 M 50 50 L 80 80", description: lang === "id" ? "Sang Kepiting" : "The Crab", stars: [[50, 20], [50, 50], [20, 80], [80, 80]], imageUrl: "/images/zodiac/cancer.png" },
    { name: "Leo", symbol: "♌", element: lang === "id" ? "Api" : "Fire", path: "M 85 85 L 30 85 L 20 60 L 30 30 L 60 25 L 80 45 L 60 65", description: lang === "id" ? "Sang Singa" : "The Lion", stars: [[85, 85], [30, 85], [20, 60], [30, 30], [60, 25], [80, 45], [60, 65]], imageUrl: "/images/zodiac/leo.png" },
    { name: "Virgo", symbol: "♍", element: lang === "id" ? "Tanah" : "Earth", path: "M 20 20 L 40 50 L 20 80 M 40 50 L 70 50 L 85 20 L 85 80", description: lang === "id" ? "Sang Perawan" : "The Maiden", stars: [[20, 20], [40, 50], [20, 80], [40, 50], [70, 50], [85, 20], [85, 80]], imageUrl: "/images/zodiac/virgo.png" },
    { name: "Libra", symbol: "♎", element: lang === "id" ? "Udara" : "Air", path: "M 20 50 L 50 20 L 80 50 L 50 80 Z", description: lang === "id" ? "Sang Timbangan" : "The Scales", stars: [[20, 50], [50, 20], [80, 50], [50, 80]], imageUrl: "/images/zodiac/libra.png" },
    { name: "Scorpio", symbol: "♏", element: lang === "id" ? "Air" : "Water", path: "M 20 30 L 45 30 L 45 60 L 65 80 L 85 65 L 75 40", description: lang === "id" ? "Sang Kalajengking" : "The Scorpion", stars: [[20, 30], [45, 30], [45, 60], [65, 80], [85, 65], [75, 40]], imageUrl: "/images/zodiac/scorpio.png" },
    { name: "Sagittarius", symbol: "♐", element: lang === "id" ? "Api" : "Fire", path: "M 20 80 L 80 20 M 50 20 L 80 20 L 80 50 M 40 60 L 60 40", description: lang === "id" ? "Sang Pemanah" : "The Archer", stars: [[20, 80], [80, 20], [50, 20], [80, 50], [40, 60], [60, 40]], imageUrl: "/images/zodiac/sagittarius.png" },
    { name: "Capricorn", symbol: "♑", element: lang === "id" ? "Tanah" : "Earth", path: "M 20 40 L 50 20 L 85 45 L 70 85 L 35 80 Z", description: lang === "id" ? "Sang Kambing Laut" : "The Sea-Goat", stars: [[20, 40], [50, 20], [85, 45], [70, 85], [35, 80]], imageUrl: "/images/zodiac/capricorn.png" },
    { name: "Aquarius", symbol: "♒", element: lang === "id" ? "Udara" : "Air", path: "M 20 30 L 40 45 L 60 30 L 85 45 M 20 55 L 40 70 L 60 55 L 85 70", description: lang === "id" ? "Sang Pembawa Air" : "The Water Bearer", stars: [[20, 30], [40, 45], [60, 30], [85, 45], [20, 55], [40, 70], [60, 55], [85, 70]], imageUrl: "/images/zodiac/aquarius.png" },
    { name: "Pisces", symbol: "♓", element: lang === "id" ? "Air" : "Water", path: "M 20 20 L 50 50 L 80 20 M 50 50 L 50 90 M 35 80 L 65 80", description: lang === "id" ? "Sang Ikan" : "The Fish", stars: [[20, 20], [50, 50], [80, 20], [50, 90], [35, 80], [65, 80]], imageUrl: "/images/zodiac/pisces.png" },
  ];

  useEffect(() => {
    const generatedStars = [...Array(55)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 2.5 + Math.random() * 4,
      delay: Math.random() * 5,
      size: Math.random() > 0.75 ? 2 : 1,
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStarsData(generatedStars);
    setMounted(true);
  }, []);

  const currentWhisperCard = portalCards[activePortalIdx] || portalCards[0];
  const selectedBody =
    CELESTIAL_BODIES.find((b) => b.id === selectedBodyId) || CELESTIAL_BODIES[0];
  const selectedBodyTarotImg = getTarotImageUrl(selectedBody.tarotSlug);

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-on-background">
      {/* ==================== HERO SECTION: EDITORIAL GRIMOIRE & LIVING ASTROLABE ==================== */}
      <section className="relative flex min-h-[calc(100vh-88px)] w-full items-center py-12 lg:py-6">
        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Column: Classical Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-start text-left"
          >
            {/* Engraved Editorial Masthead (No pulsing dot / no SaaS pill) */}
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-primary/50" />
              <span className="font-serif text-xs tracking-[0.38em] uppercase text-primary/90">
                Arcana Mystica · Codex Divinatio
              </span>
            </div>

            <h1 className="max-w-2xl font-display-lg text-5xl font-normal leading-[1.08] tracking-tight text-on-background sm:text-6xl xl:text-7xl">
              {t.tagline.split(" ").map((word, i) =>
                i === 1 ? (
                  <span
                    key={i}
                    className="block font-serif italic text-primary font-normal py-1"
                  >
                    {word}{" "}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
              {t.desc}
            </p>

            {/* Classical Esoteric Actions */}
            <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href="/spread"
                className="group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-none border border-primary/60 bg-primary/15 px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-on-background transition-all duration-300 hover:bg-primary hover:text-on-primary"
              >
                <span className="text-primary transition-colors group-hover:text-on-primary">
                  ✦
                </span>
                <span>{t.start_reading}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/daily-reading"
                className="inline-flex items-center justify-center gap-3 border border-white/15 bg-white/[0.03] px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-on-background/85 transition-colors hover:border-secondary/50 hover:bg-white/[0.07] hover:text-secondary"
              >
                <span>{t.daily_reading}</span>
              </Link>
            </div>

            {/* Classical Four Suits Colophon */}
            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[11px] tracking-[0.25em] uppercase text-on-surface-variant/75">
              <Link href="/kartu" className="hover:text-primary transition-colors">
                🜂 Wands
              </Link>
              <span className="opacity-30">·</span>
              <Link href="/kartu" className="hover:text-primary transition-colors">
                🜄 Cups
              </Link>
              <span className="opacity-30">·</span>
              <Link href="/kartu" className="hover:text-primary transition-colors">
                🜁 Swords
              </Link>
              <span className="opacity-30">·</span>
              <Link href="/kartu" className="hover:text-primary transition-colors">
                🜃 Pentacles
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Astrolabe & Live Tarot Portal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
            style={{ perspective: 1400 }}
            className="relative flex flex-col items-center justify-center"
          >
            <motion.div
              style={{
                rotateX: stageRotateX,
                rotateY: stageRotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative flex h-[480px] w-full max-w-[480px] items-center justify-center sm:h-[520px]"
            >
              {/* Deep Ambient Halo */}
              <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-gradient-to-tr from-primary/20 via-secondary/10 to-transparent blur-3xl" />

              {/* Outer Rotating Sacred Astrolabe SVG */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ transform: "translateZ(-40px)" }}
              >
                <svg
                  viewBox="0 0 400 400"
                  className="h-full w-full text-primary/35 animate-spin-slow"
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="188"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeDasharray="2 6"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="168"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.6"
                  />
                  <polygon
                    points="200,32 345,284 55,284"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    opacity="0.5"
                  />
                  <polygon
                    points="200,368 345,116 55,116"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    opacity="0.5"
                  />
                </svg>
              </div>

              {/* Inner Counter-Rotating Alchemical Ring */}
              <div
                className="pointer-events-none absolute inset-10 flex items-center justify-center"
                style={{ transform: "translateZ(-20px)" }}
              >
                <svg
                  viewBox="0 0 300 300"
                  className="h-full w-full text-secondary/30 animate-spin-reverse-slow"
                >
                  <circle
                    cx="150"
                    cy="150"
                    r="140"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeDasharray="6 6"
                  />
                  <rect
                    x="52"
                    y="52"
                    width="196"
                    height="196"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    transform="rotate(45 150 150)"
                  />
                  <rect
                    x="52"
                    y="52"
                    width="196"
                    height="196"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.6"
                  />
                </svg>
              </div>

              {/* 3 Interactive Floating Tarot Cards in Fan Formation */}
              <div
                className="relative z-20 flex h-80 w-full items-center justify-center"
                style={{ transform: "translateZ(35px)" }}
              >
                {portalCards.map((item, idx) => {
                  const isFlipped = flippedIndices.includes(idx);
                  const isSelected = activePortalIdx === idx;
                  const fanOffsets = [
                    { x: -88, y: 18, rotate: -15 },
                    { x: 0, y: -12, rotate: 0 },
                    { x: 88, y: 18, rotate: 15 },
                  ][idx];
                  const imgUrl = getTarotImageUrl(item.slug);

                  return (
                    <motion.div
                      key={`${item.slug}-${idx}`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{
                        opacity: 1,
                        x: fanOffsets.x,
                        y: isSelected ? fanOffsets.y - 12 : fanOffsets.y,
                        rotateZ: fanOffsets.rotate,
                        scale: isSelected ? 1.06 : 0.96,
                      }}
                      whileHover={{ y: fanOffsets.y - 20, scale: 1.09 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      onClick={() => togglePortalCard(idx)}
                      style={{
                        zIndex: isSelected ? 30 : 10 + idx,
                        perspective: 1000,
                      }}
                      className="absolute h-64 w-40 cursor-pointer select-none sm:h-72 sm:w-44"
                    >
                      <motion.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{
                          duration: 0.65,
                          type: "spring",
                          stiffness: 140,
                          damping: 16,
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                        className="relative h-full w-full"
                      >
                        {/* Portal Card Back */}
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-between rounded-2xl border border-primary/50 bg-gradient-to-b from-surface-container-high via-surface-dim to-surface-container p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                          style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                          }}
                        >
                          <div className="flex h-full w-full flex-col items-center justify-between rounded-xl border border-secondary/25 bg-[radial-gradient(circle_at_center,rgba(193,142,255,0.2),transparent_70%)] p-2">
                            <span className="text-[8px] font-bold tracking-[0.3em] text-secondary uppercase">
                              ARCANA
                            </span>
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-surface-dim/80">
                              <span className="text-2xl text-primary">✧</span>
                            </div>
                            <span className="text-[8px] font-semibold tracking-[0.2em] text-primary/80 uppercase">
                              {lang === "id" ? "Klik Buka" : "Tap Flip"}
                            </span>
                          </div>
                        </div>

                        {/* Portal Card Front */}
                        <div
                          className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-primary/60 bg-surface-dim p-2 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
                          style={{
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                          }}
                        >
                          <div className="flex items-center justify-between border-b border-primary/20 px-2 pb-1 text-[9px] font-bold tracking-widest text-secondary">
                            <span>{item.number}</span>
                            <span>✧</span>
                          </div>
                          <div className="relative my-1 flex-1 w-full overflow-hidden rounded-lg bg-surface-bright">
                            {imgUrl && (
                              <Image
                                src={imgUrl}
                                alt={item.name}
                                fill
                                sizes="176px"
                                className="object-cover"
                              />
                            )}
                            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.65)]" />
                          </div>
                          <div className="pt-0.5 text-center">
                            <p className="font-serif text-xs font-bold text-on-background">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Engraved Whisper Plaque at Bottom of Astrolabe */}
              <div
                className="glass-panel absolute inset-x-4 bottom-2 z-30 flex flex-col gap-2 border border-primary/30 p-4 text-center sm:inset-x-8"
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary">
                  <span>
                    {currentWhisperCard.number} — {currentWhisperCard.name}
                  </span>
                  <button
                    type="button"
                    onClick={shufflePortalCards}
                    className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] text-primary transition hover:text-secondary"
                  >
                    <RotateCcw className="h-3 w-3" />
                    {lang === "id" ? "Kocok" : "Shuffle"}
                  </button>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentWhisperCard.slug + lang}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="font-serif text-xs italic text-on-background/90 sm:text-sm"
                  >
                    &ldquo;
                    {lang === "id"
                      ? currentWhisperCard.whisperId
                      : currentWhisperCard.whisperEn}
                    &rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FEATURE SECTION: THE MYSTIC PATH (ENGRAVED CODEX PLATES) ==================== */}
      <section className="relative w-full py-24 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mx-auto mb-3 flex items-center justify-center gap-3 text-xs tracking-[0.35em] uppercase text-secondary/80">
              <span>───</span>
              <span>✦</span>
              <span>───</span>
            </div>
            <h2 className="font-display-lg text-4xl text-on-background md:text-5xl">
              {t.mystic_path}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant">
              {t.mystic_desc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                numeral: "I",
                symbol: "☽",
                title: t.learn_title,
                desc: t.learn_desc,
                link: "/belajar",
                subtitle: lang === "id" ? "Studium Arcana" : "Studium Arcana",
              },
              {
                numeral: "II",
                symbol: "☉",
                title: t.journal_title,
                desc: t.journal_desc,
                link: "/jurnal",
                subtitle: lang === "id" ? "Liber Memoriae" : "Liber Memoriae",
              },
              {
                numeral: "III",
                symbol: "✧",
                title: t.encyclopedia_title,
                desc: t.encyclopedia_desc,
                link: "/kartu",
                subtitle: lang === "id" ? "Codex LXXVIII" : "Codex LXXVIII",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Link
                  href={feature.link}
                  className="group relative flex h-full flex-col justify-between border border-primary/25 bg-surface-container-lowest/75 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/60 hover:bg-surface-container-low/90"
                >
                  {/* Inner Hairline Frame */}
                  <div className="pointer-events-none absolute inset-2 border border-white/5 transition-colors duration-500 group-hover:border-primary/20" />

                  <div>
                    <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="font-serif text-sm tracking-[0.3em] text-secondary">
                        {feature.numeral} · {feature.subtitle}
                      </span>
                      <span className="font-serif text-2xl text-primary transition-transform duration-500 group-hover:rotate-45">
                        {feature.symbol}
                      </span>
                    </div>

                    <h3 className="mb-3 font-serif text-2xl font-normal text-on-background group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="mb-10 text-sm leading-relaxed text-on-surface-variant">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary group-hover:text-secondary transition-colors">
                    <span>{lang === "id" ? "Buka Lembaran" : "Open Foliation"}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CELESTIAL ALIGNMENT: FULL 9-BODY INTERACTIVE ORRERY ==================== */}
      <section className="relative flex w-full flex-col items-center justify-center py-28 px-6 md:px-10">
        {/* Background Starfield */}
        <div className="pointer-events-none absolute inset-0">
          {mounted &&
            starsData.map((star, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.15, 0.9, 0.15],
                }}
                transition={{
                  repeat: Infinity,
                  duration: star.duration,
                  delay: star.delay,
                }}
                className="absolute rounded-full bg-white"
                style={{
                  top: star.top,
                  left: star.left,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
              />
            ))}
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <p className="font-serif text-xs uppercase tracking-[0.45em] text-secondary">
              {lang === "id"
                ? "Planeta & Korespondensi Major Arcana"
                : "Planetary Spheres & Major Arcana"}
            </p>
            <h2 className="mt-3 font-display-lg text-4xl text-on-background md:text-6xl">
              {lang === "id" ? "Penyelarasan Surgawi" : "Celestial Alignment"}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-on-surface-variant">
              {lang === "id"
                ? "Klik langsung planet mana pun di dalam orbit (atau pilih simbolnya di bawah) untuk memeriksa resonansi kartu Tarot dan mengendalikan pergerakan tata surya."
                : "Click any planet directly on its orbit (or choose its glyph below) to inspect its Tarot resonance and control the solar motion."}
            </p>
          </div>

          {/* Interactive Celestial Control Bar */}
          <div className="relative z-20 mb-10 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 bg-surface-container-lowest/70 px-5 py-3.5 backdrop-blur-md">
            {/* Direct Glyph Selector for All 9 Bodies */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CELESTIAL_BODIES.map((body) => {
                const isSelected = selectedBodyId === body.id;
                return (
                  <button
                    key={body.id}
                    type="button"
                    onClick={() => setSelectedBodyId(body.id)}
                    className={`flex items-center gap-2 border px-3 py-1.5 text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/20 text-on-background shadow-[0_0_20px_var(--bg-glow-1)]"
                        : "border-white/10 bg-white/[0.02] text-on-surface-variant hover:border-primary/40 hover:text-on-background"
                    }`}
                  >
                    <span className="font-serif text-sm text-secondary">
                      {body.glyph}
                    </span>
                    <span className="text-[11px] font-medium tracking-wider uppercase">
                      {lang === "id" ? body.nameId.split(" ")[0] : body.nameEn.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Orbital Mechanics Controls: Pause/Play & Syzygy Alignment */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOrbitPaused((prev) => !prev)}
                className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-on-background transition hover:border-primary/50 cursor-pointer"
              >
                {isOrbitPaused ? (
                  <>
                    <Play className="h-3.5 w-3.5 text-secondary" />
                    <span>{lang === "id" ? "Putar Orbit" : "Resume Orbit"}</span>
                  </>
                ) : (
                  <>
                    <Pause className="h-3.5 w-3.5 text-primary" />
                    <span>{lang === "id" ? "Bekukan Waktu" : "Freeze Time"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsAlignedSyzygy((prev) => !prev)}
                className={`inline-flex items-center gap-2 border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition cursor-pointer ${
                  isAlignedSyzygy
                    ? "border-secondary bg-secondary/20 text-secondary"
                    : "border-white/15 bg-white/[0.04] text-on-background hover:border-secondary/50"
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                <span>
                  {lang === "id" ? "Sejajarkan (Syzygy)" : "Syzygy Alignment"}
                </span>
              </button>
            </div>
          </div>

          {/* Main Interactive Orrery + Inspector Split Layout */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_380px]">
            {/* Left: The Interactive 9-Body Solar System Canvas */}
            <div className="relative flex h-[640px] w-full items-center justify-center overflow-hidden border border-white/10 bg-surface-container-lowest/40">
              {/* Subtle Astronomical Crosshairs */}
              <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/[0.05]" />
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/[0.05]" />

              {/* The Sun (Clickable Core) */}
              <motion.button
                type="button"
                onClick={() => setSelectedBodyId("sun")}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.96 }}
                className={`relative z-30 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-amber-200 via-amber-400 to-orange-500 shadow-[0_0_50px_rgba(251,191,36,0.6)] focus:outline-none ${
                  selectedBodyId === "sun"
                    ? "ring-2 ring-white ring-offset-4 ring-offset-background"
                    : ""
                }`}
                aria-label="Select The Sun"
              >
                <span className="font-serif text-2xl text-slate-950">☉</span>
              </motion.button>

              {/* 8 Orbiting Planets — pointer-events-none on rings so inner planets are ALWAYS clickable! */}
              {CELESTIAL_BODIES.filter((b) => b.orbit > 0).map((planet) => {
                const isSelected = selectedBodyId === planet.id;

                return (
                  <div
                    key={planet.id}
                    onClick={() => setSelectedBodyId(planet.id)}
                    className={`pointer-events-none absolute rounded-full border transition-all duration-500 ${
                      isSelected
                        ? "border-primary/70 shadow-[0_0_30px_var(--bg-glow-1)]"
                        : "border-white/12"
                    }`}
                    style={{
                      width: planet.orbit,
                      height: planet.orbit,
                    }}
                  >
                    <motion.div
                      animate={
                        isAlignedSyzygy
                          ? { rotate: 0 }
                          : isOrbitPaused
                          ? undefined
                          : { rotate: [planet.initialAngle, planet.initialAngle + 360] }
                      }
                      transition={
                        isAlignedSyzygy
                          ? { duration: 1.2, ease: "easeInOut" }
                          : {
                              repeat: Infinity,
                              duration: planet.duration,
                              ease: "linear",
                            }
                      }
                      style={{ rotate: planet.initialAngle }}
                      className="pointer-events-none relative h-full w-full"
                    >
                      {/* Clickable Planet Button (pointer-events-auto + generous hit target) */}
                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBodyId(planet.id);
                        }}
                        whileHover={{ scale: 1.35 }}
                        whileTap={{ scale: 0.92 }}
                        className="pointer-events-auto group absolute -top-5 left-1/2 z-30 flex h-10 w-10 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full focus:outline-none"
                        aria-label={planet.nameEn}
                      >
                        {/* Active Selection Reticle */}
                        {isSelected && (
                          <span className="pointer-events-none absolute -inset-1.5 animate-spin-slow rounded-full border border-dashed border-secondary" />
                        )}

                        {/* Saturn's Ring */}
                        {planet.hasRing && (
                          <span className="pointer-events-none absolute h-3 w-11 rotate-[-24deg] rounded-full border-2 border-amber-200/75" />
                        )}

                        {/* Planet Sphere */}
                        <div
                          className={`${planet.size} relative rounded-full bg-gradient-to-br ${planet.color} shadow-[0_0_16px_rgba(255,255,255,0.3)] ${
                            isSelected ? "ring-2 ring-white" : ""
                          }`}
                        />

                        {/* Floating Planet Label */}
                        <span
                          className={`pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap border border-white/15 bg-black/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white transition-opacity ${
                            isSelected
                              ? "opacity-100 border-primary/60 text-primary"
                              : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          {planet.glyph}{" "}
                          {lang === "id"
                            ? planet.nameId.split(" ")[0]
                            : planet.nameEn.split(" ")[0]}
                        </span>
                      </motion.button>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Right: Active Celestial Body & Tarot Correspondence Inspector */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBody.id + lang}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col justify-between border border-primary/35 bg-surface-container-lowest/85 p-6 backdrop-blur-xl"
              >
                <div>
                  {/* Planet Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-secondary">
                        {lang === "id" ? selectedBody.rulingId : selectedBody.rulingEn}
                      </span>
                      <h3 className="mt-1 font-serif text-3xl text-on-background">
                        {lang === "id" ? selectedBody.nameId : selectedBody.nameEn}
                      </h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center border border-primary/40 bg-primary/10 font-serif text-2xl text-primary">
                      {selectedBody.glyph}
                    </div>
                  </div>

                  {/* Associated Tarot Card Preview */}
                  <div className="my-6 flex items-center gap-5 border border-white/10 bg-surface-dim/60 p-4">
                    <div className="relative h-28 w-18 shrink-0 overflow-hidden rounded border border-primary/40 bg-surface-bright">
                      {selectedBodyTarotImg && (
                        <Image
                          src={selectedBodyTarotImg}
                          alt={selectedBody.tarotName}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
                        Arcana {selectedBody.tarotNumeral}
                      </span>
                      <h4 className="font-serif text-xl text-on-background">
                        {selectedBody.tarotName}
                      </h4>
                      <p className="text-xs text-on-surface-variant">
                        {lang === "id" ? "Elemen: " : "Element: "}
                        <span className="text-secondary">
                          {lang === "id"
                            ? selectedBody.elementId
                            : selectedBody.elementEn}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Esoteric Meaning */}
                  <p className="font-serif text-sm leading-relaxed italic text-on-background/90">
                    &ldquo;
                    {lang === "id"
                      ? selectedBody.meaningId
                      : selectedBody.meaningEn}
                    &rdquo;
                  </p>
                </div>

                {/* Direct Link to This Planet's Tarot Card */}
                <Link
                  href={`/kartu/${selectedBody.tarotSlug}`}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 border border-primary/50 bg-primary/15 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-on-background transition hover:bg-primary hover:text-on-primary"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>
                    {lang === "id"
                      ? `Pelajari Kartu ${selectedBody.tarotName}`
                      : `Inspect ${selectedBody.tarotName}`}
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==================== ZODIAC CONSTELLATIONS SECTION ==================== */}
      <section className="relative w-full py-28 px-6 md:px-10">
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <p className="font-serif text-xs uppercase tracking-[0.45em] text-secondary">
              {lang === "id" ? "XII Rasi Bintang" : "XII Celestial Houses"}
            </p>
            <h2 className="mt-3 font-display-lg text-4xl text-on-background md:text-6xl">
              {lang === "id" ? "Konstelasi Mistis" : "Mystic Constellations"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xs uppercase tracking-[0.28em] text-on-surface-variant">
              {lang === "id"
                ? "Garis bintang yang membentuk takdirmu dalam zodiak."
                : "Star lines that shape your destiny in the zodiac."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {zodiacSigns.map((zodiac, i) => (
              <motion.div
                key={zodiac.name}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group relative flex h-80 flex-col items-center justify-between overflow-hidden border border-white/10 bg-surface-container-lowest/65 p-6 transition-all duration-300 hover:border-primary/50 hover:bg-surface-container-low/80"
              >
                {/* Top Header: Symbol & Element Badge */}
                <div className="flex w-full items-center justify-between text-xs">
                  <span className="font-serif text-lg text-primary">
                    {zodiac.symbol}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant">
                    {zodiac.element}
                  </span>
                </div>

                {/* Illustration & Constellation Overlay */}
                <div className="relative flex h-40 w-full items-center justify-center">
                  {zodiac.imageUrl && (
                    <div className="relative h-24 w-24 transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={zodiac.imageUrl}
                        alt={zodiac.name}
                        fill
                        sizes="96px"
                        className="object-contain opacity-75 drop-shadow-[0_0_14px_rgba(193,142,255,0.45)] transition-opacity group-hover:opacity-100"
                      />
                    </div>
                  )}

                  {/* Interactive SVG Star Lines */}
                  <svg
                    viewBox="0 0 100 100"
                    className="pointer-events-none absolute inset-0 h-full w-full overflow-visible opacity-45 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <motion.path
                      d={zodiac.path}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-secondary/50 group-hover:text-secondary transition-colors duration-500"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.8, ease: "easeInOut" }}
                      viewport={{ once: true }}
                    />
                    {zodiac.stars.map((star, starIdx) => (
                      <circle
                        key={starIdx}
                        cx={star[0]}
                        cy={star[1]}
                        r="2.4"
                        className="fill-white drop-shadow-[0_0_6px_white]"
                      />
                    ))}
                  </svg>
                </div>

                {/* Label */}
                <div className="text-center">
                  <h3 className="font-serif text-lg text-on-background group-hover:text-primary transition-colors">
                    {zodiac.name}
                  </h3>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-on-surface-variant/70">
                    {zodiac.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SANCTUARY CALLOUT BANNER ==================== */}
      <section className="relative w-full py-20 px-6 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative border border-primary/35 bg-surface-container-lowest/80 px-8 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute inset-2 border border-white/5" />
            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5">
              <span className="font-serif text-2xl text-primary">✧</span>
              <h2 className="font-display-lg text-3xl leading-tight sm:text-5xl">
                {lang === "id"
                  ? "Tulis Ceritamu Sendiri Lewat Simbol"
                  : "Write Your Own Story Through Symbols"}
              </h2>
              <p className="text-base leading-relaxed text-on-surface-variant">
                {lang === "id"
                  ? "Setiap kartu adalah cermin jiwa. Setiap pembacaan adalah percakapan hening dengan intuisi terdalammu. Bukalah enam kartu harianmu sekarang."
                  : "Every card is a mirror of the soul. Every reading is a quiet dialogue with your deepest intuition. Draw your six daily cards now."}
              </p>
              <Link
                href="/daily-reading"
                className="mt-3 inline-flex items-center justify-center gap-3 border border-primary/60 bg-primary/15 px-10 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-on-background transition hover:bg-primary hover:text-on-primary"
              >
                <span>
                  {lang === "id" ? "Buka Kartu Hari Ini" : "Open Today's Cards"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="w-full border-t border-white/10 bg-surface-container-lowest/80 py-14 px-6 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="flex items-center gap-3">
              <span className="text-lg text-primary">✧</span>
              <span className="font-display-lg text-xl tracking-[0.18em] text-on-background">
                ARCANA MYSTICA
              </span>
            </div>
            <p className="text-sm text-on-surface-variant">{t.footer_tag}</p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
                Sanctuary
              </span>
              <div className="flex flex-col gap-2 text-sm text-on-surface-variant">
                <Link href="/daily-reading" className="hover:text-primary transition-colors">
                  Daily Reading
                </Link>
                <Link href="/spread" className="hover:text-primary transition-colors">
                  Tarot Spreads
                </Link>
                <Link href="/kartu" className="hover:text-primary transition-colors">
                  Card Encyclopedia
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
                Grimoire
              </span>
              <div className="flex flex-col gap-2 text-sm text-on-surface-variant">
                <Link href="/jurnal" className="hover:text-primary transition-colors">
                  Reading Journal
                </Link>
                <Link href="/belajar" className="hover:text-primary transition-colors">
                  Learn Tarot
                </Link>
                <Link href="/setting" className="hover:text-primary transition-colors">
                  Settings & Themes
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-on-surface-variant/75">
            © 2026 Arcana Mystica. Crafted with esoteric artistry by{" "}
            <span className="font-semibold text-primary">syd</span>.
          </p>
        </div>
      </footer>
    </main>
  );
}
