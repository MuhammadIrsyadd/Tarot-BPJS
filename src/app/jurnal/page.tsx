"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trash2, Calendar, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getJournal, JournalEntry, deleteEntry, updateNotes, clearAllData } from "@/lib/storage";
import { getCardBySlug } from "@/lib/utils";
import TarotCard from "@/components/TarotCard";

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(getJournal());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Hapus catatan ini?")) {
      deleteEntry(id);
      setEntries(getJournal());
      if (selectedEntry?.id === id) setSelectedEntry(null);
    }
  };

  const handleClearAll = () => {
    if (confirm("Hapus SEMUA catatan jurnal? Tindakan ini tidak bisa dibatalkan.")) {
      clearAllData();
      setEntries([]);
      setSelectedEntry(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <Link href="/" className="flex items-center gap-2 text-mystic-gold hover:text-mystic-accent transition-colors mb-4">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali</span>
            </Link>
            <h1 className="text-4xl font-serif text-mystic-gold">Jurnal Bacaan</h1>
          </div>
          
          {entries.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Semua Data
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List Section */}
          <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {entries.length === 0 ? (
              <div className="text-center py-12 glass rounded-2xl opacity-50">
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <p>Belum ada catatan bacaan.</p>
                <Link href="/spread">
                  <button className="text-mystic-gold underline mt-2">Mulai bacaan pertama</button>
                </Link>
              </div>
            ) : (
              entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  layoutId={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className={`glass p-4 rounded-xl border-mystic-gold/10 hover:border-mystic-gold/40 cursor-pointer transition-all relative group ${selectedEntry?.id === entry.id ? 'border-mystic-gold bg-mystic-gold/5' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-mystic-gold font-bold">{entry.spreadName}</h3>
                    <button 
                      onClick={(e) => handleDelete(entry.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-mystic-fg/40 mb-3">
                    <Calendar className="w-3 h-3" />
                    {formatDate(entry.date)}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {entry.cards.map((c, i) => (
                      <div
                        key={i}
                        className="relative h-16 w-10 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#2c1f5e] via-[#1a1736] to-[#0b1022] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.65)]"
                      >
                        <div className="absolute inset-x-2 top-2 h-8 rounded-xl bg-white/5 blur-sm" />
                        <div className="absolute inset-x-0 bottom-3 flex justify-center">
                          <span className="h-1.5 w-6 rounded-full bg-primary/40 shadow-[0_0_16px_rgba(193,142,255,0.35)]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Detail Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedEntry ? (
                <motion.div
                  key={selectedEntry.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass p-8 rounded-3xl border-mystic-gold/20 sticky top-12"
                >
                  <h2 className="text-3xl font-serif text-mystic-gold mb-2">{selectedEntry.spreadName}</h2>
                  <p className="text-sm text-mystic-fg/40 mb-8 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedEntry.date)}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {selectedEntry.cards.map((c, i) => {
                      const cardData = getCardBySlug(c.slug);
                      return (
                        <div key={i} className="flex flex-col gap-3">
                          <span className="text-[10px] uppercase tracking-[0.35em] text-mystic-gold/60">
                            {c.positionName}
                          </span>
                          <div className="rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(193,142,255,0.08),transparent_60%),linear-gradient(180deg,rgba(19,15,49,0.95),rgba(12,10,29,0.95))] p-4 shadow-[0_24px_80px_-48px_rgba(111,62,211,0.7)]">
                            <TarotCard card={cardData} slug={c.slug} isRevealed />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-mystic-gold font-bold flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Catatan Pribadi
                    </h4>
                    <textarea 
                      className="w-full bg-white/5 border border-mystic-gold/10 rounded-xl p-4 text-sm text-mystic-fg/80 outline-none focus:border-mystic-gold/40 transition-all h-32"
                      placeholder="Tuliskan refleksimu di sini..."
                      value={selectedEntry.notes}
                      onChange={(e) => {
                        const newNotes = e.target.value;
                        updateNotes(selectedEntry.id, newNotes);
                        setSelectedEntry({ ...selectedEntry, notes: newNotes });
                        setEntries(getJournal());
                      }}
                    />
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center glass rounded-3xl border-dashed border-mystic-gold/20 opacity-30 text-center p-12">
                  <ChevronRight className="w-12 h-12 mb-4" />
                  <p className="text-xl font-serif">Pilih catatan untuk melihat detail</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
