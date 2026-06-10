"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, ScrollText, Zap } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function LearnPage() {
  const { lang } = useSettings();

  const t = {
    back: lang === 'id' ? 'Kembali' : 'Back',
    title: lang === 'id' ? 'Belajar Tarot' : 'Learn Tarot',
    tagline: lang === 'id' ? '"Kebijaksanaan kuno di ujung jarimu."' : '"Ancient wisdom at your fingertips."',
    tips_title: lang === 'id' ? 'Tips untuk Pemula' : 'Tips for Beginners',
    start_btn: lang === 'id' ? 'Mulai Berlatih Sekarang' : 'Start Practicing Now',
    tips: lang === 'id' ? [
      "Fokuslah pada satu pertanyaan yang jelas.",
      "Percayalah pada intuisi pertamamu saat melihat kartu.",
      "Tarot adalah cermin, bukan hukum mati.",
      "Gunakan jurnal untuk mencatat perkembanganmu."
    ] : [
      "Focus on one clear question.",
      "Trust your first intuition when seeing the card.",
      "Tarot is a mirror, not a fixed law.",
      "Use a journal to record your progress."
    ]
  };

  const sections = lang === 'id' ? [
    {
      title: "Apa itu Tarot?",
      icon: <BookOpen className="w-6 h-6" />,
      content: "Tarot adalah sistem simbolisme yang terdiri dari 78 kartu yang digunakan untuk refleksi diri, meditasi, dan mendapatkan wawasan tentang situasi hidup. Bukan sekadar meramal masa depan, tarot membantu kita memahami energi saat ini dan kemungkinan yang ada di depan."
    },
    {
      title: "Major vs Minor Arcana",
      icon: <Sparkles className="w-6 h-6" />,
      content: "Major Arcana (22 kartu) melambangkan perjalanan jiwa dan pelajaran besar kehidupan. Minor Arcana (56 kartu) fokus pada detail kehidupan sehari-hari, dibagi menjadi empat suit: Wands (energi/aksi), Cups (emosi), Swords (pikiran), dan Pentacles (materi/fisik)."
    },
    {
      title: "Membaca Kartu Terbalik",
      icon: <Zap className="w-6 h-6" />,
      content: "Kartu yang muncul terbalik (reversed) seringkali menunjukkan energi yang terhambat, internal, atau perlu perhatian lebih. Ini bukan berarti 'buruk', melainkan sebuah peringatan atau perspektif lain dari makna aslinya."
    }
  ] : [
    {
      title: "What is Tarot?",
      icon: <BookOpen className="w-6 h-6" />,
      content: "Tarot is a system of symbolism consisting of 78 cards used for self-reflection, meditation, and gaining insight into life situations. Not just about predicting the future, tarot helps us understand current energy and the possibilities ahead."
    },
    {
      title: "Major vs Minor Arcana",
      icon: <Sparkles className="w-6 h-6" />,
      content: "The Major Arcana (22 cards) represent the soul's journey and major life lessons. The Minor Arcana (56 cards) focus on daily life details, divided into four suits: Wands (energy/action), Cups (emotions), Swords (thoughts), and Pentacles (material/physical)."
    },
    {
      title: "Reading Reversed Cards",
      icon: <Zap className="w-6 h-6" />,
      content: "Cards that appear upside down (reversed) often indicate blocked, internal energy or something needing more attention. This doesn't mean 'bad', but rather a warning or another perspective of its original meaning."
    }
  ];

  return (
    <main className="min-h-screen p-6 md:p-12 text-on-background">
      <div className="max-w-4xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-12">
          <ArrowLeft className="w-5 h-5" />
          <span>{t.back}</span>
        </Link>

        <h1 className="text-4xl font-serif text-primary mb-4 flex items-center gap-4">
          <ScrollText className="w-10 h-10" />
          {t.title}
        </h1>
        <p className="text-on-background/60 mb-12 italic text-lg">{t.tagline}</p>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={i} className="glass p-8 rounded-3xl border-primary/10">
              <div className="flex items-center gap-4 mb-4 text-primary">
                {section.icon}
                <h2 className="text-2xl font-serif font-bold">{section.title}</h2>
              </div>
              <p className="text-on-background/80 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}

          <div className="p-8 border-2 border-dashed border-primary/20 rounded-3xl text-center">
            <h3 className="text-xl font-serif text-primary mb-4">{t.tips_title}</h3>
            <ul className="text-left max-w-md mx-auto space-y-3 text-on-background/70">
              {t.tips.map((tip, i) => (
                <li key={i} className="flex gap-2"><span>✨</span> {tip}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 text-center">
           <Link href="/spread">
              <button className="gold-gradient border border-primary/30 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                {t.start_btn}
              </button>
           </Link>
        </div>
      </div>
    </main>
  );
}
