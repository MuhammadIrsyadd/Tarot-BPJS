"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, Sparkles, BookOpen, ScrollText, Library, Moon, Sun, Stars } from "lucide-react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const background = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(180deg, #0f0928 0%, #1a1040 100%)",
      "linear-gradient(180deg, #080b1f 0%, #02040d 100%)"
    ]
  );

  const [mounted, setMounted] = useState(false);
  const [starsData, setStarsData] = useState<{top: string, left: string, duration: number, delay: number}[]>([]);
  const [floatingCards, setFloatingCards] = useState<{top: string, left: string | null, right: string | null, duration: number, delay: number}[]>([]);

  // Array of zodiac signs with their SVG path data and image URLs
  const zodiacSigns = [
    { name: "Aries", symbol: "♈", path: "M 20 60 L 40 30 L 70 35 L 85 60", description: "The Ram", stars: [[20,60], [40,30], [70,35], [85,60]], imageUrl: "/images/zodiac/aries.png" },
    { name: "Taurus", symbol: "♉", path: "M 80 20 L 60 45 L 40 50 L 20 30 M 40 50 L 35 80 L 60 85", description: "The Bull", stars: [[80,20], [60,45], [40,50], [20,30], [35,80], [60,85]], imageUrl: "/images/zodiac/taurus.png" },
    { name: "Gemini", symbol: "♊", path: "M 30 20 L 30 80 M 70 20 L 70 80 M 30 30 L 70 30 M 30 70 L 70 70", description: "The Twins", stars: [[30,20], [30,80], [70,20], [70,80], [30,30], [70,30], [30,70], [70,70]], imageUrl: "/images/zodiac/gemini.png" },
    { name: "Cancer", symbol: "♋", path: "M 50 20 L 50 50 L 20 80 M 50 50 L 80 80", description: "The Crab", stars: [[50,20], [50,50], [20,80], [80,80]], imageUrl: "/images/zodiac/cancer.png" },
    { name: "Leo", symbol: "♌", path: "M 85 85 L 30 85 L 20 60 L 30 30 L 60 25 L 80 45 L 60 65", description: "The Lion", stars: [[85,85], [30,85], [20,60], [30,30], [60,25], [80,45], [60,65]], imageUrl: "/images/zodiac/leo.png" },
    { name: "Virgo", symbol: "♍", path: "M 20 20 L 40 50 L 20 80 M 40 50 L 70 50 L 85 20 L 85 80", description: "The Maiden", stars: [[20,20], [40,50], [20,80], [40,50], [70,50], [85,20], [85,80]], imageUrl: "/images/zodiac/virgo.png" },
    { name: "Libra", symbol: "♎", path: "M 20 50 L 50 20 L 80 50 L 50 80 Z", description: "The Scales", stars: [[20,50], [50,20], [80,50], [50,80]], imageUrl: "/images/zodiac/libra.png" },
    { name: "Scorpio", symbol: "♏", path: "M 20 30 L 45 30 L 45 60 L 65 80 L 85 65 L 75 40", description: "The Scorpion", stars: [[20,30], [45,30], [45,60], [65,80], [85,65], [75,40]], imageUrl: "/images/zodiac/scorpio.png" },
    { name: "Sagittarius", symbol: "♐", path: "M 20 80 L 80 20 M 50 20 L 80 20 L 80 50 M 40 60 L 60 40", description: "The Archer", stars: [[20,80], [80,20], [50,20], [80,50], [40,60], [60,40]], imageUrl: "/images/zodiac/sagittarius.png" },
    { name: "Capricorn", symbol: "♑", path: "M 20 40 L 50 20 L 85 45 L 70 85 L 35 80 Z", description: "The Sea-Goat", stars: [[20,40], [50,20], [85,45], [70,85], [35,80]], imageUrl: "/images/zodiac/capricorn.png" },
    { name: "Aquarius", symbol: "♒", path: "M 20 30 L 40 45 L 60 30 L 85 45 M 20 55 L 40 70 L 60 55 L 85 70", description: "The Water Bearer", stars: [[20,30], [40,45], [60,30], [85,45], [20,55], [40,70], [60,55], [85,70]], imageUrl: "/images/zodiac/aquarius.png" },
    { name: "Pisces", symbol: "♓", path: "M 20 20 L 50 50 L 80 20 M 50 50 L 50 90 M 35 80 L 65 80", description: "The Fish", stars: [[20,20], [50,50], [80,20], [50,90], [35,80], [65,80]], imageUrl: "/images/zodiac/pisces.png" },
  ];

  useEffect(() => {
    // Generate star data once on client to avoid hydration mismatch and lint errors
    const generatedStars = [...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 5
    }));
    
    // Generate floating card data once on client
    const generatedCards = [...Array(6)].map((_, i) => ({
      top: `${15 + (i * 15)}%`,
      left: i % 2 === 0 ? `${5 + (i * 2)}%` : null,
      right: i % 2 !== 0 ? `${5 + (i * 2)}%` : null,
      duration: 10 + i * 2,
      delay: i * 0.5
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStarsData(generatedStars);
    setFloatingCards(generatedCards);
    setMounted(true);
  }, []);

  return (
    <motion.main ref={containerRef} className="min-h-screen w-full text-on-background">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-72px)] w-full items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),transparent_40%)]" />
        
        <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-start justify-center gap-4 text-left"
          >
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
              Digital Divination
            </span>

            <h1 className="max-w-3xl font-display-lg text-[3.5rem] leading-[1.1] text-primary drop-shadow-[0_0_20px_rgba(156,119,255,0.3)] sm:text-[4.5rem]">
              Unveil Your <br/> Destiny
            </h1>

            <p className="max-w-md text-on-surface-variant text-base leading-relaxed">
              Connect with ancient wisdom through a modern lens. Discover what the stars and cards hold for your journey today.
            </p>

            <div className="mt-4 space-y-3">
              <div className="text-[10px] uppercase tracking-[0.35em] text-on-surface-variant opacity-60">
                Mulai Perjalananmu
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/spread"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-secondary to-primary px-8 py-3.5 text-sm font-semibold text-on-primary shadow-[0_15px_40px_-20px_rgba(118,224,255,0.7)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(118,224,255,0.8)]"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Reading
                </Link>
                <Link
                  href="/daily-reading"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-primary/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-on-background shadow-[0_15px_40px_-25px_rgba(193,142,255,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/15"
                >
                  <CalendarDays className="w-5 h-5" />
                  Daily Reading
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 hidden items-center justify-center lg:flex"
          >
            <div className="relative h-[480px] w-full max-w-[380px]">
              <motion.div
                animate={{ rotate: [2, -2, 2], y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute inset-x-0 top-0 mx-auto h-[440px] w-[300px] rounded-[36px] bg-gradient-to-br from-surface-container via-surface to-surface-container-high shadow-[0_30px_100px_-60px_rgba(156,119,255,0.4)]"
              />

              <motion.div
                animate={{ rotate: [-4, 4, -4], y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 6.6, ease: "easeInOut" }}
                className="absolute inset-x-0 top-6 mx-auto h-[400px] w-[260px] rounded-[32px] border border-white/10 bg-gradient-to-tr from-[#171c38] via-[#0e1529] to-[#0b1224] shadow-[0_24px_80px_-50px_rgba(110,231,255,0.15)]"
              />

              <motion.div
                animate={{ rotate: [0, 6, 0], y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5.4, ease: "easeInOut" }}
                className="relative mx-auto h-[420px] w-[280px] overflow-hidden rounded-[38px] border border-white/10 bg-[#101a37] shadow-[0_28px_90px_-40px_rgba(156,119,255,0.45)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(156,119,255,0.24),transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(110,231,255,0.18),transparent_34%)]" />
                <div className="absolute inset-8 rounded-[28px] bg-gradient-to-b from-surface-container-high/90 via-surface-container/75 to-transparent border border-white/5" />
                <div className="absolute left-8 top-8 space-y-1 text-left text-white/70">
                  <p className="pl-5 pt-2 text-[9px] uppercase tracking-[0.45em]">Arcana</p>
                  <p className="pl-5 text-xl font-semibold leading-tight">Mystic Orb</p>
                </div>
                <div className="absolute inset-x-0 top-16 flex justify-center">
                  <div className="relative flex h-[220px] w-[220px] items-center justify-center">
                    {/* Outer Energy Rings */}
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                      transition={{ rotate: { repeat: Infinity, duration: 20, ease: "linear" }, scale: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                      className="absolute inset-0 rounded-full border border-dashed border-primary/30"
                    />
                    <motion.div
                      animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
                      transition={{ rotate: { repeat: Infinity, duration: 15, ease: "linear" }, scale: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                      className="absolute inset-[-10px] rounded-full border border-dotted border-secondary/20"
                    />

                    {/* The Crystal Ball Container */}
                    <div className="relative h-44 w-44 overflow-hidden rounded-full border border-white/20 bg-black shadow-[0_0_60px_rgba(193,142,255,0.4)]">
                      {/* Inner Nebula Clouds */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                        }}
                        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                        className="absolute inset-[-20%] bg-[radial-gradient(circle_at_center,_rgba(193,142,255,0.6),rgba(118,224,255,0.4),rgba(245,160,255,0.3),transparent_70%)] blur-xl"
                        style={{ backgroundSize: "200% 200%" }}
                      />

                      {/* Floating Particles Inside */}
                      {mounted && [...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            y: [0, -30, 0],
                            x: [0, (i % 2 === 0 ? 15 : -15), 0],
                            opacity: [0.2, 0.8, 0.2]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 3 + i, 
                            delay: i * 0.4,
                            ease: "easeInOut" 
                          }}
                          className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_8px_white]"
                          style={{ 
                            top: `${30 + (i * 8)}%`, 
                            left: `${20 + (i * 10)}%` 
                          }}
                        />
                      ))}

                      {/* Glass Refraction Top Highlight */}
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.4)_0%,transparent_50%)]" />

                      {/* Bottom Glow */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_bottom,_rgba(118,224,255,0.4),transparent_70%)]" />
                    </div>

                    {/* Bottom Pedestal Glow */}
                    <motion.div 
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="absolute -bottom-4 h-4 w-32 bg-primary/40 blur-xl"
                    />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-8 flex justify-center text-center px-6 text-[10px] text-white/70">
                  <p>Explore a crafted tarot experience with modern magic and immersive atmosphere.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Feature Section: The Mystic Path */}
      <section className="relative w-full py-24 px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display-lg text-4xl text-primary md:text-5xl"
            >
              The Mystic Path
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-on-surface-variant"
            >
              Jelajahi setiap fitur yang dirancang untuk memperdalam pemahamanmu tentang simbolisme dan intuisi.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: BookOpen, title: "Belajar Tarot", desc: "Mulai dari dasar hingga teknik lanjutan untuk membaca kartu.", link: "/belajar" },
              { icon: ScrollText, title: "Jurnal Pribadi", desc: "Simpan setiap pembacaanmu dan amati perkembangan intuisimu.", link: "/jurnal" },
              { icon: Library, title: "Ensiklopedia", desc: "Perpustakaan makna kartu lengkap dengan nuansa visual modern.", link: "/kartu" }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative rounded-3xl border border-white/5 bg-white/5 p-8 transition-all hover:bg-white/10 hover:shadow-[0_20px_60px_-30px_rgba(139,92,255,0.2)]"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
                  {feature.desc}
                </p>
                <Link href="/daily-reading" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors">
                  Jelajahi <Sparkles className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive/Cosmic Gallery Section */}
      <section className="relative w-full py-32 px-8">
        <div className="absolute inset-0 opacity-30">
          <Stars className="absolute top-20 left-[10%] h-8 w-8 animate-pulse text-secondary/40" />
          <Stars className="absolute bottom-24 right-[15%] h-6 w-6 animate-pulse text-primary/40" />
          <Moon className="absolute top-40 right-[10%] h-12 w-12 text-tertiary/20" />
          <Sun className="absolute bottom-40 left-[8%] h-16 w-16 text-secondary/10" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 shadow-[0_0_50px_rgba(193,142,255,0.4)]">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-display-lg text-4xl leading-tight md:text-6xl">
              Tulis Ceritamu Sendiri <br/> Lewat Simbol
            </h2>
            <p className="max-w-2xl text-lg text-on-surface-variant">
              Setiap kartu adalah cermin. Setiap pembacaan adalah percakapan dengan diri sendiri. Mulailah hari ini dan temukan kejernihan dalam setiap simbol.
            </p>
            <Link
              href="/daily-reading"
              className="mt-4 inline-flex items-center justify-center gap-3 rounded-full bg-primary px-10 py-5 text-sm font-bold text-on-primary shadow-[0_30px_90px_-20px_rgba(193,142,255,0.6)] transition-all hover:scale-105 hover:bg-white hover:shadow-[0_35px_100px_-20px_rgba(193,142,255,0.8)]"
            >
              Buka Kartu Hari Ini
            </Link>
          </motion.div>
        </div>

        {/* Floating Background Cards Decorative */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
          {mounted && floatingCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              animate={{ 
                y: [0, -40, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: card.duration,
                delay: card.delay
              }}
              className="absolute h-64 w-40 rounded-2xl border border-white/20 bg-white/5"
              style={{
                top: card.top,
                left: card.left || 'auto',
                right: card.right || 'auto',
                zIndex: -1
              }}
            />
          ))}
        </div>
      </section>

      {/* Celestial Alignment Section */}
      <section className="relative flex flex-col items-center justify-center w-full py-32 px-8">
        {/* Subtle Purple Glow reaching towards the next section */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(139,92,255,0.15),_transparent_70%)]" />
        
        {/* Interactive Starfield */}
        <div className="absolute inset-0">
          {mounted && starsData.map((star, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: star.duration,
                delay: star.delay
              }}
              className="absolute h-[1px] w-[1px] rounded-full bg-white"
              style={{
                top: star.top,
                left: star.left,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl w-full text-center">
          <div className="mb-24 text-center">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.6em] text-secondary"
            >
              Cosmic Connection
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-4 font-display-lg text-5xl text-white md:text-7xl"
            >
              Celestial Alignment
            </motion.h2>
          </div>

          <div className="relative flex items-center justify-center min-h-[700px] w-full">
            {/* The Sun / Core */}
            <motion.div 
              animate={{ 
                boxShadow: ["0 0 40px rgba(193,142,255,0.4)", "0 0 80px rgba(193,142,255,0.6)", "0 0 40px rgba(193,142,255,0.4)"]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10 h-32 w-32 rounded-full bg-gradient-to-tr from-primary via-tertiary to-secondary shadow-[0_0_50px_rgba(193,142,255,0.5)]"
            >
              <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-pulse" />
            </motion.div>

            {/* Orbiting Planets & Paths */}
            {[
              { size: 'h-6 w-6', color: 'from-secondary to-blue-300', orbit: 280, duration: 12, label: 'Mercury', dots: 8 },
              { size: 'h-10 w-10', color: 'from-orange-400 to-yellow-200', orbit: 400, duration: 25, label: 'Venus', dots: 12 },
              { size: 'h-12 w-12', color: 'from-blue-500 to-emerald-300', orbit: 540, duration: 40, label: 'Earth', dots: 16 },
              { size: 'h-9 w-9', color: 'from-red-500 to-orange-600', orbit: 680, duration: 60, label: 'Mars', dots: 20 },
            ].map((planet) => (
              <div 
                key={planet.label}
                className="absolute border-2 border-white/10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                style={{ width: planet.orbit, height: planet.orbit }}
              >
                {/* Orbital Dots/Stars along the path */}
                {[...Array(planet.dots)].map((_, dotIndex) => (
                  <div 
                    key={dotIndex}
                    className="absolute h-1 w-1 bg-white/20 rounded-full"
                    style={{ 
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${(360 / planet.dots) * dotIndex}deg) translateY(-${planet.orbit / 2}px)`
                    }}
                  />
                ))}

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: planet.duration, ease: "linear" }}
                  className="relative h-full w-full"
                >
                  <motion.div 
                    whileHover={{ scale: 1.4 }}
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer group flex items-center justify-center`}
                  >
                    {/* Planet Body with Texture/Gradient */}
                    <div className={`${planet.size} rounded-full bg-gradient-to-br ${planet.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20 animate-pulse" />
                      <div className="absolute -top-1 -left-1 h-full w-full bg-white/20 rounded-full blur-sm" />
                    </div>
                    
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-white uppercase tracking-[0.2em] whitespace-nowrap bg-black/40 px-2 py-1 rounded backdrop-blur-md border border-white/10">
                      {planet.label}
                    </div>

                    {/* Planet Atmosphere/Glow */}
                    <div className={`absolute inset-[-4px] rounded-full blur-md bg-gradient-to-br ${planet.color} opacity-30 group-hover:opacity-60 transition-opacity`} />
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zodiac Constellations Section */}
      <section className="relative w-full py-32 px-8">
        {/* Glow from the previous section blending in */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,255,0.15),_transparent_70%)]" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-24 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display-lg text-4xl text-white md:text-6xl"
            >
              Mystic Constellations
            </motion.h2>
            <p className="mt-4 text-on-surface-variant max-w-xl mx-auto uppercase tracking-[0.3em] text-[10px]">
              Garis bintang yang membentuk takdirmu dalam zodiak.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {zodiacSigns.map((zodiac, i) => (
              <motion.div
                key={zodiac.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative h-80 rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-white/5 flex flex-col items-center justify-between"
              >
                {/* Illustration - Top Area */}
                <div className="relative flex flex-col items-center justify-start pointer-events-none gap-2">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="relative w-24 h-24"
                  >
                    {zodiac.imageUrl && (
                      <Image 
                        src={zodiac.imageUrl} 
                        alt={zodiac.name} 
                        fill 
                        objectFit="contain" 
                        className="opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(193,142,255,0.4)]"
                      />
                    )}
                  </motion.div>
                </div>

                {/* Constellation Canvas - Middle Area */}
                <div className="w-full h-24 p-2 pointer-events-none flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
                    {/* Constellation Paths - Hidden by default, shown on hover */}
                    <motion.path
                      d={zodiac.path}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary/0 group-hover:text-primary/50 transition-colors duration-500"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      viewport={{ once: true }}
                    />
                    
                    {/* Glowing Stars at Vertices */}
                    {zodiac.stars.map((star, starIdx) => (
                      <motion.circle
                        key={starIdx}
                        cx={star[0]}
                        cy={star[1]}
                        r="2.5"
                        className="fill-white"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.6 }}
                        transition={{ delay: 0.5 + starIdx * 0.05 }}
                      />
                    ))}
                  </svg>
                </div>

                {/* Label - Bottom Area */}
                <div className="text-center pointer-events-none">
                  <h3 className="font-serif text-lg text-white group-hover:text-primary transition-colors duration-300">{zodiac.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">{zodiac.description}</p>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                ✧
              </div>
              <span className="font-display-lg text-xl font-bold tracking-widest text-primary">
                ARCANA MYSTICA
              </span>
            </div>
            <p className="text-sm text-on-surface-variant">
              Modern Divination Platform for the Intuitive Soul.
            </p>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Sitemap</span>
              <div className="flex flex-col gap-2 text-sm">
                <Link href="/daily-reading" className="hover:text-primary transition-colors">Daily Reading</Link>
                <Link href="/spread" className="hover:text-primary transition-colors">Spread</Link>
                <Link href="/kartu" className="hover:text-primary transition-colors">Ensiklopedia</Link>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Connect</span>
              <div className="flex flex-col gap-2 text-sm">
                <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-on-surface-variant">
            © 2026 Arcana Mystica. Made with magic by <span className="text-primary font-semibold">syd</span>.
          </p>
        </div>
      </footer>
    </motion.main>
  );
}