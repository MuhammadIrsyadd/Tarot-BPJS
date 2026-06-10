// import { TarotCardData } from "./types";

export interface JournalEntry {
  id: string;
  date: string;
  spreadName: string;
  cards: {
    slug: string;
    isReversed: boolean;
    positionName: string;
  }[];
  notes: string;
}

const STORAGE_KEYS = {
  JOURNAL: 'arcana_journal',
  THEME: 'arcana_deck_theme',
  LANG: 'arcana_lang'
};

export function saveReading(entry: Omit<JournalEntry, 'id' | 'date' | 'notes'>) {
  if (typeof window === 'undefined') return;
  
  const journal = getJournal();
  const newEntry: JournalEntry = {
    ...entry,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    notes: ""
  };
  
  journal.unshift(newEntry);
  localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journal));
  return newEntry;
}

export function getJournal(): JournalEntry[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.JOURNAL);
  return stored ? JSON.parse(stored) : [];
}

export function deleteEntry(id: string) {
  if (typeof window === 'undefined') return;
  const journal = getJournal().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journal));
}

export function updateNotes(id: string, notes: string) {
  if (typeof window === 'undefined') return;
  const journal = getJournal().map(e => e.id === id ? { ...e, notes } : e);
  localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journal));
}

export function getTheme(): string {
  if (typeof window === 'undefined') return 'cosmic';
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'cosmic';
}

export function setTheme(theme: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

export function getLang(): 'id' | 'en' {
  if (typeof window === 'undefined') return 'id';
  return (localStorage.getItem(STORAGE_KEYS.LANG) as 'id' | 'en') || 'id';
}

export function setLang(lang: 'id' | 'en') {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.LANG, lang);
}

export function clearAllData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.JOURNAL);
}
