import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, ScrollText, Zap } from "lucide-react";

export default function LearnPage() {
  const sections = [
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
  ];

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 text-mystic-gold hover:text-mystic-accent transition-colors mb-12">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </Link>

        <h1 className="text-4xl font-serif text-mystic-gold mb-4 flex items-center gap-4">
          <ScrollText className="w-10 h-10" />
          Belajar Tarot
        </h1>
        <p className="text-mystic-fg/60 mb-12 italic text-lg">&quot;Kebijaksanaan kuno di ujung jarimu.&quot;</p>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={i} className="glass p-8 rounded-3xl border-mystic-gold/10">
              <div className="flex items-center gap-4 mb-4 text-mystic-gold">
                {section.icon}
                <h2 className="text-2xl font-serif font-bold">{section.title}</h2>
              </div>
              <p className="text-mystic-fg/80 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}

          <div className="p-8 border-2 border-dashed border-mystic-gold/20 rounded-3xl text-center">
            <h3 className="text-xl font-serif text-mystic-gold mb-4">Tips untuk Pemula</h3>
            <ul className="text-left max-w-md mx-auto space-y-3 text-mystic-fg/70">
              <li className="flex gap-2"><span>✨</span> Fokuslah pada satu pertanyaan yang jelas.</li>
              <li className="flex gap-2"><span>✨</span> Percayalah pada intuisi pertamamu saat melihat kartu.</li>
              <li className="flex gap-2"><span>✨</span> Tarot adalah cermin, bukan hukum mati.</li>
              <li className="flex gap-2"><span>✨</span> Gunakan jurnal untuk mencatat perkembanganmu.</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 text-center">
           <Link href="/spread">
              <button className="gold-gradient border border-mystic-gold/30 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                Mulai Berlatih Sekarang
              </button>
           </Link>
        </div>
      </div>
    </main>
  );
}
