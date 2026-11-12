"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Compass,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Sparkles,
  ScrollText,
  Zap,
} from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function LearnPage() {
  const { lang } = useSettings();

  const t = {
    back: lang === "id" ? "Kembali" : "Back",
    badge: lang === "id" ? "Grimoire Inisiasi" : "Initiation Grimoire",
    title: lang === "id" ? "Belajar Tarot" : "Learn Tarot",
    tagline:
      lang === "id"
        ? '"Kebijaksanaan kuno di ujung jarimu."'
        : '"Ancient wisdom at your fingertips."',
    suits_title:
      lang === "id"
        ? "Empat Elemen & Suit Minor Arcana"
        : "The Four Elements & Suits",
    tips_title: lang === "id" ? "Ritual & Tips Pemula" : "Beginner Ritual & Tips",
    start_btn:
      lang === "id" ? "Mulai Berlatih Sekarang" : "Start Practicing Now",
    tips:
      lang === "id"
        ? [
            "Fokuslah pada satu pertanyaan yang jujur dan jelas sebelum mengocok kartu.",
            "Percayalah pada kesan visual dan intuisi pertamamu saat kartu terbuka.",
            "Tarot adalah cermin kesadaran, bukan vonis masa depan yang kaku.",
            "Gunakan Jurnal Bacaan untuk melacak pola kartu yang sering muncul.",
          ]
        : [
            "Focus on one clear, honest question before shuffling the deck.",
            "Trust your very first visual impression and intuition when a card flips.",
            "Tarot is a mirror of awareness, not a rigid sentence of fate.",
            "Use the Reading Journal to track recurring archetypes in your life.",
          ],
  };

  const sections =
    lang === "id"
      ? [
          {
            numeral: "I",
            title: "Apa itu Tarot?",
            icon: <BookOpen className="h-6 w-6" />,
            content:
              "Tarot adalah sistem simbolisme berusia berabad-abad yang terdiri dari 78 kartu untuk refleksi diri, meditasi, dan memetakan dinamika batin. Bukan sekadar meramal masa depan, tarot membantu kita membaca arus energi saat ini dan kemungkinan terbaik di depan.",
          },
          {
            numeral: "II",
            title: "Major vs Minor Arcana",
            icon: <Sparkles className="h-6 w-6" />,
            content:
              "Major Arcana (22 kartu, dari The Fool hingga The World) melambangkan perjalanan arketipe jiwa dan titik balik besar kehidupan. Minor Arcana (56 kartu) memotret dinamika sehari-hari yang terbagi dalam empat elemen.",
          },
          {
            numeral: "III",
            title: "Membaca Kartu Terbalik (Reversed)",
            icon: <Zap className="h-6 w-6" />,
            content:
              "Kartu yang muncul terbalik (reversed) menunjukkan energi yang sedang terinternalisasi, tertahan, atau meminta perhatian lebih lembut. Ini bukan pertanda buruk, melainkan undangan untuk melihat sisi bayangan dari simbol tersebut.",
          },
        ]
      : [
          {
            numeral: "I",
            title: "What is Tarot?",
            icon: <BookOpen className="h-6 w-6" />,
            content:
              "Tarot is a centuries-old symbolic system of 78 cards used for self-reflection, meditation, and mapping inner dynamics. Rather than fixing the future in stone, tarot illuminates present currents and emerging possibilities.",
          },
          {
            numeral: "II",
            title: "Major vs Minor Arcana",
            icon: <Sparkles className="h-6 w-6" />,
            content:
              "The Major Arcana (22 cards, from The Fool to The World) represent the soul's archetypal journey and pivotal life lessons. The Minor Arcana (56 cards) reflect daily experiences across four elemental suits.",
          },
          {
            numeral: "III",
            title: "Reading Reversed Cards",
            icon: <Zap className="h-6 w-6" />,
            content:
              "Cards that appear upside down (reversed) point to internalized, delayed, or blocked energy. Never merely 'bad', a reversal invites you to look inward at the shadow aspect of the archetype.",
          },
        ];

  const suits = [
    {
      name: "Wands",
      symbol: "🜂",
      icon: Flame,
      element: lang === "id" ? "Elemen Api" : "Fire Element",
      desc:
        lang === "id"
          ? "Semangat, kreativitas, ambisi, inspirasi, dan dorongan aksi."
          : "Passion, willpower, creativity, inspiration, and bold action.",
    },
    {
      name: "Cups",
      symbol: "🜄",
      icon: Droplets,
      element: lang === "id" ? "Elemen Air" : "Water Element",
      desc:
        lang === "id"
          ? "Emosi, cinta, intuisi, empati, dan kedalaman hubungan batin."
          : "Emotions, love, intuition, empathy, and spiritual bonds.",
    },
    {
      name: "Swords",
      symbol: "🜁",
      icon: Wind,
      element: lang === "id" ? "Elemen Udara" : "Air Element",
      desc:
        lang === "id"
          ? "Logika, kebenaran, komunikasi, konflik pikiran, dan ketegasan."
          : "Intellect, truth, clarity, mental conflict, and discernment.",
    },
    {
      name: "Pentacles",
      symbol: "🜃",
      icon: Mountain,
      element: lang === "id" ? "Elemen Tanah" : "Earth Element",
      desc:
        lang === "id"
          ? "Karir, finansial, kesehatan fisik, ketekunan, dan manifestasi nyata."
          : "Material world, career, abundance, craft, and grounded growth.",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-8 md:px-12 text-on-background">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="glass-panel mb-12 rounded-3xl p-6 sm:p-10">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.back}</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
              <ScrollText className="h-7 w-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-secondary">
                {t.badge}
              </span>
              <h1 className="font-serif text-4xl font-bold text-on-background">
                {t.title}
              </h1>
            </div>
          </div>
          <p className="mt-4 font-serif text-lg italic text-on-surface-variant">
            {t.tagline}
          </p>
        </div>

        {/* Core Chapters */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel relative overflow-hidden rounded-3xl p-8"
            >
              <span className="pointer-events-none absolute right-6 top-2 font-serif text-7xl font-bold text-primary/[0.06]">
                {section.numeral}
              </span>
              <div className="mb-4 flex items-center gap-3.5 text-primary">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  {section.icon}
                </div>
                <h2 className="font-serif text-2xl font-bold text-on-background">
                  {section.title}
                </h2>
              </div>
              <p className="leading-relaxed text-on-surface-variant">
                {section.content}
              </p>
            </motion.div>
          ))}

          {/* Four Suits Interactive Grid */}
          <div className="pt-6">
            <h2 className="mb-6 text-center font-serif text-2xl font-bold text-primary sm:text-3xl">
              {t.suits_title}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {suits.map((suit) => {
                const Icon = suit.icon;
                return (
                  <div
                    key={suit.name}
                    className="glass-panel-interactive flex flex-col gap-3 rounded-3xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-bold text-on-background">
                            {suit.name}
                          </h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                            {suit.element}
                          </p>
                        </div>
                      </div>
                      <span className="text-2xl text-primary/70">
                        {suit.symbol}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-on-surface-variant">
                      {suit.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Beginner Tips Scroll */}
          <div className="glass-panel rounded-3xl border-dashed border-primary/35 p-8 text-center">
            <Compass className="mx-auto mb-3 h-8 w-8 text-secondary" />
            <h3 className="mb-5 font-serif text-2xl font-bold text-primary">
              {t.tips_title}
            </h3>
            <ul className="mx-auto max-w-xl space-y-3 text-left text-sm text-on-background/85">
              {t.tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3"
                >
                  <span className="text-secondary">✦</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pb-10 text-center">
          <Link
            href="/spread"
            className="gold-gradient inline-flex items-center gap-3 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            <span>{t.start_btn}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
