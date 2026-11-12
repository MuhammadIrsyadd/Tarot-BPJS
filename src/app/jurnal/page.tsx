"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Trash2,
  Calendar,
  BookOpen,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  getJournal,
  JournalEntry,
  deleteEntry,
  updateNotes,
  clearAllData,
} from "@/lib/storage";
import { getCardBySlug } from "@/lib/utils";
import TarotCard, { getTarotImageUrl } from "@/components/TarotCard";
import { useSettings } from "@/context/SettingsContext";

export default function JournalPage() {
  const { lang } = useSettings();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const t = {
    back: lang === "id" ? "Kembali" : "Back",
    badge: lang === "id" ? "Kronik Perjalanan Jiwa" : "Soul Chronicle",
    title: lang === "id" ? "Jurnal Bacaan" : "Reading Journal",
    clear_all: lang === "id" ? "Hapus Semua Data" : "Clear All Data",
    no_entries:
      lang === "id"
        ? "Belum ada catatan bacaan di dalam jurnalmu."
        : "No reading records in your chronicle yet.",
    start_first:
      lang === "id" ? "Mulai Bacaan Pertama" : "Start First Reading",
    delete_confirm:
      lang === "id" ? "Hapus catatan ini?" : "Delete this record?",
    clear_confirm:
      lang === "id"
        ? "Hapus SEMUA catatan jurnal? Tindakan ini tidak bisa dibatalkan."
        : "Delete ALL journal entries? This action cannot be undone.",
    notes_label: lang === "id" ? "Catatan Refleksi Pribadi" : "Personal Reflection Notes",
    notes_placeholder:
      lang === "id"
        ? "Tulis refleksi, sinkronisitas, atau pertanyaanmu di sini..."
        : "Write your reflections, synchronicities, or questions here...",
    select_entry:
      lang === "id"
        ? "Pilih catatan di sebelah kiri untuk membuka kembali tebaran kartumu."
        : "Select an entry on the left to revisit your spread.",
  };

  useEffect(() => {
    const loaded = getJournal();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(loaded);
    if (loaded.length > 0) {
      setSelectedEntry(loaded[0]);
    }
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(t.delete_confirm)) {
      deleteEntry(id);
      const updated = getJournal();
      setEntries(updated);
      if (selectedEntry?.id === id) {
        setSelectedEntry(updated[0] ?? null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm(t.clear_confirm)) {
      clearAllData();
      setEntries([]);
      setSelectedEntry(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(
      lang === "id" ? "id-ID" : "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <main className="min-h-screen px-6 py-8 md:px-12">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="glass-panel mb-10 flex flex-col justify-between gap-6 rounded-3xl p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-secondary transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t.back}</span>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                {t.badge}
              </span>
            </div>
            <h1 className="mt-1 font-serif text-4xl font-bold text-on-background">
              {t.title}
            </h1>
          </div>

          {entries.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-300 transition hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" />
              {t.clear_all}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Chronicle List */}
          <div className="custom-scrollbar max-h-[75vh] space-y-4 overflow-y-auto pr-2 lg:col-span-1">
            {entries.length === 0 ? (
              <div className="glass-panel rounded-3xl p-10 text-center">
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-primary/50" />
                <p className="text-sm text-on-surface-variant">{t.no_entries}</p>
                <Link
                  href="/spread"
                  className="gold-gradient mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest"
                >
                  {t.start_first}
                </Link>
              </div>
            ) : (
              entries.map((entry) => {
                const isActive = selectedEntry?.id === entry.id;
                return (
                  <motion.div
                    key={entry.id}
                    layoutId={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className={`group relative cursor-pointer rounded-2xl border p-5 transition-all ${
                      isActive
                        ? "border-primary bg-primary/15 shadow-[0_0_35px_var(--bg-glow-1)]"
                        : "glass border-primary/15 hover:border-primary/40"
                    }`}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-serif text-lg font-bold text-on-background group-hover:text-primary transition-colors">
                        {entry.spreadName}
                      </h3>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(entry.id, e)}
                        className="rounded-lg p-1 text-on-surface-variant opacity-0 transition hover:bg-red-500/20 hover:text-red-300 group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mb-4 flex items-center gap-2 text-xs text-on-surface-variant">
                      <Calendar className="h-3.5 w-3.5 text-secondary" />
                      {formatDate(entry.date)}
                    </div>

                    {/* Mini Card Thumbnail Previews */}
                    <div className="flex flex-wrap items-center gap-2">
                      {entry.cards.map((c, i) => {
                        const thumb = getTarotImageUrl(c.slug);
                        return (
                          <div
                            key={i}
                            className="relative h-14 w-9 overflow-hidden rounded-lg border border-primary/30 bg-surface-dim shadow-md"
                          >
                            {thumb && (
                              <Image
                                src={thumb}
                                alt={c.slug}
                                fill
                                sizes="36px"
                                className={`object-cover ${
                                  c.isReversed ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Right Detail Sanctuary */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedEntry ? (
                <motion.div
                  key={selectedEntry.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="glass-panel rounded-3xl p-6 sm:p-8"
                >
                  <div className="border-b border-primary/15 pb-6">
                    <h2 className="font-serif text-3xl font-bold text-on-background">
                      {selectedEntry.spreadName}
                    </h2>
                    <p className="mt-2 flex items-center gap-2 text-xs text-on-surface-variant">
                      <Calendar className="h-4 w-4 text-secondary" />
                      {formatDate(selectedEntry.date)}
                    </p>
                  </div>

                  <div className="my-8 grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {selectedEntry.cards.map((c, i) => {
                      const cardData = getCardBySlug(c.slug);
                      return (
                        <div
                          key={i}
                          className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-surface-container-lowest/60 p-4"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary">
                            {c.positionName}
                          </span>
                          <TarotCard
                            card={cardData}
                            slug={c.slug}
                            isReversed={c.isReversed}
                            isRevealed
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3 border-t border-primary/15 pt-6">
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                      <BookOpen className="h-4 w-4 text-secondary" />
                      {t.notes_label}
                    </h4>
                    <textarea
                      className="h-36 w-full rounded-2xl border border-primary/20 bg-surface-container-lowest/70 p-4 text-sm text-on-background outline-none transition focus:border-primary"
                      placeholder={t.notes_placeholder}
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
                <div className="glass-panel flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border-dashed p-12 text-center opacity-60">
                  <ChevronRight className="mb-3 h-10 w-10 text-primary" />
                  <p className="font-serif text-xl text-on-surface-variant">
                    {t.select_entry}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
