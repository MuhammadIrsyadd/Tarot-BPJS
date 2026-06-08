"use client";

import Link from "next/link";
import { ArrowLeft, Settings as SettingsIcon, Trash2, Globe, Palette, ShieldCheck } from "lucide-react";
import { clearAllData } from "@/lib/storage";

export default function SettingsPage() {
  const handleReset = () => {
    if (confirm("Hapus semua data (jurnal dan pengaturan)? Tindakan ini permanen.")) {
      clearAllData();
      alert("Semua data telah dihapus.");
    }
  };

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-2xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 text-mystic-gold hover:text-mystic-accent transition-colors mb-12">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </Link>

        <h1 className="text-4xl font-serif text-mystic-gold mb-8 flex items-center gap-4">
          <SettingsIcon className="w-10 h-10" />
          Pengaturan
        </h1>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border-mystic-gold/10">
            <h2 className="text-xl font-serif text-mystic-gold mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5" /> Penampilan
            </h2>
            <div className="flex items-center justify-between py-4 border-b border-white/5">
              <span>Tema Deck</span>
              <span className="text-mystic-gold font-bold">Klasik (Default)</span>
            </div>
            <p className="text-xs text-mystic-fg/40 mt-4 italic">Tema 'Cosmic' dan 'Retro' akan hadir di versi selanjutnya.</p>
          </div>

          <div className="glass p-6 rounded-2xl border-mystic-gold/10">
            <h2 className="text-xl font-serif text-mystic-gold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5" /> Bahasa
            </h2>
            <div className="flex items-center justify-between py-4">
              <span>Bahasa Interpretasi</span>
              <span className="text-mystic-gold font-bold">Indonesia</span>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border-red-500/20">
            <h2 className="text-xl font-serif text-red-400 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Data & Privasi
            </h2>
            <p className="text-sm text-mystic-fg/60 mb-6">
              Semua data Anda disimpan secara lokal di browser ini. Kami tidak memiliki server untuk menyimpan data Anda. Jika Anda menghapus cache browser, data Anda mungkin akan hilang.
            </p>
            <button 
              onClick={handleReset}
              className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2 text-sm font-bold"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Semua Data Lokal
            </button>
          </div>
        </div>

        <div className="mt-12 text-center opacity-30 text-xs uppercase tracking-[0.2em]">
          Arcana Mystica Beta v1.0.0
        </div>
      </div>
    </main>
  );
}
